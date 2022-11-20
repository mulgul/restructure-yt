export interface IParsedMetadata {
	title: string;
	duration: number;
	uploadDate: string;
	views: number;
	thumbnail: string;
	formats: IFormat[];
}

export interface IFormat {
	format_id: string;
	manifest_url: string;
	ext: string;
	width: number | null;
	height: number | null;
	tbr: number;
	asr: number;
	fps: number | null;
	filesize: number;
	language: string | null;
	format_note: string;
	container: string;
	vcodec: string;
	acodec: string;
	url: string;
	fragment_based_url: string;
	fragments: IFragments[];
	protocol: string;
	format: string;
	http_headers: string[];
}

interface IFragments {
	path: string;
	duration: number;
}