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

export function rising_embers() {
  var canvas = document.createElement('canvas'), 
      c = canvas.getContext('2d')

  var w = canvas.width = window.innerWidth,
      h = canvas.height = window.innerHeight;

  var particles = {},
      particleIndex = 0,
      particleNum = 30;

  canvas.id = "embers"
  document.body.prepend(canvas)

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
    window.requestAnimationFrame(loop)

    drawParticle();
  }

  loop()
}

