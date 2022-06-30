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

commands = []

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

// login with token
client.login(token);
