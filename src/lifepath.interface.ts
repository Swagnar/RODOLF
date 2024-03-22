import { IHomeland, NorthernKingdoms as NK } from "./origins.interface"
import { IStatistic, Statistics } from "./statistics.interface"

export interface IFate {
  roll :number,
  description :string,
}
export interface IFamilyStatus {
  roll :number,
  title :string,
  description :string,
  startingGear :string
}
export interface IFriend {
  roll :number,
  title :string,
  description :string,
  startingGear :string
}
export interface IStartingGear {
  name :string,
  stat? :IStatistic,
  party? :IFriend | number,

}

export class Lifepath {
  constructor(
    public readonly homeland :IHomeland,
    public readonly familyFates :IFate[],
    public readonly parentalFates :IFate[],
    public readonly familyStatuses :IFamilyStatus[],
    public readonly influentialFriends :IFriend[]
  ) {}

  
  /**
   * 
   * @param roll Random integer btween 1 and 10 (d10 dice)
   * @returns Family Fate with corresponding `roll` value as the method argument 
   * @throws Error when the `roll` is not a valid integer between 1 and 10
   */
  public getFamilyFate(roll :number) :IFate {
    if(!Number.isInteger(roll) || roll < 1 || roll > 10) {
      throw new Error('Roll must be an integer between 1 and 10')
    }

    return this.familyFates.find(fate => fate.roll == roll)
  }
}

export const NorthernKingdomsLifepath = new Lifepath(
  NK,
  [
    { roll: 1, description: "Your family was scattered to the winds by the wars and you have no idea where most of the are"},
    { roll: 2, description: "Your family was imprisoned for crimes or on trumped-upcharges. You were the only oneto escape. You may want to free them...or maybe not" },
    { roll: 3, description: "Your family house was cursed and now either crops won’tgrow or specters roam the halls.It became too dangerous for you to stay in this home."},
    { roll: 4, description: "With so many wars your fam-ily’s livelihood was destroyed.Your family turned to crime tosurvive."},
    { roll: 5, description: "Your family accumulated a huge debt through gambling orfavors from others. You need money desperately."},
    { roll: 6, description: "Your family has fallen into a feud with another family. You may not even remember whythis feud started in the first place."},
    { roll: 7, description: "Due to some action or inaction your family has become hated in your home town and now no one there wants to have anything to do with them."},
    { roll: 8, description: "One day everything you had was ripped away by a bandit mob. Your family was massacred, leaving you entirely alone"},
    { roll: 9, description: "Your family has a deep, darksecret that if discovered wouldruin you all completely. Youcan decide what this secret is,or the Game Master can decide"},
    { roll: 10, description: "Your family has come to despiseeach other. No one you grew upwith will talk with each otherany more and you’re lucky toget a passing hello from yoursiblings."},
  ],
  [
    { roll: 1, description: "One or more of your parentswere killed in the NorthernWars. Most likely your father, butit is also possible that your moth-er fought or was a casualty."},
    { roll: 2, description: "One or more of your parents left you in the wilderness tofend for yourself. Maybe theycouldn’t afford to keep you;maybe you were an accident."},
    { roll: 3, description: "One or more of your parents were cursed by a mage or dueto the intense hatred of some-one they encountered. Thecurse took their life."},
    { roll: 4, description: "One or more of your parents sold you for coin, or perhapstraded you for some goods orservice. Your parents neededthe money more than you."},
    { roll: 5, description: "One or more of your parents joined a gang. You saw thisgang often and were sometimesforced to work with them."},
    { roll: 6, description: "One or more of your parents were killed by monsters. It isyour decision as to what theymay have fallen prey to."},

  ],
  [
    { roll: 1, title: "Aristocracy", description: "You grew up in a noble manor with servants to wait on you, but you were always expected to behave and impress", startingGear: "Paper of Nobility"}
  ],
  [
    { roll: 1, title: "A Church", description: "You grew up with a influence from your local religion and spent hours a day at church", startingGear: "A Holy Text" }
  ]
)




export const FamilyFates = {
  NorthernStatus: [
  ],
  NilfgaardianStatus: [
    { roll: 1, description: "Rolled 1 for Nilfgaardian Family Fate" },
    { roll: 2, description: "Rolled 2 for Nilfgaardian Family Fate" },
    { roll: 3, description: "Rolled 3 for Nilfgaardian Family Fate" },
    { roll: 4, description: "Rolled 4 for Nilfgaardian Family Fate" },
    { roll: 5, description: "Rolled 5 for Nilfgaardian Family Fate" },
    { roll: 6, description: "Rolled 6 for Nilfgaardian Family Fate" },
    { roll: 7, description: "Rolled 7 for Nilfgaardian Family Fate" },
    { roll: 8, description: "Rolled 8 for Nilfgaardian Family Fate" },
    { roll: 9, description: "Rolled 9 for Nilfgaardian Family Fate" },
    { roll: 10, description: "Rolled 10 for Nilfgaardian Family Fate" },
  ],
  ElderlandStatus: [
    { roll: 1, description: "Rolled 1 for Elderland Family Fate" },
    { roll: 2, description: "Rolled 2 for Elderland Family Fate" },
    { roll: 3, description: "Rolled 3 for Elderland Family Fate" },
    { roll: 4, description: "Rolled 4 for Elderland Family Fate" },
    { roll: 5, description: "Rolled 5 for Elderland Family Fate" },
    { roll: 6, description: "Rolled 6 for Elderland Family Fate" },
    { roll: 7, description: "Rolled 7 for Elderland Family Fate" },
    { roll: 8, description: "Rolled 8 for Elderland Family Fate" },
    { roll: 9, description: "Rolled 9 for Elderland Family Fate" },
    { roll: 10, description: "Rolled 10 for Elderland Family Fate" },
  ]
}
export const ParentalFates = {
  NorthernStatus: [],
  NilfgaardianStatus: [],
  ElderlandStatus: []
}
export const FamilyStatus = {
  NorthernStatus: [
  ],
  NilfgaardianStatus: [],
  ElderlandStatus: []
}
export const MonstInfluentialFriends = {
  NorthernStatus: [],
  NilfgaardianStatus: [],
  ElderlandStatus: []
}

export const ParentalFateNorthernStatus : IFate[] = [
]