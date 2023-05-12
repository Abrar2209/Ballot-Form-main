import DOMPurify from 'dompurify';

const Footer = ({ footer }) => {
  const { footerDisclaimer, submitBtnText, resetBtn, resetBtnText } = footer;
  const sanitizedHtml = DOMPurify.sanitize(footerDisclaimer);

 
  return (
    <div  className="rfb-footer">
      <div className="preview-footer">
        <div className="preview-footer-btn">
        <button className="preview-save-button mb-10" type="submit">
          {submitBtnText}
        </button>
        {resetBtn && 
        (<button className="preview-reset-button mb-10" type="submit">
          {resetBtnText}
        </button>)}
        </div>
        <div className="rfb-footer_disclaimer" dangerouslySetInnerHTML={{ __html: sanitizedHtml }}/>
      </div>
    </div>
  );
};

export default Footer;
