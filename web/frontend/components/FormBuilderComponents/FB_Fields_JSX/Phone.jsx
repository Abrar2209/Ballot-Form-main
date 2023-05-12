import React, { useState, useEffect } from "react";
import "../FB_Fields_CSS/phone.css";
import { Icon } from "@shopify/polaris";
import { DeleteMinor, CaretUpMinor, CaretDownMinor } from "@shopify/polaris-icons";
import { CountrySelect } from "../utils/CountrySelect";
import en from "react-phone-number-input/locale/en";
import {
  handleLabelChange,
  handlePlaceholderChange,
  handleDescriptionChange,
  handleHideLabelChange,
  handleRequiredChange,
  handleNoteChange,
  handleDelete,
  handleValPhoneNumber,
  handleDefaultCountry,
  handleInputWidthSizeChange
} from "../utils/handlers";

const Phone = ({ field }) => {
  const {
    id,
    label,
    placeholder,
    description,
    defaultCountry,
    validateInternationalPhoneNumber,
    hideLabel,
    required,
    displayRequiredNoteOnLabelHide,
  } = field;
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState(defaultCountry);
  useEffect(() => {
    if (!required || !hideLabel) {
      handleNoteChange(id, false);
    }
    handleDefaultCountry(id, country);
  }, [id, required, hideLabel, country]);
  const [activeButton, setActiveButton] = useState(1);

  const handleButtonClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
  };
  const handleInputWidthSize = (id, value) => {
    handleInputWidthSizeChange(id, value)
    document.documentElement.style.setProperty("--phone-width-size", value);
  };

  return (
      <div className="header-section">
        <div
          className="section-component-btn fields"
          onClick={() => setOpen(!open)}
        >
          <div className="btn-icon">
          {/* <Icon source={EditMajor} color="base" className="icon" /> */}
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
          <div className="phone-container">
            <div className="hr-line-layout-fields"></div>
            <div className="phone-label">
              <div className="">
                <label className="">Label</label>
              </div>
              <input
                className="phone-inputs"
                type="text"
                value={label}
                onChange={(e) => handleLabelChange(id, e.target.value)}
              />
              <div className="">
                <label className="">Placeholder</label>
              </div>
              <input
                className="phone-inputs"
                type="text"
                value={placeholder}
                onChange={(e) => handlePlaceholderChange(id, e.target.value)}
              />
              <div className="">
                <label className="">Description</label>
              </div>
              <input
                className="phone-inputs"
                type="text"
                value={description}
                onChange={(e) => handleDescriptionChange(id, e.target.value)}
              />
              <div className="phone-check-inputs">
                <input
                  className="phone-checkbox-input"
                  type="checkbox"
                  checked={validateInternationalPhoneNumber}
                  onChange={(e) => handleValPhoneNumber(id, e.target.checked)}
                />
                <label>Validate international telephone number</label>
              </div>

              {validateInternationalPhoneNumber && (
                <div className="">
                  <label>Select default Country</label>
                  <CountrySelect
                    labels={en}
                    value={country}
                    onChange={setCountry}
                    className="phone-input"
                  />
                </div>
              )}

              <div className="phone-check-inputs">
                <input
                  className="phone-checkbox-input"
                  type="checkbox"
                  checked={hideLabel}
                  onChange={(e) => handleHideLabelChange(id, e.target.checked)}
                />
                <label>Hide Label</label>
              </div>
              <div className="phone-check-inputs">
                <input
                  className="phone-checkbox-input"
                  type="checkbox"
                  checked={required}
                  onChange={(e) => handleRequiredChange(id, e.target.checked)}
                />
                <label>Required</label>
              </div>
              {required && hideLabel && (
                <div className="phone-check-inputs">
                  <input
                    className="phone-checkbox-input"
                    type="checkbox"
                    checked={displayRequiredNoteOnLabelHide}
                    onChange={(e) => handleNoteChange(id, e.target.checked)}
                  />
                  <label>Show required note if hide label?</label>
                </div>
              )}
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
        )}
      </div>
  );
};

export default Phone;