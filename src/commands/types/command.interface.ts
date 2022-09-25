import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

export default interface Command {
    name: string;
    description: string;
    data: SlashCommandBuilder;
    execute(interaction: CommandInteraction): void;
}
