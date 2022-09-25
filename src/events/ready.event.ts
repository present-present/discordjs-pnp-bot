import { Client } from 'discord.js';
import { Event } from './types/event.interface';

export default class ReadyEvent implements Event {
    name = 'ready';

    once = true;

    execute(client: Client) {
        console.log(`[Event] Ready: Logged in as ${client.user?.tag}`);
    }
}
