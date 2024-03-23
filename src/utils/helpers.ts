import { Professions } from "../professions.interface"
import { IOrigin, Origins } from "../origins.interface"

const unavaiableProfessionsByRace :Record<string, string[]> = {
  "dwarf": ["witcher"],
  "elf": ["witcher"],
  "human": ["witcher"],
  "witcher": ["bard", "craftsman", "criminal", "doctor", "mage", "man at arms", "merchant", "priest"],
  "halfling": ["mage", "priest"]
}
const unavaiableOriginsByRace :Record<string, string[]> = {
  "human": ["dol blathanna", 'mahakam']
}

export function returnBlankOptionTag() :HTMLOptionElement{
  let opt = document.createElement('option')
  opt.disabled = true
  opt.selected = true
  opt.style.display = "none"
  return opt
}


/**
 * Updates the Profession `<select>` tag, to that only avaiable professions for given race are shown
 * @param selectedRace name of the selected race
 */
export function updateProfessionsOptions(professionsSelectTag :HTMLSelectElement, selectedRace :string) :void {
  const unavaiableProfessions = unavaiableProfessionsByRace[selectedRace.toLowerCase()] ?? []
  professionsSelectTag.innerHTML = ''
  professionsSelectTag.append(returnBlankOptionTag())
  Professions.forEach(prof => {
    if(!unavaiableProfessions.includes(prof.name.toLowerCase())) {
      let opt = document.createElement('option')
      opt.value = prof.name.toLowerCase()
      opt.innerText = prof.name
      professionsSelectTag.append(opt)
    }
  })
}

/**
 * Updates the Origins `<select>` tag, to that only avaiable origins and homelands for given race are shown.
 * Okay no, that's a lie
 * @param selectedOrigin name of the selected origin
 */
export function updateOriginsOptions(originsSelectTag :HTMLSelectElement, selectedOrigin :string) :void {
  const unavaiableOrigins = unavaiableOriginsByRace[selectedOrigin.toLowerCase()] ?? []
  originsSelectTag.innerHTML = ''
  originsSelectTag.append(returnBlankOptionTag())

  const originsByHomeland = Origins.reduce((acc, origin) => {
    if (!unavaiableOrigins.includes(origin.name.toLowerCase())) {
      acc[origin.region.name] = acc[origin.region.name] || [];
      acc[origin.region.name].push(origin);
    }
    return acc;
  }, {} as { [homelandName: string]: IOrigin[] });

  for(const homelandName in originsByHomeland) {
    let optgrp = document.createElement('optgroup')
    optgrp.label = homelandName
    originsByHomeland[homelandName].forEach((origin) => {
      let opt = document.createElement('option')
      opt.value = origin.name.toLowerCase()
      opt.innerText = origin.name
      optgrp.append(opt)
    })
    originsSelectTag.append(optgrp)
  }
}

