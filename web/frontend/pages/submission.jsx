import { Page, Button, Icon } from "@shopify/polaris";
import { Table, Tag, Space, Input, Select, Switch } from "antd";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  CircleCancelMajor,
  FormsMajor,
  CustomersMajor,
  PageMajor,
} from "@shopify/polaris-icons";
import Papa from "papaparse";

const submission = () => {
  const location = useLocation();
  const fetchUrl =
    location.state !== null
      ? `http://localhost:8080/api/forms/getSubmissions/${location.state.formtitle}`
      : `http://localhost:8080/api/forms/getSubmissions/SampleForm1`;

  const [columns, setColumns] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalRecord, setModalRecord] = useState();
  const [value, setValue] = useState("");
  const [sorting, setSorting] = useState(true);
  const [pageSize, setPageSize] = useState(3);

  useEffect(() => {
    fetch(fetchUrl)
      .then((res) => res.json())
      .then((result) => {
        const submitObj = result.data;
        const newObjects = submitObj.map((obj) => {
          const fieldsObj = JSON.parse(obj.fields);
          return { ...obj, ...fieldsObj };
        });

        newObjects.forEach((obj) => {
          delete obj.fields;
          delete obj.updatedAt;
        });

        const firstObj = newObjects.reduce((acc, obj) => {
          if (Object.keys(obj).length > Object.keys(acc).length) {
            return obj;
          }
          return acc;
        });

        const { customerID, pageUrl, customerIpAdd, ...restProps } = firstObj;

        const cols = [];
        for (const key in restProps) {
          var render = (value) => {
            return <span>{String(value)}</span>;
          };

          if (typeof restProps[key] === "object") {
            if (Array.isArray(restProps[key])) {
              render = (value) => {
                return (
                  <span>
                    {value?.map((key) => {
                      return <Tag>{key}</Tag>;
                    })}
                  </span>
                );
              };
            } else {
              render = (value) => {
                return (
                  <span>
                    {Object.keys(value).map((key) => {
                      return (
                        <div>
                          {key} : {value[key]}
                        </div>
                      );
                    })}
                  </span>
                );
              };
            }
          }

          const col = {
            title: String(key).charAt(0).toUpperCase() + String(key).slice(1),
            dataIndex: key,
            render: render,
            // ellipsis: true,
          };
          cols.push(col);
        }

        cols.push({
          title: "Action",
          key: "action",
          render: (_, record) => (
            <Space size="middle">
              <Button
                primary
                className="view-btn"
                onClick={() => {
                  setModalOpen(!modalOpen);
                  setModalRecord(record);
                }}
              >
                View
              </Button>
            </Space>
          ),
        });
        setColumns(cols);
        setDataSource(newObjects);
      });
  }, []);

  const ModalView = ({ record }) => {
    const { customerID, pageUrl, customerIpAdd, formtitle, ...restProps } =
      record;
    const entries = Object.entries(restProps);

    return (
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <div className="header-details">Details</div>
            <div
              className="header-close"
              onClick={() => setModalOpen(!modalOpen)}
            >
              <Icon source={CircleCancelMajor} color="base" />
            </div>
          </div>
          <div className="modal-icon-with-content">
            <div className="modal-icons">
              <div className="icon-container">
                <Icon source={FormsMajor} color="base" />
              </div>
              <div className="customer-container">Form: {formtitle}</div>
            </div>
            <div className="modal-icons">
              <div className="icon-container">
                <Icon source={CustomersMajor} color="base" />
              </div>
              <div className="customer-detail">
                {customerIpAdd && (
                  <div className="customer-container">
                    Customer IP Address: {customerIpAdd}
                  </div>
                )}
                {!customerIpAdd && (
                  <>
                    <div className="customer-container">
                      Customer Id: {customerID}
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="modal-icons">
              <div className="icon-container">
                <Icon source={PageMajor} color="base" />
              </div>
              <div className="customer-container">
                Page Url:{" "}
                <a href={pageUrl} target="_blank" rel="noopener noreferrer">
                  {pageUrl}
                </a>
              </div>
            </div>
          </div>
          <div className="modal-column-container">
            {entries.map(([key, value]) => (
              <div key={key}>
                <div className="hr-line-layout"></div>
                <div className="column-text">
                  {key}: {value}
                </div>
              </div>
            ))}
          </div>
          <div className="buttons-wrapper">
            <button className="read-btn">Mark as read</button>
            <button
              className="close-btn"
              onClick={() => setModalOpen(!modalOpen)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  // filter by search and Sort  by ascending and descending

  const sortedDataSource = sorting
  ? [...dataSource].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
  : [...dataSource].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const filteredDataSource = sortedDataSource.filter((data) =>
    Object.values(data).some(
      (val) => val && val.toString().toLowerCase().includes(value.toLowerCase())
    )
  );

  const handleDownload = () => {
    const csvData = Papa.unparse(dataSource);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "submission.csv");
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Page fullWidth>
      <div className="submission-header">
        <h2 className="headers">Submission</h2>
        <Button primary onClick={handleDownload}>
          Export all data
        </Button>
      </div>
      <div className="data-listing">
        <div className="submission-filters-and-search">
          <Input.Search
            className="submission-search"
            placeholder="Search"
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
          <Select
            className="listing-selection"
            placeholder="Filter"
            onChange={(value) => setSorting(value === "old")}
          >
            <Select.Option value="old">Old</Select.Option>
            <Select.Option value="new">New</Select.Option>
          </Select>
          <Select defaultValue="03" onChange={(e) => setPageSize(e)}>
            <Option value="3">03</Option>
            <Option value="5">05</Option>
            <Option value="10">10</Option>
            <Option value="15">15</Option>
          </Select>
        </div>
        <Table
          columns={columns}
          dataSource={filteredDataSource}
          pagination={{ pageSize }}
        />
        {modalOpen && <ModalView record={modalRecord} />}
      </div>
    </Page>
  );
};

export default submission;