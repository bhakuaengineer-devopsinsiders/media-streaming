import { useState } from 'react';
import { LogOut, Play } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Video } from '../types/video';
import VideoPlayer from './VideoPlayer';

const SAMPLE_VIDEOS: Video[] = [
  {
    title: "Dhurandar 2",
    url: "https://bhakuavdostg.blob.core.windows.net/movies/dhurandar2.mp4",
    thumbnail: "https://bhakuavdostg.blob.core.windows.net/movies/thumbnail.jpg"
  }
];

export default function VideoLibrary() {
  const { logout } = useAuth();
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [videos] = useState<Video[]>(SAMPLE_VIDEOS);

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
  };

  const handleClosePlayer = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <header className="bg-black/50 backdrop-blur-md border-b border-gray-800 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Play className="w-6 h-6 text-white fill-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Video Library</h1>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 font-medium"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Popular Videos</h2>
          <p className="text-gray-400">Watch your favorite content</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video, index) => (
            <div
              key={index}
              onClick={() => handleVideoClick(video)}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
            >
              <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-800 shadow-lg">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-blue-600/90 backdrop-blur-sm p-4 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300">
                      <Play className="w-8 h-8 text-white fill-white" />
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                  <h3 className="text-white font-semibold text-lg line-clamp-2">
                    {video.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {videos.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No videos available</p>
          </div>
        )}
      </main>

      {selectedVideo && (
        <VideoPlayer video={selectedVideo} onClose={handleClosePlayer} />
      )}
    </div>
  );
}
