import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Pie } from 'react-chartjs-2';

function Ranking(props) {

    //REF
    const chartRef = React.createRef();

    //STATES
    const [keyword, setKeyword] = useState('');
    const [chartData, setChartData] = useState({});    
    const [labels, setLabels] = useState([]);
    const [counters, setCounters] = useState([]);

    //BUSCAR USUÁRIO
    function searchingFor(keyword) {
        return function(item) {              
            return item.username.toLowerCase().includes(keyword.toLowerCase()) || item.email.toLowerCase().includes(keyword.toLowerCase()) || !keyword;
        }
    }

    function getData() {

        const posts = props.posts;

        let count = [];
        let amount = 1;
        for (let i = 0; i < posts.length; i++) {
            if (i < posts.length - 1 && posts[i].userId == posts[i + 1].userId) {
                amount++;
            } else {
                count.push({ user: posts[i].userId, amount: amount });
                amount = 1;
            }
        }
        getUsername(count)
        // console.log(count);
    }

    function getUsername(count) {
        setLabels([]);
        setCounters([])

        for (let i = 0; i < props.users.length; i++) {
            if (count[i].user === props.users[i].id) {
                labels.push(props.users[i].username);
                counters.push(count[i].amount);
            }
            
        }
        getCanvas()
        console.log(labels)
    }

    function getCanvas() {
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext('2d');
        var gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, '#000046');   
        gradient.addColorStop(1, '#24C6DC');


        chart({gradient})
    }

    const chart = ({gradient}) => {
        return (
            setChartData({
                // labels: ['Suporte', 'Marketing', 'Compras', 'SAC', 'RH', 'Boletos', 'diego', 'luiz', 'aliendre', 'suarte'],
                labels: labels,
                datasets: [
                    {
                        label: 'Quantidade de postagens',
                        data: counters,
                        borderColor: '#fff',
                        backgroundColor: [gradient, '#091A7A', '#102693', '#1939B7', '#254EDB', '#3366FF', '#6690FF', '#84A9FF', '#ADC8FF', '#D6E4FF'],
                        borderWidth: 1,
                        borderRadius: 0,
                        drawOnChartArea: true,
                        fill:'start',
                        options: {
                           legend: {
                              display: false //This will do the task
                           }
                        }
                    }
                ]
            })
        )
    }

    
    useEffect(() => {
        getData()
    }, [props.posts])
    

    return (
        <motion.div 
        initial={{y:40, opacity:0.2}}
        animate={{y:0, opacity:1}}
        transition={{delay: 0.1, duration: 0.2}}
        className="container-ranking">
            <h3>Ranking</h3>
            {/* <div className="filter">
                <input type="search" aria-label="Buscar usuário" value={keyword} onChange={(e)=>setKeyword(e.currentTarget.value)} placeholder="Buscar usuário" /> 
            </div> */}
            <div className="container-chart" id="chart">
                <Pie ref={chartRef} id="canvas" data={chartData} options={{
                    responsive: true,
                    title: {text: 'usuarios', display:false},
                    gridLines: {
                        display:false
                    },
                    legend: {
                       display: false //This will do the task
                    },
                    options: {
                       legend: {
                          display: false //This will do the task
                       }
                    }
                }} />
            </div>
        </motion.div>
    )
}

export default Ranking;