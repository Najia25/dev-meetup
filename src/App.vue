<template>
  <v-app>
    <v-navigation-drawer
      v-model="sideNav"
      absolute
      temporary
    >
    <v-list>
      <v-list-item link v-for="item in menuItems" :key="item.title">
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
        <v-toolbar-title>Dev Meetup</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-xs-only" >
          <v-btn text v-for="item in menuItems" :key="item.title">
            <v-icon left dark>{{ item.icon }}</v-icon>
            {{ item.title }}
            </v-btn>
        </v-toolbar-items>
      </v-app-bar>
      <main>
        <router-view />
      </main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
  },

  data: () => ({
    //
    sideNav: false,
    menuItems: [
      { icon: 'mdi-account-group', title: 'View Meetups' },
      { icon: 'mdi-map-marker', title: 'Organize Meetup' },
      { icon: 'mdi-account', title: 'Profile' },
      { icon: 'mdi-clipboard-account', title: 'Sign up' },
      { icon: 'mdi-lock-open', title: 'Sign in' }
    ]
  })
}
</script>
