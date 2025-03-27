"use client";

import { Annotation, Tool } from "@/lib/types";
import { createContext, Dispatch, ReactNode, useContext, useReducer } from "react";

type DocumentState = {
  file: File | null;
  pdfUrl: string | null;
  annotations: Annotation[];
  activeTool: Tool;
  color: string;
};

type DocumentAction = 
  | { type: 'LOAD_DOCUMENT'; payload: File }
  | { type: 'CLEAR_DOCUMENT' }
  | { type: 'ADD_ANNOTATION'; payload: Annotation }
  | { type: 'SET_TOOL'; payload: Tool }
  | { type: 'SET_COLOR'; payload: string };

  const initialState: DocumentState = {
    file: null,
    pdfUrl: null,
    annotations: [],
    activeTool: 'select',
    color: '#FFFF00',
  };

  const reducer = (state: DocumentState, action: DocumentAction): DocumentState => {
    switch (action.type) {
      case 'LOAD_DOCUMENT':
        return {
          ...initialState,
          file: action.payload,
          pdfUrl: URL.createObjectURL(action.payload),
        };
      case 'CLEAR_DOCUMENT':
        return initialState;
      case 'ADD_ANNOTATION':
        return {
          ...state,
          annotations: [...state.annotations, action.payload],
        };
      case 'SET_TOOL':
        return { ...state, activeTool: action.payload };
      case 'SET_COLOR':
        return { ...state, color: action.payload };
      default:
        return state;
    }
  };
  

const DocumentContext = createContext<{
  state: DocumentState, 
  dispatch: Dispatch<DocumentAction>
}>({
  state: initialState,
  dispatch: () => null
})


export const DocumentProvider = ({ children }: { children: ReactNode}) => {
  const [ state, dispatch ] = useReducer(reducer, initialState);

  return(
    <DocumentContext.Provider value={{ state, dispatch }}>
      { children }
    </DocumentContext.Provider>
  )
}


export const useDocumentContext = () => {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error('useDocumentContext must be used within a DocumentProvider');
  }
  return context;
}