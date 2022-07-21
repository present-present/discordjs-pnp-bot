import CommandStringOption from './CommandStringOption';

export default class RollCommandStringOption extends CommandStringOption {
    public name!: string;

    public description!: string;

    public value!: string;

    public resultType!: any;

    public needsToBeDice!: boolean;
}
