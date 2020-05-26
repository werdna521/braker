<template>
  <div>
    <app-bar
      text="Sign Out"
      :on-click="signOut"
    />
    <v-banner v-if="showBanner">
      <v-avatar
        slot="icon"
        size="40"
      >
        <v-img src="../assets/pp.jpg" />
      </v-avatar>
      Welcome to Braker. If this is your first time visiting this site, feel free to explore. Braker is a simple web app where people can share their thoughts to the Braker community. Keep in mind, be kind to everyone and enjoy :).
      <template v-slot:actions>
        <v-btn
          text
          dark
          color="red darken-1"
          @click="hideBanner"
        >
          Dismiss
        </v-btn>
      </template>
    </v-banner>
    <v-container class="my-4">
      <div class="headline">Latest Posts</div>
      <v-row
        justify="center"
        v-if="loading"
      >
        <v-col
          cols="10"
          lg="4"
          v-for="i in 6"
          :key="`#skeleton-home-${i}`"
        >
          <v-skeleton-loader
            loading
            height="160"
            type="list-item-avatar-three-line"
          />
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col
          cols="10"
          lg="4"
          v-for="post in posts"
          :key="`#post-${post.id}-${post.title}`"
        >
          <v-card
            shaped
            ripple
            hover
            class="ma-3"
          >
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4">{{ post.time }}</div>
                <v-list-item-title class="headline mb-1">{{ post.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ post.username }}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-avatar
                size="80"
                color="blue darken-3"
                class="headline white--text"
              >
                {{ generateInitials(post.username) }}
              </v-list-item-avatar>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <div class="body-1">{{ post.content }}</div>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-bottom-sheet v-model="sheet">
      <v-sheet class="text-center" height="200">
        <div class="pt-12">There is trouble loading the posts. You should consider refreshing the page :).</div>
        <v-btn
          class="mt-6"
          dark
          color="red darken-3"
          @click="refreshPage"
        >
          Refresh
        </v-btn>
      </v-sheet>
    </v-bottom-sheet>
    <v-dialog
      v-model="logoutDialog"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title v-if="logoutError">
          <v-alert
            width="100%"
            type="error"
          >
            Sign out unsuccessful!
          </v-alert>
        </v-card-title>
        <v-card-title class="headline">Are You Sure?</v-card-title>
        <v-card-text>Are you sure that you want to sign out?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="cancelSignOut">No</v-btn>
          <v-btn color="red darken-1" text @click="doSignOut">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-speed-dial
      fixed
      bottom
      right
      direction="top"
      v-model="fab"
      transition="slide-y-reverse-transition"
    >
      <template v-slot:activator>
        <v-btn
          color="red darken-2"
          dark
          fab
        >
          <v-icon v-if="fab">{{ closeIcon }}</v-icon>
          <v-icon v-else>{{ chevronIcon }}</v-icon>
        </v-btn>
      </template>
      <v-btn
        fab
        dark
        small
        color="yellow darken-1"
        @click="scrollToTop"
      >
        <v-icon>{{ upIcon }}</v-icon>
      </v-btn>
      <v-dialog
        v-model="dialog"
        persistent
        max-width="600"
      >
        <template v-slot:activator="{ on }">
          <v-btn
            fab
            dark
            small
            color="green lighten-1"
            v-on="on"
          >
            <v-icon>{{ addIcon }}</v-icon>
          </v-btn>
        </template>
        <v-card :loading="createLoading">
          <v-card-title v-if="createError">
            <v-alert
              width="100%"
              type="error"
            >
              Oops! Couldn't create a new post. Try reloading if the problem persists.
            </v-alert>
          </v-card-title>
          <v-card-title v-if="emptyError">
            <v-alert
              width="100%"
              type="error"
            >
              Make sure you don't leave the title or content field(s) empty.
            </v-alert>
          </v-card-title>
          <v-card-title>
            <span class="headline">New Post</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="title"
                    label="Post Title"
                    required
                  />
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="content"
                    label="Content"
                    filled
                    required
                  />
                </v-col>
              </v-row>
            </v-container>
            <small>Keep in mind that submitted post can't be unsent or deleted :)</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="emptyCreateSheet">Close</v-btn>
            <v-btn color="blue darken-1" text @click="createPost">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-speed-dial>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import AppBar from '@/components/AppBar.vue';
  import { mdiDotsHorizontal, mdiPlus, mdiChevronDoubleUp, mdiClose, mdiAlert } from '@mdi/js';
  import * as PostRepository from '@/api/post';
  import * as Authentication from '@/api/auth';
  import { PostModel } from '@/model/models';

  export default Vue.extend({
    name: 'Home',
    components: {
      AppBar
    },
    data () {
      return {
        fab: false,
        addIcon: mdiPlus,
        chevronIcon: mdiDotsHorizontal,
        upIcon: mdiChevronDoubleUp,
        closeIcon: mdiClose,
        alertIcon: mdiAlert,
        showBanner: true,
        loading: true,
        posts: [] as PostModel[] | undefined,
        sheet: false,
        dialog: false,
        title: '',
        content: '',
        createError: false,
        createLoading: false as boolean | string,
        logoutDialog: false,
        logoutError: false,
        emptyError: false
      }
    },
    methods: {
      scrollToTop () {
        window.scrollTo({ behavior: 'smooth', top: 0, left: 0 });
      },
      hideBanner () {
        this.showBanner = false;
      },
      refreshPage () {
        window.location.reload();
      },
      generateInitials (name: string): string {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
      },
      emptyCreateSheet () {
        this.createLoading = false;
        this.title = '';
        this.content = '';
        this.createError = false;
        this.emptyError = false;
        this.dialog = false;
      },
      async createPost () {
        if (!this.title || !this.content) return this.emptyError = true;
        this.createLoading = 'red darken-3';
        const createResponse = await PostRepository.create(this.title, this.content);
        if (createResponse.message) {
          this.createLoading = false;
          return this.createError = true;
        }
        if (createResponse.data) this.posts ? this.posts.push(createResponse.data) : this.posts = [createResponse.data];
        this.emptyCreateSheet();
      },
      signOut () {
        this.logoutDialog = true;
      },
      async doSignOut () {
        const signOutResponse = await Authentication.signOut();
        if (signOutResponse.message) {
          return this.logoutError = true;
        }
        await this.$router.replace({ name: 'login' });
      },
      cancelSignOut () {
        this.logoutError = false;
        this.logoutDialog = false;
      }
    },
    async created () {
      const supermanResponse = await Authentication.superman();
      if (supermanResponse.message) await this.$router.replace({ name: 'login' });

      const postsResponse = await PostRepository.getAll();
      if (postsResponse.message) {
        this.sheet = true;
      } else {
        this.loading = false;
        this.posts = postsResponse.data
      }
    }
  });
</script>

<style lang="scss">
</style>