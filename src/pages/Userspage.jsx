import { createTheme, MuiThemeProvider } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import MaterialTable from "material-table";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "./Auth/auth-context";
import NavBar from "./components/Navbar";
import "react-datepicker/dist/react-datepicker.css";


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

const Userspage = () => {
  const auth = React.useContext(AuthContext);
  const [rows, setRows] = useState([]);
  const [edited, setEdited] = React.useState(false);
  let history = useHistory();
  //console.log(auth);
  // for fetching user details
  React.useEffect(() => {
    const fetchUser = async () => {
      const users = await axios.get(
        `${process.env.REACT_APP_USERS_BACKEND_URL}api/users/getAllUsers`,
        {
          headers: { token: "Bearer " + auth.token },
        }
      );
      
      
       //21/3/22
     let fiteredusers = []; 
      for(let i=0;i<users.data.length;i++)
      {
        if(users.data[i].email !== auth.user.email)
        {
          fiteredusers.push(users.data[i]);
        } 
      }
      //21/3/22  
    //  setRows(users.data);
    setRows(fiteredusers);
      
      
    };
    if (auth.user) {
      fetchUser();
    }
  }, [auth.token, auth.user, edited]);

  return (
    <div>
      <NavBar />
      <div style={{ margin: "5px 10px" }}>
        <MuiThemeProvider theme={theme}>
          <MaterialTable
            title={
              <>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Users
                </div>
              </>
            }
            actions={[
              {
                icon: "add",
                onClick: () => {
                  history.push("/signup/");
                },
                isFreeAction: true,
                tooltip: "Add User",
              },
            ]}
            columns={[
              { field: "_id", title: "ID", editable: "never" },
              {
                field: "username",
                title: "User Name",
                editable: "never",
              },
              {
                field: "email",
                title: "Email",
                editable: "never",
              },
              {
                field: "isAdmin",
                title: "Is Admin",
                lookup: { true: "true", false: "false" },
              },
              {
                field: "state",
                title: "State",
                render: (params) => {
                  return params.state.map((e, i) => {
                    return (
                      <>
                        {params.state.length > 1
                          ? e + (i < params.state.length - 1 ? ", " : "")
                          : e}
                      </>
                    );
                  });
                },
              },
              {
                field: "warehouse",
                title: "Warehouse",
                render: (params) => {
                  return params.warehouse.map((e, i) => {
                    return (
                      <>
                        {params.warehouse.length > 1
                          ? e + (i < params.warehouse.length - 1 ? ", " : "")
                          : e}
                      </>
                    );
                  });
                },
              },
            ]}
            data={rows}
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
                  if (newData !== oldData) {
                    // if (newData.warehouse !== oldData.warehouse) {
                    //   console.log("w");

                    // }
                    //console.log(newData, oldData);
                    fetch(
                      process.env.REACT_APP_USERS_BACKEND_URL +
                        "api/users/updateUser?uId=" +
                        oldData._id,
                      {
                        method: "PUT",
                        body: JSON.stringify({
                          content: {
                            isAdmin: newData.isAdmin,
                            state: newData.state,
                            warehouse: newData.warehouse,
                          },
                        }),
                        headers: {
                          token: "Bearer " + auth.token,
                          "Content-type": "application/json",
                        },
                      }
                    )
                      .then((resp) => resp.json())
                      .then((resp) => {
                        setEdited(!edited);
                        resolve();
                      });
                  }
                }),
              onRowDelete: (oldData) =>
                new Promise((resolve, reject) => {
                  fetch(
                    process.env.REACT_APP_USERS_BACKEND_URL +
                      "api/users/deleteUser?uId=" +
                      oldData._id,
                    {
                      method: "DELETE",
                      headers: {
                        token: "Bearer " + auth.token,
                        "Content-type": "application/json",
                      },
                    }
                  )
                    .then((resp) => resp.json())
                    .then((resp) => {
                      setEdited(!edited);
                      resolve();
                    });
                }),
            }}
          />
        </MuiThemeProvider>
      </div>
    </div>
  );
};

export default Userspage;
