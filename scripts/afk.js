import { system, world } from "@minecraft/server";
import { getScore } from "./functions";

system.runInterval(() => {
    for (const player of world.getPlayers()) {
        const velocity = player.getVelocity();
        if (velocity.x == 0 && velocity.y == 0 && velocity.z == 0) {
            player.runCommandAsync("scoreboard players add @s afkTimer 1")
        } else if (velocity.x != 0 || velocity.y != 0 || velocity.z != 0) {
            player.runCommandAsync("scoreboard players set @s afkTimer 0")
        }

        if (getScore(player, "afkTimer") >= 6001) {
            player.runCommandAsync("scoreboard players set @s afkTimer 0")
            world.sendMessage(`Kicked ${player.name} for being AFK`)
            player.runCommandAsync(`kick ${player.name} AFK`)
        }
    }
})
