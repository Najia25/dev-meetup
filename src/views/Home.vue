<template>
  <v-container>
    <v-row class="mt-5">
      <v-col sm="6" class="text-sm-right text-center">
        <v-btn outlined color="primary" to="/meetups">Explore Meetups</v-btn>
      </v-col>
      <v-col sm="6" class="text-sm-left text-center">
        <v-btn to="/meetup/new" outlined color="primary">Organize Meetups</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center">
        <v-progress-circular
          indeterminate
          color="primary"
          v-if="loading"
          :size="70"
          :width="7"
        ></v-progress-circular>
        <v-carousel
        cycle
        hide-delimiter-background
        show-arrows-on-hover
        v-if="!loading"
        >
          <v-carousel-item
            v-for="meetup in meetups"
            :key="meetup.id"
            :src="meetup.imageUrl"
            style="cursor: pointer;"
            @click="loadMeetup(meetup.id)"
          >
            <div class="title">
              {{ meetup.title }}
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center">
        <p>Join our awesome meetups!</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  computed: {
    meetups () {
      return this.$store.getters.featuredMeetups
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  data () {
    return {
    }
  },
  methods: {
    loadMeetup (id) {
      this.$router.push('/meetups/' + id)
    }
  }
}

</script>

<style scoped>
.title {
  position:absolute;
  color:#fff;
  background:rgba(0,0,0,0.5);
  bottom:50px;
  left: 50%;
  transform: translate(-50%);
  padding:10px;
}
</style>
