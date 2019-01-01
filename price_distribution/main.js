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
      const deals = venue["deals"]

      if (deals && deals.length) {
        deals.forEach(deal => {
          const maxSavings = deal["max_savings"]
          const integer = Math.round(Number(maxSavings.replace(/[^0-9.-]+/g,"")))
          const intString = integer.toString()
          data[intString] = data[intString] === undefined ? 0 : data[intString]
          data[intString] += 1
        })
      }
    });

    var sortable = [];
    for (let label in data) {
      sortable.push([Number(label), data[label]])
    }
    sortable.sort((a, b) => a[0] - b[0])

    const labels = sortable.map(item => item[0])
    const dataset = sortable.map(item => {
      return {
        x: item[0],
        y: item[0],
        r: item[1]
      }
    })

    // Create the chart.js data structure using 'labels' and 'data'
    var tempData = {
      type: 'bubble',
      data: {
        labels: labels,
        datasets: [
          {
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderWidth: 0,
            data: dataset
          }
        ]
      },
      options: {
        legend: {
          display: false
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
          text: "Burpple Beyond Deal Prices 2018"
        },
      }
    };

    // Get the context of the canvas element we want to select
    var ctx = document.getElementById("chartjs").getContext("2d");

    // Instantiate a new chart
    var myChart = new Chart(ctx, tempData);
  });
}

function calculateDealsTotal() {
  let jsonData = $.ajax({
    url: './venues.min.json',
    dataType: 'json',
  }).done(function (results) {
    let data = {}
    let dealsCount = 0
    const resultsTotal = results.reduce(function (acc, currentVenue) {
      const deals = currentVenue["deals"]
      let dealsTotal = 0
      if (deals && deals.length) {
        dealsTotal += deals.reduce((sum, deal) => {
          const maxSavings = deal["max_savings"]
          const integer = Number(maxSavings.replace(/[^0-9.-]+/g,""))
          dealsCount += 1
          return sum + integer
        }, 0)
      }
      return acc + dealsTotal
    }, 0);

    console.log(resultsTotal, dealsCount)
  });
}

window.onload = function() {
  drawChart()
};
