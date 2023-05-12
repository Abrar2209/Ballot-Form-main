import { Icon, Layout, Page } from "@shopify/polaris";
import { FormsMajor, SettingsMajor, ReportMinor } from "@shopify/polaris-icons";
import "../assets/base.css";
import "../assets/style.css";
import { useState } from "react";
import ViewForms from "./viewforms";
import Submission from "./submission";
import Settings from "./settings";

const form = () => {
  const [activeButton, setActiveButton] = useState(0);

  const handleButtonClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
  };

  return (
    <div>
      <Page fullWidth>
        <Layout>
          <Layout.Section>
            <div className="dr-form-container">
              <div
                className={`button-container ${
                  activeButton === 0 ? "active" : ""
                }`}
                onClick={() => handleButtonClick(0)}
              >
                <div className="image-container">
                  <Icon source={FormsMajor} />
                </div>
                <div className="text-container-nav">Forms</div>
              </div>
              <div
                className={`button-container ${
                  activeButton === 1 ? "active" : ""
                }`}
                onClick={() => handleButtonClick(1)}
              >
                <div>
                  <Icon source={ReportMinor} />
                </div>
                <div className="text-container-nav">Submissions</div>
              </div>
              <div
                className={`button-container ${
                  activeButton === 2 ? "active" : ""
                }`}
                onClick={() => handleButtonClick(2)}
              >
                <div className="image-container">
                  <Icon source={SettingsMajor}  />
                </div>
                <div className="text-container-nav">Settings</div>
              </div>
            </div>
          </Layout.Section>
          <Layout.Section>
           {activeButton === 0 && <ViewForms />} 
           {activeButton === 1 && <Submission />} 
           {activeButton === 2 && <Settings />} 
          </Layout.Section>
        </Layout>
      </Page>
    </div>
  );
};

export default form;
