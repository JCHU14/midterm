import { AppState } from "../AppState";
import { Event } from "../models/Event";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";




class EventsService{

    async getEvents(){
        const res = await api.get('api/events')
        logger.log(res.data)
        AppState.events = res.data.map((event) => new Event(event))
    }


    async createEvent(eventData) {
        const res = await api.post('api/events', eventData)
        logger.log('creating event', res.data)
        const newEvent = new Event(res.data)
        AppState.events.push(newEvent)
        return newEvent;
    }

    

    async getEventDetails(eventId) {
        AppState.activeEvent = null
        const res = await api.get(`api/events/${eventId}`)
        logger.log(res.data)
        AppState.activeEvent = new Event(res.data)
    }

    async destroyEvent(eventId) {
        const res = await api.delete(`api/events/${eventId}`);
        logger.log("event cancelled", res.data);
        AppState.activeEvent = new Event(res.data);
      
    }


}
export const eventsService = new EventsService();