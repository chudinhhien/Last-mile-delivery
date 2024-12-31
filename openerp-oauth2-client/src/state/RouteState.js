import React, { createContext, useContext, useState } from "react";

// Tạo Context cho Route
const RouteContext = createContext();

export function RouteProvider({ children }) {
  const [routeState, setRouteState] = useState({
    currentRoute: undefined,
  });

  // Memoize context value
  const value = React.useMemo(() => ({ routeState, setRouteState }), [routeState]);

  return (
    <RouteContext.Provider value={value}>
      {children}
    </RouteContext.Provider>
  );
}

export function useRouteState() {
  return useContext(RouteContext);
}
