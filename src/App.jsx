import "./App.css";
import { useEffect } from "react";
import { useState } from "react";
import Logo from "./components/Logo";
import Sidebar from "./components/Sidebar";
import Player from "./components/Player";

export default function App() {
  const [songs, setSongs] = useState(null);
  const [activeSong, setActiveSong] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getSongs = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("https://cms.samespace.com/items/songs");

        if (!res.status) throw new Error("Enable to fetch the data");
        const data = await res.json();
        setSongs(data?.data);
      } catch (e) {
        console.error(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    getSongs();
  }, []);

  return (
    <div
      className="player-contianer"
      style={{
        background: `linear-gradient(to right, ${
          activeSong ? activeSong.accent : "#331E00"
        }, #000)`,
      }}
    >
      {isLoading && <h1>Loading...</h1>}
      {!isLoading && (
        <>
          <Logo />
          <Sidebar songs={songs} setActiveSong={setActiveSong} />
          <Player song={activeSong} />
        </>
      )}
    </div>
  );
}
