import DOMPurify from "dompurify";

const AfterSubmit = ({ afterSubmit }) => {
  const { defaultOption, richText } = afterSubmit;
  const sanitizedTitle = DOMPurify.sanitize(richText);

  return (
    <>
      {defaultOption !== "Hide Form" && (
        <div
          className="rfb-formbuilder rfb-afterSubmit-text"
          style={{
            minHeight: "100px",
            padding: "10px 20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          dangerouslySetInnerHTML={{ __html: sanitizedTitle }}
        />
      )}
    </>
  );
};

export default AfterSubmit;