/// Definitions for the collectionFS smart package
///
/// https://atmosphere.meteor.com/package/collectionFS
/// https://github.com/CollectionFS/Meteor-CollectionFS

/// <reference path='meteor.d.ts'/>
/// <reference path='node.d.ts'/>

declare function CollectionFS<T>(name:string, options?: CollectionFS.CollectionFSOptions): void;

interface CollectionFS<T> {
  ObjectID(hexString?: any): Object;
  find(selector?: any, options?: any): Mongo.Cursor<T>;
  findOne(selector?:any, options?:any):T;
  insert(doc:T, callback?:Function):string;
  update(selector: any, modifier: any, options?: {multi?: boolean; upsert?: boolean;}, callback?:Function): number;
  upsert(selector: any, modifier: any, options?: {multi?: boolean;}, callback?:Function): {numberAffected?: number; insertedId?: string;}
  remove(selector: any, callback?:Function):number;
  allow(options:Mongo.AllowDenyOptions): boolean;
  deny(options:Mongo.AllowDenyOptions): boolean;
  fileHandlers(handlers: CollectionFS.FileHandlers): void;
  filter(options: CollectionFS.FilterOptions): void;
  fileIsAllowed(options: any): boolean;
  events(events:any): void;
  dispatch(...args: string[]): void;

  // Client API
  storeFile(file: File, metadata?: {}): string;
  storeFiles(files: File[], metadata: {}, callback?: (file: File, fileID: string) => void): {}[];
  retrieveBlob(fileId: string, callback: (fileItem: CollectionFS.FileItem) => void):any;
  acceptDrops(templateName: string, selector: string, metadata?: {}, callback?: (file: File, fileID: string) => void): void;

  // Server API
  storeBuffer(fileName: string, buffer: IBuffer, options: CollectionFS.StoreBufferOptions): string;
  retrieveBuffer(fileId: string): IBuffer;
}

declare module CollectionFS{
  interface FileHandlers {
    [id: string]: (options: CollectionFS.FileHandlerOptions) => any;
  }

  interface CollectionFSOptions {
    autopublish:boolean;
    maxFileHandlers: number;
  }

  interface FilterOptions {
    allow?: {
      extensions?: string[];
      contentTypes?: string[];
    };
    deny?: {
      extensions?: string[];
      contentTypes?: string[];
    };
    maxSize?: number;
  }

  interface FileItem {
    _id: string;
    countChunks: number;
    length: number;
    file?: any;
    blob?: IBuffer;
  }

  interface StoreBufferOptions {
    contentType?: string;
    owner?: string;
    noProgress?: boolean;
    metaData?: {};
    encoding?: string;
  }

  interface FileRecord {
    chunkSize?: number; // Default 256kb ~ 262.144 bytes
    uploadDate?: number;  // Client set date
    handledAt?: number;          // datetime set by Server when handled
    fileHandler?:{};           // fileHandler supplied data if any
    md5?: any;               // Not yet implemented
    complete?: boolean;         // countChunks == numChunks
    currentChunk?: number;         // Used to coordinate clients
    owner?: string;
    countChunks?: number; // Expected number of chunks
    numChunks?: number;             // number of chunks in database
    filename?: string;     // Original filename
    length?: string;     // Issue in Meteor
    contentType?: string;
    encoding?: string;       // Default 'utf-8'
    metadata?: {}
  }

  interface FileHandlerOptions {
    blob: IBuffer;              // Type of node.js Buffer()
    fileRecord: FileRecord;
    destination: (extension?:string) => {serverFilename: Destination};
    sumFailes: number;
  }

  interface Destination {
    serverFilename: string;
    fileDate: {
      url: string;
      extension: string;
    }
  }
}

//Copied from node.d.ts since node.d.ts was giving me compile errors for overloading some signatures
interface IBuffer extends NodeBuffer {
  new (str: string, encoding?: string): NodeBuffer;
  new (size: number): NodeBuffer;
  new (array: any[]): NodeBuffer;
  prototype: NodeBuffer;
  isBuffer(obj: any): boolean;
  byteLength(string: string, encoding?: string): number;
  concat    (list: NodeBuffer[], totalLength?: number): NodeBuffer;
}

//Code below this point is for the devel branch that should be compatible with Meteor 0.8.x
declare module FS {
  function Collection<T>(name:string, options?: FS.CollectionOptions):any;

  interface Collection<T> {
    ObjectID(hexString?: any): Object;
    find(selector?: any, options?:any): Mongo.Cursor<T>;
    findOne(selector?:any, options?:any):T;
    insert(doc:T, callback?:Function):string;
    update(selector: any, modifier: any, options?: {multi?: boolean; upsert?: boolean;}, callback?:Function): number;
    upsert(selector: any, modifier: any, options?: {multi?: boolean;}, callback?:Function): {numberAffected?: number; insertedId?: string;}
    remove(selector: any, callback?:Function):number;
    allow(options:Mongo.AllowDenyOptions): boolean;
    deny(options:Mongo.AllowDenyOptions): boolean;
    fileHandlers(handlers: CollectionFS.FileHandlers): void;
    filter(options: CollectionFS.FilterOptions): void;
    fileIsAllowed(options: any): boolean;
    events(events:any): void;
    dispatch(...args: string[]): void;

    // Client API
    storeFile(file: File, metadata?: {}): string;
    storeFiles(files: File[], metadata: {}, callback?: (file: File, fileID: string) => void): {}[];
    retrieveBlob(fileId: string, callback: (fileItem: CollectionFS.FileItem) => void):any;
    acceptDrops(templateName: string, selector: string, metadata?: {}, callback?: (file: File, fileID: string) => void): void;

    // Server API
    storeBuffer(fileName: string, buffer: IBuffer, options: CollectionFS.StoreBufferOptions): string;
    retrieveBuffer(fileId: string): IBuffer;
  }

  interface CollectionOptions {
    autopublish:boolean;
    maxFileHandlers: number;
  }

  interface Store {
    FileSystem(name: string, options?: {path: string;}):any;
  }
}