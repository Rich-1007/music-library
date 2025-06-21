import React from "react";
// import { songs } from "../data/data";

const SongList = (songs) => {
  console.log(songs);

  function durationConverter(dur) {
    const min = String(Math.floor(dur / 60)).padStart(2, "0");
    const sec = String(dur % 60).padStart(2, "0");
    return `${min}:${sec}`;
  }

  return (
    <div className=" flex flex-col gap-2 w-full items-center">
      <div className="w-4/6 bg-[linear-gradient(270deg,_rgba(13,14,16,1)_19%,_rgba(79,35,40,1)_100%)]  px-7">
        <table className="w-full text-left text-sm text-gray-300 border-collapse">
          <thead className="border-b border-gray-500 text-gray-400">
            <tr>
              <th className="p-2">#</th>
              <th className="p-2">Image</th>
              <th className="p-2">Title</th>
              <th className="p-2">Artist</th>
              <th className="p-2">Duration</th>
            </tr>
          </thead>
          <tbody>
            {songs.map((item, index) => (
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
                <td className="p-2 font-semibold">{item.title}</td>
                <td className="p-2">{item.artist}</td>
                <td className="p-2">{durationConverter(item.duration)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SongList;
