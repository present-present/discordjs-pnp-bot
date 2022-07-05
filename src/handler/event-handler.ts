import { Client } from 'discord.js';
import events from '../events/events';

export default function eventHandler(client: Client) {
    events.forEach(event => {
        if (event.once) {
            client.once(event.name, listener => event.execute(listener));
        } else {
            client.on(event.name, listener => event.execute(listener));
        }
    });
}
