import React, { useState, useEffect } from "react";
import "../FB_Fields_CSS/radio.css";
import { Icon } from "@shopify/polaris";
import {
  DeleteMinor,
  CaretUpMinor,
  CaretDownMinor,
  DragHandleMinor,
} from "@shopify/polaris-icons";
import {
  handleLabelChange,
  handleDescriptionChange,
  handleHideLabelChange,
  handleRequiredChange,
  handleNoteChange,
  handleDelete,
  handleMultiOptionChange,
  handleDefaultOptionChange,
  handleInputWidthSizeChange,
} from "../utils/handlers";

const Radio = ({ field }) => {
  const {
    id,
    label,
    description,
    options,
    defaultOptionChecked,
    hideLabel,
    required,
    displayRequiredNoteOnLabelHide,
  } = field;
  const [open, setOpen] = useState(false);

  const [selectedOption, setSelectedOption] = useState(defaultOptionChecked);
  const [items, setItems] = useState(options);
  const [inputValue, setInputValue] = useState("");
  const [activeButton, setActiveButton] = useState(1);

  const handleButtonClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
  };
  const handleInputWidthSize = (id, value) => {
    handleInputWidthSizeChange(id, value)
    document.documentElement.style.setProperty("--radio-width-size", value);
  };
  const handleAddItem = () => {
    if (inputValue.trim()) {
      setItems([...items, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleDeleteOption = (index) => {
    setItems((prevItems) => prevItems.filter((item, i) => i !== index));
  };

  const handleReplaceOption = (index, newValue) => {
    setItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[index] = newValue;
      return newItems;
    });
  };

  useEffect(() => {
    if (items.length === 1) {
      setSelectedOption(items[0]);
    } else if (items.length === 0) {
      setSelectedOption("");
    }
    handleMultiOptionChange(id, items);
    handleDefaultOptionChange(id, selectedOption);

    if (!required || !hideLabel) {
      handleNoteChange(id, false);
    }
  }, [id, items, selectedOption, required, hideLabel]);

  const handleDefaultOptionSelect = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const oldIndex = e.dataTransfer.getData("text/plain");
    const newOptions = [...options];
    const [removed] = newOptions.splice(oldIndex, 1);
    newOptions.splice(index, 0, removed);
    setItems(newOptions);
  };

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
            {open ? (
              <Icon source={CaretUpMinor} color="base" />
            ) : (
              <Icon source={CaretDownMinor} color="base" />
            )}
          </button>
        </div>
      </div>
      {open && (
        <div className="radio-container">
          <div className="hr-line-layout-fields"></div>
          <div className="radio-label">
            <div className="">
              <label className="">Label</label>
            </div>
            <input
              className="radio-inputs"
              type="text"
              value={label}
              onChange={(e) => handleLabelChange(id, e.target.value)}
            />
            <div className="">
              <label className="">Options</label>
            </div>
            <div className="add-option">
              <input
                className="add-option_input"
                type="text"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
              />
              <button className="add-option_button" onClick={handleAddItem}>
                Add
              </button>
              <div>
                <ul className="options-list">
                  {items.map((item, index) => (
                    <li key={index} className="option-item">
                      <span
                        style={{ cursor: "grab" }}
                        draggable
                        onDragOver={handleDragOver}
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDrop={(e) => handleDrop(e, index)}
                      >
                        <Icon source={DragHandleMinor} color="base" />
                      </span>
                      <div>
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => {
                            handleReplaceOption(index, e.target.value);
                          }}
                        />
                      </div>
                      <button
                        className="delete-option"
                        onClick={() => handleDeleteOption(index)}
                      >
                        <Icon
                          source={DeleteMinor}
                          color="base"
                          className="icon"
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="">
              <label>Select default Option</label>
            </div>
            <select
              className="radio-dropdown-inputs"
              value={selectedOption}
              onChange={handleDefaultOptionSelect}
            >
              {items.length === 0 && (
                <option value="Please add an option">
                  Please add an option
                </option>
              )}
              {items &&
                items.map((item, index) => (
                  <option value={item} key={index}>
                    {item}
                  </option>
                ))}
            </select>
            <div className="">
              <label className="">Description</label>
            </div>
            <input
              className="radio-inputs"
              type="text"
              value={description}
              onChange={(e) => handleDescriptionChange(id, e.target.value)}
            />
            <div className="radio-check-inputs">
              <input
                className="radio-checkbox-input"
                type="checkbox"
                checked={hideLabel}
                onChange={(e) => handleHideLabelChange(id, e.target.checked)}
              />
              <label>Hide Label</label>
            </div>
            <div className="radio-check-inputs">
              <input
                className="radio-checkbox-input"
                type="checkbox"
                checked={required}
                onChange={(e) => handleRequiredChange(id, e.target.checked)}
              />
              <label>Required</label>
            </div>
            {required && hideLabel && (
              <div className="checkbox-check-inputs">
                <input
                  className="checkbox-input"
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

export default Radio;