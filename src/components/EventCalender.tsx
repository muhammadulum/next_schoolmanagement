'use client'

import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import Image from "next/image";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];


const events = [
    {
        id: 1,
        title: "lorem ipsum dolor",
        time: "12:00 PM - 2:00 PM",
        descriptopm: "Lorem ipsum dolor sit amet, consctetur adipicing elit"
    },
    {
        id: 1,
        title: "lorem ipsum dolor",
        time: "12:00 PM - 2:00 PM",
        descriptopm: "Lorem ipsum dolor sit amet, consctetur adipicing elit"
    }, {
        id: 1,
        title: "lorem ipsum dolor",
        time: "12:00 PM - 2:00 PM",
        descriptopm: "Lorem ipsum dolor sit amet, consctetur adipicing elit"
    },
    {
        id: 1,
        title: "lorem ipsum dolor",
        time: "12:00 PM - 2:00 PM",
        descriptopm: "Lorem ipsum dolor sit amet, consctetur adipicing elit"
    }
]

const EventCalender = () => {
    const [value, onChange] = useState<Value>(new Date());

    return (
        <div className="bg-white p-4 rounded-md">
            <Calendar onChange={onChange} value={value} />

            <div className='flex justify-between items-center'>
                <h1 className='text-lg font-semibold my-4'>Attendance</h1>
                <Image src="/moreDark.png" alt="" width={20} height={20} className='' />

            </div>

            <div className="flex flex-col gap-4">
                {events.map(event => {
                    return (
                        <div className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-lamaSky even:border-t-lamaPurple" key={event.id}>
                            <div className="flex items-center justify-between">
                                <h1>{event.title}</h1>
                                <span>{event.time}</span>
                                <p>{event.descriptopm}</p>
                            </div>
                        </div>)
                })}
            </div>
        </div>
    )
}

export default EventCalender
