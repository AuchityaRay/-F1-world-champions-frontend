import React from 'react';
import Skeleton from './Skeleton';

function ChampionList({ champions, onYearClick, loading }) {
  if (loading) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="cursor-pointer flex flex-col space-y-3 p-5 shadow-md rounded-md items-center">
            <Skeleton className="h-6 w-1/4 mb-2" />
            <Skeleton className="h-6 w-2/4 mb-2" />
            <Skeleton className="h-6 w-1/3 mb-2" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {champions.map((champion) => (
          <div
            key={champion.year}
            className="cursor-pointer hover:shadow-xl flex flex-col space-y-3 p-5 shadow-md rounded-md items-center"
            onClick={() => onYearClick(champion.year)}
          >
            <p className="font-semibold">{champion.year}</p>
            <h1 className="text-xl">
              {champion.driver.givenName} {champion.driver.familyName} <span>{champion.driver.nationality}</span>
            </h1>
            <p className="font-medium">{champion.constructor}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default ChampionList;
