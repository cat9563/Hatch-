// var whatever we call the individual Goals
// var whatever we call the overall bar

// var whatever we call the completed bar
// var whatever we call the uncompleted bar


// var goal = [1, 2, 3, 4, 5]
// var progressBar = goal.length;
// var current = [blue, orange, green];
// var remaining = (progressBar - current.length);

// each goal 
// each progress bar in each goal
// number completed bars 
// number of incomplete bars 
// total number of goals

// var totalgoals = 10;
// var bigbar = 10;


var completegoals = 7;    //completed_goals.length will count the number of completed bars
var incompletegoals = 3;  //incomplete_goals.length will count the number of incomplete bars

var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ["Goals I Have Accomplished", "Goals I Have Left"],
        datasets: [{
            label: '',
            data: [completegoals, incompletegoals],
            backgroundColor: [
                'green',
                'yellow'
            ],
            borderWidth: 2
        }]
    },
    options: {
        cutoutPercentage: 80,
        rotation: 1 * Math.PI,
        circumference: 1 * Math.PI,
    }
});

// $("#renderBtn").click(
//     function () {
//         data = [20000, 14000, 12000, 15000, 18000, 19000, 22000];
//         labels =  ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
//         renderChart(data, labels);
//     }
// );