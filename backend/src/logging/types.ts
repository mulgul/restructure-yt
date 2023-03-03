// MIT License
//
// Copyright (c) 2023 github.com/mulgul

/**
 * The logform package exports `TransformableInfo` but it sets the
 * message type to `any`. Here we take that exact type and recreate it
 * to have more specific type info.
 */
export interface ITransformableInfo {
	level: string;
	message: string;
	[key: string]: string;
}

export type ISanitizedData = {
	[key: string]: unknown;
};
