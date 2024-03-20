import { Professions } from "./professions.interface"
import { Races } from "./races.interface"

import { Player } from "./player.model"

const unavaiableProfessionsByRace :Record<string, string[]> = {
  "dwarf": ["witcher"],
  "elf": ["witcher"],
  "witcher": ["bard", "craftsman", "criminal", "doctor", "mage", "man at arms", "merchant", "priest"],
  "halfling": ["mage", "priest"]
}

const RACES_TAG = document.getElementById('race-id')
const PROFESSIONS_TAG = document.getElementById('profession-id')

// TODO: List of created characters
const PLAYERS :Player[] = []


const PLAYER :Player = JSON.parse(localStorage.getItem('player')) ?? {}

window.addEventListener('load', () => {
  // Professions.forEach(prof => {
  //   let opt = document.createElement('option')
  //   opt.value = prof.name.toLowerCase()
  //   opt.innerText = prof.name
  //   PROFESSIONS_TAG.append(opt)
  // })
  Races.forEach(race => {
    let opt = document.createElement('option')
    opt.value = race.name.toLowerCase()
    opt.innerText = race.name
    RACES_TAG.append(opt)
  });

  updateProfessionsOptions((RACES_TAG as HTMLInputElement).value)

  RACES_TAG.addEventListener('change', (e) => {
    const selectedRace = (e.target as HTMLSelectElement).value
    updateProfessionsOptions(selectedRace)
  })
})

function updateProfessionsOptions(selectedRace :string) {
  const unavaiableProfessions = unavaiableProfessionsByRace[selectedRace.toLowerCase()] ?? []
  PROFESSIONS_TAG.innerHTML = ''
  Professions.forEach(prof => {
    if(!unavaiableProfessions.includes(prof.name)) {
      let opt = document.createElement('option')
      opt.value = prof.name.toLowerCase()
      opt.innerText = prof.name
      PROFESSIONS_TAG.append(opt)
    }
  })


}