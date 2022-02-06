<template>
<div id="dashboard">
    <v-list><h4>Fahrschüler</h4>
    </v-list>
  <input type="text" v-model="search" placeholder="nach Namen suchen ..." class="search-box">
    <v-list-item v-for="user in filteredUsers" v-bind:key="user.id" class="v-list-css">
      <div class="user_id"> {{user.user_id}}: {{user.name}}
        <div class="container"></div>
        <router-link v-bind:to="{name: 'view-user', params: {user_id: user.user_id}}" class="edit-button">
          <a class="edit-button">Notizen öffnen</a>
        </router-link>
      </div>
    </v-list-item>
  <v-list v-for="user in users" v-bind:key="user.id" class="">
  </v-list>

  <div class="bottom-right">
    <router-link to="/new" class="bottom-right">
      <v-btn class="v-btn orange bottom-right">Fahrschüler hinzufügen</v-btn>
    </router-link>
  </div>
</div>
</template>

<script>
import {db} from "@/firebase";

export default {
name: "Dashboard",
  data(){
    return {
      users: [],
      search: ''
    }
  },
  created() {
    db.collection('users').orderBy('name').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const data = {
          'id': doc.id,
          'user_id': doc.data().user_id,
          'name': doc.data().name,
          'caption': doc.data().caption
        }
        this.users.push(data)
      })
    })
  },
  computed: {
  filteredUsers: function(){
    return this.users.filter((user) => {
      return user.name.match(this.search);
    })
  }
  }
}
</script>

<style scoped>

.search-box{
  display: block;
  padding: 2px;
  border: 2px #91C9FF solid;
  border-radius: 25px;
  width: 15%;
  text-align: center;
}

input{
  margin-left: 20px;
}

.v-list-css{
  border-bottom: 2px #0074D9 solid;
}

.user_id{
  display: inline-block;
  padding: 8px;
  font-size: 18px;
  margin: 1em 1em 1em 1em;
}

.user_id:before {
  display: inline-block;
  float: left;
  margin-left: -1.5em;
  color: #0074D9;
}

.edit-button{
  color: #91C9FF;
  width: 180px;
  height: 60px;
  cursor: pointer;
  background: transparent;
  outline: none;
  transition: 1s ease-in-out;
  text-decoration: unset;
  text-transform: uppercase;
}

.bottom-right {
  position: absolute;
  bottom: 5%;
  right: 5%;
}
</style>