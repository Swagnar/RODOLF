import { IProfession, Professions } from "./professions.interface"
import { IRace, Races } from "./races.interface"
import { IOrigin, NilfgaardHomeland, NorthernKingdomsHomeland, Origins } from "./origins.interface"
import { Player } from "./player.model"

import { returnBlankOptionTag, updateProfessionsOptions, updateOriginsOptions } from "./utils/helpers"
import { rising_embers } from "./utils/helpers"
import { roll20, roll10 } from "./utils/rolls"
import { NorthernKingdomsLifepath } from "./lifepath.interface"


const STEPS = Array.from(document.querySelectorAll('.step')).map(el => el as HTMLElement)
const NEXT_STEP_BTN = <HTMLButtonElement>document.getElementById('next-step-btn')
const PREV_STEP_BTN = <HTMLButtonElement>document.getElementById('prev-step-btn')

// Step 1
const NAME_TAG = <HTMLInputElement>document.getElementById('name-id')
const AGE_TAG = <HTMLInputElement>document.getElementById('age-id') 

const RACES_TAG = <HTMLSelectElement>document.getElementById('race-id')
const PROFESSIONS_TAG = <HTMLSelectElement>document.getElementById('profession-id')
const ORIGINS_TAG = <HTMLSelectElement>document.getElementById('origin-id')
const SEXES_TAG = document.querySelectorAll('input[type=radio][name=gender]')

// Step 2
const FAMILY_RADIO_ALIVE = <HTMLInputElement>document.getElementById('family-fate-alive')
const FAMILY_RADIO_MISFORTUNE = <HTMLInputElement>document.getElementById('family-fate-misfortune')

const ORIGIN_OUTPUT_2 = document.getElementById('origin-step2-output')
const ORIGIN_BONUS_OUTPUT = document.getElementById('origin-bonus-output')


// Results (right)
const NAME_OUTPUT = document.getElementById('name-output')
const AGE_OUTPUT = document.getElementById('age-output')
const RACE_OUTPUT = document.getElementById('race-output')
const SEX_OUTPUT = document.getElementById('gender-output')
const PROFESSION_OUTPUT = document.getElementById('profession-output')
const ORIGIN_OUTPUT = document.getElementById('origin-output')


// TODO: List of created characters
// const PLAYERS :Player[] = []

var PLAYER :Player

var ChosenRace :IRace  //wtf?
var ChosenProfession :IProfession
var ChosenOrigin :IOrigin
var ChosenSex :"Male" | "Female"

var currentStep = 0

window.addEventListener('load', () => {
  rising_embers()
  initTags()

  STEPS[currentStep].hidden = false

  // if(JSON.parse(localStorage.getItem('player')) == null) {
  //   createPlayer()
  // }

})

function createPlayer() {
  try {
    if(!ChosenRace) throw new Error('Invalid race selected')
    if(!ChosenProfession) throw new Error('Invalid profession selected')
    if(!ChosenOrigin) throw new Error('Invalid origin selected')
    if(!ChosenSex) throw new Error('Invalid sex selected')

    PLAYER = new Player(
      NAME_TAG.value,
      Number(AGE_TAG.value),
      ChosenRace,  
      ChosenSex,    
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
  RACES_TAG.append(returnBlankOptionTag())
  Races.forEach(race => {
    let opt = document.createElement('option')
    opt.value = race.name.toLowerCase()
    opt.innerText = race.name
    RACES_TAG.append(opt)
  });

  Array.prototype.forEach.call(SEXES_TAG, function(radio) {
    
    if(radio.checked) {radio.checked = false}
    radio.addEventListener('change', handleSexChange)
  })


  /**
   * @listens change When the player has chosen his avatar race, its interface is being searched for
   * in `Races` array. Races dictates what professions and Origins
   * @throws ReferenceError when races `<select>` tag has invalid `value`
   */
  RACES_TAG.addEventListener('change', (e) => {
    try {
      ChosenRace = Races.find(r => r.name.toLowerCase() == (e.target as HTMLSelectElement).value)
      if(ChosenRace) {
        RACE_OUTPUT.innerText = ChosenRace.name
        updateProfessionsOptions(PROFESSIONS_TAG, ChosenRace.name)
        updateOriginsOptions(ORIGINS_TAG, ChosenRace.name)
        PROFESSIONS_TAG.disabled = false
        ORIGINS_TAG.disabled = false
      } else {
        throw new ReferenceError('Something went wrong while selecting profession')
      }
    } catch(e) { console.error(e) }
  })
  /**
   * @listens change When the player has chosen his profession, display it, 
   * save it, show a image of this profession
   * @throws ReferenceError when professions `<select>` tag has invalid `value`
   */
  PROFESSIONS_TAG.addEventListener('change', (e) => {
    try {
      ChosenProfession = Professions.find(prof => prof.name.toLowerCase() == (e.target as HTMLSelectElement).value)
      
      if(ChosenProfession) {
        PROFESSION_OUTPUT.innerText = ChosenProfession.name;
        if(ChosenProfession.img) {
          (document.getElementById('profession-image-tag') as HTMLImageElement).src = ChosenProfession.img
        }
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


  // #1 Segfault of this app 
  NEXT_STEP_BTN.addEventListener('click', () => {
    if(PLAYER == undefined) {
      alert("You can't advance further without creating a character first")
      return
    }
    if(currentStep == STEPS.length - 1) {
      alert("You can't go any forwards")
      return
    }
    console.log(`nextStepEventListener <- przesłano ${currentStep}`)
    currentStep = nextStep(currentStep)
  })

  // #2 Segfault of this app
  PREV_STEP_BTN.addEventListener('click', () => {
    console.log(`prevStepEventListener <- przesłano ${currentStep}`)
    if(currentStep == 0) {
      alert("You can't go any backwards")
      return
    }
    currentStep = previousStep(currentStep)
  })

  // Me put name and age and its showing non stop, black magic
  NAME_TAG.addEventListener('input', () => { NAME_OUTPUT.innerText = NAME_TAG.value })
  AGE_TAG.addEventListener('input', () => { AGE_OUTPUT.innerText = AGE_TAG.value })
  
  
  // How to do such rolls, how to do that...
  document.getElementById('roll-family-fate').addEventListener('click', () => {
    const roll = roll10()

    const rollMod = roll % 2 == 0 ? "even" : "odd"

    FAMILY_RADIO_ALIVE.checked = rollMod == "even"
    FAMILY_RADIO_ALIVE.disabled = rollMod == "odd" 

    FAMILY_RADIO_MISFORTUNE.checked = rollMod == "odd" 
    FAMILY_RADIO_MISFORTUNE.disabled = rollMod == "even" 

    if(PLAYER.origin) {
      if(PLAYER.origin.homeland == NorthernKingdomsHomeland) {
        PLAYER.lifepath = NorthernKingdomsLifepath
        document.getElementById('family-fate-output').innerText = PLAYER.lifepath.getFamilyFate(roll).description
      }
    }
  })
  
  // ➕🧝 Button - creating a character
  document.getElementById('create-hero-btn').addEventListener('click', () => {
    createPlayer()
  })

  updateProfessionsOptions(PROFESSIONS_TAG, RACES_TAG.value)
  updateOriginsOptions(ORIGINS_TAG, RACES_TAG.value)
}

function previousStep(currentStep: number): number {
  if (currentStep > 0 && currentStep <= STEPS.length) {
    STEPS[currentStep].style.display = "none"
    STEPS[currentStep - 1].style.display = "block"
    return --currentStep
  }
}
function nextStep(currentStep: number): number {
  if (currentStep >= 0 && currentStep < STEPS.length - 1) {
    STEPS[currentStep].style.display = "none"
    STEPS[currentStep + 1].style.display = "block"
    return ++currentStep
  }
}

function handleSexChange(event) {
  ChosenSex = event.target.value
  SEX_OUTPUT.innerText = ChosenSex
}

function assignFamilyStatus(roll :number) {
  if(PLAYER.origin.homeland == NorthernKingdomsHomeland) {
    document.getElementById('family-state-output')
  }
  if(PLAYER.origin.homeland == NilfgaardHomeland) {

  }
}