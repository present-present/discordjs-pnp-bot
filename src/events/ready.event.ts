import { Client } from 'discord.js';
import { IEvent } from './ievent';

class Ready implements IEvent {
    name = 'ready';

    once = true;

    execute(client: Client) {
        console.log(`[Event] Ready: Logged in as ${client.user?.tag}`);
    }
}

export default new Ready();
