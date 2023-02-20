import { useState, useCallback, useEffect } from "react";

export const useAuth = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [token, setToken] = useState(false);
  const [user, setUser] = useState("");
  const [logs, setLogs] = useState([]);
  const [warehouseId, setWarehouseId] = useState(null);
  const login = useCallback((userInfo, token) => {
    setIsLoggedIn(true);
    setUser(userInfo);
    setToken(token);
    sessionStorage.setItem("userData", JSON.stringify({ userInfo, token }));
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUser("");
    setToken(false);
    sessionStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(sessionStorage.getItem("userData"));
    if (storedData && storedData.token) {
      login(storedData.userInfo, storedData.token);
    }
  }, [login]);

  return {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    isLoggedIn,
    token,
    login,
    logout,
    user,
    logs,
    setLogs,
    warehouseId,
    setWarehouseId
  };
};
