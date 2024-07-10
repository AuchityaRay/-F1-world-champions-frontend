import React, { useState } from "react";
import Skeleton from "./Skeleton";

const ITEMS_PER_PAGE = 10;

function RaceWinners({ year, raceWinners, champions, loading }) {
  const [currentPage, setCurrentPage] = useState(1);

  const champion = champions.find((champion) => champion.year === year);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentRaceWinners = raceWinners.slice(startIndex, endIndex);

  const totalPages = Math.ceil(raceWinners.length / ITEMS_PER_PAGE);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  if (loading) {
    return (
      <div className="flex flex-col space-y-3">
        <h2 className="text-xl font-semibold mt-4 mb-2">
          Race Winners for {year}
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                <th className="border-b border-gray-400 p-2 text-left">
                  Round
                </th>
                <th className="border-b border-gray-400 p-2 text-left">Race</th>
                <th className="border-b border-gray-400 p-2 text-left">Date</th>
                <th className="border-b border-gray-400 p-2 text-left">
                  Winner
                </th>
                <th className="border-b border-gray-400 p-2 text-left">
                  Constructor
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 10 }).map((_, index) => (
                <tr key={index}>
                  <td className="border-b border-gray-400 p-2">
                    <Skeleton className="h-6 w-full" />
                  </td>
                  <td className="border-b border-gray-400 p-2">
                    <Skeleton className="h-6 w-full" />
                  </td>
                  <td className="border-b border-gray-400 p-2">
                    <Skeleton className="h-6 w-full" />
                  </td>
                  <td className="border-b border-gray-400 p-2">
                    <Skeleton className="h-6 w-full" />
                  </td>
                  <td className="border-b border-gray-400 p-2">
                    <Skeleton className="h-6 w-full" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-3">
      <h2 className="text-xl font-semibold mt-4 mb-2">
        Race Winners for {year}
      </h2>
      <div className="overflow-x-auto shadow-lg rounded-md p-3">
        <table className="min-w-full border-collapse ">
          <thead>
            <tr>
              <th className="border-b border-gray-400 p-2 text-left">Round</th>
              <th className="border-b border-gray-400 p-2 text-left">Race</th>
              <th className="border-b border-gray-400 p-2 text-left">Date</th>
              <th className="border-b border-gray-400 p-2 text-left">Winner</th>
              <th className="border-b border-gray-400 p-2 text-left">
                Constructor
              </th>
            </tr>
          </thead>
          <tbody>
            {currentRaceWinners.map((race, index) => (
              <tr
                key={index}
                className={`border-b border-gray-400  ${
                  race.winner.driverId === champion.driver.driverId
                    ? "bg-green-200 "
                    : "hover:shadow-md"
                }`}
              >
                <td className="p-3">{race.round}</td>
                <td className="p-3">
                  {race.raceName}
                </td>
                <td className="p-3">{race.date}</td>
                <td className="p-3">
                  {race.winner.givenName} {race.winner.familyName}
                </td>
                <td className="p-3">
                  {race.constructor}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between mt-4">
        <button
          className="px-4 py-2 bg-gray-600 hover:bg-gray-400 rounded text-white font-semibold"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span className="font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-600 hover:bg-gray-400 rounded text-white font-semibold"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default RaceWinners;
