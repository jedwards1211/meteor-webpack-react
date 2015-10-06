interface JQuery {
  form(formDefinition : any, options: any) : any;
  dropdown(...params: any[]): void;
  transition(name: string, duration: number, callback?: () => void) : any;
  sticky(options: any): any;
  search(options: Object) : any;
  modal(text: any) : JQuery;
  tab(): any;
  checkbox(): any;
  popup(): any;
  sidebar(...params: any[]): any;
}

interface JQueryStatic {
  semanticUiGrowl(text: string, params?: Object) : any;
}

/* tslint:disable */
interface sAlertStatic {
  success(message: string, options?: Object) : void;
  info(message: string, options?: Object) : void;
  error(message: string, options?: Object) : void;
  config(config: Object) : void;
}

declare var sAlert: sAlertStatic;
/* tslint:enable */
