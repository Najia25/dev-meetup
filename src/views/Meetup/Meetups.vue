<template>
  <v-container>
    <v-row>
      <v-col
      >
        <v-card
        >
          <div class="d-flex">
            <v-avatar
              class="ma-3"
              size="125"
              tile
            >
              <v-img src="https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg"></v-img>
            </v-avatar>

            <div>
              <v-card-title
                class="headline"
              >My meetup</v-card-title>
              <v-card-subtitle> 17th July</v-card-subtitle>
              <v-card-actions>
                <v-btn class="ma-2" color="indigo" to="/meetups/1" outlined>
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
