// {
//    "id":164979,
//    "name":"5 Little Monkeys Cafe",
//    "formatted_price":"~$15/pax",
//    "newly_added":false,
//    "returning":false,
//    "time_first_added":1537864234970,
//    "removed":false,
//    "dishes":[

//    ],
//    "url":"5-little-monkeys-cafe",
//    "location":{
//       "address":"#11-00 Pico Creative Centre, 20 Kallang Avenue, 339411",
//       "longitude":103.8650975,
//       "latitude":1.3098178,
//       "neighbourhood":"Kallang"
//    },
//    "banner_url":"https://burpple-3.imgix.net/venue_images/img_0974-jpg_4951_original?w=640&h=320&fit=crop&q=80",
//    "categories":[
//       "Peranakan",
//       "Good For Groups",
//       "Cheap & Good",
//       "Cafes & Coffee"
//    ],
//    "deals":[
//       {
//          "id":1301,
//          "title":"Main Dish",
//          "max_savings":"$11.50"
//       },
//       {
//          "id":1302,
//          "title":"Main Dish",
//          "max_savings":"$11.50"
//       },
//       {
//          "id":1303,
//          "title":"Main Dish",
//          "max_savings":"$11.50"
//       },
//       {
//          "id":1304,
//          "title":"Main Dish",
//          "max_savings":"$11.50"
//       }
//    ]
// }

function drawLineChart() {

  const monthNames = [
    "July", "August", "September", "October", "November", "December"
  ];

  // const monthNames = ["January", "February", "March", "April", "May", "June",
  //     "July", "August", "September", "October", "November", "December"
  //   ];

  var jsonData = $.ajax({
    url: '../venues.min.json',
    dataType: 'json',
  }).done(function (results) {
    // Split timestamp and data into separate arrays
    var data = new Array(12).fill(0);
    results.forEach(function (venue) {
      const timestamp = venue["time_first_added"]
      const month = new Date(timestamp).getMonth()
      data[month] += 1

      const timestamp_2 = venue["time_last_removed"]
      const month_2 = new Date(timestamp_2).getMonth()
      data[month_2] -= 1
    });

    const newData = data.map((_, i) => {
      const dt = data.slice(0,i + 1)
      return dt.length ? dt.reduce((sum, currentValue) => sum + currentValue) : 0
    })
    console.log(newData)

    // Create the chart.js data structure using 'labels' and 'data'
    var tempData = {
      type: 'line',
      data: {
        labels: monthNames,
        datasets: [
          {
            label: "Merchants Added",
            borderColor: "rgb(75, 192, 192)",
            pointBackgroundColor: "rgb(75, 192, 192)",
            pointRadius: 12,
            data: newData.slice(6),
            fill: false
          }
        ]
      },
      options: {
        animation: {
            duration: 0, // general animation time
        },
        hover: {
            animationDuration: 0, // duration of animations when hovering an item
        },
        responsiveAnimationDuration: 0, // animation duration after a resize
        legend: {
          display: false
        },
        elements: {
            line: {
                tension: 0, // disables bezier curves
            },
        },
        layout: {
            padding: {
                left: 48,
                right: 48,
                top: 12,
                bottom: 12
            }
        },
        title: {
          display: true,
          fontSize: 52,
          text: "Burpple Beyond Merchant Count 2018"
        },
        plugins: {
            // Change options for ALL labels of THIS CHART
            datalabels: {
                color: "rgb(75, 192, 192)",
                align: "top",
                offset: 22,
                font: {
                  size: 36
                }
            }
        },
        scales: {
          yAxes: [{
            ticks: {
                display: false
            }
          }]
        }
      }
    };

    // Get the context of the canvas element we want to select
    var ctx = document.getElementById("myLineChart").getContext("2d");

    // Instantiate a new chart
    var myLineChart = new Chart(ctx, tempData);
  });
}

window.onload = function() {
  drawLineChart()
};
