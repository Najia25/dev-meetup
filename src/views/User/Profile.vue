<template>
  <v-container>
    <v-row>
      <v-col
      >
      <div v-if="registeredMeetups.length != 0">
        <v-card v-for="meetup in meetups"
        :key="meetup.id"
        class="mb-5"
        >
          <div class="d-flex">
            <v-avatar
              class="ma-3"
              size="125"
              tile
            >
              <v-img :src="meetup.imageUrl" ></v-img>
            </v-avatar>

            <div>
              <v-card-title
                class="headline"
              >{{ meetup.title }}</v-card-title>
              <v-card-subtitle>{{ meetup.date | date }}</v-card-subtitle>
              <v-card-actions>
                <v-btn class="ma-2" color="indigo" :to="'/meetups/' + meetup.id" outlined>
                  <v-icon>mdi-arrow-right</v-icon>
                  View Meetup
                </v-btn>
              </v-card-actions>
            </div>
          </div>
        </v-card>
      </div>
      <div v-else><p class="text-center mt-5 grey--text">You haven't registered for any meetup yet!</p></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  computed: {
    registeredMeetups () {
      return this.$store.getters.user.registeredMeetups
    },
    meetups () {
      // const registeredMeetups = this.$store.getters.user.registeredMeetups
      return this.$store.getters.loadMeetups.filter(meetup => {
        return this.registeredMeetups.indexOf(meetup.id) >= 0
      })
    }
  }
}
</script>
