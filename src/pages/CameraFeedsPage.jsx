import React, { useState } from "react";
import NavBar from "./components/Navbar";
import ReactPlayer from "react-player";
import Faq from "react-faq-component";
import "./camerafeedspage.css";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import _, { map } from "underscore";
import { useQuery } from "react-query";
import { AuthContext } from "./Auth/auth-context";
import useWindowDimensions from "../hooks/dimensions";
import "react-datepicker/dist/react-datepicker.css";

const styles = {
	bgColor: "#ffffff",
	titleTextColor: "black",
	rowTitleColor: "black",
	// rowContentColor: 'grey',
	// arrowColor: "red",
};

const config = {
	// animate: true,
	// arrowIcon: "V",
	// tabFocus: true
};

const CameraFeedsPage = () => {
	const [Token, setToken] = useState("");
	const [data, setData] = React.useState([]);
	const [cameraCount, setCameraCount] = React.useState(null);
	const [uri, setUri] = React.useState([]);
	const [rtspLink, setRtspLink] = React.useState("");
	const [cameraCompany, setCameraCompany] = React.useState(null);
	const [loading, setLoading] = React.useState(false);
	const auth = React.useContext(AuthContext);
	const { height, width } = useWindowDimensions();
	// const uri = [
	//   "rtsp://admin:admin@123@103.141.218.43:554/Streaming/Channels/102",
	//   "rtsp://admin:admin@123@103.141.218.43:554/Streaming/Channels/202",
	//   "rtsp://admin:admin@123@103.141.218.43:554/Streaming/Channels/302",
	//   "rtsp://admin:admin@123@103.141.218.43:554/Streaming/Channels/402",
	//   "rtsp://admin:admin@123@103.141.218.43:554/Streaming/Channels/502",
	//   "rtsp://admin:admin@123@103.141.218.43:554/Streaming/Channels/602",
	//   "rtsp://admin:admin@123@103.141.218.43:554/Streaming/Channels/702",
	// ];

	React.useEffect(() => {
		let unmounted = false;

		let baseUrl = "https://feed.app-assertai.com/auth";

		if (!unmounted) {
			axios({
				method: "post",
				url: baseUrl,
				headers: {},
				data: {
					username: "arya",
					password: "arya@123", // This is the body part
				},
			}).then((response) => setToken(response.data));
		}

		return () => {
			unmounted = true;
		};
	});

	React.useEffect(() => {
		let unmounted = false;
		let url = `https://feed.app-assertai.com/auth_feed_arya`;
		// let url = "http://localhost/start";
		const getTrains = async (link, index) => {
			console.log(index);
			setLoading(true);
			try {
				const responseData = await axios.post(
					url,
					{
						uri: link,
						alias: `arya_warehouse${auth.warehouseId}cam_${index + 1}`,
					},
					{
						headers: {
							Authorization: Token,
						},
					},
				);
				if (!unmounted) {
					// console.log(url);
					setData((prev) => [...prev, responseData.data]);
					// console.log(responseData.data);
				}
			} catch (error) {
				console.log(error);
			}
		};
		if (uri.length > 1) {
			uri.map((link, index) => getTrains(link, index));
			setLoading(false);
		} else {
			setData("");
		}
		return () => {
			unmounted = true;
		};
	}, [auth.warehouseId, uri]);
	// setCameraCount
	React.useEffect(() => {
		let unmounted = false;
		let url = `${process.env.REACT_APP_BACKEND_URL}get_camera_count?wareshouse_id=${auth.warehouseId}`;
		// let url = "http://localhost/start";
		const getCameraCount = async () => {
			try {
				const responseData = await axios.get(url, {
					headers: { token: "Bearer " + auth.token },
				});
				if (!unmounted) {
					// console.log(url);
					if (responseData.data.data.length > 0) {
						setRtspLink(responseData.data.data[0].rtsp_link);
						setCameraCompany(responseData.data.data[0].camera_company);
						setCameraCount(responseData.data.data[0].camera_count);
					} else {
						setCameraCount(0);
					}
					// console.log(responseData.data);
				}
			} catch (error) {
				console.log(error);
			}
		};
		setCameraCount(0);
		getCameraCount();
		setUri([]);
		return () => {
			unmounted = true;
		};
	}, [auth.token, auth.warehouseId]);
	console.log(cameraCount);
	// setUri
	React.useMemo(() => {
		for (var i = 1; i <= cameraCount; i++) {
			// uri.push(`${centreInfo.rtsp_link}/${i}02`);
			const hikvisionSetter = (i) => {
				setUri((prev) => [
					...prev,
					`${rtspLink.replace("admin:assert@123", "username:password")}/${i}02`,
				]);
			};
			const univiewSetter = (i) => {
				setUri((prev) => [
					...prev,
					`${rtspLink.replace(
						"admin:assert@123",
						"username:password",
					)}/c${i}/s1/live`,
				]);
			};
			if (cameraCompany === "hikvision") {
				hikvisionSetter(i);
			} else if (cameraCompany === "uniview") {
				univiewSetter(i);
			}
		}
	}, [cameraCompany, cameraCount, rtspLink]);
	var sortedObjs = _.sortBy(data, "alias");
	console.log(sortedObjs);
	console.log(uri);
	// const result =
	// 	data &&
	// 	sortedObjs.map((element, index) => ({
	// 		title: `Cam${index + 1}`,
	// 		content: (
	// 			<ReactPlayer
	// 				url={`${element.uri}`}
	// 				playing={true}
	// 				controls="true"
	// 				width={width - "100px"}
	// 			/>
	// 		),
	// 	}));

	const listItems =
		data &&
		sortedObjs.map((item) => {
			return item.uri ? (
				<div
					style={{
						border: "5px solid black",
						borderRadius: "4px",
					}}>
					<ReactPlayer url={item.uri} playing={true} controls="true" />
				</div>
			) : (
				<div
					style={{
						width: "50vw",
						height: "50vh",
						display: "flex",
						flexWrap: "wrap",
						justifyContent: "space-evenly",
						alignItems: "center",
						border: "5px solid black",
						borderRadius: "4px",
					}}>
					Connecting to the server. Please Wait !!!
				</div>
			);
		});
	return (
		<div className="app">
			<NavBar />
			<div
				style={{
					display: "flex",
					flexWrap: "wrap",
					justifyContent: "space-evenly",
					gap: "20px",
					// width: "auto",
				}}>
				{listItems}
			</div>
			<div
				style={{
					display: "flex",
					margin: "20px",
					justifyContent: "center",
					flexDirection: "column",
					alignItems: "center",
				}}>
				{/* <Faq
					data={{
						title: "Live Cams",
						rows: result,
					}}
					styles={styles}
					config={config}
				/> */}
				{auth.warehouseId
					? data
						? data.length > 0 &&
						  loading && (
								<CircularProgress
									style={{ color: "green", margin: "60px" }}
									size={60}
								/>
						  )
						: "No cams found"
					: "Please select the warehouse id"}
				{/* {auth.warehouseId ? } */}
				{console.log(data.length)}
			</div>
		</div>
	);
};

export default CameraFeedsPage;
