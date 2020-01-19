<template>
  <v-container>
    <v-row>
      <v-col col="12" sm="6" offset-sm="3">
        <v-card>
          <v-card-text>
            <v-container>
              <v-form
              ref="form"
              @submit.prevent = "onSignIn"
            >
              <v-text-field class="mb-5"
                v-model="email"
                label="Email"
                name="email"
                type="email"
                :rules="[rules.required]"
              ></v-text-field>
              <v-text-field class="mb-5"
                v-model="password"
                label="Password"
                name="password"
                :type="show1 ? 'text' : 'password'"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show1 = !show1"
                :rules="[rules.required]"
              ></v-text-field>
              <v-card-actions>
                <v-btn type="submit" class="primary">Sign In</v-btn>
              </v-card-actions>
            </v-form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      show1: true,
      show2: true,
      email: '',
      password: '',
      rules: {
        required: value => !!value || 'Required.' // UNDERSTAND
        // const var2 = var1 ? var1 : "something";
        // ...use || operator
        // const var2 = var1 || "something"; here var1 is not a boolean value
      }
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    onSignIn () {
      this.$store.dispatch('signInUser', { email: this.email, password: this.password })
    }
  }
}
</script>
