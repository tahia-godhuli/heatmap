import React, { useState } from "react";
import "./Heatmap.css";

function Heatmap({ data }) 
{
  const [tooltip, setTooltip] = useState({ visible: false, content: "", x: 0, y: 0 });

  //12x31 grid for data
  const generateHeatmap = () => 
  {
    const heatmap = Array(12)
      .fill(null)
      .map(() => Array(31).fill(null));

    for (let i = 0; i < data.length; i++) 
    {
      const parts = data[i].date.split("-").map(Number); //split date into [year, month, day]
      const month = parts[1] - 1; //convert month to 0-based index
      const day = parts[2] - 1; //convert day to 0-based index

      heatmap[month][day] = 
      {
        songsPlayed: data[i].songs_played,
        topSong: data[i].top_song,
        artist: data[i].artist,
      };
    }

    return heatmap;
  };


//based on activity colos change
  const getColor = (count) => {
    if (count > 15) return "#196127"; //dark green
    if (count > 10) return "#239a3b"; //medium 
    if (count > 5) return "#7bc96f";  //light 
    if (count > 0) return "#c6e48b";  //while ish 
    return "#e0e0e0"; //gray if no activity
  };

  // Show tooltip
  const showTooltip = (event, content) => {
    const tooltipOffset = 10; //offset 4 tooltip positioning
    setTooltip({
      visible: true,
      content,
      x: event.pageX + tooltipOffset,
      y: event.pageY + tooltipOffset,
    });
  };

  const hideTooltip = () => setTooltip({ visible: false, content: "", x: 0, y: 0 });
  const heatmap = generateHeatmap();

  return (
    <div className="heatmap">
      {heatmap.map((month, monthIndex) => (
        <div key={monthIndex} className="month">
          <h3>{new Date(0, monthIndex).toLocaleString("default", { month: "long" })}</h3>
          <div className="days">
            {month.map((day, dayIndex) => {
              const dayData = day || { songsPlayed: 0, topSong: "No Data", artist: "N/A" };

              return (
                <div
                  key={dayIndex}
                  className="day"
                  style={{ backgroundColor: getColor(dayData.songsPlayed) }}
                  onMouseEnter={(e) =>
                    showTooltip(
                      e,
                      `Date: ${monthIndex + 1}/${dayIndex + 1}\nSongs Played: ${dayData.songsPlayed}\nTop Song: ${dayData.topSong}\nArtist: ${dayData.artist}`
                    )
                  }
                  onMouseLeave={hideTooltip}
                >
                  {dayIndex + 1} {/* Display day number */}
                </div>
              );
            })}
          </div>
        </div>
      ))}
      {tooltip.visible && (
        <div
          className="tooltip"
          style={{ top: tooltip.y, left: tooltip.x }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
}

export default Heatmap;
