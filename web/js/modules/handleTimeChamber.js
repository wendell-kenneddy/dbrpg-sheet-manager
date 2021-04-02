import { App } from '../App.js';
import { handleChar } from './handleChar.js';
import { toggleModal } from './handleModals.js';
import { Toast } from './handleToast.js';

export const timeChamber = {
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
  onFocusSkillName: '',
  onFocusSkillIndex: null,

  getFilterValue() {
    const filter = document.getElementById('filter')

    return filter.value
  },

  filterCharacteristics() {
    timeChamber.clearCharacteristicsList()
    timeChamber.clearDescriptionContainer()

    const targetArray = timeChamber.getFilterValue() == 'advantages'
      ? timeChamber.advantages
      : timeChamber.disadvantages

    targetArray.forEach((e, i) => {
      timeChamber.printCharacteristic(timeChamber.buildCharacteristicButton(e)
        , i)
    })

    timeChamber.watchDescription()
  },

  buildCharacteristicButton(characteristic) {
    return `<button class="styled-button">${characteristic.name}</button>`
  },

  printCharacteristic(characteristic, index) {
    const characteristicsList = document.querySelector('ul.available-characteristics')

    const li = document.createElement('li')
    li.innerHTML = characteristic
    li.dataset.index = index
    li.setAttribute('name', 'characteristic')

    characteristicsList.appendChild(li)
  },

  clearCharacteristicsList() {
    const characteristics = document.getElementsByName('characteristic')
    const characteristicsList = document.querySelector('ul.available-characteristics')

    if (characteristics.length) {
      for (let i = 0; i < characteristics.length; i++) {
        characteristics[i].removeEventListener('click', timeChamber.printDescription)
      }
    }

    characteristicsList.innerHTML = ''
  },

  watchDescription() {
    const characteristics = document.getElementsByName('characteristic')

    for (let i = 0; i < characteristics.length; i++) {
      characteristics[i].addEventListener('click', timeChamber.printDescription)
      characteristics[i].addEventListener('click', timeChamber.updateOnFocusSkillInfo)
    }
  },

  updateOnFocusSkillInfo(e) {
    const targetArray = timeChamber.getFilterValue() == 'advantages'
      ? timeChamber.advantages
      : timeChamber.disadvantages

    const index = e.currentTarget.dataset.index
    const name = targetArray[index].name

    timeChamber.onFocusSkillName = name
    timeChamber.onFocusSkillIndex = index
  },

  printDescription(e) {
    const descriptionContainer = document.getElementById('characteristic-description')

    if (timeChamber.getFilterValue() == 'advantages') {
      descriptionContainer.innerHTML = timeChamber.advantages[e.currentTarget.dataset.index].description
      return
    } else {
      descriptionContainer.innerHTML = timeChamber.disadvantages[e.currentTarget.dataset.index].description
      return
    }
  },

  clearDescriptionContainer() {
    const descriptionContainer = document.getElementById('characteristic-description')
    descriptionContainer.innerHTML = ''
    return
  },

  closeTimeChamber() {
    const filterBtn = document.getElementById('apply-filter')
    const cancelBtn = document.getElementById('cancel-buy-characteristic')

    toggleModal(8, 'hide')
    timeChamber.clearCharacteristicsList()
    timeChamber.clearDescriptionContainer()
    filterBtn.removeEventListener('click', timeChamber.filterCharacteristics)
    cancelBtn.removeEventListener('click', timeChamber.closeTimeChamber)
    timeChamber.onFocusSkillName = ''
    timeChamber.onFocusSkillIndex = null
    return
  },

  validateCharacteristic() {
    const targetArray = timeChamber.getFilterValue() == 'advantages'
      ? handleChar.char.advantages
      : handleChar.char.disadvantages

    const targetSkillArray = timeChamber.getFilterValue() == 'advantages'
      ? timeChamber.advantages
      : timeChamber.disadvantages

    if (targetSkillArray[timeChamber.onFocusSkillIndex].needCheck) {
      if (targetArray.indexOf(timeChamber.onFocusSkillName) != -1) {
        throw new Error(`Você já possui ${timeChamber.onFocusSkillName}.`)
      }
    }

    if (timeChamber.onFocusSkillIndex == null && timeChamber.onFocusSkillName == '') {
      throw new Error('Por favor, selecione uma vantagem ou desvantagem.')
    }
  },

  buySkill() {
    const targetArray = timeChamber.getFilterValue() == 'advantages'
      ? timeChamber.advantages
      : timeChamber.disadvantages


    targetArray[timeChamber.onFocusSkillIndex].sideEffet()
  },

  tryBuy() {
    try {
      timeChamber.validateCharacteristic()
      timeChamber.buySkill()
    } catch (error) {
      Toast.open(error.message)
    }
  },

  watchCharacteristics() {
    const filterBtn = document.getElementById('apply-filter')
    const cancelBtn = document.getElementById('cancel-buy-characteristic')
    const confirmBtn = document.getElementById('confirm-buy-characteristic')

    filterBtn.addEventListener('click', timeChamber.filterCharacteristics)
    cancelBtn.addEventListener('click', timeChamber.closeTimeChamber)
    confirmBtn.addEventListener('click', timeChamber.tryBuy)
  }
}
