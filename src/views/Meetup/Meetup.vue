<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>{{ meetup.title }}</v-card-title>
          <v-img
            height="400"
            :src="meetup.imageUrl"
          ></v-img>
          <v-card-subtitle class="pb-0 indigo--text text--darken-2">{{ meetup.date }}</v-card-subtitle>
          <v-card-text>
            <div>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae vero tempora reiciendis ad id mollitia dignissimos nobis incidunt, tempore voluptates voluptatibus eos facere amet eaque voluptatum sunt quis. Ipsum, enim.
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
    }
  }
}
</script>
