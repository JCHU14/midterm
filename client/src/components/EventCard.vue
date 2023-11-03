<template>
  <router-link :to="{ name: 'EventDetails', params: { eventId: eventProp.id } }">


    <div>


      <img class="img-fluid boxImg pt-3" :src="eventProp.coverImg" alt="">

      <div class="p-2">

        <!-- //FIXME - Get it to show its Cancelled -->
        <p v-if="eventProp.isCanceled == true">
          <marquee class="bg-danger text-dark fs-2 canceledBox" behavior="scrolling" direction="right"><i
              class="mdi mdi-hazard-lights"></i>Canceled<i class="mdi mdi-hazard-lights"></i></marquee>
        </p>

        <div class="text-light my-3 fs-4">{{ eventProp.name }}</div>


      </div>

    </div>

  </router-link>
</template>


<script>
import { computed } from 'vue';
import { AppState } from '../AppState';

export default {
  props: { eventProp: { type: Event, required: true } },

  setup() {

    return {
      account: computed(() => AppState.account),

    };
  },
};
</script>


<style lang="scss" scoped>
.boxImg {
  height: 40vh;
  width: 100%;
  object-fit: cover;
  object-position: center;
}

.canceledBox {
  box-shadow: 0px 0px 15px red;
  border: 3px solid black;
}



.box {
  border: 5px solid gray;
  background-color: black;
}
</style>