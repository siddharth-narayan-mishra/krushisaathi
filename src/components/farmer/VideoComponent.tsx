import React from "react";

interface VideoComponentProps {
  src: string;
}

const VideoComponent: React.FC<VideoComponentProps> = ({ src }) => {
  return (
    <iframe
      className="w-[302px] h-[170px] sm:w-[400px] sm:h-[225px] md:w-[621px] md:h-[350px]"
      src={src}
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="YouTube video"
    />
  );
};

export default VideoComponent;
