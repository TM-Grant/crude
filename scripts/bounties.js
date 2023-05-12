import { Scoreboard, world } from "@minecraft/server";
import { FormResponse, ModalFormData } from "@minecraft/server-ui";

export async function bounties(player) {
    const allPlayers = world.getAllPlayers().map((plr) => plr.name);
    const response = await new ModalFormData()
        .title("")
        .dropdown("select a player to set a bounty on", allPlayers)
        .textField("amount", "enter an amount to set a bounty")
        .show(player).then((response) => {
            if (response.canceled) return;
            const target = world
                .getAllPlayers()
                .find((plr) => plr.name === allPlayers[response.formValues[0]]);
            if (target.name === player.name) {
                return player.sendMessage("§8[§eKitPvP§8] §cYou can't set a bounty on yourself. Why would you need to?§r"
                );
            }
            if (!target) {
                return player.sendMessage("Player left the game!");
            }
            const amount = parseInt(response.formValues[2]);
            if (isNaN(amount) || amount > Balance) {
                return player.sendMessage("§8[§eKitPvP§8] §cInsufficient funds!§r");
            }
            if (amount <= 0) {
                return player.sendMessage("§8[§eKitPvP§8] §cNegative value.§r");
            }
            player.sendMessage(`set a bounty for ${amount} on ${target}`);
            world.sendMessage(`${player.name} set a bounty for ${amount} on ${target}`);
            player.runCommandAsync(`scoreboard players remove @s Money ${amount}`);
            target.runCommandAsync(`scoreboard players remove @s Bounty ${amount}`);
        })
}