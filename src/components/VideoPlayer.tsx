import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Video } from '../types/video';

interface VideoPlayerProps {
  video: Video;
  onClose: () => void;
}

export default function VideoPlayer({ video, onClose }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-fadeIn">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2 bg-gray-800/80 hover:bg-gray-700 rounded-full transition-colors duration-200 group"
        aria-label="Close video player"
      >
        <X className="w-6 h-6 text-white group-hover:text-red-400 transition-colors" />
      </button>

      <div className="w-full max-w-6xl">
        <h2 className="text-white text-2xl font-bold mb-4 text-center">
          {video.title}
        </h2>

        <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
          <video
            ref={videoRef}
            className="w-full h-full"
            controls
            controlsList="nodownload"
            autoPlay
            src={video.url}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
}
