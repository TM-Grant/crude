import { world } from "@minecraft/server";

world.events.entityDie.subscribe((data) => {
    const killer = data.damageSource;
    const killed = data.deadEntity.typeId
    const killed2 = data.deadEntity;
    if (killed == "minecraft:player") {
        killed2.runCommandAsync("scoreboard players add @s Deaths 1")
        killer.runCommandAsync("scoreboard players add @s Kills 1")
        killer.runCommandAsync("scoreboard players add @s killstreak 1")
        killed2.runCommandAsync("scoreboard players set @s killstreak 0")
        killer.sendMessage("§f§µ§l| +1 §4Kills\n§f| +200 §aMoney\n| +1 Killstreeak")
    }
})