import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, createTheme, MuiThemeProvider } from "@material-ui/core";
import axios from "axios";
import MaterialTable from "material-table";
import Modal from "./Modal";
import { AuthContext } from "../Auth/auth-context";
import moment from "moment";
import Magnifier from "react-magnifier";

const theme = createTheme({
  overrides: {
    MuiTableSortLabel: {
      root: {
        color: "#fff",
        transition: "all 0.5s ease",
        "&:hover": {
          color: "#66b933",
        },
      },
    },
  },
});

export default function DataTableStateSpecific(props) {
  const [intrusionData, setData] = React.useState([]);
  const [showModel, setShowModel] = React.useState({ show: false, data: null });
  const auth = React.useContext(AuthContext);
  //console.log(props);
  //console.log(intrusionData);
  //console.log(auth.token);
  //console.log(moment(auth.startDate).format("YYYY-MM-DD"));
  React.useEffect(() => {
    let unmounted = false;
    let url = props.state
      ? auth.user.isAdmin
        ? auth.warehouseId
          ? `${process.env.REACT_APP_USERS_BACKEND_URL}api/users/get_intrusion_data?warehouse_id=${auth.warehouseId}&start_date=${props.state.startDate}&end_date=${props.state.endDate}&id=${props.state.id}`
          : `${process.env.REACT_APP_USERS_BACKEND_URL}api/users/get_intrusion_data?start_date=${props.state.startDate}&end_date=${props.state.endDate}&id=${props.state.id}`
        : auth.warehouseId &&
          `${process.env.REACT_APP_USERS_BACKEND_URL}api/users/get_intrusion_data?warehouse_id=${auth.warehouseId}&start_date=${props.state.startDate}&end_date=${props.state.endDate}&id=${props.state.id}`
      : auth.user.isAdmin
      ? auth.warehouseId
        ? `${
            process.env.REACT_APP_USERS_BACKEND_URL
          }api/users/get_intrusion_data?warehouse_id=${
            auth.warehouseId
          }&start_date=${moment(auth.startDate).format(
            "YYYY-MM-DD"
          )}&end_date=${moment(auth.endDate).format("YYYY-MM-DD")}`
        : `${
            process.env.REACT_APP_USERS_BACKEND_URL
          }api/users/get_intrusion_data?start_date=${moment(
            auth.startDate
          ).format("YYYY-MM-DD")}&end_date=${moment(auth.endDate).format(
            "YYYY-MM-DD"
          )}`
      : auth.warehouseId &&
        `${
          process.env.REACT_APP_USERS_BACKEND_URL
        }api/users/get_intrusion_data?warehouse_id=${
          auth.warehouseId
        }&start_date=${moment(auth.startDate).format(
          "YYYY-MM-DD"
        )}&end_date=${moment(auth.endDate).format("YYYY-MM-DD")}`;
    //console.log(url);
    const getTrains = async () => {
      try {
        const responseData = await axios.get(url, {
          headers: { token: "Bearer " + auth.token },
        });
        if (!unmounted) {
          //console.log(url);
          setData(responseData.data);
          //console.log(responseData.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (url) {
      getTrains();
    }
    return () => {
      unmounted = true;
    };
  }, [auth.endDate, auth.startDate, auth.token, auth.warehouseId, props.state]);

  return (
    <div style={{ margin: "20px 0 150px 0", height: 300, width: "100%" }}>
      <MuiThemeProvider theme={theme}>
        <MaterialTable
          title="Intrusion Table"
          columns={[
            {
              field: "date",
              title: "Date",
              width: 150,
            },
            {
              field: "time",
              title: "Time",
              width: 150,
            },
            {
              field: "city",
              title: "City",
              width: 110,
            },
            {
              field: "warehouse_name",
              title: "Warehouse Name",
              width: 160,
            },
            {
              field: "camera_name",
              title: "Camera Name",
              width: 160,
            },
            // {
            //   field: "image",
            //   title: "Image",
            //   width: 160,
            // },
          ]}
          data={intrusionData}
          options={{
            actionsColumnIndex: -1,
            addRowPosition: "first",
            headerStyle: {
              backgroundColor: "rgb(40,40,40,0.8)",
              color: "#FFF",
            },
          }}
          actions={[
            (rowData) => ({
              icon: "info",
              tooltip: "More Info",
              onClick: (event, rowData) =>
                // history.push({
                //   pathname: "/sites",
                //   state: {
                //     // location state
                //     id: rowData.event_id,
                //   },
                // }),
                setShowModel({ show: true, data: rowData }),
            }),
          ]}
        />
      </MuiThemeProvider>
      <Modal
        show={showModel.show}
        onCancel={() => setShowModel({ show: false, data: null })}
        header={showModel.data && showModel.data.warehouse_name}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={
          <Button onClick={() => setShowModel({ show: false, data: null })}>
            CLOSE
          </Button>
        }
      >
        <div className="map-container">
          <div className="modal-data">
            <h4>City : </h4>
            <p className="data-city">{showModel.data && showModel.data.city}</p>
          </div>
          <div className="modal-data">
            <h4>Date : </h4>
            <p> {showModel.data && showModel.data.date}</p>
          </div>
          <div className="modal-data">
            <h4>Time :</h4>
            <p>{showModel.data && showModel.data.time}</p>
          </div>
          <Magnifier
            src={showModel.data && showModel.data.image}
            height={300}
            mgShape="square"
          />
          {/* <img
            className="modal-image"
            src={showModel.data && showModel.data.image}
            alt="fimage"
          /> */}
        </div>
      </Modal>
    </div>
  );
}
