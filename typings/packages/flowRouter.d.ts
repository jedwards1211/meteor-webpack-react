interface FlowRouterRouteParameters {
	name?: string;
	subscriptions?: Function;
	action?: Function;
	middlewares?: any[];
	triggersEnter?: any[];
	triggersExit?: any[];
}

interface FlowRouterRoute {
	path: string;
	params: Object;
	queryParams: Object;
	route: { name:string };
}

interface FlowRouterGroupParams {
	prefix?: string;
	action?: Function;
	middlewares?: any[];
	subscriptions?: Function;
	triggersEnter?: any[];
	triggersExit?: any[];
}

interface FlowRouterGroup {
	route(routeUrl: string, routeParameters: FlowRouterRouteParameters) : void
}

interface FlowRouterStatic {
	route(routeUrl: string, routeParameters: FlowRouterRouteParameters) : void
	notFound : FlowRouterRouteParameters
	path(routeName : string, routeParams?: Object, queryParams?: Object) : string;
	getParam(paramName : string) : string;
	getQueryParam(paramName : string) : string;
	go(routeName : string, routeParams?: Object, queryParams?: Object) : string;
	setParams(newParams : Object) : void;
	setQueryParams(newParams : Object) : void;
	getRouteName() : string;
	current(): FlowRouterRoute;
	watchPathChange(): void;
	group(params: FlowRouterGroupParams): FlowRouterGroup;
	subsReady(subscription?: string) : boolean;
	initialize(): any;
}

declare var FlowRouter : FlowRouterStatic


interface BlazeLayoutStatic {
	render(layoutName: string, templates: Object) : void;
}

declare var BlazeLayout : BlazeLayoutStatic;
