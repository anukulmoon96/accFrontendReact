import React from "react";
import MaterialTable from "material-table";
import Navbar from "./components/Navbar";
import "react-datepicker/dist/react-datepicker.css";
import "./homepage.css";
import "./components/Sidebar.css";
import { createTheme, MuiThemeProvider } from "@material-ui/core";
import moment from "moment";
import { useHistory } from "react-router-dom";
import {FaHome,FaUserFriends,FaVideo} from 'react-icons/fa'
import { AuthContext } from "./Auth/auth-context";
import Button from '@mui/material/Button';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}];


const theme = createTheme({
	overrides: {
		MuiTableSortLabel: {
			root: {
				color: "#fff",
				transition: "all 0.5s ease",
				"&:hover": {
					color: "lightgreen",
				},
			},
		},
	},
});

const Homepage = () => {
	const history = useHistory();
	const auth = React.useContext(AuthContext);


	return (
		<>
			<Navbar />
			<div className='container2'>
        <ul className="sidebar2">
            <li></li>
            <li><FaHome style={{color:"white"}}/></li>
            <li><FaUserFriends style={{color:"white"}}/></li>
			<li><FaVideo style={{color:"white"}}/></li>
        </ul>
        <div style={{marginLeft:"50px"}}>
           

<div style={{ display: "flex"}}>
  <div style={{backgroundColor:"white",margin:"20px", width: "25em",height: "86vh"}}>
    <div style={{marginTop:"100px",marginLeft:"20px"}}>
    <b>Select Status</b>
    <br/>
    <br/>
    <input type="checkbox"/> LIVE 
    <br/>
    <input type="checkbox"/> COMPLETED
    <br/>
    <br/>
    <br/>
    <br/>
    <Button variant="contained" style={{backgroundColor:"green"}}>Apply</Button>
    </div> 
  </div>
  <div style={{backgroundColor:"white",
  width: "95em",
 // padding: "10px",
 marginTop:"20px",
 marginRight:"20px",
  height: "86vh",
  overflowY:"scroll"}}>
   

   <div style={{display: "grid",
gridTemplateColumns: "repeat(3, 1fr)",
gridTemplateRows: "420px 320px 320px 320px 320px 320px 320px",
gridColumnGap: "20px",
gridRowGap: "20px",
margin:"20px"}}>

 <div style={{ gridArea: "1 / 1 / 2 / 4",boxShadow: "3px 3px 5px 6px #ccc" }}>
  <div style={{display:"flex",justifyContent:"center",marginTop:"50px"}}>
  <LineChart width={600} height={300} data={data}>
    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
    <CartesianGrid stroke="#ccc" />
    <XAxis dataKey="name" />
    <YAxis />
  </LineChart>
  </div>
  </div>
 <div style={{ gridArea: "2 / 1 / 3 / 2",boxShadow: "3px 3px 5px 6px #ccc" }}>
  <div style={{textAlign:"center"}}>
    <br/>
    <span style = {{fontSize: "40px"}}><b>TLM1</b></span>
    <br/><br/>
    <span style = {{fontSize: "90px"}}><b><span style={{color:"red"}}>98</span>/<span style={{color:"green"}}>150</span></b></span>
    <br/><br/><br/>
    <Button variant="contained">START NEW</Button>&nbsp;&nbsp;
    <Button variant="contained" style={{backgroundColor:"black"}}>VIEW MORE</Button>

  </div>
 </div>
 <div style={{ gridArea: "2 / 2 / 3 / 3",boxShadow: "3px 3px 5px 6px #ccc" }}> <div style={{textAlign:"center"}}>
    <br/>
    <span style = {{fontSize: "40px"}}><b>TLM2</b></span>
    <br/><br/>
    <span style = {{fontSize: "90px"}}><b><span style={{color:"red"}}>98</span>/<span style={{color:"green"}}>150</span></b></span>
    <br/><br/><br/>
    <Button variant="contained">START NEW</Button>&nbsp;&nbsp;
    <Button variant="contained" style={{backgroundColor:"black"}}>VIEW MORE</Button>

  </div></div>
 <div style={{ gridArea: "2 / 3 / 3 / 4",boxShadow: "3px 3px 5px 6px #ccc" }}> <div style={{textAlign:"center"}}>
    <br/>
    <span style = {{fontSize: "40px"}}><b>TLM3</b></span>
    <br/><br/>
    <span style = {{fontSize: "90px"}}><b><span style={{color:"red"}}>98</span>/<span style={{color:"green"}}>150</span></b></span>
    <br/><br/><br/>
    <Button variant="contained">START NEW</Button>&nbsp;&nbsp;
    <Button variant="contained" style={{backgroundColor:"black"}}>VIEW MORE</Button>

  </div></div>
 <div style={{ gridArea: "3 / 1 / 4 / 2",boxShadow: "3px 3px 5px 6px #ccc" }}> <div style={{textAlign:"center"}}>
    <br/>
    <span style = {{fontSize: "40px"}}><b>TLM4</b></span>
    <br/><br/>
    <span style = {{fontSize: "90px"}}><b><span style={{color:"red"}}>98</span>/<span style={{color:"green"}}>150</span></b></span>
    <br/><br/><br/>
    <Button variant="contained">START NEW</Button>&nbsp;&nbsp;
    <Button variant="contained" style={{backgroundColor:"black"}}>VIEW MORE</Button>

  </div></div>
 <div style={{ gridArea: "3 / 2 / 4 / 3",boxShadow: "3px 3px 5px 6px #ccc" }}> <div style={{textAlign:"center"}}>
    <br/>
    <span style = {{fontSize: "40px"}}><b>TLM5</b></span>
    <br/><br/>
    <span style = {{fontSize: "90px"}}><b><span style={{color:"red"}}>98</span>/<span style={{color:"green"}}>150</span></b></span>
    <br/><br/><br/>
    <Button variant="contained">START NEW</Button>&nbsp;&nbsp;
    <Button variant="contained" style={{backgroundColor:"black"}}>VIEW MORE</Button>

  </div></div>
 <div style={{ gridArea: "3 / 3 / 4 / 4",boxShadow: "3px 3px 5px 6px #ccc" }}> <div style={{textAlign:"center"}}>
    <br/>
    <span style = {{fontSize: "40px"}}><b>TLM6</b></span>
    <br/><br/>
    <span style = {{fontSize: "90px"}}><b><span style={{color:"red"}}>98</span>/<span style={{color:"green"}}>150</span></b></span>
    <br/><br/><br/>
    <Button variant="contained">START NEW</Button>&nbsp;&nbsp;
    <Button variant="contained" style={{backgroundColor:"black"}}>VIEW MORE</Button>

  </div></div>
 <div style={{ gridArea: "4 / 1 / 5 / 2",boxShadow: "3px 3px 5px 6px #ccc" }}> <div style={{textAlign:"center"}}>
    <br/>
    <span style = {{fontSize: "40px"}}><b>WLM1</b></span>
    <br/><br/>
    <span style = {{fontSize: "90px"}}><b><span style={{color:"red"}}>98</span>/<span style={{color:"green"}}>150</span></b></span>
    <br/><br/><br/>
    <Button variant="contained">START NEW</Button>&nbsp;&nbsp;
    <Button variant="contained" style={{backgroundColor:"black"}}>VIEW MORE</Button>

  </div></div>
 <div style={{ gridArea: "4 / 2 / 5 / 3",boxShadow: "3px 3px 5px 6px #ccc" }}> <div style={{textAlign:"center"}}>
    <br/>
    <span style = {{fontSize: "40px"}}><b>WLM2</b></span>
    <br/><br/>
    <span style = {{fontSize: "90px"}}><b><span style={{color:"red"}}>98</span>/<span style={{color:"green"}}>150</span></b></span>
    <br/><br/><br/>
    <Button variant="contained">START NEW</Button>&nbsp;&nbsp;
    <Button variant="contained" style={{backgroundColor:"black"}}>VIEW MORE</Button>

  </div></div>
 <div style={{ gridArea: "4 / 3 / 5 / 4",boxShadow: "3px 3px 5px 6px #ccc" }}> <div style={{textAlign:"center"}}>
    <br/>
    <span style = {{fontSize: "40px"}}><b>WLM3</b></span>
    <br/><br/>
    <span style = {{fontSize: "90px"}}><b><span style={{color:"red"}}>98</span>/<span style={{color:"green"}}>150</span></b></span>
    <br/><br/><br/>
    <Button variant="contained">START NEW</Button>&nbsp;&nbsp;
    <Button variant="contained" style={{backgroundColor:"black"}}>VIEW MORE</Button>

  </div></div>
 <div style={{ gridArea: "5 / 1 / 6 / 2",boxShadow: "3px 3px 5px 6px #ccc" }}> <div style={{textAlign:"center"}}>
    <br/>
    <span style = {{fontSize: "40px"}}><b>WLM4</b></span>
    <br/><br/>
    <span style = {{fontSize: "90px"}}><b><span style={{color:"red"}}>98</span>/<span style={{color:"green"}}>150</span></b></span>
    <br/><br/><br/>
    <Button variant="contained">START NEW</Button>&nbsp;&nbsp;
    <Button variant="contained" style={{backgroundColor:"black"}}>VIEW MORE</Button>

  </div></div>
 <div style={{ gridArea: "5 / 2 / 6 / 3",boxShadow: "3px 3px 5px 6px #ccc" }}> <div style={{textAlign:"center"}}>
    <br/>
    <span style = {{fontSize: "40px"}}><b>WLM5</b></span>
    <br/><br/>
    <span style = {{fontSize: "90px"}}><b><span style={{color:"red"}}>98</span>/<span style={{color:"green"}}>150</span></b></span>
    <br/><br/><br/>
    <Button variant="contained">START NEW</Button>&nbsp;&nbsp;
    <Button variant="contained" style={{backgroundColor:"black"}}>VIEW MORE</Button>

  </div></div>
 <div style={{ gridArea: "5 / 3 / 6 / 4",boxShadow: "3px 3px 5px 6px #ccc" }}> <div style={{textAlign:"center"}}>
    <br/>
    <span style = {{fontSize: "40px"}}><b>WLM6</b></span>
    <br/><br/>
    <span style = {{fontSize: "90px"}}><b><span style={{color:"red"}}>98</span>/<span style={{color:"green"}}>150</span></b></span>
    <br/><br/><br/>
    <Button variant="contained">START NEW</Button>&nbsp;&nbsp;
    <Button variant="contained" style={{backgroundColor:"black"}}>VIEW MORE</Button>

  </div></div>
 <div style={{ gridArea: "6 / 1 / 7 / 2",boxShadow: "3px 3px 5px 6px #ccc" }}> <div style={{textAlign:"center"}}>
    <br/>
    <span style = {{fontSize: "40px"}}><b>WLM7</b></span>
    <br/><br/>
    <span style = {{fontSize: "90px"}}><b><span style={{color:"red"}}>98</span>/<span style={{color:"green"}}>150</span></b></span>
    <br/><br/><br/>
    <Button variant="contained">START NEW</Button>&nbsp;&nbsp;
    <Button variant="contained" style={{backgroundColor:"black"}}>VIEW MORE</Button>

  </div></div>
 <div style={{ gridArea: "6 / 2 / 7 / 3",boxShadow: "3px 3px 5px 6px #ccc" }}> <div style={{textAlign:"center"}}>
    <br/>
    <span style = {{fontSize: "40px"}}><b>WLM8</b></span>
    <br/><br/>
    <span style = {{fontSize: "90px"}}><b><span style={{color:"red"}}>98</span>/<span style={{color:"green"}}>150</span></b></span>
    <br/><br/><br/>
    <Button variant="contained">START NEW</Button>&nbsp;&nbsp;
    <Button variant="contained" style={{backgroundColor:"black"}}>VIEW MORE</Button>

  </div></div>
 <div style={{ gridArea: "6 / 3 / 7 / 4",boxShadow: "3px 3px 5px 6px #ccc" }}> <div style={{textAlign:"center"}}>
    <br/>
    <span style = {{fontSize: "40px"}}><b>Exi-TLM1</b></span>
    <br/><br/>
    <span style = {{fontSize: "90px"}}><b><span style={{color:"red"}}>98</span>/<span style={{color:"green"}}>150</span></b></span>
    <br/><br/><br/>
    <Button variant="contained">START NEW</Button>&nbsp;&nbsp;
    <Button variant="contained" style={{backgroundColor:"black"}}>VIEW MORE</Button>

  </div></div>
 <div style={{ gridArea: "7 / 1 / 8 / 2",boxShadow: "3px 3px 5px 6px #ccc" }}> <div style={{textAlign:"center"}}>
    <br/>
    <span style = {{fontSize: "40px"}}><b>Exi-TLM2</b></span>
    <br/><br/>
    <span style = {{fontSize: "90px"}}><b><span style={{color:"red"}}>98</span>/<span style={{color:"green"}}>150</span></b></span>
    <br/><br/><br/>
    <Button variant="contained">START NEW</Button>&nbsp;&nbsp;
    <Button variant="contained" style={{backgroundColor:"black"}}>VIEW MORE</Button>

  </div></div>
 <div style={{ gridArea: "7 / 2 / 8 / 3",boxShadow: "3px 3px 5px 6px #ccc" }}> <div style={{textAlign:"center"}}>
    <br/>
    <span style = {{fontSize: "40px"}}><b>Exi-TLM3</b></span>
    <br/><br/>
    <span style = {{fontSize: "90px"}}><b><span style={{color:"red"}}>98</span>/<span style={{color:"green"}}>150</span></b></span>
    <br/><br/><br/>
    <Button variant="contained">START NEW</Button>&nbsp;&nbsp;
    <Button variant="contained" style={{backgroundColor:"black"}}>VIEW MORE</Button>

  </div></div>
 <div style={{ gridArea: "7 / 3 / 8 / 4",boxShadow: "3px 3px 5px 6px #ccc" }}> <div style={{textAlign:"center"}}>
    <br/>
    <span style = {{fontSize: "40px"}}><b>Exi-TLM4</b></span>
    <br/><br/>
    <span style = {{fontSize: "90px"}}><b><span style={{color:"red"}}>98</span>/<span style={{color:"green"}}>150</span></b></span>
    <br/><br/><br/>
    <Button variant="contained">START NEW</Button>&nbsp;&nbsp;
    <Button variant="contained" style={{backgroundColor:"black"}}>VIEW MORE</Button>

  </div></div>

   </div>


  </div>
</div>
		    
        </div>
      </div>
		</>
	);
};

export default Homepage;
