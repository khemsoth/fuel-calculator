<template>
  <div class="flex flex-col justify-center"> 
    <main class="w-full">
      <form class="flex flex-col p-6 w-full bg-custom-blue">
        <div class="flex flex-col lg:w-3/5 lg:mx-auto xl:w-3/5">
          <div class="my-5">
            <label class="text-left text-custom-tan" for="distance">Distance: </label>
            <input  class="w-full text-center mb-4" v-model="distance" type="number" name="distance"> 
            <input v-model="selected" type="radio" name="laps" value="laps"> <label class="text-custom-tan mr-6" for="laps">Laps</label>
            <input v-model="selected" type="radio" name="time" value="time"> <label class="text-custom-tan" for="time">Time <span class="italic text-sm text-custom-tan">(minutes)</span></label>
          </div>
          <div class="my-5">
            <label class="text-custom-tan" for="fuel-con">Average Fuel Consumption: <span class="italic text-sm text-custom-tan">(per lap)</span> </label>
            <input class="w-full text-center mb-4" v-model="fuelConsumption" type="number"> 
            <input v-model="fluidSelected" type="radio" name="liters" value="liters"> <label class="text-custom-tan mr-6" for="liters">Liters</label>
            <input v-model="fluidSelected" type="radio" name="gallons" value="gallons"> <label class="text-custom-tan" for="gallons">Gallons</label>
          </div>
          <div class="my-5" v-bind:style='{ display: laptimeVisible }'>
            <label class="text-custom-tan" for="lap-time">Average Lap Time: (MM:SS.sss)</label>
            <div class="w-full text-custom-tan"><input class="w-1/4 text-center text-custom-brown" type="number" v-model="lapTimeMin" placeholder="MM"> : <input class="w-1/4 text-center text-custom-brown" type="number" v-model="lapTimeSec" placeholder="SS.sss"><!-- . <input class="w-1/4 text-center text-custom-brown" type="number" v-model="lapTimeMS">--></div> 
          </div>
          <div class="my-5">
            <label class="text-custom-tan" for="extra-fuel">How many laps of extra fuel do you want? </label>
            <input class="w-full text-center" v-model="extraFuel" type="number" name="extra-fuel">
          </div>
          <input class="calc-btn p-2 w-2/5 self-end rounded-lg bg-white text-custom-blue hover:bg-custom-brown hover:border-custom-tan hover: border hover:text-custom-tan" v-on:click="calculate" type="button" value="Calculate!">
        </div>
        <p class="text-custom-tan italic mt-4">All results are estimates. Your mileage may vary.</p>
      </form>
      <aside v-bind:style='{ visibility: isVisible }' class="m-8 p-6 border border-custom-orange rounded-lg lg:w-3/4 lg:mx-auto">
        <p>You need {{ this.result }} {{ this.fluidSelected }} of fuel.</p>
      </aside>
      
    </main>
  </div>
</template>

<script>
import { bus } from '../main'
export default {
  name: 'Calculator',
  data() {
    return {
      isVisible: 'hidden', 
      distance: null,
      selected: null,
      fluidSelected: null,
      fuelConsumption: null,
      result: null,
      laptimeVisible: 'none',
      lapTimeMin: null, 
      lapTimeSec: null,
      lapTimeMS: null,
      extraFuel: null,
      formValidated: false
    }
  },
  watch: {
    selected: function() {
      if(this.selected === 'time') {
        this.laptimeVisible = 'block'
      } else {
        this.laptimeVisible = 'none'
      }
    }
  },
  created() {
    bus.$on('sendingFuel', (data) => {
      this.lapTimeMin = data.min
      this.lapTimeSec = data.sec
      /*
      let fullSeconds = data.sec
      fullSeconds.toString()
      console.log(typeof(fullSeconds))
      let timeMs = fullSeconds.split('.')[1]
      timeMs = Number(timeMs) 
      console.log(`${typeof(timeMs)} ${timeMs}`)
      this.lapTimeMS = timeMs
      */
    })
  },
  methods: {
    validateForm() {
      this.errors = []
      if(!this.distance) {
        this.errors.push(`distance`)
      }
      if(!this.selected) {
        this.errors.push(`distance unit`)
      }
      if(!this.fluidSelected) {
        this.errors.push(`fuel unit`)
      }
      if(!this.fuelConsumption) {
        this.errors.push(`fuel consumption`)
      }
      if(this.selected === 'time') {
        if(!this.lapTimeMin || !this.lapTimeSec) {
          this.errors.push(`average lap time`)
        } else {
          this.formValidated = !this.formValidated
          return
        }
      } else if(this.selected ==='laps') {
        if(this.distance && this.selected && this.fluidSelected && this.fuelConsumption) {
          this.formValidated = !this.formValidated
        }
      } else {
        return
      }
    },
    calculate() {  
      this.formValidated = false
      this.validateForm() 
      if(this.formValidated) {
      if(this.isVisible === 'hidden') {
        this.isVisible = 'visible'
      }
      if(this.selected === 'laps') {
        this.result = this.distance * this.fuelConsumption + this.extraFuel * this.fuelConsumption
      } else if(this.selected === 'time') {
        let avgLapMin = Number(this.lapTimeMin) + Number(this.lapTimeSec / 60) /*+ Number((this.lapTimeMS) * 10 ** -3)*/
        avgLapMin.toFixed(3)
        let totalLaps = Number(this.distance) / avgLapMin
        totalLaps.toFixed(3)
        let result = totalLaps * Number(this.fuelConsumption)
        result = result + Number(this.extraFuel * this.fuelConsumption)
        this.result = result.toFixed(3)
        this.formValidated = false
      }
      } else {
        alert(`Please fill out ${this.errors}`)
        this.formValidated = false
      }
      }
  }
}
</script>

<style>

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

  * {
    color: #5d4c46;
  }

  .calc-btn:hover {
    cursor: pointer;
  }


</style>