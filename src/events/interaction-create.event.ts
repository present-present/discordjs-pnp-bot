import { Interaction } from 'discord.js';
import { Event } from './types/event.interface';

export default class InteractionCreateEvent implements Event {
    name = 'interactionCreate';

    once = false;

    execute(interaction: Interaction) {
        console.log(
            `[Event] ${interaction.user?.tag} in #${interaction.channel?.id} triggered interaction ${interaction}`
        );
    }
}
