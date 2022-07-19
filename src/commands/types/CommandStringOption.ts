import ICommandStringOption from './ICommandStringOption';

export default class CommandStringOption implements ICommandStringOption {
    public name!: string;

    public value!: string;
}
