import './App.css';
import { useRef, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
// import fightersData from "../public/data/fighters.json";


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
      <h1>{props.name}</h1>
    </header>
  )
}
function Main() {
  return (
    <div>
      <p>Find out about MMA fighters.</p>
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
      <div className='mx-auto flex flex-col flex-wrap justify-center items-center md:flex-row border border-red-700'>
        {/* Render your data as needed */}
        {allFightersData.fighters.map((fighter) => (
          <div className='w-4/5 md:w-1/5 md:m-2 border border-slate-400 shadow-md hover:shadow-none rounded-lg hover:-translate-y-4 transition-transform' key={fighter.id}>
            <Link to={`/profile/${fighter.id}`}>
              <img alt={`Profile of ${fighter.name}`} className='max-w-full rounded-t-lg' src={fighter.img} height={150} />
              {fighter.name}
              <br />
              {fighter.nickname}
            </Link>

            {/* Display other fighter details as needed */}
          </div>
        ))
        }
      </div >
    );
  } else {
    return (
      <h1>Loading...</h1>
    )
  }
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
    console.log('Done')
    return (
      <>
        <Navigation />
        <section>
          <h1>{fighterData.name}'s Profile Page.</h1>
          <p>{fighterData.description}</p>
        </section></>
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

