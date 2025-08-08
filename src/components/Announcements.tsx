'use client'


const events = [
    {
        id: 1,
        title: "lorem ipsum dolor",
        time: "2025-08-09",
        desctiption: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem, dignissimos sapiente totam, saepe, repellat neque laboriosam quibusdam facilis sint ex dolorem dolore. Tempore excepturi soluta eaque iure molestiae voluptates praesentium."
    },
    {
        id: 2,
        title: "lorem ipsum dolor",
        time: "2025-08-09",
        desctiption: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem, dignissimos sapiente totam, saepe, repellat neque laboriosam quibusdam facilis sint ex dolorem dolore. Tempore excepturi soluta eaque iure molestiae voluptates praesentium."
    }, {
        id: 3,
        title: "lorem ipsum dolor",
        time: "2025-08-09",
        desctiption: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem, dignissimos sapiente totam, saepe, repellat neque laboriosam quibusdam facilis sint ex dolorem dolore. Tempore excepturi soluta eaque iure molestiae voluptates praesentium."
    },
    {
        id: 4,
        title: "lorem ipsum dolor",
        time: "2025-08-09",
        desctiption: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem, dignissimos sapiente totam, saepe, repellat neque laboriosam quibusdam facilis sint ex dolorem dolore. Tempore excepturi soluta eaque iure molestiae voluptates praesentium."
    }
]

const Announcements = () => {
    return (
        <div className="bg-white p-4 rounded-md">
            <div className='flex justify-between items-center'>
                <h1 className='text-lg font-semibold my-4'>Announcements</h1>
                <span className='text-xs text-gray-400'>View All</span>
            </div>
            <div className='flex flex-col gap-4 mt-4'>
                {events.map(event => {
                    return (
                        <div className='bg-lamaSky rounded-md p-4' key={event.id}>
                            <div className='flex items-center justify-between'>
                                <h2 className='font-medium'>{event.title}</h2>
                                <span className='text-xs text-gray-400 bg-white rounded-md px-1 py-1'>{event.time}</span>
                            </div>
                            <p className='text-sm text-gray-400 mt-1'>{event.desctiption}</p>
                        </div>)
                })}
            </div>


        </div>
    )
}

export default Announcements
