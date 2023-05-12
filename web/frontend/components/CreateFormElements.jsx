import { Button, CalloutCard } from "@shopify/polaris";
import "../assets/base.css";
import "../assets/style.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CreateFormElements = () => {
  const navigate = useNavigate();
  
  return (
    <div>
      <div className="dr-create-form-card">
        <div className="content">
          <h2>You dont have any forms Yet</h2>
          <p>Your forms will appear here.</p>
          <div>
            <Button
              primary
              onClick={() => {
                navigate(`/new`);
              }}
            >
              Create Form
            </Button>
          </div>
        </div>
        <div className="image-container">
          <img
            src="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default CreateFormElements;

{
  /* <div>
    <CalloutCard
  title="Customize the style of your checkout"
  illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
  primaryAction={{
    content: 'Customize checkout',
    url: '#',
  }}
>
  <p>Upload your store's logo, change colors and fonts, and more.</p>
</CalloutCard>
</div> */
}
