<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld :msg="welcomeMessage"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from './components/HelloWorld.vue';

interface AppData {
  appName: string;
}

export default Vue.extend({
  name: 'App',
  components: {
    HelloWorld
  },
  data: function (): AppData {
    return {
      appName: 'Braker'
    }
  },
  computed: {
    welcomeMessage: function (): string {
      return `Welcome to ${this.appName}`;
    }
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
