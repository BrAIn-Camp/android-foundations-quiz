import { useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-kotlin';
import 'prismjs/components/prism-markup';

interface CodeSnippetProps {
  code: string;
  lang?: 'kotlin' | 'xml' | 'markup';
}

export default function CodeSnippet({ code, lang = 'kotlin' }: CodeSnippetProps) {
  const codeRef = useRef<HTMLElement>(null);
  const prismLang = lang === 'xml' ? 'markup' : lang;

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code, lang]);

  return (
    <div className="code-block">
      <div className="code-header">
        <span className="code-lang">{lang === 'markup' || lang === 'xml' ? 'Structure' : 'Kotlin'}</span>
        <span className="code-dots">
          <span /><span /><span />
        </span>
      </div>
      <pre className="code-pre">
        <code ref={codeRef} className={`language-${prismLang}`}>
          {code}
        </code>
      </pre>
    </div>
  );
}
