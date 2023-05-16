import React, { useEffect, useState } from 'react';
import { handleKlaviyoIntegration } from '../FormBuilderComponents/utils/handlers';
import { v4 as uuidv4 } from "uuid";
import { useSelector } from 'react-redux';
import { useAuthenticatedFetch } from '@shopify/app-bridge-react';
const FormFields = ({ field, klaviyoListMapping, fields }) => {
  const fetch = useAuthenticatedFetch();
  const [inputValues, setInputValues] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [fieldValue, setFieldValue] = useState("")
  const [isInputValue, setIsInputValue] = useState('');
  // const [fieldValues, setFieldValues] = useState({});

  const { id } = useSelector((state) => state.form)
  console.log(id);
 


  const mapping = klaviyoListMapping[field.id];
  const selectedValue = mapping ? mapping.form_field : "";
  const isDefault = mapping ? mapping.is_default : true;
  const isFixed = mapping ? mapping.is_fixed : false;
  const isFieldSelected = selectedValue === `fixed-${field.id}`;
  function showToastMessage(message) {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  }

  
  const handleEdit = async (uuid) => {
    console.log(uuid)
    try {
      const response = await fetch(
        `http://localhost:8080/api/forms/getform?id=${uuid}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      console.log(data);
      const jsonData = JSON.parse(data.forms.klaviyoIntegration)
      setFieldValue(jsonData.klaviyoListMapping);

      Object.values(jsonData.klaviyoListMapping).forEach((item) => {
        if (item.is_fixed === true ) {
          setInputValues((prevInputValues) => ({
            ...prevInputValues,
            [item.form_field]: item.is_input,
          }));
        }
      });

    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    handleEdit(id)
  }, []);

  const handleInputChange = (e) => { // Text Changing
    
    const value = e.target.value;
    const dynamicId = `fixed-${field.id}`;
    console.log(`37 value: ${value}`);
    console.log(`38 dynamicId: ${dynamicId}`);

    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [dynamicId]: value,
    }));

    const updatedMapping = {
      klaviyo_field: field.name,
      form_field: dynamicId,
      is_default: false,
      is_fixed: true,
      is_input: value,
    };

    const updatedListMapping = {
      ...klaviyoListMapping,
      [field.id]: updatedMapping,
    };
    showToastMessage("Error!!!")
    handleKlaviyoIntegration("klaviyoListMapping", updatedListMapping);
  };

  const handleFieldChange = (e) => {
    const selectedOption = fields.find((option) => option.id === e.target.value);
    const isFixedSelected = e.target.value === `fixed-${field.id}`;

    console.log(`inputValue...${inputValues}`);

    const updatedMapping = {
      klaviyo_field: field.name,
      form_field: selectedOption ? selectedOption.id : e.target.value,
      is_default: isDefault,
      is_fixed: isFixedSelected,
      is_input: inputValues[`fixed-${field.id}`],
    };

    const updatedListMapping = {
      ...klaviyoListMapping,
      [field.id]: updatedMapping,
    };
    showToastMessage("Error!!!")
    handleKlaviyoIntegration("klaviyoListMapping", updatedListMapping);

  };

  return (
    <div className="field" key={field.id}>
      <div className="header">{field.name}</div>
      <select
        className="select-formlist"
        value={selectedValue}
        onChange={handleFieldChange}
      >
        <option value={`fixed-${field.id}`} key={`fixed-${field.id}`}>Fixed value</option>
        <option id={`No-${field.id}`} value="">No value</option>
        {fields.map((option) => (
          <option
            value={option.id}
            key={option.id}
            selected={klaviyoListMapping[field.id]?.form_field === option.id}
          >
            {option.label}
          </option>
        ))}
      </select>
      {isFieldSelected && selectedValue === `fixed-${field.id}` && (
        <>
          <input
            type="text"
            value={inputValues[`fixed-${field.id}`]}
            onChange={handleInputChange}
          />
        </>
      )}

{showToast && <div className="toast">{toastMessage}</div>}
    </div>
  );
};

export default FormFields;