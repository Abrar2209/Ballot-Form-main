import React from 'react'

const Hidden = ({ field }) => {

  const { label, value } = field;

  return (
    <div className='hidden-previewer' style={{ minWidth: '100%'}}>
      <label>{label}</label>
      <input type="hidden" value={value} />
    </div>
  )
}

export default Hidden