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

// Step 1
const NAME_OUTPUT = document.getElementById('name-output')
const AGE_OUTPUT = document.getElementById('age-output')
const RACE_OUTPUT = document.getElementById('race-output')
const PROFESSION_OUTPUT = document.getElementById('profession-output')
const ORIGIN_OUTPUT = document.getElementById('origin-output')


// Step 2
const FAMILY_STATE = document.getElementById('family-state')
const FAMILY_RADIO_ALIVE = <HTMLInputElement>document.getElementById('family-state-alive')
const FAMILY_RADIO_MISFORTUNE = <HTMLInputElement>document.getElementById('family-state-misfortune')

const ORIGIN_OUTPUT_2 = document.getElementById('origin-step2-output')
const ORIGIN_BONUS_OUTPUT = document.getElementById('origin-bonus-output')

// TODO: List of created characters
// const PLAYERS :Player[] = []

var PLAYER :Player

var ChosenRace :IRace  //wtf?
var ChosenProfession :IProfession
var ChosenOrigin :IOrigin

window.addEventListener('load', () => {
  initTags()
  
  var currentStep = 0

  STEPS[currentStep].hidden = false

  if(JSON.parse(localStorage.getItem('player')) == null) {
    // createPlayer()
  }
  
  ChosenRace = Races.find(r => r.name.toLowerCase() == RACES_TAG.value)
  ChosenProfession = Professions.find(prof => prof.name.toLowerCase() == PROFESSIONS_TAG.value)
  ChosenOrigin = Origins.find(o => o.name.toLowerCase() == ORIGINS_TAG.value)


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
  try {
    if(!ChosenRace) throw new Error('Invalid race selected')
    if(!ChosenProfession) throw new Error('Invalid profession selected')
    if(!ChosenOrigin) throw new Error('Invalid origin selected')


    PLAYER = new Player(
      NAME_TAG.value,
      Number(AGE_TAG.value),
      ChosenRace,      
      ChosenProfession, 
      ChosenOrigin
    )

    // PLAYERS.push(PLAYER)
    console.log(`Created new player!`, PLAYER)
  } catch(e) {
    console.error(e)
    alert(e.message)
  }
}

/**
 * Adds event listeners to HTML tags, runs functions that check what Professions 
 * and Origins are avaiable for selected race (deafult `<select>` value on boot).
 * Also, dispatches a `change` event that assigns objects from exported Arrays, to variables 
 * `ChosenRace`, `ChosenProfession` and `ChosenOrigin`
 */
function initTags(): void {
  Races.forEach(race => {
    let opt = document.createElement('option')
    opt.value = race.name.toLowerCase()
    opt.innerText = race.name
    RACES_TAG.append(opt)
  });

  RACES_TAG.addEventListener('change', (e) => {
    try {
      ChosenRace = Races.find(r => r.name.toLowerCase() == (e.target as HTMLSelectElement).value)
      if(ChosenRace) {
        RACE_OUTPUT.innerText = ChosenRace.name
        updateProfessionsOptions(ChosenRace.name)
        updateOriginsOptions(ChosenRace.name)
      } else {
        throw new ReferenceError('Something went wrong while selecting profession')
      }
    } catch(e) { console.error(e) }
  })

  PROFESSIONS_TAG.addEventListener('change', (e) => {
    try {
      ChosenProfession = Professions.find(prof => prof.name.toLowerCase() == (e.target as HTMLSelectElement).value)
      if(ChosenProfession) {
        PROFESSION_OUTPUT.innerText = ChosenProfession.name
      } else {
        throw new ReferenceError('Something went wrong while selecting profession')
      }
    } catch(e) { console.error(e) }
  })

  ORIGINS_TAG.addEventListener('change', (e) => {
    try {
      ChosenOrigin = Origins.find(o => o.name.toLowerCase() == (e.target as HTMLSelectElement).value)
      if(ChosenOrigin) {
        ORIGIN_OUTPUT.innerText = ChosenOrigin.name
        ORIGIN_OUTPUT_2.innerText = ChosenOrigin.name
        ORIGIN_BONUS_OUTPUT.innerText = ChosenOrigin.bonus.name
      } else {
        throw new ReferenceError('Something went wrong while selecting origin')
      }
    } catch (e) { console.error(e) }
  })


  NAME_TAG.addEventListener('input', () => { NAME_OUTPUT.innerText = NAME_TAG.value })
  AGE_TAG.addEventListener('input', () => { AGE_OUTPUT.innerText = AGE_TAG.value })
  
  
  document.getElementById('roll-family-state').addEventListener('click', () => {
    const roll = roll10() % 2 == 0 ? "even" : "odd"

    FAMILY_RADIO_ALIVE.checked = roll == "even"
    FAMILY_RADIO_ALIVE.disabled = roll == "odd" 

    FAMILY_RADIO_MISFORTUNE.checked = roll == "odd" 
    FAMILY_RADIO_MISFORTUNE.disabled = roll == "even" 
  })
  
  document.getElementById('create-hero-btn').addEventListener('click', () => {
    createPlayer()
  })

  updateProfessionsOptions(RACES_TAG.value)
  updateOriginsOptions(RACES_TAG.value)

  // When the app is rendered, use default values of each select tag and run change event
  // Why so? I wanted my ChosenX variables to be set during initial boot, but not with literals
  // I didn't want to initialize them with empty values. Or can I?
  Array(RACES_TAG, PROFESSIONS_TAG, ORIGINS_TAG).forEach(TAG => TAG.dispatchEvent(new Event('change')))
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
/**
 * Updates the Origins `<select>` tag, to that only avaiable origins and homelands for given race are shown
 * @param selectedOrigin name of the selected origin
 */
function updateOriginsOptions(selectedOrigin :string) :void{
  const unavaiableOrigins = unavaiableOriginsByRace[selectedOrigin.toLowerCase()] ?? []
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
  console.log(PLAYER)
  if(PLAYER == undefined) {
    alert("You can't advance further without creating a character first")
    return
  }
  if (currentStep >= 0 && currentStep < STEPS.length - 1) {
    STEPS[currentStep].style.display = "none"
    STEPS[currentStep + 1].style.display = "block"
  }
}
// 96% sure I'll get rid of this function
function syncCard() {
  NAME_OUTPUT.innerText = NAME_TAG.value
  AGE_OUTPUT.innerText = AGE_TAG.value
  RACE_OUTPUT.innerText = RACES_TAG.value
  PROFESSION_OUTPUT.innerText = PROFESSIONS_TAG.value
  ORIGIN_OUTPUT.innerText = ORIGINS_TAG.value
}
function roll20() :number { return Math.floor(Math.random() * 20) + 1 }
function roll10() :number { return Math.floor(Math.random() * 10) + 1 }
function syncPlayer() {}





