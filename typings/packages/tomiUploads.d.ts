declare module Tomi.Uploads {
	interface FileInfo {
		name: string;
		path: string;
	  size: number;
	  type: string;
		validate(): boolean;
		safeName(): string;
	}
}

interface UploaderStatic {
	finished(index: number, file: Tomi.Uploads.FileInfo, templateContext: any): void;
}

declare var Uploader: UploaderStatic;

interface UploadServerStatic {

	init(config: {
		tmpDir?: string,
		uploadDir?: string,
		checkCreateDirectories?: boolean,
		getFileName?: Function
	}) : void;

	delete(file: string): void;
}

declare var UploadServer : UploadServerStatic;

// declare var process : any;
