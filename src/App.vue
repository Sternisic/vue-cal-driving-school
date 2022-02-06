<template>
  <v-app>
    <v-app-bar
        app
        color="primary"
        dark
    >

      <v-btn
          href="http://localhost:8081"
          text
      >
        <div class="d-flex align-center">

          <h3>Fahrschule Rosin</h3>
        </div>
      </v-btn>



      <v-spacer>
      </v-spacer>

      <v-btn
          href="http://localhost:8081/"
          text
      >
        <span class="mr-2">Fahrschüler</span>
      </v-btn>

      <v-btn
          href="http://localhost:8081/#/kalender"
          text
      >
        <span class="mr-2">Kalender</span>
      </v-btn>



    </v-app-bar>

    <v-main>

      <div class="container">
        <router-view/>
      </div>


    </v-main>

  </v-app>
</template>

<script>

import {db} from "@/firebase";

const documentPath = 'events/rJxElbGHRYASyJJ1ClUM';

export default {
  data() {
    return {
      firebaseData: null,
      formData: {},
      state: 'loading'
    };
  },

  firestore() {
    return {
      firebaseData: db.doc(documentPath),
    };
  },
  methods: {
    async updateFirebase() {
      try {
        await db.doc(documentPath).set(this.formData);
        this.state = 'synced'
      } catch (error) {
        this.errorMessage = JSON.stringify(error)
        this.state = 'error';
      }
    }
  },
}
</script>
