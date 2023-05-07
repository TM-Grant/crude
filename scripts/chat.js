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
    else if (message.startsWith(prefix)) {
        data.cancel = true
        player.sendMessage("Commands Coming Soon")
        }
})
