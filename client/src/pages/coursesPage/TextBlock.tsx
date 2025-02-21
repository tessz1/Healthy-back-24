import React from "react";

interface TextBlockProps {
  title: string;
  description: string;
  content: string;
}

const TextBlock: React.FC<TextBlockProps> = ({ title, description, content }) => {
  return (
    <div className="bg-[#1e1e1e] p-4 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 mb-4">{description}</p>
      <p className="text-gray-300">{content}</p>
    </div>
  );
};

export default TextBlock;