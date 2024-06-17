import React, { useState, useRef } from 'react';

const AppointmentSelectTimeSlot = ({ onNext }) => {
    const sliderRef = useRef(null);

    const scrollLeft = () => {
        sliderRef.current.scrollBy({ left: -250, behavior: 'smooth' });
    };

    const scrollRight = () => {
        sliderRef.current.scrollBy({ left: 250, behavior: 'smooth' });
    };
    const [selectedDate, setSelectedDate] = useState('Mon, 10 Oct');
    const [selectedTime, setSelectedTime] = useState(null);

    const dates = [
        { date: 'Mon, 10 Oct', slots: 10 },
        { date: 'Tue, 11 Oct', slots: 2 },
        { date: 'Wed, 12 Oct', slots: 0 },
        { date: 'Tue, 19 Oct', slots: 2 },
        { date: 'Mon, 15 Oct', slots: 10 },
    ];

    const times = [
        '09:00 AM', '09:30 AM', '10:00 AM', '10:15 AM', '10:30 AM', '10:45 AM', '11:00 AM',
        '04:00 PM', '04:15 PM', '04:30 PM', '04:45 PM', '05:00 PM', '05:15 PM',
    ];

    const availableTimes = selectedDate === 'Mon, 10 Oct' ? times : selectedDate === 'Tue, 11 Oct' ? times.slice(0, 2) : [];

   
    const handleSubmit = (e) => {
        e.preventDefault();
        onNext([selectedDate, selectedTime]);
    };
    return (
        <div className="p-4 w-[100%] mx-auto bg-white rounded-xl shadow-md space-y-4">

            <h2 className="text-xl font-semibold text-center my-5">Pick a time slot</h2>

            <div className="relative flex justify-center items-center border border-gray-200 p-4 rounded-lg my-4    ">
                <button
                    onClick={scrollLeft}
                    className="absolute left-2 z-10 border border-gray-400 rounded-full p-1"
                    aria-label="Scroll left"
                >
                    <span><img src="/arrowLeft.svg" alt="" className='w-[20px] h-[20px] rotate-90' /></span>
                </button>

                <div className="flex space-x-2 overflow-x-hidden scrollbar-hide   w-[85%]" ref={sliderRef}>
                    {dates.map((date, index) => (
                        <button
                            key={index}
                            className={`px-4 py-2 rounded min-w-[150px] ${selectedDate === date.date ? 'border border-[--primary] text-[--primary]' : 'bg-gray-100 text-gray-600'} ${date.slots === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={() => date.slots > 0 && setSelectedDate(date.date)}
                        >
                            {date.date}
                            <span className="block text-sm">{date.slots} slots available</span>
                        </button>
                    ))}
                </div>
                <button
                    onClick={scrollRight}
                    className="absolute right-2 z-10 border border-gray-400 rounded-full p-1 "
                    aria-label="Scroll right"
                >
                    <span><img src="/arrowLeft.svg" alt="" className='w-[20px] h-[20px] rotate-[-90deg]' /></span>

                </button>
            </div>
            <div className="space-y-2">
                <h3 className="text-lg">Morning</h3>

                <div className="flex justify-start items-center flex-wrap ">
                    {availableTimes.slice(0, 7).map((time, index) => (
                        <button
                            key={index}
                            className={`px-2 py-4 rounded-2xl m-[8px]  ${selectedTime === time ? 'bg-[--primary] text-white' : 'border border-gray-200 text-gray-600'}`}
                            onClick={() => setSelectedTime(time)}
                        >
                            {time}
                        </button>
                    ))}
                </div>
            </div>
            <div className="space-y-2">
                <h3 className="text-lg">Evening</h3>
                <div className="flex justify-start items-center flex-wrap">
                    {availableTimes.slice(7).map((time, index) => (
                        <button
                            key={index}
                            className={`px-2 py-4 rounded-2xl m-[8px]  ${selectedTime === time ? 'bg-[--primary] text-white' : 'border border-gray-200 text-gray-600'}`}
                            onClick={() => setSelectedTime(time)}
                        >
                            {time}
                        </button>
                    ))}
                </div>
            </div>
            <button
                className="w-full bg-[--primary] text-white py-2 rounded font-bold"
                onClick={handleSubmit}
            >
                Proceed To Payment
            </button>
        </div>
    );
};

export default AppointmentSelectTimeSlot;
