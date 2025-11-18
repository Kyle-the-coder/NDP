// SelectedCardContext.jsx
import { createContext, useState } from "react";

export const SelectedCardContext = createContext();

export const SelectedCardProvider = ({ children }) => {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <SelectedCardContext.Provider value={{ selectedId, setSelectedId }}>
      {children}
    </SelectedCardContext.Provider>
  );
};
