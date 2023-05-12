import React from "react";
import { v4 as uuidv4 } from "uuid";
import { setFields } from "../redux/formSlice.js";
import { useDispatch, useSelector } from "react-redux";
const Toolbar = () => {

  const { fields } = useSelector((state) => state.form);
  const dispatch = useDispatch();
  const addField = (newField) => {
    dispatch(setFields([...fields, newField]));
  };

  
  const handleAddField = (type) => {
    const id = uuidv4();
    let newField = {};

    switch (type) {
      case "text":
        newField = {
          id,
          type: "text",
          label: "Text",
          placeholder: "",
          description: "",
          hideLabel: false,
          required: false,
          displayRequiredNoteOnLabelHide: false,
          inputFieldWidth: '100%'
        };
        addField(newField);
        break;
      case "textarea":
        newField = {
          id,
          type: "textarea",
          label: "Textarea",
          placeholder: "",
          description: "",
          hideLabel: false,
          required: false,
          displayRequiredNoteOnLabelHide: false,
          inputFieldWidth: '100%'
        };
        addField(newField);
        break;
      case "checkbox":
        newField = {
          id,
          type: "checkbox",
          label: "CheckBox",
          description: "",
          options: ["Option 1"],
          defaultOptionChecked: "",
          hideLabel: false,
          required: false,
          displayRequiredNoteOnLabelHide: false,
          inputFieldWidth: '100%'
        };
        addField(newField);
        break;
      case "radio":
        newField = {
          id,
          type: "radio",
          label: "Radio",
          description: "",
          options: ["Option 1", "Option 2"],
          defaultOptionChecked: "",
          hideLabel: false,
          required: false,
          displayRequiredNoteOnLabelHide: false,
          inputFieldWidth: '100%'
        };
        addField(newField);
        break;
      case "email":
        newField = {
          id,
          type: "email",
          label: "Email",
          placeholder: "",
          description: "",
          hideLabel: false,
          required: false,
          displayRequiredNoteOnLabelHide: false,
          inputFieldWidth: '100%'
        };
        addField(newField);
        break;
      case "phone":
        newField = {
          id,
          type: "phone",
          label: "Phone",
          placeholder: "",
          description: "",
          defaultCountry: "",
          validateInternationalPhoneNumber: false,
          hideLabel: false,
          required: false,
          displayRequiredNoteOnLabelHide: false,
          inputFieldWidth: '100%'
        };
        addField(newField);
        break;
      case "hidden":
        newField = {
          id,
          type: "hidden",
          label: "Hidden",
          value: "",
        };
        addField(newField);
        break;
      case "html":
        newField = {
          id,
          type: "html",
          label: "Html",
          htmlCode: "",
        };
        addField(newField);
        break;
      default:
        return null;
    }
  };

  return (
      <div className="section-component">
          <div>
            <div className="add-fields-element">
              <h2>Fields</h2>
              <div className="btn-elements">
                <div className="popup">
                  <div className="popup-content">
                    <div className="box-container">
                      <button
                        className="box-field"
                        onClick={() => handleAddField("text")}
                      >
                        Text Field
                      </button>
                      <button
                        className="box-field"
                        onClick={() => handleAddField("textarea")}
                      >
                        Textarea
                      </button>
                      <button
                        className="box-field"
                        onClick={() => handleAddField("checkbox")}
                      >
                        Checkbox
                      </button>
                      <button
                        className="box-field"
                        onClick={() => handleAddField("radio")}
                      >
                        Radio
                      </button>
                      <button
                        className="box-field"
                        onClick={() => handleAddField("email")}
                      >
                        Email
                      </button>
                      <button
                        className="box-field"
                        onClick={() => handleAddField("phone")}
                      >
                        Phone Number
                      </button>
                      <button
                        className="box-field"
                        onClick={() => handleAddField("hidden")}
                      >
                        Hidden Field
                      </button>
                      <button
                        className="box-field"
                        onClick={() => handleAddField("html")}
                      >
                        HTML
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </div>
  );
};

export default Toolbar;
