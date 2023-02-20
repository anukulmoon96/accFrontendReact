import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import MaterialTable from "material-table";
import axios from "axios";
import { AuthContext } from "../Auth/auth-context";
import {
	createTheme,
	MuiThemeProvider,
	Button,
	Typography,
} from "@material-ui/core";
import moment from "moment";
import Modal from "./Modal";
import DownloadIcon from "@mui/icons-material/Download";
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

export default function AttendanceTable(props) {
	const [showModel, setShowModel] = React.useState({ show: false, data: null });
	const [warehouseData, setData] = React.useState([]);
	const auth = React.useContext(AuthContext);
	React.useEffect(() => {
		let unmounted = false;
		let url = props.state
			? auth.user.isAdmin
				? auth.warehouseId
					? `${process.env.REACT_APP_USERS_BACKEND_URL}api/users/get_attendance_data2?warehouse_id=${auth.warehouseId}&start_date=${props.state.startDate}&end_date=${props.state.endDate}&id=${props.state.id}`
					: `${process.env.REACT_APP_USERS_BACKEND_URL}api/users/get_attendance_data2?start_date=${props.state.startDate}&end_date=${props.state.endDate}&id=${props.state.id}`
				: auth.warehouseId &&
				  `${process.env.REACT_APP_USERS_BACKEND_URL}api/users/get_attendance_data2?warehouse_id=${auth.warehouseId}&start_date=${props.state.startDate}&end_date=${props.state.endDate}&id=${props.state.id}`
			: auth.user.isAdmin
			? auth.warehouseId
				? `${
						process.env.REACT_APP_USERS_BACKEND_URL
				  }api/users/get_attendance_data2?warehouse_id=${
						auth.warehouseId
				  }&start_date=${moment(auth.startDate).format(
						"YYYY-MM-DD",
				  )}&end_date=${moment(auth.endDate).format("YYYY-MM-DD")}`
				: `${
						process.env.REACT_APP_USERS_BACKEND_URL
				  }api/users/get_attendance_data2?start_date=${moment(auth.startDate).format(
						"YYYY-MM-DD",
				  )}&end_date=${moment(auth.endDate).format("YYYY-MM-DD")}`
			: auth.warehouseId &&
			  `${
					process.env.REACT_APP_USERS_BACKEND_URL
			  }api/users/get_attendance_data2?warehouse_id=${auth.warehouseId}&start_date=${moment(
					auth.startDate,
			  ).format("YYYY-MM-DD")}&end_date=${moment(auth.endDate).format(
					"YYYY-MM-DD",
			  )}`;

		const getShutterData = async () => {
			try {
				const responseData = await axios.get(url, {
					headers: { token: "Bearer " + auth.token },
				});

				if (!unmounted) {
					console.log(url);

					console.log("response data ---->", responseData.data);
					setData(responseData.data);
				}
			} catch (error) {
				console.log(error);
			}
		};
		if (url) {
			getShutterData();
		}
		return () => {
			unmounted = true;
		};
	}, [auth.endDate, auth.startDate, auth.token, auth.warehouseId, props.state]);

	console.log(warehouseData);

	return (
		<>
			<MuiThemeProvider theme={theme}>
				<MaterialTable
					title="Attendance"
					columns={[
						{
							field: "date",
							title: "Date",
						},
						{
							field: "warehouse_name",
							title: "Warehouse name",
						},
						{
							field: "camera_name",
							title: "Camera Name",
						},
						{
							field: "time",
							title: "Time",
						},
						{
							field: "attendance_count",
							title: "Attendance Count",
						},
					]}
					data={warehouseData}
					options={{
						actionsColumnIndex: -1,
						addRowPosition: "first",
						headerStyle: {
							backgroundColor: "rgb(40,40,40,0.8)",
							color: "#FFF",
						},
					}}
					style={{ width: "100%" }}
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
					// editable={{
					//   onRowUpdate: (newData, oldData) =>
					//     new Promise((resolve, reject) => {
					//       //Backend call
					//       fetch(url + "/" + oldData.id, {
					//         method: "PUT",
					//         headers: {
					//           "Content-type": "application/json",
					//         },
					//         body: JSON.stringify(newData),
					//       })
					//         .then((resp) => resp.json())
					//         .then((resp) => {
					//           // getStudents();
					//           resolve();
					//         });
					//     }),
					// }}
					// actions={[
					//   (rowData) => ({
					//     icon: "info",
					//     tooltip: "More Info",
					//     onClick: (event, rowData) =>
					//       history.push({
					//         pathname: "/sites",
					//         state: {
					//           // location state
					//           id: rowData.event_id,
					//           startDate : moment(startDate).format("YYYY-MM-DD"),
					//           endDate : moment(endDate).format("YYYY-MM-DD"),
					//         },
					//       }),
					//   }),
					// ]}
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
				}>
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
						{/* <h4>Time :</h4>
						<p style={{ marginLeft: "10px" }}>
							{showModel.data && showModel.data.time}
						</p> */}
					</div>
					<div className="modal-data" style={{ marginTop: "-10px" }}>
						{/* <h4>Document :</h4> */}
						{showModel.data && showModel.data.document !== "document" ? (
							// <button
							//   onClick={() => {
							//     window.location.href =
							//       showModel.data && showModel.data.document;
							//   }}
							// >
							//   Download Document
							// </button>
							// <Button
							// 	variant="contained"
							// 	style={{ backgroundColor: "#4BB543", marginLeft: "10px" }}
							// 	onClick={() => {
							// 		window.location.href = showModel.data.document;
							// 	}}
							// 	endIcon={<DownloadIcon />}>
							// 	DOWNLOAD
							// </Button>
							<></>
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
