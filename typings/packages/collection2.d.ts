/* tslint:disable */
declare module Mongo {
  interface Collection<T> {
    attachSchema(schema : any) : void;
  }
}

declare class SimpleSchema {
  constructor(schema : any);
}
