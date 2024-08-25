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
  const [isPlaying, setIsPlaying] = useState(false);

  const [activeTab, setActiveTab] = useState("forYou")
  const [searchText, setSearchText] = useState("")

  const [filteredSongs, setFilteredSongs] = useState(null)


  useEffect(() => {
    const getSongs = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("https://cms.samespace.com/items/songs");

        if (!res.status) throw new Error("Enable to fetch the data");
        const data = await res.json();
        setFilteredSongs(data?.data);
        setSongs(data?.data)
      } catch (e) {
        console.error(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    getSongs();
  }, []);


  const getSearchedSongs = (songs) => {
    if(!searchText) return songs
    
    const searchedSongs = songs.filter(song => {
      const name = song?.name.toLocaleLowerCase()
      return name.includes(searchText.toLocaleLowerCase())
    })
    return searchedSongs
  }

  useEffect(() => {
    if(activeTab === "topTracks"){
      const topTracks = songs.filter(song => song.top_track)
      const searchedSongs = getSearchedSongs(topTracks)
      setFilteredSongs(searchedSongs)

    }else {
      const searchedSongs = getSearchedSongs(songs)
      setFilteredSongs(searchedSongs)
    }
    
  }, [activeTab, searchText])
  


  const handleOnClickSong = (song) => {
      setActiveSong(song)
      setIsPlaying(true)
  }

  const onNext = () => {
    const currentSongIndex = filteredSongs.findIndex(song => activeSong.id === song.id)
  
    if(currentSongIndex === filteredSongs.length - 1 || currentSongIndex === -1){
      setActiveSong(filteredSongs[0])
    } else {
      setActiveSong(filteredSongs[currentSongIndex + 1])
    }
  } 

  const onPrevious = () => {
    const currentSongIndex = filteredSongs.findIndex(song => activeSong.id === song.id)

    if(currentSongIndex === 0  || currentSongIndex === -1){
      setActiveSong(filteredSongs[filteredSongs.length - 1])
    } else {
      setActiveSong(filteredSongs[currentSongIndex - 1])
    }
  }

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
          <div className='main-player-container'>
          <Logo />
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} songs={filteredSongs} setActiveSong={handleOnClickSong} searchText={searchText} setSearchText={setSearchText}/>
          <Player key={activeSong?.id} isPlaying={isPlaying} setIsPlaying={setIsPlaying} song={activeSong} onNext={onNext} onPrevious={onPrevious} />
          </div>
        </>
      )}
    </div>
  );
}
