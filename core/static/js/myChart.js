var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ["Goals I Have Accomplished", "Goals I Have Left"],
        datasets: [{
            label: '',
            data: [7, 3],
            backgroundColor: [
                '#05A80F',
                '#FFF700'
            ],
            borderWidth: 1
        }]
    },
    options: {
        rotation: 1 * Math.PI,
        circumference: 1 * Math.PI
    }
});

// $("#renderBtn").click(
//     function () {
//         data = [20000, 14000, 12000, 15000, 18000, 19000, 22000];
//         labels =  ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
//         renderChart(data, labels);
//     }
// );