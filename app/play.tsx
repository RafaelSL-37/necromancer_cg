import { StyleSheet, Pressable, ImageBackground } from 'react-native';
import { useEffect, useState } from 'react';
import { ThemedView } from '@/components/basic/ThemedView';
import { ThemedText } from '@/components/basic/ThemedText';
import { PreviousRoundPile } from '@/components/complex/PreviousRoundPile';
import { CurrentRoundPile } from '@/components/complex/CurrentRoundPile';
import constructDeck, { TDeckCard } from './utils/constructDeck';
import { DeckPile } from '@/components/complex/DeckPile';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { CardOnHand } from '@/components/complex/CardOnHand';
import { TPlayedCard } from './utils/calculateCardValue';
import { playCard } from './utils/playCard';
import { endGame } from './utils/endGame';

type TPlayParams = {
  selectedCards: string;
};

function skipHandler(
  firstPlayerSkip: boolean, setFirstPlayerSkip: any, 
  secondPlayerSkip: boolean, setSecondPlayerSkip: any,
  firstPlayerFirstRound: TPlayedCard[], setFirstPlayerFirstRound: any,
  firstPlayerSecondRound: TPlayedCard[], setFirstPlayerSecondRound: any,
  secondPlayerFirstRound: TPlayedCard[], setSecondPlayerFirstRound: any,
  secondPlayerSecondRound: TPlayedCard[], setSecondPlayerSecondRound: any,
  firstPlayerPlayedCards: TPlayedCard[], setFirstPlayerPlayedCards: any,
  secondPlayerPlayedCards: TPlayedCard[], setSecondPlayerPlayedCards: any,
  firstPlayerHand: TDeckCard[], setFirstPlayerHand: any,
  firstPlayerDeck: TDeckCard[], setFirstPlayerDeck: any,
  secondPlayerHand: TDeckCard[], setSecondPlayerHand: any,
  secondPlayerDeck: TDeckCard[], setSecondPlayerDeck: any,
  setTurn: any
): void {
  if (firstPlayerSkip && secondPlayerSkip) {
    if (firstPlayerFirstRound.length == 0) {
      const playerWhoWon = calculatePlayerCurrentPoints(firstPlayerPlayedCards) >= calculatePlayerCurrentPoints(secondPlayerPlayedCards)
        ? 1
        : 2;

      setFirstPlayerFirstRound(firstPlayerPlayedCards);
      setFirstPlayerPlayedCards([]);
      setFirstPlayerSkip(false);

      setSecondPlayerFirstRound(secondPlayerPlayedCards);
      setSecondPlayerPlayedCards([]);
      setSecondPlayerSkip(false);

      setTurn(playerWhoWon);
    } else if (firstPlayerSecondRound.length == 0) {
      const firstRoundPlayerWhoWon = calculatePlayerCurrentPoints(firstPlayerPlayedCards) >= calculatePlayerCurrentPoints(secondPlayerPlayedCards)
        ? 1
        : 2;
      const secondRoundPlayerWhoWon = calculatePlayerCurrentPoints(firstPlayerPlayedCards) >= calculatePlayerCurrentPoints(secondPlayerPlayedCards)
        ? 1
        : 2;
      
      if (firstRoundPlayerWhoWon == secondRoundPlayerWhoWon) {
        endGame();
      } else {
        setFirstPlayerSecondRound(firstPlayerPlayedCards);
        setFirstPlayerPlayedCards([]);
        setFirstPlayerSkip(false);
        
        setSecondPlayerSecondRound(secondPlayerPlayedCards);
        setSecondPlayerPlayedCards([]);
        setSecondPlayerSkip(false);
      }
    } else {
      endGame();
    }
  } else if (firstPlayerSkip) {
    setTurn(2);
  } else if (secondPlayerSkip) {
    setTurn(1);
  }
}

function calculatePlayerCurrentPoints(playedCards: any[]): number {
  return playedCards.reduce((cardValueSum, playedCard) => playedCard?.value ? cardValueSum + playedCard?.value : cardValueSum, 0);
}

function drawCards(
  deck: TDeckCard[], 
  setHand: any, 
  setDeck: any, 
  amountOfCardsDrawn: number
): void {
  const hand = [];

  if (amountOfCardsDrawn > deck.length) {
    // endGame(); //TODO: ENDGAME FUNCTION
  }

  for (let i = 0; i < amountOfCardsDrawn; i++) {
    const firstCard = deck.pop();    
    hand.push(firstCard);
  }

  setHand(hand);
  setDeck(deck);
}

function shuffleDeck(deck: TDeckCard[]): TDeckCard[] {
  const suffledDeck = deck
    .map(card => {return {card, weight: Math.random()}})
    .sort((a, b) => a.weight - b.weight);
  
  return suffledDeck.map(cardAndWeight => cardAndWeight.card);
}

export default function Play() {
  const [turn, setTurn] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [firstPlayerSkip, setFirstPlayerSkip] = useState(false);
  const [firstPlayerHand, setFirstPlayerHand] = useState<TDeckCard[]>([]);
  const [firstPlayerDeck, setFirstPlayerDeck] = useState<TDeckCard[]>([]);
  const [firstPlayerPlayedCards, setFirstPlayerPlayedCards] = useState<TPlayedCard[]>([]);
  const [firstPlayerFirstRound, setFirstPlayerFirstRound] = useState<TPlayedCard[]>([]);
  const [firstPlayerSecondRound, setFirstPlayerSecondRound] = useState<TPlayedCard[]>([]);

  const [secondPlayerSkip, setSecondPlayerSkip] = useState(false);
  const [secondPlayerHand, setSecondPlayerHand] = useState<TDeckCard[]>([]);
  const [secondPlayerDeck, setSecondPlayerDeck] = useState<TDeckCard[]>([]);
  const [secondPlayerPlayedCards, setSecondPlayerPlayedCards] = useState<TPlayedCard[]>([]);
  const [secondPlayerFirstRound, setSecondPlayerFirstRound] = useState<TPlayedCard[]>([]);
  const [secondPlayerSecondRound, setSecondPlayerSecondRound] = useState<TPlayedCard[]>([]);
  
  const { selectedCards }: TPlayParams = useLocalSearchParams();
  
  useEffect(() => {
    const firstPlayerConstructedDeck = shuffleDeck(constructDeck(selectedCards.split(',')))
    const secondPlayerConstructedDeck = shuffleDeck(constructDeck([]))

    drawCards(firstPlayerConstructedDeck, setFirstPlayerHand, setFirstPlayerDeck, 4);
    drawCards(secondPlayerConstructedDeck, setSecondPlayerHand, setSecondPlayerDeck, 4);
  }, [selectedCards]);

  useEffect(() => {    
    if (turn == 2) {
      if (calculatePlayerCurrentPoints(firstPlayerPlayedCards) >= calculatePlayerCurrentPoints(secondPlayerPlayedCards)) {
        //TODO: KEEP PLAYING IF PLAYER 1 SKIPPED
        
        playCard(0, secondPlayerHand, setSecondPlayerHand, secondPlayerPlayedCards, setSecondPlayerPlayedCards);
  
        if (!firstPlayerSkip) setTurn(1);
      } else {
        setSecondPlayerSkip(true);
      }
    }
  }, [turn]);

  useEffect(() => {
    skipHandler(
      firstPlayerSkip, setFirstPlayerSkip, 
      secondPlayerSkip, setSecondPlayerSkip, 
      firstPlayerFirstRound, setFirstPlayerFirstRound, 
      firstPlayerSecondRound, setFirstPlayerSecondRound,
      secondPlayerFirstRound, setSecondPlayerFirstRound,
      secondPlayerSecondRound, setSecondPlayerSecondRound,
      firstPlayerPlayedCards, setFirstPlayerPlayedCards,
      secondPlayerPlayedCards, setSecondPlayerPlayedCards,
      firstPlayerHand, setFirstPlayerHand,
      firstPlayerDeck, setFirstPlayerDeck,
      secondPlayerHand, setSecondPlayerHand,
      secondPlayerDeck, setSecondPlayerDeck,
      setTurn
    )
  }, [firstPlayerSkip, secondPlayerSkip]);

  //TODO: REMOVE TITLE, ASK CHATGPT
  return (
    <ThemedView style={styles.mainContainer}> 

      <ThemedView style={styles.topContainer}>
        <ThemedView style={styles.secondPlayerDeckContainer}>
          <DeckPile deck={secondPlayerDeck} />
        </ThemedView>
        <ThemedView style={styles.secondPlayerHandContainer}>
          {secondPlayerHand.map((cardInHand, i) => 
            <CardOnHand 
              card={cardInHand} 
              playerNumber={2} 
              cardIndexOnHand={i} 
              hand={secondPlayerHand}
              setHand={setSecondPlayerHand}
              setModal={setIsModalOpen}
              cardPile={secondPlayerPlayedCards}
              setCardPile={setSecondPlayerPlayedCards}
              adversarySkip={firstPlayerSkip}
              key={`cardNumber${i}`} 
            />)
          }
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.middleContainer}>
        <ThemedView style={styles.previousRoundsContainer}>
          <ThemedView>
            <PreviousRoundPile roundReference={1} setIsModalOpen={setIsModalOpen} cardsPlayedOnRound={[
              ...(firstPlayerFirstRound.map(playedCard => [playedCard, 1])), 
              ...(secondPlayerFirstRound.map(playedCard => [playedCard, 2]))
            ]} /> 
            {/* TODO: IMPLEMENT CLICKABLE THAT OPENS POP UP WITH FIRST ROUND INFORMATION */}
          </ThemedView>
          <ThemedView>
            <PreviousRoundPile roundReference={2} setIsModalOpen={setIsModalOpen} cardsPlayedOnRound={[
              ...(firstPlayerSecondRound.map(playedCard => [playedCard, 1])), 
              ...(secondPlayerSecondRound.map(playedCard => [playedCard, 2]))
            ]} /> 
            {/* TODO: IMPLEMENT CLICKABLE THAT OPENS POP UP WITH SECOND ROUND INFORMATION */}
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.currentRound}>
          <ThemedView style={styles.playerBoard}>
            <CurrentRoundPile setIsModalOpen={setIsModalOpen} cardsPlayedOnRound={secondPlayerPlayedCards} />
            <ImageBackground source={require('@/assets/images/react-logo.png')} style={{justifyContent: 'center', borderWidth: 2, borderColor:'red', height: 60, width: 60 }}>
              <ThemedText style={styles.basicText}>{calculatePlayerCurrentPoints(secondPlayerPlayedCards)}</ThemedText>
            </ImageBackground>
            {!secondPlayerSkip 
              ? <MaterialCommunityIcons name={'cards-playing'} size={40} color="#FFFFFF" /> 
              : <MaterialCommunityIcons name={'pause-circle'} size={40} color="#FFFFFF" />
              }
          </ThemedView>

              <ThemedText>TURN: {turn}</ThemedText>

          <ThemedView style={styles.playerBoard}>
            <CurrentRoundPile setIsModalOpen={setIsModalOpen} cardsPlayedOnRound={firstPlayerPlayedCards} />
            <ImageBackground source={require('@/assets/images/react-logo.png')} style={{justifyContent: 'center', borderWidth: 2, borderColor:'red', height: 60, width: 60 }}>
              <ThemedText style={styles.basicText}>{calculatePlayerCurrentPoints(firstPlayerPlayedCards)}</ThemedText>
            </ImageBackground>
            {!firstPlayerSkip 
              ? <MaterialCommunityIcons name={'cards-playing'} size={40} color="#FFFFFF" /> 
              : <MaterialCommunityIcons name={'pause-circle'} size={40} color="#FFFFFF" />
            }
          </ThemedView>
        </ThemedView>
      </ThemedView> 

      <ThemedView style={styles.buttonContainer}>
        <ThemedView style={styles.skipContainer}>
          <Pressable
            onPress={() => {setFirstPlayerSkip(true)}}
            accessibilityLabel="Skip rest of round"
            style={{ flex: 1, backgroundColor: "#841584", justifyContent: 'center' }}
          > 
            <ThemedText style={{color: 'white'}}> SKIP </ThemedText>
          </Pressable>
        </ThemedView>
        <ThemedView style={styles.giveUpButtonContainer}>
          <Pressable
            onPress={() => {endGame()}}
            // onPress={() => {setIsModalOpen(true)}} //TODO: CONFIRMATION POPUP WITH STATE TO DETERMINE IF IT IS OPEN OR NOT
            accessibilityLabel="Give up and go back to deck builder"
            style={{flex: 1, backgroundColor: "#841584", justifyContent: 'center'}}
          > 
            <ThemedText style={{color: 'white'}}> GIVE UP </ThemedText> 
          </Pressable>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.bottomContainer}>
        <ThemedView style={styles.firstPlayerDeckContainer}>
          <DeckPile deck={firstPlayerDeck} />
        </ThemedView>
        <ThemedView style={styles.firstPlayerHandContainer}> {/*TODO: IMPLEMENT SCROLL TO SIDE*/}
          {firstPlayerHand.map((cardInHand, i) => 
            <CardOnHand 
              card={cardInHand} 
              playerNumber={1} 
              cardIndexOnHand={i} 
              hand={firstPlayerHand}
              setHand={setFirstPlayerHand}
              setModal={setIsModalOpen}
              cardPile={firstPlayerPlayedCards}
              setCardPile={setFirstPlayerPlayedCards}
              skipped={firstPlayerSkip}
              turn={turn}
              setTurn={setTurn}
              adversarySkip={secondPlayerSkip}
              key={`cardNumber${i}`} 
            />)
          }
        </ThemedView>
      </ThemedView>

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    height: '100%',
  },
  topContainer: {
    flexDirection: 'row',
    flex: 1,
    borderWidth: 2,
    borderColor: 'red',
  },
  middleContainer: {
    flex: 4,
    display: 'flex',
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 0.4,
    display: 'flex',
    flexDirection: 'row',
  },
  bottomContainer: {
    borderWidth: 2,
    borderColor: 'red',
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  },
  firstPlayerHandContainer: {
    flex: 7,
    borderWidth: 2,
    borderColor: '#BABACA',
    flexDirection: 'row',
    columnGap: 5,
  },
  giveUpButtonContainer: {
    flex: 2,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'blue',
  },
  skipContainer: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'blue',
  },
  secondPlayerHandContainer: {
    flex: 7,
    borderWidth: 2,
    borderColor: '#BABACA',
    flexDirection: 'row',
    columnGap: 5,
  },
  previousRoundsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    rowGap: 10,
  },
  currentRound: {
    borderWidth: 2,
    borderColor: '#BABACA',
    justifyContent: 'center',
    rowGap: 35,
  },
  playerBoard: {
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: 'green',
    alignItems: 'center',
    columnGap: 30,
    margin: 20,
  },
  basicText: {
    color: 'white',
    alignSelf: 'center',
  },
  firstPlayerDeckContainer: {
    flex: 2,
  },
  secondPlayerDeckContainer: {
    flex: 2,
  },
});




//MODAL BUTTON EXAMPLE CONFIRMATION FOR SKIPPING

/* <Button
  onPress={() => skipHandler(
    1, 
    firstPlayerSkip, setFirstPlayerSkip, 
    secondPlayerSkip, setSecondPlayerSkip, 
    firstPlayerFirstRound, setFirstPlayerFirstRound, 
    firstPlayerSecondRound, setFirstPlayerSecondRound,
    secondPlayerFirstRound, setSecondPlayerFirstRound,
    secondPlayerSecondRound, setSecondPlayerSecondRound,
    firstPlayerPlayedCards, setFirstPlayerPlayedCards,
    secondPlayerPlayedCards, setSecondPlayerPlayedCards,
    firstPlayerHand, setFirstPlayerHand,
    firstPlayerDeck, setFirstPlayerDeck,
    secondPlayerHand, setSecondPlayerHand,
    secondPlayerDeck, setSecondPlayerDeck,
    setTurn
  )} //TODO: CONFIRMATION POPUP WITH STATE TO DETERMINE IF IT IS OPEN OR NOT
  title="Skip"
  color="#841584"
  accessibilityLabel="Skip rest of round"
/> */