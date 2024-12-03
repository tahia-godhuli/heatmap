import React from "react";
import Heatmap from "./Heatmap";
import streamingData from "./data/StreamingHistorymusic.json";
import "./App.css";

function App() 
{
  const processData = () => 
    {
    return streamingData.map((entry) => ({
      date: entry.date,
      songs_played: entry.songs_played,  
      top_song: entry.track_name,
      artist: entry.artist_name,
    }));
  };

  const data = processData();

  return (
    <div className="App">
      <h1>My 2023 Spotify Listening Heatmap</h1>
      <Heatmap data={data} />
    </div>
  );
}

export default App;//lp
