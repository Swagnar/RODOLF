import { Lifepath } from "./lifepath.interface"
import { IOrigin } from "./origins.interface"
import { IProfession } from "./professions.interface"
import { IRace } from "./races.interface"
import { ISkill, Skills } from "./skills.interface"

export interface IPlayer {
  name :string,
  age :number,
  race :IRace,
  sex :"Male" | "Female",
  profession :IProfession,
  origin: IOrigin,
  skills: ISkill[]
  lifepath?: Lifepath
}

export class Player implements IPlayer {

  skills :ISkill[]
  lifepath? :Lifepath
  
  constructor(
    public name :string,
    public age :number,
    public race :IRace,
    public sex :"Male" | "Female",
    public profession :IProfession,
    public origin :IOrigin,
  ) {
    this.skills = [
      Skills.INT.Awareness, 
      Skills.INT.Business, 
      Skills.INT.Deduction, 
      Skills.INT.Education, 
      Skills.INT.MonsterLore, 
      Skills.INT.SocialEtiquette, 
      Skills.INT.Streetwise, 
      Skills.INT.Tactics, 
      Skills.INT.WildernessSurvival,

      Skills.REF.Brawling,
      Skills.REF.DodgeEscape,
      Skills.REF.Melee,
      Skills.REF.Riding,
      Skills.REF.Sailing,
      Skills.REF.SmallBlades,
      Skills.REF.StaffSpear,
      Skills.REF.Swordsmanship,
      

    ]
  }
} 