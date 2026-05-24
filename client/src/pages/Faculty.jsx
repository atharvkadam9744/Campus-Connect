import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function Faculty() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);

  const [userId, setUserId] = useState("");

  const [currentStatus, setCurrentStatus] = useState("offline");



  // CHECK SAVED LOGIN
  useEffect(() => {

    const savedToken = localStorage.getItem("token");

    const savedUserId = localStorage.getItem("userId");

    const savedStatus = localStorage.getItem("status");

    if (savedToken && savedUserId) {

      setLoggedIn(true);

      setUserId(savedUserId);

      setCurrentStatus(savedStatus || "offline");
    }

  }, []);




  // LOGIN
  const handleLogin = async () => {

    try {

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      alert("Login Successful");


      // SAVE LOGIN DATA
      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "userId",
        response.data.user._id
      );

      localStorage.setItem(
        "status",
        response.data.user.status
      );


      setLoggedIn(true);

      setUserId(response.data.user._id);

      setCurrentStatus(response.data.user.status);

    } catch (error) {

      console.log(error);

      alert("Login Failed");
    }
  };



  // UPDATE STATUS
  const updateStatus = async (status) => {

    try {

      await axios.put(
        "http://localhost:5000/api/status/update",
        {
          userId,
          status,
        }
      );

      setCurrentStatus(status);

      localStorage.setItem("status", status);

    } catch (error) {

      console.log(error);

      alert("Status update failed");
    }
  };



  // LOGOUT
  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("userId");

    localStorage.removeItem("status");

    setLoggedIn(false);

    setEmail("");

    setPassword("");

  };




  // SOCKET LISTENER
  useEffect(() => {

    socket.on("statusUpdated", (updatedUser) => {

      if (updatedUser._id === userId) {

        setCurrentStatus(updatedUser.status);
      }
    });

    return () => {
      socket.off("statusUpdated");
    };

  }, [userId]);




  // LOGIN PAGE
  if (!loggedIn) {

    return (

      <div className="min-h-screen bg-gray-100 flex items-center justify-center">

        <div className="bg-white p-10 rounded-2xl shadow-2xl w-[400px]">

          <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
            Faculty Login
          </h1>

          <div className="space-y-4">

            <input
              type="email"
              placeholder="Enter Email"
              className="w-full border p-3 rounded-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Enter Password"
              className="w-full border p-3 rounded-xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
            >
              Login
            </button>

          </div>

        </div>

      </div>
    );
  }



  // DASHBOARD
  return (

    <div className="min-h-screen bg-gray-100">

      {/* NAVBAR */}
      <div className="bg-green-600 text-white px-10 py-4 flex justify-between items-center shadow-lg">

        <h1 className="text-2xl font-bold">
          Campus Connect
        </h1>

        <button
          onClick={handleLogout}
          className="bg-white text-green-600 px-5 py-2 rounded-xl font-semibold hover:bg-gray-100"
        >
          Logout
        </button>

      </div>



      <div className="flex items-center justify-center py-16">

        <div className="bg-white p-10 rounded-2xl shadow-2xl w-[450px]">

          <h1 className="text-3xl font-bold text-center text-green-600 mb-6">
            Faculty Dashboard
          </h1>

          <p className="text-center text-gray-600 mb-6">
            Current Status
          </p>


          <div className="text-center mb-8">

            <span className="text-3xl font-bold">

              {currentStatus === "available" &&
                "🟢 Available"}

              {currentStatus === "busy" &&
                "🟡 Busy"}

              {currentStatus === "offline" &&
                "🔴 Offline"}

            </span>

          </div>


          <div className="space-y-4">

            <button
              onClick={() => updateStatus("available")}
              className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition"
            >
              Available
            </button>

            <button
              onClick={() => updateStatus("busy")}
              className="w-full bg-yellow-500 text-white py-3 rounded-xl hover:bg-yellow-600 transition"
            >
              Busy
            </button>

            <button
              onClick={() => updateStatus("offline")}
              className="w-full bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 transition"
            >
              Offline
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Faculty;