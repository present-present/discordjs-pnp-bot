import { ColorResolvable, MessageEmbed } from 'discord.js';
// config
import settings from '../../settings.json';

const ErrorEmbed = new MessageEmbed();
ErrorEmbed.setColor(settings.colours.red as ColorResolvable).setTitle(
    '❌  Error'
);

export default ErrorEmbed;
