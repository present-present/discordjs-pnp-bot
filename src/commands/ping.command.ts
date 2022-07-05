import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import { ICommand } from './icommand';

class Ping implements ICommand {
    data = new SlashCommandBuilder().setName('ping').setDescription('Awnsers with Pong!');

    async execute(interaction: CommandInteraction) {
        await interaction.deferReply();
        await interaction.editReply('Pong!');
    }
}

export default new Ping();
