import { resultTypes } from "@src/commands/roll.command/resultTypes";

export default function formatResultString(prefix: string, result: number, resultType: any): string {
    
    console.log(typeof resultType);

    switch(resultType) {
        case resultTypes.BUFF: {
            return `${prefix} +${result}\n`;
            break;
        }
        case resultTypes.DEBUFF: {
            return `${prefix} -${result}\n`;
            break;
        }
        default: {
            return `${prefix} ${result}\n`;
        }
      } 
}