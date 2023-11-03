<template>
    <div class="container-fluid">

        <div v-if="activeEvent" class="row justify-content-center align-items-center bg-dark">



            <div class="col-12 text-light p-0">
                <img class="img-fluid boxImg" :src="activeEvent.coverImg" alt="">
            </div>

            <div class=" col-12  text-center  box ">
                <p class="m-2" v-if="activeEvent.isCanceled == true">
                    <marquee class="bg-danger text-dark fs-2 canceledBox" behavior="scrolling" direction="right"><i
                            class="mdi mdi-hazard-lights"></i>Canceled<i class="mdi mdi-hazard-lights"></i></marquee>
                </p>
                <p class=" text-light fs-3">{{ activeEvent.name }}</p>
                <p class=" text-light fs-3">{{ activeEvent.location }}</p>
                <p class="fs-4 text-light">{{ activeEvent.startDate.toLocaleDateString() }}</p>
                <p class="fs-5 text-light">{{ activeEvent.description }}</p>

            </div>

            <div class=" cold-12 text-center m-2">
                <button v-if="account.id == activeEvent.creator.id" @click="cancelEvent()"
                    class="btn btn-danger m-2">Cancel</button>
            </div>


            <div class="col-12 text-center bg-dark p-3">

                <button v-if="account.id" :disabled="activeEvent.isCanceled" @click="buyTicket()"
                    class="text-dark fs-3 p-1 btn btn-success text-center">
                    <i class="mdi mdi-ticket"></i>
                    <p>Buy Ticket</p>
                </button>
                <p class="text-success fs-3 my-2" v-if="ticketHolder">You have a ticket!</p>
                <p class="text-light fs-2 m-2">{{ activeEvent.capacity - activeEvent.ticketCount }}</p>

            </div>



            <p class="fs-4 text-center p-2">People Attending Event:</p>
            <div v-for="ticket in tickets" :key="ticket.id"
                class="col-12 col-md-3 m-3 d-flex justify-content-center align-items-center">
                <img class="rounded-circle boxbrdr" :src="ticket.profile.picture" alt="">
                <p class="text-center p-5 fs-3">{{ ticket.profile.name }}</p>
            </div>


            <button v-if="account.id" type="button" title="Open Post Form" data-bs-toggle="modal"
                data-bs-target="#commentModal"
                class=" col-5 m-5 btn btn-primary text-light d-flex justify-content-center">Post Comment</button>
            <div class="col-10 box">
                <p class="text-center fs-1">Comments:</p>


                <!-- Comment Template -->


                <div class="row justify-content-center">

                    <div v-for="comment in comments" :key="comment.id"
                        class="col-7 boxbrdr m-5 d-flex justify-content-between  bg-secondary">

                        <CommentCard :commentProp="comment" />
                    </div>


                </div>


            </div>

            <div class="m-5"></div>
        </div>
        <!-- comment Template -->


    </div>
    <CommentModal />
</template>


<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { useRoute } from 'vue-router';
import { logger } from '../utils/Logger';
import { eventsService } from '../services/EventsService';
import Pop from '../utils/Pop';
import { commentService } from '../services/CommentService';
import CommentCard from '../components/CommentCard.vue';
import CommentModal from '../components/CommentModal.vue';
import { ticketService } from '../services/TicketService';






export default {
    props: { eventProp: { type: Event, required: true } },

    setup() {
        onMounted(() => {
            getEventDetails();
            getCommentsByEventId();
            getTicketsOnEvent();
        });

        async function getCommentsByEventId() {
            try {
                const eventId = route.params.eventId;
                await commentService.getCommentsByEventId(eventId);
            }
            catch (error) {
                logger.error("Comment Id error", error);
                Pop.error("Comment Error", error.message);
            }
        }

        async function getTicketsOnEvent() {
            try {
                const eventId = route.params.eventId;
                await ticketService.getTicketsOnEvent(eventId)
            } catch (error) {
                Pop.error(error)
            }
        }

        const route = useRoute();
        async function getEventDetails() {
            const eventId = route.params.eventId;
            logger.log(eventId);
            await eventsService.getEventDetails(eventId);
        }
        return {
            account: computed(() => AppState.account),
            events: computed(() => AppState.events),
            activeEvent: computed(() => AppState.activeEvent),
            comments: computed(() => AppState.comments),
            tickets: computed(() => AppState.tickets),
            ticketHolder: computed(() => AppState.tickets.find((ticket) => ticket.accountId == AppState.account.id)),


            async buyTicket() {
                try {
                    const eventId = route.params.eventId
                    await ticketService.buyTicket(eventId);
                } catch (error) {
                    Pop.error(error)
                    logger.log(error)
                }
            },

            async cancelEvent() {
                try {


                    const yes = await Pop.confirm('are you sure you want to cancel?');

                    if (!yes) {
                        return;
                    }

                    const eventId = route.params.eventId;
                    await eventsService.getEventDetails(eventId)
                    logger.log(eventId)
                    await eventsService.destroyEvent(eventId)


                } catch (error) {
                    Pop.error(error)
                }
            }
        };
    },
    components: { CommentCard, CommentModal, }
}
</script>


<style lang="scss" scoped>
.boxImg {
    height: 40vh;
    width: 100%;
    object-fit: cover;
    object-position: center;
}


.boxbrdr {
    box-shadow: 0px 0px 15px white;
}


.box {
    border: 5px solid gray;
    background-color: black;
    box-shadow: 0px 0px 15px white;
}
</style>