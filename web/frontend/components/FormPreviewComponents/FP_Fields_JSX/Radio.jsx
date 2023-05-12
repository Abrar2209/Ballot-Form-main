import React, { useState } from "react";
import "../FP_Fields_CSS/radio.css";
import "../../../assets/formbuilder-design.css";

const Radio = ({ field }) => {
  const {
    label,
    description,
    options,
    defaultOptionChecked,
    hideLabel,
    required,
    displayRequiredNoteOnLabelHide,   
    inputFieldWidth

  } = field;

  const [selectedOption, setSelectedOption] = useState(defaultOptionChecked);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="radio-previewer preview-component" style={{ width: inputFieldWidth ? inputFieldWidth : '100%' }}>
      <label>
        {!hideLabel && (
          <span className="rfb-fields-label">
            {label}
          </span>
        )}
        {required && !hideLabel && <span style={{ color: "red" }}>*</span>}
        {displayRequiredNoteOnLabelHide && (
          <span style={{ color: "red" }}>*</span>
        )}
      </label>
      <div id="options" className="radio-preview-input">
        {options &&
          options.map((option, index) => (
            <div key={index} style={{ display: "flex", gap: '5px'  }}>
              <input
                required={required}
                type="radio"
                value={option}
                checked={selectedOption === option}
                onChange={handleOptionChange}
              />
              <label className="rfb-fields-inputs-check"  style={{marginTop: '0.2rem'}}>{option}</label>
            </div>
          ))}
        {options.length === 0 && (
          <div style={{ display: "flex" }}>
          <input type="checkbox" />
          <label className="rfb-fields-inputs-check"  style={{marginTop: '0.2rem'}}>No options</label>
        </div>
        )}
      </div>
      <span className="rfb-fields-desc">{description}</span>
    </div>
  );
};

export default Radio;
