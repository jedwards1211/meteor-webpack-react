// Definitions for the iron-router smart package
//
// https://atmosphere.meteor.com/package/iron-router
// https://github.com/EventedMind/iron-router

declare module Router {

    interface TemplateConfig {
        to?: string;
        waitOn?: boolean;
        data?: boolean;
    }

    interface TemplateConfigDico {[id:string]:TemplateConfig}

    interface GlobalConfig {
        load?: Function;
        autoRender?: boolean;
        layoutTemplate?: string;
        notFoundTemplate?: string;
        loadingTemplate?: string;
        waitOn?: any;
    }

    interface MapConfig {
        path?:string;
        // by default template is the route name, this field is the override
        template?:string;
        layoutTemplate?: string;
        yieldTemplates?: TemplateConfigDico;
        // can be a Function or an object literal {}
        data?: any;
        // waitOn can be a subscription handle, an array of subscription handles or a function that returns a subscription handle
        // or array of subscription handles. A subscription handle is what gets returned when you call Meteor.subscribe
        waitOn?: any;
        loadingTemplate?:string;
        notFoundTemplate?: string;
        controller?: RouteController;
        action?: Function;

        // The before and after hooks can be Functions or an array of Functions
        before?: any;
        after?: any;
        load?: Function;
        unload?: Function;
        reactive?: boolean;
    }

    interface HookOptions {
        except?: string[];
    }

    interface HookOptionsDico {[id:string]:HookOptions}

    // Deprecated:  for old "Router" smart package
    export function page():void;
    export function add(route:Object):void;
    export function to(path:string, ...args:any[]):void;
    export function filters(filtersMap:Object): any;
    export function filter(filterName:string, options?:Object): any;

    // These are for Iron-Router
    export function configure(config:GlobalConfig): any;
    export function plugin(name: string, ...params: any[]): void;
    export function map(func:Function):void;
    export function route(name:string, handler?: any, routeParams?:MapConfig): void;
    export function path(route:string, params?:Object):string;
    export function url(route:string):string;
    export function go(route:string, params?:Object):void;
    export function before(func: Function, options?: HookOptionsDico): void;
    export function after(func: Function, options?: HookOptionsDico): void;
    export function load(func: Function, options?: HookOptionsDico): void;
    export function unload(func: Function, options?: HookOptionsDico): void;
    export function render(template?: string, options?: TemplateConfigDico): void;
    export function wait(): void;
    export function stop(): void;
    export function redirect(route:string): void;
    export function current(): any;
    export function insert(options: any): any;
    export function start(): void;

    export function onRun(hook?: any, func?: Function, params?: any): void;
    export function onBeforeAction(hook?: any, func?: Function, params?: any): void;
    export function onBeforeAction(hook?: any, params?: any): void;
    export function onAfterAction(hook?: any, func?: Function, params?: any): void;
    export function onStop(hook?: any, params?: any): void;
    export function onData(hook?: any, params?: any): void;
    export function waitOn(hook?: string, func?: Function, params?: any): void;

    export var routes: Object;
    export var params: any;

}

interface RouteController {
    render(route:string): void;
    extend(routeParams: Router.MapConfig): RouteController;
}


declare var RouteController: RouteController;
