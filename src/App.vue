<template>
  <v-app>
    <v-navigation-drawer v-model="sideNav" absolute temporary>
      <v-list>
        <v-list-item link v-for="item in menuItems" :key="item.title" :to="item.link">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app class="primary" dark>
      <v-app-bar-nav-icon @click ="sideNav = !sideNav" class="hidden-sm-and-up"></v-app-bar-nav-icon >
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">DevMeetup</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn text v-for="item in menuItems" :key="item.title" :to="item.link">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
  },

  data: () => ({
    sideNav: false,
    menuItems: [
      { icon: 'mdi-account-group', title: 'View Meetups', link: '/meetups' },
      { icon: 'mdi-map-marker', title: 'Organize Meetup', link: '/meetup/new' },
      { icon: 'mdi-account', title: 'Profile', link: '/profile' },
      { icon: 'mdi-clipboard-account', title: 'Sign up', link: '/signup' },
      { icon: 'mdi-lock-open', title: 'Sign in', link: '/signin' }
    ]
  })
}
</script>
