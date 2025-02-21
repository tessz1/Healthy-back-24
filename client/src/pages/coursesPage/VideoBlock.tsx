import React from "react";

interface VideoBlockProps {
  title: string;
  description: string;
  content: string;
}

const VideoBlock: React.FC<VideoBlockProps> = ({ title, description, content }) => {
  return (
    <div className="bg-[#1e1e1e] p-4 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 mb-4">{description}</p>
      <div className="aspect-video">
        <iframe
          src={content}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full rounded-md"
        />
      </div>
    </div>
  );
};

export default VideoBlock;