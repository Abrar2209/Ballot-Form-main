import { useState } from "react";
import { RichTextEditor } from './utils/RichTextEditor';
import { handleConstantFields } from "./utils/handlers";

const Footer = ({ footerObject }) => {
  const { footerDisclaimer, submitBtnText, resetBtn, resetBtnText } =
    footerObject;
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };
  return (
    <div className="header-section">
      <div className="form-header">
        <div>
          <label className="form-builder-title">Submit Button Text</label>
          <input
            className="mb-10 form-builder-input-header-title"
            type="text"
            value={submitBtnText}
            onChange={(e) =>
              handleConstantFields("footer", "submitBtnText", e.target.value)
            }
          />
        </div>

        {/* <div className="btn-position">
          <label htmlFor="selectInput">Submit Button Text</label>
          <select
            id="selectInput"
            value={selectedOption}
            onChange={handleChange}
          >
            <option value="">-- Select --</option>
            <option value="right"> right</option>
            <option value="center">center</option>
            <option value="left">  left</option>
          </select> */}
          {/* <p>Selected Option: {selectedOption}</p> */}
        {/* </div> */}

        {/* <div>
          <input type="checkbox" className="form-builder-inputs  mb-10" />
          <label>Full Width Button</label>
        </div> */}

        <div className="footer-checkbox mb-10">
          <input
            type="checkbox"
            value={resetBtn}
            className="checkbox-inputs-footer"
            onChange={(e) =>
              handleConstantFields("footer", "resetBtn", e.target.checked)
            }
          />
          <label>Reset Button</label>
        </div>
        {resetBtn && (
          <div className="footer-reset">
            <label>Reset Button Text</label>
            <input
              type="text"
              className="form-builder-input-header-title checkbox-inputs mb-10"
              value={resetBtnText}
              onChange={(e) =>
                handleConstantFields("footer", "resetBtnText", e.target.value)
              }
            />
          </div>
        )}

        <label className="form-builder-title">Consent Disclaimer (optional)</label>
        <RichTextEditor
          rte_val={footerDisclaimer}
          section="footer"
          section_key="footerDisclaimer"
        />
      </div>
    </div>
  );
};

export default Footer;
