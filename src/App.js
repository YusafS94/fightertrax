import './App.css';
import { useRef, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const capitaliseFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
const favorites = JSON.parse(localStorage.getItem('favorites')) || [];


function Navigation() {
  return (
    <nav className='bg-gradient-to-br from-secondary1 via-yellow-500 via-red-500 to-secondary2 p-0.5 w-48 mx-auto mt-4 rounded-full'>
      <ul className='px-auto flex justify-evenly py-4 bg-gradient-to-r from-primary1 to-primary2 rounded-full'>
        <Link className='hover:text-orange-600 font-bold' to="/">Home</Link>
        <Link className='hover:text-orange-600 font-bold' to="/favourites">Favourites</Link>
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
        <div className='w-4/5 xs:w-2/5 lg:w-4/12 xl:w-3/12 hover:bg-indigo-900 border border-black-400 hover:border-slate-400 shadow-lg shadow-indigo-900/60 rounded-lg hover:-translate-y-3 transition-transform p-2 group' key={fighter.id}>
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
                  <span className='absolute right-0'>{fighter.nickname ? `'${fighter.nickname}'` : fighter.nickname}</span>
                </div>
                <div className='border-t'>
                  <p><span className='bg-green-500 px-2 rounded-lg'>{capitaliseFirstLetter(fighter.latestFight.result)}</span> - {fighter.latestFight.opponent}</p>
                  <p>{fighter.latestFight.name}</p>
                  <div className='flex flex-row justify-center'>
                    <p className='text-xs'>{fighter.latestFight.method} - <span>Round {fighter.latestFight.round}</span></p>
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
export function Favourites() {
  return (
    <>
      <Navigation />
      <section>
        <h1>Favourites page.</h1>
      </section></>

  )
}
export function Profile() {
  const { id } = useParams();
  const [fighterData, setFighterData] = useState(null);
  let favouritesList = [];

  function Ping() {
    return (
      <span class="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
        <span class="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
      </span>
    )
  }

  useEffect(() => {
    fetch(`/data/fighter${id}.json`)
      .then((response) => response.json())
      .then((data) => setFighterData(data));
  }, [id]);

  if (fighterData) {
    function FightCard({ arrayNum }) {
      return (
        <div className='md:w-3/12 border border-slate-700 p-4 bg-gradient-to-r from-primary1 to-primary2 rounded-lg'>
          <div className='border-b'>
            <span className='relative inline-flex float-right'>
              <a className='flex items-center hover:underline bg-transparent text-bold rounded-lg px-2 float-end' href={`https://www.sherdog.com${fighterData.fights[arrayNum].url}`} target='blank'>View fight card
              </a>
              <Ping />
            </span>

            <h4>{fighterData.fights[arrayNum].name}</h4>
            <p>{capitaliseFirstLetter(fighterData.fights[arrayNum].result)} - {fighterData.fights[arrayNum].method}</p>
          </div>
          <div></div>
        </div>
      )
    }


    const addToFavourites = () => {
      localStorage.setItem(fighterData.name, id)
      console.log(id);
      favouritesList.push(id)
      console.log(favouritesList);
    }
    const removeFromFavourites = () => {
      localStorage.removeItem(fighterData.name);
      console.log(favouritesList);
    }
    return (
      <>
        <Navigation />
        <section className=''>
          <div className='mx-8 mb-8'>
            <div style={{ backgroundImage: `url(${fighterData.img})` }} className='h-96 bg-contain bg-center bg-no-repeat flex flex-col justify-end items-center'>
            </div>
            <h1 className='text-center'>{fighterData.name}</h1>
            <span><button onClick={((id) => addToFavourites(id))}>Add to favourites</button></span>
            <span><button onClick={((id) => removeFromFavourites(id))}>Remove from favourites</button></span>
            <div className='flex flex-col md:flex-row gap-4'>
              <div className='p-6 md:w-1/2 border border-slate-700 bg-gradient-to-r from-primary1 to-primary2 rounded-lg'>
                <h3 id='bio'>Bio</h3>
                <p>{fighterData.bio}</p>
              </div>
              <div className='p-6 md:w-1/2 border border-slate-700 bg-gradient-to-r from-primary1 to-primary2 rounded-lg'>
                <h3>Stats</h3>
                <div>
                  <p>Wins: {fighterData.wins.total}</p>
                  <p>Losses: {fighterData.losses.total}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className=''>
          <div className='bg-gradient-to-r from-secondary1 to-secondary2 p-4 mx-8 mb-8 rounded-lg'>
            <h3>Recent fights</h3>
            <div className='flex flex-col md:flex-row gap-4'>
              <FightCard arrayNum="0" />
              <FightCard arrayNum="1" />
              <FightCard arrayNum="2" />
              <FightCard arrayNum="2" />
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

