export type Tool = 'select'| 'highlight'| 'underline'| 'comment'| 'signature';

export interface BaseAnnotation {
  id: string;
  type: Tool;
  pageIndex: number;
  color?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  text?: string;
  createdAt: Date;
}

export interface PDFPosition {
  pageIndex: number;
  x: number;
  y: number;
}

export interface Annotation extends BaseAnnotation {
  type: Tool;
}

export interface DocumentUploadProps {
  onUploadStart?: () => void;
  onUploadSuccess?: (file: File) => void;
  onUploadError?: (error: string) => void;
}

export interface Position {
  type?: Tool,
  pageIndex: number;
  x: number;
  y: number;
  width?: number;
  height?: number;
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
  color?: string;
  text?: string;
  imageData?: string;
}

export type AddAnnotationFn = (annotation: Omit<BaseAnnotation, 'id' | 'createdAt'>) => void;