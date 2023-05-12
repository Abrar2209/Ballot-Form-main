import React, { useState } from "react";
import "../FP_Fields_CSS/phone.css";
import Input from "react-phone-number-input/input";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "../../../node_modules/react-phone-number-input/style.css";
import "../../../assets/formbuilder-design.css";

const Phone = ({ field }) => {
  const {
    label,
    description,
    placeholder,
    defaultCountry,
    validateInternationalPhoneNumber,
    hideLabel,
    required,
    displayRequiredNoteOnLabelHide,
    inputFieldWidth
  } = field;
  const [value, setValue] = useState("");

  return (
    <div className="phone-previewer preview-component" style={{ width: inputFieldWidth ? inputFieldWidth : '100%' }}>
      <label>
        {!hideLabel && (
          <span className="rfb-fields-label">{label}</span>
        )}
        {required && !hideLabel && <span style={{ color: "red" }}>*</span>}
        {displayRequiredNoteOnLabelHide && (
          <span style={{ color: "red" }}>*</span>
        )}
      </label>
      {validateInternationalPhoneNumber && (
        <PhoneInput
          international
          countryCallingCodeEditable={false}
          defaultCountry={defaultCountry}
          placeholder={placeholder}
          value={value}
          onChange={setValue}
          error={
            value
              ? isValidPhoneNumber(value)
                ? undefined
                : "Invalid phone number"
              : "Phone number required"
          }
        />
      )}
      {!validateInternationalPhoneNumber && (
        <Input placeholder={placeholder} value={value} onChange={setValue}
        className="rfb-fields-inputs"
         />
      )}
      <span className="rfb-fields-desc">{description}</span>
    </div>
  );
};

export default Phone;