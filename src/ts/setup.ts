// Modules
// You can import script modules and have full type completion
import Greeter from '../components/Greeter/Greeter';

// Data
// Game data for registration
import ModData from '../data/data.json';
// import ModData2 from '../data/regularSpeedrunData.json';


// Styles
// Will automatically load your styles upon loading the mod
import '../css/styles.css';

// Images
// To bundle your mod's icon
import '../img/icon.png';
// Reference images using `ctx.getResourceUrl`
import LargeIcon from '../img/icon_large.png';
import { xpForLevel } from './xpTable';

const skills = [
  [game.attack, Attack],
  [game.strength, Strength],
  [game.defence, Defence],
  [game.hitpoints, Hitpoints],
  [game.ranged, Ranged],
  [game.altMagic, AltMagic],
  [game.prayer, Prayer],
  [game.slayer, Slayer],
  [game.farming, Farming],
  [game.woodcutting, Woodcutting],
  [game.fishing, Fishing],
  [game.firemaking, Firemaking],
  [game.cooking, Cooking],
  [game.mining, Mining],
  [game.smithing, Smithing],
  [game.thieving, Thieving],
  [game.fletching, Fletching],
  [game.crafting, Crafting],
  [game.herblore, Herblore],
  [game.agility, Agility],
  [game.summoning, Summoning],
  [game.runecrafting, Runecrafting],
  [game.astrology, Astrology],
] as const;


export async function setup(ctx: Modding.ModContext) {
  // Register our GameData
  await ctx.gameData.addPackage(ModData as any);

  ctx.onCharacterLoaded(() => {

    if (game.currentGamemode.namespace !== "reverse_xp_speedrun") return;

    if (game.attack.xp === 0 && game.completion.totalProgressBaseGame < 1) {
      console.log('Fresh Account');
      skills.forEach(s => {
        const skill = s[0];
        console.log(skill.name, skill.xp, skill.level);
        // skill.addXP(-(xpForLevel(100) - 1))
        skill.addXP(-(xpForLevel(98)) - 2)
        console.log(skill.name, skill.xp, skill.level);
      })
    }

    skills.forEach(s => {
      const [skill, SkillClass] = s;
      console.log("Patching", skill.name, skill.xp, skill.level);

      ctx.patch<typeof SkillClass, "level">(SkillClass, "level").get((original) => {
        // unclear why the level is one too hot, but it is
        const currentLevel = original() - 1;
        if (skill.xp < xpForLevel(currentLevel)) {
          console.log('downleveling ', skill.name);
          return currentLevel - 1;
        }
        return original();
      })

      // // if the xp is less than the amount for the level, perform the downlevel
      // ctx.patch(Fishing, "level").get((original) => {

      //   const currentLevel = original() - 1;
      //   if (game.fishing.xp < xpForLevel(currentLevel)) {
      //     console.log('downlevel fishing');
      //     return currentLevel - 1;
      //   }
      //   return original();
      // })
    })
  }
  )
}
    // Because we're loading our templates.min.html file via the manifest.json,
    // the templates aren't available until after the setup() function runs
    // ctx.onModsLoaded(() => {
    //   const root = document.createElement('div');
    //   ui.create(Greeter({ name: 'Melvor' }), root);

    //   sidebar.category('Modding').item('Mod Boilerplate', {
    //     icon: ctx.getResourceUrl('img/icon.png'),
    //     onClick() {
    //       open(ctx, root);
    //     },
    //   });
    // });


// function open(ctx: Modding.ModContext, html: HTMLElement) {
//   SwalLocale.fire({
//     iconHtml: `<img class="mbts__logo-img" src="${ctx.getResourceUrl(LargeIcon)}" />`,
//     title: ctx.name,
//     html,
  // });
// }
