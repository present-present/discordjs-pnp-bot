import { SlashCommandBuilder } from '@discordjs/builders';
import { ColorResolvable, CommandInteraction, MessageEmbed } from 'discord.js';
//settings
import settings from '@src/settings.json';
// types
import ICommand from '@src/commands/types/ICommand';
// errors
import throwErrorNeedsToBeDice from '@src/commands/roll.command/errors/needs-to-be-dice.error';
// functions
import RollCommandStringOption from '@src/commands/types/RollCommandStringOption';
import rollDice from '@src/commands/roll.command/functions/roll-dice';
import throwErrorNeedsToBeNumber from '@src/commands/roll.command/errors/needs-to-be-number.error';
import formatResultString from './functions/format-result-string';
import { resultTypes } from './resultTypes';

export default class Roll implements ICommand {
    name = 'roll';

    description = 'roll a dice like 3d6, you can add (de)buffs like +3 or -1d4';

    options: RollCommandStringOption[] = [
        {
            name: 'dice',
            description: 'roll a dice like 3D6 or 1D20',
            value: '',
            needsToBeDice: true,
            resultType: resultTypes.DEFAULT
        },
        {
            name: 'buff',
            description: 'wtf you rolling for that you need three diffrent dice types, may god be with you...',
            value: '',
            needsToBeDice: false,
            resultType: resultTypes.BUFF
        },
        {
            name: 'debuff',
            description: 'wtf you rolling for that you need three diffrent dice types, may god be with you...',
            value: '',
            needsToBeDice: false,
            resultType: resultTypes.DEBUFF
        },
    ];

    data = this.buildCommand();

    buildCommand() {
        const data = new SlashCommandBuilder().setName(this.name).setDescription(this.description);

        // because only first option is required
        data.addStringOption(stringOption =>
            stringOption.setName(this.options[0].name).setDescription(this.options[0].description).setRequired(true)
        );

        for (let i = 1; i < this.options.length; i++) {
            data.addStringOption(stringOption =>
                stringOption.setName(this.options[i].name).setDescription(this.options[i].description)
            );
        }

        return data;
    }

    async execute(interaction: CommandInteraction) {
        await interaction.deferReply();

        // fetch and process user input
        const optionsInput: RollCommandStringOption[] = this.options;

        interaction.options.data.forEach(option => {
            // process user input

            // get right index
            const index = optionsInput.findIndex(element => element.name === option.name) as number;
            // write processed value
            optionsInput[index].value = (option.value?.toString() as string).replace(/[d|w]/i, 'd').replace(' ', '');
        });

        let reply = '';
        let sum = 0;

        let results: number[] = []

        optionsInput.forEach(option => {
            // validate option

            // guard input does not be empty
            if (option.value.length === 0) {
                return;
            }

            const diceRegex = /^\d+[d]{1,1}\d+$/i; // regex as if string: number1 + 'd' + number2
            const isDice = diceRegex.test(option.value as string);

            const isFlatValue = /[0-9]/.test(option.value);

            // validate if dice is given when dice is required
            if (!isDice && option.needsToBeDice) {
                throwErrorNeedsToBeDice(interaction, option);
            }
            // validate if flat number when it isnt
            else if (!isDice && !isFlatValue) {
                throwErrorNeedsToBeNumber(interaction, option);
            }

            if (isDice) {
                const diceInput = option.value;

                const diceCount = Number(diceInput.substring(0, diceInput.indexOf('d')));
                const diceEyes = Number(diceInput.substring(diceInput.indexOf('d') + 1, diceInput.length));

                const diceResults = rollDice(diceCount, diceEyes);

                diceResults.forEach(result => {
                    results.push(result);

                    const prefix = `D${diceEyes}:`;
                    const formattedResult = formatResultString(prefix, result, option.resultType);
                    reply += formattedResult
                    sum += result;
                });
            } else {
                const result = Number(option.value)
                results.push(result)

                const prefix = 'flat:';
                const formattedResult = formatResultString(prefix, result, option.resultType);

                reply += formattedResult;
                sum += result;
            }
        });

        // add the sum of all options, when there is more than one option
        if (results.length > 1) {
            reply += `---------\n` + `Sum: ${sum}`;
        }

        const embed = new MessageEmbed().setColor(settings.colours.blurple as ColorResolvable).setTitle(`${interaction}`).setDescription(`\`\`\`${reply}\`\`\``);

        await interaction.editReply({ embeds: [embed] });
    }
}
