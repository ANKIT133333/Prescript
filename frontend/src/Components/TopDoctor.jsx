import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

const TopDoctor = () => {

    const navigate = useNavigate();
    const { doctors } = useContext(AppContext);

    return (
        <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
            <h1 className="text-3xl font-medium ">
                Top Doctors
            </h1>
            <div className="w-20 h-1 bg-blue-600 rounded-full "></div>

            <p className="sm:w-1/3 text-center text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>

            {/* Grid Container */}
            <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 pt-5 px-3 sm:px-0">
                {doctors.slice(0, 10).map((item, index) => (
                    <div onClick={()=>{ navigate(`/appointment/${item._id}`); scrollTo(0, 0)}}
                        key={index}
                        className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500"
                    >
                        <img
                            className="bg-blue-50 w-full"
                            src={item.image}
                            alt={item.name}
                        />

                        <div className="p-4">
                            <div className="flex items-center gap-2 text-sm text-green-500">
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                <p>Available</p>
                            </div>

                            <p className="text-gray-900 text-lg font-medium mt-2">{item.name}</p>
                            <p className="text-gray-600 text-sm">{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>

            <button onClick={() => navigate('/doctors') || scrollTo(0, 0)} className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition">
                More
            </button>
        </div>
    );
};

export default TopDoctor;