import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { getGoverHallNum } from '../services/AdminServices/HallTypeNum';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Number Of Hall Per Governorate',
    },
  },
};



export function BarChart() {
  const[labels,setLabels]=useState([])
  const [datas,setDatas]=useState([])
  useEffect(()=>{
    getGoverHallNum().then((res)=>{
      setLabels(res.data.labels)
      setDatas(res.data.datas)
    }).catch((err)=>{
      console.log(err)
    })
  },[])
console.log(datas,labels)
  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: datas,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  return <Bar options={options} data={data} />;
}
