import { ISkill, Skills, DefiningSkills } from "./skills.interface"
import { IStatistic, Statistics } from "./statistics.interface"

export interface IProfession {
  name :string,
  definingSkill :ISkill,
  vigor :number,
  professionSkills :ISkill[],
  gear :string[],
  img? :string
}

export const Bard :IProfession = {
  name: "Bard",
  definingSkill: DefiningSkills.Busking,
  vigor: 0,
  professionSkills: [
    // charisma
    // deceit
    // performance
    // language
    // human perception
    // persuasion
    Skills.INT.Streetwise,
    // fine arts
    // seduction
    Skills.INT.SocialEtiquette
  ],
  gear: [],
}
export const Mage :IProfession = {
  name: "Mage",
  definingSkill: DefiningSkills.MagicTraining,
  vigor: 5,
  professionSkills: [
    // human perception
    // spell casting
    // hex weaving
    // resist magic
    Skills.REF.StaffSpear,
    Skills.INT.Education,
    // ritual crafting
    Skills.INT.SocialEtiquette,
    // seduction
    // grooming and style
  ],
  gear: [],
  img: "tmp/mage.jpg"
}
export const Witcher :IProfession = {
  name: "Witcher",
  definingSkill: DefiningSkills.WitcherTraining,
  vigor: 2,
  professionSkills: [
    Skills.INT.Awareness,
    Skills.INT.Deduction,
    //Spellcasting
    //Alchemy
    Skills.REF.DodgeEscape,
    Skills.INT.WildernessSurvival,
    Skills.REF.Swordsmanship,
    Skills.DEX.Athletics,
    Skills.DEX.Stealth,
    Skills.REF.Riding
  ],
  gear: [],
  img: "tmp/witcher.jpg"
}


export const Professions :IProfession[] = [
  Bard, Mage, Witcher
]
