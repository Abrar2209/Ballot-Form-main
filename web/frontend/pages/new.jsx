import { Icon } from "@shopify/polaris";
import { ArrowLeftMinor } from "@shopify/polaris-icons";
import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import FormBuilder from "../components/FormBuilder";
import SettingsComponent from "../components/SettingsCOmponent/SettingsComponent"
import FormPreviewer from "../components/FormPreviewer";
import { setFormName } from "../components/redux/formSlice";
import { useAuthenticatedFetch } from "../hooks";
import { handleReset } from "../components/FormBuilderComponents/utils/handlers.js";
import Publish from "../components/Publish";

const newPage = () => {
  const fetch = useAuthenticatedFetch();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeButton, setActiveButton] = useState(0);
  const { id, fields, constantFields, name, status, formCSS, afterSubmit, klaviyoIntegration, formSettings } = useSelector(
    (state) => state.form
  );
  const handleButtonClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
  };
  const [showToast, setShowToast] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSuccess, setToastSuccess] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  function showToastMessage(message) {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  }
  function showToastSuccess(message) {
    setToastSuccess(message);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  }

  const handleFormName = (value) => {
    dispatch(setFormName(value));
  };

  const handleValidate = () => {
    const validate = fields.filter((field) => {
      return field.label === "";
    });
    const validatePhone = fields.some(
      (field) =>
        field.validateInternationalPhoneNumber === true &&
        (field.defaultCountry === "" || field.defaultCountry === undefined)
    );
    if (validate.length !== 0) {
      const items = validate.map((item) => item.type);
      return false;
    } else if (validatePhone) {
      showToastMessage("Select default country");
      return false;
    } else if (name === "") {
      showToastMessage("Set Form Name");
      return false;
    } else if (fields.length === 0) {
      showToastMessage("Add atleast one input field");
      return false;
    } else if (constantFields.footer.submitBtnText === "") {
      showToastMessage("Submit Button Label is empty");
      return false;
    } else if (
      constantFields.footer.resetBtn === true &&
      constantFields.footer.resetBtnText === ""
    ) {
      showToastMessage("Reset button Label is empty");
      return false;
    } else {
      const invalidFields = Object.values(fields).filter(
        (field) => field.options && field.options.length === 0 // add check for undefined or empty options
      );
      if (invalidFields.length > 0) {
        invalidFields.forEach((field) => {
          setShowModal(true);
          console.log(
            `Options array is empty for field with label "${field.label}"`
          );
        });
        return false;
      }
    }
    return true;
  };

  const handleSave = async () => {
    if (handleValidate()) {
      const formId = uuidv4().toString();
      const formData = {
        id: formId,
        formtitle: name,
        shopname: localStorage.getItem('RFB_SHOPNAME'),
        shortcode: `<div id="rfb-${formId}"/>`,
        componentJSON: fields,
        headerJSON: constantFields.header,
        footerJSON: constantFields.footer,
        status: true,
        formSettings: formSettings,
        formCSS: formCSS,
        afterSubmit: afterSubmit,
        klaviyoIntegration: klaviyoIntegration
      };
      console.log(formData)
      try {
        const response = await fetch("http://localhost:8080/api/forms/createform", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const result = await response.json();
        console.log(result);
        showToastSuccess("Form Saved Successfully");
        navigate(`/form`);
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  const handleUpdate = async (uuid) => {
    console.log("Form Updated");
    if (handleValidate()) {
      const formData = {
        formtitle: name,
        componentJSON: fields,
        headerJSON: constantFields.header,
        footerJSON: constantFields.footer,
        status: status,
        formSettings: formSettings,
        formCSS: formCSS,
        afterSubmit: afterSubmit,
        klaviyoIntegration: klaviyoIntegration
      };
      try {
        const response = await fetch(`http://localhost:8080/api/forms/updateform?id=${uuid}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        console.log(data);
        showToastSuccess("Form updated Successfully");
        handleReset();
        navigate(`/form`);
      } catch (error) {
        console.log("Error>>>>>>> ", error);
      }
    }
  };

 
  return (
    <div>
      <div className="fb-header-section">
        <div>
        <button onClick={() => setModalOpen(!modalOpen)} className="btn-back">
            <div className="btn-back-icon">
              <Icon source={ArrowLeftMinor} />
            </div>
            <div className="btn-back-text">Back to list</div>
          </button>
          {modalOpen && (
            <div>
              <div className="modal">
                <div className="modal-content-form">
                  <h3>Would you like to save the form?</h3>
                  <div className="modal-buttons">
                    <button onClick={() => setModalOpen(!modalOpen)} >Yes</button>
                    <button onClick={() => {handleReset(); navigate(`/form`);}}>No</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="input-field">
          <input
            type="text"
            placeholder="Name Your Form"
            value={name}
            onChange={(e) => handleFormName(e.target.value)}
            required
          />
        </div>
        <div className="btn">
          <button
            className="cancel-btn"
            onClick={() => {
              handleReset();
              navigate(`/form`);
            }}
          >
            Cancel
          </button>
          {id === undefined ? (
            <button className="save-btn" onClick={handleSave}>
              Save
            </button>
          ) : (
            <button className="save-btn" onClick={() => handleUpdate(id)}>
              Update
            </button>
          )}
        </div>
      </div>
      <div className=" fb-content-section">
        <div className="right-container-main">
          <div className="right-container">
            <div
              className={`rc-section element
                    ${activeButton === 0 ? "active" : ""}
                `}
              onClick={() => handleButtonClick(0)}
            >
              Elements
            </div>
            <div
              className={`rc-section settings
                    ${activeButton === 1 ? "active" : ""}
                `}
              onClick={() => handleButtonClick(1)}
            >
              Settings
            </div>
            <div
              className={`rc-section publish
                    ${activeButton === 2 ? "active" : ""}
                `}
              onClick={() => handleButtonClick(2)}
            >
              Publish
            </div>
          </div>
          <div>
            {activeButton === 0 && <FormBuilder />}
            {activeButton === 1 && <SettingsComponent />}
            {activeButton === 2 && <Publish />}
          </div>
        </div>
        <div className="left-container">
          <FormPreviewer fields={fields} constantFields={constantFields} formCSS={formCSS} afterSubmit={afterSubmit} />
        </div>
      </div>
      {showToast && <div className="toast">{toastMessage}</div>}
      {showSuccess && <div className="toast-success">{toastSuccess}</div>}
    </div>
  );
};

export default newPage;
