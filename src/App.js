import './App.css';
import { useRef, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const capitaliseFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};


function Navigation() {
  return (
    <nav className='bg-gradient-to-br from-secondary1 via-yellow-500 via-red-500 to-secondary2 p-0.5 w-48 mx-auto mt-4 rounded-full'>
      <ul className='px-auto flex justify-evenly py-4 bg-gradient-to-r from-primary1 to-primary2 rounded-full'>
        <Link className='hover:text-orange-600 font-bold' to="/">Home</Link>
        <Link className='hover:text-orange-600 font-bold' to="/favorites">Favorites</Link>
      </ul>
    </nav>
  )
}
function Header(props) {
  const today = new Date();
  const currentYear = today.getFullYear();
  return (
    <header style={{ backgroundImage: 'url(./header-edited.jpg)' }} className='h-screen flex flex-col bg-cover bg-center'>
      <Navigation />
      <div className='my-auto flex flex-col items-center justify-center gap-8'>
        <div>
          <h1 className='bg-gradient-to-r from-secondary1 to-secondary2 inline-block text-transparent bg-clip-text drop-shadow-lg md:text-[92px]'>{props.name}</h1>
          <h3 className='text-xl md:text-2xl'>Find out about currently ranked UFC fighters as of
            <br /> {today.toDateString()}.</h3>
        </div>
        {/* <Form /> */}
        <div className='flex flex-col items-center gap-2 mt-4'>
          {/* <p>View all fighters</p> */}
          <a href="#cards"><img className='animate-bounce hover:bg-gradient-to-r from-secondary1 to-secondary2 hover:-translate-y-3 transition-transform w-12 md:w-16 border-t rounded-full text-white' src="/arrow_downward.svg" alt="" /></a>
        </div>
      </div>
    </header>
  )
}
// function Form() {
//   const nameInput = useRef();
//   const submit = (e) => {
//     e.preventDefault(95);
//     const searchTerm = nameInput.current.value;
//   }

//   return (
//     <form id="search-form">
//       <label for="searchInput">Enter a fighter name: </label>
//       <br />
//       <input ref={nameInput} id="searchInput" placeholder="Fighter name" />
//       <br />
//       <button>Search</button>
//     </form>
//   )
// }

// function Results() {
//   return (
//     <div class="searchResults">
//       <div id="resultsCards"></div>
//     </div>
//   )
// }
function Data() {
  const [allFightersData, setData] = useState(null);

  useEffect(() => {
    // Fetch data from local JSON file
    fetch(`/data/fighters.json`)
      .then((response) => response.json())
      .then((data) => setData(data))
  }, []);

  if (allFightersData) {
    return (
      <>
        {/* <h2>Pound-for-Pound</h2>
        <Cards fightersData={allFightersData.fighters} weightClass="Pound-for-Pound" /> */}
        <div id='cards'>
          <h2>Heavyweight</h2>
          <Cards fightersData={allFightersData.fighters} weightClass="Heavyweight" />
          <h2>Light Heavyweight</h2>
          <Cards fightersData={allFightersData.fighters} weightClass="Light Heavyweight" />
          <h2>Middleweight</h2>
          <Cards fightersData={allFightersData.fighters} weightClass="Middleweight" />
          <h2>Welterweight</h2>
          <Cards fightersData={allFightersData.fighters} weightClass="Welterweight" />
          <h2>Lightweight</h2>
          <Cards fightersData={allFightersData.fighters} weightClass="Lightweight" />
          <h2>Featherweight</h2>
          <Cards fightersData={allFightersData.fighters} weightClass="Featherweight" />
          <h2>Bantamweight</h2>
          <Cards fightersData={allFightersData.fighters} weightClass="Bantamweight" />
          <h2>Flyweight</h2>
          <Cards fightersData={allFightersData.fighters} weightClass="Flyweight" />
        </div>
      </>
    );
  } else {
    return (
      <h1>Loading...</h1>
    );
  }
}
function Cards({ fightersData, weightClass }) {
  const filteredFighters = fightersData.filter((fighter) => fighter.weight_class === weightClass);
  return (
    <div className='mx-auto mb-8 flex flex-row flex-wrap gap-4 justify-center items-center'>
      {filteredFighters.map((fighter) => (
        <div className='bg-white/5 w-4/5 xs:w-2/5 lg:w-4/12 xl:w-3/12 hover:bg-gradient-to-br from-secondary1 to-secondary2 border border-primary1/70 hover:border-slate-400 shadow-xl shadow-gray-950 rounded-lg hover:-translate-y-3 transition-transform p-2 group' key={fighter.id}>
          <Link to={`/profile/${fighter.id}`}>
            <div className='flex flex-col h-80'>
              <div className='w-32 self-center'>
                <img alt={`Profile of ${fighter.name}`} className='group-hover:-translate-y-8 group-hover:scale-125 duration-200 ease-in-out transition-transform max-w-full rounded-t-lg' src={fighter.img} />
              </div>
              <div className='text-left flex flex-col justify-start'>
                <div className='flex flex-col relative'>
                  <h4 className='leading-none'>{fighter.name}
                  </h4>
                  <div>
                    <span className='bg-green-500 px-2 rounded-lg w-auto'>{fighter.wins}</span>
                    <span className='bg-red-700 px-2 rounded-lg w-auto'>{fighter.losses}</span>
                  </div>
                  <span className='absolute right-0 bottom-0'>{fighter.nickname ? `'${fighter.nickname}'` : fighter.nickname}</span>
                </div>
                <div className='border-t'>

                  {/* <p><span className='bg-green-500 px-2 rounded-lg'>{capitaliseFirstLetter(fighter.latestFight.result)}</span> vs {fighter.latestFight.opponent}</p> */}

                  <p>
                    {fighter.latestFight.result === "win" ? (
                      <span className='bg-green-500 px-2 rounded-lg'>
                        {capitaliseFirstLetter(fighter.latestFight.result)}
                      </span>
                    ) : (
                      <span className='bg-red-500 px-2 rounded-lg'>
                        {capitaliseFirstLetter(fighter.latestFight.result)}
                      </span>
                    )}
                    &nbsp;
                    vs {fighter.latestFight.opponent}
                  </p>


                  <p>{fighter.latestFight.name}</p>
                  <div className='flex flex-col justify-center items-center'>
                    <p className='text-xs'>{fighter.latestFight.method} - <span>Round {fighter.latestFight.round}</span></p>
                    <p className='text-xs'><span>Time: {fighter.latestFight.time}</span></p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          {/* Display other fighter details as needed */}
        </div>
      ))}
    </div>
  );
}
export function Favorites() {
  // Retrieve favorites from localStorage
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  return (
    <>
      <Navigation />
      <section>
        <h1>Favorited fighters.</h1>
        {/* Render fighter cards for each favorited fighter */}
        <div className='mx-auto mb-8 flex flex-row flex-wrap gap-4 justify-center items-center'>
          {Object.keys(favorites).map((fighterId) => {
            const favorite = favorites[fighterId];
            return (
              <div className='w-4/5 xs:w-4/12 md:w-2/12 h-72 hover:bg-gradient-to-br from-secondary1 to-secondary2 border border-black-400 hover:border-slate-400 shadow-lg shadow-indigo-900/60 rounded-lg hover:-translate-y-3 transition-transform p-2 group' key={fighterId}>
                <Link to={`/profile/${fighterId}`}>
                  <div className='flex flex-col'>
                    <div className='w-32 self-center'>
                      <img alt={`Profile of ${favorite.name}`} className='group-hover:-translate-y-8 group-hover:scale-125 duration-200 ease-in-out transition-transform max-w-full rounded-t-lg' src={favorite.img} />
                    </div>
                    <div className='text-left flex flex-col justify-start'>
                      <div className='flex flex-col relative text-center'>
                        <h4 className='leading-none'>{favorite.name}</h4>
                        <span className='absolute xs:static right-0'>{favorite.nickname ? `'${favorite.nickname}'` : favorite.nickname}</span>
                      </div>
                    </div>
                  </div>
                </Link>
                {/* Display other fighter details as needed */}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
export function Profile() {
  const { id } = useParams();
  const [fighterData, setFighterData] = useState(null);
  // Get favorites object from localStorage or create an empty favorites object
  const favorites = JSON.parse(localStorage.getItem('favorites')) || {};
  // Check if the fighter is already in favorites
  // const isAlreadyFavorited = favorites.hasOwnProperty(id);
  // Use State for isAlreadyFavorited so button component can be updated based on true or false
  const [isAlreadyFavorited, setIsAlreadyFavorited] = useState(false);

  function Ping() {
    return (
      <span className="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
      </span>
    )
  }

  useEffect(() => {
    setIsAlreadyFavorited(favorites.hasOwnProperty(id));
  }, [favorites, id]);

  useEffect(() => {
    fetch(`/data/fighter${id}.json`)
      .then((response) => response.json())
      .then((data) => setFighterData(data));
  }, [id]);

  if (fighterData) {
    function FightCard({ arrayNum, latest }) {
      return (
        <div className='relative md:w-3/12 border border-slate-700 p-4 bg-gradient-to-r from-primary1 to-primary2 rounded-lg'>
          {/* Conditional/Ternary operator that returns Ping component if latest is true */}
          {latest == true ? <Ping /> : null}
          <div className='border-b'>
            <span className='relative inline-flex float-right'>
              <a className='flex items-center hover:underline bg-transparent text-bold rounded-lg px-2 float-end' href={`https://www.sherdog.com${fighterData.fights[arrayNum].url}`} target='blank'>View fight card
              </a>
            </span>

            <h4>{fighterData.fights[arrayNum].name}</h4>
            <p>{capitaliseFirstLetter(fighterData.fights[arrayNum].result)} - {fighterData.fights[arrayNum].method}</p>
          </div>
          <div>
            <p>Opponent: {fighterData.fights[arrayNum].opponent}</p>
            <p>Date: {fighterData.fights[arrayNum].date}</p>
            <p>Referee: {fighterData.fights[arrayNum].referee}</p>
            <p>Round: {fighterData.fights[arrayNum].round}</p>
            <p>Time: {fighterData.fights[arrayNum].time}</p>
          </div>
          <div></div>
        </div>
      )
    }


    // To add a fighter to favorites
    const addToFavorites = () => {
      // If not already favorited, add to favorites
      if (!isAlreadyFavorited) {
        const newFavorite = {
          [id]: fighterData, // Use the fighter ID as the key
        };

        // Update favorites in localStorage
        localStorage.setItem('favorites', JSON.stringify({ ...favorites, ...newFavorite }));
        setIsAlreadyFavorited(true); // Update the state
      }
    };

    // To remove a fighter from favorites
    const removeFromFavorites = () => {
      // If already favorited, remove from favorites
      if (isAlreadyFavorited) {
        // Create a copy of the favorites object without the specified ID
        const { [id]: removedFavorite, ...updatedFavorites } = favorites;

        // Update favorites in localStorage
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        setIsAlreadyFavorited(false); // Update the state
      }
    };

    function FavoriteButton({ isAlreadyFavorited, addToFavorites, removeFromFavorites }) {
      return (
        <span>
          <div className='w-8' onClick={isAlreadyFavorited ? removeFromFavorites : addToFavorites}>
            <img src={isAlreadyFavorited ? "/favorited.svg" : "/unfavorited.svg"} alt="" />
          </div>
        </span>
      );
    }

    return (
      <>
        <Navigation />
        <section>
          <div className='mx-8 mb-8'>
            {/* Header img section */}
            <div style={{ backgroundImage: `url(${fighterData.img})` }} className='h-96 bg-contain bg-center bg-no-repeat flex flex-col justify-end items-center'>
            </div>
            <div className='flex items-center border-b'>
              <h1 className='text-center mr-auto'>{fighterData.name}</h1>
              <FavoriteButton
                isAlreadyFavorited={isAlreadyFavorited}
                addToFavorites={addToFavorites}
                removeFromFavorites={removeFromFavorites}
              />
            </div>
            {/* Bio, stats and style sections */}
            <div className='flex flex-col lg:flex-row gap-4'>
              {/* Bio */}
              <div className='p-6 lg:w-6/12 border border-slate-700 bg-gradient-to-r from-primary1 to-primary2 rounded-lg'>
                <h3 id='bio'>Bio</h3>
                <p>{fighterData.bio}</p>
              </div>

              {/* Stats, style */}
              <div className='flex flex-col gap-4 p-6 lg:w-6/12 border border-slate-700 bg-gradient-to-r from-primary1 to-primary2 rounded-lg'>
                <h3>Stats</h3>
                {/* Info cards */}
                <div className='flex gap-2'>
                  <div className='rounded-md border border-slate-600 p-4 w-full'>
                    <h4>Style</h4>
                    <ul className='list-disc px-2'>
                      {fighterData.summary.map((style) => (
                        <li key={style}>{style}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className='rounded-md border border-slate-600 w-full flex flex-col gap-5 p-4'>
                  {/* Wins */}
                  <div className='h-24'>
                    <svg className='rounded-sm' width="full" height="full">
                      {/* <rect width="640" height="280" fill="red" /> */}
                      <rect x="0" y="0" width="100%" id="svg_rect" height="50"
                        fill="salmon" />
                      <text x="10" y="30%" font-size="60" fill="aliceblue" className='text-sm font-bold'>Total wins: {fighterData.wins.total} </text>
                      <rect x="0" y="50" width={(fighterData.wins.knockouts / fighterData.wins.total * 100) + "%"} id="svg_rect" height="50"
                        fill="lightsalmon" />
                      <text x="10" y="80%" font-size="60" fill="aliceblue" className='text-sm font-bold'>{fighterData.wins.knockouts} of them knockouts. ({(fighterData.wins.knockouts / fighterData.wins.total * 100).toFixed(1) + "%"})</text>
                    </svg>
                  </div>
                  {/* Strikes */}
                  <div className='h-24'>
                    <svg className='rounded-sm' width="full" height="full">
                      {/* <rect width="640" height="280" fill="red" /> */}
                      <rect x="0" y="0" width="100%" id="svg_rect" height="50"
                        fill="maroon" />
                      <text x="10" y="30%" font-size="60" fill="aliceblue" className='text-sm font-bold'>Total strikes attempted: {fighterData.strikes.attempted}</text>
                      <rect x="0" y="50" width={(fighterData.strikes.successful / fighterData.strikes.attempted * 100) + "%"} id="svg_rect" height="50"
                        fill="brown" />
                      <text x="10" y="80%" font-size="60" fill="aliceblue" className='text-sm font-bold'>{fighterData.strikes.successful} of them successful. ({(fighterData.wins.knockouts / fighterData.wins.total * 100).toFixed(1) + "%"})</text>
                    </svg>
                  </div>
                  {/* Takedowns */}
                  <div className='h-24'>
                    <svg className='rounded-sm' width="full" height="full">
                      {/* <rect width="640" height="280" fill="red" /> */}
                      <rect x="0" y="0" width="100%" id="svg_rect" height="50"
                        fill="blue" />
                      <text x="10" y="30%" font-size="60" fill="aliceblue" className='text-sm font-bold'>Total takedowns attempted: {fighterData.takedowns.attempted}</text>
                      <rect x="0" y="50" width={(fighterData.takedowns.successful / fighterData.takedowns.attempted * 100) + "%"} id="svg_rect" height="50"
                        fill="royalblue" />
                      <text x="10" y="80%" font-size="60" fill="aliceblue" className='text-sm font-bold'>{fighterData.takedowns.successful} of them successful. ({(fighterData.wins.knockouts / fighterData.wins.total * 100).toFixed(1) + "%"})</text>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Breakdown */}
              <div className='flex flex-col gap-4 p-6 lg:w-6/12 border border-slate-700 bg-gradient-to-r from-primary1 to-primary2 rounded-lg'>
                <h3>Full Breakdown</h3>
                {/* Info cards */}
                <div className='flex flex-col md:flex gap-3'>
                  {/* Wins */}
                  <div className='rounded-md border border-slate-600 p-4 w-full flex flex-col items-center bg-white/20 shadow-lg'>
                    <h4>Wins: {fighterData.wins.total}</h4>
                    <div className='flex justify-around w-full'>
                      <div className='flex flex-col justify-center items-center'>
                        <p>Knockouts</p>
                        <p>{fighterData.wins.knockouts}</p>
                      </div>
                      <div className='flex flex-col justify-center items-center'>
                        <p>Submissions</p>
                        <p>{fighterData.wins.submissions}</p>
                      </div>
                      <div className='flex flex-col justify-center items-center'>
                        <p>Decisions</p>
                        <p>{fighterData.wins.decisions}</p>
                      </div>
                      <div className='flex flex-col justify-center items-center'>
                        <p>Others</p>
                        <p>{fighterData.wins.others}</p>
                      </div>
                    </div>
                  </div>
                  {/* Losses */}
                  <div className='rounded-md border border-slate-600 p-4 w-full flex flex-col items-center bg-white/20 shadow-lg'>
                    <h4>Losses: {fighterData.losses.total}</h4>
                    <div className='flex justify-around w-full'>
                      <div className='flex flex-col justify-center items-center'>
                        <p>Knockouts</p>
                        <p>{fighterData.losses.knockouts}</p>
                      </div>
                      <div className='flex flex-col justify-center items-center'>
                        <p>Submissions</p>
                        <p>{fighterData.losses.submissions}</p>
                      </div>
                      <div className='flex flex-col justify-center items-center'>
                        <p>Decisions</p>
                        <p>{fighterData.losses.decisions}</p>
                      </div>
                      <div className='flex flex-col justify-center items-center'>
                        <p>Others</p>
                        <p>{fighterData.losses.others}</p>
                      </div>
                    </div>
                  </div>
                  {/* Strikes */}
                  <div className='rounded-md border border-slate-600 p-4 w-full flex flex-col items-center bg-white/20 shadow-lg'>
                    <h4>Strikes: {fighterData.strikes.attempted}</h4>
                    <div className='flex justify-around w-full'>
                      <div className='flex flex-col justify-center items-center'>
                        <p>Successful</p>
                        <p>{fighterData.strikes.successful}</p>
                      </div>
                      <div className='flex flex-col justify-center items-center'>
                        <p>Standing</p>
                        <p>{fighterData.strikes.standing}</p>
                      </div>
                      <div className='flex flex-col justify-center items-center'>
                        <p>Clinch</p>
                        <p>{fighterData.strikes.clinch}</p>
                      </div>
                      <div className='flex flex-col justify-center items-center'>
                        <p>Ground</p>
                        <p>{fighterData.strikes.ground}</p>
                      </div>
                    </div>
                  </div>
                  {/* Takedowns */}
                  <div className='rounded-md border border-slate-600 p-4 w-full flex flex-col items-center bg-white/20 shadow-lg'>
                    <h4>Takedowns: {fighterData.takedowns.attempted}</h4>
                    <div className='flex justify-around w-full'>
                      <div className='flex flex-col justify-center items-center'>
                        <p>Successful</p>
                        <p>{fighterData.takedowns.successful}</p>
                      </div>
                      <div className='flex flex-col justify-center items-center'>
                        <p>Submissions</p>
                        <p>{fighterData.takedowns.submissions}</p>
                      </div>
                      <div className='flex flex-col justify-center items-center'>
                        <p>Passes</p>
                        <p>{fighterData.takedowns.passes}</p>
                      </div>
                      <div className='flex flex-col justify-center items-center'>
                        <p>Sweeps</p>
                        <p>{fighterData.takedowns.sweeps}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </section>

        <section>
          <div className='bg-gradient-to-r from-secondary1 to-secondary2 p-4 mx-8 mb-8 rounded-lg flex flex-col gap-4'>
            <h3>Recent fights</h3>
            <div className='flex flex-col md:flex-row gap-4'>
              <FightCard arrayNum="0" latest={true} />
              <FightCard arrayNum="1" latest={false} />
              <FightCard arrayNum="2" latest={false} />
              <FightCard arrayNum="2" latest={false} />
            </div>
          </div>
        </section>
        <Footer />
      </>
    )
  } else {
    return (
      <h1>Loading...</h1>
    )
  }
}
function Footer() {
  return (
    <div>
      <p>Footer</p>
    </div>
  )
}
export function App() {
  return (
    <div className="App">
      <Header name="FighterTrax" />
      <Data />
      <Footer />
    </div>
  );
}

