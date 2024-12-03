import podcastHistory from '../data/StreamingHistorymusic.json';

export const parseSpotifyData = () => 
{
    const dataByDate = {}; 

    podcastHistory.forEach((entry) => 
    {
        const date = new Date(entry.endTime).toISOString().split('T')[0];        //YYYY-MM-DD format

        //if the date is not in the dataByDate object, initialize it
        if (!dataByDate[date]) 
            {
            dataByDate[date] = 
            {
                count: 0, //total number of songs played on this date
                tracks: {}, //tracks played on this date
            };
        }
        dataByDate[date].count++;

        //create a unique key for each track (track name + artist name)
        const trackKey = `${entry.trackName} - ${entry.artistName}`;

        //if the track is not in the tracks object, initialize 
        if (!dataByDate[date].tracks[trackKey]) 
        {
            dataByDate[date].tracks[trackKey] = 0;
        }

        dataByDate[date].tracks[trackKey]++;  //increment the count for this track
    });


    const result = [];
    for (const date in dataByDate)
    {
        const details = dataByDate[date];

        //get the top track for the date by sorting tracks
        let topTrack = null;
        let maxPlays = 0;
        for (const track in details.tracks) 
        {
            if (details.tracks[track] > maxPlays) 
            {
                maxPlays = details.tracks[track];
                topTrack = track;
            }
        }

        //add date, total count, and top track to the result array
        result.push({
            date: date,
            count: details.count,
            topTrack: topTrack,
        });
    }
    return result;
};
