<template>
  <div>
    <v-container
      class="pa-0 bg absolute"
      fluid
    >
      <v-row class="bg">
        <v-col
          class="grey lighten-4 bg"
          md="9"
          cols="12"
        />
        <v-col
          class="red darken-3 bg"
          md="3"
          cols="0"
        />
      </v-row>
    </v-container>
    <v-img
      class="blob"
      src="../assets/blob(1).svg"
    />
    <v-img
      class="blob-bottom"
      src="../assets/blob.svg"
    />
    <v-img
      class="blob-tiny"
      src="../assets/blob(2).svg"
    />
    <v-img
      class="bg-img"
      src="../assets/welcome.svg"
    />
    <v-sheet
      elevation="8"
      class="login-card pa-3"
    >
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="headline font-weight-bold grey--text text--darken-4">Braker</v-list-item-title>
          <v-list-item-subtitle>Login to your Braker account</v-list-item-subtitle>
          <v-list-item-subtitle
            class="red--text"
            v-if="error"
          >
            {{ errorMessage }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-form v-model="valid">
            <v-text-field
              dense
              outlined
              label="Username"
              hide-details="auto"
              v-model="username"
              class="mb-4"
              :rules="rules"
            />
            <v-text-field
              dense
              outlined
              type="password"
              label="Password"
              hide-details="auto"
              v-model="password"
              :rules="rules"
            />
          </v-form>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-btn
            color="red lighten-1"
            :loading="loading"
            @click="authenticate"
            dark
          >
            Sign In
          </v-btn>
        </v-list-item-content>
      </v-list-item>
    </v-sheet>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import * as AuthenticationRepository from '@/api/auth';
  import * as Authentication from '@/api/auth';

  export default Vue.extend({
    name: 'Login',
    data () {
      return {
        username: '',
        password: '',
        loading: false,
        error: false,
        errorMessage: '',
        valid: false,
        rules: [
          (v: string) => !!v || 'Cannot be empty'
        ]
      }
    },
    methods: {
      async authenticate () {
        if (!this.valid) return;
        this.loading = true;
        const authResponse = await AuthenticationRepository.authenticate(this.username, this.password);
        if (authResponse.status !== 200) {
          this.errorMessage = authResponse.message || '';
          this.error = true;
        } else {
          await this.$router.replace({ name: 'home' });
        }
        this.loading = false;
      }
    },
    async created () {
      const supermanResponse = await Authentication.superman();
      if (supermanResponse.data) await this.$router.replace({ name: 'home' });
    }
  });
</script>

<style scoped lang="scss">
  .bg {
    height: 100vh;
  }

  .absolute {
    position: fixed;
    top: 0;
  }

  @media (max-width: 960px) {
    .bg-img {
      position: fixed;
      top: 20%;
      right: -10%;
      width: 80%;
    }

    .blob {
      position: fixed;
      top: -20vw;
      left: -20vw;
      width: 125vw;
      height: 125vw;
    }

    .blob-bottom {
      position: fixed;
      left: 20vw;
      bottom: -50vw;
      width: 100vw;
      height: 100vw;
    }

    .blob-tiny {
      display: none;
    }

    .login-card {
      width: 80%;
      position: fixed;
      bottom: 15%;
      left: 10%;
    }
  }

  @media (min-width: 961px) {
    .bg-img {
      position: fixed;
      bottom: 10%;
      right: 5%;
      width: 40%;
    }

    .blob {
      position: fixed;
      top: -20vw;
      left: -20vw;
      width: 50vw;
      height: 50vw;
    }

    .blob-bottom {
      position: fixed;
      bottom: -20vw;
      left: 20vw;
      width: 40vw;
      height: 40vw;
    }

    .blob-tiny {
      position: fixed;
      left: 40vw;
      width: 15vw;
      height: 15vw;
    }

    .login-card {
      width: 40%;
      position: fixed;
      bottom: 20%;
      left: 10%;
    }
  }
</style>