import { handleFormSettingsChange } from "../FormBuilderComponents/utils/handlers";

const GoogleRecaptcha = ({formSettings, appSettings}) => {
  const { enable } = formSettings.googleRecaptcha;
  const { siteKey, secretKey } = appSettings.recaptchaSetting;
  return (
    <div className="main-layout">
      {(siteKey && secretKey) &&
      (<div className="klaviyo enable">
        <input
          type="checkbox"
          className="color-input-checkbox"
          onChange={(e) => handleFormSettingsChange('googleRecaptcha', 'enable', e.target.checked)}
          checked={enable}
        />
        <div>Enable</div>
      </div>)}
      {!(siteKey && secretKey) &&
      (<div className="klaviyo enable">
        <div>Please make sure that you have set Google reCaptcha v3 Site key and Secret key in Settings</div>
      </div>)}
    </div>
  );
};

export default GoogleRecaptcha;