import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

const Doctor = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();

  const { doctors } = useContext(AppContext);
  const [filterDoc, setFilterDoc] = useState([]);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(
        doctors.filter((item) => item.speciality === speciality)
      );
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    if (doctors.length > 0) {
      applyFilter();
    }
  }, [speciality, doctors]);

  return (
    <div>
      <p className="text-gray-600 ">Browse through the doctors specialist.</p>

      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        {/* Left Side */}
        <div className="flex flex-col gap-3 text-sm text-gray-600">
          <p onClick={() => speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all duration-500 cursor-pointer hover:bg-gray-200 ${speciality === '' ? 'bg-indigo-100 text-black' : ''}`}>General physician</p>
          <p onClick={() => speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all duration-500 cursor-pointer hover:bg-gray-200  ${speciality === '' ? 'bg-indigo-100 text-black' : ''}`}>Gynecologist</p>
          <p onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all duration-500 cursor-pointer hover:bg-gray-200  ${speciality === '' ? 'bg-indigo-100 text-black' : ''}`} >Dermatologist</p>
          <p onClick={() => speciality === 'Pediatrician' ? navigate('/doctors') : navigate('/doctors/Pediatrician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all duration-500 cursor-pointer hover:bg-gray-200  ${speciality === '' ? 'bg-indigo-100 text-black' : ''}`}>Pediatricians</p>
          <p onClick={() => speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all duration-500 cursor-pointer hover:bg-gray-200  ${speciality === '' ? 'bg-indigo-100 text-black' : ''}`}>Neurologist</p>
          <p onClick={() => speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all duration-500 cursor-pointer hover:bg-gray-200  ${speciality === '' ? 'bg-indigo-100 text-black' : ''}`}>Gastroenterologist</p>
        </div>

        {/* Doctors List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 gap-y-6 w-full">
          {filterDoc.map((item) => (
            <div
              key={item._id}
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="flex flex-col h-full border border-blue-200 rounded-lg overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500"
            >
              <img
                className="w-full h-80 object-cover object-center bg-blue-50"
                src={item.image}
                alt={item.name}
              />

              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-sm text-green-500">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <p>Available</p>
                </div>

                <p className="text-gray-900 text-lg font-medium mt-2">
                  {item.name}
                </p>
                <p className="text-gray-600 text-sm">
                  {item.speciality}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctor;