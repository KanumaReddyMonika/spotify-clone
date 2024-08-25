import "./SongListItem.css";

export default function SongListItem({ song, setActiveSong }) {
  return (
    <div onClick={() => setActiveSong(song)} className="song-list-item">
      <img src={`https://cms.samespace.com/assets/${song.cover}`} />
      <div>
        <p className="song-title">{song.name}</p>
        <p className="song-artist">{song.artist}</p>
      </div>
      <p className="song-duration">4:56</p>
    </div>
  );
}
