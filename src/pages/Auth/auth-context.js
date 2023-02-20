import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
  startDate: new Date(),
  setStartDate: () => {},
  endDate: new Date(),
  setEndDate: () => {},
  logs: null,
  setLogs: () => {},
  warehouseId: null,
  setWarehouseId: () => {},
});
