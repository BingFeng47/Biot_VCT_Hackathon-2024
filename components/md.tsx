// components/MarkdownRenderer.js
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  markdown: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ markdown }) => {
  return (
    <ReactMarkdown 
      remarkPlugins={[remarkGfm]} 
      children={markdown} 
    />
  );
};

export default MarkdownRenderer;