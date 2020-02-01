<template>
  <v-dialog
    width="500"
    v-model="dialog"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        color="primary"
        dark
        v-on="on"
        fab
        small
      >
        <v-icon dark>mdi-pencil</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-container>
        <v-row>
          <v-col sm="10" offset-sm="1">
            <v-card-title
              primary-title
            >
              Edit Meetup
            </v-card-title>
            <v-card-text>
              <v-text-field class="mb-5"
                v-model="editedTitle"
                name="title"
                label="Title"
                :rules="[rules.required]"
              ></v-text-field>
              <v-textarea class="mb-5"
                name="description"
                label="Description"
                v-model="editedDescription"
                :rules="[rules.required]"
              ></v-textarea>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn
                color="primary"
                @click="dialog = false"
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
      editedTitle: this.meetup.title,
      editedDescription: this.meetup.description,
      dialog: false,
      rules: {
        required: value => !!value || 'Required.'
      }
    }
  },
  methods: {
    onSaveChanges () {
      if (this.editedTitle.trim() === '' && this.editedDescription.trim() === '') {
        return
      }
      this.dialog = false
      this.$store.dispatch('updateMeetupData', {
        id: this.meetup.id,
        title: this.editedTitle,
        description: this.editedDescription
      })
    }
  }
}
</script>
