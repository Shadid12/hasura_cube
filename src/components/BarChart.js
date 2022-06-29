import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";


export default function BarChartContainer({ rawData, cubeData }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    let _data = []
    if(rawData?.data?.fraud.length > 0) {
      for (const [key, item] of Object.entries(rawData.data.fraud)) {
        // console.log(`${key}: ${value}`);
        _data.push({
          name: item.type,
          amount: item.amount,
          isFraud: item.isFraud,
          isFlaggedFraud: item.isFlaggedFraud
        })
      }
    }
    if(cubeData?.data?.cube.length > 0) {
      for (const [key, item] of Object.entries(cubeData.data.cube)) {
        console.log(`${key}: ${item}`);
        _data.push({
          name: item.fraud.type,
          amount: item.fraud.amount,
          isFraud: item.fraud.isFraud,
          isFlaggedFraud: item.fraud.isFlaggedFraud
        })
      }
    }
    setData(_data.slice(0, 50));
  },[rawData, cubeData])

  console.log(rawData);
  return (
    <BarChart
      width={800}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="amount" fill="#82ca9d" />
    </BarChart>
  );
}
