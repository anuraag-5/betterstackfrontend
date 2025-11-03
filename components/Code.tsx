import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark, atomDark, gruvboxDark, dark, solarizedDarkAtom, vscDarkPlus} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState } from "react";
import { Copy } from "lucide-react"; // optional icon lib

export default function CodeBlock({ language, code }: { language: string, code: string }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative rounded-lg overflow-hidden mt-5">
      <button
        onClick={copyToClipboard}
        className="absolute top-5 right-3 text-white px-2 py-1 text-sm rounded flex items-center gap-1"
      >
        <Copy size={14} />
      </button>

      <SyntaxHighlighter language={language} style={ vscDarkPlus } customStyle={{ borderRadius: 20 }}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
