import { Interaction } from 'discord.js';
import { IEvent } from './ievent';

class InteractionCreate implements IEvent {
    name = 'interactionCreate';

    once = false;

    execute(interaction: Interaction) {
        console.log(
            `[Event] ${interaction.user?.tag} in #${interaction.channel?.id} triggered interaction ${interaction}`
        );
    }
}

export default new InteractionCreate();
