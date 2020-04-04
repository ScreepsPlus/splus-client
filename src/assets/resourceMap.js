/* Copied from screeps renderer demo */
/**
 * Created by vedi on 07/04/2017.
 */
const resourceMap = {
    berserk: 'berserk.svg',
    bodyPartBar: 'bodyPartBar.svg',
    // circle: 'circle.svg',
    'commander-lvl0': 'commander-lvl0.svg',
    'commander-lvl1': 'commander-lvl1.svg',
    'commander-lvl2': 'commander-lvl2.svg',
    'commander-lvl3': 'commander-lvl3.svg',
    'commander-lvl4': 'commander-lvl4.svg',
    constructedWall: 'constructedWall.svg',
    controller: 'controller.svg',
    'controller-level': 'controller-level.svg',
    'disrupt-source': 'disrupt-source.svg',
    cover: 'cover.svg',
    'creep-npc': 'creep-npc.svg',
    'creep-mask': 'creep-mask.png',
    defend: 'defend.svg',
    demolish: 'demolish.svg',
    disable: 'disable.svg',
    'disrupt-spawn': 'disrupt-spawn.svg',
    'disrupt-tower': 'disrupt-tower.svg',
    'disrupt-terminal': 'disrupt-terminal.svg',
    'drain-extension': 'drain-extension.svg',
    encourage: 'encourage.svg',
    exhaust: 'exhaust.svg',
    //'regenerate-mineral': 'regenerate-mineral.svg',
    //'regenerate-source': 'regenerate-source.svg',
    flag: 'flag.svg',
    'flag-secondary': 'flag-secondary.svg',
    'executor-lvl0': 'executor-lvl0.svg',
    'executor-lvl1': 'executor-lvl1.svg',
    'executor-lvl2': 'executor-lvl2.svg',
    'executor-lvl3': 'executor-lvl3.svg',
    'executor-lvl4': 'executor-lvl4.svg',
    extension: 'extension.svg',
    'extension-border50': 'extension-border50.svg',
    'extension-border100': 'extension-border100.svg',
    'extension-border200': 'extension-border200.svg',
    extractor: 'extractor.svg',
    'exit-left': 'exit-left.svg',
    'exit-top': 'exit-top.svg',
    'exit-bottom': 'exit-bottom.svg',
    'exit-right': 'exit-right.svg',
    flare1: 'flare1.png',
    flare2: 'flare2.png',
    flare3: 'flare3.png',
    'harvest-energy': 'harvest-energy.svg',
    'harvest-mineral': 'harvest-mineral.svg',
    'generate-ops': 'generate-ops.svg',
    glow: 'glow.png',
    ground: 'ground.png',
    'ground-mask': 'ground-mask.png',
    //'ground-mask2': 'ground-mask2.png',
    kill: 'kill.svg',
    lab: 'lab.svg',
    'lab-highlight': 'lab-highlight.svg',
    'lab-mineral': 'lab-mineral.svg',
    link: 'link.svg',
    'link-energy': 'link-energy.svg',
    'link-border': 'link-border.svg',
    'mass-repair': 'mass-repair.svg',
    noise1: 'noise1.png',
    noise2: 'noise2.png',
    nuke: 'nuke.svg',
    nuker: 'nuker.svg',
    'nuker-border': 'nuker-border.svg',
    'operate-extension': 'operate-extension.svg',
    'operate-lab': 'operate-lab.svg',
    'operate-observer': 'operate-observer.svg',
    'operate-spawn': 'operate-spawn.svg',
    'operate-storage': 'operate-storage.svg',
    'operate-terminal': 'operate-terminal.svg',
    'operate-tower': 'operate-tower.svg',
    'operator-lvl0': 'operator-lvl0.svg',
    'operator-lvl1': 'operator-lvl1.svg',
    'operator-lvl2': 'operator-lvl2.svg',
    'operator-lvl3': 'operator-lvl3.svg',
    'operator-lvl4': 'operator-lvl4.svg',
    powerBank: 'powerBank.svg',
    punch: 'punch.svg',
    rampart: 'rampart.svg',
    rectangle: 'rectangle.svg',
    reflect: 'reflect.svg',
    reinforce: 'reinforce.svg',
    'remote-transfer': 'remote-transfer.svg',
    renew: 'renew.svg',
    shield: 'shield.svg',
    sight: 'sight.svg',
    snipe: 'snipe.svg',
    storage: 'storage.svg',
    'storage-border': 'storage-border.svg',
    summon: 'summon.svg',
    tbd: 'tbd.svg',
    terminal: 'terminal.svg',
    'terminal-border': 'terminal-border.svg',
    'terminal-highlight': 'terminal-highlight.svg',
    'terminal-arrows': 'terminal-arrows.svg',
    'tombstone-border': 'tombstone-border.svg',
    'tombstone-resource': 'tombstone-resource.svg',
    tough: 'tough.svg',
    'tower-base': 'tower-base.svg',
    'tower-rotatable': 'tower-rotatable.svg',
}

for(const k in resourceMap) {
 resourceMap[k] = `/images/${resourceMap[k]}`
}  
const rescaleResources = [
    'bodyPartBar',
    'controller',
    'controller-level',
    'constructedWall',
    'creep-npc',
    'extension-border50',
    'extension-border100',
    'extension-border200',
    'extractor',
    'flag',
    'flag-secondary',
    'lab',
    'link',
    'link-border',
    'nuker',
    'nuker-border',
    'powerBank',
    'storage',
    'storage-border',
    'terminal-border',
    'terminal-arrows',
    'tombstone-border',
    'tombstone-resource',
    'tower-base',
]

module.exports = { resourceMap, rescaleResources }