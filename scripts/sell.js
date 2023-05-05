import { system, world } from "@minecraft/server";

system.run(function tick() {
    for (const player of world.getPlayers()) {
        if (player.hasTag("sell")) {
            player.removeTag("sell");
            sell_items(player);
        }
    }
    system.run(tick);
});

function sell_items(player) {
    let sellable_items = {
        "minecraft:ghast_tier": 25,
        "minecraft:nether_star": 80,
        "minecraft:fire_charge": 125,
        "minecraft:lily_pad": 250,
        "minecraft:ender_eye": 250,
        "minecraft:coal": 17,
        "minecraft:raw_iron": 30,
        "minecraft:raw_gold": 50,
        "minecraft:diamond": 100,
        "minecraft:emerald": 150,
        "minecraft:nether_quartz": 25
    }
}

const inventory = player.getComponent("inventory").container,
    { size } = inventory;
const void_slot = undefined;
let amount = 0;
let item_count = 0;
for (let i = 0; i < size; i++) {
    const item = inventory.getItem(i);
    if (!item) continue;
    const item_price = sellable_items[item.typeId];
    if (!item_price) continue;
    amount += item_price * item.amount;
    item_count += item.amount;
    inventory.setItem(i, void_slot);
}
if (item_count < 1) {
    player.sendMessage('§8[§eKitPvP§8] §cYou have no items to sell.§r');
    return;
}
if (item_count >= 1) {
    player.runCommandAsync(`scoreboard players add @s Balance ${amount}`);
    player.sendMessage(`§8[§eKitPvP§8] §dYou sold §bx${item_count} §ditem(s) for §a$${amount}§d.§r`);
}
