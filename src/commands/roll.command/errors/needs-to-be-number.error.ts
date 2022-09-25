import ErrorEmbed from '@src/commands/types/error-embed';
import { CommandInteraction } from 'discord.js';
import RollCommandStringOption from '../types/roll-command-string-options.interface';

export default async function throwErrorNeedsToBeNumber(
    interaction: CommandInteraction,
    option: RollCommandStringOption
): Promise<void> {
    const embed = ErrorEmbed.setDescription(
        `**The input for** \`${option.name}\` **needs to be a valid number, when you wanted to rever to a flat value\n` +
        'Like: `1`, `42`, `69`\n\n' +
        'Your input was:\n' +
        `\`\`\`${option.value}\`\`\``
    );

    await interaction.editReply({ embeds: [embed] });
}
