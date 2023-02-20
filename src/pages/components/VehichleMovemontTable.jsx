import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  CircularProgress,
  createTheme,
  Input,
  MuiThemeProvider,
  Typography,
} from "@material-ui/core";
import DownloadIcon from "@mui/icons-material/Download";
import MaterialTable from "@material-table/core";
import axios from "axios";
import { AuthContext } from "../Auth/auth-context";
import Modal from "./Modal";
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
export default function VehicleMovementTable(props) {
  const [vehicleData, setData] = React.useState([]);
  const [showModel, setShowModel] = React.useState({ show: false, data: null });
  const [edited, setEdited] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [rowId, setRowId] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const auth = React.useContext(AuthContext);

  const changeHandler = (event, params) => {
    setRowId(params.id);
    setSelectedFile(event.target.files[0]);
  };
  //console.log(rowId);
  //console.log(selectedFile);
  React.useEffect(() => {
    let unmounted = false;
    const handleSubmission = () => {
      const formData = new FormData();
      formData.append("myfile", selectedFile);
      fetch(
        `${process.env.REACT_APP_BACKEND_URL}upload_vehicle_document?id=${rowId}`,
        {
          method: "POST",
          body: formData,
        }
      )
        .then((response) => response.json())
        .then((result) => {
          console.log("Success:", result);
          alert("Uploaded Successfully!");
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Failed to upload");
        });
    };
    if (!unmounted) {
      selectedFile && rowId ? handleSubmission() : console.log("wait");
    }
    return () => {
      unmounted = true;
    };
  }, [selectedFile, rowId]);

  React.useEffect(() => {
    let unmounted = false;
    // first check is is the data is coming from log table or not
    let url = props.state
      ? auth.user.isAdmin
        ? //now we know the data is coming from log table and we are checking for admin
          auth.warehouseId
          ? //now we know admin is there and we are checking for warehouseId (this step is not necessary though)
            `${process.env.REACT_APP_USERS_BACKEND_URL}api/users/get_vehicle_data?warehouse_id=${auth.warehouseId}&start_date=${props.state.startDate}&end_date=${props.state.endDate}&id=${props.state.id}`
          : `${process.env.REACT_APP_USERS_BACKEND_URL}api/users/get_vehicle_data?start_date=${props.state.startDate}&end_date=${props.state.endDate}&id=${props.state.id}`
        : auth.warehouseId &&
          //now we know admin is not here so we need to know the warehouse id
          `${process.env.REACT_APP_USERS_BACKEND_URL}api/users/get_vehicle_data?warehouse_id=${auth.warehouseId}&start_date=${props.state.startDate}&end_date=${props.state.endDate}&id=${props.state.id}`
      : auth.user.isAdmin
      ? //now we know that data is not coming from log table
        auth.warehouseId
        ? //now we know that admin is here and we are checking for warehouseId
          `${
            process.env.REACT_APP_USERS_BACKEND_URL
          }api/users/get_vehicle_data?warehouse_id=${
            auth.warehouseId
          }&start_date=${moment(auth.startDate).format(
            "YYYY-MM-DD"
          )}&end_date=${moment(auth.endDate).format("YYYY-MM-DD")}`
        : `${
            process.env.REACT_APP_USERS_BACKEND_URL
          }api/users/get_vehicle_data?start_date=${moment(
            auth.startDate
          ).format("YYYY-MM-DD")}&end_date=${moment(auth.endDate).format(
            "YYYY-MM-DD"
          )}`
      : auth.warehouseId &&
        //now we know admin is not here and we only fetch data if warehouse id is present
        `${
          process.env.REACT_APP_USERS_BACKEND_URL
        }api/users/get_vehicle_data?warehouse_id=${
          auth.warehouseId
        }&start_date=${moment(auth.startDate).format(
          "YYYY-MM-DD"
        )}&end_date=${moment(auth.endDate).format("YYYY-MM-DD")}`;

    const getVehicleData = async () => {
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
      getVehicleData();
    }
    //console.log(auth.warehouseId);
    return () => {
      unmounted = true;
    };
  }, [
    props.state,
    auth.startDate,
    auth.endDate,
    auth.token,
    auth.warehouseId,
    edited,
  ]);

  return (
    <>
      <MuiThemeProvider theme={theme}>
        <MaterialTable
          title="Vehicle Movement"
          columns={[
            {
              field: "date",
              title: "Date",
              width: 150,
              editable: "never",
            },
            {
              field: "camera_name",
              title: "Camera Name",
              width: 190,
              editable: "never",
            },
            {
              field: "warehouse_name",
              title: "Warehouse Name",
              width: 190,
              editable: "never",
            },
            {
              field: "truck_number_editable",
              title: "Truck number",
              width: 190,
              editable: "onUpdate",
            },
            {
              field: "time",
              title: "Time",
              width: 190,
              editable: "never",
            },
            {
              field: "truck_in_time",
              title: "Truck in time",
              width: 190,
              editable: "never",
            },
            {
              field: "truck_out_time",
              title: "Truck out time",
              width: 190,
              editable: "never",
            },
            {
              field: "vehicle_type",
              title: "Vehicle Type",
              width: 190,
              editable: "never",
            },
            {
              field: "inward_outward",
              title: "Inward outward",
              width: 190,
              editable: "never",
            },
            {
              field: "document",
              title: "Document",
              width: 160,
              render: (params) => {
                return (
                  <>
                    {/* <button
                    onClick={() => setUl(params)}
                    className="productListEdit"
                  >
                    Upload
                    {//console.log(ul)}
                  </button> */}
                    {loading && (
                      <CircularProgress
                        style={{ color: "green", margin: "60px" }}
                        size={60}
                      />
                    )}
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <input
                        type="file"
                        name="file"
                        accept=".pdf,.doc,.jpeg,.jpg,.png"
                        onChange={(event) => changeHandler(event, params)}
                      />
                    </div>
                  </>
                );
              },
              editable: "true",
            },
            {
              field: "remarks",
              title: "Remarks",
              width: 160,
              editable: "onUpdate",
              // render: (params) => {
              //   return (
              //     <>
              //       <Input />
              //     </>
              //   );
              // },
            },
          ]}
          data={vehicleData}
          options={{
            actionsColumnIndex: -1,
            addRowPosition: "first",
            headerStyle: {
              backgroundColor: "rgb(40,40,40,0.8)",
              color: "#FFF",
            },
          }}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                //console.log(newData, oldData);
                // Backend call
                if (newData.remarks !== oldData.remarks) {
                  fetch(
                    `${process.env.REACT_APP_USERS_BACKEND_URL}api/users/add_vehicle_remark?inp=${newData.remarks}&id=${newData.id}`,
                    {
                      method: "POST",
                      headers: {
                        token: "Bearer " + auth.token,
                        "Content-type": "application/json",
                      },
                    }
                  )
                    .then((resp) => resp.json())
                    .then((resp) => {
                      resp.success && setEdited(!edited);
                      resolve();
                    });
                }
                // if (newData.truck_in_time !== oldData.truck_in_time) {
                //   fetch(
                //     "${process.env.REACT_APP_USERS_BACKEND_URL}api/users/edit_truck_number?inp=" +
                //       newData.truck_in_time +
                //       "&table=vehicle&id=" +
                //       newData.id,
                //     {
                //       method: "POST",
                //       headers: {
                //         token: "Bearer " + auth.token,
                //         "Content-type": "application/json",
                //       },
                //     }
                //   )
                //     .then((resp) => resp.json())
                //     .then((resp) => {
                //       resp.success && setEdited(!edited);
                //       resolve();
                //     });
                // }
                // if (newData.truck_out_time !== oldData.truck_out_time) {
                //   fetch(
                //     "${process.env.REACT_APP_USERS_BACKEND_URL}api/users/edit_truck_number?inp=" +
                //       newData.truck_out_time +
                //       "&table=vehicle&id=" +
                //       newData.id,
                //     {
                //       method: "POST",
                //       headers: {
                //         token: "Bearer " + auth.token,
                //         "Content-type": "application/json",
                //       },
                //     }
                //   )
                //     .then((resp) => resp.json())
                //     .then((resp) => {
                //       resp.success && setEdited(!edited);
                //       resolve();
                //     });
                // }
                // if (newData.inward_outward !== oldData.inward_outward) {
                //   fetch(
                //     "${process.env.REACT_APP_USERS_BACKEND_URL}api/users/edit_truck_number?inp=" +
                //       newData.inward_outward +
                //       "&table=vehicle&id=" +
                //       newData.id,
                //     {
                //       method: "POST",
                //       headers: {
                //         token: "Bearer " + auth.token,
                //         "Content-type": "application/json",
                //       },
                //     }
                //   )
                //     .then((resp) => resp.json())
                //     .then((resp) => {
                //       resp.success && setEdited(!edited);
                //       resolve();
                //     });
                // }
                if (
                  newData.truck_number_editable !==
                  oldData.truck_number_editable
                ) {
                  fetch(
                    `${process.env.REACT_APP_USERS_BACKEND_URL}api/users/edit_truck_number?inp=${newData.truck_number_editable}&table=vehicle&id=${newData.id}`,
                    {
                      method: "POST",
                      headers: {
                        token: "Bearer " + auth.token,
                        "Content-type": "application/json",
                      },
                    }
                  )
                    .then((resp) => resp.json())
                    .then((resp) => {
                      resp.success && setEdited(!edited);
                      resolve();
                    });
                }
              }),
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
                setShowModel(
                  { show: true, data: rowData },
                  console.log(rowData),
                  ),
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
            <h4>Camera Name : </h4>
            <p style={{ marginLeft: "10px" }} className="data-city">
              {showModel.data && showModel.data.camera_name}
            </p>
          </div>
          <div className="modal-data">
            <h4>Date : </h4>
            <p style={{ marginLeft: "10px" }}>
              {" "}
              {showModel.data && showModel.data.date}
            </p>
          </div>
          <div className="modal-data">
            <h4>Time :</h4>
            <p style={{ marginLeft: "10px" }}>
              {showModel.data && showModel.data.time}
            </p>
          </div>
          <div className="modal-data" style={{ marginTop: "-10px" }}>
            <h4>Document :</h4>
            {showModel.data && showModel.data.document !== "document" ? (
              // <button
              //   onClick={() => {
              //     window.location.href =
              //       showModel.data && showModel.data.document;
              //   }}
              // >
              //   Download Document
              // </button>
              <Button
                variant="contained"
                style={{ backgroundColor: "#4BB543", marginLeft: "10px" }}
                onClick={() => {
                  window.location.href = showModel.data.document;
                }}
                endIcon={<DownloadIcon />}
              >
                DOWNLOAD
              </Button>
            ) : (
              <Typography style={{ color: "red", marginLeft: "10px" }}>
                NO DOCUMENT FOUND!
              </Typography>
            )}
          </div>
          {console.log(showModel.data)}
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
    </>
  );
}
