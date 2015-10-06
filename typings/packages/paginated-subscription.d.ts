/**
 https://github.com/tmeasday/meteor-paginated-subscription
 */
declare module Meteor {

	/*********************************************
	 * For "paginated-subscription smart package *
	 *********************************************/
	function subscribeWithPagination(collection:string, limit:number):{
		loaded(): number;
		limit(): number;
		ready(): boolean;
		loadNextPage(): void;
	};

}