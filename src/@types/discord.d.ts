/*
 this file is to fix an error where client.commands is not found
 -> Property 'commands' does not exist on type 'Client<boolean>'
 probably has something to do with client.application.commands, but this here is a workaround
 https://stackoverflow.com/questions/69692224/ts-node-cannot-import-type-declaration-files
 https://stackoverflow.com/questions/69500556/discord-js-guide-property-commands-does-not-exist-on-type-clientboolean
*/
 import { Collection } from 'discord.js';

declare module 'discord.js' {
    export interface Client {
        /* eslint-disable-next @typescript-eslint/no-explicit-any */
        commands: Collection<unknown, any> = new Collection();
    }
}
