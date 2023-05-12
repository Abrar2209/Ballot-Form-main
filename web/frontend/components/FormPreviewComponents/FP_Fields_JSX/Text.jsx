import React from "react";
import "../FP_Fields_CSS/text.css";
import "../../../assets/formbuilder-design.css";

const Text = ({ field }) => {
  const {
    label,
    placeholder,
    description,
    hideLabel,
    required,
    displayRequiredNoteOnLabelHide,
    inputFieldWidth,
  } = field;

  return (
    <div
      className="text-previewer"
      style={{ width: inputFieldWidth ? inputFieldWidth : '100%' }}
    >
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
      <input
        type="text"
        placeholder={placeholder}
        className="rfb-fields-inputs"
      />
      <span className="rfb-fields-desc">{description}</span>
    </div>
  );
};

export default Text;
