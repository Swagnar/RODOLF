import { ISkill, Skills } from "./skills.interface"
import { Statistics } from "./statistics.interface"

interface IOrigin {
  name :string,
  region :"Northern Kingdoms" | "Nilfgaard" | "Elderlands",
  bonus :ISkill,
  roll :number | [number, number] | string
}

const Redania :IOrigin = {
  name: "Redania",
  region: "Northern Kingdoms",
  bonus: Skills.INT.Education,
  roll: 1
}

const Vicovaro :IOrigin = {
  name: "Vicovaro",
  region: "Nilfgaard",
  bonus: Skills.INT.Education,
  roll: 1
}

const DolBlathanna :IOrigin = {
  name: "Dol Blathanna",
  region: "Elderlands",
  bonus: Skills.INT.SocialEtiquette,
  roll: "Elf"
}

export const Origins = {
  NorthernKingdoms: {
    Redania
  },
  Nilfgaard: {
    Vicovaro
  },
  Elderlands: {

  }
}