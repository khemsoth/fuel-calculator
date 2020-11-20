<template>
  <div class="flex flex-column justify-center"> 
    <main class="border-2 border-gray-600 w-2/3">
      <p>All results are estimates. Your mileage may vary.</p>
      <form class="">
        <div>
          <label for="distance">Distance: </label>
          <input class="bg-gray-200" v-model="distance" type="number" name="distance"> 
            <select v-model="selected" name="distance-value">
              <option disabled selected>Please select one</option>
              <option value="laps">Laps</option>
              <option value="time">Time</option>
            </select>
        </div>
        <div>
          <label for="fuel-con">Average Fuel Consumption: </label>
          <input v-model="fuelConsumption" type="text"> 
            <select v-model="fluidSelected" name="fluid-value">
              <option disabled selected>Please select one</option>
              <option value="liters">Liters</option>
              <option value="gallons">Gallons</option>
            </select>
          per lap
        </div>
        <div v-bind:style='{ visibility: laptimeVisible }'>
          <label for="lap-time">Average Lap Time: </label>
          <input type="number" v-model="lapTimeMin">:<input type="number" v-model="lapTimeSec">.<input type="number" v-model="lapTimeMS"> (MM:SS.sss)
        </div>
        <div>
          <label for="extra-fuel">How many laps of extra fuel do you want?</label>
          <input v-model="extraFuel" type="number" name="extra-fuel">
        </div>
        <input v-on:click="calculate" type="button" value="Calculate!">
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
      laptimeVisible: 'hidden',
      lapTimeMin: null, 
      lapTimeSec: null,
      lapTimeMS: null,
      extraFuel: null
    }
  },
  watch: {
    selected: function() {
      if(this.selected === 'time') {
        this.laptimeVisible = 'visible'
      } else {
        this.laptimeVisible = 'hidden'
      }
    }
  },
  methods: {
    calculate() {
      if(this.isVisible === 'hidden') {
        this.isVisible = 'visible'
      }
      if(this.selected === 'laps') {
        this.result = this.distance * this.fuelConsumption
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


</style>