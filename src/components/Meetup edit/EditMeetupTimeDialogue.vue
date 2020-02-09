<template>
  <!-- <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="4"> -->
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-btn
              color="primary"
              dark
              v-on="on"
              text
              x-small
              fab
            >
              <v-icon dark>mdi-pencil</v-icon>
            </v-btn>
          </template>
          <v-time-picker v-model="editedTime" format="24hr">
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              @click="menu = false"
              dark
              text
            >
              Close
            </v-btn>
            <v-btn
              color="primary"
              dark
              text
              @click="onSaveChanges"
            >
              Save
            </v-btn>
          </v-time-picker>
        </v-menu>
      <!-- </v-col>
    </v-row>
  </v-container> -->
</template>

<script>
export default {
  props: ['meetup'],
  data () {
    return {
      editedTime: new Date(this.meetup.date),
      menu: false
    }
  },
  created () {
    console.log(this.editedTime)
  },
  methods: {
    onSaveChanges () {
      this.menu = false
      const newDate = new Date(this.meetup.date)
      // THIS IS THE TIME FORMAT RETURNED BY TIME PICKER i.e. 10:30 PM
      const hours = this.editedTime.match(/^(\d+)/)[1]
      // console.log(this.formData.time.match(/(\d+)/g))
      const minutes = this.editedTime.match(/:(\d+)/)[1]
      newDate.setHours(hours)
      newDate.setMinutes(minutes)
      this.$store.dispatch('updateMeetupData', {
        id: this.meetup.id,
        date: newDate
      })
    }
  }
}
</script>
