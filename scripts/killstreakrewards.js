import { system, world } from "@minecraft/server";
import { getScore } from "./functions";

system.runInterval(() => {
    for (const player of world.getPlayers()) {
        const killstreak = getScore(player, "killstreak")
        if (killstreak >= 10 && !player.hasTag("reached10Ks")) {
            world.sendMessage(`${player.name} Has reached a 10 killstreak and recieved $1,000`);
            player.runCommandAsync("scoreboard players add @s Money 1000")
            player.addTag("reached10Ks");
        }
    }
})