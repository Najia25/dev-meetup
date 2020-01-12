<template>
  <v-container>
    <v-row>
      <v-col
      >
        <v-card v-for="meetup in meetups"
        :key="meetup.id"
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
              <v-card-subtitle>{{ meetup.date }}</v-card-subtitle>
              <v-card-actions>
                <v-btn class="ma-2" color="indigo" :to="'/meetups/' + meetup.id" outlined>
                  <v-icon>mdi-arrow-right</v-icon>
                  View Meetup
                </v-btn>
              </v-card-actions>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  computed: {
    meetups () {
      return this.$store.getters.loadMeetups
    }
  }
}
</script>
