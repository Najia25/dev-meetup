<template>
  <v-container>
    <v-row>
      <v-col sm="6" offset-sm="3">
        <h1 class="grey--text text--lighten-1 mb-5">Create a new Meetup</h1>
        <v-form ref="form" @submit.prevent="createMeetup">
          <v-text-field class="mb-5"
            v-model="formData.title"
            name="title"
            label="Title"
            required
          ></v-text-field>
          <v-text-field class="mb-5"
            v-model="formData.location"
            name="location"
            label="Location"
            required
          ></v-text-field>
          <v-text-field class="mb-5"
            name="imageUrl"
            v-model="formData.imageUrl"
            label="Image URL"
            required
          ></v-text-field>
          <v-img :src="formData.imageUrl"></v-img>
          <v-textarea class="mb-5"
            name="description"
            label="Description"
            v-model="formData.description"
            required
          ></v-textarea>
          <h1 class="grey--text text--lighten-1 mb-5">Pick a Time and Date</h1>
          <v-row>
            <v-col>
              <v-date-picker v-model="formData.date">
                {{ formData.date }}
              </v-date-picker>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-time-picker v-model="formData.time">
                {{ formData.time }}
              </v-time-picker>
            </v-col>
          </v-row>
          <v-btn class="primary" :disabled="!formIsValid" type="submit">Create Meetup</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  computed: {
    formIsValid () {
      return this.formData.title !== '' &&
      this.formData.location !== '' &&
      this.formData.imageUrl !== '' &&
      this.formData.description !== ''
    }
  },
  data () {
    return {
      formData: {
        title: '',
        location: '',
        imageUrl: '',
        description: '',
        date: new Date().toISOString().substr(0, 10),
        time: new Date().toISOString().substr(11, 8)

      }
    }
  },
  methods: {
    createMeetup () {
      const payload = this.formData
      this.$store.dispatch('addMeetup', payload)
    }
  }
}
</script>
