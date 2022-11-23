interface IFragments {
	path: string;
	duration: number;
}

export type IAvailableFormats = string[];

export interface IParsedMetadata {
	title: string;
	channel: string;
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
	abr: number;
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
	http_headers: Record<string, string>;
	downloader_options: { http_chunk_size: number };
}

export interface IMetadata {
	abr: number;
	acodec: string;
	age_limit: number;
	average_rating: number | null;
	categories: string[];
	channel: string;
	channel_id: string;
	channel_url: string;
	description: string;
	display_id: string;
	duration: number;
	ext: string;
	extractor: string;
	extractor_key: string;
	format: string;
	format_id: string;
	formats: IFormat[];
	fps: number;
	fulltitle: string;
	height: number;
	id: string;
	is_live: boolean | null;
	playlist: string | null;
	playlist_index: number | null;
	requested_formats: IFormat[];
	requested_subtitles: string[] | null;
	resolution: number | null;
	stretched_ratio: number | null;
	tags: [];
	thumbnail: string;
	thumbnails: string[];
	title: string;
	upload_date: string;
	uploader: string;
	uploader_id: string;
	uploader_url: string;
	vbr: number | string | null;
	vcodec: string;
	view_count: number;
	webpage_url: string;
	webpage_url_basename: string;
	width: number;
	_filename: string;
}
