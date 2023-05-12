import { Input, Table, Select } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Frame, Icon, Toast } from "@shopify/polaris";
import { ClipboardMinor, DeleteMajor, EditMinor } from "@shopify/polaris-icons";
import { useNavigate } from "react-router-dom";
import { handleInitialize } from "../components/FormBuilderComponents/utils/handlers";
import CreateFormElements from "../components/CreateFormElements";

const viewforms = () => {
  const [active, setActive] = useState(false);
  const toggleActive = useCallback(() => setActive((active) => !active), []);
  const navigate = useNavigate();
  const [formIdToDelete, setFormIdToDelete] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState([]);
  const [value, setValue] = useState("");
  const [sorting, setSorting] = useState(true);
  const [pageSize, setPageSize] = useState(10);

  const toastMarkup = active ? (
    <Toast content="Shortcode Copied" onDismiss={toggleActive} />
  ) : null;

  const handleFormFetch = () => {
    fetch("http://localhost:8080/api/forms/getforms")
      .then((response) => response.json())
      .then((data) => setDataSource(data.forms))
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    handleFormFetch()
  }, []);

  const handleEdit = async (uuid) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/forms/getform?id=${uuid}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      const fields = JSON.parse(data.forms.componentJSON);
      const header = JSON.parse(data.forms.headerJSON);
      const footer = JSON.parse(data.forms.footerJSON);
      const afterSubmit = JSON.parse(data.forms.afterSubmit);
      const klaviyoIntegration = JSON.parse(data.forms.klaviyoIntegration);
      const formSettings = JSON.parse(data.forms.formSettings);
      const formCSS = JSON.parse(data.forms.formCSS);
      const { formtitle, id, status } = data.forms;
      handleInitialize(formtitle, id, status, fields, header, footer, formCSS, afterSubmit, klaviyoIntegration, formSettings);
      navigate(`/new`);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleModalOpen = (id) => {
    setFormIdToDelete(id);
    setModalOpen(true);
  };
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/forms/deleteform?id=${formIdToDelete}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.text();
      console.log(data);
      //   fetchFormData();
    } catch (error) {
      console.error("Error:", error);
    }
    setModalOpen(false);
  };

  const handleToggle = async (id, val) => {
    try {
      console.log(val)
      const response = await fetch(
        `http://localhost:8080/api/forms/updateform?id=${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: val,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      handleFormFetch()
    } catch (error) {
      console.log("Error>>>>>>> ", error);
    }
  };

  const [columns, setColumns] = useState([
    {
      title: "Form Title",
      dataIndex: "formtitle",
      key: "formTitle",
    },
    {
      title: "Form ID",
      dataIndex: "id",
      key: "formId",
    },
    {
      title: "Shortcode",
      dataIndex: "shortcode",
      key: "shortcode",
    },
    {
      title: "Copy",
      dataIndex: "shortcode",
      render: (shortcode) => (
        <button
          className="copy-btn"
          onClick={() => {
            navigator.clipboard.writeText(shortcode);
            toggleActive();
          }}
        >
          <Icon source={ClipboardMinor} color="base" />
        </button>
      ),
    },
    {
      title: "Responses",
      dataIndex: "responses",
      render: (responses, record) => (
        <button
          className="viewforms-btn"
          onClick={() => {
            navigate("/submission", { state: { formtitle: record.formtitle } });
          }}
        >
          view
        </button>
      ),
    },

    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdOn",
    },
    {
      title: "Action",
      key: "action",
      render: (id) => (
        <div>
          <button className="edit-btn" onClick={() => handleEdit(id.id)}>
            <Icon source={EditMinor} color="base" />
          </button>
          <button className="delete-btn" onClick={() => handleModalOpen(id.id)}>
            <Icon source={DeleteMajor} color="base" />
          </button>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <label class="switch" onClick={() => handleToggle(record.id, !record.status)}>
          <input type="checkbox" />
          <span class="slider"></span>
          <span class="label-on">On</span>
          <span class="label-off">Off</span>
        </label>
      ),
    },
  ]);
  const [dataSource, setDataSource] = useState([]);

  const sortedDataSource = sorting
  ? [...dataSource].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
  : [...dataSource].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const filteredDataSource = sortedDataSource.filter((data) =>
    Object.values(data).some(
      (val) => val && val.toString().toLowerCase().includes(value.toLowerCase())
    )
  );

  return (
    <Frame>
      {dataSource?.length === 0 ? (
        <CreateFormElements />
      ) : (
        <div className="warppings-viewforms">
          <div className="table-header">
            <h2 className="headings">Form</h2>
            <Button
              primary
              onClick={() => {
                navigate(`/new`);
              }}
            >
              Create Form
            </Button>
          </div>
          <div className="data-listing">
            <div className="listings">
              <div className="pagination-listing">
                <span>Display</span>
                <Select defaultValue="10" onChange={(e) => setPageSize(e)}>
                  <Option value="10">10</Option>
                  <Option value="25">25</Option>
                  <Option value="50">50</Option>
                </Select>
                <span>records per page</span>
              </div>
              <div className="viewforms-listing">
                <Select
                  className="listing-selection"
                  placeholder="Filter"
                  onChange={(value) => setSorting(value === "old")}
                >
                  <Option className="listing-selection" value="old">
                    Old
                  </Option>
                  <Option value="new">New</Option>
                </Select>
                <Input
                  placeholder="Search"
                  value={value}
                  onChange={(event) => setValue(event.target.value)}
                />
              </div>
            </div>
            <Table
              columns={columns}
              dataSource={filteredDataSource}
              pagination={{ pageSize }}
            />
            {modalOpen && (
              <div key={formData.id}>
                <div className="modal">
                  <div className="modal-content">
                    <h3>Are you sure you want to delete?</h3>
                    <div className="modal-buttons">
                      <button onClick={() => handleDelete(formData.id)}>
                        Yes
                      </button>
                      <button onClick={() => setModalOpen(!modalOpen)}>
                        No
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {toastMarkup}
          </div>
        </div>
      )}
    </Frame>
  );
};

export default viewforms;