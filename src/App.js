import { useState } from "react";
import Player from "./components/Player";
import SongCard from "./components/SongCard";
import songs from "./songsAPI";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  useParams,
} from "react-router-dom";

function App() {
  const [query, setQuery] = useState("");

  const songSearch = (e) => {
    setQuery(e.target.value);
  };

  const filteredSongs = songs.filter((song) => {
    return song.name.toLowerCase().includes(query.toLowerCase());
  });

  const params = useParams();
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="searchFields">
                  <input
                    type="text"
                    placeholder="Search for any song"
                    value={query}
                    onChange={(e) => songSearch(e)}
                  />
                </div>
                <div className="allSongs" style={{ marginTop: "80px" }}>
                  {filteredSongs.length > 0 ? (
                    filteredSongs.map((song) => (
                      <NavLink to={song.link} className="songLink">
                        <SongCard
                          key={song.id}
                          id={song.id}
                          name={song.name}
                          album={song.album}
                          length={song.length}
                          artists={song.artists}
                          song={song.song}
                          link={song.link}
                          cover={song.cover}
                          index={song.index}
                        />
                      </NavLink>
                    ))
                  ) : (
                    <h2>No songs found</h2>
                  )}
                </div>
              </>
            }
          />
          <Route
            path="/songs/:song_name"
            element={
              <>
                <div className="searchFields2">
                  <input
                    type="text"
                    placeholder="Search for any song"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
                <div className="main_page">
                  <div className="songList">
                    {filteredSongs.map((song) => (
                      <NavLink
                        to={song.link}
                        className={
                          params.song_name === song.id
                            ? "songLink songSelected"
                            : "songLink"
                        }
                      >
                        <SongCard
                          key={song.id}
                          id={song.id}
                          name={song.name}
                          album={song.album}
                          length={song.length}
                          artists={song.artists}
                          song={song.song}
                          link={song.link}
                          cover={song.cover}
                          index={song.index}
                        />
                      </NavLink>
                    ))}
                  </div>
                  <div className="main_page_player">
                    <Player />
                  </div>
                </div>
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
