import { SlashCommandBuilder } from '@discordjs/builders';
import { Message } from 'discord.js';
import { ICommand } from './icommand'

class Ping implements ICommand {
    data = new SlashCommandBuilder().setName('ping').setDescription("Awnsers with Pong!");

    async execute(interaction: Message) {
        await interaction.reply('Pong!');
    }
};

export default new Ping();