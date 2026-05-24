import { useState } from "react";
import axios from "axios";

function Signup() {

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [department, setDepartment] = useState("");

  const [room, setRoom] = useState("");

  const [block, setBlock] = useState("");



  const handleSignup = async () => {

    try {

      await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
          role: "faculty",
          department,
          room,
          block,
        }
      );

      alert("Faculty Registered Successfully");

    } catch (error) {

      console.log(error);

      alert("Signup Failed");
    }
  };



  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white p-10 rounded-2xl shadow-lg w-[450px]">

        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Faculty Signup
        </h1>


        <div className="space-y-4">

          <input
            type="text"
            placeholder="Enter Name"
            className="w-full border p-3 rounded-xl"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />


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


          <input
            type="text"
            placeholder="Department"
            className="w-full border p-3 rounded-xl"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />


          <input
            type="text"
            placeholder="Room Number"
            className="w-full border p-3 rounded-xl"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />


          <input
            type="text"
            placeholder="Block Name"
            className="w-full border p-3 rounded-xl"
            value={block}
            onChange={(e) => setBlock(e.target.value)}
          />


          <button
            onClick={handleSignup}
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
          >
            Signup
          </button>

        </div>

      </div>

    </div>
  );
}

export default Signup;