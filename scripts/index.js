import { system, world } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";

system.runInterval(() => {
    for (const player of world.getPlayers()) {
      let title = animation[getScore("animation", "Counters")];
      let balance = metricNumbers(getScore(player, "Balance"));
      let rebirths = metricNumbers(getScore(player, "Rebirths"));
      let kills = getScore(player, "Kills");
      let deaths = getScore(player, "Deaths");
      let kdr = (kills / (deaths === 0 ? 1 : deaths)).toFixed(2);
      let mined = metricNumbers(getScore(player, "Mined"));
      let hours = String(getScore(player, "Hours")).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      player.onScreenDisplay.setTitle(`§9§l${player.name}§r\n §fBalance: §a$${balance}§r\n §fRebirths: §d${rebirths}§r\n\n§9§lStatistics§r\n §fMined: §b${mined}§r\n §fHours: §e${hours}H§r\n §fKD Ratio: §c${kdr}§r\n\n§9§lSocials§r\n §fRealm: §bJG8rwHwx3_s§r\n §fDiscord: §bceQPkvrJpr§r\n\n §e§lGame§r §e§lVersion:§r §f2.0.0 §r`);
      player.nameTag = `§8[${getRanks(player).join("§8, ")}§8] §f${player.name}§r`;
    }
  });

const prefix = "+";
world.events.beforeChat.subscribe((data) => {
    const message = data.message;
    const player = data.sender;
    let balance = metricNumbers(getScore(player, "Balance"));
    let hours = String(getScore(player, "Hours")).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if (!startsWith(prefix)) {
        data.cancel = true;
        world.sendMessage(`§7[§a$${balance}] §7[§b${hours}] §e${player.name}: §f${message}`)
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

world.events.beforeItemUse.subscribe((data) => {
    const { source: player, item } = data;
    if (item.typeId !== "minecraft:clock" || player.typeId !== "minecraft:player")
        return;
    page1(player);
});

function page1(player) {
    const form = new ActionFormData();
    form.title("§dCrude §7GUI");
    form.body("§fMade By §9Discord(Grant#0444) §2Xbox(TM Grant)§r");
    form.button("Warps");
    form.show(player).then((response) => {
        if (response.selection == 0) {
            page2(player)
        }
    })
}
