export type GameState = "win" | "lose" | "in-progress";
export type LetterStatus = "pending" | "match" | "contains" | "none";
export type LetterTuple = [string, LetterStatus];