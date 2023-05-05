import { system, world } from "@minecraft/server";

const overworld = world.getDimension("overworld");
const animation = [
    "§dCrude KitPvP§r",
    "§5C§drude KitPvP§r",
    "§fC§5R§dude KitPvP§r",
    "§5C§fr§5u§dde KitPvP§r",
    "§dC§5r§fu§5d§de KitPvP§r",
    "§dCr§5u§fd§5e §dKitPvP§r",
    "§dCru§5d§fe §5K§ditPvP§r",
    "§dCrud§5e §fK§5i§dtPvP§r",
    "§dCrude §5K§fi§5t§dPvP§r",
    "§dCrude K§5i§ft§5P§dvP§r",
    "§dCrude Ki§5t§fP§5v§dP§r",
    "§dCrude Kit§5P§fv§5P§r",
    "§dCrude KitP§5v§fP§r",
    "§dCrude KitPv§5P§r",
    "§dCrude KitPvP§r",
    "§dCrude KitPv§5P§r",
    "§dCrude KitP§5v§fP§r",
    "§dCrude Kit§5P§fv§5P§r",
    "§dCrude Ki§5t§fP§5v§dP§r",
    "§dCrude K§5i§ft§5P§dvP§r",
    "§dCrude §5K§fi§5t§dPvP§r",
    "§dCrud§5e §fK§5i§dtPvP§r",
    "§dCru§5d§fe §5K§ditPvP§r",
    "§dCr§5u§fd§5e §dKitPvP§r",
    "§dC§5r§fu§5d§de KitPvP§r",
    "§5C§fr§5u§dde KitPvP§r",
    "§fC§5R§dude KitPvP§r",
    "§5C§drude KitPvP§r",
    "§dCrude KitPvP§r",
]

system.runInterval(() => {
    for (const player of world.getPlayers()) {
        let title = animation[getScore("animation", "Counters")];
        let balance = metricNumbers(getScore(player, "Money"));
        let kills = getScore(player, "Kills");
        let deaths = getScore(player, "Deaths");
        let online = world.getAllPlayers().length;
        let members = metricNumbers(getScore(player, "members"));
        let hours = String(getScore(player, "Hours")).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        let warns = getScore(player, "Warnings");
        player.onScreenDisplay.setTitle(`§µ§l     ${title}§l\n\n §dPlayer Stats:\n §f| §9User:§f ${player.name}\n | §dMoney:§f $${balance}\n | §9K:§f ${kills} | §9D:§f ${deaths}\n | §dWarns:§f ${warns}/3\n | §9Time: §9H:§f ${hours}\n\n §dServer Stats:\n §f| §9Discord:§f MRDjdeDDbY\n | §dOnline: §f ${online} /11\n | §9Members: §f ${members}§r`)
        player.nameTag = `§8[${getRanks(player).join("§8, ")}§8] §f${player.name}§r`;
    }
});

system.runInterval(() => {
    overworld.runCommandAsync("scoreboard players add animation Counters 1");
    if (getScore("animation", "Counters") == 33)
        overworld.runCommandAsync("scoreboard players set animation Counters 0");
}, 4);

system.run(function tick() {
    for (const player of world.getPlayers()) {
        if (player.hasTag("sellgt")) {
            player.removeTag("sellgt");
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
    const amountFixed = metricNumbers(amount)
    player.runCommandAsync(`scoreboard players add @s Balance ${amount}`);
    player.sendMessage(`§8[§eKitPvP§8] §dYou sold §bx${item_count} §ditem(s) for §a$${amountFixed}§d.§r`);
}
