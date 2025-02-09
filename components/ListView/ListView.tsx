import React, { useEffect, useLayoutEffect, useState } from "react";
import data from "@/components/DRData/data.json";
import ScheduledSession from "../DRData/ScheduleSession";
import SearchBar from "../SearchBar";
import { FilterIcon } from "../Icons";
import { BsViewList } from "react-icons/bs";
import { CiGrid41 } from "react-icons/ci";
import { MdKeyboardArrowDown } from "react-icons/md";
import patientData from "../PatientList/data.json"

const ListView = ({ setPatientData }) => {
  const [session, setSession] = useState<boolean>(false);
  const [doctorData, setDoctorData] = useState({});
  const [grid, setGrid] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth <= 768);
      
      const handleResize = () => setIsMobile(window.innerWidth <= 768);
      
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  useEffect(() => {
    if (!isMobile) {
      setGrid(false);
    }
  }, [isMobile]);

  const filteredData = data.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div
        className="p-4 bg-gradient-to-b from-purple-200 to-pink-200 h-screen gap-4 flex flex-col"
        style={{ height: "calc(100vh - 80px)" }}
      >
        <div className="flex items-center gap-1 md:gap-3 ml-auto">
          {
            <div className="flex items-center justify-end gap-2">
              <div className="w-full">
                <SearchBar
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-72"
                />
              </div>
              {isMobile && (
                <>
                  {!grid && (
                    <div className="flex justify-center items-center w-9 h-9 p-2 rounded-md bg-[#F7F7FE] hover:bg-blue-o-10 border border-blue-o-10 cursor-pointer transition-all duration-300">
                      <BsViewList size={24} onClick={() => setGrid(true)} />
                    </div>
                  )}
                  {grid && (
                    <div className="flex justify-center items-center w-9 h-9 p-2 rounded-md bg-[#F7F7FE] hover:bg-blue-o-10 border border-blue-o-10 cursor-pointer transition-all duration-300">
                      <CiGrid41 size={24} onClick={() => setGrid(false)} />
                    </div>
                  )}
                </>
              )}

              <div className="flex justify-center items-center w-9 h-9 p-2 rounded-md bg-[#F7F7FE] hover:bg-blue-o-10 border border-blue-o-10 cursor-pointer transition-all duration-300">
                <FilterIcon />
              </div>
            </div>
          }
        </div>
        {!grid && (
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 items-center">
              {filteredData.map((event, index) => (
                <div
                  key={index}
                  className="bg-white w-full max-w-sm mx-auto rounded-xl shadow-md overflow-hidden flex flex-col h-full"
                >
                  <div className="w-full h-46 p-2 overflow-hidden">
                    <img
                      src={event?.media?.url}
                      alt={event.title}
                      className="w-full h-full rounded-xl object-cover"
                    />
                  </div>

                  <div className="p-2 flex flex-col items-center justify-center pt-0 flex-grow">
                    <h1 className="text-base font-bold mb-1">{event.title}</h1>

                    <div className="text-gray-700 gap-2">
                      <div className="flex items-center text-sm justify-center">
                        {event.expertise}
                      </div>
                      <div className="flex text-sm gap-1">
                        <span className="font-normal">Session Fee:</span>{" "}
                        <p className="text-gray-800 font-medium">
                          {" "}
                          {` ${event.sessionFee}/-`}
                        </p>
                      </div>
                    </div>

                    <button
                      className="w-full mt-2 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg"
                      onClick={() => {
                        setSession(true);
                        setDoctorData(event);
                      }}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {grid && isMobile && (
          <div className="flex-1 overflow-y-auto">
            <div className="flex flex-col gap-4 items-center">
              {filteredData.map((event, index) => (
                <div
                  key={index}
                  className="bg-white w-full max-w-sm mx-auto rounded-xl shadow-md overflow-hidden flex flex-col h-full"
                >
                  <div className="flex items-center p-2">
                    {" "}
                    <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden mr-3">
                      {" "}
                      <img
                        src={event?.media?.url}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col flex-grow">
                      {" "}
                      <h1 className="text-base font-bold mb-1">
                        {event.title}
                      </h1>
                      <p className="text-sm text-gray-700">
                        {event.mobileNumber}
                      </p>{" "}
                      {expandedIndex !== index && (
                        <p className="text-sm text-gray-900">
                          {event.expertise}
                        </p>
                      )}
                    </div>
                    <MdKeyboardArrowDown
                      size={24}
                      className="text-gray-500"
                      onClick={() => toggleExpand(index)}
                    />{" "}
                  </div>
                  {expandedIndex === index && (
                    <div className="p-2 ">
                      <div className=" border-t py-6 border-gray-300">
                        <div className="flex justify-between mb-3">
                          <div className="flex flex-col">
                            <p className="text-base font-semibold mb-1">
                              Expertise
                            </p>
                            <p className="text-gray-700"> {event.expertise}</p>
                          </div>
                          <div className="flex flex-col">
                            <p className="text-base font-semibold mb-1">
                              Gender
                            </p>
                            <p className="text-gray-900 text-right">
                              {" "}
                              {event.gender}
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <div className="flex flex-col">
                            <p className="text-base font-semibold mb-1">
                              Session mode
                            </p>
                            <p className="text-gray-700 ">
                              {" "}
                              {event.sessionMode}
                            </p>
                          </div>
                          <div className="flex flex-col">
                            <p className="text-base font-semibold mb-1">
                              Session Fee
                            </p>
                            <p className="text-gray-700 text-right">
                              {" "}
                              {event.sessionFee}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="border-t py-2 border-gray-300">
                        <button
                          className="w-full mt-2 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg"
                          onClick={() => {
                            setSession(true);
                            setDoctorData(event);
                          }}
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {session && (
        <ScheduledSession
          hideModal={() => setSession(false)}
          doctorData={doctorData}
          patientData={patientData}
          setPatientData={setPatientData}
        />
      )}
    </>
  );
};

export default ListView;
