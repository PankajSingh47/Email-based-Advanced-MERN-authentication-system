import { useState, useEffect } from "react";
import axios from "axios";
import "./PrivateScreen.css"

const PrivateScreen = ({ history }) => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");

  useEffect(() => {
    const fetchPrivateData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get("/api/private", config);
        setPrivateData(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized. Please login.");
      }
    };
    fetchPrivateData();
  }, [history]);

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    history.push("/login");
  };

  return (
    <div className="private-screen">
      {error ? (
        <span className="error-message">{error}</span>
      ) : (
        <>
          <div className="private-data">{privateData}</div>
          <button onClick={logoutHandler}>Logout</button>
        </>
      )}
    </div>
  );
};

export default PrivateScreen;
