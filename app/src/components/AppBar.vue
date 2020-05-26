<template>
  <v-app-bar
    dark
    collapse-on-scroll
    color="red darken-4"
    app
  >
<!--    <div class="headline">Braker</div>-->
    <v-img
      width="100"
      height="40"
      class="logo"
      src="../assets/logo_size.jpg"
    />
    <v-spacer></v-spacer>
    <v-btn
      text
      @click.stop="onClick"
    >
      {{ text }}
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
  import Vue, { PropType } from 'vue';

  export default Vue.extend({
    name: "app-bar",
    props: {
      text: {
        type: Object as PropType<string>,
        default: 'Sign Out'
      },
      onClick: {
        type: Object as PropType<(e: Event) => void>
      }
    }
  });
</script>

<style scoped>
  .logo {
    flex-grow: 0;
  }
</style>