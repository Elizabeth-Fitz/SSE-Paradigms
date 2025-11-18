let chart = document.getElementById("guess-chart").getContext('2d');
let guessChart = new Chart(chart, {
    type: 'bar',
    data: {
        labels: ['1', '2', '3', '4', '5', '6'],
        datasets: [{
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(238, 176, 182, 1)',
                'rgba(238, 176, 182, 1)',
                'rgba(238, 176, 182, 1)',
                'rgba(238, 176, 182, 1)',
                'rgba(238, 176, 182, 1)',
                'rgba(238, 176, 182, 1)',
            ]
        }]
    },
    options: {
        indexAxis: 'y',
        responsive: true,
        scales: {
            x: {
                ticks: { display: false },
                grid: { display: false }
            },
            y: { 
                ticks: {
                    display: true,
                    font: { weight: 'bold' }
                },
                grid: { display: false }
            },
        },
        plugins: {
            datalabels: {
                display: true,
                color: 'black',
                align: 'center',
                anchor: 'center',
            },
            legend: {
                display: false,
            }    
        }
    }
});