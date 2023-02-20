import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import { AuthContext } from "./Auth/auth-context";
import NavBar from "./components/Navbar";
import ReviewCard from "./components/ReviewCard";
import "react-datepicker/dist/react-datepicker.css";
import "./supportpage.css";



const SupportPage = () => {
 

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

 axios.post(process.env.REACT_APP_BACKEND_URL+'send_mail',{
     name:name,
     email:email,
    subject:subject,
    description:description
 })
   
    alert(`Mail was sent`)
    setName("");
    setEmail("");
    setSubject("");
    setDescription("");
  }

  return (
    <div>
      <NavBar />
      <form onSubmit={handleSubmit}>
      <label>Enter your name:
        <input 
        className="imput"
          type="text" 
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>Enter your Email:
        <input 
        className="imput"
          type="email" 
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>Enter Subject:
        <input 
        className="imput"
          type="text" 
          required
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </label>
      <label>Enter Description:
        <textarea
        value={description}
        className="imput"
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <input type="submit" className="submitButton" />
    </form>
    </div>
  );
};

export default SupportPage;

