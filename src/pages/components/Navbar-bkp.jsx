import React, { useContext, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Link, NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import { AuthContext } from "../Auth/auth-context";
import { useHistory } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import axios from "axios";
import MenuList from "@material-ui/core/MenuList";
import SearchIcon from "@mui/icons-material/Search";
import DatePicker from "react-datepicker";
import MenuIcon from "@mui/icons-material/Menu";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CameraOutdoorRoundedIcon from "@mui/icons-material/CameraOutdoorRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import WarehouseRoundedIcon from "@mui/icons-material/WarehouseRounded";
import RadarRoundedIcon from "@mui/icons-material/RadarRounded";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import "./navbar.css";
import {
	CircularProgress,
	Divider,
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	makeStyles,
	TextField,
	Typography,
} from "@material-ui/core";
import { useQuery } from "react-query";
import moment from "moment";
import { Autocomplete } from "@mui/material";
import { useTheme } from "@emotion/react";
import { Accessibility, Info } from "@material-ui/icons";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	drawer: {
		[theme.breakpoints.up("sm")]: {
			width: drawerWidth,
			flexShrink: 0,
		},
	},
	appBar: {
		[theme.breakpoints.up("sm")]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth,
		},
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up("sm")]: {
			display: "none",
		},
	},
	// necessary for content to be below app bar
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
}));

export default function NavBar(props) {
	const [openAutoComplete, setOpenAutoComplete] = React.useState(false);
	const [options, setOptions] = React.useState([]);
	const [inputValue, setInputValue] = React.useState("");
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [centreUrl, setCentreUrl] = React.useState([]);
	const auth = useContext(AuthContext);
	const classes = useStyles();
	// handle scroll

	const [state, setState] = React.useState({
		left: false,
	});

	const drawer = (
		<div>
			<div className={classes.toolbar} />
			<List>
				{/* {["Profile"].map((text, index) => ( */}
				<Divider />
				{auth.user.isAdmin && (
					<Link
						to="/users"
						style={{
							textDecoration: "none",
							color: "white",
							display: "flex",
						}}
						key={"Users"}>
						<ListItem button>
							<ListItemIcon>
								<AccountBoxIcon />
							</ListItemIcon>
							<ListItemText style={{ color: "#000" }} primary={"Users"} />
						</ListItem>
					</Link>
				)}
				<Link
					to="/"
					style={{
						textDecoration: "none",
						color: "white",
						display: "flex",
					}}
					key={"Alarms"}>
					<ListItem button>
						<ListItemIcon>
							<RadarRoundedIcon />
						</ListItemIcon>
						<ListItemText style={{ color: "#000" }} primary={"Alarms"} />
					</ListItem>
				</Link>
				<Link
					to="/attendance"
					style={{
						textDecoration: "none",
						color: "white",
						display: "flex",
					}}
					key={"Attendance"}>
					<ListItem button>
						<ListItemIcon>
							<Accessibility />
						</ListItemIcon>
						<ListItemText style={{ color: "#000" }} primary={"Attendance"} />
					</ListItem>
				</Link>
				<Link
					to="/sites"
					style={{
						textDecoration: "none",
						color: "white",
						display: "flex",
					}}
					key={"Sites"}>
					<ListItem button>
						<ListItemIcon>
							<WarehouseRoundedIcon />
						</ListItemIcon>
						<ListItemText style={{ color: "#000" }} primary={"Sites"} />
					</ListItem>
				</Link>
				<Link
					to="/live"
					style={{
						textDecoration: "none",
						color: "white",
						display: "flex",
					}}
					key={"Camera Feeds"}>
					<ListItem button>
						<ListItemIcon>
							<CameraOutdoorRoundedIcon />
						</ListItemIcon>
						<ListItemText style={{ color: "#000" }} primary={"Camera Feeds"} />
					</ListItem>
				</Link>
				{/* <Link
					to="/live"
					style={{
						textDecoration: "none",
						color: "white",
						display: "flex",
					}}
					key={"Diagnostics"}>
					<ListItem button>
						<ListItemIcon>
							<CameraOutdoorRoundedIcon />
						</ListItemIcon>
						<ListItemText style={{ color: "#000" }} primary={"Diagnostics"} />
					</ListItem>
				</Link> */}
				{/* ))} */}

				{/* ))} */}
					<ListItem button>
						<ListItemIcon>
							<Info />
							{/* {/* <Diagnostics /> */}
						</ListItemIcon>
						<ListItemText style={{ color: "#000" }} primary={"Support"} />
					</ListItem>
				</Link>
                                  <Link
					to="/diagnostics"
					style={{
						textDecoration: "none",
						color: "white",
						display: "flex",
					}}
					key={"Status"}
					// onClick={() => {
					//   LogoutClickHandler();
					//   handleClose();
					// }}
				>
					<ListItem button>
						<ListItemIcon>
							<Info />
							{/* {/* <Diagnostics /> */}
						</ListItemIcon>
						<ListItemText style={{ color: "#000" }} primary={"Status"} />
					</ListItem>
				</Link>
				{/* <Link
          // to="/"
          style={{
            textDecoration: "none",
            color: "white",
            display: "flex",
          }}
          key={"Support"}
          // onClick={() => {
          //   LogoutClickHandler();
          //   handleClose();
          // }}
        > */}
                               <Link
					to="/support"
					style={{
						textDecoration: "none",
						color: "white",
						display: "flex",
					}}
					key={"Support"}
					// onClick={() => {
					//   LogoutClickHandler();
					//   handleClose();
					// }}
				>
				<ListItem button>
					<ListItemIcon>
						<SupportAgentIcon />
					</ListItemIcon>
					<ListItemText style={{ color: "#000" }} primary={"Support"} />
				</ListItem>
                                </Link>
				{/* </Link> */}

				<Link
					to="/"
					style={{
						textDecoration: "none",
						color: "white",
						display: "flex",
					}}
					key={"Logout"}
					onClick={() => {
						LogoutClickHandler();
						handleClose();
					}}>
					<ListItem button>
						<ListItemIcon>
							<LogoutRoundedIcon />
						</ListItemIcon>
						<ListItemText style={{ color: "#000" }} primary={"Logout"} />
					</ListItem>
				</Link>
			</List>
			<Divider />
		</div>
	);

	let history = useHistory();
	console.log(auth.user);
	const open = Boolean(anchorEl);
	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const [openDrawer, setOpen] = React.useState(false);

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const LogoutClickHandler = (event) => {
		auth.logout();
		openDrawer && handleDrawerClose();
		history.push("/");
	};

	const styles = {
		borderBottom: "2px solid rgb(96, 109, 65)",
		fontWeight: "bold",
		borderRadius: "0",
	};
	//for getting log data according to date
	const { data, refetch } = useQuery(
		"centres",
		async () => {
			let url = auth.user.isAdmin
				? auth.warehouseId
					? `${
							process.env.REACT_APP_USERS_BACKEND_URL
					  }api/users/get_logs?warehouse_id=${
							auth.warehouseId
					  }&start_date=${moment(auth.startDate).format(
							"YYYY-MM-DD",
					  )}&end_date=${moment(auth.endDate).format("YYYY-MM-DD")}`
					: `${
							process.env.REACT_APP_USERS_BACKEND_URL
					  }api/users/get_logs?start_date=${moment(auth.startDate).format(
							"YYYY-MM-DD",
					  )}&end_date=${moment(auth.endDate).format("YYYY-MM-DD")}`
				: auth.warehouseId &&
				  `${
						process.env.REACT_APP_USERS_BACKEND_URL
				  }api/users/get_logs?warehouse_id=${
						auth.warehouseId
				  }&start_date=${moment(auth.startDate).format(
						"YYYY-MM-DD",
				  )}&end_date=${moment(auth.endDate).format("YYYY-MM-DD")}`;
			if (url) {
				const response = await axios.get(url, {
					headers: { token: "Bearer " + auth.token },
				});

				auth.setLogs(response.data);
			}
		},
		{
			refetchInterval: 300 * 1000, //3 seconds
		},
	);

	//for getting centres list

	useEffect(() => {
		let active = true;
		const getCenterList = async (centreUrl) => {
			// ${process.env.REACT_APP_BACKEND_URL}get_center_list
			if (centreUrl) {
				const response = await axios.get(centreUrl,{
					headers: { token: "Bearer " + auth.token },
				});

				if (active) {
					console.log(response.data.data);
					setOptions((prev) => [...prev,...response.data]);
				}
			}
		};
		centreUrl && centreUrl.map((url) => getCenterList(url));
		return () => {
			active = false;
		};
	}, [centreUrl]);
	console.log(centreUrl);
	React.useEffect(() => {
		if (auth.user.isAdmin) {
			setCentreUrl([
				`${process.env.REACT_APP_BACKEND_URL}api/users/get_center_list_array`,
			]);
		} else if (auth.user.state && auth.user.state.length > 0) {
			auth.user.state.map((e) =>
				setCentreUrl((prev) => [
					...prev,
					`${process.env.REACT_APP_BACKEND_URL}api/users/get_center_list_array?state=${e}`,
				]),
			);
		} else {
			if (auth.user.warehouse && auth.user.warehouse.length > 0) {
				auth.user.warehouse.map((id) => setOptions((prev) => [...prev, id]));
			} else {
				setOptions([]);
			}
		}

		return () => {};
	}, [auth.user.state, auth.user.isAdmin, auth.user.warehouse]);
	console.log(options);

	console.log(inputValue);
	//open close drawer
	const toggleDrawer = (anchor, open) => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};

	return (
		<AppBar
			className="navbar"
			position="sticky"
			style={{ marginBottom: "60px" }}>
			<div className="toolbar">
				<Button className="admin-ham-menu" onClick={toggleDrawer("left", true)}>
					<MenuIcon />
				</Button>
				<Drawer
					classes={{
						paper: classes.drawerPaper,
					}}
					anchor={"left"}
					open={state["left"]}
					onClose={toggleDrawer("left", false)}>
					{drawer}
				</Drawer>
				<div className="box">
					<NavLink to="/">
						<img
							src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAI0AAABBCAYAAADsdCdqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RENEM0UxNThDMjBGMTFFQkFDRTA4MzIzQTI0N0ZCMUEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RENEM0UxNTlDMjBGMTFFQkFDRTA4MzIzQTI0N0ZCMUEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpEQ0QzRTE1NkMyMEYxMUVCQUNFMDgzMjNBMjQ3RkIxQSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpEQ0QzRTE1N0MyMEYxMUVCQUNFMDgzMjNBMjQ3RkIxQSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjF56b4AABCgSURBVHja7F0JdFTV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"
							alt=""
						/>
					</NavLink>
					<div className="input-box">
						<Autocomplete
							id="Warehouses"
							sx={{ width: 150 }}
							className="auto-complete"
							open={openAutoComplete}
							value={auth.warehouseId}
							onOpen={() => {
								setOpenAutoComplete(true);
							}}
							onClose={() => {
								setOpenAutoComplete(false);
							}}
							isOptionEqualToValue={(option, value) => option}
							getOptionLabel={(option) => option}
							options={options.sort((a, b) => a - b)}
							inputValue={inputValue}
							onInputChange={(event, value) => {
								setInputValue(value);
								auth.setWarehouseId(value);
								console.log(value);
							}}
							renderInput={(params) => (
								<TextField {...params} label="W.H. ID" />
							)}
						/>
						<div className="body-container">
							<div
								className="flex-item"
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}>
								<div className="start-date">
									<Typography style={{ color: "grey" }}>Start Date</Typography>
									<DatePicker
										selected={auth.startDate}
										onChange={(date) => auth.setStartDate(date)}
										selectsStart
										startDate={auth.startDate}
										endDate={auth.endDate}
										placeholderText="Select"
										dateFormat="yyyy-MM-dd"
										style={{ position: "relative", zIndex: "999" }}
									/>
								</div>
								<div className="end-date">
									<Typography style={{ color: "grey" }}>End Date</Typography>
									<DatePicker
										selected={auth.endDate}
										onChange={(date) => auth.setEndDate(date)}
										selectsEnd
										startDate={auth.startDate}
										endDate={auth.endDate}
										minDate={auth.startDate}
										placeholderText="Select"
										dateFormat="yyyy-MM-dd"
									/>
								</div>
							</div>
							<div className="button">
								<IconButton
									aria-label="search"
									style={{
										pointerEvents:
											(auth.startDate && auth.endDate) === null && "none",
									}}
									onClick={() => refetch()}>
									<SearchIcon />
								</IconButton>
							</div>
						</div>
					</div>
				</div>

				<div className="nav-links">
					<Button
						component={NavLink}
						className="nav-link"
						exact
						activeStyle={styles}
						to={"/"}>
						ALARMS
					</Button>
					<Button
						component={NavLink}
						className="nav-link"
						exact
						activeStyle={styles}
						to={"/attendance"}>
						Attendance
					</Button>
					<Button
						component={NavLink}
						className="nav-link"
						activeStyle={styles}
						to={"/sites"}>
						SITES
					</Button>
					<Button
						className="nav-link"
						component={NavLink}
						activeStyle={styles}
						to={"/live"}>
						CAMERA FEEDS
					</Button>
					<Button
						className="nav-link"
						component={NavLink}
						activeStyle={styles}
						to={"/diagnostics"}>
						Diagnostics
					</Button>

					<IconButton onClick={handleMenu}>
						<AccountCircle />
					</IconButton>
					<Popper
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						transition
						disablePortal
						placement="bottom">
						<Paper>
							<ClickAwayListener onClickAway={handleClose}>
								<MenuList autoFocusItem={Boolean(open)} id="menu-appbar">
									<MenuItem
										component={NavLink}
										to="/"
										onClick={() => {
											LogoutClickHandler();
											handleClose();
										}}>
										Logout
									</MenuItem>
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Popper>
				</div>
			</div>
		</AppBar>
	);
}
