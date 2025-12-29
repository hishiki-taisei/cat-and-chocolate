export type Team = 'CAT' | 'CHOCOLATE';

export interface Card {
    id: string;
    type: 'EVENT' | 'ITEM' | 'END';
    name: string;
    description?: string;
    imageUrl?: string;
}

export interface EventCard extends Card {
    type: 'EVENT';
    itemCount: number; // 1, 2, or 3
    flavorText?: string;
}

export interface ItemCard extends Card {
    type: 'ITEM';
}

export interface EndCard extends Card {
    type: 'END';
}

export interface Player {
    id: string;
    name: string;
    team: Team; // We store it, but UI hides it
    hand: ItemCard[];
    eventsWon: EventCard[]; // Store actual cards won
}

export type GamePhase = 'SETUP' | 'DRAW_EVENT' | 'SELECT_ITEMS' | 'VOTING' | 'RESULT' | 'GAME_OVER';

export interface GameState {
    players: Player[];
    currentPlayerIndex: number;
    eventDeck: (EventCard | EndCard)[];
    itemDeck: ItemCard[];
    discardPile: ItemCard[];
    currentEvent: EventCard | null;
    selectedItems: ItemCard[];
    phase: GamePhase;
    winningTeam: Team | null;
}
