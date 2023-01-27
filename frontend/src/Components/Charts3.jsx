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
import { getGoverHallNum, getReportPerHall } from '../services/AdminServices/HallTypeNum';
import { getHallById } from '../services/HallServices';


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
      text: 'Number Of Report  Per Hall',
    },
  },
};



export function BarChart2() {
  const[labels,setLabels]=useState([])
  const[labelsName,setLabelsName]=useState([])

  const [datas,setDatas]=useState([])
  useEffect(()=>{
    getReportPerHall().then((res)=>{
        console.log(res.data.labels)
        setLabels(res.data.labels)
        setDatas(res.data.datas)
    }).catch((err) => {
      console.log(err);
    });

    if(labels.length >0){
        labels.map((item,ind)=>{
            getHallById(item).then((res)=>{
               setLabelsName(res.data.name)
            })
        })
    }
  },[])
console.log(labelsName)
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
