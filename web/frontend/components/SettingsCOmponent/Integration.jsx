import React, { useEffect, useState } from "react";
import "../../assets/style.css";
import "../../assets/base.css";
import "../../assets/formbuilder-design.css";
import { CaretDownMinor, DeleteMinor } from "@shopify/polaris-icons";
import { Button, Icon, Select, TextField } from "@shopify/polaris";
import "../../assets/design.css";
import { useAuthenticatedFetch } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { handleKlaviyoIntegration } from "../FormBuilderComponents/utils/handlers";
import FormFields from "./FormFields";
import { ids } from "../../pages/viewforms";
import Custom from "./Custom";
const Integration = ({ klaviyoIntegration }) => {
  const { enable, defaultOption, klaviyoListMapping } = klaviyoIntegration;
  console.log(`enable, defaultOption, klaviyoListMapping ${klaviyoListMapping}`);
  const fetch = useAuthenticatedFetch();
  const { fields } = useSelector((state) => state.form);
  console.log(`fields ${fields}`);
  const [selected, setSelected] = useState("Email");
  const [listNames, setListNames] = useState([]);

  useEffect(() => {
    handleListsName();
  }, []);

  const handleListsName = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/klaviyo/lists", {
        method: "GET",
      });
      const result = await response.json();
      setListNames(result);
    } catch (error) {
      console.error(error.message);
    }
  };
  fetch(`http://localhost:8080/api/data?id=${ids}`)
  .then(response => response.json())
  .then(data => {
    // Handle the response data from the server
  })
  .catch(error => {
    // Handle any errors
  });
  const [dropdowns, setDropdowns] = useState([
    {
      id: "Shopify",
      open: false,
    },
    {
      id: "Klaviyo",
      open: false,
    },
  ]);

  const options = [
    { label: "Fixed value", value: "Fixed value" },
    { label: "No value", value: "No value" },
    { label: "Email", value: "Email" },
  ];

  const nameOfFields = [
    { id: 1, name: "First Name" },
    { id: 2, name: "Last Name" },
    { id: 3, name: "Title" },
    { id: 4, name: "Organization" },
    { id: 5, name: "Phone" },
    { id: 6, name: "Address1" },
    { id: 7, name: "Address2" },
    { id: 8, name: "City" },
    { id: 9, name: "Region" },
    { id: 10, name: "Postal Code" },
    { id: 11, name: "Country" },
    { id: 12, name: "Latitude" },
  ];

  const toggleDropdown = (id) => {
    const updatedDropdowns = dropdowns.map((dropdown) => {
      if (dropdown.id === id) {
        return {
          ...dropdown,
          open: !dropdown.open,
        };
      } else {
        return {
          ...dropdown,
          open: false,
        };
      }
    });
    setDropdowns(updatedDropdowns);
  };

  let element;
  for (let i = 0; i < nameOfFields.length; i++) {
    element = nameOfFields[i].id;
  }
function filterObjectsWithPrefix(obj, prefix) {
  const filteredArr = [];

  for (let key in obj) {
    if (key.startsWith(prefix) && key !== '0') {
      const customField = {
        key: key,
        value: obj[key],
      };
      filteredArr.push(customField);
    }
  }

  return filteredArr;
}
  const filteredObj = filterObjectsWithPrefix(klaviyoListMapping, "custom");
  
  
  const [customFields, setCustomFields] = useState(filteredObj);
  const handleAddField = () => {
    setCustomFields([...customFields, ""]);
  };

  const handleCustomFieldChange = (index, value) => {
    console.log("index, value", index, value);
    console.log("customFields", customFields);
    const updatedFields = [...customFields];
    updatedFields[index] = value;
    setCustomFields(updatedFields);
  };

  const [inputValues, setInputValues] = useState("");

  const handleInputChange = (id, value) => {
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [id]: value,
    }));
  };

  return (
    <div className="design-layout">
      {dropdowns.map((dropdown) => (
        <div key={dropdown.id} className="main-layout">
          <div
            className="layout-container"
            onClick={() => toggleDropdown(dropdown.id)}
          >
            <div className="layout-heading">{dropdown.id}</div>
            <div className="layout-icon">
              <Icon source={CaretDownMinor} color="base" />
            </div>
          </div>
          {dropdown.open && (
            <div key={dropdown.id} className="component-wrapper">
              {dropdown.id === "Shopify" && (
                <div className="drawer-layout">
                  <div className="hr-line-layout"></div>
                  <div className="shopify enable">
                    <input type="checkbox" className="color-input-checkbox" />
                    <div>Enable</div>
                  </div>
                </div>
              )}
              {dropdown.id === "Klaviyo" && (
                <div>
                  <div className="hr-line-layout"></div>
                  <div className="klaviyo-integrate">
                    <div className="enable">
                      <input
                        type="checkbox"
                        className="color-input-checkbox"
                        onChange={(e) =>
                          handleKlaviyoIntegration("enable", e.target.checked)
                        }
                        checked={enable}
                      />
                      <div>Enable</div>
                    </div>
                  </div>
                  {enable && (
                    <>
                      <div className="klaviyo-select">
                        <div className="header-label-style">
                          <label>Select Klaviyo list</label>
                          <select
                            className="select-formlist"
                            value={defaultOption}
                            onChange={(e) =>
                              handleKlaviyoIntegration(
                                "defaultOption",
                                e.target.value
                              )
                            }
                          >
                            {listNames.map((item) => (
                              <option
                                value={`${item.id}`}
                                key={item.id}
                              >
                                {item.attributes.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="klayivo-fields">
                        <h2>FILL IN FOLLOWING INPUTS BY KLAVIYO FIELD TAG</h2>
                        <div className="field">
                          <div className="header">Email</div>
                          <Select
                            options={options}
                            onChange={(e) => setSelected(e)}
                            value={selected}
                          />
                        </div>
                        <>
                          {nameOfFields.map((field, index) => (
                            <FormFields
                              key={field.id}
                              field={field}
                              klaviyoListMapping={klaviyoListMapping}
                              fields={fields}
                            />
                          ))}                        
                          {customFields.map((field, index) => (
                              <Custom
                                key={field.id}
                                index={index}
                                field={field}
                                element={element + 1}
                                klaviyoListMapping={klaviyoListMapping}
                                fields={fields}
                              />
                            ))}

                          <div>
                            <button onClick={handleAddField}>
                              Add Custom Field
                            </button>
                          </div>
                        </>
                      </div>
                    </>
                  )}
                  <div className="klaviyo-list-name"></div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );

};

export default Integration;