import { ISkill, Skills } from "./skills.interface"
import { Statistics } from "./statistics.interface"

export interface IHomeland {
  name :"Northern Kingdoms" | "Nilfgaard" | "Elderlands",
}

export interface IOrigin {
  name :string,
  region :IHomeland,
  bonus :ISkill,
  roll :number | [number, number] | string
}

export const NorthernKingdoms :IHomeland = {
  name: "Northern Kingdoms"
}
export const Nilfgaard :IHomeland = {
  name: "Nilfgaard"
}
export const Elderlands :IHomeland = {
  name: "Elderlands"
}


const Redania :IOrigin = {
  name: "Redania",
  region: NorthernKingdoms,
  bonus: Skills.INT.Education,
  roll: 1
}

const Vicovaro :IOrigin = {
  name: "Vicovaro",
  region: Nilfgaard,
  bonus: Skills.INT.Education,
  roll: 1
}

const DolBlathanna :IOrigin = {
  name: "Dol Blathanna",
  region: Elderlands,
  bonus: Skills.INT.SocialEtiquette,
  roll: "Elf"
}
const Mahakam :IOrigin = {
  name: "Mahakam",
  region: Elderlands,
  bonus: null,
  roll: "Dwarf"
}

export const Origins = [
    Redania,

    Vicovaro,


    DolBlathanna, 
    Mahakam
]