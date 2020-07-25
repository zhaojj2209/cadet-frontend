import { GameAction, GameActionType } from '../action/GameActionTypes';
import { ItemId } from '../commons/CommonTypes';
import { GameLocationAttr } from '../location/GameMapTypes';
import StringUtils from '../utils/StringUtils';
import ConditionParser from './ConditionParser';
import Parser from './Parser';
import ParserConverter from './ParserConverter';
import { GameAttr } from './ParserValidator';

/**
 * The Action Parser parses actions for all entities.
 * This class takes in action strings to produce GameAction objects,
 * which store information about action type and
 * action params (much like React actions)
 */
export default class ActionParser {
  /**
   * Parses many action strings, stores resulting Game Action objects
   * inside the game map, and returns the corresponding actionIds.
   *
   * @param fullActionStrings raw action strings, eg ["show_dialogue(done)", "change_location(room) if gamestate.finish"]
   * @returns {Array<ItemId>} returns actionIds of the parsed actions with actions are stored in the game map.
   */
  public static parseActions(fullActionStrings: string[]): ItemId[] {
    return fullActionStrings.map(fullActionString => this.parseAction(fullActionString));
  }

  /**
   * Parses an action string, stores resulting Game Action object
   * inside the game map, and returns the corresponding actionId.
   *
   * @param rawActionString raw action string eg "show_dialogue(done) if gamestate.finish"
   * @returns {ItemId} returns actionId of the parsed actions, as action is stored in the game map.
   */
  public static parseAction(rawActionString: string): ItemId {
    const [actionString, conditionalsString] = StringUtils.splitByChar(rawActionString, 'if');

    const gameAction = this.parseActionContent(actionString);
    if (conditionalsString) {
      gameAction.actionConditions = StringUtils.splitByChar(
        conditionalsString,
        'AND'
      ).map(condition => ConditionParser.parse(condition));
    }

    Parser.checkpoint.map.addItemToMap(
      GameLocationAttr.actions,
      gameAction.interactionId,
      gameAction
    );

    return gameAction.interactionId;
  }

  /**
   * This funciton converts action strings eg "show_dialogue(hello)"
   * (excluding conditionals) into Game Action objects
   *
   * Note that this function also validates the parameters to make
   * sure that they are used correctly.
   *
   * @param actionString the action string to be parsed
   * @returns {GameAction} resulting action that can be stored in the game map
   */
  public static parseActionContent(actionString: string): GameAction {
    const [action, actionParamString] = StringUtils.splitByChar(actionString, '(');
    let repeatable = false;
    let actionType = action;
    if (action[action.length - 1] === '*') {
      repeatable = true;
      actionType = actionType.slice(0, -1);
    }

    const gameActionType = ParserConverter.stringToActionType(actionType);
    const actionParams = StringUtils.splitByChar(actionParamString.slice(0, -1), ',');
    const actionParamObj: any = {};

    switch (gameActionType) {
      case GameActionType.ObtainCollectible:
        actionParamObj.id = Parser.validator.assertLocAttr(
          GameLocationAttr.collectibles,
          actionParams[0],
          actionType
        );
        break;
      case GameActionType.CompleteObjective:
        actionParamObj.id = Parser.validator.assertAttr(
          GameAttr.objectives,
          actionParams[0],
          actionType
        );
        break;
      case GameActionType.LocationChange:
      case GameActionType.ChangeBackground:
        actionParamObj.id = Parser.validator.assertAttr(
          GameAttr.locations,
          actionParams[0],
          actionType
        );
        break;
      case GameActionType.BringUpDialogue:
        actionParamObj.id = Parser.validator.assertLocAttr(
          GameLocationAttr.talkTopics,
          actionParams[0],
          actionType
        );
        break;
      case GameActionType.AddItem:
      case GameActionType.RemoveItem:
        const gameLocAttr = ParserConverter.stringToLocAttr(actionParams[0]);
        actionParamObj.attr = gameLocAttr;
        actionParamObj.locationId = Parser.validator.assertAttr(
          GameAttr.locations,
          actionParams[1],
          actionType
        );
        actionParamObj.id = Parser.validator.assertLocAttr(
          gameLocAttr,
          actionParams[2],
          actionType
        );
        break;
      case GameActionType.AddLocationMode:
      case GameActionType.RemoveLocationMode:
        actionParamObj.locationId = Parser.validator.assertAttr(
          GameAttr.locations,
          actionParams[0],
          actionType
        );
        actionParamObj.mode = ParserConverter.stringToGameMode(actionParams[1]);
        break;
      case GameActionType.AddPopup:
        actionParamObj.id = Parser.validator.assertLocAttr(
          GameLocationAttr.objects,
          actionParams[0],
          actionType
        );
        actionParamObj.position = ParserConverter.stringToPosition(actionParams[1]);
        break;
      case GameActionType.MakeObjectBlink:
        actionParamObj.id = Parser.validator.assertLocAttr(
          GameLocationAttr.objects,
          actionParams[0],
          actionType
        );
        actionParamObj.turnOn = actionParams[1] === 'false' ? false : true;
        break;
      case GameActionType.MakeObjectGlow:
        actionParamObj.id = Parser.validator.assertLocAttr(
          GameLocationAttr.objects,
          actionParams[0],
          actionType
        );
        actionParamObj.turnOn = actionParams[1] === 'false' ? false : true;
        break;
      case GameActionType.PlayBGM:
        actionParamObj.id = Parser.validator.assertAttr(GameAttr.bgms, actionParams[0], actionType);
        break;
      case GameActionType.PlaySFX:
        actionParamObj.id = Parser.validator.assertAttr(GameAttr.sfxs, actionParams[0], actionType);
        break;
    }

    const actionId = Parser.generateActionId();
    return {
      actionType: gameActionType,
      actionParams: actionParamObj,
      actionConditions: [],
      interactionId: actionId,
      isInteractive: false,
      isRepeatable: repeatable
    };
  }
}