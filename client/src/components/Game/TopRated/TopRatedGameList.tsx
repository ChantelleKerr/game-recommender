import { useEffect, useState } from "react";
import GameService from "services/game";
import { TopRatedGames } from "types";
import { FaStar } from "react-icons/fa6";

const TopRatedGameList = () => {
  const [loading, setLoading] = useState<Boolean>(true);
  const [topGames, setTopGames] = useState<TopRatedGames[]>();
  useEffect(() => {
    const fetchTopGames = async () => {
      const topRatedGames = await GameService.getTopRatedGames();
      setTopGames(topRatedGames);

      setLoading(false);
    };
    fetchTopGames();
  }, []);

  return (
    <>
      {!loading && (
        <div>
          <div className="container mx-auto px-2 sm:px-4 lg:px-6 relative">
            <h1 className="text-lg text-secondary">Top Rated Games</h1>
          </div>
          {topGames && topGames.length === 0 ? (
            <p className="text-secondary/60 text-center py-11">
              There is currently no game ratings!
            </p>
          ) : (
            <ul className="flex gap-2 overflow-y-hidden overflow-x-scroll no-scrollbar sm:pl-10 md:pl-18 lg:pl-28 pr-4">
              {topGames &&
                topGames.map((game, index) => (
                  <li key={index}>
                    <div className="relative flex items-center mr-22">
                      <span className="absolute text-border text-[13rem] z-10 font-archivo">
                        {index + 1}
                      </span>
                      <div
                        className={`relative z-20 ${
                          index === 9 ? "ml-[14rem]" : "ml-[6rem]"
                        } w-32`}
                      >
                        <img
                          src={game.image}
                          alt="Game Image"
                          className="object-cover h-40 w-32 rounded-md"
                        />
                        <div className="absolute bottom-0 w-full bg-black bg-opacity-50 px-2 py-1 rounded-b-md">
                          <p className="font-bold text-xs text-white h-6 flex items-center">
                            {game.name}
                          </p>
                          <div className="flex font-bold text-md text-white">
                            <FaStar className="text-primary text-md mr-1" />
                            <span>{game.average_rating.toFixed(1)} </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
};

export default TopRatedGameList;
