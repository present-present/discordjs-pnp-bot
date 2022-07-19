/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { CommandInteraction } from 'discord.js';

export default interface ICommand {
    name: string;
    description: string;
    data: any;
    execute(interaction: CommandInteraction): void;
}
