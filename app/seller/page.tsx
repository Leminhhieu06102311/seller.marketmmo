"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchUser, setLoggedIn } from "@/redux/userSlice";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { DashBoard } from "@/interfaces/DashBoard";
import { IoFilterOutline } from "react-icons/io5";
import {
    ComposedChart,
    Line,
    Area,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    LineChart,
} from "recharts";
import { getDashBoardSeller } from "@/services/dashboard";
export default function Admin({ }) {
    const token = Cookies.get("token");
    const [dashboard, setDashboard] = useState<DashBoard>();
    const [loadingPage, setLoadingPage] = useState(true);
    const [selectedType, setSelectedType] = useState("Ngày");

    useEffect(() => {
        import("preline");
    }, []);
    const data = [
        {
            name: "Page A",
            uv: 590,
            pv: 800,
            amt: 1400,
        },
        {
            name: "Page B",
            uv: 868,
            pv: 967,
            amt: 1506,
        },
        {
            name: "Page C",
            uv: 1397,
            pv: 1098,
            amt: 989,
        },
        {
            name: "Page D",
            uv: 1480,
            pv: 1200,
            amt: 1228,
        },
        {
            name: "Page E",
            uv: 1520,
            pv: 1108,
            amt: 1100,
        },
        {
            name: "Page F",
            uv: 1400,
            pv: 680,
            amt: 1700,
        },
    ];
    const data2 = [
        {
            subject: "Math",
            A: 120,
            B: 110,
            fullMark: 150,
        },
        {
            subject: "Chinese",
            A: 98,
            B: 130,
            fullMark: 150,
        },
        {
            subject: "English",
            A: 86,
            B: 130,
            fullMark: 150,
        },
        {
            subject: "Geography",
            A: 99,
            B: 100,
            fullMark: 150,
        },
        {
            subject: "Physics",
            A: 85,
            B: 90,
            fullMark: 150,
        },
        {
            subject: "History",
            A: 65,
            B: 85,
            fullMark: 150,
        },
    ];
    const today = new Date();
    const startDateDasy = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 1
    );
    const startDateMonth = new Date(
        today.getFullYear(),
        today.getMonth() - 1,
        today.getDate()
    );
    const startDateYear = new Date(
        today.getFullYear() - 1,
        today.getMonth(),
        today.getDate()
    );
    const formattedEndDate = formatDate(today);
    const encodedEndDate = encodeURIComponent(formattedEndDate);

    const formattedStartDate = formatDate(startDateDasy);
    const encodedStartDate = encodeURIComponent(formattedStartDate);

    const formattedStartMonth = formatDate(startDateMonth);
    const encodedStartMonth = encodeURIComponent(formattedStartMonth);

    const formattedStartYear = formatDate(startDateYear);
    const encodedStartYear = encodeURIComponent(formattedStartYear);

    function formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    const handleItemClick = (type: string) => {
        setSelectedType(type);
        setLoadingPage(false);
    };
    useEffect(() => {
        const DashBoard = async () => {
            let startDate, endDate;

            if (selectedType === "Ngày") {
                startDate = encodedStartDate;
                endDate = encodedEndDate;
            } else if (selectedType === "Tháng") {
                startDate = encodedStartMonth;
                endDate = encodedEndDate;
            } else {
                startDate = formattedStartYear;
                endDate = encodedEndDate;
            }
            console.log(token);
            console.log(startDate);
            console.log(endDate);

            const res = await getDashBoardSeller(token, startDate, endDate);
            console.log(res);

            setDashboard(res);
            setLoadingPage(false);
        };

        DashBoard();
    }, [
        selectedType,
        encodedStartDate,
        encodedEndDate,
        encodedStartMonth,
        encodedStartYear,
    ]);
    return (
        <>
            {true && (
                <div className="p-6 max-w-[1536px] w-full m-auto">
                    <div className="flex justify-between items-center">
                        <div className="items-center">
                            <h1 className="mb-10 font-bold leading-5">Hi, Welcome back 👋</h1>
                        </div>
                        <div className="flex gap-x-4 text-sm items-center">
                            <div
                                className={`flex gap-x-2 items-center rounded-md px-5 py-2 cursor-pointer hover:bg-gray-200 ${selectedType === "Ngày" && "bg-gray-200"
                                    }`}
                                onClick={() => handleItemClick("Ngày")}
                            >
                                24 giờ trước
                                <div className="text-xs">
                                    <IoFilterOutline />
                                </div>
                            </div>
                            <div
                                className={`flex gap-x-2 items-center rounded-md px-5 py-2 cursor-pointer hover:bg-gray-200 ${selectedType === "Tháng" && "bg-gray-200"
                                    }`}
                                onClick={() => handleItemClick("Tháng")}
                            >
                                30 ngày trước
                                <div className="text-xs">
                                    <IoFilterOutline />
                                </div>
                            </div>
                            <div
                                className={`flex gap-x-2 items-center rounded-md px-5 py-2 cursor-pointer hover:bg-gray-200 ${selectedType === "Năm" && "bg-gray-200"
                                    }`}
                                onClick={() => handleItemClick("Năm")}
                            >
                                1 năm trước
                                <div className="text-xs">
                                    <IoFilterOutline />
                                </div>
                            </div>
                        </div>
                    </div>
                    {loadingPage ? (
                        <>
                            {" "}
                            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4 mb-5">
                                <div className="rounded-xl flex flex-row bg-white text-[#212b36] shadow-md  ">
                                    <div className="flex flex-row w-full py-10 px-6 ">
                                        <div className="w-16 h-16 flex-shrink-0">
                                            <img
                                                className="m-w-full inline-block"
                                                src="/images/admin/dashboard/ic_glass_bag.png"
                                                alt=""
                                            />
                                        </div>
                                        <div className="flex flex-col ml-6 gap-y-2">
                                            <h4 className="text-lg font-bold bg-gray-200 text-gray-200 animate-pulse rounded-lg w-full py-3"></h4>
                                            <h6 className="text-xs bg-gray-200 text-gray-200 animate-pulse rounded-lg px-14 py-3"></h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-xl flex flex-row bg-white text-[#212b36] shadow-md  ">
                                    <div className="flex flex-row w-full py-10 px-6 ">
                                        <div className="w-16 h-16 flex-shrink-0">
                                            <img
                                                className="m-w-full inline-block"
                                                src="/images/admin/dashboard/ic_glass_users.png"
                                                alt=""
                                            />
                                        </div>
                                        <div className="flex flex-col ml-6 gap-y-2">
                                            <h4 className="text-lg font-bold bg-gray-200 text-gray-200 animate-pulse rounded-lg w-full py-3"></h4>
                                            <h6 className="text-xs bg-gray-200 text-gray-200 animate-pulse rounded-lg px-14 py-3"></h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-xl flex flex-row bg-white text-[#212b36] shadow-md ">
                                    <div className="flex flex-row w-full py-10 px-6 ">
                                        <div className="w-16 h-16 flex-shrink-0">
                                            <img
                                                className="m-w-full inline-block"
                                                src="/images/admin/dashboard/ic_glass_buy.png"
                                                alt=""
                                            />
                                        </div>
                                        <div className="flex flex-col ml-6 gap-y-2">
                                            <h4 className="text-lg font-bold bg-gray-200 text-gray-200 animate-pulse rounded-lg w-full py-3"></h4>
                                            <h6 className="text-xs bg-gray-200 text-gray-200 animate-pulse rounded-lg px-14 py-3"></h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-xl flex flex-row bg-white text-[#212b36] shadow-md ">
                                    <div className="flex flex-row w-full py-10 px-6 ">
                                        <div className="w-16 h-16 flex-shrink-0">
                                            <img
                                                className="m-w-full inline-block"
                                                src="/images/admin/dashboard/ic_glass_message.png"
                                                alt=""
                                            />
                                        </div>
                                        <div className="flex flex-col ml-6 gap-y-2">
                                            <h4 className="text-lg font-bold bg-gray-200 text-gray-200 animate-pulse rounded-lg w-full py-3"></h4>
                                            <h6 className="text-xs bg-gray-200 text-gray-200 animate-pulse rounded-lg px-14 py-3"></h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            {" "}
                            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4 mb-5">
                                <div className="rounded-xl flex flex-row bg-white text-[#212b36] shadow-md  ">
                                    <div className="flex flex-row w-full py-10 px-6 ">
                                        <div className="w-16 h-16 flex-shrink-0">
                                            <img
                                                className="m-w-full inline-block"
                                                src="/images/admin/dashboard/ic_glass_bag.png"
                                                alt=""
                                            />
                                        </div>
                                        <div className="flex flex-col ml-6">
                                            <h4 className="text-lg font-bold">
                                                {dashboard?.totalRevenue?.toLocaleString("vi-VN", {
                                                    style: "currency",
                                                    currency: "VND",
                                                })}
                                            </h4>
                                            <h6 className="text-xs">Tổng doanh thu</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-xl flex flex-row bg-white text-[#212b36] shadow-md  ">
                                    <div className="flex flex-row w-full py-10 px-6 ">
                                        <div className="w-16 h-16 flex-shrink-0">
                                            <img
                                                className="m-w-full inline-block"
                                                src="/images/admin/dashboard/ic_glass_users.png"
                                                alt=""
                                            />
                                        </div>
                                        <div className="flex flex-col ml-6">
                                            <h4 className="text-lg font-bold">
                                                {dashboard?.totalProfit?.toLocaleString("vi-VN", {
                                                    style: "currency",
                                                    currency: "VND",
                                                })}
                                            </h4>
                                            <h6 className="text-xs">Tổng lợi nhuận</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-xl flex flex-row bg-white text-[#212b36] shadow-md ">
                                    <div className="flex flex-row w-full py-10 px-6 ">
                                        <div className="w-16 h-16 flex-shrink-0">
                                            <img
                                                className="m-w-full inline-block"
                                                src="/images/admin/dashboard/ic_glass_buy.png"
                                                alt=""
                                            />
                                        </div>
                                        <div className="flex flex-col ml-6">
                                            <h4 className="text-lg font-bold">
                                                {dashboard?.countOrders} Đơn hàng
                                            </h4>
                                            <h6 className="text-xs">Tổng đơn hàng</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-xl flex flex-row bg-white text-[#212b36] shadow-md ">
                                    <div className="flex flex-row w-full py-10 px-6 ">
                                        <div className="w-16 h-16 flex-shrink-0">
                                            <img
                                                className="m-w-full inline-block"
                                                src="/images/admin/dashboard/ic_glass_message.png"
                                                alt=""
                                            />
                                        </div>
                                        <div className="flex flex-col ml-6">
                                            <h4 className="text-lg font-bold">
                                                {dashboard?.countProjects} Sản phẩm
                                            </h4>
                                            <h6 className="text-xs">Tổng sản phẩm</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    <div className="flex justify-between">
                        <div className="bg-white text-[rgb(33, 43, 54)] rounded-lg shadow-lg w-full md:w-6/12 lg:w-8/12 mr-4">
                            <ResponsiveContainer width="100%" height={400}>
                                <ComposedChart
                                    width={500}
                                    height={400}
                                    data={data}
                                    margin={{
                                        top: 20,
                                        right: 80,
                                        bottom: 20,
                                        left: 20,
                                    }}
                                >
                                    <CartesianGrid stroke="#f5f5f5" />
                                    <XAxis
                                        dataKey="name"
                                        label={{
                                            value: "Pages",
                                            position: "insideBottomRight",
                                            offset: 0,
                                        }}
                                        scale="band"
                                    />
                                    <YAxis
                                        label={{
                                            value: "Index",
                                            angle: -90,
                                            position: "insideLeft",
                                        }}
                                    />
                                    <Tooltip />
                                    <Legend />
                                    <Area
                                        key="recharts1-clip"
                                        type="monotone"
                                        dataKey="amt"
                                        fill="#8884d8"
                                        stroke="#8884d8"
                                    />
                                    <Bar dataKey="pv" barSize={20} fill="#413ea0" />
                                    <Line type="monotone" dataKey="uv" stroke="#ff7300" />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="bg-white text-[rgb(33, 43, 54)] rounded-lg shadow-lg w-full md:w-6/12 lg:w-4/12">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart
                                    cx="50%"
                                    cy="50%"
                                    outerRadius="80%"
                                    data={data2}
                                    margin={{
                                        top: 20,
                                        right: 80,
                                        bottom: 20,
                                        left: 20,
                                    }}
                                >
                                    <PolarGrid />
                                    <PolarAngleAxis dataKey="subject" />
                                    <PolarRadiusAxis angle={12} domain={[0, 150]} fontSize={12} />
                                    <Radar
                                        name="Mike"
                                        dataKey="A"
                                        stroke="#8884d8"
                                        fill="#8884d8"
                                        fillOpacity={0.6}
                                        fontSize={12}
                                    />
                                    <Radar
                                        name="Lily"
                                        dataKey="B"
                                        stroke="#82ca9d"
                                        fill="#82ca9d"
                                        fillOpacity={0.6}
                                        fontSize={12}
                                    />
                                    <Legend />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
