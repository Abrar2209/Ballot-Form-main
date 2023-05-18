import React, { useEffect, useState } from "react";
import { handleKlaviyoIntegration } from "../FormBuilderComponents/utils/handlers";
import { useSelector } from "react-redux";
import { Icon } from "@shopify/polaris";
import { DeleteMinor } from "@shopify/polaris-icons";

const Custom = ({ klaviyoListMapping, index, fields, element }) => {
  const [customFields, setCustomFields] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const customId = `custom-${13 + index}`;
  const mapping = klaviyoListMapping[customId];
  const selectedValue = mapping ? mapping.form_field : "";
  const isDefault = mapping ? mapping.is_default : false;
  let isFixed = mapping ? mapping.is_fixed : false;
  const isFieldSelected = selectedValue === `fixed-${index}`;
  const [fieldValue, setFieldValue] = useState("");
  const { id } = useSelector((state) => state.form);

  const handleCustomFieldChange = (e) => {
    const value = e.target.value;

    setCustomFields((prevCustomFields) => ({
      ...prevCustomFields,
      [customId]: value,
    }));

    const updatedMapping = {
      klaviyo_field: value,
      form_field: customId,
      is_default: false,
      is_fixed: false,
      is_input: "",
    };

    const updatedListMapping = {
      ...klaviyoListMapping,
      [customId]: updatedMapping,
    };

    handleKlaviyoIntegration("klaviyoListMapping", updatedListMapping);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    const dynamicId = `fixed-${index}`;

    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [dynamicId]: value,
    }));

    const updatedMapping = {
      klaviyo_field: customFields[customId],
      form_field: dynamicId,
      is_default: false,
      is_fixed: true,
      is_input: value,
    };

    const updatedListMapping = {
      ...klaviyoListMapping,
      [customId]: updatedMapping,
    };

    handleKlaviyoIntegration("klaviyoListMapping", updatedListMapping);
  };

  const handleEdit = async (uuid) => {
    try {
      const response = await fetch(`http://localhost:8080/api/forms/getform?id=${uuid}`);
      const data = await response.json();
      const jsonData = JSON.parse(data.forms.klaviyoIntegration);
  
      if (jsonData && jsonData.klaviyoListMapping) {
        const updatedCustomFields = {};
        const updatedInputValues = {};
  
        Object.entries(jsonData.klaviyoListMapping).forEach(([key, item]) => {
          updatedCustomFields[key] = item.klaviyo_field;
          if (item.is_fixed) {
            updatedInputValues[key] = item.is_input;
          }
        });
  
        setCustomFields(updatedCustomFields);
        setInputValues(updatedInputValues);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  useEffect(() => {
    handleEdit(id);
  }, []);

  const handleFieldChange = (e) => {
    const selectedOption = fields.find(
      (option) => option.id === e.target.value
    );
    const isFixedSelected = e.target.value === `fixed-${index}`;
    isFixed = selectedOption && selectedOption.label === "Fixed value";
    const updatedMapping = {
      klaviyo_field: customFields[customId],
      form_field: selectedOption ? selectedOption.id : e.target.value,
      is_default: isDefault,
      is_fixed: isFixedSelected,
      is_input: inputValues[`fixed-${index}`],
    };

    const updatedListMapping = {
      ...klaviyoListMapping,
      [customId]: updatedMapping,
    };

    handleKlaviyoIntegration("klaviyoListMapping", updatedListMapping);
  };

  const handleDeleteField = () => {
    const updatedListMapping = { ...klaviyoListMapping };
    delete updatedListMapping[customId];
    handleKlaviyoIntegration("klaviyoListMapping", updatedListMapping);
  };

  const { undefined: undefinedKey, ...filteredMapping } = klaviyoListMapping;

  return (
    <div className="field" key={index}>
      <input
        type="text"
        key={index}
        value={customFields[customId]}
        onChange={handleCustomFieldChange}
      />
      {isFieldSelected}
      <select
        className="select-formlist"
        value={selectedValue}
        onChange={handleFieldChange}
      >
        <option value={`fixed-${index}`} key={`fixed-${index}`}>
          Fixed value
        </option>
        <option id={`No-${customId}`} value="">
          No value
        </option>
        {fields.map((option) => (
          <option
            value={option.id}
            key={option.id}
            selected={klaviyoListMapping[customId]?.form_field === option.id}
          >
            {option.label}
          </option>
        ))}
      </select>

      {isFieldSelected && selectedValue === `fixed-${index}` && (
        <>
          <input
            type="text"
            value={inputValues[`fixed-${index}`]}
            onChange={handleInputChange}
          />
        </>
      )}
      <button onClick={() => handleDeleteField(customId)}>
        <Icon source={DeleteMinor} />
      </button>
    </div>
  );
};

export default Custom;