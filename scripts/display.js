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
        let online = getScore(player, "online");
        let members = metricNumbers(getScore(player, "Members"));
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

const prefix = "+";
world.events.beforeChat.subscribe((data) => {
    const message = data.message;
    const player = data.sender;
    let balance = metricNumbers(getScore(player, "Money"));
    let hours = String(getScore(player, "Hours")).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if (!message.startsWith(prefix)) {
        data.cancel = true;
        world.sendMessage(`§7[§a$${balance}§7] §7[§b${hours}H§7] §e${player.name}: §f${message}`)
    }
})


function getRanks(player) {
    let rank_prefix = "rank:";
    let default_rank = "§fMember§r";
    const ranks = player
        .getTags()
        .map((tags) => {
            if (!tags.startsWith(rank_prefix)) return null;
            return tags
                .substring(rank_prefix.length)
                .replace("§k", "")
                .replace("§l", "")
                .replace("§o", "") //§r
        })
        .filter((tag) => tag);
    return ranks.length == 0 ? [default_rank] : ranks;
}

function getScore(target, objective, useZero = true) {
    try {
        const oB = world.scoreboard.getObjective(objective);
        if (typeof target == "string")
            return oB.getScore(
                oB.getParticipants().find((pT) => pT.displayName == target)
            );
        return oB.getScore(target.scoreboard);
    } catch {
        return useZero ? 0 : NaN;
    }
}


function metricNumbers(value) {
    const types = ["", "k", "M", "B"];
    const selectType = (Math.log10(value) / 3) | 0;
    if (selectType == 0) return value;
    let scaled = value / Math.pow(10, selectType * 3);
    return scaled.toFixed(2) + types[selectType];
}