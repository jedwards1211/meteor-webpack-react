declare function mf(code: string): string;

declare module Modules {
  export var Hugo: any;
}

declare var ReactMeteorData: any;

declare module Meteor {
  interface AsyncCallback { (error: Meteor.Error, result: any): void }
}

declare module marked {
  export function setOptions(options: Object): void;
}

declare function marked(text : string) : string;

declare module hljs {
  export function highlightAuto(code: string): { value: string };
}

// declare module AceEditor {
//   export function instance(name: string, options?: any, version?: number): AceAjax.IEditSession;
//   export function setUpPaths(version: number): void;
// }

declare module loopProtect {
  export function rewriteLoops(code: string): string;
  export function protect(state: any): void;
}

// declare module DiffViewSimple {
//   export function compare(code1: string, code2: string): string;
//   export function renderDelta(codeHistory: Hugo.Collections.ICodeHistoryDAO[], currentStepNumber: number, something: number): string;
// }

declare module DiffView {
  export function compare(
    previousStep: string,
    currentStep: string,
    previousText: string,
    currentText: string,
    something: string,
    other: number): string;
}

declare module PimPam {
  export function mimo(): void;
}

declare class JSZip {
  folder(name: string): any;
  generate(param: Object): any;
}

declare module WebApp {
  export var connectHandlers: any;
}

declare function Beautify(text: string): string;

declare module KeyboardJS {
  export function on(modifier: string, func: any): void;
}
