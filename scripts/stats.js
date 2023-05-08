import { world } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import { getScore, metricNumbers } from "./functions"

world.events.entityHit.subscribe((data) => {
    const hit = data.hitEntity;
    const hitter = data.entity;
    if (hit.hasTag("inSpawn") && hitter.hasTag("inSpawn")) {
        function statsPage(hitter) {
            let balance = metricNumbers(getScore(hit, "Money"));
            let kills = getScore(hit, "Kills");
            let deaths = getScore(hit, "Deaths");
            let kdr = (kills / (deaths === 0 ? 1 : deaths)).toFixed(2);
            let hours = String(getScore(hit, "Hours")).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            let minutes = getScore(player, "Minutes");
            let warns = getScore(hit, "Warnings");
            const form = new ActionFormData();
            form.title(`${hit.name}(s) Stats`);
            form.body(`§aMoney: §f$${balance}\n§dKills: §f${kills}\n§cDeaths: §f${deaths}\n§dK§cD§fR: §f${kdr}\n§bHours: §f${hours}H §f${minutes}M\n§eWarnings: §f${warns}`)
            form.button("§cClose")
            form.show(hitter).then((response) => {
                if (response.selection == 0) {
                    hitter.sendMessage("Closed GUI");
                }
            })
        }
    statsPage(hitter)
    }
})
