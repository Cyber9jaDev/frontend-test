import { useDocumentContext } from "@/contexts/DocumentContext";
import { Tool } from "@/lib/types";

export function AnnotationToolbar() {
  const { state, dispatch } = useDocumentContext();
  const { activeTool, color } = state;

  const tools: { id: Tool; label: string; icon: string }[] = [
    { id: 'select', label: 'Select', icon: '🖱️' },
    { id: 'highlight', label: 'Highlight', icon: '🖍️' },
    { id: 'underline', label: 'Underline', icon: '⎁' },
    { id: 'comment', label: 'Comment', icon: '💬' },
    { id: 'signature', label: 'Signature', icon: '✍️' },
  ];

  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-gray-100 rounded-lg mb-4">
      {tools.map((tool) => (
        <button
          key={tool.id}
          onClick={() => dispatch({ type: 'SET_TOOL', payload: tool.id })}
          className={`flex items-center gap-2 px-4 py-2 rounded transition-colors ${
            activeTool === tool.id
              ? 'bg-blue-500 text-white'
              : 'bg-white hover:bg-gray-200'
          }`}
          title={tool.label}
        >
          <span>{tool.icon}</span>
          <span className="hidden md:inline">{tool.label}</span>
        </button>
      ))}

      <div className="flex items-center gap-2 ml-auto">
        <input
          type="color"
          value={color}
          onChange={(e) => dispatch({ type: 'SET_COLOR', payload: e.target.value })}
          className="w-8 h-8 cursor-pointer"
          title="Choose color"
        />
      </div>
    </div>
  );
}