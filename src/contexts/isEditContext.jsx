// SelectedCardContext.jsx
import { createContext, useState } from "react";

export const IsEditContext = createContext();

export const IsEditProvider = ({ children }) => {
  const [isEdit, setIsEdit] = useState(null);
  return (
    <IsEditContext.Provider value={{ isEdit, setIsEdit }}>
      {children}
    </IsEditContext.Provider>
  );
};
