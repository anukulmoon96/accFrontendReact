import React, { useState } from "react";
import CountingStatisticsTable from "./components/CountingStatisticsTable";
import DataTableStateSpecific from "./components/DataTableStateSpecific";
import LeftPanel from "./components/LeftPanel";
import VehicleMovementTable from "./components/VehichleMovemontTable";
import AttendanceTable from "./components/AttendanceTable";

import WarehouseTable from "./components/WarehouseTable";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Search from "@mui/icons-material/Search";
import "react-datepicker/dist/react-datepicker.css";
import "./sitespage.css";
const Sitespage = () => {
  const [inputId, setInputId] = useState("");
  const location = useLocation();
  //console.log(location.state);
  //console.log(inputId);
  return (
    <div>
      <Navbar />
      <div>
        <div style={{ margin: "5px 10px" }}>
          {location.state ? (
            location.state.event_tag === "vehicle detected" && (
              <div className="top">
                <VehicleMovementTable state={location.state} />
              </div>
            )
          ) : (
            <div className="top">
              <VehicleMovementTable  />
            </div>
          )}

          {location.state ? (
            (location.state.event_tag === "counting" && (
              <div className="mid">
                <CountingStatisticsTable state={location.state} />
              </div>
            )) ||
            ((location.state.event_tag === "shutter open" ||
              location.state.event_tag === "shutter close") && (
              <div className="mid">
                <WarehouseTable state={location.state} />
              </div>
            ))
          ) : (
            <div className="mid">
              <WarehouseTable />
              <CountingStatisticsTable />
            </div>
          )}

          {/* <div className="mid">
            <WarehouseTable state={location.state} />
            <CountingStatisticsTable />
          </div> */}

          {location.state ? (
            location.state.event_tag === "intrusion detected" && (
              <div>
                <DataTableStateSpecific state={location.state} />
                <br/>
              </div>
              
            )
          ) : (
            <div>
              <DataTableStateSpecific state={location.state} />
              <br/>
            </div>
            
          )}
          
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>


             {location.state ? (
            location.state.event_tag === "attendance detected" && (
              <div className="bottom">
                <AttendanceTable state={location.state} />
              </div>
            )
          ) : (
            <div className="bottom">
              <AttendanceTable state={location.state} />
            </div>
          )}


          {/* <div className="bottom">
            <DataTableStateSpecific state={location.state} />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Sitespage;
