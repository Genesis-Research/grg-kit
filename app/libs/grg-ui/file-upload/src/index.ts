import { GrgFileUpload } from './lib/grg-file-upload';
import { GrgFileUploadTrigger } from './lib/grg-file-upload-trigger';
import { GrgFileUploadIcon } from './lib/grg-file-upload-icon';
import { GrgFileUploadLabel } from './lib/grg-file-upload-label';
import { GrgFileUploadDescription } from './lib/grg-file-upload-description';
import { GrgFileList } from './lib/grg-file-list';
import { GrgFileListItem } from './lib/grg-file-list-item';
import { GrgFileIcon } from './lib/grg-file-icon';
import { GrgFileInfo } from './lib/grg-file-info';
import { GrgFileName } from './lib/grg-file-name';
import { GrgFileSize, FileSizePipe } from './lib/grg-file-size';
import { GrgFileRemove } from './lib/grg-file-remove';

export * from './lib/grg-file-upload';
export * from './lib/grg-file-upload-trigger';
export * from './lib/grg-file-upload-icon';
export * from './lib/grg-file-upload-label';
export * from './lib/grg-file-upload-description';
export * from './lib/grg-file-list';
export * from './lib/grg-file-list-item';
export * from './lib/grg-file-icon';
export * from './lib/grg-file-info';
export * from './lib/grg-file-name';
export * from './lib/grg-file-size';
export * from './lib/grg-file-remove';

export const GrgFileUploadImports = [
	GrgFileUpload,
	GrgFileUploadTrigger,
	GrgFileUploadIcon,
	GrgFileUploadLabel,
	GrgFileUploadDescription,
	GrgFileList,
	GrgFileListItem,
	GrgFileIcon,
	GrgFileInfo,
	GrgFileName,
	GrgFileSize,
	GrgFileRemove,
	FileSizePipe,
] as const;
