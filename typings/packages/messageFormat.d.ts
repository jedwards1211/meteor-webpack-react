declare	module msgfmt {
	var extractLogLevel : string;
	function init(language:string, options?: any): void;
	function setLocale(language: string): void;
}

declare module mfPkg {
	export var router : any;
	export var lang : string;
	export var native : string;

	interface Configuration {
		flowLayout?: string;
    flowTemplate?: string;
		flowRouterTrigger?: Function;
    flowMiddleware?: Function;
    ironRouteChange?: Function;

	}

	export function configureUI(config: Configuration) : void;
}


declare function mf(key: string, params?: any, translation?: string) : string;
