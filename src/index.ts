import dotenv from 'dotenv-safe';
import { Client, Intents } from 'discord.js';

// getting token form enviroment variables
dotenv.config();
const token = process.env.BOT_TOKEN;

// creating a new client insatnce
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Log for Ready
client.once('ready', () => {
    console.log('Ready');
});

// login with token
client.login(token);
