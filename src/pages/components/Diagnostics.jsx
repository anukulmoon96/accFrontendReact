import React, { useEffect, useState } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import { Button, createTheme, MuiThemeProvider } from "@material-ui/core";
import NavBar from "./Navbar";
import "./Diagnostics.css";
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
		marginTop: "10px",
	},
});
function Diagnostics() {
	const [state, setState] = useState([]);
	const [state1, setState1] = useState([]);
	const tableData = [];
	const tableData1 = [];
	const camera_name = "";
	const rowTableData = [];
	const myfunction = (rowData) => {
		console.log("got the data", rowData);
		rowData.camera_name = "harsh";
		rowTableData.push(rowData.camera_name);
	};
	const fetchData = () => {
		fetch("https://app-assertai.com:5000/api/getCSVData/getData")
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				console.log(data.data);
				console.log(data.data1);
				setState(data.data);
				setState1(data.data1);
			});
	};
	useEffect(() => {
		fetchData();
	}, []);
	state.map((item) => {
		tableData.push(item);
	});
	state1.map((item) => {
		tableData1.push(item);
	});

	tableData.forEach((item) => {
		if (item.working) {
			//console.log(item.working.match(/\w+/g));
			const arrayLength = item.working.match(/\w+/g);
			console.log(arrayLength);
		}
	});
	tableData1.forEach((item) => {});
	var newData = tableData1.filter((elt, eltIndex) =>
		tableData1.some(
			(sameNameElt, sameNameEltIndex) =>
				sameNameElt.name === elt.name && sameNameEltIndex !== eltIndex,
		),
	);
	// console.log("new table: ", newData);
	// for (let i = 0; i < tableData.length; i++) {
	// 	for (let j = 0; j < tableData1.length; j++) {
	// 		if (tableData[i].DeviceId === tableData1[j].Warehouse_ID) {
	// 			console.log(
	// 				`DeviceId ${tableData[i].DeviceId}----> WarehouseId ${tableData1[j].Warehouse_ID}----->`,
	// 				tableData1[j].camera_name,
	// 			);
	// 		}
	// 	}
	// }
	// const printNumbers0To5 = () => {
	// 	const row = [];
	// 	// for (var i = 0; i <p 5; i++) {
	// 	// 	row.push(<p key={i}>{i}</p>);
	// 	// }
	// 	for (let i = 0; i <= tableData.length; i++) {
	// 		for (let j = 0; j <= tableData1.length; j++) {
	// 			if (tableData[i].DeviceId === tableData1[j].Warehouse_ID) {
	// 				console.log(
	// 					`DeviceId ${tableData[i].DeviceId}----> WarehouseId ${tableData1[j].Warehouse_ID}----->`,
	// 					tableData1[j].camera_name,
	// 				);
	// 				row.push(<p key={i}>{tableData1[j].camera_name}</p>);
	// 			} else if (tableData[i].DeviceId !== tableData1[j].Warehouse_ID) {
	// 				break;
	// 			}
	// 		}
	// 		return row;
	// 	}
	// };

	return (
		<div>
			<NavBar />
			<MuiThemeProvider theme={theme}>
				<MaterialTable
					title=""
					columns={[
						{
							field: "Installations completed ",
							title: "Installations completed ",
						},
						{
							field: "Sites Active",
							title: "Sites Active",
						},

						{
							field: "Sites >90% Uptime",
							title: "Sites >90% Uptime",
						},
						{
							field: "Sites 75%-90% Uptime",
							title: "Sites 75%-90% Uptime",
						},
						{
							field: "Sites 50%-75% Uptime",
							title: "Sites 50%-75% Uptime",
						},
						{
							field: "Sites <50% Uptime",
							title: "Sites <50% Uptime",
						},
						// {
						// 	field: "Assert-Network",
						// 	title: "Assert-Network",
						// },
					]}
					data={tableData1}
					options={{
						actionsColumnIndex: -1,
						addRowPosition: "first",
						headerStyle: {
							backgroundColor: "rgb(40,40,40,0.8)",
							color: "#FFF",
						},
						paging: false,
						search: false,
						exportButton: true,
						exportAllData: true,
					}}
					style={{ marginBottom: "1%" }}
				/>
			</MuiThemeProvider>
			<MuiThemeProvider theme={theme}>
				<MaterialTable
					title="Diagnostics Table"
					columns={[
						{
							field: "WH-ID",
							title: "WH-ID",
						},
						{
							field: "WH-Code",
							title: "WH-Code",
						},
						{
							field: "Branch Name",
							title: "Branch Name",
						},
						{
							field: "GPU status",
							title: "GPU status",
						},
						{
							field: "Dashboard status",
							title: "Dashboard status",
						},
						{
							field: "DVR/cameras staus",
							title: "DVR/cameras staus",
						},
						{
							field: "Ageing",
							title: "Ageing",
						},
						{
							field: "Ticket Issues",
							title: "Ticket Issues",
						},
						// {
						// 	field: "Ticket Issue Date",
						// 	title: "Ticket Issue Date",
						// },
						{
							field: "TargetDate",
							title: "Target Date",
						},
						{
							field: "Heart Beat",
							title: "Heart Beat",
						},
						{
							field: "Remarks",
							title: "Remarks",
						},
					]}
					data={tableData}
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
					detailPanel={(rowData) => {
						console.log(rowData.Date.match(/\d+/g));
						//console.log( rowData.working.match( /\w+/g ) );
						rowData.Working.match(/\w+/g).map((item, index) => {
							// if (index % 2 != 0) {
							// 	console.log(item + " " + index);
							// }
							console.log(item);
						});
						return (
							<div>
								<table>
									<tr>
										<th>Camera ID</th>
										<th>Camera Name</th>
										<th>Status</th>
									</tr>
									<tr>
										<td>{rowData?.Working?.match(/[a-zA-Z0-9\s]+/g)?.[0] || ""}</td>
										<td>{rowData?.Working?.match(/[a-zA-Z0-9\s]+/g)?.[1] || ""}</td>
										<td>{rowData?.Working?.match(/[a-zA-Z0-9\s]+/g)?.[2] || ""}</td>

										{/* <td>
											{rowData.date.match(/\d+/g)[0] +
												"/" +
												rowData.date.match(/\d+/g)[1] +
												"/" +
												rowData.date.match(/\d+/g)[2]}
										</td> */}
									</tr>
									<tr>
										<td>{rowData?.Working?.match(/[a-zA-Z0-9\s]+/g)?.[3] || ""}</td>
										<td>{rowData?.Working?.match(/[a-zA-Z0-9\s]+/g)?.[4] || ""}</td>
										<td>{rowData?.Working?.match(/[a-zA-Z0-9\s]+/g)?.[5] || ""}</td>
										{/* <td>{rowData?.nonworking?.match(/\w+/g)?.[3] || ""}</td> */}
									</tr>
									<tr>
										<td>{rowData?.Working?.match(/[a-zA-Z0-9\s]+/g)?.[6] || ""}</td>
										<td>{rowData?.Working?.match(/[a-zA-Z0-9\s]+/g)?.[7] || ""}</td>
										<td>{rowData?.Working?.match(/[a-zA-Z0-9\s]+/g)?.[8] || ""}</td>
										{/* <td>{rowData?.nonworking?.match(/\w+/g)?.[5] || ""}</td> */}
									</tr>
									<tr>
										<td>{rowData?.Working?.match(/[a-zA-Z0-9\s]+/g)?.[9] || ""}</td>
										<td>{rowData?.Working?.match(/[a-zA-Z0-9\s]+/g)?.[10] || ""}</td>
										<td>{rowData?.Working?.match(/[a-zA-Z0-9\s]+/g)?.[11] || ""}</td>
										{/* <td>{rowData?.nonworking?.match(/\w+/g)?.[7] || ""}</td> */}
									</tr>
									<tr>
										<td>{rowData?.Working?.match(/[a-zA-Z0-9\s]+/g)?.[12] || ""}</td>
										<td>{rowData?.Working?.match(/[a-zA-Z0-9\s]+/g)?.[13] || ""}</td>
										<td>{rowData?.Working?.match(/[a-zA-Z0-9\s]+/g)?.[14] || ""}</td>
										{/* <td>{rowData?.nonworking?.match(/\w+/g)?.[9] || ""}</td> */}
									</tr>
									<tr>
										<td>{rowData?.Working?.match(/[a-zA-Z0-9\s]+/g)?.[15] || ""}</td>
										<td>{rowData?.Working?.match(/[a-zA-Z0-9\s]+/g)?.[16] || ""}</td>
										<td>{rowData?.Working?.match(/[a-zA-Z0-9\s]+/g)?.[17] || ""}</td>
										{/* <td>{rowData?.nonworking?.match(/\w+/g)?.[11] || ""}</td> */}
									</tr>
									<tr>
										<td>{rowData?.Working?.match(/[a-zA-Z0-9\s]+/g)?.[18] || ""}</td>
										<td>{rowData?.Working?.match(/[a-zA-Z0-9\s]+/g)?.[19] || ""}</td>
										<td>{rowData?.Working?.match(/[a-zA-Z0-9\s]+/g)?.[20] || ""}</td>
									</tr>
									<tr>
										<td>{rowData?.Working?.match(/[a-zA-Z0-9\s]+/g)?.[21] || ""}</td>
										<td>{rowData?.Working?.match(/[a-zA-Z0-9\s]+/g)?.[22] || ""}</td>
										<td>{rowData?.Working?.match(/[a-zA-Z0-9\s]+/g)?.[23] || ""}</td>
									</tr>
									<tr>
										<td>{rowData?.Working?.match(/[a-zA-Z0-9\s]+/g)?.[24] || ""}</td>
										<td>{rowData?.Working?.match(/[a-zA-Z0-9\s]+/g)?.[25] || ""}</td>
										<td>{rowData?.Working?.match(/[a-zA-Z0-9\s]+/g)?.[26] || ""}</td>
									</tr>
									<tr>
										<td>{rowData?.Working?.match(/[a-zA-Z0-9\s]+/g)?.[27] || ""}</td>
										<td>{rowData?.Working?.match(/[a-zA-Z0-9\s]+/g)?.[28] || ""}</td>
										<td>{rowData?.Working?.match(/[a-zA-Z0-9\s]+/g)?.[29] || ""}</td>
									</tr>
								</table>
							</div>
						);
					}}
					// actions={[
					// 	(rowData) => ({
					// 		icon: "info",
					// 		tooltip: "More Info",
					// 		onClick: (event, rowData) =>
					// 			// history.push({
					// 			//   pathname: "/sites",
					// 			//   state: {
					// 			//     // location state
					// 			//     id: rowData.event_id,
					// 			//   },
					// 			// }),
					// 			setShowModel({ show: true, data: rowData }),
					// 	}),
					// ]}
					style={{ width: "100%" }}
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
			{/* <Modal
				show={showModel.show}
				onCancel={() => setShowModel({ show: false, data: null })}
				header={showModel.data && showModel.data.warehouse_name}
				contentClass="place-item__modal-content"
				footerClass="place-item__modal-actions"
				footer={
					<Button onClick={() => setShowModel({ show: false, data: null })}>
						CLOSE
					</Button>
				}> */}
			{/* <ReactPlayer url="https://drive.google.com/file/d/1Xkn3footoYMINwri2khF9vruu_7c10RW/view" /> */}
			{/* <div className="modal-data">
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
					</div> */}
			{/* <Magnifier
						src={showModel.data && showModel.data.image}
						height={300}
						mgShape="square"
					/> */}
			{/* <img
            className="modal-image"
            src={showModel.data && showModel.data.image}
            alt="fimage"
          /> */}
			{/* </Modal> */}
		</div>
	);
}

export default Diagnostics;

// <table>
// 	<tr>
// 		<th>Camera ID</th>
// 		<th>Camera Name</th>
// 		<th>Date</th>
// 	</tr>
// 	<tr>
// 		<td>1</td>

// 		<td>{rowData.date}</td>
// 	</tr>
// {
/* <tr>
										<td>2</td>
										<td>Cam 2</td>
										<td>Online</td>
									</tr> */
// }
// </table>;
