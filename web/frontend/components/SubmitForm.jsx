import React from 'react'

const SubmitForm = () => {
  return (
    <div>
      <div className="header-section">
            <div className="section-component">
            </div>
              <div className="form-header">
                <div>
                  <label className="mb-10">Success Title</label>
                </div>
                <input
                  className="mb-10 form-builder-inputs"
                  type="text"
                />
                <div>
                  <label className="mb-10 ">Success Content</label>
                </div>
                <textarea
                  className="mb-10 form-builder-inputs"
                />
              </div>
          </div>
    </div>
  )
}

export default SubmitForm