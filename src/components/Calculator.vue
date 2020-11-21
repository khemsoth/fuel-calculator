<template>
  <div class="flex flex-column justify-center"> 
    <main class="">
      <h2 class="text-4xl m-10">Flag-to-Flag Fuel Calculator</h2>
      <form class="flex flex-col p-6 w-full">
        <div class="my-5">
          <label class="text-left" for="distance">Distance: </label>
          <input  class="w-full text-center mb-4" v-model="distance" type="number" name="distance"> 
          <input v-model="selected" type="radio" name="laps" value="laps"> <label class="mr-6" for="laps">Laps</label>
          <input v-model="selected" type="radio" name="time" value="time"> <label for="time">Time</label>
          <!--
            <select class="w-full" v-model="selected" name="distance-value">
              <option disabled selected>Please select one</option>
              <option value="laps">Laps</option>
              <option value="time">Time</option>
            </select>
            -->
        </div>
        <div class="my-5">
          <label for="fuel-con">Average Fuel Consumption: <span class="italic text-sm text-gray-600">(per lap)</span> </label>
          <input class="w-full text-center mb-4" v-model="fuelConsumption" type="number"> 
          <input v-model="fluidSelected" type="radio" name="liters" value="liters"> <label class="mr-6" for="liters">Liters</label>
          <input v-model="fluidSelected" type="radio" name="gallons" value="gallons"> <label for="gallons">Gallons</label>
          <!--
            <select class="w-2/3" v-model="fluidSelected" name="fluid-value">
              <option disabled selected>Please select one</option>
              <option value="liters">Liters</option>
              <option value="gallons">Gallons</option>
            </select>
          -->
        </div>
        <div class="my-5" v-bind:style='{ display: laptimeVisible }'>
          <label for="lap-time">Average Lap Time: </label>
          <div class="w-full"><input class="w-1/4 text-center" type="number" v-model="lapTimeMin"> : <input class="w-1/4 text-center" type="number" v-model="lapTimeSec"> . <input class="w-1/4 text-center" type="number" v-model="lapTimeMS"></div> (MM:SS.sss)
        </div>
        <div class="my-5">
          <label for="extra-fuel">How many laps of extra fuel do you want? </label>
          <input class="w-full text-center" v-model="extraFuel" type="number" name="extra-fuel">
        </div>
        <input class="p-2 w-2/3 self-end " v-on:click="calculate" type="button" value="Calculate!">
        <p class="text-gray-500 italic mt-4">All results are estimates. Your mileage may vary.</p>
      </form>
      <aside v-bind:style='{ visibility: isVisible }'>
        <p>You need {{ this.result }} {{ this.fluidSelected }} of fuel.</p>
      </aside>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Calculator',
  data() {
    return {
      isVisible: 'hidden', 
      distance: null,
      selected: 'Please select one',
      fluidSelected: 'Please select one',
      fuelConsumption: null,
      result: null,
      laptimeVisible: 'none',
      lapTimeMin: null, 
      lapTimeSec: null,
      lapTimeMS: null,
      extraFuel: null
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
  methods: {
    calculate() {
      if(this.isVisible === 'hidden') {
        this.isVisible = 'visible'
      }
      if(this.selected === 'laps') {
        this.result = this.distance * this.fuelConsumption + this.extraFuel * this.fuelConsumption
      } else if(this.selected === 'time') {
        let avgLapMin = Number(this.lapTimeMin) + Number(this.lapTimeSec / 60) + Number((this.lapTimeMS) * 10 ** -3) / 60
        avgLapMin.toFixed(3)
        console.log(`avgLapMin = ${ avgLapMin }`)
        let totalLaps = Number(this.distance) / avgLapMin
        totalLaps.toFixed(3)
        console.log(`total laps ${totalLaps}`)
        let result = totalLaps * Number(this.fuelConsumption)
        result = result + Number(this.extraFuel * this.fuelConsumption)
        this.result = result.toFixed(3)
        
      } else {
        console.log('oops')
      }
    },
  }
}
</script>

<style scoped>

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

  form {
    background-color: rgba(81,185,229, .3)
  }

</style>