import { Link } from "react-router-dom";

function Home() {

  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white p-10 rounded-2xl shadow-lg text-center w-[400px]">

        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Campus Connect
        </h1>

        <p className="text-gray-600 mb-8">
          Smart Faculty Availability System
        </p>

        <div className="space-y-4">

          <Link to="/faculty">

            <button className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700">
              Faculty Dashboard
            </button>

          </Link>


          <Link to="/student">

            <button className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700">
              Student Dashboard
            </button>

          </Link>

        </div>

      </div>

    </div>
  );
}

export default Home;