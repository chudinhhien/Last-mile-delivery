import React, { createContext, useContext, useState } from "react";
import { request } from "../api";

const MenuContext = createContext();

export function MenuProvider({ children }) {
  const [menuState, setMenuState] = useState({
    isFetching: false,
    isFetched: false,
    permittedFunctions: new Set(),
  });

  const fetchMenu = React.useCallback(() => {
    console.log('fetchMenu called');
    setMenuState((prevState) => {
      if (prevState.isFetching) return prevState; // Tránh gọi không cần thiết
      return { ...prevState, isFetching: true };
    });

    request(
      "get",
      "/entity-authorization/MENU_",
      (res) => {
        setMenuState({
          isFetching: false,
          isFetched: true,
          permittedFunctions: new Set(res.data),
        });
      },
      {
        onError: () => {
          setMenuState((prevState) => ({
            ...prevState,
            isFetching: false,
            isFetched: false,
          }));
        },
        401: () => {},
      }
    );
  }, []);

  const value = React.useMemo(
    () => ({ menuState, setMenuState, fetchMenu }),
    [menuState, fetchMenu]
  );

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

export function useMenuState() {
  return useContext(MenuContext);
}
