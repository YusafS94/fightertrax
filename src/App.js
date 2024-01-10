import './App.css';
import { useRef, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const capitaliseFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

function Navigation() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/favourites">Favourites</Link>
    </nav>
  )
}
function Header(props) {
  return (
    <header>
      <Navigation />
      <h1 className='bg-gradient-to-r from-secondary1 to-secondary2 inline-block text-transparent bg-clip-text'>{props.name}</h1>
    </header>
  )
}
function Main() {
  const today = new Date();
  const currentYear = today.getFullYear();
  return (
    <div>
      <p>Find out about currently ranked UFC fighters as of {today.toDateString()}.</p>
      <Form />
    </div>
  )
}
function Form() {
  const nameInput = useRef();
  const submit = (e) => {
    e.preventDefault(95);
    const searchTerm = nameInput.current.value;
  }

  return (
    <form id="search-form">
      <label for="searchInput">Enter a fighter name: </label>
      <br />
      <input ref={nameInput} id="searchInput" placeholder="Fighter name" />
      <button>Search</button>
    </form>
  )
}
function Results() {
  return (
    <div class="searchResults">
      <div id="resultsCards"></div>
    </div>
  )
}
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
    <div className='mx-auto flex flex-row flex-wrap gap-4 justify-center items-center border border-red-700'>
      {filteredFighters.map((fighter) => (
        <div className='w-2/5 md:w-52 bg-transparent hover:bg-blue-500 border border-black-400 hover:border-slate-400 rounded-lg hover:-translate-y-3 transition-transform p-2' key={fighter.id}>
          <Link to={`/profile/${fighter.id}`}>
            <div className='flex flex-col h-80'>
              <div className='w-32 self-center border-red-500'>
                <img alt={`Profile of ${fighter.name}`} className='max-w-full rounded-t-lg' src={fighter.img} />
              </div>
              <div className='text-left flex flex-col justify-start'>
                <div className='flex flex-col'>
                  <h4 className='leading-none'>{fighter.name}
                  </h4>
                  <div>
                    <span className='bg-green-500 px-2 rounded-lg w-auto'>{fighter.wins}</span>
                    <span className='bg-red-700 px-2 rounded-lg w-auto'>{fighter.losses}</span>
                  </div>
                  <p>{fighter.nickname ? `'${fighter.nickname}'` : fighter.nickname}</p>
                </div>
                <div className='border-t'>
                  <p><span className='bg-green-500 px-2 rounded-lg'>{capitaliseFirstLetter(fighter.latestFight.result)}</span> - {fighter.latestFight.opponent}</p>
                  <p>{fighter.latestFight.name}</p>
                  <div className='flex flex-row items-center'>
                    <p className='text-xs'>{fighter.latestFight.method}</p>
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
            <a className='hover:underline bg-green-700 rounded-lg px-2 float-end' href={`https://www.sherdog.com${fighterData.fights[arrayNum].url}`} target='blank'>View fight card</a>
            <h4>{fighterData.fights[arrayNum].name}</h4>
            <p>{capitaliseFirstLetter(fighterData.fights[arrayNum].result)} - {fighterData.fights[arrayNum].method}</p>
          </div>
          <div></div>
        </div>
      )
    }
    return (
      <>
        <Navigation />
        <section>
          <div style={{ backgroundImage: `url(${fighterData.img})` }} className='h-screen bg-contain bg-center bg-no-repeat flex flex-col justify-end items-center'>
            <a href="#bio"><img className='hover:bg-gradient-to-r from-secondary1 to-secondary2 hover:-translate-y-3 transition-transform w-12 md:w-16 mb-6 border-t rounded-full text-white' src="/arrow_downward.svg" alt="" /></a>
          </div>
          <h1 className='text-center'>{fighterData.name}</h1>
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
        </section>
        <section>
          <div className='bg-gradient-to-r from-secondary1 to-secondary2 p-4'>
            <h3>Recent fights</h3>
            <div className='flex flex-col md:flex-row gap-4'>
              <FightCard arrayNum="0" />
              <FightCard arrayNum="1" />
              <FightCard arrayNum="2" />
              <FightCard arrayNum="2" />
            </div>
          </div>
        </section>
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
      <Main />
      <Data />
      <Footer />
    </div>
  );
}

