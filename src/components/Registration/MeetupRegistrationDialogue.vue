<template>
  <v-dialog
    width="500"
    v-model="dialog"
  >
    <template v-slot:activator="{ on }">
      <v-btn class="mb-2 mr-2" color="primary" v-on="on" v-if="userIsRegistered">Unregister</v-btn>
      <v-btn class="mb-2 mr-2" color="primary" v-on="on" v-else>Register</v-btn>
    </template>
    <v-card>
      <v-container>
        <v-row>
          <v-col sm="10" offset-sm="1">
            <v-card-title
              primary-title
            >
              {{ userIsRegistered ? 'Unregister' : 'Register' }} for Meetup?
            </v-card-title>
            <v-card-text>
              You can always change your decision later on.
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn
                @click="dialog = false"
                text
                class="green--text"
              >
                Cancel
              </v-btn>
              <v-btn
                class="red--text"
                text
                @click="onAgree"
              >
                Confirm
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['meetup'],
  data () {
    return {
      dialog: false
    }
  },
  computed: {
    userIsRegistered () {
      return this.$store.getters.user.registeredMeetups.findIndex(meetupId => {
        return meetupId === this.meetup.id
      }) >= 0
    }
  },
  methods: {
    onAgree () {
      if (this.userIsRegistered) {
        this.$store.dispatch('unregisterForMeetup', this.meetup.id)
      } else {
        this.$store.dispatch('registerForMeetup', this.meetup.id)
      }
    }
  }
}
</script>
