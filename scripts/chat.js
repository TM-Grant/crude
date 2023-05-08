import { world } from "@minecraft/server";
import { getScore, metricNumbers } from "./functions";

const prefix = "+";
world.events.beforeChat.subscribe((data) => {
    const message = data.message;
    const player = data.sender;
    let balance = metricNumbers(getScore(player, "Balance"));
    let hours = String(getScore(player, "Hours")).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if (!message.startsWith(prefix)) {
        data.cancel = true;
        world.sendMessage(`§7[§a$${balance}§7] §7[§b${hours}§7] §r§e${player.name}: §f${message}§r`)
    }
    if (message.startsWith(prefix)) {
        data.cancel = true
        switch (message.substring(1).toLowerCase) {
            case "spawn":
                player.runCommandAsync("teleport @s 0 4 0");
                player.sendMessage("Teleported to Spawn");
                break;
            case "vaults":
                player.runCommandAsync("tp @s -5000 4 -5000");
                player.sendMessage("Teleported to Vaults");
                break;
            case "pvp":
                player.runCommandAsync("tp @s 1000 34 1000");
                player.sendMessage("Teleported to PvP");
                break;
            case "shop":
                player.runCommandAsync("tp @s -1000 4 -1000");
                player.sendMessage("Teleported to Shop");
                break;
            case "crates":
                player.runCommandAsync("tp @s -3000 4 -3000");
                player.sendMessage("Teleported to Crates");
                break;
            default: {
                player.sendMessage(`§bThe Command §7[§c${message}§7] §bis not a valid command\n Try §d+help §bin chat for more information§r`)
            }
        }
    }
    else {
        data.cancel = true;
        world.sendMessage(`§7[§a$${balance}§7] §7[§b${hours}§7] §r§e${player.name}: §f${message}§r`)
    }
})
