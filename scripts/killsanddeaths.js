import { world, Player, EntityHealthComponent } from "@minecraft/server";

world.events.entityHurt.subscribe(
  ({ hurtEntity, damageSource }) => {
    const health = hurtEntity.getComponent("health");
    if (health.current > 0) return;
    hurtEntity.runCommandAsync("scoreboard players add @s Deaths 1");
    hurtEntity.runCommandAsync("scoreboard players set @s killstreak 0");
    hurtEntity.removeTag("reached10Ks");
    if (!(damageSource.damagingEntity instanceof Player)) return;
    damageSource.damagingEntity.runCommandAsync("scoreboard players add @s Kills 1");
    damageSource.damagingEntity.runCommandAsync("scoreboard players add @s killstreak 1");
    damageSource.damagingEntity.runCommandAsync("effect @s instant_health 1 100");
    damageSource.damagingEntity.sendMessage("§f§µ§l| +1 §4Kills\n§f| +200 §aMoney\n|§f +1 §dKillstreak");
  },
  { entityTypes: ["minecraft:player"] }
);
