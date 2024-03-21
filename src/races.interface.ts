import { IStatistic, Statistics } from "./statistics.interface"
import { ISkill } from "./skills.interface"

interface IPerk {
  name :string,
  description :string
}

export interface IRace {
  name :string,
  perks :IPerk[]
}

class Race implements IRace {
  constructor(
    public name :string,
    public perks :IPerk[]
  ) {}
}

const Trustworthy :IPerk = {
  name: "Trustworthy",
  description: "In a world where non-humans can’t be trusted, humans look more trustworthy. Humans have an inherent +1 to their Charisma, Seduction, and Persuasion checks against other humans",
}
const Ingenuity :IPerk = {
  name: "Ingenuity",
  description: "Humans are clever and often have brilliant solutions to difficult problems. Humans gain an inherent +1 to Deduction"
}
const BlindlyStubborn :IPerk = {
  name: "Blindly Stubborn",
  description: "Part of the human race’s greatest strength is its willingness to charge forward endlessly, even into truly life-threatening situations. A human can summon up their courage and reroll a failed Resist Coercion or Courage roll 3 times per game session. They take the higher of the two rolls, but if they still fail they cannot re-use the ability to roll again."
}

export const Witcher = new Race('Witcher', [])
export const Elf = new Race('Elf', [])
export const Dwarf = new Race('Dwarf', [])
export const Human = new Race('Human', [Trustworthy, Ingenuity, BlindlyStubborn])

export const Races :IRace[] = [
  Witcher, Elf, Human, Dwarf
]

