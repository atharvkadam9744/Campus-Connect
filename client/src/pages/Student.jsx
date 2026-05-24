import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function Student() {

  const [facultyList, setFacultyList] = useState([]);

  const [search, setSearch] = useState("");

  const [department, setDepartment] = useState("All");


  // FETCH FACULTY
  const fetchFaculty = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/users/faculty"
      );

      setFacultyList(response.data);

    } catch (error) {

      console.log(error);
    }
  };


  // INITIAL LOAD
  useEffect(() => {

    fetchFaculty();

  }, []);


  // SOCKET REALTIME UPDATE
  useEffect(() => {

    socket.on("statusUpdated", (updatedUser) => {

      setFacultyList((prevFaculty) =>
        prevFaculty.map((faculty) =>
          faculty._id === updatedUser._id
            ? updatedUser
            : faculty
        )
      );
    });

    return () => {
      socket.off("statusUpdated");
    };

  }, []);



  // SEARCH + DEPARTMENT FILTER
  const filteredFaculty = facultyList.filter((faculty) => {

    const matchesSearch =
      faculty.name.toLowerCase().includes(search.toLowerCase());

    const matchesDepartment =
      department === "All" ||
      faculty.department === department;

    return matchesSearch && matchesDepartment;
  });



  return (

    <div className="min-h-screen bg-gray-100">

      {/* NAVBAR */}
      <div className="bg-blue-600 text-white px-10 py-4 flex justify-between items-center shadow-lg">

        <h1 className="text-2xl font-bold">
          Campus Connect
        </h1>

        <p className="font-medium">
          Student Dashboard
        </p>

      </div>


      <div className="p-10">

        <h1 className="text-4xl font-bold text-center text-blue-600 mb-10">
          Student Dashboard
        </h1>


        {/* SEARCH BAR */}
        <div className="flex justify-center mb-6">

          <input
            type="text"
            placeholder="Search Faculty..."
            className="w-[400px] p-3 rounded-xl border shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>


        {/* DEPARTMENT FILTER */}
        <div className="flex justify-center mb-10">

          <select
            className="w-[400px] p-3 rounded-xl border shadow-sm"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >

            <option>All</option>

            <option>Computer Engineering</option>

            <option>IT</option>

            <option>Mechanical</option>

            <option>Civil</option>

            <option>ENTC</option>

            <option>Library</option>

            <option>Admin Office</option>

          </select>

        </div>


        {/* FACULTY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {filteredFaculty.map((faculty) => (

            <div
              key={faculty._id}
              className={`bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition border-l-8

              ${faculty.status === "available"
                ? "border-green-500"
                : faculty.status === "busy"
                ? "border-yellow-500"
                : "border-red-500"
              }
              `}
            >

              {/* PROFILE SECTION */}
              <div className="flex items-center gap-4 mb-4">

                <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">

                  {faculty.name.charAt(0).toUpperCase()}

                </div>


                <div>

                  <h2 className="text-2xl font-bold">
                    {faculty.name}
                  </h2>

                  <p className="text-sm text-gray-500">
                    Faculty Member
                  </p>

                </div>

              </div>


              {/* FACULTY DETAILS */}
              <div className="text-gray-600 mb-4 space-y-1">

                <p>
                  {faculty.email}
                </p>

                <p>
                  Department: {faculty.department}
                </p>

                <p>
                  Room: {faculty.room}
                </p>

                <p>
                  Block: {faculty.block}
                </p>

              </div>


              {/* STATUS */}
              <div className="text-xl font-bold">

                {faculty.status === "available" &&
                  "🟢 Available"}

                {faculty.status === "busy" &&
                  "🟡 Busy"}

                {faculty.status === "offline" &&
                  "🔴 Offline"}

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Student;