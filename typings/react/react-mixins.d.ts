declare module __ReactMixin {
  export function onClass(cls: Function, mixin: any): void;
}

declare module "react-mixin" {
    export default __ReactMixin;
}
