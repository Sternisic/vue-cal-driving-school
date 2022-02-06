<template>
  <div class="container">

    <div class="button-wrap">
      <button class="button" @click="splitDays[0].hide = !splitDays[0].hide">
        Anzeigen / Ausblenden Fahrlehrer 1
      </button>
      <button class="button" @click="splitDays[1].hide = !splitDays[1].hide">
        Anzeigen/Ausblenden Fahrlehrer 2
      </button>
      <button class="button" @click="splitDays[2].hide = !splitDays[2].hide">
        Anzeigen/Ausblenden Fahrlehrer 3
      </button>
      <button class="button" @click="splitDays[3].hide = !splitDays[3].hide">
        Anzeigen/Ausblenden Fahrlehrer 4
      </button>
    </div>
    <vue-cal
        class="vuecal--full-height-delete"

        active-view="day"
        :disable-views="['years']"

        :time-from="6 * 60"
        :time-step="15"

        :editable-events="{title: true, drag: false, resize: true, delete: true, create: false}"
        :split-days="splitDays"

        :events="events"

        todayButton
        cellContextmenu

        @ready="fetchEvents" >
        <!--@view-change="fetchEvents">-->

      <template v-slot:title="{ view }">
        {{ formatTitle(view.startDate) }} -
        {{ formatTitle(view.endDate) }}
      </template>
      <template v-slot:time-cell="{ minutes }">
        <div v-if="minutes" class="minutes">&nbsp;
        </div>
      </template>
      <template v-slot:weekday-heading="{ heading }">
        <span>{{ formatDayTitle(heading.date) }}</span>
        <span>{{ formatDayNumberTitle(heading.date) }}</span>
      </template>
    </vue-cal>


    <form @submit.prevent="saveEvent" class="form">
      <h2>Neue Fahrstunde anlegen:</h2>
      <br>
      <div class="row">
        <div class="wrap-input">
          <label class="form__label" >Titel</label>
          <input type="text" v-model="title" class="form__field">
        </div>
      </div>
      <div class="row">
        <div class="wrap-input">
          <label class="form__label">Beschreibung</label>
          <input type="text" v-model="content" class="form__field">
        </div>
      </div>
      <div class="row">
        <div class="wrap-input">
          <label class="form__label">Start</label>
          <input type="datetime-local" v-model="start" class="form__field" required>
        </div>
      </div>
      <div class="row">
        <div class="wrap-input">
          <label class="form__label">Ende</label>
          <input type="datetime-local" v-model="end" class="form__field" required>
        </div>
      </div>
      <div class="row">
        <div class="wrap-input">
          <label class="form__label">Fahrlehrer</label>
          <select type="number" v-model="split" class="form__field" required>
            <option value="1">Fahrlehrer 1</option>
            <option value="2">Fahrlehrer 2</option>
            <option value="3">Fahrlehrer 3</option>
            <option value="4">Fahrlehrer 4</option>
          </select>
        </div>
      </div>
      <br>
      <button type="submit" class="wrap-button">Bestätigen</button>
      <router-link to="/" class="wrap-router-link">Abbrechen</router-link>
    </form>

  </div>
</template>


<script>
import moment from "moment";
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import 'vue-cal/dist/drag-and-drop.js'

import {db} from "@/firebase";
const documentPath = 'events/booking';




export default {
  name: "hi",
  components: {
    VueCal,
  },
  data: () => ({
    stickySplitLabels: false,
    minCellWidth: 400,
    minSplitWidth: 0,
    splitDays: [
      {id: 1, class: 'f1', label: 'Fahrlehrer 1', hide: false},
      {id: 2, class: 'f2', label: 'Fahrlehrer 2', hide: false},
      {id: 3, class: 'f3', label: 'Fahrlehrer 3', hide: false},
      {id: 4, class: 'f4', label: 'Fahrlehrer 4', hide: false},
    ],
    events: [],
    name: null,
    content: null,
    start: null,
    end: null,
    split: null
  }),

  firestore() {
    return {
      firebaseData: db.doc(documentPath),
    };
  },

  methods: {
    formatTitle(date) {
      return moment(date).format("LL");
    },
    formatDayTitle(date) {
      return moment(date).format("ddd");
    },
    formatDayNumberTitle(date) {
      return moment(date).format("DD");
    },
    formatEventTime(date) {
      return moment(date).format("h:mm a");
    },
    fetchEvents() {
      // Do an ajax call here with the given startDate & endDate.
      db.collection('events').get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            'title': doc.data().title,
            'content': doc.data().content,
            'start': doc.data().start,
            'end': doc.data().end,
            'split': doc.data().split
          }
            this.events.push(data)
        })
      })
      // Your API should return an array of events for this date range.
      // Here we pretend an API call with a Promise and the setTimeout simulates the payload time.
    },
    saveEvent(){
      db.collection('events').add({
        title: this.title,
        content: this.content,
        start: this.start.replaceAll("T"," "),
        end: this.end.replaceAll("T"," "),
        split: Number(this.split),
      })
      this.events.push(this.data)
      setTimeout(() => {
        window.location.reload();
      },500)
    }
  },

};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.container {
  height: 700px;
}

/* You can easily set a different style for each split of your days. */
.vuecal__cell-split.f1 {
  background-color: rgba(221, 238, 255, 0.5);
}

.vuecal__cell-split.f2 {
  background-color: rgba(255, 232, 251, 0.5);
}

.vuecal__cell-split.f3 {
  background-color: rgba(221, 255, 239, 0.5);
}

.vuecal__cell-split.f4 {
  background-color: rgba(255, 250, 196, 0.5);
}

.vuecal__cell-split .split-label {
  color: rgba(0, 0, 0, 0.1);
  font-size: 26px;
}

/* Different color for different event types. */
.vuecal__event.leisure {
  background-color: rgba(253, 156, 66, 0.9);
  border: 1px solid rgb(233, 136, 46);
  color: #fff;
}

.vuecal__event {
  cursor: pointer;
  background: #77a5e1;
  border: black 2px solid;
}

.vuecal__event-title {
  font-size: 20px;
  font-weight: bold;
  color: white;
  background: #528be1;
  border-bottom: black 1px dashed;
}

.vuecal__event-time {
  padding-top: 10px;
  color: white;
  display: inline-block;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.vuecal__event-content {
  color: white;
  font-style: italic;
}

.button-wrap{
  text-align: center;
  padding-bottom: 2%;
}

.button {
  background: #528be1;
  font-size: 80%;
}


.wrap-input {
  display: block;
  width: 100%;
  font-size: 16px;
  line-height: 16px * 2;
  margin-bottom: 16px * 2;
  border: none;
  border-bottom: 3px solid rgba(0, 0, 0, 1);
  background: #ffffff;
  min-width: 250px;
  padding-left: 5px;
  outline: none;
  color: rgba(0, 0, 0, 1);

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
  @media (min-width: 1800px){
    margin-left: 25%;
    width: 50%;
  }
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
</style>

