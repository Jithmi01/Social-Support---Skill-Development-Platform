import React from 'react'
const CustomRow = ({ children, style, className }) => {
  return (
    <div 
      className={`flex w-full ${className || ''}`}
      style={style}
    >
      {children}
    </div>
  )
}
export default CustomRow