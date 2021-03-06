'use strict'
const onesEl = document.querySelector('#ones')
const tensEl = document.querySelector('#tens')
const mensEl = document.querySelector('#mens')
const tenmensEl = document.querySelector('#tenmens')
const start_stopButton = document.querySelector('#start_stop')
const lapButton = document.querySelector('#laptime')
const miliEl = document.querySelector('#mili')

const onesEl1 = document.querySelector('#ones1')
const tensEl1 = document.querySelector('#tens1')
const mensEl1 = document.querySelector('#mens1')
const tenmensEl1 = document.querySelector('#tenmens1')
const start_stopButton1 = document.querySelector('#start_stop1')
const lapButton1 = document.querySelector('#laptime1')
const miliEl1 = document.querySelector('#mili1')

function StopWatch(el1, el2, el3, el4) {
  let      tenmens = 0
  ,           mens = 0
  ,           tens = 0
  ,           ones = 0
  ,     intervalID = null
  ,           laps = []

  this.setInnerText = (ones, tens, mens, tenmens) => {
     el1.innerText = ones
     el2.innerText = tens
     el3.innerText = mens
     el4.innerText = tenmens
    }

  this.getInnerText = () => {
      return `${el4.innerText}${el3.innerText}:${el2.innerText}${el1.innerText}`
    }

  this.lapTime = () => {
      laps.push(this.getInnerText())
      console.log('LAPS', laps)
    }

  this.incrementEveryTenMinutes = () => {
     if(mens % 10 === 0) {
       tenmens++
       mens = 0
     }
    }

  this.incrementEverySixtySeconds = () => {
     if(tens % 6 === 0 && ones % 10 === 0) {
       mens++
       this.incrementEveryTenMinutes()
       tens = 0
     }
    }


  this.incrementEveryTenSeconds = () => {
    if(ones % 10 === 0) {
      tens++
      this.incrementEverySixtySeconds()
      ones = 0
    }
  }

  this.incrementEverySecond = () => {
    intervalID = setInterval(() => {
      ones++
      this.incrementEveryTenSeconds()
      this.setInnerText(ones, tens, mens, tenmens)
    }, 1000)
  }

  this.stopTimer = () => {
    clearInterval(intervalID)
  }

  this.startAndStopClock = (isStopped = true) => {
    if(isStopped) {
      // start the clock
      this.incrementEverySecond()
    } else {
      this.stopTimer()
    }
  }
}

const clock1 = new StopWatch(onesEl, tensEl, mensEl, tenmensEl)
const clock2 = new StopWatch(onesEl1, tensEl1, mensEl1, tenmensEl1)

let bool = true
start_stopButton.addEventListener(`click`, () => {
  clock1.startAndStopClock(bool)
  bool = !bool
})

lapButton.addEventListener(`click`, () => {
  clock1.lapTime()
})

let loob = true
start_stopButton1.addEventListener(`click`, () => {
  clock2.startAndStopClock(loob)
  loob = !loob
})

lapButton1.addEventListener(`click`, () => {
  clock2.lapTime()
})
