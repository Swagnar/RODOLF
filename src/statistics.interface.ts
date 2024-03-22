export interface IStatistic {
  name :string,
  shortcut :string,
  value :number
}

class Statistic implements IStatistic {
  constructor(
    public name :string,
    public shortcut :string,
    public value :number = 0
  ) {}
}

export const INT = new Statistic('Inteligence', 'INT')
export const REF = new Statistic('Reflexes', 'REF')
export const DEX = new Statistic('Dexterity', 'DEX')
export const BODY = new Statistic('Body', 'BODY')
export const EMP = new Statistic('Empathy', 'EMP')
export const CRA = new Statistic('Craft', 'CRA')
export const WILL = new Statistic('Will', 'WILL')
export const LUCK = new Statistic('Luck', 'LUCK')
export const REP = new Statistic('Reputation', 'REP')
/**
 * Object containing all statistics
 */
export const Statistics = {
  INT, REF, DEX, BODY, EMP, CRA, WILL, LUCK, REP
}


