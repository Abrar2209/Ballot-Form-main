import { Text , TextArea, Email, Radio, Checkbox, Phone, Hidden, HTML } from "./FB_Fields_JSX/index"

const FbFields = ({ field }) => {

  const handleField = () => {
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
      {handleField()}
    </>
  );
};

export default FbFields;
