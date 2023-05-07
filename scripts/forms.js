import { system, world } from "@minecraft/server";
import { ModalFormData, ActionFormData } from "@minecraft/server-ui";
import { getScore } from "./functions"

world.events.beforeItemUse.subscribe((data) => {
    const item = data.item.typeId;
    const player = data.source;
    const player2 = data.source.typeId;
    if (item == "minecraft:clock" && player2 == "minecraft:player") {
        page1(player);
    }
})

function page1(player) {
    const form = new ActionFormData();
    form.title("§dCrude §8KitPvP§r");
    form.body("§eMade By: §fTM Grant§r");
    form.button("§9Warps§r\n§7[§bClick To View]");
    form.button("§dRules§r\n§7[§bClick To View]")
    form.button("§bCodes§r\n§7[§bClick To View]")
    form.button("§2Money Transfer§r\n§7[§bClick To Transfer]");
    form.button("§cClose§r\n§7[§bClick To Close]");
    form.show(player).then((response) => {
        if (response.selection == 0) {
            page2(player)
        }
        if (response.selection == 1) {
            player.addTag("rules");
        }
        if (response.selection == 2) {
            player.addTag("codes")
        }
        if (response.selection == 3) {
            page3(player)
        }
        if (response.selection == 4) {
            return;
        }
    })
}

function page2(player) {
    const form = new ActionFormData();
    form.title("§dCrude §8KitPvP§r");
    form.body("§eMade By: §fTM Grant§r");
    form.button("§6Spawn\n§7[§bClick To Teleport§7]")
    form.button("§6Vaults\n§7[§bClick To Teleport§7]")
    form.button("§6PvP\n§7[§bClick To Teleport§7]")
    form.button("§6Shop\n§7[§bClick To Teleport§7]")
    form.button("§6Crates\n§7[§bClick To Teleport§7]")
    form.show(player).then((response) => {
        if (response.selection == 0) {
            player.runCommandAsync("tp @s 0 4 0")
        }
        if (response.selection == 1) {
            player.runCommandAsync("tp @s -5000 4 -5000");
        }
        if (response.selection == 2) {
            player.runCommandAsync("tp @s 1000 34 1000")
        }
        if (response.selection == 3) {
            player.runCommandAsync("tp @s -1000 4 -1000")
        }
        if (response.selection == 4) {
            player.runCommandAsync("tp @s -3000 4 -3000")
        }
    })
}

async function page3(player) {
    const allPlayers = world.getAllPlayers().map((plr) => plr.name);
    const Balance = getScore(player, "money");
    const response = await new ModalFormData()
        .title("§2Money Transfer§r")
        .body(`§l§dGui made by TM Grant`)
        .dropdown("Select a Player", allPlayers)
        .textField(`Please insert the amount to transfer`, "Amount goes here...")
        .show(player).then((response) => {
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

system.runInterval(() => {
    for (const player of world.getPlayers()) {
        if (player.hasTag("rules")) {
            player.sendMessage("§dRules \n§f - No Clogging\n - No Hacking/Exploiting\n - No Small/invis Skins\n - No Spamming/Flooding Chat\n - No Drag, Auto Clicking, jitter clicking\n - No ip pulling/Threats\n - No Abusing Glitches if you report a reward will be granted\n - Max Teams of two\n - Anyone Can kill loot stealers\n - You can only kill people your tier\n - No body blocking\n - No lying to staff\n - No disrespecting staff\n - No kit swapping\n - keep your cps under 15§r")
        }
    }
})

system.runInterval(() => {
    for (const player of world.getPlayers()) {
        if (player.hasTag("codes")) {
            player.sendMessage("§cCodes§f\n - §dRealm Code: §fpFrsCHPkWTY\n - §9Discord: §fMRDjdeDDbY")
        }
    }
})