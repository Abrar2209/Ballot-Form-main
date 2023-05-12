import React, { useState } from "react";
import "../../assets/style.css";
import "../../assets/base.css";
import "../../assets/formbuilder-design.css";
import { CaretDownMinor } from "@shopify/polaris-icons";
import { Icon } from "@shopify/polaris";
import "../../assets/design.css";
import { handleCSSChange } from "../FormBuilderComponents/utils/handlers";

const Design = ({ formCSS }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const [dropdowns, setDropdowns] = useState([
    {
      id: "Layout",
      open: false,
    },
    {
      id: "Color",
      open: false,
    },
    {
      id: "Typography",
      open: false,
    },
  ]);

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
              {dropdown.id === "Layout" && (
                <div className="drawer-layout">
                  <div className="hr-line-layout"></div>
                  <div className="layout-container-dropdown">
                    <div className="header-width">
                      <label>Form Width</label>
                      <input
                        className="range-inputs"
                        type="range"
                        min="400"
                        max="800"
                        value={formCSS.form_width}
                        onChange={(e) =>
                          handleCSSChange("form_width", `${e.target.value}`)
                        }
                        id="slider"
                        step="50"
                      />
                      {formCSS.form_width}
                    </div>
                  </div>
                </div>
              )}
              {dropdown.id === "Color" && (
                <div>
                  <div className="hr-line-layout"></div>
                  <div className="layout-container-dropdown">
                    <div className="background-type">
                      <h2 className="text-head">Background Color</h2>
                      <div className="checkbox">
                        <div className="checkbox-color">
                          <input
                            type="checkbox"
                            name="radio-group"
                            checked={selectedOption === "color"}
                            value="color"
                            id="color"
                            className="color-input-checkbox"
                            onChange={handleOptionChange}
                          />{" "}
                          Color
                        </div>
                      </div>
                      {selectedOption === "color" && (
                        <input
                          className="color-input"
                          type="color"
                          value={formCSS.form_background_color}
                          onChange={(e) =>
                            handleCSSChange(
                              "form_background_color",
                              e.target.value
                            )
                          }
                        />
                      )}
                    </div>
                    <h2 className="shadow-header text-head">Text Color</h2>
                    <div className="text-color-head">
                      <div className="text-color">
                        <div className="color">
                          <input
                            type="color"
                            className="color-input"
                            value={formCSS.header_title_color}
                            onChange={(e) =>
                              handleCSSChange(
                                "header_title_color",
                                e.target.value
                              )
                            }
                          />
                          <div>
                            <h2>Heading</h2>
                            <p>{formCSS.header_title_color}</p>
                          </div>
                        </div>
                        <div className="color">
                          <input
                            type="color"
                            className="color-input"
                            value={formCSS.header_desc_color}
                            onChange={(e) =>
                              handleCSSChange(
                                "header_desc_color",
                                e.target.value
                              )
                            }
                          />
                          <div>
                            <h2>Description</h2>
                            <p>{formCSS.header_desc_color}</p>
                          </div>
                        </div>
                        <div className="color">
                          <input
                            type="color"
                            className="color-input"
                            value={formCSS.footer_disc_color}
                            onChange={(e) =>
                              handleCSSChange(
                                "footer_disc_color",
                                e.target.value
                              )
                            }
                          />
                          <div>
                            <h2>Disclaimer</h2>
                            <p>{formCSS.footer_disc_color}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h2 className="text-head">Input Color</h2>
                    <div className="input-color">
                      <div className="color">
                        <input
                          type="color"
                          value={formCSS.input_label_color}
                          onChange={(e) =>
                            handleCSSChange("input_label_color", e.target.value)
                          }
                          className="color-input"
                        />
                        <div>
                          <h2>Label</h2>
                          <p>{formCSS.input_label_color}</p>
                        </div>
                      </div>
                      <div className="color">
                        <input
                          type="color"
                          value={formCSS.input_text_color}
                          onChange={(e) =>
                            handleCSSChange("input_text_color", e.target.value)
                          }
                          className="color-input"
                        />
                        <div>
                          <h2>Text</h2>
                          <p>{formCSS.input_text_color}</p>
                        </div>
                      </div>
                      <div className="color">
                        <input
                          type="color"
                          value={formCSS.input_placeholder_color}
                          onChange={(e) =>
                            handleCSSChange(
                              "input_placeholder_color",
                              e.target.value
                            )
                          }
                          className="color-input"
                        />
                        <div>
                          <h2>Placeholder</h2>
                          <p>{formCSS.input_placeholder_color}</p>
                        </div>
                      </div>
                      <div className="color">
                        <input
                          type="color"
                          value={formCSS.input_background_color}
                          onChange={(e) =>
                            handleCSSChange(
                              "input_background_color",
                              e.target.value
                            )
                          }
                          className="color-input"
                        />
                        <div>
                          <h2>Background</h2>
                          <p>{formCSS.input_background_color}</p>
                        </div>
                      </div>
                      <div className="color">
                        <input
                          type="color"
                          value={formCSS.input_border_color}
                          onChange={(e) =>
                            handleCSSChange(
                              "input_border_color",
                              e.target.value
                            )
                          }
                          className="color-input"
                        />
                        <div>
                          <h2>Border</h2>
                          <p>{formCSS.input_border_color}</p>
                        </div>
                      </div>
                      <div className="color">
                        <input
                          type="color"
                          value={formCSS.input_focus_color}
                          onChange={(e) =>
                            handleCSSChange("input_focus_color", e.target.value)
                          }
                          className="color-input"
                        />
                        <div>
                          <h2>Focused</h2>
                          <p>{formCSS.input_focus_color}</p>
                        </div>
                      </div>
                      {/* </div> */}
                    </div>
                    <h2 className="text-head">Button Color</h2>
                    <div className="text-color-head">
                      <div className="text-color">
                        <div className="color">
                          <input
                            type="color"
                            value={formCSS.button_text_color}
                            onChange={(e) =>
                              handleCSSChange(
                                "button_text_color",
                                e.target.value
                              )
                            }
                            className="color-input"
                          />
                          <div>
                            <h2>Background</h2>
                            <p>{formCSS.button_text_color}</p>
                          </div>
                        </div>
                        <div className="color">
                          <input
                            type="color"
                            value={formCSS.button_color}
                            onChange={(e) =>
                              handleCSSChange("button_color", e.target.value)
                            }
                            className="color-input"
                          />
                          <div>
                            <h2>Text</h2>
                            <p>{formCSS.button_color}</p>
                          </div>
                        </div>
                        <div className="color">
                          <input
                            type="color"
                            value={formCSS.button_border_color}
                            onChange={(e) =>
                              handleCSSChange(
                                "button_border_color",
                                e.target.value
                              )
                            }
                            className="color-input"
                          />
                          <div>
                            <h2>Border</h2>
                            <p>{formCSS.button_border_color}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Button Hover  */}
                    <h2 className="text-head">Button Hover</h2>
                    <div className="text-color">
                      <div className="color">
                        <input
                          type="color"
                          value={formCSS.button_hover_background_color}
                          onChange={(e) =>
                            handleCSSChange(
                              "button_hover_background_color",
                              e.target.value
                            )
                          }
                          className="color-input"
                        />
                        <div>
                          <h2>Background</h2>
                          <p>{formCSS.button_hover_background_color}</p>
                        </div>
                      </div>
                      <div className="color">
                        <input
                          type="color"
                          value={formCSS.button_hover_text_color}
                          onChange={(e) =>
                            handleCSSChange(
                              "button_hover_text_color",
                              e.target.value
                            )
                          }
                          className="color-input"
                        />
                        <div>
                          <h2>Text</h2>
                          <p>{formCSS.button_hover_text_color}</p>
                        </div>
                      </div>
                      <div className="color">
                        <input
                          type="color"
                          value={formCSS.button_hover_border_color}
                          onChange={(e) =>
                            handleCSSChange(
                              "button_hover_border_color",
                              e.target.value
                            )
                          }
                          className="color-input"
                        />
                        <div>
                          <h2>Border</h2>
                          <p>{formCSS.button_hover_border_color}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {dropdown.id === "Typography" && (
                <div>
                  <div className="hr-line-layout"></div>
                  <div className="layout-container-dropdown">
                    <div className="layout-typography">
                      <div className="fonts">
                        <div className="input-fonts font-text">
                          <h2 className="input-header text ">
                            Input fonts Type
                          </h2>
                          <div className="font-input">
                            <select name="input" id="" className="font">
                              <option value="None">Google Fonts</option>
                              <option value="sm">Fonts</option>
                            </select>
                          </div>
                        </div>
                        <div className="google-fonts font-text">
                          <h2 className="input-header text ">Google Fonts</h2>
                          <div className="font-input">
                            <select name="input" id="" className="font">
                              <option value="None">Fonts</option>
                              <option value="sm">Google Fonts</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="font-size">
                        <div className="ft-inputs">
                          <h2>Label text</h2>
                          <input
                            className="range-inputs"
                            type="range"
                            min="2"
                            max="50"
                            value={formCSS.label_font_size}
                            onChange={(e) =>
                              handleCSSChange(
                                "label_font_size",
                                `${e.target.value}`
                              )
                            }
                            id="slider"
                            step="1"
                          />
                          <p>{formCSS.label_font_size}</p>
                        </div>
                        <div className="ft-inputs">
                          <h2>Text Field</h2>
                          <input
                            className="range-inputs"
                            type="range"
                            min="2"
                            max="50"
                            value={formCSS.input_texts_font_size}
                            onChange={(e) =>
                              handleCSSChange(
                                "input_texts_font_size",
                                `${e.target.value}`
                              )
                            }
                            id="slider"
                            step="1"
                          />
                          <p>{formCSS.input_texts_font_size}</p>
                        </div>
                        <div className="ft-inputs">
                          <h2>Placeholder</h2>
                          <input
                            className="range-inputs"
                            type="range"
                            min="2"
                            max="50"
                            value={formCSS.placeholder_font_size}
                            onChange={(e) =>
                              handleCSSChange(
                                "placeholder_font_size",
                                `${e.target.value}`
                              )
                            }
                            id="slider"
                            step="1"
                          />
                          <p>{formCSS.placeholder_font_size}</p>
                        </div>
                        <div className="ft-inputs">
                          <h2>Description</h2>
                          <input
                            className="range-inputs"
                            type="range"
                            min="2"
                            max="50"
                            value={formCSS.desc_font_size}
                            onChange={(e) =>
                              handleCSSChange(
                                "desc_font_size",
                                `${e.target.value}`
                              )
                            }
                            id="slider"
                            step="1"
                          />
                          <p>{formCSS.desc_font_size}</p>
                        </div>
                        <div className="ft-inputs">
                          <h2>Button Text</h2>
                          <input
                            className="range-inputs"
                            type="range"
                            min="2"
                            max="50"
                            value={formCSS.button_font_size}
                            onChange={(e) =>
                              handleCSSChange(
                                "button_font_size",
                                `${e.target.value}`
                              )
                            }
                            id="slider"
                            step="1"
                          />
                          <p>{formCSS.button_font_size}</p>
                        </div>
                        <div className="ft-inputs">
                          <h2>Info / Disclaimer</h2>
                          <input
                            className="range-inputs"
                            type="range"
                            min="2"
                            max="50"
                            value={formCSS.disclaimer_font_size}
                            onChange={(e) =>
                              handleCSSChange(
                                "disclaimer_font_size",
                                `${e.target.value}`
                              )
                            }
                            id="slider"
                            step="1"
                          />
                          <p>{formCSS.disclaimer_font_size}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Design;