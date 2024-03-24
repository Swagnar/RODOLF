import { ISkill, Skills } from "./skills.interface"
import { Statistics } from "./statistics.interface"

export interface IHomeland {
  name :"Northern Kingdoms" | "Nilfgaard" | "Elderlands",
}

export interface IOrigin {
  name :string,
  homeland :IHomeland,
  bonus :ISkill,
  roll :number | [number, number] | string
}

export const NorthernKingdomsHomeland :IHomeland = {
  name: "Northern Kingdoms"
}
export const NilfgaardHomeland :IHomeland = {
  name: "Nilfgaard"
}
export const ElderlandsHomeland :IHomeland = {
  name: "Elderlands"
}

//***************************************************** */
//                  NORTHERN KINGDOMS                   */
//***************************************************** */
const Redania :IOrigin = {
  name: "Redania",
  homeland: NorthernKingdomsHomeland,
  bonus: Skills.INT.Education,
  roll: 1
}
const Kaedwen :IOrigin = {
  name: "Kaedwen",
  homeland: NorthernKingdomsHomeland,
  bonus: Skills.BODY.Endurance,
  roll: 2
}
const Temeria :IOrigin = {
  name: "Temeria",
  homeland: NorthernKingdomsHomeland,
  bonus: Skills.EMP.Charisma,
  roll: 2
}
const Aedirn :IOrigin = {
  name: "Aedirn",
  homeland: NorthernKingdomsHomeland,
  bonus: Skills.BODY.Endurance,
  roll: 2
}
const LyriaAndRivia :IOrigin = {
  name: "Lyria & Rivia",
  homeland: NorthernKingdomsHomeland,
  bonus: Skills.BODY.Endurance,
  roll: 2
}
const KovirAndPoviss :IOrigin = {
  name: "Kovir & Poviss",
  homeland: NorthernKingdomsHomeland,
  bonus: Skills.INT.Business,
  roll: 2
}
const Skellige :IOrigin = {
  name: "Skellige",
  homeland: NorthernKingdomsHomeland,
  bonus: Skills.BODY.Endurance,
  roll: 2
}
const Cidaris :IOrigin = {
  name: "Cidaris",
  homeland: NorthernKingdomsHomeland,
  bonus: Skills.REF.Sailing,
  roll: 2
}
const Verden :IOrigin = {
  name: "Verden",
  homeland: NorthernKingdomsHomeland,
  bonus: Skills.INT.WildernessSurvival,
  roll: 2
}
const Cintra :IOrigin = {
  name: "Cintra",
  homeland: NorthernKingdomsHomeland,
  bonus: Skills.EMP.HumanPerception,
  roll: 2
}

const Vicovaro :IOrigin = {
  name: "Vicovaro",
  homeland: NilfgaardHomeland,
  bonus: Skills.INT.Education,
  roll: 1
}

const DolBlathanna :IOrigin = {
  name: "Dol Blathanna",
  homeland: ElderlandsHomeland,
  bonus: Skills.INT.SocialEtiquette,
  roll: "Elf"
}
const Mahakam :IOrigin = {
  name: "Mahakam",
  homeland: ElderlandsHomeland,
  bonus: null,
  roll: "Dwarf"
}

export const Origins = [
    Redania, Kaedwen, Temeria, Aedirn, LyriaAndRivia, KovirAndPoviss, Skellige, Cidaris, Verden, Cintra,

    Vicovaro,


    DolBlathanna, 
    Mahakam
]