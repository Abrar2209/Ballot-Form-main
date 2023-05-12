import React from "react";	
import DOMPurify from 'dompurify';	
import "../../assets/formbuilder-design.css"	
import "./form-preview.css"
const Header = ({ header }) => {	
  const { title, description } = header;	
  const sanitizedTitle = DOMPurify.sanitize(title);	
  const sanitizedDesc = DOMPurify.sanitize(description);	
  return (	
    <div className="rfb-header">	
        <div className="rfb-header-text" dangerouslySetInnerHTML={{ __html: sanitizedTitle }}/>	
        <div className="rfb-header-desc" dangerouslySetInnerHTML={{ __html: sanitizedDesc }}/>	
    </div>	
  );	
};	
export default Header;