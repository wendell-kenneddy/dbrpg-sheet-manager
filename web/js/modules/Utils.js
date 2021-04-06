import { timeChamber } from './handleTimeChamber.js';
import { handleChar } from './handleChar.js';
import { App } from '../App.js'

export const timeChamberItems = {
  advantages: [
    {
      name: 'Aceleração',
      description: 'Em virtude de sua boa genética, você é capaz de se mover um pouco mais rápido que os demais. Isto lhe garante vantagem em situações de perseguição, fuga e esquiva. Além disso, você recebe uma ação extra durante seu turno de ação, podendo mover-se duas vezes antes de agir, ou mover-se três vezes. Usar esta vantagem durante o combate consumirá 1 ponto de Fôlego e durará até o fim do combate. Garante um bônus de +1 em Destreza. Custo: 1 P.A.',
      cost: 1,
      needCheck: true,

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`P.A insuficientes para comprar ${this.name}.`)
        }

        handleChar.char.bonusDex += 1
        handleChar.char.advantages.push(this.name)
        handleChar.updateCharMaxSTA()
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Ataque Especial',
      description: 'Você recebe a capacidade de criar sua pŕopria técnica, com características únicas. Consulte seu mestre para decidir os efeitos causados pela técnica. Custo: 1 P.A.',
      cost: 1,
      needCheck: true,

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`P.A insuficientes para comprar ${this.name}.`)
        } else {
          handleChar.char.advantages.push(this.name)
          handleChar.updateRemainingPA(-this.cost)
          timeChamber.closeTimeChamber()
          App.reload()
        }
      }
    },

    {
      name: 'Blefar',
      description: 'Você recebe a capacidade de blefar, uma habilidade que lhe permite vencer lutas mesmo que não possua a força para tal. Tudo que a força não puder resolver, blefar irá. Garente um bônus de +2 em Inteligênia. Custo: 1 P.A.',
      cost: 1,
      needCheck: true,

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`P.A insuficientes para comprar ${this.name}.`)
        } else {
          handleChar.char.advantages.push(this.name)
          handleChar.char.bonusInt += 2
          handleChar.updateRemainingPA(-this.cost)
          timeChamber.closeTimeChamber()
          App.reload()
        }
      }
    },

    {
      name: 'Boa Fama',
      description: 'Você é admirado por todos, seja por sua perícia em combate, aparência, estilo ou mesmo uma única luta marcante. De qualquer forma, você é famoso, admirado e temido. Ser famoso pode trazer vantagens em algumas ocasiões, mas também desvantagens. Será mais difícil passar agir com furtividade, e se você tiver um ponto fraco, será mais fácil de descobrir. Custo: 1 P.A.',
      cost: 1,
      needCheck: true,

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`P.A insuficientes para comprar ${this.name}.`)
        } else {
          handleChar.char.advantages.push(this.name)
          handleChar.updateRemainingPA(-this.cost)
          timeChamber.closeTimeChamber()
          App.reload()
        }
      }
    },

    {
      name: 'Deflexão',
      description: 'Você recebe a capacidade de desviar completamente de um ataque, sem sofrer quase nenhum dano. Para isso, você pode gastar 2 pontos de Fôlego para cada tentativa e aumentar sua Destreza em 2 pontos contra um único ataque. O número de vezes que você pode tentar por turno é igual ao seu total de Destreza. Custo: 1 P.A.',
      cost: 1,
      needCheck: true,

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`P.A insuficientes para comprar ${this.name}.`)
        } else {
          handleChar.char.advantages.push(this.name)
          handleChar.updateRemainingPA(-this.cost)
          timeChamber.closeTimeChamber()
          App.reload()
        }
      }
    },

    {
      name: 'Energia Extra',
      description: 'Você recebe a capacidade de invocar sua força interior, recuperando seus Pontos de Vida. Para tal, você deve gastar 2 pontos do status Ki, recuperando completamente seus Pontos de Vida. Usar esta vantagem leva um turno inteiro, e enquanto estiver concentrando-se, será considerado indefeso. Ao sofrer dano, sua concentração é perdida. A vantagem possui dois níveis: 1 - você só poderá usar Energia Extra em situações de quase morte; 2 - Você poderá usar Energia Extra quando quiser. Custo: 1-2 P.A.',
      cost: 1,
      needCheck: true,
      baseLevel: 'Energia Extra (Base)',
      maxLevel: 'Energia Extra (Aprimorado)',

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`P.A insuficientes para comprar ${this.name}.`)
        }

        if (handleChar.char.advantages.indexOf(this.maxLevel) != -1) {
          throw new Error(`${this.name} já está no nível máximo.`)
        }

        if (handleChar.char.advantages.indexOf(this.baseLevel) == -1) {
          handleChar.char.advantages.push(this.baseLevel)
          handleChar.updateRemainingPA(-this.cost)
          timeChamber.closeTimeChamber()
          App.reload()
          return
        }

        const index = handleChar.char.advantages.indexOf(this.baseLevel)
        handleChar.char.advantages[index] = this.maxLevel
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Esconder Intenções',
      description: 'Você recebe a capacidade de enganar seus oponentes, parecendo fraco, covarde, pequeno ou qualquer outro motivo que preferir. Além de maior facilidade ao agir com furtividade, sua aparência inofensiva também o auxiliará em combate. Desse modo, você ganha a iniciativa, recebendo uma ação extra antes mesmo do primeiro turno de combate iniciar. Não funciona com quem já o tenha visto lutar, e o mesmo truque não engana a mesma pessoa duas vezes. Custo: 1 P.A.',
      cost: 1,
      needCheck: true,

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`P.A insuficientes para comprar ${this.name}.`)
        }

        handleChar.char.advantages.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Rivalidade',
      description: 'Você recebe um treinamento especial, ou passa a nutrir certa rivalidade com determinadas raças, conhecendo bem suas fraquezas e habilidades. Escolha entre as raças disponíveis. Garante um bônus de +2 em Inteligência e Resistência. Custo: 1 P.A.',
      cost: 1,

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`P.A insuficientes para comprar ${this.name}.`)
        }

        const validateRace = () => {
          const rivalRace = document.getElementById('desired-race').value
          if (handleChar.char.advantages.indexOf(`${this.name} (${rivalRace})`) != -1) {
            throw new Error('Você já possui Rivalidade com esta raça')
          }
        }

        const closeRivalRaceModal = () => {
          toggleModal(9, 'hide')
          const confirmRivalRace = document.getElementById('confirm-desired-race')
          confirmRivalRace.removeEventListener('click', confirm)
          const cancelRivalRace = document.getElementById('cancel-desired-race')
          cancelRivalRace.removeEventListener('click', closeRivalRaceModal)
        }

        const confirm = () => {
          const rivalRace = document.getElementById('desired-race').value

          try {
            validateRace()
            handleChar.char.advantages.push(`${this.name} (${rivalRace})`)
            handleChar.char.bonusInt += 2
            handleChar.char.bonusRes += 2
            handleChar.updateCharMaxHP()
            handleChar.updateRemainingPA(-this.cost)
            closeRivalRaceModal()
            timeChamber.closeTimeChamber()
            App.reload()
          } catch (error) {
            Toast.open(error.message)
          }
        }

        toggleModal(9, 'show')
        const confirmRivalRace = document.getElementById('confirm-desired-race')
        confirmRivalRace.addEventListener('click', confirm)
        const cancelRivalRace = document.getElementById('cancel-desired-race')
        cancelRivalRace.addEventListener('click', closeRivalRaceModal)
        return
      }
    },

    {
      name: 'Memória Expandida',
      description: 'Você recebe uma dádiva que melhora consideravelmente sua memória, possibilitando que lembre de tudo relacionado aos cinco sentidos. Desse modo, você se torna capaz de gravar perícias simplesmente ao ver uma pessoa utilizá-la. Contudo, você não pode manter mais de uma perícia ao mesmo tempo. Para gravar uma nova, deve apagar uma já existente. Personagens com esta vantagem não necessitam realizar testes para aprender novas magias. Custo: 1 P.A.',
      cost: 1,

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`P.A insuficientes para comprar ${this.name}.`)
        } else {
          handleChar.char.advantages.push(this.name)
          handleChar.updateRemainingPA(-this.cost)
        }
      }
    },

    {
      name: 'Partes Mecânicas',
      description: 'Você recebe a capacidade de reconstruir um ou mais membros perdidos consultando um especialista. Cada membro reconstruído dá a possibilidade de realocar 3 pontos de atributos. Custo: 1 P.A.',
      cost: 1,

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`P.A insuficientes para comprar ${this.name}.`)
        }

        handleChar.char.advantages.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Poder Oculto',
      description: 'Você recebe a capacidade de manifestar seu verdadeiro poder em situações de combate ou emergenciais (à critério do mestre). Você pode gastar um ponto de seu status Ki para aumentar em +1 qualquer atributo, um máximo de + 5. Como alternativa, seu Poder Oculto pode afetar apenas uma característica, escolhida durante sua criação de personagem (consulte seu mestre). Neste caso, Poder Oculto irá aumentar em +2 o atributo selecionado, até um máximo de +10. Poder Oculto não pode ser ativado em situações que não envolvam perigo, o que significa que não pode ser ativado fora de combate. Para Poder Oculto ser ativado, levará um turno para cada aumento de atributo - 5 turnos se quiser elevar seu atributo Força em +3 e seu atributo Inteligência em +2, por exemplo. Enquanto concentra-se para ativar seu Poder Oculto, ficará totalmente indefeso. Receber ataques enquanto se concentra lhe fará perder completamente a concentração. Uma vez ativado, Poder Oculto durará até o fim do combate. Contudo, se seus Pontos de Vida chegarem a 0, Poder Oculto será desativado. Custo: 1 P.A.',
      cost: 1,

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`P.A insuficientes para comprar ${this.name}.`)
        }

        handleChar.char.advantages.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Sobrecarga de Ki',
      description: 'Você recebe um treinamento árduo que o ajuda a controlar melhor seu Ki, aumentando em +1 seus pontos base de Ki. Custo: 1 P.A.',
      cost: 1,

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`P.A insuficientes para comprar ${this.name}.`)
        }

        handleChar.char.baseKi += 1
        handleChar.updateCharMaxKi()
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Sobrecarga de Resistência',
      description: 'Você recebe um árduo treinamento para fortalecer sua resistência, aumentando +1 seus pontos base de Resistência. Custo: 1 P.A.',
      cost: 1,

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`P.A insuficientes para comprar ${this.name}.`)
        }

        handleChar.char.baseRes += 1
        handleChar.updateCharMaxHP()
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Reencarnação',
      description: 'Você recebe a dádiva de reecarnar numa outra versão de você, graças ao Plano Espiritual. Desse modo, você pode escolher uma outra raça, com exceção de Andróide. Custo: 1 P.A.',
      cost: 3,

      sideEffet() {
        if (handleChar.char.race == 'Humano') {
          this.cost = 0
        }

        if (!handleChar.char.reencarnatedRaces) {
          handleChar.char.reencarnatedRaces = []
        }

        if (handleChar.char.actualHP != 0) {
          throw new Error('Seus Pontos de Vida devem ser reduzidos a zero para que possa reencarnar.')
        }

        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`P.A insuficientes para comprar ${this.name}.`)
        }

        const closeReencarnateModal = () => {
          toggleModal(9, 'hide')
          const confirmReencarnateBtn = document.getElementById('confirm-desired-race')
          const cancelReencarnatebtn = document.getElementById('cancel-desired-race')
          confirmReencarnateBtn.removeEventListener('click', confirmReencarnate)
          cancelReencarnatebtn.removeEventListener('click', closeReencarnateModal)
          return
        }

        const validateRace = () => {
          const race = document.getElementById('desired-race').value

          if (handleChar.char.race == race) {
            throw new Error(`${race} é sua raça atual.`)
          }

          if (race == 'Andróide (Artificial)'
            || race == 'Andróide (Ciborgue)'
            || race == 'Andróide (Bioandróide)') {
            throw new Error('Você não pode reencarnar para a raça Andróide.')
          }

          if (handleChar.char.reencarnatedRaces.indexOf(race) != -1) {
            throw new Error(`Você não pode reencarnar para ${race} novamente.`)
          }
        }

        const updateCharAdvantagesAndDisadvantages = () => {
          handleChar.char.advantages = handleChar.raceSpecs[handleChar.findRaceSpecs(handleChar.char.race)].advantages
          handleChar.char.disadvantages = handleChar.raceSpecs[handleChar.findRaceSpecs(handleChar.char.race)].disadvantages
          return
        }

        const updateRace = () => {
          const race = document.getElementById('desired-race').value
          handleChar.char.race = race
          return
        }

        const updateReencarnatedRaces = () => {
          handleChar.char.reencarnatedRaces.push(handleChar.char.race)
        }

        const removeActualRaceAttributes = () => {
          handleChar.char.raceStr -= handleChar.raceSpecs[handleChar.findRaceSpecs(handleChar.char.race)].raceStr
          handleChar.char.raceDex -= handleChar.raceSpecs[handleChar.findRaceSpecs(handleChar.char.race)].raceDex
          handleChar.char.raceKi -= handleChar.raceSpecs[handleChar.findRaceSpecs(handleChar.char.race)].raceKi
          handleChar.char.raceInt -= handleChar.raceSpecs[handleChar.findRaceSpecs(handleChar.char.race)].raceInt
          handleChar.char.raceRes -= handleChar.raceSpecs[handleChar.findRaceSpecs(handleChar.char.race)].raceRes
        }

        const addNewRaceAttributes = () => {
          const newRace = document.getElementById('desired-race').value

          handleChar.char.raceStr += handleChar.raceSpecs[handleChar.findRaceSpecs(newRace)].raceStr
          handleChar.char.raceDex += handleChar.raceSpecs[handleChar.findRaceSpecs(newRace)].raceDex
          handleChar.char.raceKi += handleChar.raceSpecs[handleChar.findRaceSpecs(newRace)].raceKi
          handleChar.char.raceInt += handleChar.raceSpecs[handleChar.findRaceSpecs(newRace)].raceInt
          handleChar.char.raceRes += handleChar.raceSpecs[handleChar.findRaceSpecs(newRace)].raceRes
        }

        const resetCharSpecs = () => {
          handleChar.char.items = []
          handleChar.char.arbitraryStr = 0
          handleChar.char.arbitraryDex = 0
          handleChar.char.arbitraryKi = 0
          handleChar.char.arbitraryInt = 0
          handleChar.char.arbitraryRes = 0
          handleChar.char.arbitraryBaseAtk = 0
          handleChar.char.arbitraryBaseDef = 0
          handleChar.char.arbitrarySpDef = 0
          handleChar.char.arbitrarySpAtk = 0
          handleChar.char.bonusStr = 0
          handleChar.char.bonusDex = 0
          handleChar.char.bonusKi = 0
          handleChar.char.bonusInt = 0
          handleChar.char.bonusRes = 0
        }

        const updateCharStatus = () => {
          handleChar.char.exp = 0
          handleChar.char.level = 1
          handleChar.updateCharMaxSTA()
          handleChar.updateCharMaxHP()
          handleChar.updateCharMaxKi()
          handleChar.updateCharActualHP(handleChar.char.maxHP)
          handleChar.updateCharActualKi(handleChar.char.maxKi)
          handleChar.updateCharActualSTA(handleChar.char.maxSTA)
        }

        const confirmReencarnate = () => {
          try {
            validateRace()
            removeActualRaceAttributes()
            updateRace()
            updateReencarnatedRaces()
            addNewRaceAttributes()
            resetCharSpecs()
            updateCharAdvantagesAndDisadvantages()
            updateCharStatus()
            handleChar.updateRemainingPA(-this.cost)
            closeReencarnateModal()
            timeChamber.closeTimeChamber()
            App.reload()
          } catch (error) {
            Toast.open(error.message)
          }
        }

        toggleModal(9, 'show')
        const confirmReencarnateBtn = document.getElementById('confirm-desired-race')
        const cancelReencarnatebtn = document.getElementById('cancel-desired-race')
        confirmReencarnateBtn.addEventListener('click', confirmReencarnate)
        cancelReencarnatebtn.addEventListener('click', closeReencarnateModal)
        return
      }
    },

    {
      name: 'Reflexão',
      description: 'Similar a Deflexão, porém melhor. Além de desviar do ataque, você recebe a capacidade de desferí-lo de volta ao atacante. Para tal, você pode gastar 2 pontos de seu status Ki e duplicar seu total de Força ou Ki para calcular sua defesa total contra um único ataque. Caso consiga deter completamente o ataque, não sofrerá dano algum, e lançará o ataque de volta para o agressor. Reflexão é considerada esquiva, o que significa que o total de vezes que pode ser usada em combate é igual ao seu total de defesa. Custo: 2 P.A.',
      cost: 2,
      needCheck: true,

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`P.A insuficientes para comprar ${this.name}.`)
        }

        handleChar.char.advantages.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Sentir Ki',
      description: 'Você recebe a capacidade de sentir a presença e a assinatura de qualquer ser vivo. Para tal, realize um teste de Inteligência + Ki para sentir uma assinatura de Ki ou presença. Caso gaste 2 P.A, Sentir Ki se tornará Sentir Ki (Aguçado), o que lhe permite também determinar se a presença é benigna ou malígna. Sentir Ki (Aguçado) também descarta a necessidade de realizar qualquer teste, e pode ser aprendido também via treinamento. Custo: 1 P.A.',
      cost: 1,
      baseLevel: 'Sentir Ki (Base)',
      maxLevel: 'Sentir Ki (Aguçado)',

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`P.A insuficientes para comprar ${this.name}.`)
        }

        if (handleChar.char.advantages.indexOf(this.maxLevel) != -1) {
          throw new Error(`${this.name} já está no nível máximo.`)
        }

        if (handleChar.char.advantages.indexOf(this.baseLevel) == -1) {
          handleChar.char.advantages.push(this.baseLevel)
          handleChar.updateRemainingPA(-this.cost)
          timeChamber.closeTimeChamber()
          App.reload()
          return
        }

        const index = handleChar.char.advantages.indexOf(this.baseLevel)
        handleChar.char.advantages[index] = this.maxLevel
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
        return
      }
    },
  ],
  disadvantages: [
    {
      name: 'Tormenta',
      description: 'Você recebe uma tormenta, que pode ser uma lembrança perturbadora ou algum espírito maligno. Ninguém pode sentir a Tormenta além de você mesmo, e além disso, Tormenta o deixará em paz apenas quando você estiver satisfeito ou cansado. Não importa o que seja, sempre que entrar em combate, o mestre realizará um teste, e caso o resultado esteja entre 4 e 6, Tormenta o afetará, e reduzirá em -1 todos os seus atributos. À critério do mestre, Tormenta pode aparecer também em outras ocasiões. Bônus de P.A: 2',
      bonus: 2,
      needCheck: true,

      sideEffet() {
        handleChar.char.disadvantages.push(this.name)
        handleChar.updateRemainingPA(this.bonus)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Código de Honra',
      description: 'Você passa a seguir um código de honra que o implica a fazer ou deixar de fazer determinadas ações - o voto é escolhido aleatoriamente, leia o manual para ver cada um. Bônus de P.A: 1',
      bonus: 1,

      sideEffet() {
        if (!handleChar.char.codeOfHonorVoteCount && !handleChar.char.codeOfHonorVotes) {
          handleChar.char.codeOfHonorVoteCount = 0
          handleChar.char.codeOfHonorVotes = []
        }

        if (handleChar.char.codeOfHonorVoteCount == 4) {
          throw new Error('Limite de votos atingido.')
        }

        let vote = 0

        for (let i = 0; i < 10; i++) {
          vote = Math.round(Math.random() * (10 - 1) + 1)

          if (handleChar.char.codeOfHonorVotes.indexOf(vote) == -1) {
            handleChar.char.codeOfHonorVotes.push(vote)
            break;
          }
        }

        handleChar.updateRemainingPA(this.bonus)
        handleChar.char.disadvantages.push(`${this.name} (${vote})`)
        handleChar.char.codeOfHonorVoteCount += 1
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Covarde',
      description: 'Você subitamente passa a achar que não foi feito para o combate. Mesmo quando precisar salvar sua própria vida, sofrerá uma penalidade de -2 no seu total de defesa. Bônus de P.A: 1.',
      bonus: 1,
      needCheck: true,

      sideEffet() {
        handleChar.updateRemainingPA(this.bonus)
        handleChar.char.disadvantages.push(this.name)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Audição Ruim',
      description: 'Você subitamente perde parte de sua audição, sofrendo uma penalidade de -1 para notar inimigos escondidos. Bônus de P.A: 1',
      bonus: 1,
      needCheck: true,

      sideEffet() {
        handleChar.updateRemainingPA(this.bonus)
        handleChar.char.disadvantages.push(this.name)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Visão Turva',
      description: 'Você subitamente perde parte de sua visão, vendo o mundo ao seu redor de maneira turva. Desse modo, sofrerá sempre uma penalidade de -1 em Força para ataques corporais, -3 em Força para ataques à distância e -3 em Destreza para esquivas. Além disso, sofrerá um redutor de -1 para notar inimigos escondidos, utilizando apenas seus outros sentidos (em situações onde você não possa usar nem mesmo o tato ou o olfato, o teste será negado). Bônus de P.A: 2',
      bonus: 2,
      needCheck: true,

      sideEffet() {
        handleChar.updateRemainingPA(this.bonus)
        handleChar.char.disadvantages.push(this.name)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Incapaz de Falar',
      description: 'Você subitamente perde consideravelmente sua capacidade de se comunicar, exceto com personagens que possam utilizar telepatia. Testes que envolvam ações sociais serão sempre considerados difíceis. Bônus de P.A: 1',
      bonus: 1,
      needCheck: true,

      sideEffet() {
        handleChar.updateRemainingPA(this.bonus)
        handleChar.char.disadvantages.push(this.name)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Péssimo Olfato',
      description: 'Você subitamente perde consideravelmente seu olfato, sendo incapaz de sentir até mesmo seu próprio cheiro. Você não pode, por exemplo, distinguir somente pela aparência se um alimento está estragado. Bônus de P.A: 1.',
      bonus: 1,
      needCheck: true,

      sideEffet() {
        handleChar.updateRemainingPA(this.bonus)
        handleChar.char.disadvantages.push(this.name)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Sem Paladar',
      description: 'Você subitamente perde consideravelmente seu paladar, sendo incapaz de distinguir se um alimento está estragado somente pelo gosto, por exemplo. Contudo, você não sente tanta fome, visto que será capaz de comer pratos que revirariam o estômago de um avestruz. Bônus de P.A: 1.',
      bonus: 1,
      needCheck: true,

      sideEffet() {
        handleChar.updateRemainingPA(this.bonus)
        handleChar.char.disadvantages.push(this.name)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Perda de Foco',
      description: 'Você subitamente passa a perder facilmente o foco, perdendo a vontade de lutar ou ficando desatento mais facilmente, não importando a gravidade da situação. Vale para qualquer tipo de situação, desde lutas à testes. Bônus de P.A: 2.',
      bonus: 2,
      needCheck: true,

      sideEffet() {
        handleChar.updateRemainingPA(this.bonus)
        handleChar.char.disadvantages.push(this.name)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Fúria',
      description: 'Você subitamente sente sua mentalidade mudar. De agora em diante, será impossível controlar sua fúria. Sempre que receber dano ou irritar-se (à critério do mestre), deverá realizar um Teste de Resistência. Se falhar, entrará em um estado de Fúria, atacando automaticamente o alvo da Fúria. Durante a Fúria, sua mente se tornará uma tempestade, impedindo-o de esquivar, usar Ki ou qualquer Habilidade de Ki. A Fúria cessará quando você ou o seu oponente forem derrotados, ou se seu oponente fugir e, após isso, você ficará completamente esgotado. Devido ao cansaço extremo, sofrerá uma penalidade de -1 em todas as suas características. As penalidades acumulam para cada vez que entrar em Fúria. Garante um bônus de +2 em Força e Resistência. Bônus de P.A: 1',
      bonus: 1,
      needCheck: true,

      sideEffet() {
        handleChar.updateRemainingPA(this.bonus)
        handleChar.char.bonusStr += 2
        handleChar.char.bonusRes += 2
        handleChar.char.disadvantages.push(this.name)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Inculto',
      description: 'Você subitamente perde os costumes de comunicação e vivência em sociedade. Seu modo de agir se tornará primitivo, o que significa que não saberá mais ler ou terá extrema dificuldade para tal, além de grande dificuldade para se comunicar com as pessoas. Bônus de P.A: 1',
      bonus: 1,
      needCheck: true,

      sideEffet() {
        handleChar.updateRemainingPA(this.bonus)
        handleChar.char.disadvantages.push(this.name)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Má Fama',
      description: 'Você subitamente perde qualquer credibilidade que tenha adquirido em vida, tornando-se completamente infame. Talvez por uma má experiência em combate, uma humilhação em público ou seja lá qual for o motivo. A partir de agora, será muito mais difícil adquirir a confiança das pessoas, que te olharão sempre com olhos turvos. Além disso, sua presença em um grupo tornará todos os membros suspeitos também. Ademais, caso seja constatado algum crime, muito provavelmente você será perseguido, mesmo que seja inocente. Bônus de P.A: 1',
      bonus: 1,
      needCheck: true,

      sideEffet() {
        handleChar.updateRemainingPA(this.bonus)
        handleChar.char.disadvantages.push(this.name)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Maneta',
      description: 'Você subitamente perde um de seus braços ou de suas mãos, curiosamente não sentindo dor alguma. A partir de agora, será mais difícil manipular objetos com a mesma destreza, e você sofrerá uma penalidade de -1 em qualquer teste que envolva Ataque ou Defesa. Bônus de P.A: 1',
      bonus: 1,
      needCheck: true,

      sideEffet() {
        handleChar.updateRemainingPA(this.bonus)
        handleChar.char.disadvantages.push(this.name)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Preguiçoso',
      description: 'Você subitamente sente sua força de vontade para qualquer ação ser consumida por preguiça, não importando quão devoto à ou honrosa fosse a ação. A partir de agora, deverá realizar um teste a tudo que resolver fazer. Se quiser arrombar uma porte usando um chute, por exemplo, deverá realizar um Teste de Força, e se falhar, não terá êxito. Além disso, a dificuldade do teste aumentará conforme você falhar. Bônus de P.A: 1',
      bonus: 1,
      needCheck: true,

      sideEffet() {
        handleChar.updateRemainingPA(this.bonus)
        handleChar.char.disadvantages.push(this.name)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Ponto Fraco',
      description: 'Você subitamente se sente mais desleixado, abrindo brecha para que seus oponentes encontrem seu Ponto Fraco. A partir de agora, qualquer oponente que conhecer seu Ponto Fraco receberá um bônus de +1 em Destreza ao lutar com você. Seu Ponto Fraco só poderá ser descoberto por pessoas que o tenham visto lutar ao menos uma vez. Você pode tentar descobrir o Ponto Fraco de um oponente realizando um teste de Destreza + Inteligência enquanto o assiste lutar, e se tiver êxito, receberá um bônus de +1 em Destreza sempre que lutar com ele. Caso possua Boa Fama ou Má Fama, automaticamente quase todo mundo saberá seu Ponto Fraco. Bônus de P.A: 1',
      bonus: 1,
      needCheck: true,

      sideEffet() {
        handleChar.updateRemainingPA(this.bonus)
        handleChar.char.disadvantages.push(this.name)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Rival Definitivo',
      description: 'Você subitamente declara sua rivalidade à uma pessoa, cuja lembrança o enche de ódio (diferente de Rivalidade). Durante a aventura, deverá escolher um NPC (personagem do mestre) ou jogador, e declará-lo como seu Rival Definitivo. Sempre que encontrar seu Rival Definitvo, deverá travar uma batalha com ele, e caso perca, sofrerá uma penalidade de -5 em EXP. Se não houver EXP disponível no momento, assim que atingir 5 pontos, sua EXP será reduzida a 0. Sua ficha não poderá ser evolúida até que pague a penalidade. Além disso, se andar ao lado de seu Rival Definitvo, deverá travar uma batalha com ele a cada 15 dias. Bônus de P.A: 1',
      bonus: 1,
      needCheck: true,

      sideEffet() {
        handleChar.updateRemainingPA(this.bonus)
        handleChar.char.disadvantages.push(this.name)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },
  ],
  techniques: [
    {
      name: 'Kamehameha',
      description: 'Uma das técnicas principais de Son Goku. Não necessita de nenhuma outra técnica para ser adquirida. Custo de P.A: 1.',
      cost: 1,
      needCheck: true,

      sideEffet() {

        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Super Kamehameha',
      description: 'Versão aprimorada  do Kamehameha. É necessário ter aprendido Kamehameha para adquirir Super Kamehameha. Custo de P.A: 2.',
      cost: 1,
      needCheck: true,
      requirement: 'Kamehameha',

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        if (handleChar.char.techniques.indexOf(this.requirement) == -1) {
          throw new Error(`Você deve aprender ${this.requirement} para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Genki Dama',
      description: 'Uma técnica com potencial destrutivo esmagador. Não necessita de nenhuma outra técnica para ser adquirida. Custo de P.A: 2.',
      cost: 2,
      needCheck: true,

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Super Genki Dama',
      description: 'Versão aprimorada da Genki Dama. É necessário ter aprendido Genki Dama para adquirir Super Genkidama. Custo de P.A: 2.',
      cost: 2,
      needCheck: true,
      requirement: 'Genki Dama',

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        if (handleChar.char.techniques.indexOf(this.requirement) == -1) {
          throw new Error(`Você deve aprender ${this.requirement} para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Kaioken',
      description: 'Uma técnica que eleva suas capacidades corporais. Não necessita de nenhuma outra técnica para ser adquirida. Custo de P.A: 1.',
      cost: 1,
      needCheck: true,

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Super Saiyajin',
      description: 'Uma técnica que eleva suas capacidades como Saiyajin. Não necessita de nenhuma outra técnica para ser adquirida. Custo de P.A: 2.',
      cost: 2,
      needCheck: true,

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Ultra Super Saiyajin',
      description: 'Versão um pouco aprimorada do Super Saiyajin. É necessário ter aprendido Super Saiyajin para aprender Ultra Super Saiyajin. Custo de P.A: 1.',
      cost: 1,
      needCheck: true,
      requirement: 'Super Saiyajin',

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        if (handleChar.char.techniques.indexOf(this.requirement) == -1) {
          throw new Error(`Você deve aprender ${this.requirement} para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Super Saiyajin 2',
      description: 'Versão aprimorada do Super Saiyajin. É necessário ter aprendido Ultra Super Saiyajin para aprender Super Saiyajin 2. Custo de P.A: 2.',
      cost: 2,
      needCheck: true,
      requirement: 'Super Saiyajin',

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        if (handleChar.char.techniques.indexOf(this.requirement) == -1) {
          throw new Error(`Você deve aprender ${this.requirement} para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Super Saiyajin 3',
      description: 'Versão aprimorada do Super Saiyajin 2. É necessário ter aprendido Super Saiyajin 2 para aprender Super Saiyajin 3. Custo de P.A: 3.',
      cost: 3,
      needCheck: true,
      requirement: 'Super Saiyajin 2',

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        if (handleChar.char.techniques.indexOf(this.requirement) == -1) {
          throw new Error(`Você deve aprender ${this.requirement} para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Super Saiyajin 4',
      description: 'A forma de um saiyajin que utiliza o máximo de seu poder nato. É necessário ter aprendido Super Saiyajin 3 para aprender Super Saiyajin 4. Custo de P.A: 4.',
      cost: 4,
      needCheck: true,
      requirement: 'Super Saiyajin 3',

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        if (handleChar.char.techniques.indexOf(this.requirement) == -1) {
          throw new Error(`Você deve aprender ${this.requirement} para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Super Saiyajin Deus',
      description: 'A forma de um saiyajin que atingiu o poder de um deus. É necessário ter aprendido Super Saiyajin 4 para aprender Super Saiyajin Deus. Custo de P.A: 6.',
      cost: 6,
      needCheck: true,
      requirement: 'Super Saiyajin 4',

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        if (handleChar.char.techniques.indexOf(this.requirement) == -1) {
          throw new Error(`Você deve aprender ${this.requirement} para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Super Saiyajin Blue (SSGSS)',
      description: 'Versão aprimorada do Super Saiyajin God. É necessário ter aprendido Super Saiyajin Deus para aprender Super Saiyajin Blue (SSGSS). Custo de P.A: 8.',
      cost: 8,
      needCheck: true,
      requirement: 'Super Saiyajin Deus',

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        if (handleChar.char.techniques.indexOf(this.requirement) == -1) {
          throw new Error(`Você deve aprender ${this.requirement} para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Galick Ho',
      description: 'Uma das técnicas principais de Vegeta. Não necessita de nenhuma outra técnica para aprender Galick Ho. Custo de P.A: 1.',
      cost: 1,
      needCheck: true,

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Controle do Oozaru',
      description: 'A capacidade de controlar a forma primitiva e esmagadora de um Saiyajin. Não necessita de nenhuma outra técnica para aprender Galick Ho. Custo de P.A: 1.',
      cost: 1,
      needCheck: true,

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Ataque Big Bang',
      description: 'Uma das técnicas principais de Vegeta. Não necessita de nenhuma outra técnica para aprender Ataque Big Bang. Custo de P.A: 1.',
      cost: 1,
      needCheck: true,

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Resplendor Final',
      description: 'Uma das técnicas principais de Vegeta. Não necessita de nenhuma outra técnica para aprender Resplendor Final. Custo de P.A: 2.',
      cost: 2,
      needCheck: true,

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Ataque Resplendor Final',
      description: 'Versão aprimorada de Resplendor Final. É necessário ter aprendido Resplendor Final para adquirir Ataque Resplendor Final. Custo de P.A: 1.',
      cost: 1,
      needCheck: true,
      requirement: 'Resplendor Final',

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        if (handleChar.char.techniques.indexOf(this.requirement) == -1) {
          throw new Error(`Você deve aprender ${this.requirement} para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Dark Impact',
      description: 'Técnica utilizada por Majin Vegeta. Não é necessária nenhuma outra técnica para aprender Dark Impact. Custo de P.A: 2.',
      cost: 2,
      needCheck: true,

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Impacto Final',
      description: 'Técnica utilizada por Majin Vegeta. É necessário ter aprendido Dark Impact para adquirir Impacto Final. Custo de P.A: 2.',
      cost: 2,
      needCheck: true,
      requirement: 'Dark Impact',

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        if (handleChar.char.techniques.indexOf(this.requirement) == -1) {
          throw new Error(`Você deve aprender ${this.requirement} para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Explosão Final',
      description: 'Técnica definitiva de Majin Vegeta. É necessário ter aprendido Impacto Final para adquirir Explosão Final. Custo de P.A: 4.',
      cost: 4,
      needCheck: true,
      requirement: 'Impacto Final',

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        if (handleChar.char.techniques.indexOf(this.requirement) == -1) {
          throw new Error(`Você deve aprender ${this.requirement} para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Gamma Burst Flash',
      description: 'Uma das técnicas principais de Vegeta. Não é necessária nenhuma outra técnica para aprender Gamma Burst Flash. Custo de P.A: 3.',
      cost: 3,
      needCheck: true,

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Kienzan',
      description: 'Uma das técnicas principais de Kuririn. Não é necessária nenhuma outra técnica para aprender Kienzan. Custo de P.A: 1.',
      cost: 1,
      needCheck: true,

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Kienzan Combo',
      description: 'Versão aprimorada de Kienzan. É necessário aprender Kienzan para adquirir Kienzan Combo. Custo de P.A: 1.',
      cost: 1,
      needCheck: true,
      requirement: 'Kienzan',

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        if (handleChar.char.techniques.indexOf(this.requirement) == -1) {
          throw new Error(`Você deve aprender ${this.requirement} para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Chuva de Energia',
      description: 'Uma das técnicas principais de Kuririn. Não é necessária nenhuma outra técnica para aprender Chuva de Energia. Custo de P.A: 2.',
      cost: 2,
      needCheck: true,

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Wolf Fang Fist',
      description: 'Uma das técnicas principais de Yamcha. Não é necessária nenhuma outra técnica para aprender Wolf Fang Fist. Custo de P.A: 1.',
      cost: 1,
      needCheck: true,

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Binding Wolf Fang Fist',
      description: 'Versão aprimorada de Wolf Fang Fist. É necessário ter aprendido Wolf Fang Fist para adquirir Binding Wolf Fang Fist. Custo de P.A: 1.',
      cost: 1,
      needCheck: true,
      requirement: 'Wolf Fang Fist',

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        if (handleChar.char.techniques.indexOf(this.requirement) == -1) {
          throw new Error(`Você deve aprender ${this.requirement} para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Neo Wolf Fang Fist',
      description: 'Versão definitiva de Wolf Fang Fist. É necessário ter aprendido Binding Wolf Fang Fist para adquirir Neo Wolf Fang Fist. Custo de P.A: 2.',
      cost: 2,
      needCheck: true,
      requirement: 'Binding Wolf Fang Fist',

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        if (handleChar.char.techniques.indexOf(this.requirement) == -1) {
          throw new Error(`Você deve aprender ${this.requirement} para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Soukidan',
      description: 'Uma das técnicas principais de Yamcha. Não é necessário ter aprendido nenhuma outra técnica para adquirir Soukidan. Custo de P.A: 1.',
      cost: 1,
      needCheck: true,

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Super Soukidan',
      description: 'Uma das técnicas principais de Yamcha. É necessário ter aprendido Soukidan para aprender Super Soukidan. Custo de P.A: 1.',
      cost: 1,
      needCheck: true,
      requirement: 'Soukidan',

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        if (handleChar.char.techniques.indexOf(this.requirement) == -1) {
          throw new Error(`Você deve aprender ${this.requirement} para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Dodonpa',
      description: 'Uma das técnicas principais do dojo Tsuru-Sen. Não é necessário ter aprendido nenhuma outra técnica para adquirir Dodonpa. Custo de P.A: 1.',
      cost: 1,
      needCheck: true,

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Kikoho',
      description: 'Uma das técnicas principais de Tenshinhan. Não é necessário ter aprendido nenhuma outra técnica para adquirir Kikoho. Custo de P.A: 2.',
      cost: 2,
      needCheck: true,

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Kikohodan',
      description: 'Versão aprimorada de Kikoho. É necessário ter aprendido Kikoho para adquirir Kikohodan. Custo de P.A: 1.',
      cost: 1,
      needCheck: true,
      requirement: 'Kikoho',

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        if (handleChar.char.techniques.indexOf(this.requirement) == -1) {
          throw new Error(`Você deve aprender ${this.requirement} para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Neo Kikoho',
      description: 'Versão aprimorada de Kikoho. É necessário ter aprendido Kikohodan para adquirir Neo Kikoho. Custo de P.A: 2.',
      cost: 2,
      needCheck: true,
      requirement: 'Kikohodan',

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        if (handleChar.char.techniques.indexOf(this.requirement) == -1) {
          throw new Error(`Você deve aprender ${this.requirement} para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Técnica das 4 Cópias',
      description: 'Uma das técnicas principais de Tenshinhan. Não é necessário ter aprendido nenhuma outra técnica para adquirir Técnica das 4 Cópias. Custo de P.A: 1.',
      cost: 1,
      needCheck: true,

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Técnica dos 4 Braços',
      description: 'Uma das técnicas principais de Tenshinhan. Não é necessário ter aprendido nenhuma outra técnica para adquirir Técnica dos 4 Braços. Custo de P.A: 1.',
      cost: 1,
      needCheck: true,

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Taiyouken',
      description: 'Técnica utilizada por diversos guerreiros. Não é necessário ter aprendido nenhuma outra técnica para adquirir Taiyouken. Custo de P.A: 1.',
      cost: 1,
      needCheck: true,

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Super Onda Explosiva',
      cost: 1,
      needCheck: true,
      description: 'Uma das técnicas principais de Piccolo. Não é necessário ter aprendido nenhuma outra técnica para adquirir Super Onda Explosiva. Custo de P.A: 1.',

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Makankosappo',
      cost: 3,
      needCheck: true,
      description: 'Uma das técnicas principais de Piccolo. Não é necessário ter aprendido nenhuma outra técnica para adquirir Makankosappo. Custo de P.A: 3.',

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Zona de Granadas Infernais',
      cost: 1,
      needCheck: true,
      description: 'Uma das técnicas principais de Piccolo. Não é necessário ter aprendido nenhuma outra técnica para adquirir Zona de Granadas Infernais. Custo de P.A: 1.',

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Super Magekisen',
      cost: 2,
      needCheck: true,
      description: 'Uma das técnicas principais de Piccolo. Não é necessário ter aprendido nenhuma outra técnica para adquirir Super Magekisen. Custo de P.A: 2.',

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Burning Attack',
      description: 'Uma das técnicas principais de Trunks. Não é necessário ter aprendido nenhuma outra técnica para aprender Burning Attack. Custo de P.A: 1.',
      cost: 1,
      needCheck: true,
      requirement: 'Kikohodan',

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        if (handleChar.char.techniques.indexOf(this.requirement) == -1) {
          throw new Error(`Você deve aprender ${this.requirement} para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Heat Dome Attack',
      description: 'Versão aprimorada de Burning Attack. É necessário ter aprendido Burning Attack para aprender Heat Dome Attack. Custo de P.A: 2.',
      cost: 2,
      needCheck: true,
      requirement: 'Burning Attack',

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        if (handleChar.char.techniques.indexOf(this.requirement) == -1) {
          throw new Error(`Você deve aprender ${this.requirement} para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Bomber DX',
      description: 'Uma das técnicas principais de Nappa. Não é necessário ter aprendido nenhuma outra técnica para aprender Bomber DX. Custo de P.A: 1.',
      cost: 1,
      needCheck: true,

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Tempestade Gigante',
      description: 'Uma das técnicas principais de Nappa. Não é necessário ter aprendido nenhuma outra técnica para aprender Tempestade Gigante. Custo de P.A: 1.',
      cost: 1,
      needCheck: true,

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Kill Driver',
      description: 'Uma das técnicas principais de Turles. Não é necessário ter aprendido nenhuma outra técnica para aprender Kill Driver. Custo de P.A: 1.',
      cost: 1,
      needCheck: true,

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Calamity Blaster',
      description: 'Uma das técnicas principais de Turles. Não é necessário ter aprendido nenhuma outra técnica para aprender Calamity Blaster. Custo de P.A: 2.',
      cost: 2,
      needCheck: true,

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Meteor Burst',
      description: 'Uma das técnicas principais de Turles. Não é necessário ter aprendido nenhuma outra técnica para aprender Calamity Blaster. Custo de P.A: 3.',
      cost: 3,
      needCheck: true,

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Double Sunday',
      description: 'Uma das técnicas principais de Raditz. Não é necessário ter aprendido nenhuma outra técnica para aprender Double Sunday. Custo de P.A: 2.',
      cost: 2,
      needCheck: true,

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Saturday Crush',
      description: 'Uma das técnicas principais de Turles. Não é necessário ter aprendido nenhuma outra técnica para aprender Saturday Crush. Custo de P.A: 3.',
      cost: 3,
      needCheck: true,

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Sleepy Boy Technique',
      description: 'Técnica utilizada por Mestre Kame. Não é necessário ter aprendido nenhuma outra técnica para aprender Sleepy Boy Technique. Custo de P.A: 1.',
      cost: 1,
      needCheck: true,

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Bankoku Bikkuri Sho',
      description: 'Técnica utilizada por Mestre Kame. Não é necessário ter aprendido nenhuma outra técnica para aprender Bankoku Bikkuri Sho. Custo de P.A: 1.',
      cost: 1,
      needCheck: true,

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Zanzoken',
      description: 'Técnica utilizada por Mestre Kame. Não é necessário ter aprendido nenhuma outra técnica para aprender Zanzoken. Custo de P.A: 1.',
      cost: 1,
      needCheck: true,

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Masenko',
      description: 'Uma das técnicas principais de Gohan. Não é necessário ter aprendido nenhuma outra técnica para aprender Masenko. Custo de P.A: 1.',
      cost: 1,
      needCheck: true,

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Masendan',
      description: 'Uma versão aprimorada do Masenko. É necessário ter aprendido Masenko para aprender Masendan. Custo de P.A: 1.',
      cost: 1,
      needCheck: true,
      requirement: 'Masenko',

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        if (handleChar.char.techniques.indexOf(this.requirement) == -1) {
          throw new Error(`Você deve aprender ${this.requirement} para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Super Masenko',
      description: 'Uma versão aprimorada do Masenko. É necessário ter aprendido Masendan para aprender Super Masenko. Custo de P.A: 2.',
      cost: 2,
      needCheck: true,
      requirement: 'Masendan',

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        if (handleChar.char.techniques.indexOf(this.requirement) == -1) {
          throw new Error(`Você deve aprender ${this.requirement} para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Gekiretsu Madan',
      description: 'Uma das técnicas principais de Gohan. Não é necessário ter aprendido nenhuma outra técnica para aprender Gekiretsu Madan. Custo de P.A: 1.',
      cost: 1,
      needCheck: true,

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Impulse Fist',
      description: 'Técnica utilizada por Gohan. Não é necessário ter aprendido nenhuma outra técnica para aprender Impulse Fist. Custo de P.A: 1.',
      cost: 1,
      needCheck: true,

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Final Spirit Cannon',
      description: 'Técnica utilizada por Gohan. Não é necessário ter aprendido nenhuma outra técnica para aprender Gekiretsu Madan. Custo de P.A: 1.',
      cost: 1,
      needCheck: true,

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Vortex Crusher',
      description: 'Técnica utilizada por Bardock. Não é necessário ter aprendido nenhuma outra técnica para aprender Vortex Crusher. Custo de P.A: 1.',
      cost: 1,
      needCheck: true,

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Death Beam',
      description: 'Uma das técnicas principais de Freeza. Não é necessário ter aprendido nenhuma outra técnica para aprender Death Beam. Custo de P.A: 1.',
      cost: 1,
      needCheck: true,

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Death Ball',
      description: 'Uma das técnicas principais de Freeza. Não é necessário ter aprendido nenhuma outra técnica para aprender Death Ball. Custo de P.A: 1.',
      cost: 1,
      needCheck: true,

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Psicocinese',
      description: 'Uma das técnicas principais de Freeza. Não é necessário ter aprendido nenhuma outra técnica para aprender Psicocinese. Custo de P.A: 1.',
      cost: 1,
      needCheck: true,

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Psycho Thread',
      description: 'Técnica utilizada pelos companheiros de Bojack. Não é necessário ter aprendido nenhuma outra técnica para aprender Psycho Thread. Custo de P.A: 1.',
      cost: 1,
      needCheck: true,

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Magic Materialization',
      description: 'Técnica utilizada por Piccolo. Não é necessário ter aprendido nenhuma outra técnica para aprender Magic Materialization. Custo de P.A: 1.',
      cost: 1,
      needCheck: true,

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Escudo de Energia',
      description: 'Técnica utilizada por diversos guerreiros. Não é necessário ter aprendido nenhuma outra técnica para aprender Escudo de Energia. Custo de P.A: 1.',
      cost: 1,
      needCheck: true,

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Curar',
      description: 'Técnica de cura. Não é necessário ter aprendido nenhuma outra técnica para aprender Curar. Adquira a magia novamente para receber Cura (Aprimorada). Custo de P.A: 1.',
      cost: 1,
      needCheck: false,

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        if (handleChar.char.techniques.indexOf('Cura (Aprimorada)') != -1) {
          throw new Error(`${this.name} já está no nível máximo.`)
        }

        if (handleChar.char.techniques.indexOf(this.name) != -1) {
          const index = handleChar.char.techniques.indexOf(this.name)

          handleChar.char.techniques[index] = 'Cura (Aprimorada)'
          handleChar.updateRemainingPA(-this.cost)
          timeChamber.closeTimeChamber()
          App.reload()
          return
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
        return
      }
    },

    {
      name: 'Hyper Tornado',
      description: 'Uma das técnicas principais de Paikkuhan. Não é necessário ter aprendido nenhuma outra técnica para aprender Hyper Tornado. Custo de P.A: 2.',
      cost: 2,
      needCheck: true,

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Burning Shoot',
      description: 'Uma das técnicas principais de Paikkuhan. Não é necessário ter aprendido nenhuma outra técnica para aprender Burning Shoot. Custo de P.A: 1.',
      cost: 1,
      needCheck: true,

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Thunder Flash Attack',
      description: 'Uma das técnicas principais de Paikkuhan. Não é necessário ter aprendido nenhuma outra técnica para aprender Burning Shoot. Custo de P.A: 1.',
      cost: 1,
      needCheck: true,

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Evil Flame',
      description: 'Técnica utilizada por Dabura. Não é necessário ter aprendido nenhuma outra técnica para aprender Burning Shoot. Custo de P.A: 1.',
      cost: 1,
      needCheck: true,

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },

    {
      name: 'Stone Spit',
      description: 'Uma das técnicas principais de Dabura. Não é necessário ter aprendido nenhuma outra técnica para aprender Burning Shoot. Custo de P.A: 1.',
      cost: 1,
      needCheck: true,

      sideEffet() {
        if (handleChar.char.remainingPA < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.char.techniques.push(this.name)
        handleChar.updateRemainingPA(-this.cost)
        timeChamber.closeTimeChamber()
        App.reload()
      }
    },
  ]
}

export const attributeRealocateHandler = {
  getNewAttributeValues() {
    return {
      newStr: Number(document.getElementById('new-bonus-str').value),
      newDex: Number(document.getElementById('new-bonus-dex').value),
      newKi: Number(document.getElementById('new-bonus-ki').value),
      newInt: Number(document.getElementById('new-bonus-int').value),
      newRes: Number(document.getElementById('new-bonus-res').value),
    }
  },

  validateAttributes() {
    const { newStr, newDex, newKi, newInt, newRes } = attributeRealocateHandler.getNewAttributeValues()

    if (newStr == '' &&
      newDex == '' &&
      newKi == '' &&
      newInt == '' &&
      newRes == '') {
      throw new Error('Por favor, digite valores válidos.')
    }

    if (!Number.isInteger(newStr) ||
      !Number.isInteger(newDex) ||
      !Number.isInteger(newKi) ||
      !Number.isInteger(newInt) ||
      !Number.isInteger(newRes)) {
      throw new Error('Por favor, digite valores válidos.')
    }

    if (newStr + handleChar.char.bonusStr + newDex + handleChar.char.bonusDex + newKi + handleChar.char.bonusKi + newInt + handleChar.char.bonusInt + newRes + handleChar.char.bonusRes != handleChar.char.bonusStr + handleChar.char.bonusDex + handleChar.char.bonusKi + handleChar.char.bonusInt + handleChar.char.bonusRes
    ) {
      throw new Error('Os total de pontos realocados não pode modificar o total original de pontos bônus.')
    }

    return
  },

  watchButtonAction() {
    const confirmBtn = document.getElementById('confirm-attribute-realocate')
    const cancelBtn = document.getElementById('cancel-attribute-realocate')

    confirmBtn.addEventListener('click', attributeRealocateHandler.confirmAttributeRealocate)
    cancelBtn.addEventListener('click', attributeRealocateHandler.closeAttributeRealocateModal)
  },

  closeAttributeRealocateModal() {
    const confirmBtn = document.getElementById('confirm-attribute-realocate')
    const cancelBtn = document.getElementById('cancel-attribute-realocate')

    toggleModal(10, 'hide')
    confirmBtn.removeEventListener('click', attributeRealocateHandler.confirmAttributeRealocate)
    cancelBtn.removeEventListener('click', attributeRealocateHandler.closeAttributeRealocateModal)
    attributeRealocateHandler.clearFields()
  },

  updateCharBonusAttributes() {
    const { newStr, newDex, newKi, newInt, newRes } = attributeRealocateHandler.getNewAttributeValues()

    handleChar.char.bonusStr += newStr
    handleChar.char.bonusDex += newDex
    handleChar.char.bonusKi += newKi
    handleChar.char.bonusInt += newInt
    handleChar.char.bonusRes += newRes
    return
  },

  clearFields() {
    const newStr = document.getElementById('new-bonus-str')
    const newDex = document.getElementById('new-bonus-dex')
    const newKi = document.getElementById('new-bonus-ki')
    const newInt = document.getElementById('new-bonus-int')
    const newRes = document.getElementById('new-bonus-res')

    newStr.value = ''
    newDex.value = ''
    newKi.value = ''
    newInt.value = ''
    newRes.value = ''

    return
  },

  confirmAttributeRealocate(e) {
    e.preventDefault()

    try {
      attributeRealocateHandler.validateAttributes()
      attributeRealocateHandler.updateCharBonusAttributes()
      handleChar.updateCharMaxHP()
      handleChar.updateCharMaxSTA()
      handleChar.updateCharMaxKi()
      handleChar.updateRemainingPA(-1)
      attributeRealocateHandler.closeAttributeRealocateModal()
      timeChamber.closeTimeChamber()
      App.reload()
    } catch (error) {
      Toast.open(error.message)
    }
  }
}
