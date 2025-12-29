import { useState, useCallback } from 'react';
import type { GameState, Player, Team, EventCard, EndCard } from '../types';
import { EVENTS, ITEMS, END_CARD } from '../data/cards';

const SHUFFLE = <T>(array: T[]): T[] => {
    return [...array].sort(() => Math.random() - 0.5);
};

export const useGame = () => {
    const [gameState, setGameState] = useState<GameState | null>(null);

    const initGame = useCallback((playerNames: string[]) => {
        // 1. Setup Teams
        // Rules: 3 players (1 Cat, 2 Choco), 4 players (2 Cat, 2 Choco), etc. 
        // Simplified: Half/Half or +1 for Choco (since Choco has advantage usually? Or Cat?)
        // Actually rules say random distribution based on card count.
        // Let's just shuffle team cards based on player count.
        const teams: Team[] = [];
        const catCount = Math.ceil(playerNames.length / 2); // Roughly half
        for (let i = 0; i < catCount; i++) teams.push('CAT');
        for (let i = 0; i < playerNames.length - catCount; i++) teams.push('CHOCOLATE');
        const shuffledTeams = SHUFFLE(teams);

        // 2. Setup Decks
        let eventDeck: (EventCard | EndCard)[] = SHUFFLE([...EVENTS]);
        // Insert END card in the bottom half
        const halfIndex = Math.floor(eventDeck.length / 2);
        const bottomHalf = eventDeck.slice(halfIndex);
        const topHalf = eventDeck.slice(0, halfIndex);
        // Insert END randomly in bottom half
        bottomHalf.splice(Math.floor(Math.random() * (bottomHalf.length + 1)), 0, END_CARD);
        eventDeck = [...topHalf, ...bottomHalf];

        const itemDeck = SHUFFLE([...ITEMS, ...ITEMS]); // Double the items for deck size

        // 3. Setup Players
        const players: Player[] = playerNames.map((name, index) => ({
            id: `p-${index}`,
            name,
            team: shuffledTeams[index],
            hand: [],
            eventsWon: []
        }));

        // 4. Deal initial hands (3 cards each)
        let currentItemDeck = [...itemDeck];
        players.forEach(player => {
            player.hand = currentItemDeck.splice(0, 3);
        });

        setGameState({
            players,
            currentPlayerIndex: 0,
            eventDeck,
            itemDeck: currentItemDeck,
            discardPile: [],
            currentEvent: null,
            selectedItems: [],
            phase: 'DRAW_EVENT',
            winningTeam: null
        });
    }, []);

    const drawEvent = useCallback(() => {
        if (!gameState) return;

        // Draw event
        const nextCard = gameState.eventDeck[0];
        const newEventDeck = gameState.eventDeck.slice(1);

        if (nextCard.type === 'END') {
            // Calculate Winner
            let catScore = 0;
            let chocoScore = 0;
            gameState.players.forEach(p => {
                const score = p.eventsWon.length;
                if (p.team === 'CAT') catScore += score;
                else chocoScore += score;
            });

            setGameState(prev => prev ? {
                ...prev,
                eventDeck: newEventDeck,
                phase: 'GAME_OVER',
                winningTeam: catScore > chocoScore ? 'CAT' : (chocoScore > catScore ? 'CHOCOLATE' : null) // Draw = null
            } : null);
            return;
        }

        setGameState(prev => prev ? {
            ...prev,
            eventDeck: newEventDeck,
            currentEvent: nextCard as EventCard,
            phase: 'SELECT_ITEMS',
            selectedItems: []
        } : null);
    }, [gameState]);

    const toggleItemSelection = useCallback((itemId: string) => {
        if (!gameState || gameState.phase !== 'SELECT_ITEMS') return;

        setGameState(prev => {
            if (!prev) return null;
            const isSelected = prev.selectedItems.some(i => i.id === itemId);

            let newSelected;
            if (isSelected) {
                newSelected = prev.selectedItems.filter(i => i.id !== itemId);
            } else {
                // Check limit
                if (!prev.currentEvent || prev.selectedItems.length >= prev.currentEvent.itemCount) return prev;
                const item = prev.players[prev.currentPlayerIndex].hand.find(i => i.id === itemId);
                if (!item) return prev;
                newSelected = [...prev.selectedItems, item];
            }

            return { ...prev, selectedItems: newSelected };
        });
    }, [gameState]);

    const submitProposal = useCallback(() => {
        if (!gameState || gameState.phase !== 'SELECT_ITEMS') return;
        // Check if correct number of items selected
        if (!gameState.currentEvent || gameState.selectedItems.length !== gameState.currentEvent.itemCount) return;

        setGameState(prev => prev ? { ...prev, phase: 'VOTING' } : null);
    }, [gameState]);

    const resolveTurn = useCallback((success: boolean) => {
        if (!gameState || gameState.phase !== 'VOTING') return;

        const currentPlayer = gameState.players[gameState.currentPlayerIndex];
        let newPlayers = [...gameState.players];
        let newEventsWon = [...currentPlayer.eventsWon];

        // If success, add event to won
        if (success && gameState.currentEvent) {
            newEventsWon.push(gameState.currentEvent);
        }

        // Remove used items from hand and Refill
        let hand = [...currentPlayer.hand];
        gameState.selectedItems.forEach(item => {
            hand = hand.filter(h => h.id !== item.id);
        });

        let currentItemDeck = [...gameState.itemDeck];
        let discardPile = [...gameState.discardPile, ...gameState.selectedItems];

        // Refill to 3
        while (hand.length < 3) {
            if (currentItemDeck.length === 0) {
                // Reshuffle discard
                if (discardPile.length === 0) break; // No cards left
                currentItemDeck = SHUFFLE(discardPile);
                discardPile = [];
            }
            hand.push(currentItemDeck.shift()!);
        }

        // Update player
        newPlayers[gameState.currentPlayerIndex] = {
            ...currentPlayer,
            hand,
            eventsWon: newEventsWon
        };

        // Next player
        const nextPlayerIndex = (gameState.currentPlayerIndex + 1) % gameState.players.length;

        setGameState(prev => prev ? {
            ...prev,
            players: newPlayers,
            currentPlayerIndex: nextPlayerIndex,
            itemDeck: currentItemDeck,
            discardPile,
            currentEvent: null,
            selectedItems: [],
            phase: 'DRAW_EVENT'
        } : null);

    }, [gameState]);

    return {
        gameState,
        initGame,
        drawEvent,
        toggleItemSelection,
        submitProposal,
        resolveTurn
    };
};
