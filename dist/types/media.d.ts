import { ExecutedResult } from './common';

/**
 * Interface of media device
 */
interface MediaDevice {
  /**
   * Label of the device
   */
  label: string;
  /**
   * Identify of device
   */
  deviceId: string;
}
/**
 * Share privilege
 */
export enum SharePrivilege {
  /**
   * One participant can share at a time, only the host or manager can start sharing when someone else is sharing.
   */
  Unlocked = 0,
  /**
   * Only the host or manager can share
   */
  Locked = 1,
}

/**
 * The Stream interface provides methods that define the behaviors of a Stream object, such as the mute audio, capture video.
 *
 * The Stream object is created by the `getMediaStream` method..
 */
declare namespace Stream {
  // ------------------------------------------------[audio]------------------------------------------------------------
  /**
   * Join audio by the microphone and speaker.
   * - It works only the audio flag is `true` in the media constraints.
   * - If the participant has joined audio by the phone, he/she cannot join the computer audio.
   *
   * ```javascript
   * await client.init();
   * await client.join(topic, signature, username, password);
   * const stream = client.getMediaStream();
   * await stream.startAudio();
   * ```
   * @returns executed promise. Following are the possible error reasons:
   * - type=`USER_FORBIDDEN_MICROPHONE`: The user has blocked accesses to the microphone from the sdk, try to grant the privilege and rejoin the meeting.
   */
  function startAudio(): ExecutedResult;

  /**
   * Leave the computer audio
   * - It works only the audio flag is `true` in the media constraints.
   */
  function stopAudio(): ExecutedResult;

  /**
   * Mute audio
   * - If userId is not specified, this will mute muself.
   * - Only the **host** or **manager** can mute others.
   * - If an attendee is allowed to talk, the host can also mute him/her.
   * @param userId Default `undefined`
   */
  function muteAudio(userId?: number): ExecutedResult;
  /**
   * Unmute audio
   * - If userId is not specified, this will unmute self.
   * - For privacy and security concerns, the host can not unmute the participant's audio directly, instead, the participant will receive an unmute audio consent.
   *
   * ```javascript
   * // unmute myself
   * if(stream.isAllowToUnmute()){
   *  await stream.unmuteAudio();
   * }
   * // host unmute others
   * await stream.unmuteAudio(userId);
   * // participant side
   * client.on('unmute-audio-consent',(payload)=>{
   *  console.log('Host ask me to unmute');
   * })
   * ```
   * @param userId Default `undefined`
   *
   */
  function unmuteAudio(userId?: number): ExecutedResult;

  /**
   * Whether the user is muted.
   * - If not specified the user id, get the muted of current user.
   * @param userId Default `undefined`
   * @return boolean
   */
  function isAudioMuted(userId?: number): boolean;

  /**
   * Get the available microphones.
   */
  function getMicList(): Array<MediaDevice>;
  /**
   * Get the available speakers.
   */
  function getSpeakerList(): Array<MediaDevice>;

  /**
   * Get the active device id of microphone.
   * @returns device id
   */
  function getActiveMicrophone(): string;
  /**
   * Get the active device of speaker.
   * @returns device id
   */
  function getActiveSpeaker(): string;

  /**
   * Switch the microphone
   *
   * ```javascript
   *  const microphones = stream.getMicList();
   *  const microphone = microphones.length>0 && microphones[0];
   *  await switchMicrophone(microphone);
   * ```
   * @param microphoneId the device id of microphone
   *
   */
  function switchMicrophone(microphoneId: string): ExecutedResult;
  /**
   * Switch the speaker
   *
   * @param speakerId the device id of speaker
   *
   */
  function switchSpeaker(speakerId: string): ExecutedResult;

  // -------------------------------------------------[video]-----------------------------------------------------------

  /**
   * Start capture video by a specified camera.
   *
   * **Note**
   * - It may take user some time to allow browser access camera device. Therefore there is no default timeout.
   *
   * **Example**
   * ```javascript
   * try{
   *   const canvas = ['capture-canvas-1', 'capture-canvas-2'];
   *   const video = 'capture-video';
   *   await stream.startVideo(canvas, video);
   * } catch (error) {
   *   console.log(error);
   * }
   * ```
   *
   * @param canvas The id of `HTMLCanvasElement` to display captured content.
   *
   * If the provided canvas is an array, only the first canvas in the array will be used. Canvas in the array to be used can be switched by `switchCanvasForVideoCapture`.
   * @param videoId The id of `HTMLVideoElement` to display captured content.
   *
   * @returns
   * - `''`: Success
   * - `Error`: Failure. Errors besides {@link ErrorTypes} that may be returned are listed below.
   *   - `CAN_NOT_DETECT_CAMERA`: Cannot detect camera device.
   *   - `CAN_NOT_FIND_CAMERA`: The provided camera device id is not included in camera device list.
   *   - `VIDEO_USER_FORBIDDEN_CAPTURE`: The user has forbidden use camera, he/she can allow camera and rejoin the meeting.
   *   - `VIDEO_ESTABLISH_STREAM_ERROR`: Video websocket is broken.
   *   - `VIDEO_CAMERA_IS_TAKEN`: User's camera is taken by other programs.
   */
  function startVideo(
    canvas: string | Array<string>,
    videoId: string,
  ): Promise<'' | Error>;

  /**
   * Stop current video capturing.
   *
   *
   * **Example**
   * ```javascript
   * try{
   *   await stream.stopVideo();
   * } catch (error) {
   *   console.log(error);
   * }
   * ```
   *
   * @returns
   * - `''`: Success
   * - `Error`: Failure. Details in {@link ErrorTypes}.
   */
  function stopVideo(): ExecutedResult;

  /**
   *
   * Change camera device for capturing video.
   *
   * **Note**
   * - The camera device id is accessible only after the user allows the browser to access camera devices.
   *
   * **Example**
   * ```javascript
   * try{
   *   const newCameraDeviceId = stream.getCameraList()[0];
   *   await stream.switchCamera(newCameraDeviceId);
   * } catch (error) {
   *   console.log(error);
   * }
   * ```
   *
   * @param cameraDeviceId The id of camera device.
   *   - {@link Stream.getCameraList} can be used to get current accessible camera device.
   *
   */
  function switchCamera(cameraDeviceId: string): ExecutedResult;

  /**
   *
   * Start render current active video.
   *
   * **Note**
   * - It CANNOT render current user's video. If there is a need please use {@link startVideo}.
   *
   * **Example**
   * ```javascript
   * try{
   *   const canvas = document.querySelector('#canvas-id');
   *   const id = stream.getActiveVideoId();
   *   await stream.renderVideo(canvas, 2, id);
   * } catch (error) {
   *   console.log(error);
   * }
   * ```
   *
   * @param canvas The html canvas element where render video at.
   * @param receivedVideoQuality The quality of rendered video. Cannot be higher than captured resolution.
   *   - receivedVideoQuality = 1 => 180p
   *   - receivedVideoQuality = 2 => 360p
   * @param activeNodeId The video source id.
   *   - Remote server will only push the active video stream. Current active video node id can be get with {@link Stream.getActiveVideoId}.
   *
   */
  function renderVideo(
    canvas: HTMLCanvasElement,
    receivedVideoQuality: number,
    activeNodeId: number,
  ): ExecutedResult;

  /**
   * Stop current rendering video.
   *
   *
   * **Example**
   * ```javascript
   * try{
   *   await stream.stopRenderVideo();
   * } catch (error) {
   *   console.log(error);
   * }
   * ```
   *
   */
  function stopRenderVideo(): ExecutedResult;

  /**
   * Switch the canvas for rendering local captured video.
   *
   * **Note**
   * - The input canvas id MUST be included in the canvas list passed to `startVideo`.
   *
   * **Example**
   * ```javascript
   * try{
   *   const canvas = ['capture-canvas-1', 'capture-canvas-2'];
   *   const video = 'capture-video';
   *   const deviceId = 'default';
   *   await stream.startVideo(canvas, video, deviceId);
   *
   *   await stream.switchCanvasForVideoCapture('capture-canvas-2');
   * } catch (error) {
   *   console.log(error);
   * }
   * ```
   *
   * @param canvas Required. The id of html canvas element it will switch to.
   */
  function switchCanvasForVideoCapture(
    canvas: string | Array<string>,
  ): ExecutedResult;

  /**
   * Get the isRemoteVideoActive flag status.
   *
   * **Example**
   * ```javascript
   * try{
   *   const isRemoteVideoActive = stream.isRemoteVideoActive();
   *   console.log(isRemoteVideoActive);
   * } catch (error) {
   *   console.log(error);
   * }
   * ```
   *
   * @returns
   * - `true`: There is active remote video.
   * - `false`: There is not active remote video or the video flag is `false` in media constraints.
   */
  function isRemoteVideoActive(): boolean;

  /**
   *
   * Get the isReceivingVideo flag status.
   *
   * **Example**
   * ```javascript
   * try{
   *   const isReceivingVideo = stream.isReceivingVideo();
   *   console.log(isReceivingVideo);
   * } catch (error) {
   *   console.log(error);
   * }
   * ```
   *
   * @returns
   * - `true`: The stream object is receiving video.
   * - `false`: The stream object is not receiving.
   */
  function isReceivingVideo(): boolean;

  /**
   *
   * Get the isCapturingVideo flag status.
   *
   * **Example**
   * ```javascript
   * try{
   *   const isCapturingVideo = stream.isCapturingVideo();
   *   console.log(isCapturingVideo);
   * } catch (error) {
   *   console.log(error);
   * }
   * ```
   *
   * @returns
   * - `true`: The stream object is capturing video.
   * - `false`: The stream object is not capturing video.
   */
  function isCapturingVideo(): boolean;

  /**
   *
   * Get the isCameraTaken flag status.
   *
   * **Example**
   * ```javascript
   * try{
   *   const isCameraTaken = stream.isCameraTaken();
   *   console.log(isCameraTaken);
   * } catch (error) {
   *   console.log(error);
   * }
   * ```
   *
   * @returns
   * - `true`: The camera is taken by other program.
   * - `false`: The camera is taken by other program.
   */
  function isCameraTaken(): boolean;

  /**
   * Get the isCaptureForbidden flag status.
   *
   * **Example**
   * ```javascript
   * try{
   *   const isCaptureForbidden = stream.isCaptureForbidden();
   *   console.log(isCaptureForbidden);
   * } catch (error) {
   *   console.log(error);
   * }
   * ```
   *
   * #### Parameters
   * None.
   *
   * @returns
   * - `true`: The capture is forbidden by user.
   * - `false`: The capture is not forbidden by user or the video flag is `false` in media constraints.
   */
  function isCaptureForbidden(): boolean;

  /**
   * Get the current camera devices list.
   *
   * **Note**
   * - This camera device list is collected from browser's navigator.mediaDevices object and maintained by the stream object.
   * - If the user does not allow permission to access the camera, this list will have a default CameraDevice object with all property set to empty string.
   *
   * **Example**
   * ```javascript
   * try{
   *   const currentCameraDevicesList = stream.getCameraList();
   *   console.log(currentCameraDevicesList);
   * } catch (error) {
   *   console.log(error);
   * }
   * ```
   *
   * @returns
   * - `[]`: The video flag is `false` in media constraints.
   * - `Array<CameraDevice>`: A CameraDevice interface has following property:
   *   - `label: string`: The label of camera device.
   *   - `deviceId: string`: The string of camera device.
   */
  function getCameraList(): Array<MediaDevice>;

  /**
   * Get the recently active camera devices id.
   *
   * **Example**
   * ```javascript
   * try{
   *   const activeCamera = stream.getActiveCamera();
   *   console.log(activeCamera);
   * } catch (error) {
   *   console.log(error);
   * }
   * ```
   *
   * @returns
   * - `''`: The video flag is `false` in media constraints.
   * - `'default'`: No camera device id is passed to `startVideo` and it will use system default camera.
   * - `string`: Recently active camera devices id.
   */
  function getActiveCamera(): string;

  /**
   * Get the recently active video id.
   *
   * **Example**
   * ```javascript
   * try{
   *   const activeVideoId = stream.getActiveVideoId();
   *   console.log(activeVideoId);
   * } catch (error) {
   *   console.log(error);
   * }
   * ```
   *
   * @returns
   * - `0`: No video is active or the video flag is `false` in media constraints.
   * - `number`: Id of current active video.
   */
  function getActiveVideoId(): number;
  /**
   * Get the dimension of received video.
   */
  function getReceivedVideoDimension(): { height: number; width: number };

  /**
   * Render the received screen share content.
   * - It is usually called in the `active-share-change` callback.
   *
   * ```javascript
   * client.on('active-share-change',payload=>{
   *  if(payload.state==='Active'){
   *   stream.startShareView(payload.activeUserId,canvas);
   *  }else if(payload.state==='Inactive'){
   *   stream.stopShareView();
   *  }
   * })
   * ```
   *
   * @param activeUserId Required. active share user id
   * @param canvas Required. the canvas to render the share content
   */
  function startShareView(
    activeUserId: number,
    canvas: HTMLCanvasElement,
  ): ExecutedResult;

  /**
   * Start screen share.
   * - Check the share privilege before start screen share.
   * - If you start screen share, you will stop reveived others shared content.
   * - Legacy Chrome browser need to install chrome extension before start screen share, check the promise return value.
   * @param canvasId Required. The id of canvas which renders the screen share content.
   *
   * @returns executed promise.
   * - {type:'INVALID_OPERATION', reason:'required extension', extensionUrl:'url'} : Installed the extension before start share
   */
  function startShareScreen(canvasId: string): ExecutedResult;
  /**
   * Stop screen share
   *
   */
  function stopShareView(): ExecutedResult;
  /**
   * Pause screen share
   *
   */
  function pauseShareScreen(): ExecutedResult;

  /**
   * Resume screen share
   *
   */
  function resumeShareScreen(): ExecutedResult;
  /**
   * Stop screen share
   *
   */
  function stopShareScreen(): ExecutedResult;
  /**
   * Lock the privilege of screen share, only the host(manager) can share.
   * - Only the **host** or **manager** has the permission.
   * - If the non-host is sharing the screen, once the host locked screen share, his/her sharing will be forcibly stopped.
   *
   * ```javascript
   * // host
   * stream.lockShare(true);
   * // sharing user
   * client.on('passively-stop-share',payload=>{
   *  if(payload.reason==='PrivilegeChange'){
   *  console.log('passively stop share because of privilege change')
   *  }
   * })
   * ```
   * @param isLocked set true to lock share, or false to unlock.
   *
   */
  function lockShare(isLocked: boolean): ExecutedResult;
  /**
   * Whether the host locked the share
   */
  function isShareLocked(): boolean;
}

export default Stream;
