<template>
  <section class="container-fluid">


    
    
    <div class="row text-center justify-content-around align-items-center">

      <div class="col-11  box bg-dark text-light d-flex justify-content-around m-4">

        <button @click="changeType('')" class=" btn my-2 text-light">All</button>
        <button @click="changeType(type)" class="btn my-2  text-light" v-for="type in types" :key="type">{{ type }}</button>
      </div>
      
      <div v-for="event in events" :key="event.id" role="button" class="col-10 col-md-3 m-4 box text-center">
        
        
      
        <EventCard :eventProp="event"/>

      </div>


    </div>



  </section>
  <EventModal/>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { AppState } from '../AppState';
import Pop from '../utils/Pop';
import { eventsService } from '../services/EventsService';
import EventCard from '../components/EventCard.vue';
import EventModal from '../components/EventModal.vue';
import { logger } from '../utils/Logger';


export default {
    setup() {
        onMounted(() => {
            getEvents();
        });
        const types = ["sport", "digital", "concert", "convention"];
        const filteredType = ref("")
        async function getEvents() {
            try {
                await eventsService.getEvents();
            }
            catch (error) {
                Pop.error(error);
            }
        }


        return {
            comments: computed(() => AppState.comments),
            events: computed(() => {
              if(filteredType.value){
                return AppState.events.filter((event) => event.type == filteredType.value);
              } else{
                return AppState.events
              }
            }),
            types,
            filteredType,

            changeType(type){
              logger.log(type)
              filteredType.value = type;
            }
        };
    },
    components: { EventCard, EventModal }
}
</script>

<style scoped lang="scss">

.boxImg{
  height: 40vh;
  width: 100%;
  object-fit: cover;
  object-position: center;
}





.box{
  border: 5px solid gray;
  background-color: black;
  box-shadow: 0px 0px 15px white;
}


</style>
