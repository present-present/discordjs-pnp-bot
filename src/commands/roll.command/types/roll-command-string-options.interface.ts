import CommandStringOption from '@src/commands/types/command-string-option.interface';
import { ResultTypes } from './result-types.enum';

export default interface RollCommandStringOption extends CommandStringOption {
    name: string;
    description: string;
    value: string;
    needsToBeDice: boolean;
    resultType: ResultTypes;
}
