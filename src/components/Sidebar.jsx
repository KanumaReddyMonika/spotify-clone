import search from "../../public/search.png";
import "./Sidebar.css";
import SongListItem from "./SongListItem";

export default function Sidebar({ songs, setActiveSong }) {
  return (
    <div className="sidebar">
      <div className="sidebar-tabs">
        <p className="active">For you</p>
        <p>Top Tracks</p>
      </div>
      <div className="search-input">
        <input type="text" placeholder="Search song, Artist" />
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
