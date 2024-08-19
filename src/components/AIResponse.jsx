import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

const AIResponse = ({ response, query }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    if (index < response.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText(response.slice(0, index + 1));
        setIndex(index + 1);
      }, 5); 

      return () => clearTimeout(timeoutId);
    }
  }, [index, response]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [displayedText]);

  return (
    <div
      className="bg-[#5363EE] rounded-lg p-6 mb-8 max-h-96  overflow-y-auto"
      ref={containerRef}
      style={{
        textAlign: 'left',
        maxWidth: '98%', 
        margin: '0 auto', 
        scrollbarWidth: 'none', 
        msOverflowStyle: 'none', 
      }}
    >
      <h2 className="text-xl bg-[#0A1015] p-4 rounded-lg text-center font-bold mb-4">{query}</h2>
      
      <h2 className="text-lg font-bold mb-4">PC Builder:</h2>
      <ReactMarkdown 
        className="whitespace-pre-wrap prose prose-invert max-w-none"
        components={{
          h1: ({node, ...props}) => <h1 className="text-2xl font-bold mt-4 mb-2" {...props} />,
          h2: ({node, ...props}) => <h2 className="text-xl font-bold mt-3 mb-2" {...props} />,
          h3: ({node, ...props}) => <h3 className="text-lg font-bold mt-2 mb-1" {...props} />,
          ul: ({node, ...props}) => <ul className="list-disc list-inside my-2" {...props} />,
          ol: ({node, ...props}) => <ol className="list-decimal list-inside my-2" {...props} />,
          li: ({node, ...props}) => <li className="my-1" {...props} />,
          p: ({node, ...props}) => <p className="my-2" {...props} />,
          strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
          em: ({node, ...props}) => <em className="italic" {...props} />,
        }}
      >
        {displayedText}
      </ReactMarkdown>
    </div>
  );
};

export default AIResponse;
