import {
  setUpdateField,
  deleteField,
  setConstantField,
  setFormName,
  setFields,
  setFormStatus,
  setFormId,
  setMetaFields,
  setFormCSS,
  resetFormCSS,
  setAfterSubmit,
  resetAfterSubmit,
  setFormSettings,
  setKlaviyoIntegration,
  resetKlaviyoIntegration,
  setAppSettings,
  resetAppSettings,
  resetFormSettings,
} from "../../redux/formSlice";
import { store } from "../../redux/store";
import { initialState } from "../../redux/formSlice";
import axios from "axios";
export const handleAfterSubmit = (key, value) => {
  store.dispatch(setAfterSubmit({ key, value }));
};

export const handleCSSChange = (key, value) => {
  store.dispatch(setFormCSS({ values: { [key]: value } }));
};

export const handleInitialize = (
  name,
  id,
  status,
  fields,
  header,
  footer,
  formCSS,
  afterSubmit,
  klaviyoIntegration,
  formSettings
) => {
  store.dispatch(setFormName(name));
  store.dispatch(setFormId(id));
  store.dispatch(setFormStatus(status));
  store.dispatch(setFields(fields));
  const constantFields = {
    header: header,
    footer: footer,
  };
  store.dispatch(setMetaFields(constantFields));
  store.dispatch(resetFormCSS(formCSS));
  store.dispatch(resetAfterSubmit(afterSubmit));
  store.dispatch(resetKlaviyoIntegration(klaviyoIntegration));
  store.dispatch(resetFormSettings(formSettings));
};

export const handleReset = () => {
  store.dispatch(setFormName(initialState.name));
  store.dispatch(setFormId(initialState.id));
  store.dispatch(setFormStatus(initialState.status));
  store.dispatch(setFields(initialState.fields));
  store.dispatch(setMetaFields(initialState.constantFields));
  store.dispatch(resetFormCSS(initialState.formCSS));
  store.dispatch(resetAfterSubmit(initialState.afterSubmit));
  store.dispatch(resetKlaviyoIntegration(initialStateklaviyoIntegration));
  store.dispatch(resetFormSettings(initialState.formSettings));
};

export const handleLabelChange = (id, value) => {
  store.dispatch(
    setUpdateField({
      id,
      values: {
        label: value,
      },
    })
  );
};

export const handlePlaceholderChange = (id, value) => {
  store.dispatch(
    setUpdateField({
      id,
      values: {
        placeholder: value,
      },
    })
  );
};

export const handleInputWidthSizeChange = (id, value) => {
  store.dispatch(
    setUpdateField({
      id,
      values: {
        inputFieldWidth: value,
      },
    })
  );
};

export const handleDescriptionChange = (id, value) => {
  store.dispatch(
    setUpdateField({
      id,
      values: {
        description: value,
      },
    })
  );
};
export const handleHideLabelChange = (id, value) => {
  store.dispatch(
    setUpdateField({
      id,
      values: {
        hideLabel: value,
      },
    })
  );
};
export const handleRequiredChange = (id, value) => {
  store.dispatch(
    setUpdateField({
      id,
      values: {
        required: value,
      },
    })
  );
};
export const handleNoteChange = (id, value) => {
  store.dispatch(
    setUpdateField({
      id,
      values: {
        displayRequiredNoteOnLabelHide: value,
      },
    })
  );
};
export const handleHiddenInputChange = (id, value) => {
  store.dispatch(
    setUpdateField({
      id,
      values: {
        value: value,
      },
    })
  );
};
export const handleHtmlInputChange = (id, value) => {
  store.dispatch(
    setUpdateField({
      id,
      values: {
        htmlCode: value,
      },
    })
  );
};

export const handleValPhoneNumber = (id, value) => {
  store.dispatch(
    setUpdateField({
      id,
      values: {
        validateInternationalPhoneNumber: value,
      },
    })
  );
};

export const handleDelete = (id) => {
  store.dispatch(deleteField({ id }));
};

export const handleConstantFields = (section, key, value) => {
  store.dispatch(
    setConstantField({
      section,
      key,
      value,
    })
  );
};

export const handleMultiOptionChange = (id, value) => {
  store.dispatch(
    setUpdateField({
      id,
      values: {
        options: value,
      },
    })
  );
};

export const handleDefaultOptionChange = (id, value) => {
  store.dispatch(
    setUpdateField({
      id,
      values: {
        defaultOptionChecked: value,
      },
    })
  );
};
export const handleDefaultCountry = (id, value) => {
  store.dispatch(
    setUpdateField({
      id,
      values: {
        defaultCountry: value,
      },
    })
  );
};
export const handleLimitCharacterChange = (id, value) => {
  store.dispatch(
    setUpdateField({
      id,
      values: {
        limitCharacter: value,
      },
    })
  );
};
export const handleUpdateFieldsIndex = (fields) => {
  store.dispatch(setFields(fields));
};

export const handleFormSettingsChange = (section, key, value) => {
  store.dispatch(
    setFormSettings({
      section,
      key,
      value,
    })
  );
};

export const handleAppSettingsChange = (section, key, value) => {
  store.dispatch(
    setAppSettings({
      section,
      key,
      value,
    })
  );
};

export const handleAppSettingsReset = (value) => {
  const appSettings = {
    smtpSetting: JSON.parse(value?.smtpSetting),
    recaptchaSetting: JSON.parse(value?.recaptchaSetting),
    klaviyoSetting: JSON.parse(value?.klaviyoSetting),
  };
  store.dispatch(resetAppSettings(appSettings));
};
export const handleKlaviyoIntegration = (key, value) => {
  store.dispatch(setKlaviyoIntegration({ key, value }));
  console.log(value);
  axios.post('http://localhost:8080/api/klaviyo/list/subscribe',value)
      .then(response =>{
          console.log(response)
      })
      .catch(error =>{
          console.log(error.response)
      })
      console.log(JSON.stringify(value))
};
