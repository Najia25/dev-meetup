<template>
  <v-container>
    <v-row class="mt-5">
      <v-col sm="6" xs="12" class="text-sm-right text-center">
        <v-btn to="/meetups">Explore Meetups</v-btn>
      </v-col>
      <v-col sm="6" xs="12" class="text-sm-left text-center">
        <v-btn to="/meetup/new">Explore Meetups</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-carousel
        cycle
        hide-delimiter-background
        show-arrows-on-hover >
          <v-carousel-item
            v-for="meetup in meetups"
            :key="meetup.id"
            :src="meetup.imageUrl"
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
  data () {
    return {
      meetups: [
        { imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg', id: 'sdsaddsdsdssd', title: 'Meetup in New York' },
        { imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Paris_vue_d%27ensemble_tour_Eiffel.jpg', id: 'kukhjghjy', title: 'Meetup in Paris' }
      ]
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
