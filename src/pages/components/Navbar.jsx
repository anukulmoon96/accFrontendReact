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
				{/* ))} */}

				{/* ))} */}
				
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
				const response = await axios.get(centreUrl, {
					headers: { token: "Bearer " + auth.token },
				});

				if (active) {
					console.log(response.data.data);
					setOptions((prev) => [...prev, ...response.data]);
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
			style={{ height:"60px", marginBottom: "0px" }}>
			<div className="toolbar">
				<Button style={{marginTop:'10px'}}  className="admin-ham-menu" onClick={toggleDrawer("left", true)}>
					<MenuIcon style={{color:"white"}} />
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
					
				</div>

				<div className="nav-links">
					
				</div>
			</div>
		</AppBar>
	);
}
