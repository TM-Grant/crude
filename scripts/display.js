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
    if (getScore("animation", "Counters") == 29)
        overworld.runCommandAsync("scoreboard players set animation Counters 0");
}, 4);
