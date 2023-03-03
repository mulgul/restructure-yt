// MIT License
//
// Copyright (c) 2023 github.com/mulgul

import { format } from 'winston';

export const timeStamp = format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' });
