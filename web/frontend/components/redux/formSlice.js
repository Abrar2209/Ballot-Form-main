import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export const initialState = {
  name: "",
  id: undefined,
  status: false,
  formCSS: {
    form_width: 600,
    form_background_color:'#ffffff',
    header_title_color:'#000000',
    header_desc_color:'#000000',
    footer_disc_color:'#000000',
    input_label_color:'#000000',
    input_background_color:'#ffffff',
    input_text_color:'#000000',
    input_texts_font_size: 14,
    input_placeholder_color:'#000000',
    input_focus_color:'#ffffff',
    button_color:'#ffffff',
    input_border_color: '#000',
    button_text_color:'#000000',
    button_border_color: '#000000',
    button_hover_background_color: '#ffffff',
    button_hover_text_color: '#000000',
    button_hover_border_color: '#000000',
    label_font_size: 14,
    button_font_size: 14,
    disclaimer_font_size: 14,
    placeholder_font_size: 12,
    desc_font_size: 12,
    input_width_size: '100%',
    input_width_textarea: '100%',
    email_width_size: '100%',
    radio_width_size: '100%',
    checkbox_width_size: '100%',
    phone_width_size: '100%',
    form_width_size: '60%'
  },
  fields: [
    {
      id: uuidv4(),
      type: "text",
      label: "Text",
      placeholder: "",
      description: "",
      hideLabel: false,
      required: false,
      displayRequiredNoteOnLabelHide: false,
    },
    {
      id: uuidv4(),
      type: "textarea",
      label: "Textarea",
      placeholder: "",
      description: "",
      hideLabel: false,
      required: false,
      displayRequiredNoteOnLabelHide: false,
    },
  ],
  constantFields: {
    header: {
      title: "Contact Us",
      description: "Get inspiration, new arrivals and the latest offers to your inbox",
    },
    footer: {
      footerDisclaimer: "By submitting your email, you agree to receive marketing emails.",
      submitBtnText: "Submit",
      resetBtn: false,
      resetBtnText: "Reset",
    },
  },
  klaviyoIntegration: {
    enable: false,
    defaultOption: "No value",
    klaviyoListMapping: {}
  },
  afterSubmit: {
    defaultOption: 'Hide Form',
    richText: 'Thank you for submitting the form!'
  },
  appSettings: {
    smtpSetting: {
      smtpProvider: 'smtp.gmail.com',
      portNo: '465',
      username: '',
      appPassword: '',
      customeFromEmail: '',
      customeFromName: ''
    },
    recaptchaSetting: {
      siteKey: '',
      secretKey: ''
    },
    klaviyoSetting: {
      klaviyoApiKey: ''
    }
  },
  formSettings: {
    adminMail: {
      enable: true,
      email: '',
      emailSubject: 'You have new submission',
      emailContent: '',
    },
    googleRecaptcha: {
      enable: false,
    },
    klaviyo: {
      enable: false,
    }
  }
};

const updateField = (state, action) => {
  const { id, values } = action.payload;
  const index = state.fields.findIndex(field => field.id === id);

  if (index !== -1) {
    state.fields[index] = { ...state.fields[index], ...values };
  }
};

const updateConstantField = (state, action) => {
  const { section, key, value } = action.payload;
  state.constantFields[section][key] = value;
};



const formSlice = createSlice({
  name: "formBuilder",
  initialState,
  reducers: {
    setFormName: (state, action) => {
      state.name = action.payload;
    },
    setFormStatus: (state, action) => {
      state.status = action.payload;
    },
    setFormId: (state, action) => {
      state.id = action.payload;
    },
    setFields: (state, action) => {
      state.fields = action.payload;
    },
    setMetaFields: (state, action) => {
      state.constantFields = action.payload;
    },
    setKlaviyoIntegration: (state, action) => {
      const { key, value } = action.payload;
      state.klaviyoIntegration[key] = value;
    },
    resetKlaviyoIntegration: (state, action) => {
      state.klaviyoIntegration = action.payload;
    },
    setUpdateField: updateField,
    setConstantField: updateConstantField,
    deleteField: (state, action) => {
      const { id } = action.payload;
      state.fields = state.fields.filter(field => field.id !== id);
    },
    setFormCSS: (state, action) => {
      const { values } = action.payload;
      state.formCSS = { ...state.formCSS, ...values };
    },
    resetFormCSS: (state, action) => {
      state.formCSS = action.payload;
    },
    setAfterSubmit: (state, action) => {
      const { key, value } = action.payload;
      state.afterSubmit[key] = value;
    },
    resetAfterSubmit: (state, action) => {
      state.afterSubmit = action.payload;
    },
    setFormSettings: (state, action) => {
      const { section, key, value } = action.payload;
      state.formSettings[section][key] = value;
    },
    setAppSettings: (state, action) => {
      const { section, key, value } = action.payload;
      state.appSettings[section][key] = value;
    },
    resetAppSettings: (state, action) => {
      state.appSettings = action.payload;
    },
    resetFormSettings: (state, action) => {
      state.formSettings = action.payload;
    },
  },
});

export const {
  setFields,
  setFormId,
  setFormName,
  setUpdateField,
  deleteField,
  setConstantField,
  setMetaFields,
  setFormStatus,
  setFormCSS,
  resetFormCSS,
  setAfterSubmit,
  resetAfterSubmit,
  setFormSettings,
  setKlaviyoIntegration,
  setAppSettings,
  resetKlaviyoIntegration,
  resetAppSettings,
  resetFormSettings
} = formSlice.actions;

export default formSlice.reducer;


