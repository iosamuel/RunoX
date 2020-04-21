import { GameEventName } from "./game-events.enum";
import { Subject } from "rxjs";

export type EventHandler = () => void;

export class GameEvents {
  private static instance: GameEvents;

  private events: {
    [key: string]: Subject<void>;
  } = {
    [GameEventName.AFTER_GAME_START]: new Subject(),
    [GameEventName.AFTER_PLAY_CARD]: new Subject(),
    [GameEventName.AFTER_TAKE_CARD]: new Subject(),
  };

  private constructor() {}

  static getInstance(): GameEvents {
    if (!GameEvents.instance) {
      GameEvents.instance = new GameEvents();
    }

    return GameEvents.instance;
  }

  on(event: GameEventName, action: EventHandler) {
    this.events[event].subscribe(() => action());
  }

  dispatch(event: GameEventName) {
    this.events[event].next();
  }
}
