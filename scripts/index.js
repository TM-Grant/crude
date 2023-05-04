import { system, world } from "@minecraft/server";
import { ModalFormData, ActionFormData } from "@minecraft/server-ui";

const animation = [
    "§dCrude KitPvP",
    "§5C§drude KitPvP",
    "§fC§5R§dude KitPvP",
    "§5C§fr§5u§dde KitPvP",
    "§dC§5r§fu§5d§de KitPvP",
    "§dCr§5u§fd§5e §dKitPvP",
    "§dCru§5d§fe §5K§ditPvP",
    "§dCrud§5e §fK§5i§dtPvP",
    "§dCrude §5K§fi§5t§dPvP",
    "§dCrude K§5i§ft§5P§dvP",
    "§dCrude Ki§5t§fP§5v§dP",
    "§dCrude Kit§5P§fv§5P",
    "§dCrude KitP§5v§fP",
    "§dCrude KitPv§5P",
    "§dCrude KitPvP",
    "§dCrude KitPv§5P",
    "§dCrude KitP§5v§fP",
    "§dCrude Kit§5P§fv§5P",
    "§dCrude Ki§5t§fP§5v§dP",
    "§dCrude K§5i§ft§5P§dvP",
    "§dCrude §5K§fi§5t§dPvP",
    "§dCrud§5e §fK§5i§dtPvP",
    "§dCru§5d§fe §5K§ditPvP",
    "§dCr§5u§fd§5e §dKitPvP",
    "§dC§5r§fu§5d§de KitPvP",
    "§5C§fr§5u§dde KitPvP",
    "§fC§5R§dude KitPvP",
    "§5C§drude KitPvP",
    "§dCrude KitPvP",
]

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
        player.onScreenDisplay.setTitle(`     ${title}§9§l${player.name}§r\n §fBalance: §a$${balance}§r\n §fRebirths: §d${rebirths}§r\n\n§9§lStatistics§r\n §fMined: §b${mined}§r\n §fHours: §e${hours}H§r\n §fKD Ratio: §c${kdr}§r\n\n§9§lSocials§r\n §fRealm: §bJG8rwHwx3_s§r\n §fDiscord: §bceQPkvrJpr§r\n\n §e§lGame§r §e§lVersion:§r §f2.0.0 §r`);
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

async function page2(player) {
    const response = await new ModalFormData()
        .title("§dCrude §7GUI")
        .dropdown("Select A Player", allPlayers)
        .textField("Type an Amount", "Amount goes here...")
        .show(player)
        .then((response) => {
            const reciever = [response.formValues[0]];
            const sending = [response.formValues[1]];

        })
}

async function page5(player) {
    const allPlayers = world.getAllPlayers().map((plr) => plr.name);
    const Balance = getScore(player, "money");
    const response = await new ModalFormData()
        .title("§dCrude §eGUI §bMade by TM Grant")
        .dropdown("Select a Player", allPlayers)
        .textField(`Please insert the amount to transfer`, "Amount goes here...")
        .show(player)
        .then((response) => {
            if (response.canceled) return;
            const target = world
                .getAllPlayers()
                .find((plr) => plr.name === allPlayers[response.formValues[0]]);
            if (target.name === player.name)
                return player.sendMessage(
                    "§8[§eKitPvP§8] §cYou can't send Balance to yourself. Why would you need to?§r"
                );
            if (!target) return player.sendMessage("Player left the game!");
            const amount = parseInt(response.formValues[1]);
            if (isNaN(amount) || amount > Balance)
                return player.sendMessage("§8[§eKitPvP§8] §cInsufficient funds!§r");
            if (amount < 1)
                return player.sendMessage("§8[§eKitPvP§8] §cNegative value.§r");
            player.runCommandAsync(`scoreboard players remove @s money ${amount}`);
            target.runCommandAsync(`scoreboard players add @s money ${amount}`);
            player.sendMessage(
                `§8[§eKitPvP§8] §fYou have sent §a$${amount} §fto §b${target.name}§r`
            );
            target.sendMessage(
                `§8[§eKitPvP§8] §fYou have recieved §a$${amount} §ffrom §b${player.name}§r`
            );
        });
}
