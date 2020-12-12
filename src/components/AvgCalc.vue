<template>
  <div>
    <main class="w-full flex flex-col">
      <form class="flex flex-col p-6 w-full bg-custom-blue">
        <div class="flex flex-col lg:w-3/4 lg:mx-auto xl:w-3/5">
          <div class="w-4/5 my-5 mx-auto">
            <div class="flex flex-row text-custom-tan" @keyup.enter="addLapTime"><input ref="minInput" class="w-1/3 text-center text-custom-brown" type="number" placeholder="MM" v-model="min"> : <input class="text-center text-custom-brown w-1/3" type="number" placeholder="SS" v-model="sec"> . <input class="text-center text-custom-brown w-1/3" type="number" placeholder="sss" v-model="ms"><!-- <span class="text-custom-tan">(MM:SS.sss)</span>--></div> 
          </div>
        </div>
        <div class="flex flex-col sm:grid sm:grid-cols-2 sm:grid-rows-2 lg:w-3/4 lg:mx-auto xl:w-3/5">
          <input class="calc-btn p-2 mx-auto my-2 w-4/5 rounded-lg bg-white text-custom-blue hover:bg-custom-brown hover:border-custom-tan hover: border hover:text-custom-tan" type="button" value="Add Laptime" v-on:click="addLapTime">
          <input class="calc-btn p-2 mx-auto my-2 w-4/5 rounded-lg bg-white text-custom-blue hover:bg-custom-brown hover:border-custom-tan hover: border hover:text-custom-tan" type="button" value="Calculate" v-on:click="calcAvgLap">
          <input class="calc-btn p-2 mx-auto my-2 w-4/5 rounded-lg bg-white text-custom-blue hover:bg-custom-brown hover:border-custom-tan hover: border hover:text-custom-tan" type="button" value="Add to Fuel Calculator" v-on:click="sendToFuel">
          <input class="calc-btn p-2 mx-auto my-2 w-4/5 rounded-lg bg-white text-custom-blue hover:bg-custom-brown hover:border-custom-tan hover: border hover:text-custom-tan" type="button" value="Clear Lap Times" v-on:click="clearLapTimes">
        </div>
      </form>
      <div :style="{ visibility: isVisible }">
        <h3 class="text-xl">Average Lap Time:</h3>
        <p>{{ average.min }}:{{ average.sec }}.{{average.ms}}</p>
      </div>
      <h3 class="text-xl">Lap Times:</h3>
        <ul v-for="time in times" :key="time.id">
          <li>{{ time.min }}:{{ time.sec }}.{{ time.ms }}</li>
        </ul>    
    </main>
  </div>
</template>

<script>
import { bus } from '../main'
export default {
  name: 'AvgCalc',
  data() {
    return {
      min: null,
      sec: null,
      ms: null,
      times: [],
      average: {
        min: null,
        sec: null,
        ms: null
      },
      isVisible: 'hidden',
      formValidated: false
    }
  },
  methods: {
    calcAvgLap() {
      let allTimes = []
      let timeInSec
      for(let i = 0; i < this.times.length; i++) {
        timeInSec = ((this.times[i].min) * 60) + this.times[i].sec + ((this.times[i].ms) * 10 ** -3)
        allTimes.push(timeInSec)
        timeInSec = null
      }
      let avgTotalSec = (allTimes.reduce((a, b) => a + b, 0) / allTimes.length).toFixed(3)
      let avgMin = Math.floor(avgTotalSec / 60)
      let avgSec = Math.floor((avgTotalSec % 60).toFixed(3))
      let avgMs = ((avgTotalSec % 60).toFixed(3)).toString().split('.')
      avgMs = Number(avgMs[1])
      this.average.min = avgMin
      this.average.sec = avgSec
      this.average.ms = avgMs
      this.isVisible = 'visible'
    },
    addLapTime() {
      this.validateTimeFormat()
      if(this.formValidated) {
      this.times.push({
        min: Number(this.min),
        sec: Number(this.sec),
        ms: Number(this.ms)
      })
      this.min = null
      this.sec = null
      this.ms = null
      this.formValidated = false
      this.$refs.minInput.focus()
    } else {
      return
    }},
    sendToFuel() {
      bus.$emit('sendingFuel', this.average)
    },
    clearLapTimes() {
      this.times = []
      this.isVisible = 'hidden'
    },
    validateTimeFormat() {
      if(!this.min || !this.sec || !this.ms) {
        alert(`Please input lap time`)
      }
      if(this.min || this.sec || this.ms) {
        if(this.min.length > 3 || this.sec.length !== 2 || this.ms.length !== 3) {
          alert(`Please use proper lap time format.`)
          this.min = null
          this.sec = null
          this.ms = null
        }
       else if(this.min.length < 3 && this.sec.length === 2 && this.ms.length === 3) {
        if(this.sec < 60) { 
          this.formValidated = true
        } else {
          alert(`Please input seconds between 0-59`)
        }
      }
      } 

    }
  }

}
</script>

<style scoped>

</style>