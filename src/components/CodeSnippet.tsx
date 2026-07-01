import { useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-kotlin';
import 'prismjs/components/prism-markup';

interface CodeSnippetProps {
  code: string;
  lang?: 'kotlin' | 'xml' | 'markup' | 'diagram';
}

export default function CodeSnippet({ code, lang = 'kotlin' }: CodeSnippetProps) {
  const codeRef = useRef<HTMLElement>(null);
  const isDiagram = lang === 'diagram';
  const prismLang = lang === 'xml' ? 'markup' : lang;

  useEffect(() => {
    if (codeRef.current && !isDiagram) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code, lang, isDiagram]);

  const headerLabel = isDiagram ? 'Relationship Diagram' : (lang === 'markup' || lang === 'xml') ? 'Structure' : 'Kotlin';

  return (
    <div className={`code-block ${isDiagram ? 'diagram-block' : ''}`}>
      <div className="code-header">
        <span className="code-lang">{isDiagram ? '🕸️ ' : ''}{headerLabel}</span>
        {!isDiagram && (
          <span className="code-dots">
            <span /><span /><span />
          </span>
        )}
      </div>
      <pre className="code-pre">
        {isDiagram ? (
          <code>{code}</code>
        ) : (
          <code ref={codeRef} className={`language-${prismLang}`}>
            {code}
          </code>
        )}
      </pre>
    </div>
  );
}
