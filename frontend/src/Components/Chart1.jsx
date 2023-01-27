import React ,{useEffect,useState} from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { getAllMony } from '../services/AuthServices';

ChartJS.register(ArcElement, Tooltip, Legend);



export function Chart1() {
    const [datas, setDatas] = useState([]);
    useEffect(() => {
        getAllMony().then((res,err)=>{
            if (err) alert(err.msg)
            setDatas(res.data)
        })
       
    }, []);

    const data = {
        labels: ['Pay on Book Mony', 'Remain Money'],
        datasets: [
          {
            label: '# of Votes',
            data: [datas.Pay_On_Book, datas.remain_Amount],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
            
            ],
            borderWidth: 1,
          },
        ],
      };
  return <Pie data={data}  />;
}
