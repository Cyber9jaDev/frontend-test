import { z } from 'zod';

// Comprehensive annotation type with validation
export const AnnotationSchema = z.object({
  id: z.string().uuid(),
  type: z.enum(['highlight', 'underline', 'comment', 'signature']),
  pageNumber: z.number().int().positive(),
  color: z.string().optional(),
  text: z.string().optional(),
  position: z.object({
    x: z.number(),
    y: z.number(),
    width: z.number(),
    height: z.number()
  }),
  createdAt: z.date()
});

export type Annotation = z.infer<typeof AnnotationSchema>;

// State for the entire application
export interface PDFAnnotatorState {
  file: File | null;
  annotations: Annotation[];
  currentTool: 'highlight' | 'underline' | 'comment' | 'signature' | null;
}