import React, { createContext, useContext, ReactNode, useState } from "react";

const SearchContext = createContext<any>(null);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [searchParams, setSearchParams] = useState({
    checkInDate: "",
    checkOutDate: "",
    city: "",
    starRate: 1,
    sort : "ascending",
    rooms: 1,
    adults: 2,
    children: 0,
  });

  const setSearchParamsValue = (key: string, value: any) => {
    setSearchParams((prevParams) => ({ ...prevParams, [key]: value }));
  };

  return (
    <SearchContext.Provider value={{ searchParams, setSearchParamsValue }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  return context;
};
