import GameList from "./components/GameList";
import NavBar from "components/NavBar";
function App() {
  return (
    <>
      <NavBar />
      <div className="container mx-auto px-2 sm:px-4 lg:px-6 pt-20">
        <GameList />
      </div>
    </>
  );
}

export default App;
