<template>
  <div id="view-user">
    <h4>Übersicht von {{name}}</h4>
    <ul>
      <v-list class="border-collumn">
        <h4>User-ID</h4>
        <h6>{{user_id}}</h6>
      </v-list>
      <v-list class="border-collumn">
        <h4>Name:</h4>
        <h6>{{name}}</h6>
      </v-list>
      <v-list class="border-collumn">
        <h4>Notizen</h4>
        <h6>{{caption}}</h6>
      </v-list>
    </ul>
    <div class="container wrap-button">
    <button @click="deleteUser" to="/" class="red">Fahrschüler löschen</button>

      <div class="">
        <router-link v-bind:to="{name: 'edit-user', params:{user_id: user_id}}" class="">
          <button class="">Fahrschüler bearbeiten</button>
        </router-link>
      </div>
      <router-link to="/" class="wrap-router-link">Abbrechen</router-link>

    </div>
  </div>
</template>

<script>
import { db} from "@/firebase";

export default {
  name: "view-user",
  data(){
    return {
      user_id: null,
      name: null,
      caption: null,
    }
  },
  beforeRouteEnter(to, from, next) {
    db.collection('users').where('user_id','==', to.params.user_id).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        next(vm => {
            vm.user_id = doc.data().user_id
            vm.name = doc.data().name
            vm.caption = doc.data().caption
        })
      })
    })

  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData(){
      db.collection('users').where('user_id', '==', this.$route.params.user_id).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.user_id = doc.data().user_id
          this.name = doc.data().name
          this.caption = doc.data().caption
        })
      })
    },
    deleteUser() {
      if (confirm('Bist du sicher?')){
        db.collection('users').where('user_id', '==', this.$route.params.user_id).get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.delete();
            this.$router.push('/')
          })
        })
      }
    }
  }
}
</script>

<style scoped>
.border-collumn{
  border-bottom: #91C9FF 2px dotted;
}

.border-collumn:last-child{
  border-bottom: black 2px solid;
 }


.wrap-button{
  color: #91C9FF;
  display: block ruby;
}

button{
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-left: 20px;
}

.wrap-router-link{
  background-color: #1d2f2e; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-left: 20px;
}
</style>