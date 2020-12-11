<template>
  <div id="app">
    <Header />
    <keep-alive>
      <router-view :key="$route.fullPath" class="main" />
    </keep-alive>
    <Footer class="footer" />
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    heardFuel(averageLap) {
      console.log(`heard fuel: ${averageLap.min}`)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Raleway', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main {
  flex: 1;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
  import Header from './components/Header'
  import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Header, 
    Footer,
  }
}
</script>
