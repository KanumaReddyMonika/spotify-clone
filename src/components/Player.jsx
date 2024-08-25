import play from "../../public/play.png";
import back from "../../public/back.png";
import next from "../../public/next.png";
import volume from "../../public/volume.png";
import menu from "../../public/menu.png";
import pause from "../../public/pasue.png";
import "./Player.css";
import { useEffect, useRef, useState } from "react";

export default function Player({ song }) {
  console.log(song);
  const audioRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    // Update duration state when metadata is loaded
    const handleLoadedMetadata = () => {
      setDuration(audioRef.current?.duration);
    };

    // Update current time state when time updates
    const handleTimeUpdate = () => {
      setCurrentTime(audioRef.current?.currentTime);
    };

    audioRef.current?.addEventListener("loadedmetadata", handleLoadedMetadata);
    audioRef.current?.addEventListener("timeupdate", handleTimeUpdate);
  }, []);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleRangeChange = (event) => {
    const audio = audioRef.current;
    audio.currentTime = event.target.value;
    setCurrentTime(audio.currentTime);
  };

  return (
    <div className="player">
      {song && (
        <div className="player-container">
          <p className="title">{song?.name}</p>
          <p className="artist">{song?.artist}</p>
          <img
            className="cover-img"
            src={`https://cms.samespace.com/assets/${song?.cover}`}
          />
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleRangeChange}
            className="progress-bar"
          />
          <audio src={song.url} ref={audioRef}></audio>
          <div className="controls">
            <button>
              <img src={menu} alt="menu-button" />
            </button>
            <div className="main-controls">
              <button>
                <img src={back} alt="back-button" />
              </button>
              <button onClick={handlePlayPause}>
                {isPlaying ? (
                  <img src={pause} alt="pause-button" />
                ) : (
                  <img src={play} alt="play-button" />
                )}
              </button>

              <button>
                <img src={next} alt="next-button" />
              </button>
            </div>
            <img src={volume} alt="volume-button" />
          </div>
        </div>
      )}
    </div>
  );
}
