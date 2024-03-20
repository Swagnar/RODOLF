import { IStatistic, Statistics } from './statistics.interface'

export interface ISkill {
  name :string,
  description :string,
  statistics :IStatistic
  isHard: boolean
}


//***************************************************** */
//                    INTELLIGENCE                      */
//***************************************************** */
// Czujność
export const Awareness :ISkill = {
  name: "Awareness",
  description: " Noticing things or spotting abnormalities in your environment. At a base 10 you are a relatively aware person, noticing people walking by you and large changes in the environment. At a base 13 you arevery aware, noticing small changes in the environment and hearing an average person trying to be stealthy. At a base 16 youare acutely aware, able to pinpoint minute changes in your environment and rarely taken by surprise. At a base 20 you are hyper-aware and nearly nothing happens inyour environment without you noticing.Even invisible creatures have a hard time sneaking by you.",
  statistics: Statistics.INT,
  isHard: false,
}
// Interesy
export const Business :ISkill = {
  name: "Business",
  description: "Starting and operating a business. At a base 10 you can manage a basic lemonade stand. At a base 13 you could probably run a tavern and not go out of business. Ata base 16 you are a successful businessman who has probably run businesses in the past and rarely makes mistakes. At a base 20 you are a master of business, capable of running not just a business but a mercantile empire.",
  statistics: Statistics.INT,
  isHard: false,
}
// Dedukcja
export const Deduction :ISkill = {
  name: "Deduction",
  description: "The skill of deducing a conclusion from clues given to you. At a base 10 you often get hunches that point you in the right direction. At a base 13 your hunches are usually right and you can back them up with logical reasoning. At a base 16 you generally can find what has occurred or what may occur with only a few clues. At a base 20 your deductions are almost never wrongand you can find answers with the barest of clues.",
  statistics: Statistics.INT,
  isHard: false,
}
// Wykształcenie
export const Education :ISkill = {
  name: "Education",
  description: "The level of formal education you have received. At a base 10 you have basic knowledge, the amount you would get from a parent explaining the world to you. At a base 13 you probably mentored under someone or attended one of the few schools around where you lived. At a base 16 you collect knowledge, probably having gone to Oxenfurt or another such college. At a base 20 you are a highly educated individual who stumps college professors and mage advisors.",
  statistics: Statistics.INT,
  isHard: false,
}
// Wiedza o potworach
export const MonsterLore :ISkill = {
  name: "Monster Lore",
  description: "",
  statistics: Statistics.INT,
  isHard: true,
}
// Obycie
export const SocialEtiquette :ISkill = {
  name: 'Social Etiquette',
  description: 'Blending in at social functions and not making a fool of yourself in polite company. At a base 10 you know how to address nobility and can act properly when in a fancy neighborhood. At a base 13 you can attend social gatherings and not stick out like a sore thumb. At a base 16 you appear dashing — a cavalier, knowledgeable in all laws of society, fitting in with ease. At a base 20 you know even the unspoken rules of the highest courts and could probably impress the Emperor of Nilfgaard himself.',
  statistics: Statistics.INT,
  isHard: false
}
// Miastowy
export const Streetwise :ISkill = {
  name: 'Streetwise',
  description: ' Knowing the streets. This skill is less about knowing a geography and more about knowing how certain areas operate. At a base 10 you have enough knowledge to avoid muggers and know where the nice parts of a city are. At a base 13 you can generally pick up what factions hold sway in an area and why. At a base 16 you can glean a phenomenal amount about an area from studying it, identifying the important people in the city and their relationships with ease. At a base 20 you are able to assess a whole town easily, picking up enough to make you effectively a local.',
  statistics: Statistics.INT,
  isHard: false
}
// Strategia
export const Tactics :ISkill = {
  name: 'Tactics',
  description: 'Anticipating enemy movements and planning accordingly. At a base 10 you can figure out the basics of an untrained mob’s combat plan. At a base 13 you could probably lead a small battalion of men suc- cessfully and could rout an enemy force of equal size. At a base 16 you could be placed in charge of a mercenary band and be a ma- jor military force, adapting to all kinds of situations with knowledgeable leadership. At a base 20 you could be a full-on military general, leading whole armies with the tac- tical and strategic knowledge to win the day against even unspeakable odds.',
  statistics: Statistics.INT,
  isHard: true
}
// Nauczanie
export const Teaching :ISkill = {
  name: 'Teaching',
  description: 'The skill of explaining skills to others. This skill is not required to teach other skills, but it makes it a lot easier. At a base 10 you can walk a person through a ba- sic demonstration, though they may not al- ways understand. At a base 13 you can teach the basics of a skill to a diligent pupil with no issues. At a base 16 you could teach even uninterested students the higher levels of a skill with time. At a base 20 you are master of teaching and can connect with anyone. Your lessons immediately make sense and rarely ever have to be repeated.',
  statistics: Statistics.INT,
  isHard: false
}
// Sztuka przetrwania
export const WildernessSurvival :ISkill = {
  name: 'Wilderness Survival',
  description: 'Surviving outdoors and tracking prey. At a base 10 you know how to make a fire, what common plants are poisonous, and how to follow a trail. At a base 13 you could survive in the wilderness alone with some discomfort and you could earn a living hunting. At a base 16 you could be a hermit or a ranger, living in the wilder- ness with ease. At a base 20 you know almost everything about the wilderness. There’s no natural environment that you couldn’t adapt to and no prey that can avoid you',
  statistics: Statistics.INT,
  isHard: false
}

//***************************************************** */
//                      REFLEX                          */
//***************************************************** */
// Bójka
export const Brawling :ISkill = {
  name: 'Brawling',
  description: 'The skill of fighting hand to hand with fists, feet, and the like. At a base 10 you are a competent fist fighter and probably could win an average fight. At a base 13 you are a skilled fist fighter and will generally beat any common bar room brawler. At a base 16 you are very skilled at hand-to-hand combat. You know many techniques for physical combat and can beat even military combatants. At a base 20 you are a master of hand-to-hand combat and can beat almost anyone barehanded. You can even stand up against armed warriors.',
  statistics: Statistics.REF,
  isHard: false
}
// Zwinność
export const DodgeEscape :ISkill = {
  name: 'Dodge Escape',
  description: 'Dodging attacks and mis- siles and escaping from holds and grapples. At a base 10 you can dodge telegraphed at- tacks and escape from weak assailants. At a base 13 you can dodge a spear if you can see it coming and you know how to escape from basic holds. At a base 16 you can dodge mis- siles such as arrows and crossbow bolts if you can see them coming. At a base 20 you can dodge even things you aren’t completely aware of and can escape from all sorts of holds.',
  statistics: Statistics.REF,
  isHard: false
}
// Broń bitewna
export const Melee :ISkill = {
  name: 'Melee',
  description: 'Using weapons such as whips, bludg- eons, and axes. At a base 10 you can reliably wield melee weapons. At a base 13 you can swing an axe with enough skill to match professional soldiers. At a base 16 you can rival hardened veterans in melee combat. At a base 20 you are a master of melee who can take on multiple assailants at once.',
  statistics: Statistics.REF,
  isHard: false
}
// Jeździectwo
export const Riding :ISkill = {
  name: 'Riding',
  description: 'Riding horses, and in some cases riding other animals or even monsters. At a base 10 you can ride a trained horse and not fall off. At a base 13 you can ride well enough to jump small obstacles and race. At a base 16 you can handle wild horses and ride bareback without too much issue. At a base 20 you can do trick-riding and even attempt to ride more dangerous beasts',
  statistics: Statistics.REF,
  isHard: false
}
// Sailing
export const Sailing :ISkill = {
  name: 'Sailing',
  description: 'Sailing ships and controlling maritime vessels. At a base 10 you can sail in calm weather. At a base 13 you can handle rough weather and avoid obstacles with ease. At a base 16 you can maneuver in the open ocean and escape sirens and drowners. At a base 20 you can sail a ship through the most dangerous storms with minimal damage.',
  statistics: Statistics.REF,
  isHard: false
}
// Broń krótka
export const SmallBlades :ISkill = {
  name: 'Small Blades',
  description: 'Using light weapons such as daggers and cleavers. At a base 10 you can reliably wield small blades. At a base 13 you are a professional and can wield small blades with enough skill to match an assassin. At a base 16 you can rival hardened veterans in knife fights. At a base 20 you are a hardened veteran who can take on multiple assailants at once.',
  statistics: Statistics.REF,
  isHard: false
}
// Broń drzewcowa
export const StaffSpear :ISkill = {
  name: 'Staff Spear',
  description: 'Using long weapons such as staves, pole axes, and spears. At a base 10 you can reliably wield pole arms. At a base 13 you are a professional and can wield a pike with enough skill to match professional soldiers. At a base 16 you can face cavalry charges without flinching. At a base 20 you are a one-person wall of wood and steel',
  statistics: Statistics.REF,
  isHard: false
}
// Szermierka
export const Swordsmanship :ISkill = {
  name: 'Swordsmanship',
  description: 'Using swords. At a base 10 you can reliably wield swords. At a base 13 you are a professional and can take the field. At a base 16 you win most duels you fight. At a base 20 you are a hardened veteran who cuts a swath through the field.',
  statistics: Statistics.REF,
  isHard: false
}

//***************************************************** */
//                      DEXTERITY                       */
//***************************************************** */
// Łucznictwo
export const Archery :ISkill = {
  name: 'Archery',
  description: 'Firing a bow and arrow. At a base 10 you can string and fire a bow with some accuracy. At a base 13 you are as skilled as any battlefield archer and you can fire in combat with good accuracy. At a base 16 you can hit most targets and quickly make shots that most average archers would con- sider difficult. At a base 20 you are a master archer and you can hit almost any target, no matter the range or size',
  statistics: Statistics.DEX,
  isHard: false
}
// Atletyka
export const Athletics :ISkill = {
  name: 'Athletics',
  description: '',
  statistics: Statistics.DEX,
  isHard: false
}
// Kusznictwo
export const Crossbow :ISkill = {
  name: 'Crossbow',
  description: '',
  statistics: Statistics.DEX,
  isHard: false
}
// Zręczne Palce
export const SleightOfHand :ISkill = {
  name: 'Sleight Of Hand',
  description: '',
  statistics: Statistics.DEX,
  isHard: false
}
// Skrytość
export const Stealth :ISkill = {
  name: 'Stealth',
  description: '',
  statistics: Statistics.DEX,
  isHard: false
}

//***************************************************** */
//                        BODY                          */
//***************************************************** */
// Krzepa
export const Physique :ISkill = {
  name: 'Physique',
  description: '',
  statistics: Statistics.BODY,
  isHard: false
}
// Wytrzymałość
export const Endurance :ISkill = {
  name: 'Endurance',
  description: '',
  statistics: Statistics.BODY,
  isHard: false
}





// Proffesions defining skills
// TODO: Skill trees, how am I going to do them? 

// Mage
const MagicTraining :ISkill = {
  name: 'Magic Training',
  description: 'To qualify as a Mage a magically adept person must pass through the halls of one of the world’s magical academies and learn the fun- damentals of the magical arts. A Mage can roll Magical Training whenever they encounter a magical phenomenon, an unknown spell, or a question of magical theory. The DC is set by the GM, and a success allows the Mage to learn everything there is to know about the phenomenon. Magical Training can also be rolled as a form of Awareness that detects magical beings, spells, and hexes',
  statistics: Statistics.INT,
  isHard: false
}

// Witcher
const WitcherTraining :ISkill = {
  name: 'Witcher Training',
  description: '',
  statistics: Statistics.INT,
  isHard: false
}


export const Skills = {
  INT: {
    Awareness, Business, Deduction, Education, MonsterLore, SocialEtiquette, Streetwise, Tactics, WildernessSurvival
  },
  REF: {
    Brawling, DodgeEscape, Melee, Riding, Sailing, SmallBlades, StaffSpear, Swordsmanship
  },
  DEX: {
    Archery, Athletics, Crossbow, SleightOfHand, Stealth
  },
  BODY: {
    Physique, Endurance
  },
  EMP: {},
  CRA: {},
  WILL: {},
  LUCK: {}
}

export const DefiningSkills = {
  MagicTraining, WitcherTraining
}



// export const Teaching :ISkill = {}
// export const WildernessSurvival :ISkill = {}