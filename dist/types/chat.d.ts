import { ChatMessage } from './event-callback'
/**
 * The chat interface provides the methods define the chat behavior
 *
 * The chat object can be accessed by `getChatClient` method of a `ZoomInstant` instance.
 *  ```js
 * const client = ZoomInstant.createClient();
 * client
 * .init()
 * .then(() => client.join(topic, signature, username, password))
 * .then(() => {
 *    console.log('join success')
 *  });
 *
 * // listen to the event of receiving chat message
 * client.on('chat-receive-message', (v) => {
 *  console.log(v);
 *  // to do something
 * })
 * ```
 *
 * after joining meeting success, chat interface is available
 *
 * ```js
 * const chat = client.getChatClient();
 * if (chat) {
 *  chat.sendChatToAll(); // chat methods is available now
 * }
 * ```
 */
declare namespace ChatClient {
  /**
   * Send chat message to a specific user
   * #### example
   * ```js
   *  chat.sendChatToUser('test', userId)
   *  .then(() => {
   *      // success
   *  })
   *  .catch(v => {
   *      // fail
   *      console.log(v)
   *  })
   * ```
   * @param text
   * @param userId
   *
   * @return
   * - `ChatMessage`: success
   * - `Error`: Failure. Following the details of Error:
   *     - `IMPROPER_MEETING_STATE`: It works only when user is in meeting
   *     - `INSUFFICIENT_PRIVILEGES`: Chat privilege limited or private chat is disabled
   *     - `INVALID_PARAMETERS`: Invalid parameter
   */
  function sendChatToUser(
    text: string,
    userId: number,
  ): Promise<ChatMessage | Error>;

  /**
   * Send chat message to everyone
   * #### example
   * ```js
   *  chat.sendChatToAll('test')
   *  .then(() => {
   *      // success
   *  })
   *  .catch(v => {
   *      // fail
   *      console.log(v)
   *  })
   * ```
   * @param text
   *
   * @return
   * - `ChatMessage`: success
   * - `Error`: Failure. Following the details of Error:
   *     - `IMPROPER_MEETING_STATE`: It works only when user is in meeting
   *     - `INSUFFICIENT_PRIVILEGES`: Chat privilege limited or chat is disabled
   *     - `INVALID_PARAMETERS`: Invalid parameter
   */
  function sendChatToAll(text: string): Promise<ChatMessage | Error>;

  /**
   * The host or manager use it to change chat privilege which defines what kind of role of user that attendee can talk to, there are the different privilege as following.
   *
   * | privilege value | describe                                            |
   * | --------------- | --------------------------------------------------- |
   * | 1               | attendee can talk to all or privately to someone    |
   * | 4               | attendee can talk to no one                         |
   * | 5               | attendee can only talk to all                       |
   *
   * **there is a special user**
   *
   * **EVERY_ONE**: If someone send chat message to all use {@link sendChatToAll}, the chat data that other will receive include the reader property which is represent the EVERY_ONE user.
   *
   * #### example
   *
   * ```js
   * const MEETING_PRIVILEGE_ALL = 1;
   * chat.changePrivilege(MEETING_PRIVILEGE_ALL)
   * .then((v) => {
   *      const { chatPrivilege } = v;
   *      // success
   *  })
   * .catch(v => {
   *      // fail
   *      console.log(v)
   *  })
   * ```
   *
   * @param privilege
   *
   * @return
   *
   * - `{ chatPrivilege: number }`: success
   * - `Error`: Failure. Following the details of Error:
   *     - `IMPROPER_MEETING_STATE`: It works only when user is in meeting
   *     - `INSUFFICIENT_PRIVILEGES`: Only host or manager can mute other participants
   *     - `INTERNAL_ERROR`: Set privilege failed
   *     - `OPERATION_TIMEOUT`: Set privilege timeout
   *     - `INVALID_PARAMETERS`: Invalid privilege value of parameter
   */
  function changePrivilege(
    privilege: number,
  ): Promise<{ chatPrivilege: number } | Error>;

  /**
   * Return the current privilege value
   * #### example
   * ```js
   * const privilege = chat.getPrivilege();
   * console.log(privilege);
   * ```
   * @return
   */
  function getPrivilege(): number;
}
export default ChatClient;
