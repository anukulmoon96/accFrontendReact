import axios from "axios";
import moment from "moment";
import React from "react";
import { AuthContext } from "./Auth/auth-context";
import NavBar from "./components/Navbar";
import ReviewCard from "./components/ReviewCard";
import "react-datepicker/dist/react-datepicker.css";
import MaterialTable from "material-table";
import { Button, createTheme, MuiThemeProvider } from "@material-ui/core";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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
const modalstyle = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 520,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};
const AttendancePage = () => {
	const [attendanceData, setAttendanceData] = React.useState([]);
	const [Image, setImage] = React.useState("");
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const auth = React.useContext(AuthContext);
	React.useEffect(() => {
		let unmounted = false;
		// first check is is the data is coming from log table or not
		let url = auth.user.isAdmin
			? auth.warehouseId //now we know that data is not coming from log table
				? //now we know that admin is here and we are checking for warehouseId
				  `${
						process.env.REACT_APP_USERS_BACKEND_URL
				  }api/users/get_attendance_data?warehouse_id=${
						auth.warehouseId
				  }&start_date=${moment(auth.startDate).format(
						"YYYY-MM-DD",
				  )}&end_date=${moment(auth.endDate).format("YYYY-MM-DD")}`
				: `${
						process.env.REACT_APP_USERS_BACKEND_URL
				  }api/users/get_attendance_data?start_date=${moment(auth.startDate).format(
						"YYYY-MM-DD",
				  )}&end_date=${moment(auth.endDate).format("YYYY-MM-DD")}`
			: auth.warehouseId &&
			  `${
					process.env.REACT_APP_USERS_BACKEND_URL
			  }api/users/get_attendance_data?warehouse_id=${
					auth.warehouseId
			  }&start_date=${moment(auth.startDate).format(
					"YYYY-MM-DD",
			  )}&end_date=${moment(auth.endDate).format("YYYY-MM-DD")}`;

		const getAttendanceData = async () => {
			try {
				console.log(auth.token);
				const responseData = await axios.get(url, {
					headers: { token: "Bearer " + auth.token },
				});
				if (!unmounted) {
					console.log(responseData);
					setAttendanceData(responseData.data);
					setImage(responseData.data.image);
				}
			} catch (error) {
				console.log(error);
			}
		};
		if (url) {
			getAttendanceData();
		}
		return () => {
			unmounted = true;
		};
	}, [
		auth.startDate,
		auth.endDate,
		auth.token,
		auth.warehouseId,
		auth.user.isAdmin,
	]);
	return (
		<div>
			<NavBar />
			{!auth.user.isAdmin && !auth.warehouseId && (
				<>
					<div
						style={{
							display: "flex",
							margin: "30px 0",
							justifyContent: "center",
							gap: "60px",
							flexWrap: "wrap",
						}}>
						<div style={{ fontSize: "50px" }}>Please Select Warehouse Id!</div>
					</div>
				</>
			)}
			{/* <div
				style={{
					display: "flex",
					margin: "30px 0",
					justifyContent: "center",
					gap: "60px",
					flexWrap: "wrap",
				}}>
				{attendanceData ? (
					attendanceData.length > 0 ? (
						attendanceData.map((attendee) => {
							return (
								<ReviewCard
									_id={attendee._id}
									date={attendee.date}
									time={attendee.time}
									city={attendee.city}
									warehouse_name={attendee.warehouse_name}
									camera_name={attendee.camera_name}
									image={attendee.image}
								/>
							);
						})
					) : (
						<>
							<div style={{ fontSize: "50px" }}>No attendance data found!</div>
						</>
					)
				) : (
					<>
						{" "}
						{auth.user.isAdmin && (
							<div style={{ fontSize: "50px" }}>No attendance data found!</div>
						)}
					</>
				)}
			</div> */}
			<MuiThemeProvider theme={theme}>
				<MaterialTable
					title="Attendence Table"
					columns={[
						{
							field: "warehouse_code",
							title: "Warehouse Code",
						},
						{
							field: "date",
							title: "date",
						},
						{
							field: "time",
							title: "time",
						},
						// {
						// 	field: "Attendence_cam_id",
						// 	title: "Attendence_cam_id",
						// },
						{
							field: "warehouse_name",
							title: "Warehouse Name",
						},
						{
							field: "image",
							title: "image",
							render: (rowData) => (
								<img
									onClick={function () {
										handleOpen();
										setImage(rowData.image);
									}}
									src={rowData.image}
									style={{ width: 200, cursor: "pointer" }}
								/>
							),
						},
						{
							field: "attendance_count",
							title: "Attendence Count",
						},
					]}
					data={
						attendanceData
						// [
						// {
						// 	Id: "1",
						// 	Date: "2022-06-21",
						// 	Time: "08:07:39",
						// 	Attendence_cam_id: 42_5,
						// 	Warehouse_name: "Dadaji Corporation Warehouse",
						// 	Image: (
						// 		<a href="https://at-arya-bucket.s3.ap-south-1.amazonaws.com/frame_attendanceframe_1146552_2022-06-21_08:07:39.jpg">
						// 			Image
						// 		</a>
						// 	),
						// 	Attendence_count: "1/5",
						// },
						// {
						// 	Id: "2",
						// 	Date: "2022-06-21",
						// 	Time: "20:18:58",
						// 	Attendence_cam_id: 30_2,
						// 	Warehouse_name: "Mamashri warehouse_4",
						// 	Image: (
						// 		<a href="https://at-arya-bucket.s3.ap-south-1.amazonaws.com/frame_attendanceframe_1146552_2022-06-21_08:07:39.jpg">
						// 			Image
						// 		</a>
						// 	),
						// 	Attendence_count: "1/5",
						// },
						// ]
					}
					options={{
						actionsColumnIndex: -1,
						addRowPosition: "first",
						headerStyle: {
							backgroundColor: "rgb(40,40,40,0.8)",
							color: "#FFF",
						},

						exportButton: true,
						exportAllData: true,
					}}
					style={{ width: "100%" }}
				/>
			</MuiThemeProvider>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description">
				<Box sx={modalstyle}>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						Image
					</Typography>
					{/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
						Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
					</Typography> */}
					<img src={Image} style={{ width: "500px" }} />
				</Box>
			</Modal>
		</div>
	);
};

export default AttendancePage;

