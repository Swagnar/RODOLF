import { IProfession, Professions } from "./professions.interface"
import { IRace, Races } from "./races.interface"
import { IOrigin, Origins } from "./origins.interface"
import { Player } from "./player.model"

import { returnBlankOptionTag, updateProfessionsOptions, updateOriginsOptions } from "./utils/helpers"
import { roll20, roll10 } from "./utils/rolls"


const STEPS = Array.from(document.querySelectorAll('.step')).map(el => el as HTMLElement)
const NEXT_STEP_BTN = <HTMLButtonElement>document.getElementById('next-step-btn')
const PREV_STEP_BTN = <HTMLButtonElement>document.getElementById('prev-step-btn')

// Step 1
const NAME_TAG = <HTMLInputElement>document.getElementById('name-id')
const AGE_TAG = <HTMLInputElement>document.getElementById('age-id') 

const RACES_TAG = <HTMLSelectElement>document.getElementById('race-id')
const PROFESSIONS_TAG = <HTMLSelectElement>document.getElementById('profession-id')
const ORIGINS_TAG = <HTMLSelectElement>document.getElementById('origin-id')


// Step 2
const FAMILY_STATE = document.getElementById('family-state')
const FAMILY_RADIO_ALIVE = <HTMLInputElement>document.getElementById('family-state-alive')
const FAMILY_RADIO_MISFORTUNE = <HTMLInputElement>document.getElementById('family-state-misfortune')

const ORIGIN_OUTPUT_2 = document.getElementById('origin-step2-output')
const ORIGIN_BONUS_OUTPUT = document.getElementById('origin-bonus-output')


// Results (right)
const NAME_OUTPUT = document.getElementById('name-output')
const AGE_OUTPUT = document.getElementById('age-output')
const RACE_OUTPUT = document.getElementById('race-output')
const PROFESSION_OUTPUT = document.getElementById('profession-output')
const ORIGIN_OUTPUT = document.getElementById('origin-output')


// TODO: List of created characters
// const PLAYERS :Player[] = []

var PLAYER :Player

var ChosenRace :IRace  //wtf?
var ChosenProfession :IProfession
var ChosenOrigin :IOrigin

var currentStep = 0

window.addEventListener('load', () => {

  var canvas = document.createElement('canvas'), 
      c = canvas.getContext('2d')

  var w = canvas.width = window.innerWidth,
      h = canvas.height = window.innerHeight;

  var particles = {},
      particleIndex = 0,
      particleNum = 30;

  canvas.id = 'embers'
  function particle() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height/3+h*2/3-100;
    this.vx = Math.random() * 10 - 5;
    this.vy = Math.random() * 10 - 5;
    this.gravity = 0.3;
    particleIndex++;
    particles[particleIndex] = this;
    this.id = particleIndex;
    this.life = 0;
    this.maxLife = Math.random() * 90;
    this.shadeR = Math.floor(Math.random() * 255+150) + 50;
    this.shadeG = Math.floor(Math.random() * 150) + 50;
    this.shadeB = Math.floor(Math.random() * 0);
    this.color = 'rgba(' + this.shadeR + ',' + this.shadeG + ',' + this.shadeB + ',' + Math.random() * 0.7 + ')';
    this.size = Math.random() * 3;
  }

  particle.prototype.draw = function() {
    this.x += this.vx;
    this.y += this.vy;
    if (Math.random() < 0.1) {
      this.vx = Math.random() * 10 - 5;
      this.vy = -2;
    }
  
    this.life++;
    if (this.life >= this.maxLife) {
      delete particles[this.id];
    }
  
    c.beginPath();
    c.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
    c.fillStyle = this.color;
    c.fill();
  };

  function drawParticle() {
    c.clearRect(0, 0,w,h);
     for (let i = 0; i < particleNum; i++) {
       new particle();
     }
     for (let i in particles) {
       particles[i].draw();
     }
   }

   window.requestAnimationFrame = (function() {
    return window.requestAnimationFrame ||
      function(callback) {
        window.setTimeout(callback, 1000 / 60);
        return 1
      };
  })();

  function loop() {

    window.requestAnimationFrame(loop);
  
    drawParticle();
  }
  
  loop();


  initTags()


  
  
  
  document.body.prepend(canvas)



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
  RACES_TAG.append(returnBlankOptionTag())
  Races.forEach(race => {
    let opt = document.createElement('option')
    opt.value = race.name.toLowerCase()
    opt.innerText = race.name
    RACES_TAG.append(opt)
  });



  /**
   * @listens change When the player has chosen his avatar race, its interface is being searched for
   * in `Races` array. Races dictates what professions and Ori
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

  NEXT_STEP_BTN.addEventListener('click', () => {
    nextStep(currentStep)
  })
  PREV_STEP_BTN.addEventListener('click', () => {
    if(currentStep == 0) {
      alert("You can't go any backwards")
      return
    }
    previousStep(currentStep)
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

  updateProfessionsOptions(PROFESSIONS_TAG, RACES_TAG.value)
  updateOriginsOptions(ORIGINS_TAG, RACES_TAG.value)
}

function previousStep(currentStep: number): void {
  console.log(`<- przesłano ${currentStep}`)
  if (currentStep > 0 && currentStep <= STEPS.length) {
    STEPS[currentStep].style.display = "none"
    STEPS[currentStep - 1].style.display = "block"
    currentStep--
  }
}
function nextStep(currentStep: number): void {
  console.log(`-> przesłano ${currentStep}`)

  if(PLAYER == undefined) {
    alert("You can't advance further without creating a character first")
    return
  }
  if (currentStep >= 0 && currentStep < STEPS.length - 1) {
    STEPS[currentStep].style.display = "none"
    STEPS[currentStep + 1].style.display = "block"
    currentStep++
  }
}







