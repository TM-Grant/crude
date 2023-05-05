import { world } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";

world.events.entityHit.subscribe((data) => {
    const hit = data.hitEntity.typeId;
    const hitter = data.entity.typeId;
    if (hitter == "minecraft:player" && hit == "minecraft:player") {
        if (hit.hasTag("inSpawn") && hitter.hasTag("inSpawn")) {
            statsPage(hitter)
        }
    }
})

function statsPage(hitter) {
    let balance = metricNumbers(getScore(hit, "Money"));
    let kills = getScore(hit, "Kills");
    let deaths = getScore(hit, "Deaths");
    let hours = String(getScore(hit, "Hours")).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    let warns = getScore(hit, "Warnings");
    const form = new ActionFormData();
    form.title("${hit.name}(s) Stats");
    form.body(`§aMoney: §f$${balance}\n§dKills: §f${kills}\n§cDeaths: §f${deaths}\n§bHours: §f${hours}\n§eWarnings: §f${warns}`)
    form.button("§cClose")
    form.show(hitter).then((response) => {
    })
}