<template>
  <div>
    <main>
      <p>All results are estimates. Your mileage may vary</p>
      <form>
        <div>
          <label for="distance">Distance: </label>
          <input v-model="distance" type="number" name="distance"> 
            <select v-model="selected" name="distance-value">
              <option disabled selected>Please select one</option>
              <option value="laps">Laps</option>
              <option value="minutes">Minutes</option>
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
      result: null
    }
  },
  methods: {
    calculate() {
      if(this.isVisible === 'hidden') {
        this.isVisible = 'visible'
      }
      if(this.selected === 'laps') {
        this.result = this.distance * this.fuelConsumption
      } else {
        console.log('oops')
      }
    }
  }
}
</script>

<style scoped>


</style>