import React, { useState } from "react";
import "./App.css";
import Weather from "./components/currentLocation";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

function SignIn({ onSignIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    if (username === "CelebalTechnologies"|| username === "celebaltechnologies" && password === "CSI2023" || password === "csi2023") {
      onSignIn();
    } else {
      alert("Invalid username or password. Try again!");
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // black color with 50% transparency
        padding: '70px',
        paddingTop :"100px", // add padding to box
        paddingBottom :"100px", // add padding to box
        borderRadius: '7px', // add border radius to box
      }}>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
          style={{
            padding: '10px', 
            borderRadius: '7px', 
          }}
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          style={{
            padding: '10px', 
            borderRadius: '7px', 
            marginBottom:"30px"
          }}
        />
        <button  style= {{backgroundColor:"black " ,paddingTop:"10px", padding:"10px", borderRadius:"8px", color:"white"}} onClick={handleSignIn}>Sign In</button>
      </div>
    </div>
  );
  
}

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleSignIn = () => {
    setIsSignedIn(true);
  };

  if (!isSignedIn) {
    return <SignIn onSignIn={handleSignIn} />
  }

  return (
    <>
      <div className="container">
        <Weather />
      </div>
      <div className="footer-info" style={{ color: "black" }}>
        <a
          style={{ padding: "30px", color: "black" }}
          href="https://www.linkedin.com/in/sakshi-vashishtha-9bb320207/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedInIcon />
        </a>
        |
        <a
          style={{ padding: "30px", color: "black" }}
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/sakshi-vashishtha-9bb320207/"
        >
          Sakshi Vashishtha
        </a>
        |
        <a
          style={{ padding: "30px", color: "black" }}
          href="https://github.com/Sakshi-1701"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIcon />
        </a>
      </div>
    </>
  );
}

export default App;
