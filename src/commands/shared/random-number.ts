export default async function randomNumber(max: number): Promise<number> {
    return Math.floor(Math.random() * max + 1);
}
