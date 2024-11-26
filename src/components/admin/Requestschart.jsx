import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Legend } from "recharts";
import AdminLayout from "./Adminlayout";
import "./Requestschart.css";
import axios from "axios";

function RequestsChart() {
  const [lineChartData, setLineChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);

  useEffect(() => {
    const fetchLineChartData = async () => {
      try {
        const response = await axios.get("http://localhost:2005/requests-overtime");
        setLineChartData(response.data);
      } catch (error) {
        console.error("Error fetching line chart data:", error);
      }
    };
  
    fetchLineChartData();
  }, []);
  
  useEffect(() => {
    const fetchBarChartData = async () => {
      try {
        const response = await axios.get("http://localhost:2005/expert-solved-requests");
        setBarChartData(response.data);
      } catch (error) {
        console.error("Error fetching bar chart data:", error);
      }
    };
  
    fetchBarChartData();
  }, []);

  return (
    <AdminLayout>
      <div className="requests-overtime-container">
        {/* Line Chart */}
        <div className="requests-overtime-overlay">
          <LineChart width={600} height={300} data={lineChartData} className="requests-chart">
            <CartesianGrid stroke="#d4edda" strokeDasharray="3 3" />
            <XAxis dataKey="date" stroke="#28a745" />
            <YAxis stroke="#28a745" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#e9f5e9",
                borderColor: "#28a745",
              }}
              itemStyle={{ color: "#28a745" }}
            />
            <Line type="monotone" dataKey="totalRequests" stroke="#28a745" strokeWidth={2} />
          </LineChart>
        </div>

        {/* Bar Chart */}
        <div className="requests-overtime-overlay">
          <BarChart width={600} height={300} data={barChartData} className="requests-chart">
            <CartesianGrid stroke="#d4edda" strokeDasharray="3 3" />
            <XAxis dataKey="expert" stroke="#28a745" />
            
            {/* Updated YAxis to avoid fractional values */}
            <YAxis 
              stroke="#28a745" 
              domain={[0, 'dataMax']} // Set the Y-axis to start from 0 and dynamically adjust to the max value
              tickFormatter={(value) => Math.floor(value)} // Round down values to ensure integer ticks
            />
            
            <Tooltip
              contentStyle={{
                backgroundColor: "#e9f5e9",
                borderColor: "#28a745",
              }}
              itemStyle={{ color: "#28a745" }}
            />
            <Legend />
            {/* Updated the barSize to half of the default width */}
            <Bar dataKey="solvedRequests" fill="#28a745" barSize={50} />
          </BarChart>
        </div>
      </div>
    </AdminLayout>
  );
}

export default RequestsChart;
