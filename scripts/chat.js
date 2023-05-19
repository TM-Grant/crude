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


import { world } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { getScore } from "../functions";

world.events.beforeItemUse.subscribe((data) => {
    const item = data.item.typeId;
    const player2 = data.source.typeId;
    const player = data.source;
    if (item == "minecraft:wooden_pickaxe" && player2 == "minecraft:player") {
        page1(player)
    }
    if (item == "minecraft:gold_pickaxe" && player2 == "minecraft:player") {
        page1(player)
    }
    if (item == "minecraft:stone_pickaxe" && player2 == "minecraft:player") {
        page1(player)
    }
    if (item == "minecraft:iron_pickaxe" && player2 == "minecraft:player") {
        page1(player)
    }
    if (item == "minecraft:diamond_pickaxe" && player2 == "minecraft:player") {
        page1(player)
    }
    if (item == "minecraft:netherite_pickaxe" && player2 == "minecraft:player") {
        page1(player)
    }
    if (item == "minecraft:wooden_axe" && player2 == "minecraft:player") {
        page2(player)
    }
    if (item == "minecraft:golden_axe" && player2 == "minecraft:player") {
        page2(player)
    }
    if (item == "minecraft:stone_axe" && player2 == "minecraft:player") {
        page2(player)
    }
    if (item == "minecraft:iron_axe" && player2 == "minecraft:player") {
        page2(player)
    }
    if (item == "minecraft:diamond_axe" && player2 == "minecraft:player") {
        page2(player)
    }
    if (item == "minecraft:netherite_axe" && player2 == "minecraft:player") {
        page2(player)
    }
    if (item == "minecraft:wooden_shovel" && player2 == "minecraft:player") {
        page3(player)
    }
    if (item == "minecraft:golden_shovel" && player2 == "minecraft:player") {
        page3(player)
    }
    if (item == "minecraft:stone_shovel" && player2 == "minecraft:player") {
        page3(player)
    }
    if (item == "minecraft:iron_shovel" && player2 == "minecraft:player") {
        page3(player)
    }
    if (item == "minecraft:diamond_shovel" && player2 == "minecraft:player") {
        page3(player)
    }
    if (item == "minecraft:netherite_shovel" && player2 == "minecraft:player") {
        page3(player)
    }
    if (item == "minecraft:wooden_sword" && player2 == "minecraft:player") {
        page4(player)
    }
    if (item == "minecraft:golden_sword" && player2 == "minecraft:player") {
        page4(player)
    }
    if (item == "minecraft:stone_sword" && player2 == "minecraft:player") {
        page4(player)
    }
    if (item == "minecraft:iron_sword" && player2 == "minecraft:player") {
        page4(player)
    }
    if (item == "minecraft:diamond_sword" && player2 == "minecraft:player") {
        page4(player)
    }
    if (item == "minecraft:netherite_sword" && player2 == "minecraft:player") {
        page4(player)
    }
})

function page1(player) {
    const form = new ActionFormData();
    form.title("§aPickaxe §bEnchants§r")
    form.body("§fAfter clicking an enchant you will be sent to a new page and able to select an enchant")
    form.button("§dEfficiency");
    form.button("§dFortune");
    form.button("§dUnbreaking");
    form.button("§dMending");
    form.button("§cClose");
    form.show(player).then((response) => {
        if (response.selection == 0) {
            effPage(player);
        }
        if (response.selection == 1) {
            fortPage(player);
        }
        if (response.selection == 2) {
            unbPage(player);
        }
        if (response.selection == 3) {
            mendPage(player);
        }
        if (response.selection == 4) {
        }
    })
}

function page2(player) {
    const form = new ActionFormData();
    form.title("§aAxe §bEnchants§r")
    form.body("§fAfter clicking an enchant you will be sent to a new page and able to select an enchant")
    form.button("§dEfficiency");
    form.button("§dSharpness");
    form.button("§dUnbreaking");
    form.button("§dMending");
    form.button("§cClose");
    form.show(player).then((response) => {
        if (response.selection == 0) {
            effPage(player);
        }
        if (response.selection == 1) {
            sharpPage(player);
        }
        if (response.selection == 2) {
            unbPage(player);
        }
        if (response.selection == 3) {
            mendPage(player);
        }
        if (response.selection == 4) {
        }
    })
}

function page3(player) {
    const form = new ActionFormData();
    form.title("§aShovel §bEnchants§r")
    form.body("§fAfter clicking an enchant you will be sent to a new page and able to select an enchant")
    form.button("§dEfficiency");
    form.button("§dUnbreaking");
    form.button("§dMending");
    form.button("§cClose");
    form.show(player).then((response) => {
        if (response.selection == 0) {
            effPage(player);
        }
        if (response.selection == 1) {
            unbPage(player);
        }
        if (response.selection == 2) {
            mendPage(player);
        }
        if (response.selection == 3) {
        }
    })
}

function page4(player) {
    const form = new ActionFormData();
    form.title("§aSword §bEnchants§r")
    form.body("§fAfter clicking an enchant you will be sent to a new page and able to select an enchant")
    form.button("§dSharpness");
    form.button("§dFire Aspect");
    form.button("§dLooting");
    form.button("§dUnbreaking");
    form.button("§dKnockback");
    form.button("§dMending");
    form.button("§cClose");
    form.show(player).then((response) => {
        if (response.selection == 0) {
            sharpPage(player);
        }
        if (response.selection == 1) {
            faPage(player);
        }
        if (response.selection == 2) {
            lootPage(player);
        }
        if (response.selection == 3) {
            unbPage(player);
        }
        if (response.selection == 4) {
            kaPage(player);
        }
        if (response.selection == 5) {
            mendPage(player);
        }
    })
}

function effPage(player) {
    const money = getScore(player, "Balance")
    const form = new ActionFormData();
    form.title("§aEfficiency §bEnchants§r")
    form.button("§bEfficiency 1\n§8[§a$10,000§8]");
    form.button("§bEfficiency 2\n§8[§a$20,000§8]");
    form.button("§bEfficiency 3\n§8[§a$30,000§8]");
    form.button("§bEfficiency 4\n§8[§a$40,000§8]");
    form.button("§bEfficiency 5\n§8[§a$50,000§8]");
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

function fortPage(player) {
    const money = getScore(player, "Balance")
    const form = new ActionFormData();
    form.title("§aFortune §bEnchants§r")
    form.button("§bFortune 1\n§8[§a$25,000§8]");
    form.button("§bFortune 2\n§8[§a$50,000§8]");
    form.button("§bFortune 3\n§8[§a$75,000§8]");
    form.button("§cClose");
    form.show(player).then((response) => {
        if (response.selection == 0) {
            if (money >= 25000) {
                player.runCommandAsync("scoreboard players remove @s Balance 25000")
                player.runCommandAsync("enchant @s fortune 1")
                player.sendMessage("§eSkygen §8>> §fSucessfully enchanted with §dFortune 1")
            } else {
                player.sendMessage("§eSkygen §8>> §cYou do not have enough money to purchase §dFortune 1")
            }
        }
        if (response.selection == 1) {
            if (money >= 50000) {
                player.runCommandAsync("scoreboard players remove @s Balance 50000")
                player.runCommandAsync("enchant @s fortune 2")
                player.sendMessage("§eSkygen §8>> §fSucessfully enchanted with §dFortune 2")
            } else {
                player.sendMessage("§eSkygen §8>> §cYou do not have enough money to purchase §dFortune 2")
            }
        }
        if (response.selection == 2) {
            if (money >= 75000) {
                player.runCommandAsync("scoreboard players remove @s Balance 75000")
                player.runCommandAsync("enchant @s fortune 3")
                player.sendMessage("§eSkygen §8>> §fSucessfully enchanted with §dFortune 3")
            } else {
                player.sendMessage("§eSkygen §8>> §cYou do not have enough money to purchase §dFortune 3")
            }
        }
        if (response.selection == 3) {
        }
    })
}

function unbPage(player) {
    const money = getScore(player, "Balance")
    const form = new ActionFormData();
    form.title("§aUnbreaking §bEnchants§r")
    form.button("§bUnbreaking 1\n§8[§a$10,000§8]");
    form.button("§bUnbreaking 2\n§8[§a$20,000§8]");
    form.button("§bUnbreaking 3\n§8[§a$30,000§8]");
    form.button("§cClose");
    form.show(player).then((response) => {
        if (response.selection == 0) {
            if (money >= 10000) {
                player.runCommandAsync("scoreboard players remove @s Balance 10000")
                player.runCommandAsync("enchant @s unbreaking 1")
                player.sendMessage("§eSkygen §8>> §fSucessfully enchanted with §dUnbreaking 1")
            } else {
                player.sendMessage("§eSkygen §8>> §cYou do not have enough money to purchase §dUnbreaking 1")
            }
        }
        if (response.selection == 1) {
            if (money >= 20000) {
                player.runCommandAsync("scoreboard players remove @s Balance 20000")
                player.runCommandAsync("enchant @s unbreaking 2")
                player.sendMessage("§eSkygen §8>> §fSucessfully enchanted with §dUnbreaking 2")
            } else {
                player.sendMessage("§eSkygen §8>> §cYou do not have enough money to purchase §dUnbreaking 2")
            }
        }
        if (response.selection == 2) {
            if (money >= 30000) {
                player.runCommandAsync("scoreboard players remove @s Balance 30000")
                player.runCommandAsync("enchant @s unbreaking 3")
                player.sendMessage("§eSkygen §8>> §fSucessfully enchanted with §dUnbreaking 3")
            } else {
                player.sendMessage("§eSkygen §8>> §cYou do not have enough money to purchase §dUnbreaking 3")
            }
        }
        if (response.selection == 3) {
        }
    })
}

function mendPage(player) {
    const money = getScore(player, "Balance")
    const form = new ActionFormData();
    form.title("§aMending §bEnchants§r")
    form.button("§bMending 1\n§8[§a$100,000§8]");
    form.button("§cClose");
    form.show(player).then((response) => {
        if (response.selection == 0) {
            if (money >= 10000) {
                player.runCommandAsync("scoreboard players remove @s Balance 100000")
                player.runCommandAsync("enchant @s mending 1")
                player.sendMessage("§eSkygen §8>> §fSucessfully enchanted with §dMending 1")
            } else {
                player.sendMessage("§eSkygen §8>> §cYou do not have enough money to purchase §dMending 1")
            }
        }
        if (response.selection == 1) {
        }
    })
}

function sharpPage(player) {
    const money = getScore(player, "Balance")
    const form = new ActionFormData();
    form.title("§aSharpness §bEnchants§r")
    form.button("§bSharpness 1\n§8[§a$10,000§8]");
    form.button("§bSharpness 2\n§8[§a$20,000§8]");
    form.button("§bSharpness 3\n§8[§a$30,000§8]");
    form.button("§bSharpness 4\n§8[§a$40,000§8]");
    form.button("§bSharpness 5\n§8[§a$50,000§8]");
    form.button("§cClose");
    form.show(player).then((response) => {
        if (response.selection == 0) {
            if (money >= 10000) {
                player.runCommandAsync("scoreboard players remove @s Balance 10000")
                player.runCommandAsync("enchant @s sharpness 1")
                player.sendMessage("§eSkygen §8>> §fSucessfully enchanted with §dSharpness 1")
            } else {
                player.sendMessage("§eSkygen §8>> §cYou do not have enough money to purchase §dSharpness 1")
            }
        }
        if (response.selection == 1) {
            if (money >= 20000) {
                player.runCommandAsync("scoreboard players remove @s Balance 20000")
                player.runCommandAsync("enchant @s sharpness 2")
                player.sendMessage("§eSkygen §8>> §fSucessfully enchanted with §dSharpness 2")
            } else {
                player.sendMessage("§eSkygen §8>> §cYou do not have enough money to purchase §dSharpness 2")
            }
        }
        if (response.selection == 2) {
            if (money >= 30000) {
                player.runCommandAsync("scoreboard players remove @s Balance 30000")
                player.runCommandAsync("enchant @s sharpness 3")
                player.sendMessage("§eSkygen §8>> §fSucessfully enchanted with §dSharpness 3")
            } else {
                player.sendMessage("§eSkygen §8>> §cYou do not have enough money to purchase §dSharpness 3")
            }
        }

        if (response.selection == 3) {
            if (money >= 40000) {
                player.runCommandAsync("scoreboard players remove @s Balance 40000")
                player.runCommandAsync("enchant @s sharpness 4")
                player.sendMessage("§eSkygen §8>> §fSucessfully enchanted with §dSharpness 4")
            } else {
                player.sendMessage("§eSkygen §8>> §cYou do not have enough money to purchase §dSharpness 4")
            }
        }
        if (response.selection == 4) {
            if (money >= 50000) {
                player.runCommandAsync("scoreboard players remove @s Balance 50000")
                player.runCommandAsync("enchant @s sharpness 5")
                player.sendMessage("§eSkygen §8>> §fSucessfully enchanted with §dSharpness 5")
            } else {
                player.sendMessage("§eSkygen §8>> §cYou do not have enough money to purchase §dSharpness 5")
            }
        }
        if (response.selection == 5) {
        }
    })
}

function faPage(player) {
    const money = getScore(player, "Balance")
    const form = new ActionFormData();
    form.title("§aMending §bEnchants§r")
    form.button("§bMending 1\n§8[§a$100,000§8]");
    form.button("§cClose");
    form.show(player).then((response) => {
        if (response.selection == 0) {
            if (money >= 10000) {
                player.runCommandAsync("scoreboard players remove @s Balance 100000")
                player.runCommandAsync("enchant @s mending 1")
                player.sendMessage("§eSkygen §8>> §fSucessfully enchanted with §dMending 1")
            } else {
                player.sendMessage("§eSkygen §8>> §cYou do not have enough money to purchase §dMending 1")
            }
        }
        if (response.selection == 1) {
        }
    })
}

function lootPage(player) {
    const money = getScore(player, "Balance")
    const form = new ActionFormData();
    form.title("§aLooting §bEnchants§r")
    form.button("§bLooting 1\n§8[§a$25,000§8]");
    form.button("§bLooting 2\n§8[§a$50,000§8]");
    form.button("§bLooting 3\n§8[§a$75,000§8]");
    form.button("§cClose");
    form.show(player).then((response) => {
        if (response.selection == 0) {
            if (money >= 25000) {
                player.runCommandAsync("scoreboard players remove @s Balance 25000")
                player.runCommandAsync("enchant @s looting 1")
                player.sendMessage("§eSkygen §8>> §fSucessfully enchanted with §dLooting 1")
            } else {
                player.sendMessage("§eSkygen §8>> §cYou do not have enough money to purchase §dLooting 1")
            }
        }
        if (response.selection == 1) {
            if (money >= 50000) {
                player.runCommandAsync("scoreboard players remove @s Balance 50000")
                player.runCommandAsync("enchant @s looting 1")
                player.sendMessage("§eSkygen §8>> §fSucessfully enchanted with §dLooting 2")
            } else {
                player.sendMessage("§eSkygen §8>> §cYou do not have enough money to purchase §dLooting 2")
            }
        }
        if (response.selection == 2) {
            if (money >= 75000) {
                player.runCommandAsync("scoreboard players remove @s Balance 75000")
                player.runCommandAsync("enchant @s looting 3")
                player.sendMessage("§eSkygen §8>> §fSucessfully enchanted with §dLooting 3")
            } else {
                player.sendMessage("§eSkygen §8>> §cYou do not have enough money to purchase §dLooting 3")
            }
        }
        if (response.selection == 3) {
        }
    })
}

function kaPage(player) {
    const money = getScore(player, "Balance")
    const form = new ActionFormData();
    form.title("§aKnockback §bEnchants§r")
    form.button("§bKnockback 1\n§8[§a$25,000§8]");
    form.button("§bKnockback 2\n§8[§a$50,000§8]");
    form.button("§cClose");
    form.show(player).then((response) => {
        if (response.selection == 0) {
            if (money >= 25000) {
                player.runCommandAsync("scoreboard players remove @s Balance 25000")
                player.runCommandAsync("enchant @s knockback 1")
                player.sendMessage("§eSkygen §8>> §fSucessfully enchanted with §dKnockback 1")
            } else {
                player.sendMessage("§eSkygen §8>> §cYou do not have enough money to purchase §dKnockback 1")
            }
        }
        if (response.selection == 1) {
            if (money >= 50000) {
                player.runCommandAsync("scoreboard players remove @s Balance 50000")
                player.runCommandAsync("enchant @s knockback 1")
                player.sendMessage("§eSkygen §8>> §fSucessfully enchanted with §dKnockback 2")
            } else {
                player.sendMessage("§eSkygen §8>> §cYou do not have enough money to purchase §dKnockback 2")
            }
        }
        if (response.selection == 3) {
        }
    })
}
