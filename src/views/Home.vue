<template>
  <div class="home">
      <section class="w-2/3 mx-auto mb-10">
        <h4 class="text-2xl font-semibold">Directions</h4>
        <p>
          The following calculator is to be used to calculate the amount of fuel needed for any given amount of laps or timed stint. 
          Please fill in all fields in order to get the most accurate estimates. 
          <br>
          <br>
          <span class="font-bold">Important</span>: This calculation is not made with any extra fuel load accounted for. It is highly recommended to fill in the amount 
          of extra laps desired to give a buffer.
        </p>
      </section>
    <Calculator />
  </div>
</template>

<script>
import Calculator from '../components/Calculator.vue'
import Footer from '../components/Footer'
import Header from '../components/Header'

export default {
  name: 'Home',
  components: {
    Calculator,
    Footer,
    Header
  }
}
</script>
