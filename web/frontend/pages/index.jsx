import { Card, CalloutCard, EmptyState, Layout, Page } from "@shopify/polaris";
import React, { useState, useEffect } from "react";
import "../assets/base.css";
import "../assets/style.css";
import { useNavigate } from "react-router-dom";
import { useAppQuery } from "../hooks";
import { handleAppSettingsReset } from "../components/FormBuilderComponents/utils/handlers";

const form = () => {
  const navigate = useNavigate();
  const [shop, setShop] = useState("");

  useEffect(() => {
    localStorage.setItem("RFB_SHOPNAME", shop);
    const fetchAppSettingData = async () => {
      let response = await fetch(`http://localhost:8080/api/forms/getShopifySession?shop=${shop}`, { 
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });
      
      let data = await response.json();
      handleAppSettingsReset(data[0])
    }
    fetchAppSettingData();
  }, [shop]);

  useAppQuery({
    url: "/api/shop",
    reactQueryOptions: {
      onSuccess: (res) => {
        console.log("res", res);
        setShop(res[0].myshopify_domain);
      },
    },
  });

  let template = "",
    uuid = "194eab67-fca4-4f6f-b610-ffbe27269bcd",
    handle = "app-embed-script";
  const url = `https://${shop}/admin/themes/current/editor?context=apps&template=${template}&activateAppId=${uuid}/${handle}`;

  return (
    <div>
      <Page fullWidth>
        <Layout>
          <Layout.Section>
            <CalloutCard
              title="Enable app extension"
              illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
              primaryAction={{
                content: "Enable",
                url: url,
                target: "_blank",
              }}
            />
          </Layout.Section>
          <Layout.Section>
            <div className="first-page dr-forms-dashboard">
              <div className="title-with-content">
                <h2>Welcome to my Form Builder</h2>
                <div className="title-content-grid">
                  <div>
                    <Card sectioned>
                      <EmptyState
                        heading="Forms"
                        action={{
                          content: "Forms",
                          onAction: () => {
                            navigate(`/form`);
                          },
                        }}
                        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                      >
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna.
                        </p>
                      </EmptyState>
                    </Card>
                  </div>
                  <div>
                    <Card sectioned>
                      <EmptyState
                        heading="Submission"
                        action={{
                          content: "Submission",
                          onAction: () => {
                            navigate(`/submission`);
                          },
                        }}
                        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                      >
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna.
                        </p>
                      </EmptyState>
                    </Card>
                  </div>
                  <div>
                    <Card sectioned>
                      <EmptyState
                        heading="Settings"
                        action={{
                          content: "Settings",
                          onAction: () => {
                            navigate(`/settings`);
                          },
                        }}
                        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                      >
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna.
                        </p>
                      </EmptyState>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </Layout.Section>
        </Layout>
      </Page>
    </div>
  );
};

export default form;
