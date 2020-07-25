import { IGameActionable } from '../action/GameActionTypes';
import { AssetKey, TrackInteraction } from '../commons/CommonTypes';
import GlowingImage from '../effects/GlowingObject';

/**
 * @typedef {ObjectProperty} - encapsulates data about an object in a location
 * @prop {boolean} isInteractive - whether or not this object is clickable
 * @prop {ItemId} interactionId - the object id that identifies the object so we can keep track of its interactions
 * @prop {ItemId[]} actionIds - ids of all actions that play when this object is clicked
 * @prop {AssetKey} assetKey - the asset key for the image rendered to represent this object
 * @prop {number} x - x coordinate of center of the object
 * @prop {number} y - y coordinate of center of the object
 * @prop {number} width - display width of the object if not its original size
 * @prop {number} height - display height of the object if not its original size
 */
export type ObjectProperty = TrackInteraction &
  IGameActionable & {
    assetKey: AssetKey;
    x: number;
    y: number;
    width?: number;
    height?: number;
  };

export type ObjectLayerProps = {
  cursor?: string;
};

/**
 * @typedef {ActivatableSprite} - data that represents the object on screen
 * @prop {GlowingImage} sprite - The clickable object sprite which can be made to glow and blink
 * @prop {Function} activate - The function to be called when you want to enable listeners for the object
 * @prop {Void Function} deactivate - The function to be called when you want to disable listeners for an object
 */
export type ActivatableSprite = {
  sprite: GlowingImage | Phaser.GameObjects.Rectangle;
  activate: Function;
  deactivate: Function;
};