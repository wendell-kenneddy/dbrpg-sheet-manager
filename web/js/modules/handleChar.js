import { App } from '../App.js'
import { Storage } from './handleStorage.js'

const handleChar = {
  char: Storage.get(),
  availableRaces: ['Saiyajin (Puro)', 'Saiyajin (Híbrido)', 'Humano', 'Konatsu-seijin (Espadachim)', 'Konatsu-seijin (Feitiçeiro)', 'Andróide (Artificial)', 'Andróide (Ciborgue)', 'Andróide (Bioandróide)', 'Namekuseijin (Clã dos Guerreiros)', 'Namekuseijin (Clã do Dragão)', 'Raça Freeza', 'Majin'],
  raceSpecs: [
    {
      race: 'Saiyajin (Puro)',
      raceStr: 2,
      raceDex: 0,
      raceKi: 0,
      raceInt: 0,
      raceRes: 2,
      advantages: ['Criar lua', 'Forma gigante', 'Memória', 'Zenkai'],
      disadvantages: ['Apetite Insaciável', 'Cauda']
    },

    {
      race: 'Saiyajin (Híbrido)',
      raceStr: 2,
      raceDex: 0,
      raceKi: 0,
      raceInt: 1,
      raceRes: 2,
      advantages: ['Forma gigante', 'Zenkai'],
      disadvantages: ['Apetite Insaciável', 'Cauda']
    },

    {
      race: 'Humano',
      raceStr: 0,
      raceDex: 0,
      raceKi: 0,
      raceInt: 1,
      raceRes: 2,
      advantages: [],
      disadvantages: []
    },

    {
      race: 'Majin',
      raceStr: 1,
      raceDex: 2,
      raceKi: 2,
      raceInt: 1,
      raceRes: 1,
      advantages: ['Alongar membros', 'Regeneração', 'Absover oponentes', 'Dividir seu corpo e controlar suas partes', 'Usar magia de cura'],
      disadvantages: ['Preguiçoso', 'Pouca Inteligência']
    },

    {
      race: 'Raça Freeza',
      raceStr: 1,
      raceDex: 1,
      raceKi: 0,
      raceInt: 0,
      raceRes: 2,
      advantages: ['Aumentar velocidade', 'Sobreviver a feridas mortais', 'Sobreviver no espaço', 'Transformação'],
      disadvantages: ['Aparência monstruosa', 'Má fama']
    },

    {
      race: 'Andróide (Artificial)',
      raceStr: 0,
      raceDex: 1,
      raceKi: 0,
      raceInt: 2,
      raceRes: 0,
      advantages: ['Imune a veneno', 'Imune a controle mental'],
      disadvantages: ['Necessidade de drenar energia']
    },

    {
      race: 'Andróide (Bioandróide)',
      raceStr: 1,
      raceDex: 0,
      raceKi: 0,
      raceInt: 1,
      raceRes: 1,
      advantages: ['Absorção de energia (parcial ou por assimilação)'],
      disadvantages: ['Chance de perda de assimilação', 'Perfeccionista']
    },

    {
      race: 'Andróide (Ciborgue)',
      raceStr: 1,
      raceDex: 1,
      raceKi: 0,
      raceInt: 0,
      raceRes: 2,
      advantages: ['Imune a veneno', 'Imune a controle mental', 'Energia ilimitada'],
      disadvantages: ['Incapaz de sentir ki', 'Necessidade de hidratar-se']
    },

    {
      race: 'Namekuseijin (Clã dos Guerreiros)',
      raceStr: 1,
      raceDex: 0,
      raceKi: 0,
      raceInt: 0,
      raceRes: 2,
      advantages: ['Forma gigante', 'Membros elásticos', 'Assimilação', 'Audição aguçada', 'Detecção natural de ki', 'Capacidade de avaliar índole', 'Regeneração de membros'],
      disadvantages: []
    },

    {
      race: 'Namekuseijin (Clã do Dragão)',
      raceStr: 0,
      raceDex: 0,
      raceKi: 2,
      raceInt: 2,
      raceRes: 0,
      advantages: ['Curar feridas leves', 'Forma gigante', 'Membros elásticos', 'Assimilação', 'Audição aguçada', 'Deteccção natural de ki', 'Magia', 'Capacidade de avaliar índole', 'Regeneração de membros'],
      disadvantages: []
    },

    {
      race: 'Konatsu-seijin (Espadachim)',
      raceStr: 0,
      raceDex: 2,
      raceKi: 0,
      raceInt: 2,
      raceRes: 1,
      advantages: ['Rolagem de dano +1', 'Usar magias menores'],
      disadvantages: ['Necessidade de carregar uma arma branca a todo momento']
    },

    {
      race: 'Konatsu-seijin (Feitiçeiro)',
      raceStr: 0,
      raceDex: 0,
      raceKi: 2,
      raceInt: 2,
      raceRes: 0,
      advantages: ['Usar magia'],
      disadvantages: ['Necessidade de descansar demasiadamente']
    }
  ],

  findRaceSpecs(race) {
    const raceSpecsIndex = this.raceSpecs.findIndex(c => c.race == race)

    return raceSpecsIndex
  },

  charFirstInit() {
    this.updateCharMaxHP()
    this.updateCharMaxKi()
    this.updateCharMaxSTA()
    this.updateCharActualHP(this.char.maxHP)
    this.updateCharActualKi(this.char.maxKi)
    this.updateCharActualSTA(this.char.maxSTA)
  },

  updateCharActualHP(value) {
    if (this.char.actualHP += value >= this.char.maxHP) {
      this.char.actualHP = this.char.maxHP
    } else if (this.char.actualHP += value <= 0) {
      this.char.actualHP = 0
    } else {
      this.char.actualHP += value
    }
  },

  updateCharActualKi(value) {
    if (this.char.actualKi += value >= this.char.maxKi) {
      this.char.actualKi = this.char.maxKi
      return
    } else if (this.char.actualKi += value <= 0) {
      this.char.actualKi = 0
      return
    } else {
      this.char.actualHP += value
      return
    }
  },

  updateCharActualSTA(value) {
    if (this.char.actualSTA += value >= this.char.maxSTA) {
      this.char.actualSTA = this.char.maxSTA
      return
    } else if (this.char.actualHP += value <= 0) {
      this.char.actualSTA = 0
      return
    } else {
      this.char.actualSTA += value
    }
  },

  updateCharMaxHP() {
    this.char.maxHP = this.char.baseRes * 5 + this.char.raceRes + this.char.bonusRes
    return
  },

  updateCharMaxKi() {
    this.char.maxKi = this.char.baseKi * 5 + this.char.raceKi + this.char.bonusKi
    return
  },

  updateCharMaxSTA() {
    this.char.maxSTA = this.char.baseDex * 5 + this.char.raceDex + this.char.bonusDex
    return
  },

  updateCharActualEXP(value) {
    handleChar.char.exp += value
  },

  updateRemainingPA(value) {
    if (this.char.remainingPA + Number(value) >= 12) {
      this.char.remainingPA = 12
    } else if (this.char.remainingPA + Number(value) <= 0) {
      this.char.remainingPA = 0
    } else {
      this.char.remainingPA += Number(value)
    }
  },

  levelUP() {
    this.char.level += 1
    this.updateCharActualHP(999)
    this.updateCharActualKi(999)
    this.updateCharActualSTA(999)
    this.char.exp = 0
  },

  deleteChar() {
    this.char = null
    App.reload()
  }
}

export { handleChar }
