/// Definitions for the googlemaps smart package
///
/// https://atmosphere.meteor.com/package/googlemaps
/// https://github.com/drewjw81/meteor-googlemaps


declare module GoogleMaps {
  function init(parameters: {[id: string]: any}, callback: () => void): void;
}
