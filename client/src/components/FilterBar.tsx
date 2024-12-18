import { Input, Space } from "antd";
const { Search } = Input;

const FilterBar = () => {
  const onSearch = (e: any) => {
    console.log(e);
  };
  return (
    <div className="px-10 pb-10 flex w-full items-center">
      <Search
        className="bg-dark"
        placeholder="Search Game"
        onSearch={onSearch}
      />
    </div>
  );
};

export default FilterBar;
