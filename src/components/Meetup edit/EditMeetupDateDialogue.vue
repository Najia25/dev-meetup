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
          <v-date-picker v-model="editedDate">
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
          </v-date-picker>
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
      editedDate: new Date(this.meetup.date).toISOString().substring(0, 10),
      menu: false
    }
  },
  created () {
    console.log(this.editedDate)
  },
  methods: {
    onSaveChanges () {
      this.menu = false
      const newDate = new Date(this.meetup.date)
      const newDay = new Date(this.editedDate).getUTCDate()
      const newMonth = new Date(this.editedDate).getUTCMonth()
      const newYear = new Date(this.editedDate).getUTCFullYear()
      newDate.setUTCDate(newDay)
      newDate.setUTCMonth(newMonth)
      newDate.setUTCFullYear(newYear)
      this.$store.dispatch('updateMeetupData', {
        id: this.meetup.id,
        date: newDate
      })
    }
  }
}
</script>
