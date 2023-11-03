<template>
  <div class="about text-center text-light">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>

  <div class="container-fluid">

    <div class="row justify-content-center">
      <p class=" col-10 fs-1 text-center text-dark box ">My Events:</p>
      <div v-for="myTicket in myEvents" :key="myTicket.id" class="col-10 col-md-7 my-5 text-center text-dark box">
        <MyEventsCard :ticket="myTicket" />
      </div>

    </div>

  </div>
</template>

<script>
import { computed } from 'vue';
import { AppState } from '../AppState';
import MyEventsCard from '../components/MyEventsCard.vue';

export default {
  setup() {
    return {
      events: computed(() => AppState.events),
      account: computed(() => AppState.account),
      myEvents: computed(() => AppState.myTickets),
    };
  },
  components: { MyEventsCard }
}
</script>

<style scoped>
.box {
  border: 5px solid black;
  background-color: gold;
}
</style>
