import { z } from 'zod';
import { musicianClassificationSchema } from './actions/categorise';

// Automatically infer TypeScript type from Zod schema
export type Classification = z.infer<typeof musicianClassificationSchema>; 