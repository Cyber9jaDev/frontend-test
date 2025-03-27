import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-hot-toast';
import styles from "../styles/style.module.scss"
import { CloudUploadIcon } from './CloudUploadIcon';
import { useDocumentContext } from '@/contexts/DocumentContext';

export default function DocumentUpload() {
  const { dispatch } = useDocumentContext();

  const onDrop = useCallback((acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      if (file.type !== 'application/pdf') {
        toast.error('Please upload a valid PDF file');
        return;
      }

      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast.error('File size must be less than 10MB');
        return;
      }

      dispatch({ type: 'LOAD_DOCUMENT', payload: file });
      toast.success('Document loaded successfully');
    }, [dispatch]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf']  },
    maxFiles: 1,
    multiple: false,
    noClick: false,
    noKeyboard: false
  });

  return (
    <div 
      {...getRootProps()} 
      className={`${styles.uploadArea} ${ isDragActive ? styles.dragActive : '' }`} 
      aria-label="Document upload area" >

      <input {...getInputProps()} data-testid="file-input" />
      
      <div className={styles.uploadContent}>
        <CloudUploadIcon className={styles.uploadIcon} />
        {isDragActive ? ( <p>Drop the PDF here...</p> ) : (
          <>
            <p>Drag & drop a PDF here</p>
            <p className={styles.uploadSubtext}>or click to browse files</p>
            <p className={styles.uploadHint}>(Max size: 10MB, PDF only)</p>
          </>
        )}
      </div>
    </div>
  );
}
