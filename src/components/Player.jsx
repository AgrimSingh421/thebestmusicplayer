import React, { useEffect, useState } from "react";
import "./player.css";
import songs from "../songsAPI";
import { useParams, NavLink } from "react-router-dom";

const Player = () => {
  const params = useParams();

  const song = songs.find((s) => s.id === params.song_name);

  document.title = `${song.name} | ${song.artists}`;
  const [isPlaying, setIsPlaying] = useState(true);
  const [nextSong, setNextSong] = useState([]);
  const [previousSong, setPreviousSong] = useState([]);
  const [currentTime, setCurrentTime] = useState("00:00");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const nextSongIndex = song.index + 1;

    if (nextSongIndex <= 50) {
      const nextSongObject = songs.find((s) => s.index === nextSongIndex);
      setNextSong(nextSongObject);
    }

    const previousSongIndex = song.index - 1;

    if (previousSongIndex >= 1) {
      const previousSongObject = songs.find(
        (s) => s.index === previousSongIndex,
      );
      setPreviousSong(previousSongObject);
    }
  }, [song.index]);

  const playNextSong = () => {
    window.location.replace(nextSong.link);
  };

  const audioPlayer = document.getElementById("audioPlayer");

  const pauseSong = () => {
    audioPlayer.pause();
    setIsPlaying(false);
  };

  const playSong = () => {
    audioPlayer.play();
    setIsPlaying(true);
  };

  const startProgress = () => {
    audioPlayer.addEventListener("timeupdate", () => {
      const minute = Math.floor(audioPlayer.currentTime / 60);
      const second = Math.floor(audioPlayer.currentTime % 60);
      const formattedTime = `${minute < 10 ? "0" : ""}${minute}:${second < 10 ? "0" : ""}${second}`;
      setCurrentTime(formattedTime);

      const progressPercent =
        (audioPlayer.currentTime / audioPlayer.duration) * 100;
      setProgress(progressPercent);
    });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space") {
        if (e.target.matches("input, textarea")) return;
        e.preventDefault();
        if (isPlaying) {
          audioPlayer.pause();
          setIsPlaying(false);
        } else {
          audioPlayer.play();
          setIsPlaying(true);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown, false);

    return () => {
      window.removeEventListener("keydown", handleKeyDown, false);
    };
  }, [isPlaying, audioPlayer]);

  return (
    <>
      <div class="songPlayer_div">
        <div class="player">
          <img src={song.cover} alt="" class="cover" />
          <span className="name">
            <b>{song.name}</b> | {song.length}
          </span>
          <span class="artists">
            {song.artists} | <span className="album">{song.album}</span>
          </span>
          <audio
            src={song.song}
            autoPlay
            className="audioPlayer"
            onEnded={() => playNextSong()}
            id="audioPlayer"
            onPlay={() => (setIsPlaying(true), startProgress())}
            onPause={() => setIsPlaying(false)}
          ></audio>
          <div className="audioControls">
            <div className="audioProgress">
              <span className="currentTime">{currentTime}</span>
              <input
                type="range"
                value={progress}
                max={100}
                className="progressBar"
                onChange={(e) => {
                  const newTime = (e.target.value / 100) * audioPlayer.duration;
                  audioPlayer.currentTime = newTime;
                }}
              />
              <span className="totalTime">{song.length}</span>
            </div>
            <div className="otherControls">
              <NavLink
                to={previousSong.link}
                title={`Previous: ${previousSong.name}`}
              >
                <img
                  src="/img/previoussong.png"
                  alt="<"
                  className="controlButton"
                />
              </NavLink>
              <button
                className={isPlaying ? "pauseButton" : "pauseButton hidden"}
                onClick={() => pauseSong()}
                title="Pause"
              >
                <img
                  src="/img/pausesong.png"
                  alt="||"
                  className="controlButton"
                />
              </button>
              <button
                className={isPlaying ? "playButton hidden" : "playButton"}
                onClick={() => playSong()}
                title="Play"
              >
                <img
                  src="/img/playsong.png"
                  alt=">"
                  className="controlButton"
                />
              </button>
              <NavLink to={nextSong.link} title={`Next: ${nextSong.name}`}>
                <img
                  src="/img/previoussong.png"
                  alt=">"
                  className="controlButton"
                  style={{ transform: "rotate(180deg)" }}
                />
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <div className="songPlayer_div__mobile">
        <div className="thumbnailDiv__mobile">
          <img src={song.cover} alt="" className="thumbnail__mobile" />
        </div>
        <div className="songDetails__mobile">
          <div>
            <span className="name">{song.name}</span>
          </div>
          <div className="audioControls">
            <div className="audioProgress" style={{ padding: "0 5px" }}>
              <span className="currentTime">{currentTime}</span>
              <input
                type="range"
                value={progress}
                max={100}
                className="progressBar"
                onChange={(e) => {
                  const newTime = (e.target.value / 100) * audioPlayer.duration;
                  audioPlayer.currentTime = newTime;
                }}
                style={{ margin: "0 10px" }}
              />
              <span className="totalTime">{song.length}</span>
            </div>
            <div className="otherControls">
              <NavLink
                to={previousSong.link}
                title={`Previous: ${previousSong.name}`}
              >
                <img
                  src="/img/previoussong.png"
                  alt="<"
                  className="controlButton"
                />
              </NavLink>
              <button
                className={isPlaying ? "pauseButton" : "pauseButton hidden"}
                onClick={() => pauseSong()}
                title="Pause"
              >
                <img
                  src="/img/pausesong.png"
                  alt="||"
                  className="controlButton"
                />
              </button>
              <button
                className={isPlaying ? "playButton hidden" : "playButton"}
                onClick={() => playSong()}
                title="Play"
              >
                <img
                  src="/img/playsong.png"
                  alt=">"
                  className="controlButton"
                />
              </button>
              <NavLink to={nextSong.link} title={`Next: ${nextSong.name}`}>
                <img
                  src="/img/previoussong.png"
                  alt=">"
                  className="controlButton"
                  style={{ transform: "rotate(180deg)" }}
                />
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Player;
