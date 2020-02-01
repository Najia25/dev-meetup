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
            :rules="[rules.required]"
          ></v-text-field>
          <v-text-field class="mb-5"
            v-model="formData.location"
            name="location"
            label="Location"
            :rules="[rules.required]"
          ></v-text-field>
          <v-file-input v-model="file" @change="onFileUpload" prepend-icon="mdi-camera" accept= "image/*" label="Upload image"></v-file-input>
          <v-img :src="imageUrl"></v-img>
          <v-textarea class="mb-5"
            name="description"
            label="Description"
            v-model="formData.description"
            :rules="[rules.required]"
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
              <v-time-picker v-model="formData.date">
                {{ formData.date }}
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
      this.formData.description !== ''
    }
  },
  data () {
    return {
      formData: {
        title: '',
        location: '',
        description: '',
        date: new Date().toISOString().substr(0, 10),
        image: null
      },
      file: null,
      imageUrl: '',
      rules: {
        required: value => !!value || 'Required.'
      }
    }
  },
  methods: {
    createMeetup () {
      if (!this.formIsValid) {
        return
      }
      if (!this.formData.image) {
        return
      }
      const payload = {
        title: this.formData.title,
        location: this.formData.location,
        description: this.formData.description,
        date: this.formData.date,
        image: this.formData.image
      }
      console.log(payload)
      this.$store.dispatch('addMeetup', payload)
    },
    onFileUpload () {
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => { // triggers asynchronously when file has been read successfully
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(this.file)// reads the file and turns image into base64 string
      this.formData.image = this.file
      console.log(this.formData.image)
    }
  }
}
/*
Associate image with corresponding meetup, three step approach:
We dont want to pass image download url (local url) to firebase
We want to store image to firebase and make sure its connected to meetup, for that we need meetup id to connect to the image, which is provided by firebase. to do this.
1. we upload the meetup data to firebase, which gives the id provided by firebase
2. use this key/id to upload image and associate it with our meetup
3. in the success response i get the url where it was stored by firebase
4. reach out to firebase database to update my meetup to add the url to the meetup object we have stored in firebase
The reason for this segmentation is Storage that stores media seperately in firebase
*/
</script>
