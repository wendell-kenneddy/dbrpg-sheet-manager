import { attributeRealocateModal, timeChamberModal } from './formAndModalHandlers.js';
import { handleChar } from './handleChar.js';
import { App } from '../App.js'
import { Toast } from './handleToast.js';
import { toggleModal } from './handleModals.js';

export const timeChamberItems = {
  /*
    From this point, above each advantage, disadvantage and technique will be
    written a comment indicating it's name.

    Depending of the type (advantage, disadvantage or technique), the objects
    will have some different properties, wich can be a cost value to discount
    from the available P.A of the player, a bonus value that will be added to
    the available P.A, and some properties that indicate if the characteristic
    needs to be checked - if it's already been added - and another property that
    indicates if the characteristic can be removed, so the player won't be able
    to delete he's race advantages and disadvantages.

    The characteristics can also have some validating code, that checks if the
    player has the needed P.A to buy or if the player already have the
    characteristc, and in some cases unique validations specific to the characteristic.
  */

  advantages: [
    // Aceleração
    {
      name: 'Aceleração',
      cost: 1,
      needCheck: true,
      canBeRemoved: true,

      getDescription() {
        const description = `Em virtude de sua boa genética, você é capaz de se mover um pouco mais rápido que os demais. Isto lhe garante vantagem em situações de perseguição, fuga e esquiva. Além disso, você recebe uma ação extra durante seu turno de ação, podendo mover-se duas vezes antes de agir, ou mover-se três vezes. Usar esta vantagem durante o combate consumirá 1 ponto de Fôlego e durará até o fim do combate. Garante um bônus de +1 em Destreza. Custo: ${this.cost} P.A.`;

        return description
      },

      sideEffet() {
        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`P.A insuficientes para comprar ${this.name}.`)
        }

        handleChar.char.primaryAttributes[1].bonus += 1;
        handleChar.addCharAdvantage(this.name)
        handleChar.updateCharMaxStatus('Fôlego')
        handleChar.updateCharActualStatus('P.A', -this.cost)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} adquirido com sucesso!`)
      }
    },

    // Ataque Especial
    {
      name: 'Ataque Especial',
      cost: 1,
      needCheck: true,
      canBeRemoved: true,

      getDescription() {
        const description = `Você recebe a capacidade de criar sua pŕopria técnica, com características únicas. Consulte seu mestre para decidir os efeitos causados pela técnica. Custo: ${this.cost} P.A.`;

        return description
      },

      sideEffet() {
        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`P.A insuficientes para comprar ${this.name}.`)
        }

        handleChar.addCharAdvantage(this.name)
        handleChar.updateCharActualStatus('P.A', -this.cost)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} adquirido com sucesso!`)
      }
    },

    // Blefar
    {
      name: 'Blefar',
      cost: 1,
      needCheck: true,
      canBeRemoved: true,

      getDescription() {
        const description = `Você recebe a capacidade de blefar, uma habilidade que lhe permite vencer lutas mesmo que não possua a força para tal. Tudo que a força não puder resolver, blefar irá. Garente um bônus de +2 em Inteligênia. Custo: ${this.cost} P.A.`;

        return description
      },

      sideEffet() {
        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`P.A insuficientes para comprar ${this.name}.`)
        }

        handleChar.char.primaryAttributes[3].bonus += 1;
        handleChar.addCharAdvantage(this.name)
        handleChar.updateCharActualStatus('P.A', -this.cost)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} adquirido com sucesso!`)
      }
    },

    // Boa Fama
    {
      name: 'Boa Fama',
      cost: 1,
      needCheck: true,
      canBeRemoved: true,

      getDescription() {
        const description = `Você é admirado por todos, seja por sua perícia em combate, aparência, estilo ou mesmo uma única luta marcante. De qualquer forma, você é famoso, admirado e temido. Ser famoso pode trazer vantagens em algumas ocasiões, mas também desvantagens. Será mais difícil agir com furtividade, e se você tiver um ponto fraco, será mais fácil de descobrir. Custo: ${this.cost} P.A.`

        return description
      },

      sideEffet() {
        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`P.A insuficientes para comprar ${this.name}.`)
        }

        handleChar.addCharAdvantage(this.name)
        handleChar.updateCharActualStatus('P.A', -this.cost)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} adquirido com sucesso!`)
      }
    },

    // Deflexão
    {
      name: 'Deflexão',
      cost: 1,
      needCheck: true,
      canBeRemoved: true,

      getDescription() {
        const description = `Você recebe a capacidade de desviar completamente de um ataque, sem sofrer quase nenhum dano. Para isso, você pode gastar 2 pontos de Fôlego para cada tentativa e aumentar sua Destreza em 2 pontos contra um único ataque. O número de vezes que você pode tentar por turno é igual ao seu total de Destreza. Custo: ${this.cost} P.A.`;

        return description
      },

      sideEffet() {
        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`P.A insuficientes para comprar ${this.name}.`)
        }

        handleChar.addCharAdvantage(this.name)
        handleChar.updateCharActualStatus('P.A', -this.cost)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} adquirido com sucesso!`)
      }
    },

    // Energia Extra
    {
      name: 'Energia Extra',
      cost: 1,
      needCheck: true,
      canBeRemoved: true,
      baseLevel: 'Energia Extra (Base)',
      maxLevel: 'Energia Extra (Aprimorado)',

      getDescription() {
        const description = `Você recebe a capacidade de invocar sua força interior, recuperando seus Pontos de Vida. Para tal, você deve gastar 2 pontos do status Ki, recuperando completamente seus Pontos de Vida. Usar esta vantagem leva um turno inteiro, e enquanto estiver concentrando-se, será considerado indefeso. Ao sofrer dano, sua concentração é perdida. A vantagem possui dois níveis: 1 - você só poderá usar Energia Extra em situações de quase morte; 2 - Você poderá usar Energia Extra quando quiser. Custo: 1-2 P.A.`;

        return description
      },

      sideEffet() {
        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`P.A insuficientes para comprar ${this.name}.`)
        }

        if (handleChar.char.advantages.indexOf(this.maxLevel) != -1) {
          throw new Error(`${this.name} já está no nível máximo.`)
        }

        if (handleChar.char.advantages.indexOf(this.baseLevel) == -1) {
          handleChar.addCharAdvantage(this.baseLevel)
          handleChar.updateCharActualStatus('P.A', this.cost)
          timeChamberModal.closeTimeChamber()
          App.reload()
          Toast.open(`${this.name} adquirido com sucesso!`)
          return
        }

        const index = handleChar.char.advantages.indexOf(this.baseLevel);
        handleChar.char.advantages[index] = this.maxLevel;
        handleChar.updateCharActualStatus('P.A', -this.cost)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} aprimorado com sucesso!`)
      }
    },

    // Esconder Intenções
    {
      name: 'Esconder Intenções',
      cost: 1,
      needCheck: true,
      canBeRemoved: true,

      getDescription() {
        const description = `Você recebe a capacidade de enganar seus oponentes, parecendo fraco, covarde, pequeno ou qualquer outro motivo que preferir. Além de maior facilidade ao agir com furtividade, sua aparência inofensiva também o auxiliará em combate. Desse modo, você ganha a iniciativa, recebendo uma ação extra antes mesmo do primeiro turno de combate iniciar. Não funciona com quem já o tenha visto lutar, e o mesmo truque não engana a mesma pessoa duas vezes. Custo: ${this.cost} P.A.`;

        return description
      },

      sideEffet() {
        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`P.A insuficientes para comprar ${this.name}.`)
        }

        handleChar.addCharAdvantage(this.name)
        handleChar.updateCharActualStatus('P.A', -this.cost)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} adquirido com sucesso!`)
      }
    },

    // Rivalidade
    {
      name: 'Rivalidade',
      cost: 1,
      needCheck: false,
      canBeRemoved: true,

      getDescription() {
        const description = `Você recebe um treinamento especial, ou passa a nutrir certa rivalidade com determinadas raças, conhecendo bem suas fraquezas e habilidades. Escolha entre as raças disponíveis. Garante um bônus de +2 em Inteligência e Resistência. Custo: ${this.cost} P.A.`;

        return description
      },

      sideEffet() {
        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`P.A insuficientes para comprar ${this.name}.`)
        }

        const validateRace = () => {
          const rivalRace = document.getElementById('desired-race').value;
          if (handleChar.char.advantages.indexOf(`${this.name} (${rivalRace})`) != -1) {
            throw new Error('Você já possui Rivalidade com esta raça.')
          }
        }

        const closeRivalRaceModal = () => {
          const confirmBtn = document.getElementById('confirm-desired-race');
          const cancelBtn = document.getElementById('cancel-desired-race');
          toggleModal(10, 'hide')
          confirmBtn.removeEventListener('click', confirmRivalRace)
          cancelBtn.removeEventListener('click', closeRivalRaceModal)
        }

        const confirmRivalRace = () => {
          const rivalRace = document.getElementById('desired-race').value;

          try {
            validateRace()
            handleChar.addCharAdvantage(`${this.name} (${rivalRace})`)
            handleChar.char.primaryAttributes[3].bonus += 2;
            handleChar.char.primaryAttributes[4].bonus += 2;
            handleChar.updateCharMaxStatus('PV')
            handleChar.updateCharActualStatus('P.A', -this.cost)
            closeRivalRaceModal()
            timeChamberModal.closeTimeChamber()
            App.reload()
            Toast.open('Rivalidade adicionada com sucesso!')
          } catch (error) {
            Toast.open(error.message)
          }
        }

        toggleModal(10, 'show')
        const confirmBtn = document.getElementById('confirm-desired-race');
        const cancelBtn = document.getElementById('cancel-desired-race');
        confirmBtn.addEventListener('click', confirmRivalRace)
        cancelBtn.addEventListener('click', closeRivalRaceModal)
        return
      }
    },

    // Memória Expandida
    {
      name: 'Memória Expandida',
      cost: 1,
      needCheck: true,
      canBeRemoved: true,

      getDescription() {
        const description = `Você recebe uma dádiva que melhora consideravelmente sua memória, possibilitando que lembre de tudo relacionado aos cinco sentidos. Desse modo, você se torna capaz de gravar perícias simplesmente ao ver uma pessoa utilizá-la. Contudo, você não pode manter mais de uma perícia ao mesmo tempo. Para gravar uma nova, deve apagar uma já existente. Personagens com esta vantagem não necessitam realizar testes para aprender novas magias. Custo: ${this.cost} P.A.`;

        return description
      },

      sideEffet() {
        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`P.A insuficientes para comprar ${this.name}.`)
        }

        handleChar.addCharAdvantage(this.name)
        handleChar.updateCharActualStatus('P.A', -this.cost)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} adquirido com sucesso!`)
      }
    },

    // Partes Mecânicas
    {
      name: 'Partes Mecânicas',
      cost: 1,

      getDescription() {
        const description = `Você recebe a capacidade de reconstruir um ou mais membros perdidos consultando um especialista. Cada membro reconstruído dá a possibilidade de realocar 3 pontos de atributos Você deve utilizar Partes Mecânicas para cada membro perdido. Custo: ${this.cost} P.A.`;

        return description
      },

      sideEffet() {
        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`P.A insuficientes para comprar ${this.name}.`)
        }

        toggleModal(11, 'show')
        attributeRealocateModal.watchAttributeRealocate()
        return
      }
    },

    // Poder Oculto
    {
      name: 'Poder Oculto',
      cost: 1,
      needCheck: true,
      canBeRemoved: true,

      getDescription() {
        const description = `Você recebe a capacidade de manifestar seu verdadeiro poder em situações de combate ou emergenciais (à critério do mestre). Você pode gastar um ponto de seu status Ki para aumentar em +1 qualquer atributo, um máximo de + 5. Como alternativa, seu Poder Oculto pode afetar apenas uma característica, escolhida durante sua criação de personagem (consulte seu mestre). Neste caso, Poder Oculto irá aumentar em +2 o atributo selecionado, até um máximo de +10. Poder Oculto não pode ser ativado em situações que não envolvam perigo, o que significa que não pode ser ativado fora de combate. Para Poder Oculto ser ativado, levará um turno para cada aumento de atributo - 5 turnos se quiser elevar seu atributo Força em +3 e seu atributo Inteligência em +2, por exemplo. Enquanto concentra-se para ativar seu Poder Oculto, ficará totalmente indefeso. Receber ataques enquanto se concentra lhe fará perder completamente a concentração. Uma vez ativado, Poder Oculto durará até o fim do combate. Contudo, se seus Pontos de Vida chegarem a 0, Poder Oculto será desativado. Custo: ${this.cost} P.A.`;

        return description
      },

      sideEffet() {
        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`P.A insuficientes para comprar ${this.name}.`)
        }

        handleChar.addCharAdvantage(this.name)
        handleChar.updateCharActualStatus('P.A', -this.cost)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} adquirido com sucesso!`)
      }
    },

    // Sobrecarga de Ki
    {
      name: 'Sobrecarga de Ki',
      cost: 1,

      getDescription() {
        const description = `Você recebe um treinamento árduo que o ajuda a controlar melhor seu Ki, aumentando em +1 seus pontos base de Ki. Custo: ${this.cost} P.A.`;

        return description
      },

      sideEffet() {
        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`P.A insuficientes para comprar ${this.name}.`)
        }

        handleChar.addCharAdvantage(this.name)
        handleChar.char.primaryAttributes[2].base += 1
        handleChar.updateCharActualStatus('P.A', -this.cost)
        handleChar.updateCharMaxStatus('Ki')
        handleChar.updateCharSecondaryAttributes()
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} adquirido com sucesso!`)
      }
    },

    // Sobrecarga de Resistência
    {
      name: 'Sobrecarga de Resistência',
      cost: 1,

      getDescription() {
        const description = `Você recebe um árduo treinamento para fortalecer sua resistência, aumentando +1 seus pontos base de Resistência. Custo: ${this.cost} P.A.`;

        return description
      },

      sideEffet() {
        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`P.A insuficientes para comprar ${this.name}.`)
        }

        handleChar.addCharAdvantage(this.name)
        handleChar.char.primaryAttributes[4].base += 1;
        handleChar.updateCharActualStatus('P.A', -this.cost)
        handleChar.updateCharMaxStatus('PV')
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} adquirido com sucesso!`)
      }
    },

    // Reencarnação
    {
      name: 'Reencarnação',
      cost: 3,

      getDescription() {
        const description = `Você recebe a dádiva de reecarnar numa outra versão de você, graças ao Plano Espiritual. Desse modo, você pode escolher uma outra raça, com exceção de Andróide. Reencarnar irá remover todas as suas vantagens, desvantagens, técnicas e itens adquiridos, além de resetar seu nível e atributos, de acordo com a raça desejada. Custo: ${this.cost} P.A.`;

        return description
      },

      sideEffet() {
        if (handleChar.char.race == 'Humano') {
          this.cost = 0;
        }

        if (!handleChar.char.reencarnatedRaces) {
          handleChar.char.reencarnatedRaces = [];
        }

        if (handleChar.char.status[4].actual != 0) {
          throw new Error('Seus Pontos de Vida devem ser reduzidos a zero para que possa reencarnar.')
        }

        if (handleChar.char.status[3] < this.cost) {
          throw new Error(`P.A insuficientes para comprar ${this.name}.`)
        }

        const closeReencarnateModal = () => {
          toggleModal(10, 'hide')
          const confirmBtn = document.getElementById('confirm-desired-race');
          const cancelBtn = document.getElementById('cancel-desired-race');
          confirmBtn.removeEventListener('click', confirmReencarnate)
          cancelBtn.removeEventListener('click', closeReencarnateModal)
          return
        }

        const validateRace = () => {
          const race = document.getElementById('desired-race').value;

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

          return
        }

        const updateCharAdvantagesAndDisadvantages = () => {
          handleChar.char.advantages = charUtilites.raceSpecs[charUtilites.findRaceSpecs(handleChar.char.race)].advantages;
          handleChar.char.disadvantages = charUtilites.raceSpecs[charUtilites.findRaceSpecs(handleChar.char.race)].disadvantages;
          handleChar.char.specificCharacteristics = {};
          return
        }

        const updateRace = () => {
          const race = document.getElementById('desired-race').value;
          handleChar.char.race = race;
          return
        }

        const updateReencarnatedRaces = () => {
          handleChar.char.reencarnatedRaces.push(handleChar.char.race);
          return
        }

        const updateCharRaceAttributes = () => {
          handleChar.char.primaryAttributes[0].race = charUtilites.raceSpecs[charUtilites.findRaceSpecs(handleChar.char.race)].raceStr;
          handleChar.char.primaryAttributes[1].race = charUtilites.raceSpecs[charUtilites.findRaceSpecs(handleChar.char.race)].raceDex;
          handleChar.char.primaryAttributes[2].race = charUtilites.raceSpecs[charUtilites.findRaceSpecs(handleChar.char.race)].raceKi;
          handleChar.char.primaryAttributes[3].race = charUtilites.raceSpecs[charUtilites.findRaceSpecs(handleChar.char.race)].raceInt;
          handleChar.char.primaryAttributes[4].race = charUtilites.raceSpecs[charUtilites.findRaceSpecs(handleChar.char.race)].raceRes;
          return
        }

        const resetCharSpecs = () => {
          handleChar.char.items = [];
          handleChar.char.techniques = [];

          if (handleChar.char.codeOfHonorVoteCount && handleChar.char.codeOfHonorVotes) {
            handleChar.char.codeOfHonorVotes = [];
            handleChar.char.codeOfHonorVoteCount = 0;
          }

          for (let i = 0; i < handleChar.char.primaryAttributes.length; i++) {
            handleChar.char.primaryAttributes[i].bonus = 0;
            handleChar.char.primaryAttributes[i].arbitrary = 0;
          }

          for (let i = 0; i < handleChar.char.secondaryAttributes.length; i++) {
            handleChar.char.secondaryAttributes[i].arbitrary = 0;
          }

          return
        }

        const updateCharStatus = () => {
          handleChar.char.exp = 0;
          handleChar.char.level = 1;
          handleChar.updateCharMaxStatus('PV')
          handleChar.updateCharMaxStatus('Fôlego')
          handleChar.updateCharMaxStatus('Ki')
          handleChar.updateCharActualStatus('PV', handleChar.char.status[4].max)
          handleChar.updateCharActualStatus('Fôlego', handleChar.char.status[1].max)
          handleChar.updateCharActualStatus('Ki', handleChar.char.status[2].max)
        }

        const confirmReencarnate = () => {
          try {
            validateRace()
            updateRace()
            updateCharRaceAttributes()
            updateReencarnatedRaces()
            resetCharSpecs()
            updateCharAdvantagesAndDisadvantages()
            updateCharStatus()
            handleChar.updateCharSecondaryAttributes()
            handleChar.updateCharActualStatus('P.A', -this.cost)
            closeReencarnateModal()
            timeChamberModal.closeTimeChamber()
            App.reload()
            Toast.open('Reencarnação realizada com sucesso!')
          } catch (error) {
            Toast.open(error.message)
          }
        }

        toggleModal(10, 'show')
        const confirmBtn = document.getElementById('confirm-desired-race')
        const cancelBtn = document.getElementById('cancel-desired-race')
        confirmBtn.addEventListener('click', confirmReencarnate)
        cancelBtn.addEventListener('click', closeReencarnateModal)
        return
      }
    },

    // Reflexão
    {
      name: 'Reflexão',
      cost: 2,
      needCheck: true,
      canBeRemoved: true,

      getDescription() {
        const description = `Similar a Deflexão, porém melhor. Além de desviar do ataque, você recebe a capacidade de desferí-lo de volta ao atacante. Para tal, você pode gastar 2 pontos de seu status Ki e duplicar seu total de Força ou Ki para calcular sua defesa total contra um único ataque. Caso consiga deter completamente o ataque, não sofrerá dano algum, e lançará o ataque de volta para o agressor. Reflexão é considerada esquiva, o que significa que o total de vezes que pode ser usada em combate é igual ao seu total de defesa. Custo: ${this.cost} P.A.`;

        return description
      },

      sideEffet() {
        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`P.A insuficientes para comprar ${this.name}.`)
        }

        handleChar.addCharAdvantage(this.name)
        handleChar.updateCharActualStatus('P.A', -this.cost)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} adquirido com sucesso!`)
      }
    },

    // Sentir Ki
    {
      name: 'Sentir Ki',
      cost: 1,
      baseLevel: 'Sentir Ki (Base)',
      maxLevel: 'Sentir Ki (Aguçado)',

      getDescription() {
        const description = `Você recebe a capacidade de sentir a presença e a assinatura de qualquer ser vivo. Para tal, realize um teste de Inteligência + Ki para sentir uma assinatura de Ki ou presença. Caso gaste 2 P.A, Sentir Ki se tornará Sentir Ki (Aguçado), o que lhe permite também determinar se a presença é benigna ou malígna. Sentir Ki (Aguçado) também descarta a necessidade de realizar qualquer teste, e pode ser aprendido também via treinamento. Custo: ${this.cost} P.A.`;

        return description
      },

      sideEffet() {
        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`P.A insuficientes para comprar ${this.name}.`)
        }

        if (handleChar.char.advantages.indexOf(this.maxLevel) != -1) {
          throw new Error(`${this.name} já está no nível máximo.`)
        }

        if (handleChar.char.advantages.indexOf(this.baseLevel) == -1) {
          handleChar.char.advantages.push(this.baseLevel)
          handleChar.updateCharActualStatus('P.A', -this.cost)
          timeChamberModal.closeTimeChamber()
          App.reload()
          Toast.open(`${this.name} adquirido com sucesso!`)
          return
        }

        const index = handleChar.char.advantages.indexOf(this.baseLevel);
        handleChar.char.advantages[index] = this.maxLevel;
        handleChar.updateCharActualStatus('P.A', -this.cost)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} aprimorado com sucesso!`)
        return
      }
    },
  ],
  disadvantages: [
    // Tormenta
    {
      name: 'Tormenta',
      bonus: 2,
      needCheck: true,
      canBeRemoved: true,

      getDescription() {
        const description = `Você recebe uma tormenta, que pode ser uma lembrança perturbadora ou algum espírito maligno. Ninguém pode sentir a Tormenta além de você mesmo, e além disso, Tormenta o deixará em paz apenas quando você estiver satisfeito ou cansado. Não importa o que seja, sempre que entrar em combate, o mestre realizará um teste, e caso o resultado esteja entre 4 e 6, Tormenta o afetará, e reduzirá em -1 todos os seus atributos. À critério do mestre, Tormenta pode aparecer também em outras ocasiões. Bônus de P.A: ${this.bonus}.`;

        return description
      },

      sideEffet() {
        handleChar.addCharDisadvantage(this.name)
        handleChar.updateCharActualStatus('P.A', this.bonus)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} adquirido com sucesso!`)
      }
    },

    // Código de Honra
    {
      name: 'Código de Honra',
      bonus: 1,

      getDescription() {
        const description = `Você passa a seguir um código de honra que o implica a fazer ou deixar de fazer determinadas ações - o voto é escolhido aleatoriamente, leia o manual para ver cada um. Bônus de P.A: ${this.bonus}.`;

        return description
      },

      sideEffet() {
        if (!handleChar.char.codeOfHonorVoteCount && !handleChar.char.codeOfHonorVotes) {
          handleChar.char.codeOfHonorVoteCount = 0;
          handleChar.char.codeOfHonorVotes = [];
        }

        if (handleChar.char.codeOfHonorVoteCount == 4) {
          throw new Error('Limite de votos atingido.')
        }

        let vote = 0;

        for (let i = 0; i < 10; i++) {
          vote = Math.round(Math.random() * (10 - 1) + 1)

          if (handleChar.char.codeOfHonorVotes.indexOf(vote) == -1) {
            handleChar.char.codeOfHonorVotes.push(vote)
            break;
          }
        }

        handleChar.updateCharActualStatus('P.A', this.bonus)
        handleChar.addCharDisadvantage(`${this.name} (${vote})`)
        handleChar.char.codeOfHonorVoteCount += 1;
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} (${vote}) adquirido com sucesso!`)
      }
    },

    // Covarde
    {
      name: 'Covarde',
      bonus: 1,
      needCheck: true,
      canBeRemoved: true,

      getDescription() {
        const description = `Você subitamente passa a achar que não foi feito para o combate. Mesmo quando precisar salvar sua própria vida, sofrerá uma penalidade de -2 no seu total de defesa. Bônus de P.A: ${this.bonus}.`;

        return description
      },

      sideEffet() {
        handleChar.addCharDisadvantage(this.name)
        handleChar.updateCharActualStatus('P.A', this.bonus)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} adquirido com sucesso!`)
      }
    },

    // Audição Ruim
    {
      name: 'Audição Ruim',
      bonus: 1,
      needCheck: true,
      canBeRemoved: true,

      getDescription() {
        const description = `Você subitamente perde parte de sua audição, sofrendo uma penalidade de -1 para notar inimigos escondidos. Bônus de P.A: ${this.bonus}.`;

        return description
      },

      sideEffet() {
        handleChar.addCharDisadvantage(this.name)
        handleChar.updateCharActualStatus('P.A', this.bonus)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} adquirido com sucesso!`)
      }
    },

    // Visão Turva
    {
      name: 'Visão Turva',
      bonus: 2,
      needCheck: true,
      canBeRemoved: true,

      getDescription() {
        const description = `Você subitamente perde parte de sua visão, vendo o mundo ao seu redor de maneira turva. Desse modo, sofrerá sempre uma penalidade de -1 em Força para ataques corporais, -3 em Força para ataques à distância e -3 em Destreza para esquivas. Além disso, sofrerá um redutor de -1 para notar inimigos escondidos, utilizando apenas seus outros sentidos (em situações onde você não possa usar nem mesmo o tato ou o olfato, o teste será negado). Bônus de P.A: ${this.bonus}.`;

        return description
      },

      sideEffet() {
        handleChar.addCharDisadvantage(this.name)
        handleChar.updateCharActualStatus('P.A', this.bonus)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} adquirido com sucesso!`)
      }
    },

    // Incapaz de Falar
    {
      name: 'Incapaz de Falar',
      bonus: 1,
      needCheck: true,
      canBeRemoved: true,

      getDescription() {
        const description = `Você subitamente perde consideravelmente sua capacidade de se comunicar, exceto com personagens que possam utilizar telepatia. Testes que envolvam ações sociais serão sempre considerados difíceis. Bônus de P.A: ${this.bonus}.`;

        return description
      },

      sideEffet() {
        handleChar.addCharDisadvantage(this.name)
        handleChar.updateCharActualStatus('P.A', this.bonus)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} adquirido com sucesso!`)
      }
    },

    // Péssimo Olfato
    {
      name: 'Péssimo Olfato',
      bonus: 1,
      needCheck: true,
      canBeRemoved: true,

      getDescription() {
        const description = `Você subitamente perde consideravelmente seu olfato, sendo incapaz de sentir até mesmo seu próprio cheiro. Você não pode, por exemplo, distinguir somente pela aparência se um alimento está estragado ou não. Bônus de P.A: ${this.bonus}.`;

        return description
      },

      sideEffet() {
        handleChar.addCharDisadvantage(this.name)
        handleChar.updateCharActualStatus('P.A', this.bonus)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} adquirido com sucesso!`)
      }
    },

    // Sem Paladar
    {
      name: 'Sem Paladar',
      bonus: 1,
      needCheck: true,
      canBeRemoved: true,

      getDescription() {
        const description = `Você subitamente perde consideravelmente seu paladar, sendo incapaz de distinguir se um alimento está estragado somente pelo gosto, por exemplo. Contudo, você não sente tanta fome, visto que será capaz de comer pratos que revirariam o estômago de um avestruz. Bônus de P.A: ${this.bonus}.`;

        return description
      },

      sideEffet() {
        handleChar.addCharDisadvantage(this.name)
        handleChar.updateCharActualStatus('P.A', this.bonus)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} adquirido com sucesso!`)
      }
    },

    // Perda de Foco
    {
      name: 'Perda de Foco',
      bonus: 2,
      needCheck: true,
      canBeRemoved: true,

      getDescription() {
        const description = `Você subitamente passa a perder facilmente o foco, perdendo a vontade de lutar ou ficando desatento mais facilmente, não importando a gravidade da situação. Vale para qualquer tipo de situação, desde lutas à testes. Bônus de P.A: ${this.bonus}.`;

        return description
      },

      sideEffet() {
        handleChar.addCharDisadvantage(this.name)
        handleChar.updateCharActualStatus('P.A', this.bonus)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} adquirido com sucesso!`)
      }
    },

    // Fúria
    {
      name: 'Fúria',
      bonus: 1,
      needCheck: true,
      canBeRemoved: true,

      getDescription() {
        const description = `Você subitamente sente sua mentalidade mudar. De agora em diante, será impossível controlar sua Fúria. Sempre que receber dano ou irritar-se (à critério do mestre), deverá realizar um Teste de Resistência. Se falhar, entrará em Fúria, atacando automaticamente o alvo da Fúria. Durante a Fúria, sua mente se tornará uma tempestade, impedindo-o de esquivar, usar Ki ou qualquer Habilidade de Ki. A Fúria cessará quando você ou o seu oponente forem derrotados, ou se seu oponente fugir e, após isso, você ficará completamente esgotado. Devido ao cansaço extremo, sofrerá uma penalidade de -1 em todos os seus atributos. As penalidades acumulam para cada vez que entrar em Fúria. Garante um bônus de +2 em Força e Resistência. Bônus de P.A: ${this.bonus}.`;

        return description
      },

      sideEffet() {
        handleChar.addCharDisadvantage(this.name)
        handleChar.updateCharActualStatus('P.A', this.bonus)
        handleChar.char.primaryAttributes[1].bonus += 2;
        handleChar.char.primaryAttributes[4].bonus += 2;
        handleChar.updateCharMaxStatus('PV')
        handleChar.updateCharSecondaryAttributes()
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} adquirido com sucesso!`)
      }
    },

    // Inculto
    {
      name: 'Inculto',
      bonus: 1,
      needCheck: true,
      canBeRemoved: true,

      getDescription() {
        const description = `Você subitamente perde os costumes de comunicação e vivência em sociedade. Seu modo de agir se tornará primitivo, o que significa que não saberá mais ler ou terá extrema dificuldade para tal, além de grande dificuldade para se comunicar com as pessoas. Bônus de P.A: ${this.bonus}.`;

        return description
      },

      sideEffet() {
        handleChar.addCharDisadvantage(this.name)
        handleChar.updateCharActualStatus('P.A', this.bonus)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} adquirido com sucesso!`)
      }
    },

    // Má Fama
    {
      name: 'Má Fama',
      bonus: 1,
      needCheck: true,
      canBeRemoved: true,

      getDescription() {
        const description = `Você subitamente perde qualquer credibilidade que tenha adquirido em vida, tornando-se completamente infame. Talvez por uma má experiência em combate, uma humilhação em público ou seja lá qual for o motivo. A partir de agora, será muito mais difícil adquirir a confiança das pessoas, que te olharão sempre com olhos turvos. Além disso, sua presença em um grupo tornará todos os membros suspeitos também. Ademais, caso seja constatado algum crime, muito provavelmente você será perseguido, mesmo que seja inocente. Bônus de P.A: ${this.bonus}.`;

        return description
      },

      sideEffet() {
        handleChar.addCharDisadvantage(this.name)
        handleChar.updateCharActualStatus('P.A', this.bonus)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} adquirido com sucesso!`)
      }
    },

    // Maneta
    {
      name: 'Maneta',
      bonus: 1,
      needCheck: true,
      canBeRemoved: true,

      getDescription() {
        const description = `Você subitamente perde um de seus braços ou de suas mãos, curiosamente não sentindo dor alguma. A partir de agora, será mais difícil manipular objetos com a mesma destreza, e você sofrerá uma penalidade de -1 em qualquer teste que envolva Ataque ou Defesa. Bônus de P.A: ${this.bonus}.`;

        return description
      },

      sideEffet() {
        handleChar.addCharDisadvantage(this.name)
        handleChar.updateCharActualStatus('P.A', this.bonus)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} adquirido com sucesso!`)
      }
    },

    // Preguiçoso
    {
      name: 'Preguiçoso',
      bonus: 1,
      needCheck: true,
      canBeRemoved: true,

      getDescription() {
        const description = `Você subitamente sente sua força de vontade para qualquer ação ser consumida por preguiça, não importando quão devoto à ou honrosa fosse a ação. A partir de agora, deverá realizar um teste a tudo que resolver fazer. Se quiser arrombar uma porta usando um chute, por exemplo, deverá realizar um Teste de Força, e se falhar, não terá êxito. Além disso, a dificuldade do teste aumentará conforme você falhar. Bônus de P.A: ${this.bonus}.`;

        return description
      },

      sideEffet() {
        handleChar.addCharDisadvantage(this.name)
        handleChar.updateCharActualStatus('P.A', this.bonus)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} adquirido com sucesso!`)
      }
    },

    // Ponto Fraco
    {
      name: 'Ponto Fraco',
      bonus: 1,
      needCheck: true,
      canBeRemoved: true,

      getDescription() {
        const description = `Você subitamente se sente mais desleixado, abrindo brecha para que seus oponentes encontrem seu Ponto Fraco. A partir de agora, qualquer oponente que conhecer seu Ponto Fraco receberá um bônus de +1 em Destreza ao lutar com você. Seu Ponto Fraco só poderá ser descoberto por pessoas que o tenham visto lutar ao menos uma vez. Você pode tentar descobrir o Ponto Fraco de um oponente realizando um teste de Destreza + Inteligência enquanto o assiste lutar, e se tiver êxito, receberá um bônus de +1 em Destreza sempre que lutar com ele. Caso possua Boa Fama ou Má Fama, automaticamente quase todo mundo saberá seu Ponto Fraco. Bônus de P.A: ${this.bonus}.`;

        return description
      },

      sideEffet() {
        handleChar.addCharDisadvantage(this.name)
        handleChar.updateCharActualStatus('P.A', this.bonus)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} adquirido com sucesso!`)
      }
    },

    // Rival Definitivo
    {
      name: 'Rival Definitivo',
      bonus: 1,
      needCheck: true,
      canBeRemoved: true,

      getDescription() {
        const description = `Você subitamente declara sua rivalidade à uma pessoa, cuja lembrança o enche de ódio (diferente de Rivalidade). Durante a aventura, deverá escolher um NPC (personagem do mestre) ou jogador, e declará-lo como seu Rival Definitivo. Sempre que encontrar seu Rival Definitvo, deverá travar uma batalha com ele, e caso perca, sofrerá uma penalidade de -5 em EXP. Se não houver EXP disponível no momento, assim que atingir 5 pontos, sua EXP será reduzida a 0. Sua ficha não poderá ser evolúida até que pague a penalidade. Além disso, se andar ao lado de seu Rival Definitvo, deverá travar uma batalha com ele a cada 15 dias. Bônus de P.A: ${this.bonus}.`;

        return description
      },

      sideEffet() {
        handleChar.addCharDisadvantage(this.name)
        handleChar.updateCharActualStatus('P.A', this.bonus)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} adquirido com sucesso!`)
      }
    },
  ],
  techniques: [
    // Kamehameha
    {
      name: 'Kamehameha',
      cost: 1,
      needCheck: true,
      canBeRemoved: true,

      getDescription() {
        const description = `Técnica rápida que pode ser carregada a cada dois turnos, acrescentando 1d6. Dano: Ataque Especial + 1d6. Custo de Ki: 3. Custo de P.A: ${this.cost}.`;

        return description
      },

      sideEffet() {

        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.addTechnique(this.name)
        handleChar.updateCharActualStatus('P.A', -this.cost)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} aprendido com sucesso!`)
      }
    },

    // Super Kamehamhea
    {
      name: 'Super Kamehameha',
      cost: 1,
      needCheck: true,
      canBeRemoved: true,
      requirement: 'Kamehameha',


      getDescription() {
        const description = `Versão aprimorada do Kamehameha. Diminui o tempo para carregar. Custo de P.A: ${this.cost}.`;

        return description
      },

      sideEffet() {

        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        if (handleChar.char.techniques.indexOf(this.requirement) == -1) {
          throw new Error(`Você deve aprender ${this.requirement} para aprender ${this.name}.`)
        }

        handleChar.addTechnique(this.name)
        handleChar.updateCharActualStatus('P.A', -this.cost)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} aprendido com sucesso!`)
      }
    },

    // Genki Dama
    {
      name: 'Genki Dama',
      cost: 2,
      needCheck: true,
      canBeRemoved: true,

      getDescription() {
        const description = `Técnica Extremamente poderosa se carregada devidamente. Cada turno carregando utiliza 1 ponto de Ki para gerar um ponto de dano, que será multiplicado com seu total de Ataque Especial para gerar o dano final. Dano: Ataque x pontos utilizados. Custo de Ki: 1 ponto/turno. Custo de P.A: ${this.cost}.`;

        return description
      },

      sideEffet() {

        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.addTechnique(this.name)
        handleChar.updateCharActualStatus('P.A', -this.cost)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} aprendido com sucesso!`)
      }
    },

    // Super Genki Dama
    {
      name: 'Super Genki Dama',
      cost: 4,
      needCheck: true,
      canBeRemoved: true,
      requirement: 'Genki Dama',

      getDescription() {
        const description = `Versão aprimorada da Genki Dama. É necessário ter aprendido Genki Dama para adquirir Super Genkidama. Aumenta o dano de canalização de 1 para 2 para cada ponto de Ki gasto. Custo de P.A: ${this.cost}.`;

        return description
      },

      sideEffet() {

        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        if (handleChar.char.techniques.indexOf(this.requirement) == -1) {
          throw new Error(`Você deve aprender ${this.requirement} para aprender ${this.name}.`)
        }

        handleChar.addTechnique(this.name)
        handleChar.updateCharActualStatus('P.A', -this.cost)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} aprendido com sucesso!`)
      }
    },

    // Kaioken
    {
      name: 'Kaioken',
      cost: 1,
      needCheck: true,
      canBeRemoved: true,

      getDescription() {
        const description = `Uma técnica que dá grande poder e velocidade ao usuário mas que causa severos danos ao corpo. O usuário deve declarar o nível que deseja utilizar (Kaioken x20, por exemplo). Bônus (Arbitrário): +2 em Força, Destreza, Ki, Resistência, Ataque, Defesa e Ataque Especial e +1 para cada atributo a depender do nível utilizado. Custo de PV: -1 multiplicado pelo nível utilizado por turno (Kaioken x4 consome 4 PV por turno, por exemplo). Custo de P.A: ${this.cost}.`;

        return description
      },

      sideEffet() {

        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.addTechnique(this.name)
        handleChar.updateCharActualStatus('P.A', -this.cost)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} aprendido com sucesso!`)
      }
    },

    // Super Saiyajin
    {
      name: 'Super Saiyajin',
      cost: 2,
      needCheck: true,
      canBeRemoved: true,

      getDescription() {
        const description = `Transformação da raça Saiyajin, ativada por meio da raiva intensa. Leva um turno para ser ativada e garante um considerável aumento de poder para o guerreiro. Bônus (Arbitrário): +1 em Força, Destreza, Ki e Resistência. Custo de Ki: 1 ponto/turno. Custo de P.A: ${this.cost}.`;

        return description
      },

      sideEffet() {

        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        if (handleChar.char.race != 'Saiyajin (Puro)' && handleChar.char.race != 'Saiyajin (Híbrido)') {
          throw new Error(`Você deve ser da raça Saiyajin para aprender as transformações de Super Saiyajin.`)
        }

        handleChar.addTechnique(this.name)
        handleChar.updateCharActualStatus('P.A', -this.cost)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} aprendido com sucesso!`)
      }
    },

    // Ultra Super Saiyajin
    {
      name: 'Ultra Super Saiyajin',
      cost: 1,
      needCheck: true,
      requirement: 'Super Saiyajin',
      canBeRemoved: true,

      getDescription() {
        const description = `Versão aprimorada (facultativa) do Super Saiyajin. É necessário ter aprendido Super Saiyajin para aprender Ultra Super Saiyajin. Bônus (Arbitrário): +2 em Força, Ki e Resistência Recebe um debuff de -2 em Destreza. Custo de Ki: 2 pontos por turno. Custo de P.A: ${this.cost}.`;

        return description
      },

      sideEffet() {

        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        if (handleChar.char.techniques.indexOf(this.requirement) == -1) {
          throw new Error(`Você deve ter aprendido ${this.requirement} para aprender ${this.name}.`)
        }

        if (handleChar.char.race != 'Saiyajin (Puro)' && handleChar.char.race != 'Saiyajin (Híbrido)') {
          throw new Error(`Você deve ser da raça Saiyajin para aprender as transformações de Super Saiyajin.`)
        }

        handleChar.addTechnique(this.name)
        handleChar.updateCharActualStatus('P.A', -this.cost)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} aprendido com sucesso!`)
      }
    },

    // Super Saiyajin 2
    {
      name: 'Super Saiyajin 2',
      cost: 2,
      needCheck: true,
      requirement: 'Super Saiyajin',
      canBeRemoved: true,

      getDescription() {
        const description = `Versão aprimorada do Super Saiyajin. É necessário ter aprendido Super Saiyajin para aprender Super Saiyajin 2. Bônus (Arbitrário): +2 em Força, Destreza, Ki e Resistência. Custo de Ki: 2 pontos por turno. Custo de P.A: ${this.cost}.`;

        return description
      },

      sideEffet() {

        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        if (handleChar.char.techniques.indexOf(this.requirement) == -1) {
          throw new Error(`Você deve ter aprendido ${this.requirement} para aprender ${this.name}.`)
        }

        if (handleChar.char.race != 'Saiyajin (Puro)' && handleChar.char.race != 'Saiyajin (Híbrido)') {
          throw new Error(`Você deve ser da raça Saiyajin para aprender as transformações de Super Saiyajin.`)
        }

        handleChar.addTechnique(this.name)
        handleChar.updateCharActualStatus('P.A', -this.cost)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} aprendido com sucesso!`)
      }
    },

    // Super Saiyajin 3
    {
      name: 'Super Saiyajin 3',
      cost: 3,
      needCheck: true,
      requirement: 'Super Saiyajin 2',
      canBeRemoved: true,

      getDescription() {
        const description = `Versão aprimorada do Super Saiyajin 2. É necessário ter aprendido Super Saiyajin 2 para aprender Super Saiyajin 3. Bônus (Arbitrário): +3 em Força, Destreza, Ki e Resistência. Custo de Ki: 3 pontos por turno. Custo de P.A: ${this.cost}.`;

        return description
      },

      sideEffet() {

        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        if (handleChar.char.techniques.indexOf(this.requirement) == -1) {
          throw new Error(`Você deve ter aprendido ${this.requirement} para aprender ${this.name}.`)
        }

        if (handleChar.char.race != 'Saiyajin (Puro)' && handleChar.char.race != 'Saiyajin (Híbrido)') {
          throw new Error(`Você deve ser da raça Saiyajin para aprender as transformações de Super Saiyajin.`)
        }

        handleChar.addTechnique(this.name)
        handleChar.updateCharActualStatus('P.A', -this.cost)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} aprendido com sucesso!`)
      }
    },

    // Super Saiyaijn 4
    {
      name: 'Super Saiyajin 4',
      cost: 4,
      needCheck: true,
      requirement: 'Super Saiyajin 3',
      canBeRemoved: true,

      getDescription() {
        const description = `A transformação que concede acesso ao poder nato de um Saiyajin. Para aprender Super Saiyajin 4 é necessário ter aprendido Super Saiyajin 3 e possuir uma cauda - este último requisito fica à bom senso do jogador. Bônus (Arbitrário): +5 em Força, Destreza, Ki e Resistência. Custo de Ki: 4 pontos por turno. Custo de P.A: ${this.cost}.`;

        return description
      },

      sideEffet() {

        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        if (handleChar.char.techniques.indexOf(this.requirement) == -1) {
          throw new Error(`Você deve ter aprendido ${this.requirement} para aprender ${this.name}.`)
        }

        if (handleChar.char.race != 'Saiyajin (Puro)' && handleChar.char.race != 'Saiyajin (Híbrido)') {
          throw new Error(`Você deve ser da raça Saiyajin para aprender as transformações de Super Saiyajin.`)
        }

        handleChar.addTechnique(this.name)
        handleChar.updateCharActualStatus('P.A', -this.cost)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} aprendido com sucesso!`)
      }
    },

    // Super Saiyain Deus
    {
      name: 'Super Saiyajin Deus',
      cost: 8,
      needCheck: true,
      requirement: 'Super Saiyajin 3',
      canBeRemoved: true,

      getDescription() {
        const description = `A transformação de um Saiyajin que atingiu o nível de um deus. Para aprender Super Saiyajin Deus é necessário ter aprendido Super Saiyajin 3 e satisfazer um requisito à critério do mestre. Bônus (Arbitrário): +8 em Força, Destreza, Ki e Resistência. Custo de Ki: 8 pontos por turno. Custo de P.A: ${this.cost}.`;

        return description
      },

      sideEffet() {
        const keyItemName = 'Prova de Ascenção';
        let keyItemIndex = -1;

        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        if (handleChar.char.techniques.indexOf(this.requirement) == -1) {
          throw new Error(`Você deve ter aprendido ${this.requirement} para aprender ${this.name}.`)
        }

        if (handleChar.char.race != 'Saiyajin (Puro)' && handleChar.char.race != 'Saiyajin (Híbrido)') {
          throw new Error(`Você deve ser da raça Saiyajin para aprender as transformações de Super Saiyajin.`)
        }

        for (let i = 0; i < handleChar.char.items.length; i++) {
          if (handleChar.char.items[i].name == keyItemName) {
            keyItemIndex = i;
            break
          }
        }

        if (keyItemIndex == -1) {
          throw new Error('Você não possui o que é necessário para ascender a esta forma.')
        }

        handleChar.addTechnique(this.name)
        handleChar.updateCharActualStatus('P.A', -this.cost)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} aprendido com sucesso!`)
      }
    },

    // Super Saiyajin Blue
    {
      name: 'Super Saiyajin Blue (SSGSS)',
      cost: 10,
      needCheck: true,
      requirement: 'Super Saiyajin Deus',
      canBeRemoved: true,

      getDescription() {
        const description = `A transformação de Super Saiyajin de um Super Saiyajin Deus, ou simplesmente Super Saiyajin Blue. Para aprender Super Saiyajin Blue (SSGSS) é necessário ter aprendido Super Saiyajin Deus e satisfazer um requisito à critério do mestre. Bônus (Arbitrário): +10 em Força, Destreza, Ki e Resistência. Custo de Ki: 10 pontos por turno. Custo de P.A: ${this.cost}.`;

        return description
      },

      sideEffet() {
        const keyItemName = 'Prova de Alma Valorosa';
        let keyItemIndex = -1;

        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        if (handleChar.char.techniques.indexOf(this.requirement) == -1) {
          throw new Error(`Você deve ter aprendido ${this.requirement} para aprender ${this.name}.`)
        }

        if (handleChar.char.race != 'Saiyajin (Puro)' && handleChar.char.race != 'Saiyajin (Híbrido)') {
          throw new Error(`Você deve ser da raça Saiyajin para aprender as transformações de Super Saiyajin.`)
        }

        for (let i = 0; i < handleChar.char.items.length; i++) {
          if (handleChar.char.items[i].name == keyItemName) {
            keyItemIndex = i;
            break
          }
        }

        if (keyItemIndex == -1) {
          throw new Error('Você não possui o que é necessário para ascender a esta forma.')
        }

        handleChar.addTechnique(this.name)
        handleChar.updateCharActualStatus('P.A', -this.cost)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} aprendido com sucesso!`)
      }
    },

    // Galick Ho
    {
      name: 'Galick Ho',
      cost: 1,
      needCheck: true,
      canBeRemoved: true,

      getDescription() {
        const description = `Uma técnica de disparo rápido e potente. Dano: Ataque Especial + 1d6. Custo de Ki: 2 pontos. Custo de P.A: ${this.cost}.`;

        return description
      },

      sideEffet() {

        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.addTechnique(this.name)
        handleChar.updateCharActualStatus('P.A', -this.cost)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} aprendido com sucesso!`)
      }
    },

    // Controle de Oozaru
    {
      name: 'Controle do Oozaru',
      cost: 1,
      needCheck: true,
      canBeRemoved: true,

      getDescription() {
        const description = `A capacidade de controlar a transformação de Oozaru, não sofrendo qualquer penalidade para utilizá-la, além de perder penalidades passíveis para golpes desferidos na cauda. Custo de P.A: ${this.cost}.`;

        return description
      },

      sideEffet() {

        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.addTechnique(this.name)
        handleChar.updateCharActualStatus('P.A', -this.cost)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} aprendido com sucesso!`)
      }
    },

    // Ataque Big Bang
    {
      name: 'Ataque Big Bang',
      cost: 2,
      needCheck: true,
      canBeRemoved: true,

      getDescription() {
        const description = `Um ataque que concentra energia na palma da mão com o braço estendido, e então a dispara numa esfera massiva de energia. Precisa de um turno para carregar e tem um alto poder explosivo. Dano: Ataque Especial + 1d8. Custo de Ki: 3 pontos. Custo de P.A: ${this.cost}.`;

        return description
      },

      sideEffet() {

        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.addTechnique(this.name)
        handleChar.updateCharActualStatus('P.A', -this.cost)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} aprendido com sucesso!`)
      }
    },

    // Resplendor Final
    {
      name: 'Resplendor Final',
      cost: 4,
      needCheck: true,
      canBeRemoved: true,

      getDescription() {
        const description = `Uma técnica que consiste em canalizar energia nas duas palmas, com ambos os braços estendidos e, após canalizada, um feixe massivo e extraordinariamente destrutivo é disparado. Precisa de um turno para carregar. Dano: Ataque Especial + 4d6. Custo de Ki: 10 pontos. Custo de P.A: ${this.cost}.`;

        return description
      },

      sideEffet() {

        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.addTechnique(this.name)
        handleChar.updateCharActualStatus('P.A', -this.cost)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} aprendido com sucesso!`)
      }
    },

    // Dark Impact
    {
      name: 'Dark Impact',
      cost: 2,
      needCheck: true,
      canBeRemoved: true,

      getDescription() {
        const description = `Movimento de Contra-ataque. O jogador declara que vai usar esta ação e abdica de usar sua defesa, fazendo um Teste de Esquiva (Destreza + d20). Se tiver sucesso, o jogador desvia e lança um ataque usando uma bola de energia que causa dano e lança o oponente pra longe. Dano: Ataque Especial + total de Destreza + 1d4. Custo de Ki e Fôlego: 2 pontos. Custo de P.A: ${this.cost}.`;

        return description
      },

      sideEffet() {

        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.addTechnique(this.name)
        handleChar.updateCharActualStatus('P.A', -this.cost)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} aprendido com sucesso!`)
      }
    },

    // Impacto Final
    {
      name: 'Impacto Final',
      cost: 2,
      needCheck: true,
      canBeRemoved: true,

      getDescription() {
        const description = `Consiste em concentrar energia em dois dedos, e em seguida disparar um massivo feixe de energia, causando um dano perfurante e diminuindo a defesa do oponente em -1 (cumulativo para cada feixe disparado). Dano: Ataque Especial + 1d4. Custo de Ki: 1 ponto. Custo de P.A: ${this.cost}.`;

        return description
      },

      sideEffet() {

        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.addTechnique(this.name)
        handleChar.updateCharActualStatus('P.A', -this.cost)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} aprendido com sucesso!`)
      }
    },

    // Super Explosão
    {
      name: 'Super Explosão',
      cost: 3,
      needCheck: true,
      canBeRemoved: true,

      getDescription() {
        const description = `Uma técnica suicida. Você simplesmente utiliza todo seu Ki disponível para gerar uma massiva explosão, com raio de alcance de 2m para cada ponto de Ki gasto. Quem estiver dentro da aŕea de efeito deverá rolar um d20 para testar sua chance de sobreviver. Você recebe 30% do dano causado. Dano: Ataque Especial + Ki disponível. Custo de Ki: todo o Ki disponível. Custo de P.A: ${this.cost}.`;

        return description
      },

      sideEffet() {

        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.addTechnique(this.name)
        handleChar.updateCharActualStatus('P.A', -this.cost)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} aprendido com sucesso!`)
      }
    },

    // Gamma Burst Flash
    {
      name: 'Gamma Burst Flash',
      cost: 3,
      needCheck: true,
      canBeRemoved: true,

      getDescription() {
        const description = `Um ataque efetivo contra mais de um alvo. Este ataque toma forma de um cone gigante, fruto de uma energia muito potente, e acertando todos os inimigos à frente. Dano: Ataque Especial + 1d8 por inimigo. Custo de Ki: 3 pontos por inimigo. Custo de P.A: ${this.cost}.`;

        return description
      },

      sideEffet() {

        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.addTechnique(this.name)
        handleChar.updateCharActualStatus('P.A', -this.cost)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} aprendido com sucesso!`)
      }
    },

    // Kienzan
    {
      name: 'Kienzan',
      cost: 1,
      needCheck: true,
      canBeRemoved: true,

      getDescription() {
        const description = `Técnica que consiste em manipular o Ki para criar discos cortantes. São capazes de atingir inimigos de níveis acima e até mais de um inimigo de uma vez. Com o braço erguido e mão aberta,
        cria-se um disco de energia e, aṕos devidamente estabilizado, o disco é disparado. Dano: 1d8 e 50% de chance de causar sangramento. Custo de Ki: 3 pontos. Custo de P.A: ${this.cost}.`;

        return description
      },

      sideEffet() {

        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.addTechnique(this.name)
        handleChar.updateCharActualStatus('P.A', -this.cost)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} aprendido com sucesso!`)
      }
    },

    // Kienzan Combo
    {
      name: 'Kienzan Combo',
      cost: 1,
      needCheck: true,
      canBeRemoved: true,
      requirement: 'Kienzan',

      getDescription() {
        const description = `Versão aprimorada do Kienzan, que permite lançar dois discos pelo custo de um. É necessário ter aprendido Kienzan para aprender Kienzan Combo. Custo de P.A: ${this.cost}.`;

        return description
      },

      sideEffet() {
        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        if (handleChar.char.techniques.indexOf(this.requirement) == -1) {
          throw new Error(`Você deve ter aprendido ${this.requirement} para aprender ${this.name}.`)
        }

        handleChar.addTechnique(this.name)
        handleChar.updateCharActualStatus('P.A', -this.cost)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} aprendido com sucesso!`)
      }
    },

    // Chuva de Energia
    {
      name: 'Chuva de Energia',
      cost: 2,
      needCheck: true,
      canBeRemoved: true,

      getDescription() {
        const description = `Uma técnica usada para acertar múltiplos inimigos. Não possui um alto poder ofensivo, porém tem pouco gasto de energia e consegue acertar muitos oponentes. O usuário lança dois feixes de energia e os manipula para cima, com uma velocidade relativamente baixa. Ao chegarem na altura desejada, ambos os feixes explodem em diversos feixes de luz, acertando vários oponentes e causando dano a cada um. Dano: 1d4. Custo de Ki: 2 pontos. Custo de P.A: ${this.cost}.`;

        return description
      },

      sideEffet() {
        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.addTechnique(this.name)
        handleChar.updateCharActualStatus('P.A', -this.cost)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} aprendido com sucesso!`)
      }
    },

    // Wolf Fang Fist
    {
      name: 'Wolf Fang Fist',
      cost: 1,
      needCheck: true,
      canBeRemoved: true,

      getDescription() {
        const description = `Como um bom artista marcial, seus golpes são rápidos e letais. Você consegue desferir uma série de socos e arranhões, imitando o ataque de um lobo feroz. Jogue 1d6 para saber quantos ataques você fará. O oponente terá de defender cada golpe. Dano: Ataque + 1d4 por ataque. Custo de Fôlego: 1 ponto por golpe. Custo de P.A: ${this.cost}.`;

        return description
      },

      sideEffet() {
        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.addTechnique(this.name)
        handleChar.updateCharActualStatus('P.A', -this.cost)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} aprendido com sucesso!`)
      }
    },

    // Binding Wolf Fang Fist
    {
      name: 'Binding Wolf Fang Fist',
      cost: 1,
      needCheck: true,
      canBeRemoved: true,
      requirement: 'Wolf Fang Fist',

      getDescription() {
        const description = `Versão aprimorada de Wolf Fang Fist. Finaliza o combo com uma descarga de energia em forma das presas de lobo, lançando o inimigo pra longe. É necessário ter aprendido ${this.requirement} para aprender ${this.name}. Custo de P.A: ${this.cost}.`;

        return description
      },

      sideEffet() {
        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        if (handleChar.char.techniques.indexOf(this.requirement) == -1) {
          throw new Error(`Você deve ter aprendido ${this.requirement} para aprender ${this.name}.`)
        }

        handleChar.addTechnique(this.name)
        handleChar.updateCharActualStatus('P.A', -this.cost)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} aprendido com sucesso!`)
      }
    },

    // Neo Wolf Fang Fist
    {
      name: 'Neo Wolf Fang Fist',
      cost: 2,
      needCheck: true,
      canBeRemoved: true,
      requirement: 'Binding Wolf Fang Fist',

      getDescription() {
        const description = `Versão aprimorada de Binding Wolf Gang Fist. Com o melhor controle de seu Ki, você é capaz de aumentar o dano causado, adicionando +2 aos dados e ao Custo de Fôlego. É necessário ter aprendido ${this.requirement} para aprender ${this.name}. Custo de P.A: ${this.cost}.`;

        return description
      },

      sideEffet() {
        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        if (handleChar.char.techniques.indexOf(this.requirement) == -1) {
          throw new Error(`Você deve ter aprendido ${this.requirement} para aprender ${this.name}.`)
        }

        handleChar.addTechnique(this.name)
        handleChar.updateCharActualStatus('P.A', -this.cost)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} aprendido com sucesso!`)
      }
    },

    // Soukidan
    {
      name: 'Soukidan',
      cost: 1,
      needCheck: true,
      canBeRemoved: true,

      getDescription() {
        const description = `O usuário dispara uma esfera de energia mediana contra o adversário, podendo controlá-la como desejar, e para qualquer direção e sentido, até que a esfera colida com algo. Durante a manipulação da técnica, o usuário é considerado indefeso. Dano: Ataque Especial + 1d4. Custo de Ki: 2 pontos. Custo de P.A: ${this.cost}.`;

        return description
      },

      sideEffet() {
        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.addTechnique(this.name)
        handleChar.updateCharActualStatus('P.A', -this.cost)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} aprendido com sucesso!`)
      }
    },

    // Dodonpa
    {
      name: 'Dodonpa',
      cost: 1,
      needCheck: true,
      canBeRemoved: true,

      getDescription() {
        const description = `Uma técnica poderosa que usa o dedo indicador, disparando um raio com um grande poder de penetração adicionando +1 na margem crítica. Dano: Ataque Especial + 1d6. Custo de Ki: 2 pontos. Custo de P.A: ${this.cost}.`;

        return description
      },

      sideEffet() {
        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.addTechnique(this.name)
        handleChar.updateCharActualStatus('P.A', -this.cost)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} aprendido com sucesso!`)
      }
    },

    // Kikoho
    {
      name: 'Kikoho',
      cost: 2,
      needCheck: true,
      canBeRemoved: true,

      getDescription() {
        const description = `Uma técnica letal, tanto para o oponente quanto ao usuário, útil até mesmo contra adversários muito mais poderosos ao custo da vida de quem a utiliza. Forma-se um triângulo com as mãos,
        focando no alvo e disparando um feixe massivo de energia. Dano: Ataque Especial + 1d8. Custo de PV: 1 ponto. Custo de P.A: ${this.cost}.`;

        return description
      },

      sideEffet() {
        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.addTechnique(this.name)
        handleChar.updateCharActualStatus('P.A', -this.cost)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} aprendido com sucesso!`)
      }
    },

    // Neo Kikoho
    {
      name: 'Neo Kikoho',
      cost: 2,
      needCheck: true,
      canBeRemoved: true,
      requirement: 'Kikoho',

      getDescription() {
        const description = `Versão aprimorada de Kikoho. Devido a um intenso treinamento, torna-se possível aplicar mais dano conforme a vontade do usuário, aumentando o dano em +1 por ponto de PV utilizado. É necessário ter aprendido Kikoho para aprender Neo Kikoho. Custo de P.A: ${this.cost}.`;

        return description
      },

      sideEffet() {
        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        if (handleChar.char.techniques.indexOf(this.requirement) == -1) {
          throw new Error(`Você deve aprender ${this.requirement} para aprender ${this.name}.`)
        }

        handleChar.addTechnique(this.name)
        handleChar.updateCharActualStatus('P.A', -this.cost)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} aprendido com sucesso!`)
      }
    },

    // Técnica das 4 Cópias
    {
      name: 'Técnica das 4 Cópias',
      cost: 1,
      needCheck: true,
      canBeRemoved: true,

      getDescription() {
        const description = `Técnica criada pelos Ciclopes. Consiste em criar 4 réplicas do usuário, dividindo seu poder em 4 frações. O jogador pode controlar as 4 cópias durante o seu turno, ou seja, fazer 4 movimentos e
        ações. Custo de P.A: ${this.cost}.`;

        return description
      },

      sideEffet() {
        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.addTechnique(this.name)
        handleChar.updateCharActualStatus('P.A', -this.cost)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} aprendido com sucesso!`)
      }
    },

    // Técnica dos 4 Braços
    {
      name: 'Técnica dos 4 Braços',
      cost: 1,
      needCheck: true,
      canBeRemoved: true,

      getDescription() {
        const description = `Técnica criada pelos Ciclopes. Consiste em criar dois braços adicionais temporariamente, aumentando a intensidade de seus golpes. Bônus (Arbitrário): +2 em Força. Custo de Fôlego: 2 pontos por turno. Custo de P.A: ${this.cost}.`;

        return description
      },

      sideEffet() {
        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.addTechnique(this.name)
        handleChar.updateCharActualStatus('P.A', -this.cost)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} aprendido com sucesso!`)
      }
    },

    // Taiyouken
    {
      name: 'Taiyouken',
      cost: 1,
      needCheck: true,
      canBeRemoved: true,

      getDescription() {
        const description = `Técnica defensiva. Permite que o usuário ofusque a visão de seus adverśarios por até 2 turnos (50% de chance). Custo de Ki: 3 pontos. Custo de P.A: ${this.cost}.`;

        return description
      },

      sideEffet() {
        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.addTechnique(this.name)
        handleChar.updateCharActualStatus('P.A', -this.cost)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} aprendido com sucesso!`)
      }
    },

    // Makankosappo
    {
      name: 'Makankosappo',
      cost: 3,
      needCheck: true,
      canBeRemoved: true,

      getDescription() {
        const description = `Técnica extremamente poderosa, com um alto poder de perfuração e destruição. É necessário carregar a técnica para que ela realmente funcione. A cada turno carregado, adicione +2 na margem crítica e no dano final. Dano: Ataque Especial + 1d8. Custo de Ki: 2 pontos por turno. Custo de P.A: ${this.cost}.`;

        return description
      },

      sideEffet() {
        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.addTechnique(this.name)
        handleChar.updateCharActualStatus('P.A', -this.cost)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} aprendido com sucesso!`)
      }
    },

    // Zona de Granadas Infernais
    {
      name: 'Zona de Granadas Infernais',
      cost: 1,
      needCheck: true,
      canBeRemoved: true,

      getDescription() {
        const description = `Técnica que consiste em lançar diversas esferas de energia ao redor do oponente, deixando-o cercado. Se o oponente se mover, ele será atingido sem que o usuário da técnica exploda as granadas. Basta um simples gesto com os braços para que cada granada de energia se lançe ao oponente. Dano: 1d4 por granada. Custo de Ki: 1 ponto por turno. Custo de P.A: ${this.cost}.`;

        return description
      },

      sideEffet() {
        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.addTechnique(this.name)
        handleChar.updateCharActualStatus('P.A', -this.cost)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} aprendido com sucesso!`)
      }
    },

    // Burning Attack
    {
      name: 'Burning Attack',
      cost: 1,
      needCheck: true,
      canBeRemoved: true,

      getDescription() {
        const description = `Técnica que consiste em canalizar uma quantidade considerável de energia por meio de gestos realizados com os braços e mãos. A energia é então disparada em uma esfera de energia extremamente quente. O disparo é rápido, porém não muito destrutivo. Dano: Ataque Especial + 1d4. Custo de Ki: 1 ponto. Custo de P.A: ${this.cost}.`;

        return description
      },

      sideEffet() {
        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.addTechnique(this.name)
        handleChar.updateCharActualStatus('P.A', -this.cost)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} aprendido com sucesso!`)
      }
    },

    // Heat Dome Attack
    {
      name: 'Heat Dome Attack',
      cost: 2,
      needCheck: true,
      canBeRemoved: true,

      getDescription() {
        const description = `Técnica que consiste em arremessar o alvo para o ar, deixando-o indefeso. Em seguida, uma quantidade massiva de energia é disparada em direção ao oponente, como finalização. Caso o usuário da técnica obtenha sucesso em arremessar o oponente, o alvo deverá realizar um Teste de Resistência para estabilizar-se e tentar defender a onda finalizadora. Dano: Ataque Especial + 1d4. Custo de Ki: 1 ponto. Custo de P.A: ${this.cost}.`;

        return description
      },

      sideEffet() {
        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.addTechnique(this.name)
        handleChar.updateCharActualStatus('P.A', -this.cost)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} aprendido com sucesso!`)
      }
    },

    // Bomber DX
    {
      name: 'Bomber DX',
      cost: 2,
      needCheck: true,
      canBeRemoved: true,

      getDescription() {
        const description = `Técnica que consiste em canalizar uma grande quantidade de energia no braço e, em seguida, disparar a energia canalizada em direção ao alvo. Pode causar dano mesmo que não acerte diretamente o oponente. Precisa de um turno para canalizar totalmente o ataque, com 2m de raio de alcance. Dano: Ataque Especial + 1d4 (-50% caso não acerte diretamente o alvo). Custo de Ki: 3 pontos. Custo de P.A: ${this.cost}.`;

        return description
      },

      sideEffet() {
        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.addTechnique(this.name)
        handleChar.updateCharActualStatus('P.A', -this.cost)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} aprendido com sucesso!`)
      }
    },

    // Giant Storm
    {
      name: 'Giant Storm',
      cost: 2,
      needCheck: true,
      canBeRemoved: true,

      getDescription() {
        const description = `Técnica que consiste em canalizar uma grande quantidade de energia na palma da mão e, em seguida, descarregar a energia canalizada no solo, causando uma explosão de baixo para cima. Abrange uma área com 4m de raio, causando pouco dano enquanto arremessa os oponentes para longe. Dano: 1d4. Custo de Ki: 2 pontos. Custo de P.A: ${this.cost}.`;

        return description
      },

      sideEffet() {
        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.addTechnique(this.name)
        handleChar.updateCharActualStatus('P.A', -this.cost)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} aprendido com sucesso!`)
      }
    },

    // Kill Driver
    {
      name: 'Kill Driver',
      cost: 1,
      needCheck: true,
      canBeRemoved: true,

      getDescription() {
        const description = `Técnica que consiste em canalizar uma corrente elétrica circular utilizando as mãos e, em seguida, disparar contra o oponente, tendo 20% de chance de atordoá-lo por um turno. Role 1d100 após o cálculo de dano. Dano: Ataque Especial + 1d4. Custo de Ki: 2 pontos. Custo de P.A: ${this.cost}.`;

        return description
      },

      sideEffet() {
        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.addTechnique(this.name)
        handleChar.updateCharActualStatus('P.A', -this.cost)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} aprendido com sucesso!`)
      }
    },

    // Calamity Blaster
    {
      name: 'Calamity Blaster',
      cost: 2,
      needCheck: true,
      canBeRemoved: true,

      getDescription() {
        const description = `Um combo de ataques físicos e de Ki. Consiste em desferir um ou dois golpes físicos, e por fim disparar uma esfera de energia em direção ao alvo. Dano: Ataque + Ataque Especial + 1d4. Custo de Ki e Fôlego: 4 pontos. Custo de P.A: ${this.cost}.`;

        return description
      },

      sideEffet() {
        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.addTechnique(this.name)
        handleChar.updateCharActualStatus('P.A', -this.cost)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} aprendido com sucesso!`)
      }
    },

    // Sleepy Boy Technique
    {
      name: 'Sleepy Boy Technique',
      cost: 1,
      needCheck: true,
      canBeRemoved: true,

      getDescription() {
        const description = `Técnica que consiste em controlar o oponente sem causar dano, colocando-o em sono profundo Caso obtenha sucesso, o oponente deverá rolar um Teste de Resistência a cada turno para tentar acordar. Role 1d20 + total de Inteligênci + Ataque Especial. A quantidade de turnos que o oponente permanece em sono profundo é igual ao seu total de Inteligência. Custo de Ki: 3 pontos. Custo de P.A: ${this.cost}.`;

        return description
      },

      sideEffet() {
        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.addTechnique(this.name)
        handleChar.updateCharActualStatus('P.A', -this.cost)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} aprendido com sucesso!`)
      }
    },

    // Bankoku Bikkuri Shō
    {
      name: 'Bankoku Bikkuri Shō',
      cost: 1,
      needCheck: true,
      canBeRemoved: true,

      getDescription() {
        const description = `Técnica que consiste em descarregar uma corrente elétrica no alvo, incapacitando-o até que o usuário não consiga mais manter a corrente, ou até que o oponente obtenha êxito num Teste de Resistência. Custo de Ki: 2 pontos por turno. Custo de P.A: ${this.cost}.`;

        return description
      },

      sideEffet() {
        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.addTechnique(this.name)
        handleChar.updateCharActualStatus('P.A', -this.cost)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} aprendido com sucesso!`)
      }
    },

    // Zanzoken
    {
      name: 'Zanzoken',
      cost: 1,
      needCheck: true,
      canBeRemoved: true,

      getDescription() {
        const description = `Técnica que consiste em enganar o alvo, mais rápido do que os olhos inimigos conseguem acompanhar. O usuário deverá declarar que usará esta técnica, podendo criar ilusões de acordo com seu total de Destreza. O oponente deverá realizar um teste de Inteligência para tentar descobrir qual das imagens é a verdadeira. Custo de Fôlego: 1 ponto por ilusão. Custo de P.A: ${this.cost}.`;

        return description
      },

      sideEffet() {
        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.addTechnique(this.name)
        handleChar.updateCharActualStatus('P.A', -this.cost)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} aprendido com sucesso!`)
      }
    },

    // Masenko
    {
      name: 'Masenko',
      cost: 1,
      needCheck: true,
      canBeRemoved: true,

      getDescription() {
        const description = `Técnica que consiste em canalizar energia na palma das mãos, frente à testa do usuário e, após canalizar energia suficiente, descarregar a energia numa explosão em direção ao oponente. Quanto mais próximo do oponente, maior o dano causado e mais fácil de acertar com total precisão. Dano: Ataque Especial + 1d6 (+2 de dano se estiver a menos de 2m do oponente). Custo de Ki: 3 pontos. Custo de P.A: ${this.cost}.`;

        return description
      },

      sideEffet() {
        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.addTechnique(this.name)
        handleChar.updateCharActualStatus('P.A', -this.cost)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} aprendido com sucesso!`)
      }
    },

    // Masendan
    {
      name: 'Masendan',
      cost: 2,
      needCheck: true,
      canBeRemoved: true,
      requirement: 'Masenko',

      getDescription() {
        const description = `Versão aprimorada do Masenko. Consiste em canalizar a energia em uma mão só, e então arremessá-la em direção ao usuário, aumentando o potencial destrutivo da técnica, tendo 10% de chance de atordoar o oponente. Custo de P.A: ${this.cost}.`;

        return description
      },

      sideEffet() {
        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        if (handleChar.char.techniques.indexOf(this.requirement) == -1) {
          throw new Error(`Você deve aprender ${this.requirement} para aprender ${this.name}.`)
        }

        handleChar.addTechnique(this.name)
        handleChar.updateCharActualStatus('P.A', -this.cost)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} aprendido com sucesso!`)
      }
    },

    // Super Masenko
    {
      name: 'Super Masenko',
      cost: 2,
      needCheck: true,
      canBeRemoved: true,
      requirement: 'Masendan',

      getDescription() {
        const description = `Versão aprimorada do Masendan. Esperando um turno para canalizar a energia e gastando 2 pontos de Ki, garante um bônus de +2 no dano final. Custo de P.A: ${this.cost}.`;

        return description
      },

      sideEffet() {
        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        if (handleChar.char.techniques.indexOf(this.requirement) == -1) {
          throw new Error(`Você deve aprender ${this.requirement} para aprender ${this.name}.`)
        }

        handleChar.addTechnique(this.name)
        handleChar.updateCharActualStatus('P.A', -this.cost)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} aprendido com sucesso!`)
      }
    },

    // Impulse Fist
    {
      name: 'Impulse Fist',
      cost: 2,
      needCheck: true,
      canBeRemoved: true,

      getDescription() {
        const description = `Técnica que consiste em canalizar Ki nos punhos, descarregando a energia em um combo letal. Para aumentar o dano em +1, gaste 2 pontos de Ki em um turno adicional. Para somar +1 no dano total após canalizar totalmente, gaste mais 2 pontos de Ki. Dano: 1+. Custo de P.A: ${this.cost}.`;

        return description
      },

      sideEffet() {
        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.addTechnique(this.name)
        handleChar.updateCharActualStatus('P.A', -this.cost)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} aprendido com sucesso!`)
      }
    },

    // Vortex Crusher
    {
      name: 'Vortex Crusher',
      cost: 2,
      needCheck: true,
      canBeRemoved: true,

      getDescription() {
        const description = `Técnica que pode ser utilizada tanto ofensiva quanto defensivamente. Consiste em contornar o oponente como no entorno de um vortex e atacá-lo com um golpe destruidor. Caso utilizada defensivamente, realize um Teste de Destreza para tentar esquivar do ataque inimigo e então realizar um contra-ataque, arremessando o oponente para longe, com 10% de chance de atordoá-lo no fim. Caso utilizada ofensivamente, realize um Teste de Força e, caso obtenha êxito, acrescente +2 no dano final. Dano: Ataque + 1d4(somente ofensivamente). Custo de Fôlego: 3 pontos. Custo de P.A: ${this.cost}.`;

        return description
      },

      sideEffet() {
        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.addTechnique(this.name)
        handleChar.updateCharActualStatus('P.A', -this.cost)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} aprendido com sucesso!`)
      }
    },

    // Death Beam
    {
      name: 'Death Beam',
      cost: 2,
      needCheck: true,
      canBeRemoved: true,

      getDescription() {
        const description = `Uma técnica que consiste em disparar um raio de energia concentrada pela ponta dos dedos, em direção ao oponente. Limita-se a disparar uma quantidade de raios equivalente ao total de Destreza do usuário num mesmo turno, por ser extremamente rápida de canalizar. Dano: 1d4 para cada raio disparado. Custo de Ki: 2 pontos por raio disparado. Custo de P.A: ${this.cost}.`;

        return description
      },

      sideEffet() {
        if (handleChar.char.status[3].actual < this.cost) {
          throw new Error(`Você não possui P.A suficientes para aprender ${this.name}.`)
        }

        handleChar.addTechnique(this.name)
        handleChar.updateCharActualStatus('P.A', -this.cost)
        timeChamberModal.closeTimeChamber()
        App.reload()
        Toast.open(`${this.name} aprendido com sucesso!`)
      }
    }
  ]
}

export const charUtilites = {
  // This is the available race characteristics for each race.
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
}
