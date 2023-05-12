import { useState } from "react";
import { useSelector } from "react-redux";
import {
  ArrowRightMinor,
  ArrowLeftMinor,
} from "@shopify/polaris-icons";
import { Icon } from "@shopify/polaris";
import Design from "./Design";
import Integration from "./Integration";
import Mail from "./Mail";
import GoogleRecaptcha from "./GoogleRecaptcha";

const FormBuilder = () => {
  const { formCSS, formSettings, appSettings,klaviyoIntegration } = useSelector((state) => state.form);
  const [isMail, setIsMail] = useState(false);
  const [isDesign, setIsDesign] = useState(false);
  const [isIntegrate, setIsIntegrate] = useState(false);
  const [isGoogle, setisGoogle] = useState(false);
  const [isFormElementVisible, setIsFormElementVisible] = useState(true);

  return (
    <div className="dr-form-builder">
      <div className="forms">
        {/* Header */}

        <div
          className={`form-element header ${
            isFormElementVisible ? "" : "hidden"
          }`}
          onClick={() => {
            setIsMail(!isMail);
            setIsFormElementVisible(!isFormElementVisible);
          }}
        >
          <div>Mail</div>
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
          {isMail && (
            <div className={`drawer`}>
              <div className="forms-header">
                <button
                  className={`form-button ${
                    !isFormElementVisible ? "" : "hidden"
                  }`}
                  onClick={() => {
                    setIsMail(!isMail);
                    setIsFormElementVisible(!isFormElementVisible);
                  }}
                >
                  <Icon source={ArrowLeftMinor} color="base" />
                </button>
                <div className="form-h2">
                  <h2>Mail</h2>
                </div>
              </div>
              <Mail formSettings={formSettings} appSettings={appSettings} />
            </div>
          )}
        </div>
        {/* Body */}
        <div
          className={`form-element body ${
            isFormElementVisible ? "" : "hidden"
          }`}
          onClick={() => {
            setIsDesign(!isDesign);
            setIsFormElementVisible(!isFormElementVisible);
          }}
        >
          <div>Design</div>
          <div className="icon">
            <button className="icon-btn">
              <Icon source={ArrowRightMinor} color="base" />
            </button>
          </div>
        </div>
        <div>
          {isDesign && (
            <div className={`drawer`}>
              <div className="forms-header">
                <button
                  className={`form-button ${
                    !isFormElementVisible ? "" : "hidden"
                  }`}
                  onClick={() => {
                    setIsDesign(!isDesign);
                    setIsFormElementVisible(!isFormElementVisible);
                  }}
                >
                  <Icon source={ArrowLeftMinor} color="base" />
                </button>
                <div className="form-h2">
                  <h2>Design</h2>
                </div>
              </div>
              <Design formCSS={formCSS}/>
            </div>
          )}
        </div>
        {/* Footer */}
        <div
          className={`form-element footer ${
            isFormElementVisible ? "" : "hidden"
          }`}
          onClick={() => {
            setIsIntegrate(!isIntegrate);
            setIsFormElementVisible(!isFormElementVisible);
          }}
        >
          <div>Integration</div>
          <div className="icon">
            <button className="icon-btn">
              <Icon source={ArrowRightMinor} color="base" />
            </button>
          </div>
        </div>
        <div>
          {isIntegrate && (
            <div className={`drawer`}>
              <div className="forms-header">
                <button
                  className={`form-button ${
                    !isFormElementVisible ? "" : "hidden"
                  }`}
                  onClick={() => {
                    setIsIntegrate(!isIntegrate);
                    setIsFormElementVisible(!isFormElementVisible);
                  }}
                >
                  <Icon source={ArrowLeftMinor} color="base" />
                </button>
                <div className="form-h2">
                  <h2>Integration</h2>
                </div>
              </div>
              <Integration klaviyoIntegration={klaviyoIntegration}/>
            </div>
          )}
        </div>

        {/* After Submit */}
        <div
          className={`form-element submit ${
            isFormElementVisible ? "" : "hidden"
          }`}
          onClick={() => {
            setisGoogle(!isGoogle);
            setIsFormElementVisible(!isFormElementVisible);
          }}
        >
          <div>Google Recaptcha</div>
          <div className="icon">
            <button className="icon-btn">
              <Icon source={ArrowRightMinor} color="base" />
            </button>
          </div>
        </div>
        <div>
          {isGoogle && (
            <div className={`drawer`}>
              <div className="forms-header">
                <button
                  className={`form-button ${
                    !isFormElementVisible ? "" : "hidden"
                  }`}
                  onClick={() => {
                    setisGoogle(!isGoogle);
                    setIsFormElementVisible(!isFormElementVisible);
                  }}
                >
                  <Icon source={ArrowLeftMinor} color="base" />
                </button>
                <div className="form-h2">
                  <h2>Google Recaptcha</h2>
                </div>
              </div>
              <GoogleRecaptcha formSettings={formSettings} appSettings={appSettings}/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;
