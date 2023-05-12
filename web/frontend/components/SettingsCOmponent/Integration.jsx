import React, { useEffect, useState } from "react";
import "../../assets/style.css";
import "../../assets/base.css";
import "../../assets/formbuilder-design.css";
import { CaretDownMinor, DeleteMinor } from "@shopify/polaris-icons";
import { Button, Icon, Select, TextField } from "@shopify/polaris";
import "../../assets/design.css";
import { useAuthenticatedFetch } from "../../hooks";
import { useSelector } from "react-redux";
import axios from "axios";
import SubmitForm from "../SubmitForm";
import { handleKlaviyoIntegration } from "../FormBuilderComponents/utils/handlers";

const Integration = ({ klaviyoIntegration }) => {
  const { enable, defaultOption, klaviyoListMapping } = klaviyoIntegration;
  console.log(
    `klaviyoIntegration: ${defaultOption}, enable: ${enable}, klaviyoListMapping: ${klaviyoListMapping}`
  );
  const fetch = useAuthenticatedFetch();
  const { fields } = useSelector((state) => state.form);
  //const [isChecked, setIsChecked] = useState(false);
  const [addCustom, setAddCustom] = useState("");
  const [selected, setSelected] = useState("Email");
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
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
      console.log(result);
      setListNames(result);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDefaultOptionSelect = (e) => {
   // handleKlaviyoIntegration("defaultKlaviyoList", e.target.value);
    console.log(e.target.value);
    axios.post('http://localhost:8080/api/klaviyo/list/subscribe',e.target.value)
        .then(response =>{
            console.log(response)
        })
        .catch(error =>{
            console.log(error.response)
        })
        console.log(JSON.stringify(e.target.value))
    
  };

  

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

  const optionForAll = [
    { label: "Fixed value", value: "fixed value" },
    { label: "No value", value: "No value" },
    { label: "Your Name", value: "Your Name" },
    { label: "Email", value: "Email" },
    { label: "Message", value: "Message" },
    { label: "Url", value: "Url" },
    { label: "Name", value: "Name" },
    { label: "Product Title", value: "Product Title" },
    { label: "Date Time", value: "Date Time" },
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

  const nameOfField = [nameOfFields.map((field) => field.name)];

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

  const [item, setItem] = useState(["div"]);
  const removeRow = () => {
    const current = [...item];
    current.pop();
    setItem(current);
  };

  const addNewRow = () => {
    const current = [...item];
    current.push("newDiv");
    setItem(current);
  };
  const staticValues = [
    { id: 0, label: "No value" },
    { id: 1, label: "Fixed value" },
  ];
  const staticValue = ["Fixed value", "No value"];

  const fieldsLabel = [...staticValues, ...fields.map((field) => field.label)];

  const [klaviyoMapping, setKlaviyoMapping] = useState({});

  const [selectedValues, setSelectedValues] = useState([]);
  const handleSelectChange = (e, index) => {
    const updatedSelectedValues = [...selectedValues];
    updatedSelectedValues[index] = e;
    setSelectedValues(updatedSelectedValues);
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
                          handleKlaviyoIntegration(
                            "klaviyoIntegration",
                            "enable",
                            e.target.checked
                          )
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
                                "klaviyoIntegration",
                                "defaultOption",
                                e.target.value
                              )
                            }
                          >
                            {listNames.map((item) => (
                              <option
                                value={item.id}
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
                        <div>
                        {nameOfFields.map((field, index) => (
                          <div className="field" key={field.id}>
                            <div className="header">{field.name}</div>
                            <select
                                className="select-formlist"
                                value={klaviyoListMapping[field.name]}
                                onChange={(e) => {
                                  const selectedOption = fields.find(
                                    (option) => option.label === e.target.value
                                  );
                                  const updatedKlaviyoMapping = {
                                    ...klaviyoMapping,
                                    [field.name]: selectedOption
                                      ? selectedOption.id
                                      : e.target.value,
                                  };
                                  setKlaviyoMapping(updatedKlaviyoMapping);
                                  handleKlaviyoIntegration(
                                    "klaviyoIntegration",
                                    "klaviyoListMapping",
                                    updatedKlaviyoMapping
                                  );
                                }}
                              >
                                {staticValues.map((option) => (
                                  <option value={option.id} key={option.id}>
                                    {option.label}
                                  </option>
                                ))}
                                {fields.map((option) => (
                                  <option value={option.id} key={option.id}>
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          ))}
                        </div>
                      </div>
                      <>
                        {item?.map((currentItem, index) => {
                          return (
                            <div
                              className="add-custom"
                              key={currentItem}
                              id={`expenses-${index}`}
                            >
                              <input type="text" />
                              <Select
                                options={fieldsLabel}
                                onChange={(e) => setAddCustom(e)}
                                value={addCustom}
                              />
                              <button
                                className="delete-btn"
                                onClick={() => removeRow()}
                              >
                                <Icon source={DeleteMinor} color="base" />
                              </button>
                            </div>
                          );
                        })}
                      </>
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