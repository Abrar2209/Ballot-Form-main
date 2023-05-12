import { useState } from "react";
import "../assets/base.css";
import "../assets/style.css";
import { useSelector } from "react-redux";
import SubmitForm from "./SubmitForm";
import Header from "./FormBuilderComponents/Header";
import Footer from "./FormBuilderComponents/Footer";
import Toolbar from "./FormBuilderComponents/Toolbar";
import FormPreviewer from "./FormPreviewer";
import {
  ArrowRightMinor,
  ArrowLeftMinor,
  DragHandleMinor,
  PlusMinor,
} from "@shopify/polaris-icons";
import { Icon } from "@shopify/polaris";
import FbFields from "./FormBuilderComponents/FbFields";
import AfterSubmit from "./AfterSubmit";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { handleUpdateFieldsIndex } from "./FormBuilderComponents/utils/handlers";

const FormBuilder = () => {
  const { fields, constantFields, afterSubmit } = useSelector((state) => state.form);
  const [isHeader, setIsHeader] = useState(false);
  const [body, setBody] = useState(false);
  const [footer, setFooter] = useState(false);
  const [submitAfter, setSubmitAfter] = useState(false);
  const [isFormElementVisible, setIsFormElementVisible] = useState(true);
  const [fieldShow, setFieldShow] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const handleDragEnd = (e) => {
    if (!e.destination) return;
    let tempData = Array.from(fields);
    let [source_data] = tempData.splice(e.source.index, 1);
    tempData.splice(e.destination.index, 0, source_data);
    handleUpdateFieldsIndex(tempData);
  };

  return (
    <div className="dr-form-builder">
      <div className="forms">
        {/* Header */}

        <div
          className={`form-element header ${
            isFormElementVisible ? "" : "hidden"
          }`}
          onClick={() => {
            setIsHeader(!isHeader);
            setIsFormElementVisible(!isFormElementVisible);
          }}
        >
          <div>Header</div>
          <div className="icon">
            <button
              className="icon-btn"
              onClick={() => setIsFormElementVisible(!isFormElementVisible)}
            >
              <Icon source={ArrowRightMinor} color="base" />
            </button>
          </div>
        </div>
        <div>
          {isHeader && (
            <div className={`drawer`}>
              <div className="forms-header">
                <button
                  className={`form-button ${
                    !isFormElementVisible ? "" : "hidden"
                  }`}
                  onClick={() => {
                    setIsHeader(!isHeader);
                    setIsFormElementVisible(!isFormElementVisible);
                  }}
                >
                  <Icon source={ArrowLeftMinor} color="base" />
                </button>
                <div className="form-h2">
                  <h2>Header</h2>
                </div>
              </div>
              <Header headerObject={constantFields.header} />
            </div>
          )}
        </div>
        {/* Body */}

        <div
          className={`form-element body ${
            isFormElementVisible ? "" : "hidden"
          }`}
          onClick={() => {
            setBody(!body);
            setIsFormElementVisible(!isFormElementVisible);
          }}
        >
          <div>Fields</div>
          <div className="icon">
            <button className="icon-btn">
              <Icon source={ArrowRightMinor} color="base" />
            </button>
          </div>
        </div>
        <div>
          {body && (
            <div className={`drawer`}>
              <div className={`forms-header ${fieldShow ? "" : "hidden"}`}>
                <div
                  className={` ${fieldShow ? "" : "hidden"}`}
                  onClick={() => {
                    setIsOpen(!isOpen);
                    setFieldShow(!fieldShow);
                  }}
                >
                  <button
                    className={`form-button ${
                      !isFormElementVisible ? "" : "hidden"
                    }`}
                    onClick={() => {
                      setBody(!body);
                      setIsFormElementVisible(!isFormElementVisible);
                    }}
                  >
                    <Icon source={ArrowLeftMinor} color="base" />
                  </button>
                </div>
                <div className="form-h2">
                  <h2>Fields</h2>
                </div>
              </div>
              <div className="outer-div-toolbar">
                <div
                  className={`btn-with-text ${fieldShow ? "" : "hidden"}`}
                  onClick={() => {
                    setIsOpen(!isOpen);
                    setFieldShow(!fieldShow);
                  }}
                >
                  <button className="section-button">
                    <Icon source={PlusMinor} color="base" />
                  </button>
                  Add Elements
                </div>
                {isOpen && (
                  <div
                    className={`${!fieldShow ? "" : "hidden"}`}
                    onClick={() => {
                      setIsOpen(!isOpen);
                      setFieldShow(!fieldShow);
                    }}
                  >
                    <div className="forms-header">
                      <button className={`form-button`}>
                        <Icon source={ArrowLeftMinor} color="base" />
                      </button>
                      <div className="form-h2">
                        <h2>Add Fields</h2>
                      </div>
                    </div>
                    <Toolbar />
                  </div>
                )}
              </div>
              <div
              // className={`${fieldShow ? "" : "hidden"}`}
              // onClick={() => {
              //   setIsOpen(!isOpen);
              //   setFieldShow(!fieldShow);
              // }}
              >
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="droppable-1">
                    {(provider) => (
                      <div
                        ref={provider.innerRef}
                        {...provider.droppableProps}
                        style={{ position: "relative" }}
                      >
                        {fields.map((field, index) => (
                          <Draggable
                            key={field.id}
                            draggableId={field.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                className={`outerdiv ${
                                  fieldShow ? "" : "hidden"
                                }`}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                // style={
                                //   { top: '0px !important',}
                                // }
                              >
                                <div
                                  {...provided.dragHandleProps}
                                  className="fb-drag"
                                >
                                  <Icon source={DragHandleMinor} color="base" />
                                </div>
                                <FbFields field={field} />
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provider.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
            </div>
          )}
        </div>
        {/* Footer */}
        <div
          className={`form-element footer ${
            isFormElementVisible ? "" : "hidden"
          }`}
          onClick={() => {
            setFooter(!footer);
            setIsFormElementVisible(!isFormElementVisible);
          }}
        >
          <div>Footer</div>
          <div className="icon">
            <button className="icon-btn">
              <Icon source={ArrowRightMinor} color="base" />
            </button>
          </div>
        </div>
        <div>
          {footer ? (
            <div className={`drawer`}>
              <div>
                <div className="forms-header">
                  <button
                    className={`form-button ${
                      !isFormElementVisible ? "" : "hidden"
                    }`}
                    onClick={() => {
                      setFooter(!footer);
                      setIsFormElementVisible(!isFormElementVisible);
                    }}
                  >
                    <Icon source={ArrowLeftMinor} color="base" />
                  </button>
                  <div className="form-h2">
                    <h2>Footer</h2>
                  </div>
                </div>
              </div>
              <Footer footerObject={constantFields.footer} />
            </div>
          ) : (
            ""
          )}
        </div>

        {/* After Submit */}
        <div
          className={`form-element submit ${
            isFormElementVisible ? "" : "hidden"
          }`}
          onClick={() => {
            setSubmitAfter(!submitAfter);
            setIsFormElementVisible(!isFormElementVisible);
          }}
        >
          <div>After Submit</div>
          <div className="icon">
            <button className="icon-btn">
              <Icon source={ArrowRightMinor} color="base" />
            </button>
          </div>
        </div>
        <div>
          {submitAfter && (
            <div className={`drawer`}>
              <div>
                <div className="forms-header">
                  <button
                    className={`form-button ${
                      !isFormElementVisible ? "" : "hidden"
                    }`}
                    onClick={() => {
                      setSubmitAfter(!submitAfter);
                      setIsFormElementVisible(!isFormElementVisible);
                    }}
                  >
                    <Icon source={ArrowLeftMinor} color="base" />
                  </button>
                  <div className="form-h2">
                    <h2>After Submit</h2>
                  </div>
                </div>
              </div>
              {/* After Submit Component */}
              <AfterSubmit afterSubmit={afterSubmit}/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;
