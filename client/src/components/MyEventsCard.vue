<template>
  <div>

    <div>
      <img class="img-fluid boxbrdr my-2" :src="ticket.event.coverImg" alt="">
    </div>

    <div>
      <p class="fs-3 my-2">{{ ticket.event.name }}</p>
      <p class="fs-4 my-2">{{ ticket.event.location }}</p>
      <p class="fs-5 my-2">{{ ticket.event.startDate.toLocaleDateString() }}</p>

      <button @click="refundTicket()" class="btn btn-danger boxbrdr my-2">Refund Ticket</button>
    </div>
  </div>
</template>
    
    
<script>
import { computed } from 'vue';
import { AppState } from '../AppState';
import Pop from '../utils/Pop';
import { ticketService } from '../services/TicketService.js';
import { logger } from '../utils/Logger';
import { Ticket } from '../models/Ticket';



export default {
  props: { ticket: { type: Ticket, required: true } },

  setup(props) {


    return {
      account: computed(() => AppState.account),


      async refundTicket() {
        try {


          const yes = await Pop.confirm('are you sure you want to refund?');

          if (!yes) {
            return;
          }

          const ticketId = props.ticket.id;
          logger.log(ticketId)
          await ticketService.refundTicket(ticketId)


        } catch (error) {
          Pop.error(error)
        }
      }

    };
  },
};
</script>
    
    
<style lang="scss" scoped>
.boxImg {
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
}

.canceledBox {
  box-shadow: 0px 0px 15px red;
  border: 3px solid black;
}

.boxbrdr {
  border: 5px solid black;
  box-shadow: 5px 5px 15px black;
}

.box {
  border: 5px solid gray;
  background-color: black;
}
</style>