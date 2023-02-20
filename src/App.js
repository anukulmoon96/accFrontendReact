import React, { Suspense, useEffect  } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";

import LinearProgress from "@material-ui/core/LinearProgress";
import { useAuth } from "./hooks/auth-hook";
import { AuthContext } from "./pages/Auth/auth-context";
import Auth from "./pages/Auth/Auth";
import Sitespage from "./pages/Sitespage";
import CameraFeedsPage from "./pages/CameraFeedsPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Userspage from "./pages/Userspage";
import IdleTimerContainer from "./pages/components/IdleTimerContainer"
import AttendancePage from "./pages/AttendancePage";
import Diagnostics from "./pages/components/Diagnostics";
import SupportPage from "./pages/SupportPage";
import SignUp from "./pages/Auth/components/SignUp";
const Homepage = React.lazy(() => import("./pages/Homepage"));


const queryClient = new QueryClient();
function App() {
  const {
    isLoggedIn,
    token,
    login,
    logout,
    user,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    logs,
    setLogs,
    warehouseId,
    setWarehouseId,
  } = useAuth();

  let history = useHistory();

//     window.onbeforeunload = () => {
//     localStorage.removeItem('userData');
//   }

//   useEffect(() => {
//     if(!window.location.href.includes('/auth')){
//       console.log('hii');
//     setTimeout(() => {
//         localStorage.removeItem("userData");
//         window.location.href = `/auth`;
//     }, 3000000);
//   }
//   });

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider
        value={{
          isLoggedIn: isLoggedIn,
          user: user,
          token: token,
          login: login,
          logout: logout,
          startDate: startDate,
          setStartDate: setStartDate,
          endDate: endDate,
          setEndDate: setEndDate,
          logs: logs,
          setLogs: setLogs,
          warehouseId: warehouseId,
          setWarehouseId: setWarehouseId,
        }}
      >
              <IdleTimerContainer/>

        <Router>
          <Suspense
            fallback={
              <div>
                <LinearProgress color="secondary" />
              </div>
            }
          >
            <Switch>
              <Route exact path="/">
                {isLoggedIn ? <Homepage /> : <Redirect to="/auth" />}
              </Route>
              <Route path="/auth/">
                {!isLoggedIn ? <Auth /> : <Redirect to="/" />}
              </Route>
              {isLoggedIn && (
                <Route path="/sites/">
                  <Sitespage />
                </Route>
              )}
              {isLoggedIn && user && user.isAdmin && (
                <Route path="/users/">
                  <Userspage />
                </Route>
              )}
              {isLoggedIn && (
                <Route path="/live/">
                  <CameraFeedsPage />
                </Route>
              )}
              {isLoggedIn && (
                <Route path="/attendance/">
                  <AttendancePage />
                </Route>
              )}
              {isLoggedIn && (
                <Route path="/support/">
                  <SupportPage />
                </Route>
              )}
              {isLoggedIn && user && user.isAdmin && (
                <Route path="/signup/">
                  <SignUp />
                </Route>
              )}
              	{isLoggedIn && user && user.isAdmin && (
								<Route path="/diagnostics">
									<Diagnostics />
								</Route>
							)}
            </Switch>
          </Suspense>
        </Router>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
