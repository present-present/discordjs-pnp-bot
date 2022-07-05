import dotenv from 'dotenv-safe';
import { Client, Intents, Collection } from 'discord.js';
import commands from './commands/commands';
import slashCommandHandler from './handler/command-handler';
import eventHandler from './handler/event-handler';

// getting token form enviroment variables
dotenv.config();
const token = process.env.BOT_TOKEN;

// creating a new client insatnce
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// register commands in client
client.commands = new Collection();
commands.forEach(command => client.commands.set(command.data.name, command));

slashCommandHandler(client);

eventHandler(client);

// login with token
client.login(token);
