import { SharePrivilege } from './media';

/**
 * The State of Meeting connection.
 */
declare enum ConnectionState {
  Connected = 'Connected',
  Reconnecting = 'Reconnecting',
  Closed = 'Closed',
}
/**
 * The State of Video
 */
declare enum VideoActiveState {
  Active = 'Active',
  Inactive = 'Inactive',
}
/**
 * The State of Current User's Video Capturing
 */
declare enum VideoCapturingState {
  Started = 'Started',
  Stopped = 'Stopped',
  Failed = 'Failed',
}
/**
 * The state of Video muted
 */
declare enum VideoMutedState {
  Muted = 'Muted',
  Unmuted = 'Unmuted',
}

/**
 * The privilege of chat
 */
declare enum ChatPrivilege {
  All = 1,
  None = 4,
  EveryOnePublicly = 5, // isPrivateChatDisabled
}

/**
 * Reason of passively stop screen share
 */
declare enum PassiveStopShareReason {
  /**
   * Privilege change or others start new sharing
   */
  PrivilegeChange = 'PrivilegeChange',
  /**
   * User click the stop share on the browser control bar
   */
  StopScreenCapture = 'StopScreenCapture',
}

/**
 * Reason of the meeting reconnecting
 * - `on hold`: From on hold to into meeting.
 * - `failover`: Remote server disconnect unexpectedly.
 * - `promote`|`depromote`: From attendee to panelist and vice versa.
 */
type ReconnectingReason = 'on hold' | 'failover' | 'promote' | 'depromote';
/**
 * Reason of the meeting closed
 * - `kicked by host`: Been kicked by the host.
 * - `ended by host`: The meeting is ended by the hose.
 * - `expeled by host`: Been expeled by the host.
 */
type ClosedReason = 'kicked by host' | 'ended by host' | 'expeled by host';
/**
 * Interface of Connection Changed Payload
 */
interface ConnectionChangePayload {
  /**
   * Connection State
   */
  state: ConnectionState;
  /**
   * Reason of the change.
   */
  reason?: ReconnectingReason | ClosedReason;
}
/**
 * Interface of Participant Properties
 */
interface Participant {
  /**
   * Identify of the user
   */
  userId: number;
  /**
   * Avatar of the user
   */
  avatar: string;
  /**
   * Display name
   */
  displayName: string;
  /**
   * Whether the user is host
   */
  isHost: boolean;
  /**
   * Whether the user is host
   */
  isManager: boolean;
  /**
   * Audio of the user
   */
  audio: string | undefined;
  /**
   * Whether the audio is muted
   */
  muted: boolean | undefined;
  /**
   * Whether the user is starting the video
   */
  bVideoOn: boolean | undefined;
  /**
   * Whether the user is starting share
   */
  sharerOn: boolean | undefined;
  /**
   * Whether the sharing is paused
   */
  sharerPause: boolean | undefined;
}

/**
 * Interface of active speaker in meeting.
 */
interface ActiveSpeaker {
  /**
   * Identify of user
   */
  userId: number;
  /**
   * Display name of user
   */
  displayName?: string;
}

/**
 * Interface of chat message
 */
export interface ChatMessage {
  /**
   * Message content
   */
  message: string;
  /**
   * Sender name
   */
  sender: string;
  /**
   * Sender id
   */
  senderId: number;
  /**
   * Receiver name
   */
  reader: string;
  /**
   * Receive id
   */
  readerId: number;
}

/**
 *
 * Occurs when the connection is changed.
 *
 * @param payload The event detail.
 * @event
 */
export declare function event_connection_change(
  payload: ConnectionChangePayload,
): void;

/**
 * Occurs when new participant join the meeting
 *
 * ```javascript
 * client.on('user-added',(payload)=>{
 *  // You can refresh the participants when
 *  const participants = client.getParticipantsList();
 * })
 * ```
 * @param payload The event detail
 * @event
 */
export declare function event_user_add(payload: Array<Participant>): void;
/**
 * Occurs when the properties of the participants updated.
 * @param payload The event detail
 * @event
 */
export declare function event_user_update(payload: Array<Participant>): void;
/**
 * Occurs when the participants leave the meeting
 * @param payload The event detail
 * @event
 */
export declare function event_user_remove(payload: Array<Participant>): void;
/**
 * Occurs when local recording status changes.
 * @param payload The local recording status
 */

/**
 * Occurs when remote video stream changes.
 *
 * ```javascript
 * client.on('video-active-change', async(payload) => {
 *   try {
 *     if (payload.state === 'Active') {
 *       await stream.renderVideo(canvas, quality, payload.id);
 *     } else {
 *       await stream.stopRenderVideo();
 *     }
 *   } catch (error) {
 *     console.log(error);
 *   }
 * });
 * ```
 * @param payload The event detail
 * @event
 */
export declare function event_video_active_change(payload: {
  state: VideoActiveState;
  id: number;
}): void;
/**
 * Occurs when local video capture stream changes.
 *
 * ```javascript
 * client.on('video-capturing-change', (payload) => {
 *   try {
 *     if (payload.state === 'Started') {
 *       console.log('Capture started');
 *     } else if (payload.state === 'Stopped') {
 *       console.log('Capture stopped');
 *     } else {
 *       console.log('Stop capturing Failed');
 *     }
 *   } catch (error) {
 *     console.log(error);
 *   }
 * });
 * ```
 * @param payload The event detail
 * @event
 */
export declare function event_video_capturing_change(payload: {
  state: VideoCapturingState;
}): void;

/**
 * Occurs when the host muted or unmuted the participants' video
 *
 * ```javascript
 * client.on('video-muted-change', (payload) => {
 *  const currentUser = client.getCurrentUser();
 *  if(payload.state==='Muted'&&payload.id===currentUser.userId){
 *   console.log(`Host muted my video`);
 * }
 * })
 * ```
 * @param payload The event detail
 * @event
 */
export declare function event_video_muted_change(payload: {
  state: VideoMutedState;
  id: number;
}): void;

/**
 * Occurs when the sdk video decode status changes
 *
 * ```javascript
 * client.on('video-decode-status-change', (payload) => {
 *   if (payload.state === 'Success') {
 *     console.log(`Video decode initial success.`);
 *   }
 * });
 * ```
 * @param payload
 * @event
 */
export declare function event_video_decode_status(payload: {
  state: 'Success' | 'Failed' | 'Initial';
}): void;
/**
 * Occurs when the sdk video encode status changes
 *
 * ```javascript
 * client.on('video-encode-status-change', (payload) => {
 *   if (payload.state === 'Success') {
 *     console.log(`Video encode initial success.`);
 *   }
 * });
 * ```
 * @param payload
 * @event
 */
export declare function event_video_encode_status(payload: {
  state: 'Success' | 'Failed' | 'Initial';
}): void;
/**
 * Occurs when received video content dimension change
 * ```javascript
 * client.on('video-dimension-change', payload=>{
 *  viewportElement.style.width = `${payload.width}px`;
 *  viewportElement.style.height = `${payload.height}px`;
 * })
 * ```
 * @param payload
 * @event
 */
export declare function event_video_dimension_change(payload: {
  width: number;
  height: number;
  type: 'received';
}): void;
/**
 * Occurs when some participants in meeting are talking
 *
 * ```javascript
 * client.on('active-speaker', (payload) => {
 *    console.log(`Active user:`,payload);
 * });
 * ```
 * @param payload active user
 * - Distinguish activity level by the volume, the biggest is the first element.
 * @event
 */
export declare function event_audio_active_speaker(
  payload: Array<ActiveSpeaker>,
): void;
/**
 * Occurs when host ask you to unmute audio.
 * @param payload the event detail
 * - reason:
 *  - `Unmute`: Host ask you to unmute audio.
 *
 * ```javascript
 * client.on('unmute-audio-consent', (payload) => {
 *    console.log(payload.reason);
 * });
 * ```
 * @event
 */
export declare function event_audio_unmute_consent(payload: {
  reason: 'Unmute';
}): void;
/**
 * Occurs when current audio is changed
 * @param payload the event detail
 * - action
 *  - `join`: Join the audio. refer to the `type` attribute get the detail.
 *  - `leave`: Leave the audio.
 *  - `muted`: Audio muted, refer to the `source` attribute get the detail.
 *  - `unmuted`: Audio unmuted,refer to the `source` attribute get the detail.
 * - type
 *  - `computer': Join by the computer audio.
 * - source
 *  - `active`: User active action.
 *  - `passive(mute all)`: Muted due to the host muted all.
 *  - `passive(mute one)`: Muted due to the host muted you.
 *  - `passive`: Unmuted due to the host unmuted you.
 *
 * ```javascript
 * client.on('current-audio-change', (payload) => {
 *    if(payload.action==='join'){
 *     console.log('Joined by ',payload.type);
 *    }
 * });
 * ```
 * @event
 */
export declare function event_current_audio_change(payload: {
  action: 'join' | 'leave' | 'muted' | 'unmuted';
  type?: 'computer';
  source?: 'active' | 'passive(mute all)' | 'passive(mute one)' | 'passive';
}): void;

/**
 * Occurs when the SDK try to auto play audio failed. It may occur invoke stream.startAudio() immediately after join the meeting.
 *
 * ```javascript
 * client.on('auto-play-audio-failed',()=>{
 *  console.log('auto play audio failed, waiting user's interaction');
 * })
 * ```
 * @event
 */
export declare function event_auto_play_audio_failed(): void;

/**
 * Occurs when add or remove the microphone/speaker/camera.
 * If you interests with the plugging or unplugging the microphone/speaker, listen the `device-change` event.
 * ```javascript
 * client.on('device-change',()=>{
 *   // get the latest devices
 *   const microphones = stream.getMicList();
 *   const speakers = stream.getSpeakerList();
 * });
 * ```
 * @event
 */
export declare function event_device_change(): void;

/**
 * Occurs when receive a chat
 * @param payload the event detail
 * ```javascript
 * client.on('chat-receive-message',payload=>{
 *  console.log('from %s, message:%s',payload.sender,payload.message);
 * })
 * ```
 * @event
 */
export declare function event_chat_received_message(payload: ChatMessage): void;
/**
 * Occurs when the host change the privilege of chat
 * @param payload the event detail
 * ```javascript
 * client.on('chat-privilege-change',payload=>{
 *  console.log(payload.chatPrivilege);
 * })
 * ```
 * @event
 */
export declare function event_chat_privilege_change(payload: {
  chatPrivilege: ChatPrivilege;
}): void;

/**
 * Occurs when some participant is start sharing screen
 *
 * ```javascript
 * client.on('active-share-change',payload=>{
 *  if(payload.state==='Active'){
 *   stream.startRenderScreenShare(payload.activeUserId,canvas);
 *  }else if(payload.state==='Inactive'){
 *   stream.stopRenderScreenShare();
 *  }
 * })
 * ```
 * @param payload
 * @event
 */
export declare function event_active_share_change(payload: {
  state: 'Active' | 'Inactive';
  activeUserId: number;
}): void;
/**
 * Occurs when shared content dimension change.
 * If the type in payload is sended, it represents current user's share.
 * If the type in payload is received, it represents others' share.
 * ```javascript
 * client.on('share-content-dimension-change',payload=>{
 *  viewportElement.style.width = `${payload.width}px`;
 *  viewportElement.style.height = `${payload.height}px`;
 * })
 * ```
 * @param payload
 * @event
 */
export declare function event_share_content_dimension_change(payload: {
  type: 'sended' | 'received';
  width: number;
  height: number;
}): void;
/**
 * Occurs when the host change the share privilege
 * @param payload
 * @event
 */
export declare function event_share_privilege_change(payload: {
  privilege: SharePrivilege;
}): void;
/**
 * Occurs when current sharing is passively stopped.
 * ```javascript
 * client.on('passively-stop-share', (payload) => {
 *  console.log('Sharing is stopped passively for', payload.reason);
 * });
 * ```
 * @param payload
 * @event
 */
export declare function event_passively_stop_share(payload: {
  reason: PassiveStopShareReason;
}): void;

/**
 * Occurs when received shared content automatically changed
 * - Maybe host start new sharing, received shared content will be automatically changed
 * ```javascript
 * client.on('share-content-change', (payload) => {
 *    console.log('Auto switch to', payload.activeUserId);
 * });
 * ```
 * @param payload
 * @event
 */
export declare function event_share_content_change(payload: {
  activeUserId: number;
}): void;
