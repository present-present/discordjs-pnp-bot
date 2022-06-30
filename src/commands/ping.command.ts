import { SlashCommandBuilder } from '@discordjs/builders';
import { Message } from 'discord.js';

export default class Ping {
    private data = new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!');

    private reply = 'Pong!';

    public async execute(interaction: Message) {
        await interaction.reply(this.reply);
    }
}