<template>
  <div class="home">
    <header class="bg-custom-tan p-10 mb-10">
      <h2 class="text-4xl m-10 text-custom-blue">Flag-to-Flag Fuel Calculator</h2>
    </header>
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
    <Footer />
  </div>
</template>

<script>
import Calculator from '../components/Calculator.vue'
import Footer from '../components/Footer'

export default {
  name: 'Home',
  components: {
    Calculator,
    Footer
  }
}
</script>
