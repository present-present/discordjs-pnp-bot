/* eslint-disable no-unused-vars */
import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

export interface ICommand {
    data: SlashCommandBuilder;
    execute(interaction: CommandInteraction): void;
}
