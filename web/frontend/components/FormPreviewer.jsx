import React, { useEffect, useState, useCallback } from "react";
import FpFields from "./FormPreviewComponents/FpFields";
import Header from "./FormPreviewComponents/Header";
import Footer from "./FormPreviewComponents/Footer";
import AfterSubmit from "./FormPreviewComponents/AfterSubmit";
import { useSelector } from "react-redux";
//import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer, toast } from "react-toastify";
import { handleReset } from "./FormBuilderComponents/utils/handlers"; 
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
} from "react-google-recaptcha-v3";

const FormPreviewer = ({ id }) => {
  const [token, setToken] = useState();
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { inputFields, phoneInputError } = useSelector((state) => state.form);
  const [header, setHeader] = useState();
  const [footer, setFooter] = useState();
  const [shopname, setShopname] = useState();
  const [afterSubmit, setAfterSubmit] = useState();
  const [fields, setFields] = useState([]);
  const [formtitle, setFormtitle] = useState("");
  const [formId, setFormId] = useState("");
  const [formCSS, setFormCSS] = useState({});
  const [formStatus, setFormStatus] = useState(false);
  const [formSettings, setFormSettings] = useState({});

  const [customerID, setCustomerID] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const pageUrl = window.location.href;

  const onVerify = useCallback((token) => {
    setToken(token);
  }, []);

  const showToast = (val, message) => {
    if (val === "success") {
      toast.success(message);
    }
    if (val === "error") {
      toast.error(message);
    }
  };

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const customerId = localStorage.getItem("FormBuilderAppCustomerID");

        if (customerId) {
          setCustomerID(customerId);
        } else {
          // Fetch current IP address
          let response = await fetch("https://api.ipify.org/?format=json");
          let data = await response.json();
          setIpAddress(data.ip);
        }

        const response = await fetch(
          `http://localhost:8080/api/forms/getform?id=${id}`
        );
        const data = await response.json();
        console.log(data);
        setFields(JSON.parse(data.forms.componentJSON));
        setHeader(JSON.parse(data.forms.headerJSON));
        setFooter(JSON.parse(data.forms.footerJSON));
        setAfterSubmit(JSON.parse(data.forms.afterSubmit));
        setFormSettings(JSON.parse(data.forms.formSettings));
        setFormtitle(data.forms.formtitle);
        setFormId(data.forms.id);
        setShopname(data.forms.shopname);
        setFormCSS(JSON.parse(data.forms.formCSS));
        setFormStatus(data.forms.status);
        console.log(data.forms.shopname)
      } catch (error) {
        console.log("Error>>>>>>>", error);
      }
    };
    fetchFormData();
  }, [id]);

  const handleInputValidation = () => {
    const requiredLabels = fields
      .filter((field) => field.required)
      .map((field) => field.label);

    // checks that key and value pair for all the required fields is present ot not
    for (let label of requiredLabels) {
      if (!(label in inputFields)) {
        showToast("error", `${label} is required!`);
        return false;
      }
    }

    // checks whether value for all the required fields is not empty
    for (const label of requiredLabels) {
      const value = inputFields[label];
      if (Array.isArray(value)) {
        if (value.length === 0) {
          showToast(
            "error",
            `Atleast one option need to be selected for ${label}!`
          );
          return false;
        }
      } else if (typeof value === "string") {
        if (value.trim().length === 0) {
          showToast("error", `${label} is required!`);
          return false;
        }
      }
    }

    if (phoneInputError) {
      showToast("error", "Invalid phone number!");
      return false;
    }

    if (formtitle === "") {
      showToast("error", "Form Name is required!");
      return false;
    }

    return true;
  };

  const handleFormSubmit = async (event) => {
    console.log(shopname)
    event.preventDefault();
    console.log("button is clicked");
    const formData = {
      formtitle: formtitle,
      fields: inputFields,
      pageUrl: pageUrl,
      customerIpAdd: ipAddress,
      customerID: customerID,
      recaptchaEnabled: formSettings.googleRecaptcha.enable,
      adminMailSetings: formSettings.adminMail,
      recaptchaToken: token,
      shopname: shopname,
    };

    if (handleInputValidation()) {
      try {
        const response = await fetch("http://localhost:8080/api/forms/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const result = await response.json();
        console.log(result);
        setFormSubmitted(true);
        handleReset();

        // Set formSubmitted to false after 3 seconds
        setTimeout(() => {
          setFormSubmitted(false);
        }, 3000);
      } catch (error) {
        showToast("error", `${error.message}`);
      }
    }

    setRefreshReCaptcha((r) => !r);
  };

  return (
    <>
      <style>
        {`        
        #rfb-${formId} .formbuilder-form {
          max-width: ${formCSS.form_width}px !important;
          width: ${formCSS.form_width_size} !important;
          background-color: ${formCSS.form_background_color} !important;
        }
        
        #rfb-${formId} .formbuilder-form .rfb-header .rfb-header-text, .rfb-header-text h1, .rfb-header-text h2, .rfb-header-text h3, .rfb-header-text h4, .rfb-header-text h5, .rfb-header-text h6, .rfb-header-text p, .rfb-header-text span, .rfb-header-text a, .rfb-afterSubmit-text {
          color: ${formCSS.header_title_color} !important;
        }
        
        #rfb-${formId} .formbuilder-form .rfb-header .rfb-header-desc, .rfb-header-desc h1, .rfb-header-desc h2, .rfb-header-desc h3, .rfb-header-desc h4, .rfb-header-desc h5, .rfb-header-desc h6, .rfb-header-desc p, .rfb-header-desc span, .rfb-header-desc a{
          color: ${formCSS.header_desc_color} !important;
        }
        
        #rfb-${formId} .formbuilder-form .rfb-fields .rfb-fields-label {
          color: ${formCSS.input_label_color} !important;
          font-size: ${formCSS.label_font_size}px !important;
        }
        
        #rfb-${formId} .formbuilder-form .rfb-fields .rfb-fields-inputs {
          background-color: ${formCSS.input_background_color} !important;
          color: ${formCSS.input_text_color} !important;
          border: 1px solid ${formCSS.input_border_color} !important;
          font-size: ${formCSS.input_texts_font_size}px !important;
          outline: none;
        }
        #rfb-${formId} .formbuilder-form .rfb-fields .rfb-fields-inputs:focus {
          border: 1px solid ${formCSS.input_focus_color} !important;
        }
        #rfb-${formId} .formbuilder-form .rfb-fields .rfb-fields-inputs-check {
          color: ${formCSS.input_label_color} !important;
          font-size: ${formCSS.input_texts_font_size}px !important;
        }
        
        #rfb-${formId} .formbuilder-form .rfb-fields .rfb-fields-inputs::placeholder {
          font-size: ${formCSS.placeholder_font_size}px !important;
          color:  ${formCSS.input_placeholder_color} !important;
        }
        
        #rfb-${formId} .formbuilder-form .rfb-fields .rfb-fields-desc{
          font-size: ${formCSS.desc_font_size}px !important;
        }
        
        #rfb-${formId} .rfb-footer .rfb-footer_buttons-save {
          background-color: ${formCSS.button_text_color} !important;
          color: ${formCSS.button_color} !important;
          border: 1px solid ${formCSS.button_border_color} !important;
          font-size: ${formCSS.button_font_size}px !important;
          cursor: pointer;
          transition: "background-color 0.3s ease-in-out",
        }
        
        #rfb-${formId} .rfb-footer .rfb-footer_buttons-save:hover {
          background-color: ${formCSS.button_hover_background_color} !important;
          color: ${formCSS.button_hover_text_color} !important;
          border: 1px solid ${formCSS.button_hover_border_color} !important;
        }
        
        #rfb-${formId} .rfb-footer .rfb-footer_disclaimer{
          color: ${formCSS.footer_disc_color} !important;
          font-size: ${formCSS.disclaimer_font_size}px !important;
        }
        `}
      </style>
      {formStatus &&
        !(formSubmitted && afterSubmit.defaultOption === "Hide Form") && (
          <>
            <form onSubmit={handleFormSubmit} className="formbuilder-form">
              {formSettings.googleRecaptcha.enable && (
                <GoogleReCaptchaProvider
                  reCaptchaKey="6LdB1MklAAAAAOBDbbpgvHOyUFVDNh4nUGsjb-Q4"
                  language="en"
                  scriptProps={{
                    async: true,
                    defer: true,
                    appendTo: "head",
                  }}
                  useRecaptchaNet={true}
                >
                  <GoogleReCaptcha
                    onVerify={onVerify}
                    refreshReCaptcha={refreshReCaptcha}
                  />
                </GoogleReCaptchaProvider>
              )}
              {header && <Header header={header} />}

              <div className="rfb-fields">
                {fields &&
                  fields.map((field) => (
                    <FpFields key={field.id} field={field} />
                  ))}
              </div>
              {footer && (
                <Footer footer={footer} handleFormSubmit={handleFormSubmit} />
              )}
              <ToastContainer
                position="bottom-center"
                autoClose={2000}
                hideProgressBar={false}
                closeOnClick
                limit={1}
              />
            </form>
          </>
        )}
      {formSubmitted && <AfterSubmit afterSubmit={afterSubmit} />}
    </>
  );
};

export default FormPreviewer;
