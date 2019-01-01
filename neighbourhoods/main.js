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

Array.prototype.includes = function(item) {
  return !!(this.indexOf(item) + 1)
}

function drawChart() {

  var jsonData = $.ajax({
    url: './venues.min.json',
    dataType: 'json',
  }).done(function (results) {
    var data = {}
    results.forEach(function (venue) {
      const location = venue["location"]

      if (location && location["neighbourhood"]) {
        const neighbourhood = location["neighbourhood"]

        data[neighbourhood] = data[neighbourhood] === undefined ? 0 : data[neighbourhood]
        data[neighbourhood] += 1

      }
    });

    var sortable = [];
    for (let label in data) {
      sortable.push([label, data[label]])
    }
    sortable.sort((a, b) => b[1] - a[1])

    const labels = sortable.map(item => item[0]).slice(0,10)
    const dataset = sortable.map(item => item[1]).slice(0,10)

    // Create the chart.js data structure using 'labels' and 'data'
    var tempData = {
      type: 'outlabeledPie',
      data: {
        labels: labels,
        datasets: [
          {
            data: dataset,
            backgroundColor: [
              // '#1f77b4',
              // '#ff7f0e',
              // '#2ca02c',
              // '#d62728',
              // '#ff6384',
              // '#36a2eb',
              // '#cc65fe',
              // '#ffce56'
              "#003f5c",
              pattern.draw('dot',"#2f4b7c"),
              "#665191",
              pattern.draw('diamond',"#a05195"),
              "#d45087",
              pattern.draw('zigzag',"#f95d6a"),
              "#ff7c43",
              pattern.draw('weave',"#ffa600"),
              "#ff767d",
              pattern.draw('ring',"#f47ed6"),
              "#c08ef0",
              pattern.draw('line',"#809bf6"),
              "#36a2eb",
              pattern.draw('triangle',"#009f55"),
              // "#009895",
              pattern.draw('cross', '#009895')
            ]
          }
        ]
      },
      options: {
        animation: {
            animateRotate: false, // general animation time
        },
        hover: {
            animationDuration: 0, // duration of animations when hovering an item
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
          text: "Burpple Beyond Top 10 Neighbourhoods 2018"
        },
        zoomOutPercentage: 30, // makes chart 40% smaller (50% by default, if the preoprty is undefined)
        plugins: {
          legend: false,
          outlabels: {
            text: '%l %p',
            backgroundColor: 'black',
            color: 'white',
            stretch: 45,
            font: {
                resizable: true,
                minSize: 16,
                maxSize: 24
            }
          }
        },
      }
    };

    // Get the context of the canvas element we want to select
    var ctx = document.getElementById("chartjs").getContext("2d");

    // Instantiate a new chart
    var myChart = new Chart(ctx, tempData);
  });
}

window.onload = function() {
  drawChart()
};
