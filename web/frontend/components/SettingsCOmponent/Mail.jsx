import React, { useState } from "react";
import "../../assets/style.css";
import "../../assets/base.css";
import "../../assets/formbuilder-design.css";
import { CaretDownMinor } from "@shopify/polaris-icons";
import { Icon, TextField } from "@shopify/polaris";
import "../../assets/design.css";
import { handleFormSettingsChange } from "../FormBuilderComponents/utils/handlers";
import { RichTextEditor } from "../FormBuilderComponents/utils/RichTextEditor";

const Mail = ({ formSettings, appSettings }) => {
  const { enable, email, emailSubject, emailContent } = formSettings.adminMail;
  const { username, appPassword } = appSettings.smtpSetting;
  const [btnStyle, setBtnStyle] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState(
    "Copy Dynamic Value on Thank you message"
  );
  const handleOptionClick = (style) => {
    setSelectedStyle(style); // Update the selected style
    setBtnStyle(false); // Close the options
  };

  const [dropdowns, setDropdowns] = useState([
    {
      id: "Admin Mail",
      open: false,
    },
    {
      id: "User Mail Auto Response",
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
              {dropdown.id === "Admin Mail" && (
                <div className="drawer-layout">
                  <div className="hr-line-layout"></div>
                  {(username && appPassword) && (
                    <div className="klaviyo enable">
                      <input
                        type="checkbox"
                        className="color-input-checkbox"
                        onChange={(e) =>
                          handleFormSettingsChange(
                            "adminMail",
                            "enable",
                            e.target.checked
                          )
                        }
                        checked={enable}
                      />
                      <div>Enable</div>
                    </div>
                  )}
                  {!(username && appPassword) && (
                    <div className="klaviyo enable">
                      <div>
                        Please make sure that you have set Google Smtp provider username & app password in General Settings
                      </div>
                    </div>
                  )}
                  {(enable && username && appPassword) && (<div className="mail-admin">
                    <div className="email-mail">
                      <div className="email-width">
                        <label>Email</label>
                        <input
                          type="text"
                          className="layout-input"
                          value={email}
                          onChange={(e) =>
                            handleFormSettingsChange(
                              "adminMail",
                              "email",
                              e.target.value
                            )
                          }
                        />
                        <p>
                          You can put multiple email addresses separated with a
                          comma
                        </p>
                      </div>
                    </div>
                    <div className="email-width">
                      <label>Email Subject</label>
                      <input
                        type="text"
                        className="layout-input"
                        label="Email Subject"
                        value={emailSubject}
                        onChange={(e) =>
                          handleFormSettingsChange(
                            "adminMail",
                            "emailSubject",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="email-width">
                      <label>Email Content</label>
                      <RichTextEditor
                        rte_val={emailContent}
                        section="adminMail"
                        section_key="emailContent"
                      />
                    </div>
                  </div>)}
                </div>
              )}
              {dropdown.id === "User Mail Auto Response" && (
                <div>
                  <div className="hr-line-layout"></div>
                  <div className="mail-admin">
                    <div className="input-mail">
                      <div className="enable">
                        <input
                          type="checkbox"
                          className="color-input-checkbox"
                        />
                        <div>Send Email to Customer</div>
                      </div>
                    </div>
                    <div className="name-mail">
                      <div className="email-width">
                        <label>Name for auto response</label>
                        <input
                          type="text"
                          className="layout-input"
                          value=""
                          onChange=""
                        />
                      </div>
                    </div>
                    <div className="email-mail">
                      <div className="email-width">
                        <label>Email for auto response</label>
                        <input
                          type="text"
                          className="layout-input"
                          value=""
                          onChange=""
                        />
                      </div>
                    </div>
                    <div className="dynamic-value">
                      <div className="header-label-style">
                        <div className="enable">
                          <input
                            type="checkbox"
                            className="color-input-checkbox"
                          />
                          <div>Show Dynamic Value</div>
                        </div>
                        <div className="btn-style">
                          <div
                            className="layout-container"
                            onClick={() => setBtnStyle(!btnStyle)}
                          >
                            <div className="header-width">{selectedStyle}</div>{" "}
                            {/* Render the selected style */}
                            <div className="layout-icon">
                              <Icon source={CaretDownMinor} color="base" />
                            </div>
                          </div>
                          {btnStyle && (
                            <div className="">
                              <div className="hr-line-layout"></div>
                              <div className="options">
                                <div
                                  className="btn-options plain"
                                  onClick={() =>
                                    handleOptionClick("Customer name")
                                  }
                                >
                                  Customer name
                                </div>
                                <div
                                  className="btn-options 3d"
                                  onClick={() =>
                                    handleOptionClick("Customer email")
                                  }
                                >
                                  Customer email
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="email-subject">
                      <TextField
                        label="Auto Response Email subject"
                        value="New form submission received."
                        autoComplete="off"
                      />
                    </div>
                    <div className="email-message">
                      <TextField
                        label="Auto responder message"
                        value="New form submission received."
                        multiline={4}
                        autoComplete="off"
                      />
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

export default Mail;
