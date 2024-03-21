import { IProfession, Professions } from "./professions.interface"
import { IRace, Races } from "./races.interface"
import { IOrigin, Origins } from "./origins.interface"
import { Player } from "./player.model"

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

const STEPS = Array.from(document.querySelectorAll('.step')).map(el => el as HTMLElement)
const NEXT_STEP_BTN = <HTMLButtonElement>document.getElementById('next-step-btn')
const PREV_STEP_BTN = <HTMLButtonElement>document.getElementById('prev-step-btn')

const NAME_TAG = <HTMLInputElement>document.getElementById('name-id')
const AGE_TAG = <HTMLInputElement>document.getElementById('age-id') 

const RACES_TAG = <HTMLSelectElement>document.getElementById('race-id')
const PROFESSIONS_TAG = <HTMLSelectElement>document.getElementById('profession-id')
const ORIGINS_TAG = <HTMLSelectElement>document.getElementById('origin-id')


const NAME_OUTPUT = document.getElementById('name-output')
const AGE_OUTPUT = document.getElementById('age-output')
const RACE_OUTPUT = document.getElementById('race-output')
const PROFESSION_OUTPUT = document.getElementById('profession-output')
const ORIGIN_OUTPUT = document.getElementById('origin-output')

// TODO: List of created characters
const PLAYERS :Player[] = []


// const PLAYER :Player = JSON.parse(localStorage.getItem('player')) ?? {}



window.addEventListener('load', () => {
  initTags()
  
  var currentStep = 0

  STEPS[currentStep].hidden = false

  if(JSON.parse(localStorage.getItem('player')) == null) {
    createPlayer()
  }

  

  
  
  NEXT_STEP_BTN.addEventListener('click', () => {
    nextStep(currentStep++)
  })
  PREV_STEP_BTN.addEventListener('click', () => {
    if(currentStep == 0) {
      alert("You can't go any backwards")
      return
    }
    previousStep(currentStep--)
  })

  syncCard()
})


function createPlayer() {

  const selectedRace       :IRace       = Races.find(race => race.name == capitalizedString(RACES_TAG.value))
  const selectedProfession :IProfession = Professions.find(prof => prof.name == String(PROFESSIONS_TAG.value.charAt(0).toUpperCase() + PROFESSIONS_TAG.value.slice(1)))
  const selectedOrigin     :IOrigin     = Origins.find(origin => origin.name == String(ORIGINS_TAG.value.charAt(0).toUpperCase() + ORIGINS_TAG.value.slice(1)))

  if(!selectedRace) throw new Error('Invalid race selected')
  if(!selectedProfession) throw new Error('Invalid profession selected')
  if(!selectedOrigin) throw new Error('Invalid origin selected')


  const PLAYER = new Player(
    NAME_TAG.value,
    Number(AGE_TAG.value),
    selectedRace,
    selectedProfession,
    selectedOrigin
  )

  PLAYERS.push(PLAYER)
  console.log(`Created new player!`, PLAYER)
}

function initTags() {
  Races.forEach(race => {
    let opt = document.createElement('option')
    opt.value = race.name.toLowerCase()
    opt.innerText = race.name
    RACES_TAG.append(opt)
  });
  RACES_TAG.addEventListener('change', (e) => {
    const selectedRace = (e.target as HTMLSelectElement).value
    RACE_OUTPUT.innerText = selectedRace
    updateProfessionsOptions(selectedRace)
    updateOriginsOptions(selectedRace)
  })
  PROFESSIONS_TAG.addEventListener('change', (e) => {
    const selectedProfession = (e.target as HTMLSelectElement).value
    PROFESSION_OUTPUT.innerText = selectedProfession
  })
  ORIGINS_TAG.addEventListener('change', (e) => {
    const selectedOrigin = (e.target as HTMLSelectElement).value
    ORIGIN_OUTPUT.innerText = selectedOrigin
  })
  NAME_TAG.addEventListener('input', () => { NAME_OUTPUT.innerText = NAME_TAG.value })
  AGE_TAG.addEventListener('input', () => { AGE_OUTPUT.innerText = AGE_TAG.value })
  
  document.getElementById('create-hero-btn').addEventListener('click', () => {
    createPlayer()
  })
  updateProfessionsOptions(RACES_TAG.value)
  updateOriginsOptions(RACES_TAG.value)
}

/**
 * Updates the Profession `<select>` tag, to that only avaiable professions for given race are shown
 * @param selectedRace name of the selected race
 */
function updateProfessionsOptions(selectedRace :string) :void{
  const unavaiableProfessions = unavaiableProfessionsByRace[selectedRace.toLowerCase()] ?? []
  PROFESSIONS_TAG.innerHTML = ''
  Professions.forEach(prof => {
    if(!unavaiableProfessions.includes(prof.name.toLowerCase())) {
      let opt = document.createElement('option')
      opt.value = prof.name.toLowerCase()
      opt.innerText = prof.name
      PROFESSIONS_TAG.append(opt)
    }
  })
  
  // Updates the rest of the tags during initial window boot
  const selectedProfession = PROFESSIONS_TAG.options[0].value
  PROFESSION_OUTPUT.innerText = selectedProfession
  const changeEvent = new Event('change')
  PROFESSIONS_TAG.dispatchEvent(changeEvent)
  
}
function updateOriginsOptions(selectedRace :string) :void{
  const unavaiableOrigins = unavaiableOriginsByRace[selectedRace.toLowerCase()] ?? []
  ORIGINS_TAG.innerHTML = ''
  Origins.forEach(origin => {
    if(!unavaiableOrigins.includes(origin.name.toLowerCase())) {
      let opt = document.createElement('option')
      opt.value = origin.name.toLowerCase()
      opt.innerText = origin.name
      ORIGINS_TAG.append(opt)
    }
  })
}




// utils
function previousStep(currentStep: number): void {
  if (currentStep > 0 && currentStep <= STEPS.length) {
    STEPS[currentStep].style.display = "none"
    STEPS[currentStep - 1].style.display = "block"
  }
}
function nextStep(currentStep: number): void {
  if (currentStep >= 0 && currentStep < STEPS.length - 1) {
    STEPS[currentStep].style.display = "none"
    STEPS[currentStep + 1].style.display = "block"
  }
}
function capitalizedString(value :string) :string{
  return String(value.charAt(0).toUpperCase() + value.slice(1))
}
function syncCard() {
  NAME_OUTPUT.innerText = NAME_TAG.value
  AGE_OUTPUT.innerText = AGE_TAG.value
  RACE_OUTPUT.innerText = RACES_TAG.value
  PROFESSION_OUTPUT.innerText = PROFESSIONS_TAG.value
  ORIGIN_OUTPUT.innerText = ORIGINS_TAG.value
}
function syncPlayer() {}





