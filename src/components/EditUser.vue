<template>
  <div id="edit-user">
    <h3>Bearbeite {{name}}</h3>
    <div class="container border-collumn">
      <form @submit.prevent="updateUser" class="form">
        <div class="row">
          <div class="">
            <label class="form__label" >User ID#</label>
            <input type="text" v-model="user_id" class="form__field" required>
          </div>
        </div>
        <div class="row">
          <div class="">
            <label class="form__label">Name</label>
            <input type="text" v-model="name" class="form__field" required>
          </div>
        </div>
        <div class="row">
          <div class="wrap-input">
            <label class="form__label extra">Notiz</label>
            <textarea type="text" v-model="caption" required></textarea>
          </div>
        </div>
        <button type="submit" class="wrap-button">Bestätigen</button>
        <router-link to="/" class="wrap-router-link">Abbrechen</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import { db } from "@/firebase";

export default {
  name: "edit-user",
  data(){
    return {
      user_id: null,
      name: null,
      caption: null
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
    updateUser(){
      db.collection('users').where('user_id', '==', this.$route.params.user_id).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref.update({
            user_id: this.user_id,
            name: this.name,
            caption: this.caption
          })
          .then(() => {
            this.$router.push({name: 'view-user', params: {user_id: this.user_id}})
          })
        })
      })
    }
  }
}
</script>

<style scoped>

.wrap-input{
  margin-top: 25px;

}

input{
  border: #91C9FF 1px solid;
  margin: 10px;
}

textarea{
  font-family: inherit;
  width: 100%;
  border: 4px solid #91C9FF;
  outline: 0;
  font-size: 1.3rem;
  color: #000000;
  margin: 30px 5px 5px;
  background: #e7e7e7;
  transition: border-color 0.2s;
}

.form__field{
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 2px solid #91C9FF;
  outline: 0;
  font-size: 1.3rem;
  color: #000000;
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;
}

.form__label {
  font-size: 18px;
  display: inline;
}

button{
  margin-top: 20px;
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

.form{
  margin-top: 2%;
  margin-bottom: 2%;
  background: #ffffff;
  padding: 50px 100px;
  border: 2px solid rgb(222, 207, 207);
  box-shadow: 15px 15px 1px #41a2e8, 15px 15px 1px 2px rgba(0,0,0,1)
}


.wrap-button{
  display: block;
  margin: 0 auto;
  line-height: 16px * 2;
  padding: 0 20px;
  background: #91C9FF;
  letter-spacing: 2px;
  transition: .2s all ease-in-out;
  outline: none;
  border: 1px solid rgba(0,0,0,1);
  box-shadow: 3px 3px 1px #2b81f5, 3px 3px 1px 1px rgba(0,0,0,1);
  text-decoration: none;
  color: black !important;
  margin-bottom: 3%;
}

.wrap-router-link{
  display: table;
  margin: 0 auto;
  line-height: 16px * 2;
  padding: 0 20px;
  background: rgba(0, 0, 0, 0.63);
  letter-spacing: 2px;
  transition: .2s all ease-in-out;
  outline: none;
  border: 1px solid rgba(0,0,0,1);
  box-shadow: 3px 3px 1px rgba(255, 255, 255, 0.75), 3px 3px 1px 1px rgba(0,0,0,1);
  text-decoration: none;
  color: white !important;
  text-align: center;
}

.row{
  margin: 20px;
}

</style>