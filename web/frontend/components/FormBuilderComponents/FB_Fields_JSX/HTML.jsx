import React, { useState } from "react";
import "../FB_Fields_CSS/html.css";
import { Icon } from "@shopify/polaris";
import { DeleteMinor, CaretUpMinor, CaretDownMinor } from "@shopify/polaris-icons";
import { handleDelete } from "../utils/handlers";
import { RichHTMLEditor } from "../utils/RichTextEditor";

const HTML = ({field}) => {
  const { id, htmlCode } = field;
  const [open, setOpen] = useState(false);

  return (
      <div className="header-section">
        <div
          className="section-component-btn fields"
          onClick={() => setOpen(!open)}
        >
          <div className="btn-icon">
            <h2 className="section-button">HTML</h2>
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
        <div className="html-container">
            <RichHTMLEditor
            rte_val={htmlCode}
            id={id}
            className="form-builder-input-header-title"
          />
        </div>
        )}
      </div>
  );
};

export default HTML;
