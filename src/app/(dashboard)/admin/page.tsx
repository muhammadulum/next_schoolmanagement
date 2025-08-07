import AttendanceChart from "@/components/AttendanceChart"
import CountCharts from "@/components/CountCharts"
import EventCalender from "@/components/EventCalender"
import FinanceChart from "@/components/FinanceChart"
import UserCard from "@/components/UserCard"

const Adminpage = () => {
    return (
        <div className='p-4 flex gap-4 flex-col md:flex-row'>
            {/* left */}
            <div className="w-full lg:w-2/3 flex flex-col gap-8">
                {/* user card */}
                <div className="flex gap-4 justify-between flex-wrap">

                    <UserCard type="Student" />
                    <UserCard type="Teacher" />
                    <UserCard type="Parent" />
                    <UserCard type="Staff" />
                </div>
                {/* middle chart */}
                <div className="flex gap-4 flex-col lg:flex-row">
                    {/* count charts */}
                    <div className="w-full lg:w-1/3 h-[450px]">
                        <CountCharts />
                    </div>
                    {/* attendance charts */}
                    <div className="w-full lg:w-2/3 h-[450px]">
                        <AttendanceChart />
                    </div>
                </div>
                {/* bottom charts */}
                <div className="w-full h-[500px]">
                    <FinanceChart />
                </div>
            </div>
            {/* right */}
            <div className="w-full lg:w-1/3 flex-col gap-8">
                <EventCalender />
            </div>

        </div>
    )
}

export default Adminpage
