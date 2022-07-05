// currently only used for development
// prod uses gobal commands
import { REST } from '@discordjs/rest';
import { Routes, RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/v9';
import dotenv from 'dotenv-safe';
import commands from './commands/commands';

dotenv.config();
const token: string = process.env.BOT_TOKEN as string;
const clientId: string = process.env.CLIENT_ID as string;

const commandsJSON: RESTPostAPIApplicationCommandsJSONBody[] = commands.map(command => command.data.toJSON());

const rest: REST = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationCommands(clientId), { body: commandsJSON })
    .then(() => console.log('[Info] Successfully registered application (/) guild commands.'))
    .catch(console.error);
