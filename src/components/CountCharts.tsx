
'use client';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts'
import Image from 'next/image';
import { count } from 'console';
const data = [
    {
        name: 'Total',
        count: 100,
        fill: 'white',
    },
    {
        name: 'Girl',
        count: 40,
        fill: '#8884d8',
    },
    {
        name: 'Boys',
        count: 60,
        fill: '#83a6ed',
    },

];


const style = {
    bottom: '0%',
    right: 0,
    transform: 'translate(0, -50%)',
    lineHeight: '24px',
};




const CountCharts = () => {
    return (
        <div className='bg-white rounded-xl w-full h-full p-4'>
            {/* title */}
            <div className='flex justify-between items-center'>
                <h1 className='text-lg font-semibold'>Students</h1>
                <Image src="/moreDark.png" alt="" width={20} height={20} className='' />
            </div>
            {/* chart */}
            <div className='relative w-full h-[75%]'>
                <ResponsiveContainer>
                    <RadialBarChart cx="50%" cy="50%" innerRadius="40%" outerRadius="100%" barSize={32} data={data}>
                        <RadialBar

                            // label={{ position: 'insideStart', fill: '#fff' }}
                            background
                            dataKey="count"
                        />
                        {/* <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} /> */}

                    </RadialBarChart>
                </ResponsiveContainer>
                <Image src="/malefemale.png" alt='' width={50} height={50} className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />

            </div>
            {/* bottom */}
            <div className='flex justify-center gap-16 mt-4'>
                <div className='flex flex-col gap-1'>
                    <div className='w-5 h-5 bg-lamaSky rounded-full' />
                    <h1 className='font-bold'>1.234</h1>
                    <h2 className='text-xs text-gray-300'>Boys (55%)</h2>
                </div>
                <div className='flex flex-col gap-1'>
                    <div className='w-5 h-5 bg-lamaYellow rounded-full'></div>
                    <h1 className='font-bold'>1.234</h1>
                    <h2 className='text-xs text-gray-300'>Girl (55%)</h2>

                </div>
            </div>

        </div>
    )
}

export default CountCharts
