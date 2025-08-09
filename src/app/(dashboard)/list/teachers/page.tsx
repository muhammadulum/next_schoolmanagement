import TableSearch from '@/components/TableSearch'
import React from 'react'

const TeacherListPage = () => {
    return (
        <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
            {/* top */}
            <div className=''>
                <h1>All Teacher</h1>
                <div className=''>
                    <TableSearch />
                </div>
            </div>
            {/* list */}
            <div className=''> </div>
            {/* pagination */}
            <div className="">

            </div>
        </div>

    )
}

export default TeacherListPage
