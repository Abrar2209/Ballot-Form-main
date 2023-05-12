import { handleConstantFields, handleHtmlInputChange, handleAfterSubmit, handleFormSettingsChange } from "./handlers";
import { Editor } from "@tinymce/tinymce-react";

export const RichTextEditor = ({ rte_val, section, section_key }) => {
  const handleOnChange = (value) => {
    if(section === 'richText'){
      handleAfterSubmit(section, value)
    }else if(section === 'adminMail'){
      handleFormSettingsChange(section, section_key, value);
    }else{
      handleConstantFields(section, section_key, value);
    }
  };

  return (
    <div>
      <Editor
        value={rte_val}
        init={{
          selector: "textarea",
          plugins: "code",
          toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist |  outdent indent | code',
          statusbar: false,
        }}
        onEditorChange={(newValue) => handleOnChange(newValue)}
      />
    </div>
  );
};


export const RichHTMLEditor = ({ rte_val, id }) => {
  const handleOnChange = (value) => {
    handleHtmlInputChange(id, value);
  };

  return (
    <div>
      <Editor
        value={rte_val}
        init={{
          selector: "textarea",
          plugins: "code",
          toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist |  outdent indent | code',
          statusbar: false,
        }}
        onEditorChange={(newValue) => handleOnChange(newValue)}
      />
    </div>
  );
};

