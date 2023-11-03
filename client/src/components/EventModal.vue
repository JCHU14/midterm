<template>
    <div class="modal fade" id="eventModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div class="modal-body">
                    <form @submit.prevent="createEvent()">



                        <div class="mb-3">
                            <label for="coverUrl" class="form-label">coverImg</label>
                            <input v-model="editable.coverImg" type="url" class="form-control" id="coverImg" maxlength="500"  required>
                        </div>

                        <div class="mb-3">
                            <label for="name" class="form-label">name</label>
                            <input v-model="editable.name" type="text" class="form-control" id="name" maxlength="500"  required>
                        </div>

                        <div class="mb-3">
                            <label for="location" class="form-label">location</label>
                            <input v-model="editable.location" type="text" class="form-control" id="location" maxlength="500"  required>
                        </div>

                        <div class="mb-3">
                            <label for="capacity" class="form-label">capacity</label>
                            <input v-model="editable.capacity" type="number" class="form-control" id="capacity" maxlength="500"  required>
                        </div>

                        <div class="mb-3">
                            <label for="startDate" class="form-label">Start Date</label>
                            <input v-model="editable.startDate" type="date" class="form-control" id="startDate" maxlength="500"  required>
                        </div>

                        
                        <div class="mb-3">
                            <label for="type" class="form-label">Type</label>
                            <select  required v-model="editable.type" class="form-select" name="" id="">
                                <option :value="type" v-for="type in types" :key="type">
                            {{ type }}
                            </option>
                            </select>
                            </div>
                            
                            <div class="mb-3">
                                <label for="description" class="form-label">description</label>
                                <textarea v-model="editable.description" maxlength="500" class="form-control" id="description" required
                                    rows="3"></textarea>
                            </div>



                        <div class="text-end">
                            <button class="btn btn-success" type="submit">Submit</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    </div>
</template>


<script>
import { ref } from 'vue';
import { Modal } from 'bootstrap';
import Pop from '../utils/Pop.js';
import { eventsService } from '../services/EventsService.js';
import { useRouter } from 'vue-router';
import { logger } from '../utils/Logger';


export default {
    setup() {
        const editable = ref({})
        const types = ["sport", "digital", "concert", "convention"];
        const router = useRouter();
        return {
            editable,
            types,
            async createEvent() {
                try {
                    const eventData = editable.value
                    const event = await eventsService.createEvent(eventData)
                    logger.log('Here is the event!', event)
                    Pop.success('event created!')
                    editable.value = {};

                    Modal.getOrCreateInstance('#eventModal').hide()
                    router.push({ name: "EventDetails", params: { eventId: event.id } });
                } catch (error) {
                    Pop.error(error)
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped></style>