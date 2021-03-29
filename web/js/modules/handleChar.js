import { App } from '../App.js'
import { Storage } from './handleStorage.js'
import { Toast } from './handleToast.js'

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
      advantages: ['Criar lua', 'Forma Gigante', 'Memória', 'Zenkai'],
      disadvantages: ['Apetite Insaciável', 'Cauda']
    },

    {
      race: 'Saiyajin (Híbrido)',
      raceStr: 2,
      raceDex: 0,
      raceKi: 0,
      raceInt: 1,
      raceRes: 2,
      advantages: ['Forma gigante', 'Memória', 'Zenkai', 'Desenvolvimento Aprimorado'],
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
      advantages: ['Alongar membros', 'Regeneração', 'Absorção (Majin)', 'Desmembrar', 'Usar Magia de Cura'],
      disadvantages: ['Preguiçoso', 'Primitivo']
    },

    {
      race: 'Raça Freeza',
      raceStr: 1,
      raceDex: 1,
      raceKi: 0,
      raceInt: 0,
      raceRes: 2,
      advantages: ['Aumentar Velocidade', 'Sobreviver a Feridas Mortais', 'Sobreviver no espaço', 'Transformação'],
      disadvantages: ['Aparência Monstruosa', 'Má Fama (Raça Freeza)']
    },

    {
      race: 'Andróide (Artificial)',
      raceStr: 0,
      raceDex: 1,
      raceKi: 0,
      raceInt: 2,
      raceRes: 0,
      advantages: ['Imune a Veneno', 'Imune a Controle Mental'],
      disadvantages: ['Necessidade de Drenar Energia']
    },

    {
      race: 'Andróide (Bioandróide)',
      raceStr: 1,
      raceDex: 0,
      raceKi: 0,
      raceInt: 1,
      raceRes: 1,
      advantages: ['Absorção de Energia (parcial ou por assimilação)'],
      disadvantages: ['Chance de Perda de Assimilação', 'Perfeccionista']
    },

    {
      race: 'Andróide (Ciborgue)',
      raceStr: 1,
      raceDex: 1,
      raceKi: 0,
      raceInt: 0,
      raceRes: 2,
      advantages: ['Energia Ilimitada', 'Imune a Veneno', 'Imune a Controle Mental'],
      disadvantages: ['Incapaz de Sentir Ki', 'Necessidade de Hidratar-se']
    },

    {
      race: 'Namekuseijin (Clã dos Guerreiros)',
      raceStr: 1,
      raceDex: 0,
      raceKi: 0,
      raceInt: 0,
      raceRes: 2,
      advantages: ['Forma Gigante (Namek)', 'Alongar Membros (Namek)', 'Assimilação', 'Audição Aguçada', 'Detecção Natural de Ki', 'Capacidade de Avaliar Índole', 'Regenerar Membros'],
      disadvantages: []
    },

    {
      race: 'Namekuseijin (Clã do Dragão)',
      raceStr: 0,
      raceDex: 0,
      raceKi: 2,
      raceInt: 2,
      raceRes: 0,
      advantages: ['Usar Magias Avançadas', 'Forma Gigante (Namek)', 'Alongar Membros (Namek)', 'Assimilação', 'Audição Aguçada', 'Deteccção Natural de Ki', 'Capacidade de Avaliar Índole', 'Regenerar Membros'],
      disadvantages: []
    },

    {
      race: 'Konatsu-seijin (Espadachim)',
      raceStr: 0,
      raceDex: 2,
      raceKi: 0,
      raceInt: 2,
      raceRes: 1,
      advantages: ['Perícia Inigualável +1', 'Usar Magias Menores'],
      disadvantages: ['Item Essencial - Arma de Corte']
    },

    {
      race: 'Konatsu-seijin (Feitiçeiro)',
      raceStr: 0,
      raceDex: 0,
      raceKi: 2,
      raceInt: 2,
      raceRes: 0,
      advantages: ['Usar magia'],
      disadvantages: ['Necessidade de Descansar Demasiadamente']
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
    if (this.char.actualHP + value >= this.char.maxHP) {
      this.char.actualHP = this.char.maxHP
      return
    } else if (this.char.actualHP + value <= 0) {
      this.char.actualHP = 0
      Toast.open('Fora de combate...')
      return
    } else {
      this.char.actualHP += value
      return
    }
  },

  updateCharActualKi(value) {
    if (this.char.actualKi + value >= this.char.maxKi) {
      this.char.actualKi = this.char.maxKi
      return
    } else if (this.char.actualKi + value <= 0) {
      this.char.actualKi = 0
      return
    } else {
      this.char.actualKi += value
      return
    }
  },

  updateCharActualSTA(value) {
    if (this.char.actualSTA + value >= this.char.maxSTA) {
      this.char.actualSTA = this.char.maxSTA
      return
    } else if (this.char.actualSTA + value <= 0) {
      this.char.actualSTA = 0
      return
    } else {
      this.char.actualSTA += value
    }
  },

  updateCharMaxHP() {
    this.char.maxHP = this.char.baseRes * 5 + this.char.raceRes + this.char.bonusRes + this.char.arbitraryRes

    if (this.char.maxHP <= 0) this.char.maxHP = 0

    if (this.char.actualHP > this.char.maxHP) handleChar.updateCharActualHP(this.char.maxHP)

    return
  },

  updateCharMaxKi() {
    this.char.maxKi = this.char.baseKi * 5 + this.char.raceKi + this.char.bonusKi + this.char.arbitraryKi

    if (this.char.maxKi <= 0) this.char.maxKi = 0

    if (this.char.actualKi > this.char.maxKi) handleChar.updateCharActualKi(this.char.maxKi)

    return
  },

  updateCharMaxSTA() {
    this.char.maxSTA = this.char.baseDex * 5 + this.char.raceDex + this.char.bonusDex + this.char.arbitraryDex

    if (this.char.maxSTA <= 0) this.char.maxSTA = 0

    if (this.char.actualSTA > this.char.maxSTA) handleChar.updateCharActualSTA(this.char.maxSTA)

    return
  },

  updateCharActualEXP(value) {
    if (handleChar.char.exp + value >= 10) {
      handleChar.levelUP()
    } else if (handleChar.char.exp + value <= 0) {
      handleChar.char.actualEXP = 0
    } else {
      handleChar.char.exp += value
    }
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

  updateArbitraryAttributes(attributes) {
    this.char.arbitraryStr += attributes.arbitraryStr
    this.char.arbitraryDex += attributes.arbitraryDex
    this.char.arbitraryKi += attributes.arbitraryKi
    this.char.arbitraryInt += attributes.arbitraryInt
    this.char.arbitraryRes += attributes.arbitraryRes
    this.char.arbitraryBaseAtk += attributes.arbitraryBaseAtk
    this.char.arbitraryBaseDef += attributes.arbitraryBaseDef
    this.char.arbitrarySpAtk += attributes.arbitrarySpAtk
    this.char.arbitrarySpDef += attributes.arbitrarySpDef
  },

  getCharBaseSecAttribute() {
    const baseSecAttribute = this.char.baseStr + this.char.raceStr + this.char.bonusStr

    if (baseSecAttribute <= 0) return 0
    else return baseSecAttribute
  },

  getCharSpecialSecAttribute() {
    const spSecAttribute = this.char.baseKi + this.char.raceKi + this.char.bonusKi

    if (spSecAttribute <= 0) return 0
    else return spSecAttribute
  },

  levelUP() {
    this.char.level += 1
    handleChar.updateRemainingPA(2)
    handleChar.char.actualHP = handleChar.char.maxHP
    handleChar.char.actualKi = handleChar.char.maxKi
    handleChar.char.actualSTA = handleChar.char.maxSTA
    this.char.exp = 0
    Toast.open(`Parabéns, você alcançou o nível ${handleChar.char.level}! HP, Ki e Fôlego totalmente recuperados, e + 1 P.A disponível!`)
  },

  deleteChar() {
    this.char = null
    App.reload()
  }
}

export { handleChar }
