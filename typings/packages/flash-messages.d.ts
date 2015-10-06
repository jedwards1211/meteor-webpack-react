// Definitions for the flash-messages smart package
//
// https://atmosphere.meteor.com/package/flash-messages
// https://github.com/camilosw/flash-messages

/// <reference path='meteor.d.ts'/>

declare module FlashMessages {
  function sendAlert(message: string, options?: ConfigurationOptions): void;
  function sendError(message: string, options?: ConfigurationOptions): void;
  function sendSuccess(message: string, options?: ConfigurationOptions): void;
  function sendInfo(message: string, options?: ConfigurationOptions): void;
  function clear(): void;
  function configure(options: ConfigurationOptions): void;

  interface ConfigurationOptions {
    autoHide?: boolean;
    hideDelay?: number;
  }
}

interface FlashMessagesDAO {
  message: string;
  style?: string;
  seen?: boolean;
  options?: FlashMessages.ConfigurationOptions;
}

declare var flashMessages: Mongo.Collection<FlashMessagesDAO>;