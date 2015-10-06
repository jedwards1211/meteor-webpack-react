//
// Definitions for the roles smart package
//
// https://atmosphere.meteor.com/package/roles
// https://github.com/alanning/meteor-roles
//
// Note: For all definitions below, "users" and "roles" params can be strings or arrays

/// <reference path="../meteor/meteor.d.ts"/>

interface RolesDAO {
  _id?: string;
  name?: string;
}

declare module Roles {
  function createRole(roleName: string): string;
  function deleteRole(roleName: string): void;
  function addUsersToRoles(users: any, roles: any): void;
  function removeUsersFromRoles(users: any, roles: any): void;
  function userIsInRole(user: any, roles: any): boolean;  //user can be user ID or user object
  function getRolesForUser(userId: string): string[];
  function getAllRoles(): Mongo.Cursor<RolesDAO>;
  function getUsersInRole(roleName: string): Mongo.Cursor<RolesDAO>;
}