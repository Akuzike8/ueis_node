/* globals Chart:false, feather:false */

(function () {
  'use strict'

  feather.replace({ 'aria-hidden': 'true' })

  // Graphs
  var ctx = document.getElementById('myChart')
  // eslint-disable-next-line no-unused-vars
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ],
      datasets: [{
        data: [
          15339,
          21345,
          18483,
          24003,
          23489,
          24092,
          12034
        ],
        lineTension: 0,
        backgroundColor: 'transparent',
        borderColor: '#007bff',
        borderWidth: 4,
        pointBackgroundColor: '#007bff'
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: false
          }
        }]
      },
      legend: {
        display: false
      }
    }
  })
})()

let state = 0
const home = document.getElementById("home_link");
const user_profile = document.getElementById("user_link");
const help = document.getElementById("help_link");
const about = document.getElementById("about_link");
const contact = document.getElementById("contact_link");

home.addEventListener("click",() => {
  if(state == 2) user_profile.classList.remove('active')
  if(state == 3) help.classList.remove('active')
  if(state == 4) about.classList.remove('active')
  if(state == 5) contact.classList.remove('active')

  state = 1
  home.classList.add('active')
})

user_profile.addEventListener("click",() => {
  if(state == 1) home.classList.remove('active')
  if(state == 3) help.classList.remove('active')
  if(state == 4) about.classList.remove('active')
  if(state == 5) contact.classList.remove('active')

  state = 2
  user_profile.classList.add('active')
})

help.addEventListener("click",() => {
  if(state == 1) home.classList.remove('active')
  if(state == 2) user_profile.classList.remove('active')
  if(state == 4) about.classList.remove('active')
  if(state == 5) contact.classList.remove('active')

  state = 3
  help.classList.add('active')
})

about.addEventListener("click",() => {
  if(state == 1) home.classList.remove('active')
  if(state == 2) user_profile.classList.remove('active')
  if(state == 3) help.classList.remove('active')
  if(state == 5) contact.classList.remove('active')

  state = 4
  about.classList.add('active')
})

contact.addEventListener("click",() => {
  if(state == 1) home.classList.remove('active')
  if(state == 2) user_profile.classList.remove('active')
  if(state == 3) help.classList.remove('active')
  if(state == 4) about.classList.remove('active')

  state = 5
  contact.classList.add('active')
})

