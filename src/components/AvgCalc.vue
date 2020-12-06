<template>
  <div>
    <main class="w-full">
      <form class="flex flex-col p-6 w-full bg-custom-blue">
        <div class="flex flex-col lg:w-3/4 lg:mx-auto">
          <div class="my-5">
            <div class="w-full text-custom-tan"><input class="w-1/4 text-center" type="number" v-model="min"> : <input class="w-1/4 text-center" type="number" v-model="sec"> . <input class="w-1/4 text-center" type="number" v-model="ms"> (MM:SS.sss)</div> 
          </div>
        </div>
        <div class="flex flex-row justify-evenly">
          <input class="calc-btn p-2 w-1/5 rounded-lg bg-white text-custom-blue hover:bg-custom-brown hover:border-custom-tan hover: border hover:text-custom-tan" type="button" value="Add Laptime" v-on:click="addLapTime">
          <input class="calc-btn p-2 w-1/5 rounded-lg bg-white text-custom-blue hover:bg-custom-brown hover:border-custom-tan hover: border hover:text-custom-tan" type="button" value="Calculate" v-on:click="calcAvgLap">
          <input class="calc-btn p-2 w-1/5 rounded-lg bg-white text-custom-blue hover:bg-custom-brown hover:border-custom-tan hover: border hover:text-custom-tan" type="button" value="Add to Fuel Calculator" v-on:click="sendToFuel">
          <input class="calc-btn p-2 w-1/5 rounded-lg bg-white text-custom-blue hover:bg-custom-brown hover:border-custom-tan hover: border hover:text-custom-tan" type="button" value="Clear Lap Times">
        </div>
      </form>
      <h3>Lap Times:</h3>
        <ul v-for="time in times" :key="time.id">
          <li>{{ time.min }}:{{ time.sec }}.{{ time.ms }}</li>
        </ul>    
    </main>
  </div>
</template>

<script>
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
      }
    }
  },
  methods: {
    calcAvgLap() {
      console.log(`calculating`)
      let allTimes = []
      let timeInSec
      for(let i = 0; i < this.times.length; i++) {
        timeInSec = ((this.times[i].min) * 60) + this.times[i].sec + ((this.times[i].ms) * 10 ** -3)
        allTimes.push(timeInSec)
        timeInSec = null
      }
      let avgTotalSec = (allTimes.reduce((a, b) => a + b, 0) / allTimes.length).toFixed(3)
      console.log(`average sec ${avgTotalSec}`)
      let avgMin = Math.floor(avgTotalSec / 60)
      console.log(`avgMin = ${avgMin}`)
      let avgSec = Math.floor((avgTotalSec % 60).toFixed(3))
      console.log(`avgSec = ${avgSec}`)
      let avgMs = ((avgTotalSec % 60).toFixed(3)).toString().split('.')
      console.log(avgMs)
      avgMs = Number(avgMs[1])
      console.log(`avgMS = ${avgMs} ${typeof(avgMs)}`)
      this.average.min = avgMin
      this.average.sec = avgSec
      this.average.ms = avgMs
    },
    addLapTime() {
      this.times.push({
        min: Number(this.min),
        sec: Number(this.sec),
        ms: Number(this.ms)
      })
      this.min = null
      this.sec = null
      this.ms = null
    },
    sendToFuel() {
      console.log('sending')
    }
  }

}
</script>

<style>

</style>