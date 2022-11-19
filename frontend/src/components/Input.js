import React from 'react'

export const Input = ({callback,placeholder,value,type}) => {
  return (
      <input
          type={type} 
          placeholder={placeholder}
          value={value}
          onChange="max-w-60  md:w-72 bg-transparent border-2 px-3 py-2 outlune-none border-black rounded-md"
    />
  )
}
