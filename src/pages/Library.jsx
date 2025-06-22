import { useEffect, useReducer, useState } from "react";
import { songs } from "../data/data";
import { MdDeleteForever } from "react-icons/md";
import AddSongModal from "../components/AddSongModal";
import { songListReducer } from "../reducers/songListReducer";

const Library = () => {
    const [updateSong, dispatch] = useReducer(songListReducer, songs);

  const [userRole, setUserRole] = useState("admin");

  const [groupByValue, setGroupByValue] = useState("");
  const [sortByValue, setSortByValue] = useState("");

  const [groupField, setGroupField] = useState();
  const [allSongs, setAllSongs] = useState();
  const [groupByData, setGroupByData] = useState();
  const [allCheckBox, setAllCheckBox] = useState();
  const [isTrue, setIsTrue] = useState();

  const [selectedFilters, setSelectedFilters] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});

  const [filteredItems, setFilteredItems] = useState();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const selected = Object.keys(checkedItems).filter(
      (key) => checkedItems[key]
    );
    setSelectedFilters(selected);
  }, [checkedItems]);

  useEffect(() => {
    const filteredSongs = allSongs?.filter(
      (song) =>
        selectedFilters.includes(song.artist) ||
        selectedFilters.includes(song.year?.toString()) ||
        selectedFilters.includes(song.country) ||
        selectedFilters.includes(song.album)
    );
    setFilteredItems(filteredSongs);
    // console.log(filteredSongs);
  }, [selectedFilters, allSongs]);

  const handleFilterChange = (type, e) => {
    const { value, checked } = e.target;
    setCheckedItems((prev) => ({
      ...prev,
      [value]: checked,
    }));
  };

  const HandleFilterDone = () => {
    const selected = Object.keys(checkedItems).filter(
      (key) => checkedItems[key]
    );
    setSelectedFilters(selected);
    setIsTrue(false);
  };

  function durationConverter(dur) {
    const min = String(Math.floor(dur / 60)).padStart(2, "0");
    const sec = String(dur % 60).padStart(2, "0");
    return `${min}:${sec}`;
  }

  function HandleGroupBy(e) {
    setGroupField(e);
    setSortByValue("");
  }

  function groupSongsByAlbum() {
    return songs.reduce((acc, song) => {
      const album = song.album;
      if (!acc[album]) {
        acc[album] = [];
      }
      acc[album].push(song);
      return acc;
    }, {});
  }

  function groupSongsByArtist() {
    return songs.reduce((acc, song) => {
      const artist = song.artist;
      if (!acc[artist]) {
        acc[artist] = [];
      }
      acc[artist].push(song);
      return acc;
    }, {});
  }
  function sortSongsByYearDescending(songs) {
    return songs.slice().sort((a, b) => b.year - a.year);
  }

  function sortSongsByDurationAscending(songs) {
    return songs.slice().sort((a, b) => a.duration - b.duration);
  }

  function sortSongsByDurationDescending(songs) {
    return songs.slice().sort((a, b) => b.duration - a.duration);
  }

  function sortSongsByTitleAZ(songs) {
    return songs.slice().sort((a, b) => a.title.localeCompare(b.title));
  }

  function sortSongsByTitleZA(songs) {
    return songs
      .slice()
      .sort((a, b) =>
        b.title.toLowerCase().localeCompare(a.title.toLowerCase())
      );
  }

  function HandleSortBy(e) {
    setGroupField("");
    setGroupByValue("");

    if (e == "Year") {
      setAllSongs(sortSongsByYearDescending(songs));
    } else if (e == "Sort-Long") {
      setAllSongs(sortSongsByDurationAscending(songs));
    } else if (e == "Long-Sort") {
      setAllSongs(sortSongsByDurationDescending(songs));
    } else if (e == "A-Z") {
      setAllSongs(sortSongsByTitleAZ(songs));
    } else if (e == "Z-A") {
      setAllSongs(sortSongsByTitleZA(songs));
    }
  }

  useEffect(() => {
    console.log(groupField);

    if (groupField == "Artist") {
      const groupedByArtist = groupSongsByArtist();
      setGroupByData(groupedByArtist);

      console.log(groupedByArtist);
    } else if (groupField == "Album") {
      const groupedByAlbum = groupSongsByAlbum();
      setGroupByData(groupedByAlbum);
    }
  }, [groupField]);

  useEffect(() => {
    setAllSongs(songs);
  }, []);

   useEffect(() => {
    setAllSongs(updateSong);
  }, [updateSong]);

  useEffect(() => {
    const artists = [...new Set(allSongs?.map((song) => song.artist))];
    const years = [...new Set(allSongs?.map((song) => song.year))];
    const countries = [...new Set(allSongs?.map((song) => song.country))];
    // const albums = [...new Set(allSongs?.map((song) => song.album))];

    setAllCheckBox([...artists, ...years, ...countries]);
  }, [allSongs]);

  useEffect(() => {
    console.log(filteredItems);
  }, [filteredItems]);

  const handleClearAll = () => {
    setCheckedItems({});
    setSelectedFilters([]);
    setIsTrue(false);
    setGroupField("");
    setGroupByData(null);
    setAllSongs(songs);
    setGroupByValue("");
    setSortByValue("");
  };
  function handleAddSong() {
    setIsOpen((prev) => !prev);
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("currentuser: ", user);
    setUserRole(user?.role ?? "admin");
  }, []);


   function removeSong(title) {
    dispatch({
      type: "REMOVE_SONG",
      payload: { title }
    });

  }

  return (
    <>
      <div className="bg-[linear-gradient(190deg,_rgba(13,14,16,1)_19%,_rgba(79,35,40,1)_100%)] flex flex-col w-full min-h-screen items-center">
        <div className="pb-7 border-b border-gray-500 flex flex-wrap gap-3 md:gap-5 justify-between md:items-center md:justify-end bg-[linear-gradient(270deg,_rgba(13,14,16,1)_19%,_rgba(79,35,40,1)_100%)] shadow-md w-full md:w-4/6 px-4 md:px-5 py-3">
          {userRole == "admin" ? (
            <div>
              <button
                onClick={handleAddSong}
                className="text-xs bg-blue-700 text-white px-3 py-2 rounded hover:bg-blue-800 transition h-fit cursor-pointer"
              >
                Add Song
              </button>
            </div>
          ) : null}

          <AddSongModal dispatch={dispatch} updateSong={updateSong} isOpen={isOpen} setIsOpen={setIsOpen}/>

          <button
            onClick={handleClearAll}
            className="text-xs bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 transition h-fit cursor-pointer"
          >
            Clear All
          </button>

          <div>
            <label className="pr-2 text-sm text-gray-300 font-medium">
              Sort By
            </label>
            <select
              value={sortByValue}
              onChange={(e) => {
                setSortByValue(e.target.value);
                HandleSortBy(e.target.value);
              }}
              className="px-3 py-2 rounded-md bg-[#2a2a2a] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              <option value="Year">Year</option>
              <option value="Sort-Long">Sort-Long</option>
              <option value="Long-Sort">Long-Sort</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
            </select>
          </div>

          <div>
            <label className="text-sm pr-2 text-gray-300 font-medium">
              Group By
            </label>
            <select
              value={groupByValue}
              onChange={(e) => {
                setGroupByValue(e.target.value);
                HandleGroupBy(e.target.value);
              }}
              className="px-3 py-2 rounded-md bg-[#2a2a2a] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              <option value="Artist">Artist</option>
              <option value="Album">Album</option>
            </select>
          </div>

          <div className="relative">
            <div className="bg-[#2a2a2a] p-[0.53rem] rounded-md border border-gray-600 md:w-60 sm:w-64">
              <div className="flex justify-between items-center">
                <div
                  className="flex items-center gap-2 cursor-pointer w-full"
                  onClick={() => setIsTrue((prev) => !prev)}
                >
                  <label className="text-sm text-gray-300 font-medium">
                    Filter
                  </label>
                  <span className="text-sm text-white">
                    {isTrue ? "▲" : "▼"}
                  </span>
                </div>
                {isTrue && (
                  <button
                    onClick={HandleFilterDone}
                    className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition z-10 cursor-pointer"
                  >
                    Done
                  </button>
                )}
              </div>

              {isTrue && (
                <div className="mt-3 space-y-2 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700">
                  {allCheckBox?.map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={item}
                        value={item}
                        checked={checkedItems[item] || false}
                        onChange={(e) => handleFilterChange("artist", e)}
                        className="accent-blue-500"
                      />
                      <label htmlFor={item} className="text-gray-300 text-sm">
                        {item}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {groupField ? (
          <div className="w-4/6 bg-[linear-gradient(270deg,_rgba(13,14,16,1)_19%,_rgba(79,35,40,1)_100%)]  px-7 py-3">
            <span className="text-[#fff] font-bold">
              Grouped By {groupField}
            </span>
            <div className="w-full bg-[linear-gradient(270deg,_rgba(13,14,16,1)_19%,_rgba(79,35,40,1)_100%)]  px-7">
              <div>
                {groupByData &&
                  Object.entries(groupByData)?.map(([albumName, songs]) => (
                    <>
                      <span>{albumName}</span>

                      <div className="pb-8">
                        <table className="w-full text-left text-sm text-gray-300 border-collapse">
                          <thead className="border-b border-gray-500 text-gray-400">
                            <tr>
                              <th className="p-2 w-8">#</th>
                              <th className="p-2 w-16">Image</th>
                              <th className="p-2 w-64">Title</th>
                              <th className="p-2 w-48">Artist</th>
                              <th className="p-2 w-32">Duration</th>
                            </tr>
                          </thead>
                          <tbody>
                            {songs?.map((item, index) => (
                              <tr
                                key={index}
                                className="border-t border-[#302C2F] hover:bg-[#302C2F] cursor-pointer "
                              >
                                <td className="p-2">{index + 1}</td>
                                <td className="p-2">
                                  <img
                                    alt="img"
                                    src={item?.thumbnail}
                                    className="w-12 h-12 object-cover rounded bg-gray-700"
                                  />
                                </td>
                                <td className="p-2 font-semibold">
                                  {item.title}
                                </td>
                                <td className="p-2">{item.artist}</td>
                                <td className="p-2">
                                  {durationConverter(item.duration)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="md:w-4/6 bg-[linear-gradient(270deg,_rgba(13,14,16,1)_19%,_rgba(79,35,40,1)_100%)]  md:px-7 py-3">
            <table className="w-full text-left text-sm text-gray-300 border-collapse">
              <thead className="border-b border-gray-500 text-gray-400">
                <tr>
                  <th className="p-2">#</th>
                  <th className="p-2">Image</th>
                  <th className="p-2">Title</th>
                  <th className="p-2">Artist</th>
                  <th className="p-2">Duration</th>

                  {userRole == "admin" ? <th className="p-2">Remove</th> : null}
                </tr>
              </thead>
              <tbody>
                {filteredItems?.length > 0
                  ? filteredItems.map((item, index) => (
                      <tr
                        key={index}
                        className="border-t border-[#302C2F] hover:bg-[#302C2F] cursor-pointer"
                      >
                        <td className="p-2">{index + 1}</td>
                        <td className="p-2">
                          <img
                            alt="img"
                            src={item?.thumbnail}
                            className="w-12 h-12 object-cover rounded bg-gray-700"
                          />
                        </td>
                        <td className="p-2 font-semibold">
                          <p>{item.title}</p>
                          <p className="font-thin text-[0.6rem] text-gray-200">
                            {item.year}
                          </p>
                        </td>
                        <td className="p-2">{item.artist}</td>
                        <td className="p-2">
                          {durationConverter(item.duration)}
                        </td>
                      </tr>
                    ))
                  : allSongs?.map((item, index) => (
                      <tr
                        key={index}
                        className="border-t border-[#302C2F] hover:bg-[#302C2F] cursor-pointer"
                      >
                        <td className="p-2">{index + 1}</td>
                        <td className="p-2">
                          <img
                            alt="img"
                            src={item?.thumbnail}
                            className="w-12 h-12 object-cover rounded bg-gray-700"
                          />
                        </td>
                        <td className="p-2 font-semibold">
                          <p>{item.title}</p>
                          <p className="font-thin text-[0.6rem] text-gray-200">
                            {item.year}
                          </p>
                        </td>
                        <td className="p-2">{item.artist}</td>
                        <td className="p-2">
                          {durationConverter(item.duration)}
                        </td>
                        {userRole == "admin" ? (
                          <td className="p-2 " onClick={() => removeSong(item.title)}>
                            <MdDeleteForever size={28} />
                          </td>
                        ) : null}
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default Library;
