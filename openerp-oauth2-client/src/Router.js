import { LinearProgress } from "@mui/material";
import { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import MainAppRouter from "./routers/MainAppRouter";
import { useRouteState } from "./state/RouteState";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Routes(props) {
  const { setRouteState } = useRouteState();
  const location = useLocation(); // Lấy thông tin đường dẫn hiện tại

  useEffect(() => {
    setRouteState((prevState) => {
      if (prevState.currentRoute === location.pathname) {
        return prevState; // Không cập nhật nếu giá trị không thay đổi
      }
      return { ...prevState, currentRoute: location.pathname };
    });
  }, [location.pathname, setRouteState]); // Theo dõi location.pathname

  return (
    <Suspense
      fallback={
        <LinearProgress
          style={{
            position: "absolute",
            top: 0,
            width: "100%",
            zIndex: 1202,
          }}
        />
      }
    >
      <Switch>
        <Route path="*" component={MainAppRouter} />
      </Switch>
    </Suspense>
  );
}

export default Routes;
