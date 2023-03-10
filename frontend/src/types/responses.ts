// MIT License
//
// Copyright (c) 2023 github.com/mulgul

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
	abr: number;
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
	quality: number;
	audio_ext: string;
}

interface IFragments {
	path: string;
	duration: number;
}

export interface IEventPayload {
	status: string;
	percent: string;
	eta: string;
}
