'use client'
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";

import ChildcareSidebar from '../components/sidebar'; // Adjust path if needed


const data = [
  { name: "Jan", uv: 4000, pv: 2400 },
  { name: "Feb", uv: 3000, pv: 1398 },
  { name: "Mar", uv: 2000, pv: 9800 },
  { name: "Apr", uv: 2780, pv: 3908 },
  { name: "May", uv: 1890, pv: 4800 },
  { name: "Jun", uv: 2390, pv: 3800 },
  { name: "Jul", uv: 3490, pv: 4300 }
];

const Dashboard = () => {
  return (
    <div style={{ padding: '1rem', display: 'flex' }}>
      <ChildcareSidebar />
      <div style={{ flex: 1, padding: '1rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Dashboard</h1>
        <LineChart width={500} height={300} data={data}>
          <Line type="monotone" dataKey="pv" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis />
        </LineChart>
      </div>
    </div>
  );
};

export default Dashboard;

