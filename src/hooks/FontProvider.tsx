import React, { useContext, createContext } from 'react';

const FontContext = createContext(null);

const useFontContext = () => useContext(FontContext);

const FontProvider = ({ FontContext, children }: any) => {
  return (
    <FontContext.Provider value={FontContext}>{children}</FontContext.Provider>
  );
};

export { useFontContext, FontProvider };
