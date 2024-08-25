import search from "../../public/search.png";
import "./Sidebar.css";
import SongListItem from "./SongListItem";

export default function Sidebar({ songs, setActiveSong, activeTab, setActiveTab, searchText, setSearchText }) {
  return (
    <div className="sidebar">
      <div className="sidebar-tabs">
      <button className={`tab-button ${activeTab === "forYou" ? 'active-tab': ''}`} onClick={()=> setActiveTab("forYou")}>
        <p className="active">For You</p>
      </button>
      <button className={`tab-button ${activeTab === "topTracks" ? 'active-tab': ''}`} onClick={()=> setActiveTab("topTracks")}>
        <p>Top Tracks</p>
      </button> 
      </div>
      <div className="search-input">
        <input value={searchText} onChange={e => setSearchText(e.target.value)} type="text" placeholder="Search song, Artist" />
        <img className="search-icon" src={search} />
      </div>
      <div className="song-list-view">
        {songs?.map((song) => (
          <SongListItem
            key={song.id}
            song={song}
            setActiveSong={setActiveSong}
          />
        ))}
      </div>
    </div>
  );
}
