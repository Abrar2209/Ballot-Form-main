import { Icon, TextField } from "@shopify/polaris";
import React, { useState } from "react";
import {
  ArrowRightMinor,
  CaretDownMinor,
  ArrowLeftMinor,
} from "@shopify/polaris-icons";
const Publish = () => {
  const [isFormElementVisible, setIsFormElementVisible] = useState(true);
  const [isAccount, setIsAccount] = useState(false);
  const [isOther, setIsOther] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState("Embed code");
  const [btnStyle, setBtnStyle] = useState(false);
  const [selectPage, setSelectPage] = useState("Page 1");
  const [sltPage, setSltPage] = useState(false);
  const [selectPosition, setSelectPosition] = useState(
    "At the top of the Page"
  );
  const [sltPosition, setSltPosition] = useState(false);

  const handleOptionClick = (style) => {
    setSelectedStyle(style); // Update the selected style
    setBtnStyle(false); // Close the options
  };

  const handleSelectPageOptionClick = (style) => {
    setSelectPage(style); // Update the selected style
    sltPage(false); // Close the options
  };
  const handleSelectPositionOptionClick = (style) => {
    setSelectPosition(style); // Update the selected style
    setSltPosition(false); // Close the options
  };

  return (
    <div className="forms">
      <div
        className={`form-element header ${
          isFormElementVisible ? "" : "hidden"
        }`}
        onClick={() => {
          setIsAccount(!isAccount);
          setIsFormElementVisible(!isFormElementVisible);
        }}
      >
        <div>Account</div>
        <div className="icon">
          <button
            className="icon-btn"
            onClick={() => setIsFormElementVisible(!isFormElementVisible)}
          >
            <Icon source={ArrowRightMinor} color="base" />
          </button>
        </div>
      </div>
      <div>
        {isAccount && (
          <div>
            <div className="forms-header">
              <button
                className={`form-button ${
                  !isFormElementVisible ? "" : "hidden"
                }`}
                onClick={() => {
                  setIsAccount(!isAccount);
                  setIsFormElementVisible(!isFormElementVisible);
                }}
              >
                {" "}
                <Icon source={ArrowLeftMinor} color="base" />
              </button>
              <div className="form-h2">
                <h2>Account</h2>
              </div>
            </div>
            <div className="account-content">
              <div className="accounts one">
                <div className="input-checkbox">
                  <input
                    className="color-input-checkbox"
                    type="checkbox"
                    name=""
                    id=""
                  />
                </div>
                <div className="description-wrapper">
                  <h2>Show account detail on account page</h2>
                </div>
              </div>
              <div className="accounts two">
                <div className="input-checkbox">
                  <input
                    className="color-input-checkbox"
                    type="checkbox"
                    name=""
                    id=""
                  />
                </div>
                <div className="description-wrapper">
                  <h2>Registration page</h2>
                  <p>
                    Replace your store's registration form (located at
                    /account/register)
                  </p>
                </div>
              </div>
              <div className="accounts three">
                <div className="input-checkbox">
                  <input
                    className="color-input-checkbox"
                    type="checkbox"
                    name=""
                    id=""
                  />
                </div>
                <div className="description-wrapper">
                  <h2>Edit account page</h2>
                  <p>
                    Create a page where your customers can edit their account{" "}
                    <br />
                    (/account?view=formbuider_edit)
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div
        className={`form-element header ${
          isFormElementVisible ? "" : "hidden"
        }`}
        onClick={() => {
          setIsOther(!isOther);
          setIsFormElementVisible(!isFormElementVisible);
        }}
      >
        <div>Other Page</div>
        <div className="icon">
          <button
            className="icon-btn"
            onClick={() => setIsFormElementVisible(!isFormElementVisible)}
          >
            <Icon source={ArrowRightMinor} color="base" />
          </button>
        </div>
      </div>
      <div>
        {isOther && (
          <div>
            <div className="forms-header">
              <button
                className={`form-button ${
                  !isFormElementVisible ? "" : "hidden"
                }`}
                onClick={() => {
                  setIsOther(!isOther);
                  setIsFormElementVisible(!isFormElementVisible);
                }}
              >
                {" "}
                <Icon source={ArrowLeftMinor} color="base" />
              </button>
              <div className="form-h2">
                <h2>Other Page</h2>
              </div>
            </div>
            <div className="other-page">
              <div className="require-login">
                <div className="account-content">
                  <div className="accounts ">
                    <div className="input-checkbox">
                      <input
                        className="color-input-checkbox"
                        type="checkbox"
                        name=""
                        id=""
                      />
                    </div>
                    <div className="description-wrapper">
                      <h2 className="publish-header">Require Login</h2>
                      <p>Only allow logged users to access</p>
                    </div>
                  </div>
                  <TextField
                    label="Required Login Message"
                    value="Please <a href='/account/login' title='login'>login</a> to continue"
                    multiline={4}
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className="publication-type">
                <h2 className="publish-header">Select publication type</h2>
                <div className="btn-style-publish">
                  <div
                    className="layout-container"
                    onClick={() => setBtnStyle(!btnStyle)}
                  >
                    <div className="header-width">{selectedStyle}</div>{" "}
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
                          onClick={() => handleOptionClick("Embed code")}
                        >
                          Embed code
                        </div>
                        <div
                          className="btn-options 3d"
                          onClick={() => handleOptionClick("PopUp")}
                        >
                          PopUp
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="copy-paste">
                <h2 className="publish-header">
                  Copy and paste the embed code on your page
                </h2>
                <input
                  type="text"
                  className="input-publish"
                  placeholder="<div class='globo-formbuilder' data-id='ZmFsc2U='></div>"
                />
                <p className="publish-description">
                  Copy this short code and add it to your Shopify page or any
                  Shopify file where you want to display the form
                </p>
              </div>
              <div className="select-page">
              <div className="accounts ">
                    <div className="input-checkbox">
                      <input
                        className="color-input-checkbox"
                        type="checkbox"
                        name=""
                        id=""
                      />
                    </div>
                    <div className="description-wrapper">
                      <h2 className="publish-header">Add short code to page</h2>
                    </div>
                  </div>
                <h2 className="publish-header">Select a page</h2>
                <div className="btn-style-publish">
                  <div
                    className="layout-container"
                    onClick={() => setSltPage(!sltPage)}
                  >
                    <div className="header-width">{selectPage}</div>{" "}
                    <div className="layout-icon">
                      <Icon source={CaretDownMinor} color="base" />
                    </div>
                  </div>
                  {sltPage && (
                    <div className="">
                      <div className="hr-line-layout"></div>
                      <div className="options">
                        <div
                          className="btn-options"
                          onClick={() => handleSelectPageOptionClick("Page 1")}
                        >
                          Page 1
                        </div>
                        <div
                          className="btn-options"
                          onClick={() => handleSelectPageOptionClick("Page 2")}
                        >
                          Page 2
                        </div>
                        <div
                          className="btn-options"
                          onClick={() => handleSelectPageOptionClick("Page 3")}
                        >
                          Page 3
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="select-position">
                <h2 className="publish-header">Select position on page</h2>
                <div className="btn-style-publish">
                  <div
                    className="layout-container"
                    onClick={() => setSltPosition(!sltPosition)}
                  >
                    <div className="header-width">{selectPosition}</div>{" "}
                    <div className="layout-icon">
                      <Icon source={CaretDownMinor} color="base" />
                    </div>
                  </div>
                  {sltPosition && (
                    <div className="">
                      <div className="hr-line-layout"></div>
                      <div className="options">
                        <div
                          className="btn-options plain"
                          onClick={() =>
                            handleSelectPositionOptionClick(
                              "At the top of the page"
                            )
                          }
                        >
                          At the top of the page
                        </div>
                        <div
                          className="btn-options 3d"
                          onClick={() =>
                            handleSelectPositionOptionClick(
                              "At the bottom of the page"
                            )
                          }
                        >
                          At the bottom of the page
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Publish;
