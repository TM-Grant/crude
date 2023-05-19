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


function effPage(player) {
    const money = getScore(player, "Balance")
    const form = new ActionFormData();
    form.title("§aEfficiency §bEnchants§r")
    form.button("§bEfficiency 1");
    form.button("§bEfficiency 2");
    form.button("§bEfficiency 3");
    form.button("§bEfficiency 4");
    form.button("§bEfficiency 5");
    form.button("§cClose");
    form.show(player).then((response) => {
        if (response.selection == 0) {
            if (money >= 10000) {
                player.runCommandAsync("scoreboard players remove @s Balance 10000")
                player.runCommandAsync("enchant @s efficiency 1")
                player.sendMessage("§eSkygen §8>> §fSucessfully enchanted with §dEfficiency 1")
            } else {
                player.sendMessage("§eSkygen §8>> §cYou do not have enough money to purchase §dEfficiency 1")
            }
        }
        if (response.selection == 1) {
            if (money >= 20000) {
                player.runCommandAsync("scoreboard players remove @s Balance 20000")
                player.runCommandAsync("enchant @s efficiency 2")
                player.sendMessage("§eSkygen §8>> §fSucessfully enchanted with §dEfficiency 2")
            } else {
                player.sendMessage("§eSkygen §8>> §cYou do not have enough money to purchase §dEfficiency 2")
            }
        }
        if (response.selection == 2) {
            if (money >= 30000) {
                player.runCommandAsync("scoreboard players remove @s Balance 30000")
                player.runCommandAsync("enchant @s efficiency 3")
                player.sendMessage("§eSkygen §8>> §fSucessfully enchanted with §dEfficiency 3")
            } else {
                player.sendMessage("§eSkygen §8>> §cYou do not have enough money to purchase §dEfficiency 3")
            }
        }
        
        if (response.selection == 3) {
            if (money >= 40000) {
                player.runCommandAsync("scoreboard players remove @s Balance 40000")
                player.runCommandAsync("enchant @s efficiency 4")
                player.sendMessage("§eSkygen §8>> §fSucessfully enchanted with §dEfficiency 4")
            } else {
                player.sendMessage("§eSkygen §8>> §cYou do not have enough money to purchase §dEfficiency 4")
            }
        }
        if (response.selection == 4) {
            if (money >= 50000) {
                player.runCommandAsync("scoreboard players remove @s Balance 50000")
                player.runCommandAsync("enchant @s efficiency 5")
                player.sendMessage("§eSkygen §8>> §fSucessfully enchanted with §dEfficiency 5")
            } else {
                player.sendMessage("§eSkygen §8>> §cYou do not have enough money to purchase §dEfficiency 5")
            }
        }
        if (response.selection == 5) {
        }
    })   
}
