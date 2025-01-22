import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { PieChart } from "react-minimal-pie-chart";
import axiosInstance from "../../services/axiosInstance";
import "../../css/mainPage.css";

interface User {
  country: string;
  role: string;
}

const MainPage: React.FC = () => {
  const [pieData, setPieData] = useState<
    { title: string; value: number; color: string }[]
  >([]);
  const [adminCount, setAdminCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  const initialColors = [
    "#E38627",
    "#C13C37",
    "#6A2135",
    "#8BC34A",
    "#03A9F4",
    "#FFC107",
  ];

  const generateColors = (count: number): string[] => {
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
      const hue = (i * 137.508) % 360;
      colors.push(`hsl(${hue}, 70%, 50%)`);
    }
    return colors;
  };

  const fetchUsers = async () => {
    try {
      let allUsers: User[] = [];
      let page = 0;
      let size = 100;
      let totalPages = 1;
      do {
        const response = await axiosInstance.get(
          `/users?page=${page}&size=${size}`
        );
        const data = response.data;
        allUsers = [...allUsers, ...data.content];
        totalPages = data.totalPages;
        page++;
      } while (page < totalPages);

      const adminCount = allUsers.filter(
        (user) => user.role === "admin"
      ).length;
      const userCount = allUsers.filter((user) => user.role === "user").length;
      setAdminCount(adminCount);
      setUserCount(userCount);

      const countryCounts: { [key: string]: number } = {};
      allUsers.forEach((user) => {
        if (user.country) {
          countryCounts[user.country] = (countryCounts[user.country] || 0) + 1;
        }
      });

      const totalCountries = Object.keys(countryCounts).length;
      const colors = [
        ...initialColors,
        ...generateColors(totalCountries - initialColors.length),
      ];

      const chartData = Object.entries(countryCounts).map(
        ([country, count], index) => ({
          title: country,
          value: count,
          color: colors[index % colors.length],
        })
      );

      setPieData(chartData);
    } catch (error) {
      alert("Failed to fetch users for pie chart.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="mainpage">
      <Navbar />
      <div className="mainpage-content">
        <h1>Welcome to the User Management System</h1>
        <p>Select an option from the menu to get started.</p>
        <div className="mainpage-stats">
          <div className="stat-box">
            <h2>Admins: {adminCount}</h2>
          </div>
          <div className="stat-box">
            <h2>Users: {userCount}</h2>
          </div>
        </div>
      </div>
      <div className="mainpage-chart-container">
        <PieChart data={pieData} radius={40} animate />
        <ul className="chart-labels">
          {pieData.map((entry, index) => (
            <li key={index} style={{ color: entry.color }}>
              {entry.title}: {entry.value}
            </li>
          ))}
        </ul>
      </div>
      <div className="mainpage-footer">
        <h3>Done by: Omar Al-Hamawi</h3>
      </div>
    </div>
  );
};

export default MainPage;
