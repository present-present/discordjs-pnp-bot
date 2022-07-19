import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
// types
import ICommand from '../types/ICommand';
import CommandStringOptionRoll from '../types/RollCommandStringOption';
// errors
import throwErrorShouldBeDice from './errors/should-be-dice.error';
// functions
import randomNumber from '../shared/random-number';

class Roll implements ICommand {
    name = 'roll';

    description = 'roll a dice like 3d6, you can add (de)buffs like +3 or -1d4';

    options = {
        dice: {
            name: 'dice',
            description: 'roll a dice like 3D6 or 1D20',
        },
        diceTwo: {
            name: 'more-dice',
            description: 'add another dice type',
        },
        diceThree: {
            name: 'even-more-dice',
            description: 'wtf you rolling for that you need three diffrent dice types, may god be with you...',
        },
    };

    data = new SlashCommandBuilder()
        .setName(this.name)
        .setDescription(this.description)
        .addStringOption(option =>
            option.setName(this.options.dice.name).setDescription(this.options.dice.description).setRequired(true)
        )
        .addStringOption(option =>
            option.setName(this.options.diceTwo.name).setDescription(this.options.diceTwo.description)
        )
        .addStringOption(option =>
            option.setName(this.options.diceThree.name).setDescription(this.options.diceThree.description)
        );

    async execute(interaction: CommandInteraction) {
        await interaction.deferReply();

        // fetch and process user input
        const optionsInput: CommandStringOptionRoll[] = [];

        const diceRegex = /^\d+[d]{1,1}\d+$/i; // regex as if string: number1 + 'd' + number2

        interaction.options.data.forEach(_option => {
            // process user input
            const option = new CommandStringOptionRoll();

            option.name = _option.name?.toString();
            option.value = (_option.value?.toString() as string).replace(/[d|w]/i, 'd').replace(' ', '');
            // if user gave a dice
            option.isDice = diceRegex.test(option.value);

            // validate option
            // the name of the option needs to contain 'dice' to be handles as one
            if (/dice/i.test(option.name) && !option.isDice) {
                throwErrorShouldBeDice(interaction, option);
                return;
            }

            optionsInput.push(option);
        });

        let reply = '';
        optionsInput.forEach(async option => {
            let sum = 0;

            if (option.isDice) {
                const diceInput = option.value;
                const diceCount = Number(diceInput.substring(0, diceInput.indexOf('d')));
                const diceEyes = Number(diceInput.substring(diceInput.indexOf('d') + 1, diceInput.length));

                for (let i = 0; i < diceCount; i++) {
                    // eslint-disable-next-line no-await-in-loop
                    const result = await randomNumber(diceEyes);
                    reply += `D${diceEyes}: ${result}\n`;
                    sum += result;
                }
            } else {
                reply += `flat: ${option.value}\n`;
            }

            reply += `Sum: ${sum}`;
        });

        await interaction.editReply(reply);
    }
}

export default new Roll();
