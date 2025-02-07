import { ExecutedResult } from './common';
import Stream from './media';
import ChatClient from './chat';
import {
  event_connection_change,
  event_user_add,
  event_user_update,
  event_user_remove,
  event_video_active_change,
  event_video_muted_change,
  event_video_decode_status,
  event_video_encode_status,
  event_audio_active_speaker,
  event_audio_unmute_consent,
  event_current_audio_change,
  event_chat_received_message,
  event_chat_privilege_change,
  event_auto_play_audio_failed,
  event_active_share_change,
  event_passively_stop_share,
  event_share_content_dimension_change,
  event_share_content_change,
  event_device_change,
  event_video_dimension_change,
  event_share_privilege_change,
} from './event-callback';
import { Participant } from './event-callback';
/**
 * Interface for the result of check system requirements.
 */
interface MediaCompatiblity {
  /**
   * If `audio` is `false`, it means the browser is not compatible with voip.
   */
  audio: boolean;
  /**
   * If `video` if `false`, it means the browser is not compatible with video feature.
   */
  video: boolean;
  /**
   * If `screen` if `false`, it means the browser is not compatible with share screen feature.
   */
  screen: boolean;
}

interface SessionInfo {
  /**
   * topic
   */
  topic: string;
  /**
   * password if it exists
   */
  password: string;
  /**
   * user name
   */
  userName: string;
  /**
   * user id
   */
  userId: number;
  /**
   * Whether the user is in the meeting
   */
  isInMeeting: boolean;
}

export declare namespace InstantClient {
  /**
   * Initilize the ZOOM Instant SDK before join a meeting.
   * The ZOOM Instant SDK uses an SDK key & Secret for authentication. Login to the Zoom Marketplace and [Create a JWT App](https://devmp.zoomdev.us/guides/getting-started/app-types/create-jwt-app) to get SDK keys & Secrets.
   * @param language The language of ZOOM Instant Web SDK. Default is `en-US`
   * @param dependentAssets In the ZOOM Instant SDK, web workers and web assembly are used to process media stream. This part of the code is separated from the SDK, so it is necessary to specify the dependent assets path.
   * When the SDK is released, the web worker and the web assembly will be also included(the `lib` folder), you can either deploy these assets to your private servers or use the cloud assets provided by ZOOM. The property has following value:
   * - `Global`: The default value. The dependent assets path will be `https://source.zoom.us/{version}/lib`
   * - `CDN`: The dependent assets path will be `https://dmogdx0jrul3u.cloudfront.net/{version}/lib`
   * - `CN`: Only applicable for China. The dependent assets path will be https://jssdk.zoomus.cn/{version}/lib
   * - `{FULL_ASSETS_PATH}`: The SDK will load the dependent assets spcified by the developer.
   */
  function init(
    language: string,
    dependentAssets: string | 'CDN' | 'Global' | 'CN',
  ): ExecutedResult;
  /**
   * Get the media stream instance for managing the media.
   *
   * This usually the first step of using media.
   */
  function getMediaStream(): typeof Stream;

  /**
   * Listen for the events and handle them.
   * @param event event name
   * @param callback the event handler
   */
  function on(event: string, callback: (payload: any) => void): void;
  /**
   * @param event
   * @param listener Details in {@link event_connection_change}.
   */
  function on(
    event: 'connection-change',
    listener: typeof event_connection_change,
  ): void;
  /**
   * @param event
   * @param listener Details in {@link event_user_add}.
   */
  function on(event: 'user-added', listener: typeof event_user_add): void;
  /**
   * @param event
   * @param listener Details in {@link event_user_update}.
   */
  function on(event: 'user-updated', listener: typeof event_user_update): void;
  /**
   * @param event
   * @param listener Details in {@link event_user_remove}.
   */
  function on(event: 'user-removed', listener: typeof event_user_remove): void;
  /**
   * @param event
   * @param listener Details in {@link event_video_active_change}.
   */
  function on(
    event: 'video-active-change',
    listener: typeof event_video_active_change,
  ): void;
  /**
   * @param event
   * @param listener Details in {@link event_video_dimension_change}.
   */
  function on(
    event: 'video-dimension-change',
    listener: typeof event_video_dimension_change,
  ): void;
  /**
   * @param event
   * @param listener Details in {@link event_video_decode_status}.
   */
  function on(
    event: 'video-decode-status-change',
    listener: typeof event_video_decode_status,
  ): void;
  /**
   * @param event
   * @param listener Details in {@link event_video_encode_status}.
   */
  function on(
    event: 'video-encode-status-change',
    listener: typeof event_video_encode_status,
  ): void;
  /**
   * @param event
   * @param listener Details in {@link event_audio_active_speaker}.
   */
  function on(
    event: 'active-speaker',
    listener: typeof event_audio_active_speaker,
  ): void;
  /**
   * @param event
   * @param listener Details in {@link event_audio_unmute_consent}.
   */
  function on(
    event: 'unmute-audio-consent',
    listener: typeof event_audio_unmute_consent,
  ): void;
  /**
   * @param event
   * @param listener Details in {@link event_current_audio_change}.
   */
  function on(
    event: 'current-audio-change',
    listener: typeof event_current_audio_change,
  ): void;
  /**
   * @param event
   * @param listener Details in {@link event_chat_received_message}.
   */
  function on(
    event: 'chat-receive-message',
    listener: typeof event_chat_received_message,
  ): void;
  /**
   * @param event
   * @param listener Details in {@link event_chat_privilege_change}.
   */
  function on(
    event: 'chat-privilege-change',
    listener: typeof event_chat_privilege_change,
  ): void;
  /**
   * @param event
   * @param listener Details in {@link event_auto_play_audio_failed}.
   */
  function on(
    event: 'auto-play-audio-failed',
    listener: typeof event_auto_play_audio_failed,
  ): void;
  /**
   * @param event
   * @param listener Details in {@link event_device_change}.
   */
  function on(event: 'device-change', listener: typeof event_device_change): void;
  /**
   * @param event
   * @param listener Details in {@link event_active_share_change}.
   */
  function on(
    event: 'active-share-change',
    listener: typeof event_active_share_change,
  ): void;
  /**
   * @param event
   * @param listener Details in {@link event_share_content_dimension_change}.
   */
  function on(
    event: 'share-content-dimension-change',
    listener: typeof event_share_content_dimension_change,
  ): void;
  /**
   * @param event
   * @param listener Details in {@link event_share_privilege_change}.
   */
  function on(
    event: 'share-privilege-change',
    listener: typeof event_share_privilege_change,
  ): void;
  /**
   * @param event
   * @param listener Details in {@link event_passively_stop_share}.
   */
  function on(
    event: 'passively-stop-share',
    listener: typeof event_passively_stop_share,
  ): void;
  /**
   * @param event
   * @param listener Details in {@link event_share_content_change}.
   */
  function on(
    event: 'share-content-change',
    listener: typeof event_share_content_change,
  ): void;
  /**
   * Remove the event handler.
   * @param event event name
   * @param callback the event handler
   */
  function off(event: string, callback: (payload: any) => void): void;
  /**
   * Join the meeting
   * - Make sure call `init` method before join.
   * @param topic
   * @param token A JWT, should be generated on server.
   * @param userName user name
   * @param password If a password is required when joining the meeting, pass the password, otherwise omit it
   *
   * @returns a executed promise. Following are the possible error reasons:
   * - `duplicated operation`: Duplicated invoke the `join` method.
   * - `invalid apiKey or signature`: ApiKey or signature is not correct.
   * - `invalid password`: Password is not correct.
   * - `meeting is not started`: The meeting is not started. If you are the host of the meeting, you can start the meeting.
   * - `meeting is locked`: The meeting is locked by the host, can not join the meeting.
   * - `meeting is at capacity`: The meeting is at capacity.
   * - `meeting is ended`: The meeting is already ended.
   * - `rejected by information barrier`: Can not join the meeting because og the information barrier.
   * - `rejected by existed participant`: Can not join the meeting because another client using the account is already in the meeting.
   * - `invalid parameters`: Can not join the meeting because the invalid parameters.
   * - `rejected by been denied`: Can not join the meeting because the host has expeled you.
   * - `internal error`: Internal error.
   */
  function join(
    topic: string,
    token: string,
    userName: string,
    password?: string,
  ): ExecutedResult;
  /**
   * Leave the meeting
   *
   */
  function leave(): ExecutedResult;
  /**
   * Rename your name or other participant's name
   * - Only the **host** or **manager** can rename others.
   * - The host can set whether the participants are allowed to rename themselves. refer to the `client.isAllowToRename()` get the value.
   *
   * ``` javascript
   * if(client.isAllowToRename()){
   *  await client.rename([new name]);
   * }
   * ```
   * @param name new display name
   * @param userId rename the spcified user
   *
   */
  function changeName(name: string, userId?: number): ExecutedResult;
  /**
   * Remove the participant
   * - Only the **host** or **manager** can remove others.
   *
   * @param userId
   */
  function removeUser(userId: number): ExecutedResult;
  /**
   * Make other participant as the host.
   * - Only the **host** can make host.
   * - There is only one host in the meeting. Once make other as the host, the original host is not the meeting host.
   *
   * @param userId
   */
  function makeHost(userId: number): ExecutedResult;
  /**
   * Make other participants as the manager
   * - Only the **host** can make manager.
   * - There may be multiple managers in session.
   *
   * @param userId
   */
  function makeManager(userId: number): ExecutedResult;
  /**
   * Revoke the manager permission from the participant
   * - Only the **host** can revoke Manager.
   * @param userId
   */
  function revokeManager(userId: number): ExecutedResult;

  /**
   * Get current user info.
   */
  function getCurrentUserInfo(): Participant;
  /**
   * Get the in meeting users of the meeting.
   */
  function getAllUser(): Array<Participant>;

  /**
   * Get the user by userId.
   */
  function getUser(userId: number): Participant | undefined;

  /**
   * Get chat client.
   */
  function getChatClient(): typeof ChatClient;

  /**
   * Get the user by userId.
   */
  function getSessionInfo(): SessionInfo;
}
declare namespace ZoomInstant {
  /**
   * The version of the ZOOM Instant Web SDK.
   */
  const VERSION: string;
  /**
   * Creates a client for managing the meeting.
   * This method will return a same instance if called multi times.
   * This is usually the first step of using the ZOOM Instant Web SDK.
   * @category ZOOM Core
   */
  function createClient(): typeof InstantClient;

  /**
   * Checks the compatibility of the current browser.
   * Use this method before calling {@link init} to check if the SDK is compatible with the web browser.
   *
   * @returns A `MediaCompatiblity` object. The object has following properties:
   * - `audio`: boolean, whether the audio is compatible with the current web browser.
   * - `video`: boolean, whether the video is compatible with the current web browser.
   * - `screen`: boolean, whether the screen is compatible with the current web browser.
   */
  function checkSystemRequirements(): MediaCompatiblity;
}

export default ZoomInstant;
