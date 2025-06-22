import { useState } from "react";
import { RxCross1 } from "react-icons/rx";

const AddSongModal = ({ isOpen, setIsOpen, updateSong, dispatch }) => {
  const demoThumbnail = [
    "https://c.saavncdn.com/358/Sad-Lofi-Hindi-2024-20240206233149-500x500.jpg",
    "https://c.saavncdn.com/033/Iktara-Lofi-Flip--Hindi-2021-20210630194407-500x500.jpg",
    "https://c.saavncdn.com/927/AUDIO-English-2022-20230104085543-500x500.jpg",
    "https://c.saavncdn.com/015/Piel-English-2019-20190406013740-500x500.jpg",
    "https://c.saavncdn.com/681/Let-Me-Down-Slowly-English-2018-20190607042218-500x500.jpg",
    "https://c.saavncdn.com/070/Logic-English-2008-20180709162916-500x500.jpg",
    "https://c.saavncdn.com/810/Neural-Network-Unknown-2023-20230707050039-500x500.jpg",
  ];
  const [formData, setFormData] = useState({
    title: "",
    album: "",
    artist: "",
    country: "",
    duration: "",
    year: "",
    thumbnail: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleDone = () => {
    const songData = {
      ...formData,
      duration: parseInt(formData.duration * 60),
      thumbnail:
        demoThumbnail[Math.floor(Math.random() * demoThumbnail.length)],
    };

    console.log(songData);

    dispatch({
      type: "ADD_SONG",
      payload: { ...songData },
    });
    setIsOpen(false);
  };

  return (
    <>
      {isOpen ? (
        <div className=" fixed inset-0 z-20 flex items-center justify-center">
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg shadow-lg px-6">
            <div className="flex items-center justify-between pb-8 text-amber-50">
              <p>Add Song</p>
              <RxCross1
                size={20}
                onClick={() => setIsOpen(false)}
                className="cursor-pointer"
              />
            </div>

            <div className="space-y-4">
              <div className="flex md:flex-row gap-3 flex-col">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium  text-amber-50"
                  >
                    Title
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    id="title"
                    placeholder="Enter song title"
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="year"
                    className="block text-sm font-medium  text-amber-50"
                  >
                    Release Year
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    id="year"
                    placeholder="Enter release year"
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="flex md:flex-row gap-3 flex-col">
                <div>
                  <label
                    htmlFor="artist"
                    className="block text-sm font-medium  text-amber-50"
                  >
                    Artist Name
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    id="artist"
                    placeholder="Enter artist name"
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="duration"
                    className="block text-sm font-medium  text-amber-50"
                  >
                    Duration
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    id="duration"
                    placeholder="Enter duration"
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="flex md:flex-row gap-3 flex-col">
                <div>
                  <label
                    htmlFor="Country"
                    className="block text-sm font-medium  text-amber-50"
                  >
                    Country
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    id="Country"
                    placeholder="Enter Origin Country"
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="Album"
                    className="block text-sm font-medium  text-amber-50"
                  >
                    Album
                  </label>
                  <input
                    onChange={handleChange}
                    type="text"
                    id="Album"
                    placeholder="Enter Album Name"
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
            <div className="w-full pt-6 pb-2 flex justify-end">
              <button
                onClick={handleDone}
                className="text-md bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition z-10 cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default AddSongModal;
