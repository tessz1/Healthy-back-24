import React from "react";

interface VideoBlockProps {
  title: string;
  description: string;
  content: string;
}

const VideoBlock: React.FC<VideoBlockProps> = ({
  title,
  description,
  content,
}) => {
  return (
    <div className="bg-[#1e1e1e] p-4 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-2 sm:text-lg">{title}</h3>
      <p className="text-gray-400 mb-4 sm:text-sm">{description}</p>

      <div className="relative aspect-video overflow-hidden rounded-lg">
        <iframe
          src={content}
          className="absolute top-0 left-0 w-full h-full"
          frameBorder="0"
          allow="clipboard-write; autoplay"
          allowFullScreen
          title={title}
        ></iframe>
      </div>
    </div>
  );
};

export default VideoBlock;
