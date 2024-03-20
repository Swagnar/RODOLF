import { IProfession } from "./professions.interface"
import { IRace } from "./races.interface"

export interface Player {
  name :string,
  age :number,
  race :IRace,
  profession :IProfession
}