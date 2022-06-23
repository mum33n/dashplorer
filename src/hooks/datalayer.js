import React, { createContext, useContext, useReducer } from 'react'

const datalayerContext=createContext()
function Datalayer({children, reducer, initialData}) {
  return (
    <datalayerContext.Provider value={useReducer(reducer, initialData)}>
        {children}
    </datalayerContext.Provider>
  )
}
export const useDatalayer=()=>useContext(datalayerContext)
export default Datalayer