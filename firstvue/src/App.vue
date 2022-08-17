<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <gddt/>
  </div>
</template>

<script>
import gddt from './components/gddt'

export default {
  name: 'App',
  components: {
    gddt
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
