<template>
  <v-app>
    <v-navigation-drawer v-model="sideNav" absolute temporary>
      <v-list>
        <v-list-item-group>
          <v-list-item link v-for="item in menuItems" :key="item.title" :to="item.link">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="onLogout" v-if="userIsAuthenticated">
            <v-list-item-icon>
              <v-icon> mdi-logout </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title> Logout </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app class="primary" dark>
      <v-app-bar-nav-icon @click ="sideNav = !sideNav" class="hidden-md-and-up"></v-app-bar-nav-icon >
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">DevMeetup</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn text v-for="item in menuItems" :key="item.title" :to="item.link">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn @click="onLogout" v-if="userIsAuthenticated" text>
          <v-icon left dark>mdi-logout</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-content>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
  },

  data: () => ({
    sideNav: false
    // menuItems: [
    //   { icon: 'mdi-account-group', title: 'View Meetups', link: '/meetups' },
    //   { icon: 'mdi-map-marker', title: 'Organize Meetup', link: '/meetup/new' },
    //   { icon: 'mdi-account', title: 'Profile', link: '/profile' },
    //   { icon: 'mdi-clipboard-account', title: 'Sign up', link: '/signup' },
    //   { icon: 'mdi-lock-open', title: 'Sign in', link: '/signin' }
    // ]
  }),
  computed: {
    menuItems () {
      let menuItems = [
        { icon: 'mdi-clipboard-account', title: 'Sign up', link: '/signup' },
        { icon: 'mdi-lock-open', title: 'Sign in', link: '/signin' }
      ]
      if (this.userIsAuthenticated) {
        menuItems = [
          { icon: 'mdi-account-group', title: 'View Meetups', link: '/meetups' },
          { icon: 'mdi-map-marker', title: 'Organize Meetup', link: '/meetup/new' },
          { icon: 'mdi-account', title: 'Profile', link: '/profile' }
        ]
      }
      return menuItems
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    }
  },
  methods: {
    onLogout () {
      this.$store.dispatch('logOut')
    }
  }
}
</script>
