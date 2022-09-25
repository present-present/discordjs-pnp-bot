import { ResultTypes } from '@src/commands/roll.command/types/result-types.enum';

export default function formatResultString(
    prefix: string,
    result: number,
    resultType: ResultTypes
): string {
    switch (resultType) {
        case ResultTypes.BUFF: {
            return `${prefix} +${result}\n`;
        }
        case ResultTypes.DEBUFF: {
            return `${prefix} -${result}\n`;
        }
        default: {
            return `${prefix} ${result}\n`;
        }
    }
}
