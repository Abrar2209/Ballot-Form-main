import { Text , TextArea, Email, Radio, Checkbox, Phone, Hidden, HTML } from "./FP_Fields_JSX/index"

const FpFields = ({ field }) => {
  const handleAddField = (field) => {

    switch (field.type) {
      case "text":
          return <Text field={field}/>;
        case "textarea":
          return <TextArea field={field}/>;
        case "checkbox":
          return <Checkbox field={field}/>;
        case "radio":
          return <Radio field={field}/>;
        case "email":
          return <Email field={field}/>;
        case "phone":
          return <Phone field={field}/>;
        case "hidden":
          return <Hidden field={field}/>;  
        case "html":
          return <HTML field={field}/>;  
        default:
          return null;
      }
  };
  
  return (
    <>
      {handleAddField(field)}
    </>
  );
};

export default FpFields;