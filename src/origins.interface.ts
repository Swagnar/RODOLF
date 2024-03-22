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

//***************************************************** */
//                  NORTHERN KINGDOMS                   */
//***************************************************** */
const Redania :IOrigin = {
  name: "Redania",
  region: NorthernKingdoms,
  bonus: Skills.INT.Education,
  roll: 1
}
const Kaedwen :IOrigin = {
  name: "Kaedwen",
  region: NorthernKingdoms,
  bonus: Skills.BODY.Endurance,
  roll: 2
}
const Temeria :IOrigin = {
  name: "Temeria",
  region: NorthernKingdoms,
  bonus: Skills.EMP.Charisma,
  roll: 2
}
const Aedirn :IOrigin = {
  name: "Aedirn",
  region: NorthernKingdoms,
  bonus: Skills.BODY.Endurance,
  roll: 2
}
const LyriaAndRivia :IOrigin = {
  name: "Lyria & Rivia",
  region: NorthernKingdoms,
  bonus: Skills.BODY.Endurance,
  roll: 2
}
const KovirAndPoviss :IOrigin = {
  name: "Kovir & Poviss",
  region: NorthernKingdoms,
  bonus: Skills.INT.Business,
  roll: 2
}
const Skellige :IOrigin = {
  name: "Skellige",
  region: NorthernKingdoms,
  bonus: Skills.BODY.Endurance,
  roll: 2
}
const Cidaris :IOrigin = {
  name: "Cidaris",
  region: NorthernKingdoms,
  bonus: Skills.REF.Sailing,
  roll: 2
}
const Verden :IOrigin = {
  name: "Verden",
  region: NorthernKingdoms,
  bonus: Skills.INT.WildernessSurvival,
  roll: 2
}
const Cintra :IOrigin = {
  name: "Cintra",
  region: NorthernKingdoms,
  bonus: Skills.EMP.HumanPerception,
  roll: 2
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
    Redania, Kaedwen, Temeria, Aedirn, LyriaAndRivia, KovirAndPoviss, Skellige, Cidaris, Verden, Cintra,

    Vicovaro,


    DolBlathanna, 
    Mahakam
]