import { useState, useMemo } from 'react';
import { songs as songData } from '../data/data';

const groupByOptions = ['album', 'artist', 'country', 'year'];
const sortOptions = ['title', 'duration', 'year'];

export default function LibraryCopy() {
  const [filter, setFilter] = useState('');
  const [groupBy, setGroupBy] = useState('');
  const [sortBy, setSortBy] = useState('');

  const handleClearAll = () => {
    setFilter('');
    setGroupBy('');
    setSortBy('');
  };

  const filteredSongs = useMemo(() => {
    let result = [...songData];
    if (filter) {
      result = result.filter((song) =>
        song.title.toLowerCase().includes(filter.toLowerCase())
      );
    }
    if (sortBy) {
      result.sort((a, b) => {
        if (typeof a[sortBy] === 'string') {
          return a[sortBy].localeCompare(b[sortBy]);
        }
        return a[sortBy] - b[sortBy];
      });
    }
    return result;
  }, [filter, sortBy]);

  const groupedSongs = useMemo(() => {
    if (!groupBy) return { All: filteredSongs };
    return filteredSongs.reduce((acc, song) => {
      const key = song[groupBy];
      if (!acc[key]) acc[key] = [];
      acc[key].push(song);
      return acc;
    }, {});
  }, [filteredSongs, groupBy]);

  return (
    <div className="p-4 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">🎵 Song Library</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center items-center">
        <input
          type="text"
          placeholder="Filter by title..."
          className="p-2 rounded text-black"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />

        <select
          className="p-2 rounded text-black"
          value={groupBy}
          onChange={(e) => setGroupBy(e.target.value)}
        >
          <option value="">Group By</option>
          {groupByOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>

        <select
          className="p-2 rounded text-black"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sort By</option>
          {sortOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>

        <button
          onClick={handleClearAll}
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-8">
        {Object.entries(groupedSongs).map(([group, songs]) => (
          <div key={group}>
            {groupBy && (
              <h2 className="text-2xl font-semibold mb-4 border-b border-gray-600 pb-1">
                {group}
              </h2>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {songs.map((song, index) => (
                <div
                  key={index}
                  className="bg-gray-800 rounded-lg p-4 flex items-center gap-4 shadow"
                >
                  <img
                    src={song.thumbnail}
                    alt={song.title}
                    className="w-20 h-20 rounded"
                  />
                  <div>
                    <p className="text-xl font-medium">{song.title}</p>
                    <p className="text-sm">{song.artist} • {song.album}</p>
                    <p className="text-sm">{song.country} • {song.year}</p>
                    <p className="text-sm">Duration: {song.duration}s</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
