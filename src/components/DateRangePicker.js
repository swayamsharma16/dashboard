import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MAX_GUESTS = 8;
const EXTRA_GUEST_COST = 1000;
const BASE_COST_PER_NIGHT = 45000;

const DateRangePicker = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [adults, setAdults] = useState(6);
  const [children, setChildren] = useState(2);
  const [pets, setPets] = useState(2);
  const [totalCost, setTotalCost] = useState(0);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGuestPicker, setShowGuestPicker] = useState(false);

  useEffect(() => {
    if (startDate && endDate) {
      const days = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1;
      const extraGuests = Math.max(0, adults + children - MAX_GUESTS);
      const extraCost = extraGuests * EXTRA_GUEST_COST * days;
      const baseCost = BASE_COST_PER_NIGHT * days;
      setTotalCost(baseCost + extraCost);
    }
  }, [startDate, endDate, adults, children]);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden w-[100%] h-fit flex justify-center align-middle">
      <div className="flex flex-col items-center">
        <div className="mt-4 text-center">
          <p className=" text-2xl font-bold mb-4  ">
            ₹{BASE_COST_PER_NIGHT.toLocaleString()} per night
          </p>
          {adults + children > MAX_GUESTS && (
            <p className="text-red-600 mb-2 ">
              Note: max 8 guest Extra guests will cost ₹{EXTRA_GUEST_COST} per
              head per day.
            </p>
          )}
          {startDate && endDate && <></>}
        </div>
        <div className="relative w-full mb-6 ">
          <input
            type="text"
            placeholder="Select Start and End Date "
            value={
              startDate && endDate
                ? `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
                : ""
            }
            readOnly
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="border rounded p-3 w-full "
          />
          {showDatePicker && (
            <div className=" z-10 mt-2 w-full bg-white p-4 border rounded shadow-md fixed">
              <DatePicker
                selected={startDate}
                onChange={handleDateChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
                minDate={new Date()}
                monthsShown={2}
                dayClassName={(date) =>
                  date < new Date()
                    ? "text-gray-400 cursor-not-allowed"
                    : undefined
                }
                className="bg-white "
              />
            </div>
          )}
        </div>

        <div className="relative w-full mb-6 ">
          <input
            type="text"
            placeholder="Select Guests"
            value={`Adults: ${adults}, Children: ${children}, Pets: ${pets}`}
            readOnly
            onClick={() => setShowGuestPicker(!showGuestPicker)}
            className="border rounded p-3 w-full"
          />
          {showGuestPicker && (
            <div className="fixed z-10 mt-2 w-48 bg-white border rounded shadow-md p-4 ">
              <div className="mb-4">
                <label className="block text-gray-700">Adults:</label>
                <input
                  type="number"
                  value={adults}
                  onChange={(e) => setAdults(Number(e.target.value))}
                  min="0"
                  className="border rounded p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Children:</label>
                <input
                  type="number"
                  value={children}
                  onChange={(e) => setChildren(Number(e.target.value))}
                  min="0"
                  className="border rounded p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Pets:</label>
                <input
                  type="number"
                  value={pets}
                  onChange={(e) => setPets(Number(e.target.value))}
                  min="0"
                  className="border rounded p-2 w-full"
                />
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 text-center">
          <p>Total Cost: ₹{totalCost.toLocaleString()}</p>
        </div>
        <div>
          <p>
            Extra Guest Cost: ₹
            {(
              Math.max(0, adults + children - MAX_GUESTS) *
              EXTRA_GUEST_COST *
              ((endDate - startDate) / (1000 * 60 * 60 * 24) + 1)
            ).toLocaleString()}
          </p>
        </div>
        <button className="mt-4 px-6 py-2 bg-pink-500 text-white rounded">
          Reserve Now
        </button>
      </div>
    </div>
  );
};

export default DateRangePicker;
