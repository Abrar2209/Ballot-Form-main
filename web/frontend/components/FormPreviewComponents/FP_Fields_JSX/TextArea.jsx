import React from "react";
import "../FP_Fields_CSS/textarea.css";
import "../../../assets/formbuilder-design.css";

const TextArea = ({ field }) => {
  const {
    label,
    placeholder,
    description,
    hideLabel,
    required,
    displayRequiredNoteOnLabelHide,
    inputFieldWidth
  } = field;

  return (
    <div className="textarea-previewer" style={{ width: inputFieldWidth ? inputFieldWidth : '100%' }}>
      <label>
        {!hideLabel && (
              <span className="rfb-fields-label">{label}</span>
        )}
        {required && !hideLabel && <span style={{ color: "red" }}>*</span>}
        {displayRequiredNoteOnLabelHide && (
          <span style={{ color: "red" }}>*</span>
        )}
      </label>
      <textarea
        rows="4"
        className="rfb-fields-inputs"
        type="text"
        placeholder={placeholder}
      />
      <span className="rfb-fields-desc">{description}</span>
    </div>
  );
};

export default TextArea;