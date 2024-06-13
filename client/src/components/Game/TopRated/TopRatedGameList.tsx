import { useEffect, useState } from "react";
import GameService from "services/game";
import { TopRatedGames } from "types";

const TopRatedGameList = () => {
  const [loading, setLoading] = useState<Boolean>(true);
  const [topGames, setTopGames] = useState<TopRatedGames[]>();
  useEffect(() => {
    const fetchTopGames = async () => {
      const topGamesResponse = await GameService.getTopRatedGames();
      setTopGames(topGamesResponse.data);
      console.log(topGames);

      setLoading(false);
    };
    fetchTopGames();
  }, []);

  return (
    <>
      {!loading && (
        <div>
          <div className="container mx-auto px-2 sm:px-4 lg:px-6 relative">
            <h1 className="text-lg text-secondary ">Top Rated Games</h1>
          </div>
          <ul className="flex gap-2 overflow-y-hidden overflow-x-scroll no-scrollbar sm:pl-10 md:pl-18 lg:pl-28 pr-4">
            {topGames &&
              topGames.map((game, index) => (
                <li key={index}>
                  <div className="relative flex items-center mr-22">
                    <span className="absolute  text-border text-[13rem] z-10 font-archivo">
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
                        className="object-cover h-40 w-32"
                      />
                      {/* TODO: Add Hover effect to see rating */}
                      <span className="absolute bottom-0 flex justify-center font-bold text-xs text-white bg-black bg-opacity-50 px-2 py-2 w-full">
                        {game.name}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default TopRatedGameList;
