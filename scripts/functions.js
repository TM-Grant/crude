import { world } from "@minecraft/server";

export function getRanks(player) {
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

export function getScore(target, objective, useZero = true) {
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

export function metricNumbers(value) {
    const types = ["", "k", "M", "B"];
    const selectType = (Math.log10(value) / 3) | 0;
    if (selectType == 0) return value;
    let scaled = value / Math.pow(10, selectType * 3);
    return scaled.toFixed(2) + types[selectType];
}