<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card v-if="!isLoading">
          <v-card-title>{{ meetup.title }}
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <app-edit-meetup-details-dialogue :meetup="meetup"></app-edit-meetup-details-dialogue>
            </template>
          </v-card-title>
          <v-img
            height="400"
            :src="meetup.imageUrl"
          ></v-img>
          <v-card-subtitle class="pb-0 indigo--text text--darken-2">{{ meetup.date }}</v-card-subtitle>
          <v-card-text>
            <div>
              {{ meetup.description }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ['id'],
  computed: {
    meetup () {
      return this.$store.getters.loadMeetup(this.id)
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
    userIsCreator () {
      if (!this.userIsAuthenticated) {
        return false
      } else {
        return this.$store.getters.user.id === this.meetup.creatorId
      }
    },
    isLoading () {
      return this.$store.getters.loading
    }
  }
}
</script>
