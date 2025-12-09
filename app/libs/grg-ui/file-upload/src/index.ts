import { GrgFileUpload, FileSizePipe } from './lib/grg-file-upload';

export {
	GrgFileUpload,
	FileSizePipe,
	getFileIconVariant,
	fileUploadVariants,
	type FileValidationError,
	type FileIconVariant,
	type FileUploadVariants,
	type FileUploadSize,
} from './lib/grg-file-upload';

export const GrgFileUploadImports = [GrgFileUpload, FileSizePipe] as const;
