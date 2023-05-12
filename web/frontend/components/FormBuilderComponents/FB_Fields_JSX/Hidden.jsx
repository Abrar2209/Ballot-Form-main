import React, { useState } from "react";
import "../FB_Fields_CSS/hidden.css";
import {
  handleLabelChange,
  handleHiddenInputChange,
  handleDelete,
} from "../utils/handlers";
import { Icon } from "@shopify/polaris";
import {
  DeleteMinor,
  CaretUpMinor,
  CaretDownMinor,
} from "@shopify/polaris-icons";

const Hidden = ({ field }) => {
  const { id, label, value } = field;
  const [open, setOpen] = useState(false);

  const handleChange = (id, value) => {
    handleHiddenInputChange(id, value)
  }

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
        <div className="hidden-container">
          <div className="hr-line-layout-fields"></div>
          <div className="hidden-label">
            <div className="">
              <label className="">Label</label>
            </div>
            <input
              className="hidden-inputs"
              type="text"
              value={label}
              onChange={(e) => handleLabelChange(id, e.target.value)}
            />
            <div className="">
              <label className="">Assign value</label>
            </div>
            <input
              className="hidden-inputs"
              type="text"
              value={value}
            />
          </div>
          {/* Dynamic Value */}
          <div className="header-section-after-submit">
            <div className="dynamic-value-submission">
              <div className="btn-style">
                <div className="">
                  <div className="options">
                    <div className="btn-options-submit">
                      <div className="title-btn-name">Customer name</div>
                      <div className="copy-btn-name">
                        <div
                          className="copy-header"
                          onClick={() => handleChange(id, "{{customer.name}}")}
                        >
                          <h3>{"{{customer.name}}"}</h3>
                        </div>
                      </div>
                    </div>
                    <div className="btn-options-submit">
                      <div className="title-btn-name">Customer email</div>
                      <div className="copy-btn-name">
                        <div
                          className="copy-header"
                          onClick={() => handleChange(id, "{{customer.email}}")}
                        >
                          <h3>{"{{customer.email}}"}</h3>
                        </div>
                      </div>
                    </div>
                    <div className="btn-options-submit">
                      <div className="title-btn-name">Page title</div>
                      <div className="copy-btn-name">
                        <div
                          className="copy-header"
                          onClick={() => handleChange(id, "{{page.title}}")}
                        >
                          <h3>{"{{page.title}}"}</h3>
                        </div>
                      </div>
                    </div>
                    <div className="btn-options-submit">
                      <div className="title-btn-name">Page url</div>
                      <div className="copy-btn-name">
                        <div
                          className="copy-header"
                          onClick={() => handleChange(id, "{{page.href}}")}
                        >
                          <h3>{"{{page.href}}"}</h3>
                        </div>
                      </div>
                    </div>
                    <div className="btn-options-submit">
                      <div className="title-btn-name">Product Title</div>
                      <div className="copy-btn-name">
                        <div
                          className="copy-header"
                          onClick={() => handleChange(id, "{{-product.title-}}")}
                        >
                          <h3>{"{{product.title}}"}</h3>
                        </div>
                      </div>
                    </div>
                    {/* <div className="btn-options-submit">
                      <div className="title-btn-name">Customer First Name</div>
                      <div className="copy-btn-name">
                        <div
                          className="copy-header"
                          onClick={() => setCopy("{{text}}")}
                        >
                          <h3>{"{{text}}"}</h3>
                        </div>
                      </div>
                    </div>
                    <div className="btn-options-submit">
                      <div className="title-btn-name">Customer Last Name</div>
                      <div className="copy-btn-name">
                        <div
                          className="copy-header"
                          onClick={() => setCopy("{{text-2}}")}
                        >
                          <h3>{"{{text-2}}"}</h3>
                        </div>
                      </div>
                    </div>
                    <div className="btn-options-submit">
                      <div className="title-btn-name">Email</div>
                      <div className="copy-btn-name">
                        <div
                          className="copy-header"
                          onClick={() => setCopy("{{email}}")}
                        >
                          <h3>{"{{email}}"}</h3>
                        </div>
                      </div>
                    </div>
                    <div className="btn-options-submit">
                      <div className="title-btn-name">Date Time</div>
                      <div className="copy-btn-name">
                        <div
                          className="copy-header"
                          onClick={() => setCopy("{{datetime}}")}
                        >
                          <h3>{"{{datetime}}"}</h3>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hidden;