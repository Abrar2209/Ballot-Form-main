import React, { useState, useEffect } from "react";
import "../FB_Fields_CSS/text.css";
import { Icon } from "@shopify/polaris";
import { DeleteMinor, CaretUpMinor, CaretDownMinor } from "@shopify/polaris-icons";
import "../../../assets/formbuilder-design.css";

import {
  handleLabelChange,
  handlePlaceholderChange,
  handleDescriptionChange,
  handleHideLabelChange,
  handleRequiredChange,
  handleNoteChange,
  handleDelete,
  handleInputWidthSizeChange,
} from "../utils/handlers";

const Text = ({ field }) => {
  const {
    id,
    label,
    placeholder,
    description,
    hideLabel,
    required,
    limitCharacter,
    displayRequiredNoteOnLabelHide,
  } = field;
  const [open, setOpen] = useState(false);
  const [activeButton, setActiveButton] = useState(1);

  const handleButtonClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
  };
  const handleInputWidthSize = (id, value) => {
    handleInputWidthSizeChange(id, value)
    document.documentElement.style.setProperty("--input-width-size", value);
  };

  useEffect(() => {
    if (!required || !hideLabel) {
      handleNoteChange(id, false);
    }
  }, [id, required, hideLabel]);

  return (
    <div className="header-section">
      <div
        className="section-component-btn fields"
        onClick={() => setOpen(!open)}
      >
        <div className="btn-icon">
          <h2 className="section-button">{label}</h2>
        </div>
        <div className="btn-wrapper">
          <button className="delete-button" onClick={() => handleDelete(id)}>
            <Icon source={DeleteMinor} color="base" className="icon" />
          </button>
          <button className="dropdown-button">
            {open ? <Icon source={CaretUpMinor} color="base" /> : 
            <Icon source={CaretDownMinor} color="base" />
            }
          </button>
        </div>
      </div>
      {open && (
        <>
          <div className="text-container">
            <div className="hr-line-layout-fields"></div>
            <div className="text-label">
              <div className="">
                <label className="">Label</label>
              </div>
              <input
                className="text-inputs"
                type="text"
                value={label}
                onChange={(e) => handleLabelChange(id, e.target.value)}
              />
              <div className="">
                <label className="">Placeholder</label>
              </div>
              <input
                className="text-inputs"
                type="text"
                value={placeholder}
                onChange={(e) => handlePlaceholderChange(id, e.target.value)}
              />
              <div className="">
                <label className="">Description</label>
              </div>
              <input
                className="text-inputs"
                type="text"
                value={description}
                onChange={(e) => handleDescriptionChange(id, e.target.value)}
              />
              <div className="check-inputs">
                <input
                  className="checkbox-input"
                  type="checkbox"
                  checked={hideLabel}
                  onChange={(e) => handleHideLabelChange(id, e.target.checked)}
                />
                <label>Hide Label</label>
              </div>
              <div className="check-inputs">
                <input
                  className="checkbox-input"
                  type="checkbox"
                  checked={required}
                  onChange={(e) => handleRequiredChange(id, e.target.checked)}
                />
                <label>Required</label>
              </div>
              {required && hideLabel && (
                <div className="check-inputs">
                  <input
                    className="checkbox-input"
                    type="checkbox"
                    checked={displayRequiredNoteOnLabelHide}
                    onChange={(e) => handleNoteChange(id, e.target.checked)}
                  />
                  <label>Show required note if hide label?</label>
                </div>
              )}
              {/* <div className="check-inputs">
                <input
                  className="checkbox-input"
                  type="checkbox"
                  checked={limitCharacter}
                  onChange={(e) =>
                    handleLimitCharacterChange(id, e.target.checked)
                  }
                />
                <label>Limit Character</label>
              </div>
              {limitCharacter && (
                <div className="font-input">
                  <select name="input" id="" className="lc-character">
                    <option value="20">20</option>
                    <option value="40">40</option>
                    <option value="60">60</option>
                    <option value="80">80</option>
                    <option value="100">100</option>
                  </select>
                </div>
              )} */}
              Width
              <div className="width-property">
                <button
                  className={`half
                    ${activeButton === 0 ? "active" : ""}
                  `}
                  onClick={() => {
                    handleInputWidthSize(id, "49%");
                    handleButtonClick(0);
                  }}
                >
                  50%
                </button>
                <button
                  className={`full
                  ${activeButton === 1 ? "active" : ""}
                `}
                  onClick={() => {
                    handleInputWidthSize(id, "100%");
                    handleButtonClick(1);
                  }}
                >
                  100%
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Text;
