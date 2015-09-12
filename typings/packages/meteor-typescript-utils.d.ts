// Type definitions for Meteor Typescript Utils Version 0.1
// Project: https://github.com/dataflows/meteor-typescript-utils
// Definitions by: Marek Rogala <https://github.com/marekrogala>
// Definitions: https://github.com/dataflows/meteor-typescript-utils

/// <reference path="../meteor/meteor.d.ts" />
/// <reference path="jquery.d.ts" />
/// <reference path="lodash.d.ts" />
/// <reference path="ironrouter.d.ts" />

declare module meteorts {

  module MeteorTemplate {

    interface IEventHandler<T> {
      (event: Meteor.Event, template: IBlaze<T>): void;
    }

    function event(eventMatcher: string): (target: Function, key: string, value: any) => any;

    function helper(target: Function, key: string, value: any): any;

    class Base<T> {
      name: string;
      context: T;
      subscriptions: any;
      constructor(name: string, helpers?: Object, events?: any, Bindings?: Object, context?: T);
      data: T;
      $: JQueryStatic;
      autorun(fc: Function) : void;
    }

    interface IEventsMap<T> {
      [event: string]: IEventHandler<T>;
    }

    interface IMeteorTemplate<T> {
      name: string;
      context: T;
      rendered?: () => void;
      created?: () => void;
      destroyed?: () => void;
    }

    interface IBlaze<T> extends Blaze.Template {
      data: T;
    }

    function register<T>(template: IMeteorTemplate<T>): void;
  }
}

declare module meteorts {

  interface IMeteorCallback<Returns> {
    (error: Meteor.Error, result: Returns): void;
  }

  class MeteorMethod<Args, Returns> {
    name: string;
    constructor(name: string);
    call(args: Args, callback?: IMeteorCallback<Returns>): void;
    apply(args: Args, callback?: IMeteorCallback<Returns>): void;
  }

  module MeteorMethod {
    interface Impl<Args, Returns> {
      apply(args: Args): Returns;
    }
    class BaseMixin {
      unblock(): void;
    }
    function register<Args, Returns>(method: MeteorMethod<Args, Returns>, impl: Impl<Args, Returns>): void;
  }

}

declare module meteorts {

  class RouteControllerBase<RouteParams> {
    protected ready: () => boolean;
    protected redirect: (route: string) => boolean;
    protected render: (name: string) => void;
    protected params: RouteParams;
  }

}
