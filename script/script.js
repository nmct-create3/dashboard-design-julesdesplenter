let dayselect, graph, ctx, config;
let data = [];
const chart = function(obj) {
  console.log('obj', obj);
  ctx = graph.getContext('2d');
  new Chart(ctx, {
    type: 'line',

    data: {
      labels: ['week1', 'week2', 'week3', 'week4', 'week5', 'week6', 'week7'],
      datasets: [
        {
          label: '# of Votes',

          data: obj,
          borderColor: 'rgba(255, 159, 64, 1)',
          borderWidth: 1,
          fill: false
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              min: 0,
              max: 50
            }
          }
        ]
      }
    }
  });
};

const drawChart = function() {
  console.log(info);
  var config = {
    type: 'line',
    data: {
      labels: ['week1', 'week2', 'week3', 'week4', 'week5', 'week6', 'week7'],
      datasets: [
        {
          //   lineTenssion: 0.3,
          label: 'bezoekers',
          backgroundColor: '#ff0000',
          borderColor: '#ff0000',
          data: info
          //   fill: false
        }
      ]
    },
    options: {
      responsive: true,
      title: {
        display: false,
        text: 'Chart.js Line Chart'
      },
      tooltips: {
        mode: 'index',
        intersect: false
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        x: {
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'week'
          }
        },
        y: {
          scaleLabel: {
            display: true,
            labelString: 'bezoekers'
          }
        }
      }
    }
  };

  ctx = graph.getContext('2d');
  window.myLine = new Chart(ctx, config);
};

const changegraph = function(test) {
  info = [];
  let url = `https://iotcloud-nmct.azurewebsites.net/api/visitors/${test}`;
  fetch(url)
    .then(res => res.json())
    .then(out => {
      for (let obj of out) {
        console.log(obj);
        let test = {
          x: obj.Tijdstip,
          y: +obj.AantalBezoekers
        };
        data.push(test);
      }
      chart(data);
    })
    .catch(err => {
      throw err;
    });
};

const init = function() {
  dayselect = document.querySelector('.card__select');
  graph = document.querySelector('.js-graph');
  dayselect.addEventListener('input', function() {
    changegraph(dayselect.value);
  });
  changegraph('maandag');
};

document.addEventListener('DOMContentLoaded', function() {
  console.log('geladen');
  init();
});
