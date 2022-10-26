<template>
  <div>
    <section class="w-2/3 mx-auto mb-10">
      <h4 class="text-2xl font-semibold">Directions</h4>
       <p>
         The following calculator is meant to be used to find your average lap time. 
         Upon calculating the average lap time, you can click the "Add to Fuel Calculator" button to send your average lap time to the 
         fuel calculator. 
       </p>
    </section>
    <AvgCalc />
  </div>
</template>

<script>
import AvgCalc from '../components/AvgCalc.vue'

export default {
  name: 'AvgLap',
  components: {
    AvgCalc
  },
  methods: {
    sendingFuel(averageLap) {
      this.$emit('sendingFuel', averageLap)
    } 
  }
}
</script>

<style>

</style>