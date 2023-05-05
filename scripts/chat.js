import { world } from "@minecraft/server";

const prefix = "+";
world.events.beforeChat.subscribe((data) => {
    const message = data.message;
    const player = data.sender;
    let balance = metricNumbers(getScore(player, "Balance"));
    let hours = String(getScore(player, "Hours")).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if (!message.startsWith(prefix)) {
        data.cancel = true;
        world.sendMessage(`§7[§a$${balance}§7] §7[§b${hours}§7] §e${player.name}: §f${message}`)
    }
    else if (message.startsWith(prefix)) {
        data.cancel = true
        player.sendMessage("Commands Coming Soon")
        }
})
