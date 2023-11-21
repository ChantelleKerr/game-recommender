import { Tag } from "antd";
import { Game, Genre } from "types";

const GameGenres = ({ genres }: { genres: Genre[] }) => {
  return (
    <div className="flex flex-wrap z-0">
      {genres.map((genre: Genre) => (
        <Tag
          key={genre.name}
          className="rounded-lg mt-1 mr-1 static bg-primary/10 border-primary text-primary text-[0.6rem] p-0 h-4 px-1 leading-snug"
        >
          {genre.name}
        </Tag>
      ))}
    </div>
  );
};

export default GameGenres;
