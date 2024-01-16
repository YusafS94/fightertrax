import './App.css';
import { useRef, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

/* 
==========================================
Just wanted to take a sec to give a big thankyou to you Matthew for everything over the past 
4 years, you've helped us so much during the course and been the best tutor we could 
have asked for 💪 without further ado here is the FighterTrax React app - Yusaf.
==========================================
*/

// Helper function I made to capitalise the first letter of a string. Used for JSON data that was lowercase
const capitaliseFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Nav bar component
function Navigation() {
  return (
    <nav className='bg-gradient-to-br from-secondary1 via-yellow-500 via-red-500 to-secondary2 p-0.5 w-48 mx-auto mt-4 rounded-full'>
      <ul className='px-auto flex justify-evenly py-4 bg-gradient-to-r from-primary1 to-primary2 rounded-full'>
        {/* Used Link function from React Router */}
        <Link className='hover:text-secondary1 font-bold' to="/">Home</Link>
        <Link className='hover:text-secondary1 font-bold' to="/favorites">Favorites</Link>
      </ul>
    </nav>
  )
}
// Header component
function Header(props) {
  // Used Date object to dynamically bring in current date to be used in header text
  const today = new Date();
  return (
    <header style={{ backgroundImage: 'url(./header-edited.jpg)' }} className='h-screen flex flex-col bg-cover bg-center'>
      {/* Added the navbar inside the header here as I wanted the background image to fill the whole page */}
      <Navigation />
      {/* Only Tailwind styling has been used in this app. Wherever you see "className" that is React's version of vanilla HTML "class" attribute */}
      <div className='my-auto flex flex-col items-center justify-center gap-8'>
        <div className='p-4'>
          {/* 
            primary1, primary2, secondary1, and secondary2 are all custom colours I created in the tailwind.config.js. 
            Tailwind allow "extending" their styling with your own custom styling.
            As you can see in that file i also created an "xs" breakpoint under the "screens" object. So wherever in the app that you
            see "xs:" used as a breakpoint prefix, it is a custom one created by me.
          */}
          <h1 className='bg-gradient-to-r from-secondary1 to-secondary2 inline-block text-transparent bg-clip-text drop-shadow-lg md:text-[92px] py-4'>{props.name}</h1>
          <h3 className='text-xl md:text-2xl mt-4'>Find out about currently ranked UFC fighters as of:
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

// This is where i pulled in the data from fighters.json and displayed as cards. I made this into a Data component
function Data() {
  // Used State during data fetching process. allFightersData is initially null, then when fetched it is updated with the results.
  const [allFightersData, setData] = useState(null);

  useEffect(() => {
    // Fetching data from local JSON file
    fetch(`/data/fighters.json`)
      .then((response) => response.json())
      .then((data) => setData(data))
    // Setting the allFightersData here using the setData and passing in the data fetched ^^
  }, []);

  // Basic validation checking if allFightersData is not null, else it just shows a "Loading..." text
  if (allFightersData) {
    return (
      <>
        <div id='cards'>
          <h2 className='my-14'>Heavyweight</h2>
          {/* Cards component being called here, passing in the data and weightClass as a prop */}
          <Cards fightersData={allFightersData.fighters} weightClass="Heavyweight" />
          <h2 className='my-14'>Light Heavyweight</h2>
          <Cards fightersData={allFightersData.fighters} weightClass="Light Heavyweight" />
          <h2 className='my-14'>Middleweight</h2>
          <Cards fightersData={allFightersData.fighters} weightClass="Middleweight" />
          <h2 className='my-14'>Welterweight</h2>
          <Cards fightersData={allFightersData.fighters} weightClass="Welterweight" />
          <h2 className='my-14'>Lightweight</h2>
          <Cards fightersData={allFightersData.fighters} weightClass="Lightweight" />
          <h2 className='my-14'>Featherweight</h2>
          <Cards fightersData={allFightersData.fighters} weightClass="Featherweight" />
          <h2 className='my-14'>Bantamweight</h2>
          <Cards fightersData={allFightersData.fighters} weightClass="Bantamweight" />
          <h2 className='my-14'>Flyweight</h2>
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
// Cards component created here. React works asynchronously so i dont need to create a function/component before i call it.
// Adding the data and weight class as props here so i can choose which weight class to present when calling the Cards component.
function Cards({ fightersData, weightClass }) {
  // Filtering the fighters.json based on weight class, using props to pass in the weight class choice when calling it
  const filteredFighters = fightersData.filter((fighter) => fighter.weight_class === weightClass);
  return (
    <div className='mx-auto mb-8 flex flex-row flex-wrap gap-4 justify-center items-center'>
      {/* Using JavaScript map method to loop through the filtered list of fighters, each list item being a "fighter" object */}
      {filteredFighters.map((fighter) => (
        <div className='bg-white/5 w-4/5 xs:w-2/5 lg:w-4/12 xl:w-3/12 hover:bg-gradient-to-br from-secondary1 to-secondary2 border border-primary1/70 hover:border-slate-400 shadow-xl shadow-gray-950 rounded-lg hover:-translate-y-3 transition-transform p-4 group' key={fighter.id}>
          {/* Passing in each fighter's id as a key here above in the div, React needs this so it can keep track of elements. */}
          {/* Using the "to" attribute in the Link component. This is React's more efficient version of an "a" tag. */}
          {/* Passing in the fighter id into url query string. Necessary for setting up the Profile component later. */}
          {/* I made the entire inner content of the card a Link as it looks more app-like on hover than just a Link/anchor tag containing their name. */}
          <Link to={`/profile/${fighter.id}`}>
            <div className='flex flex-col'>
              {/* Fighter image */}
              <div className='w-32 self-center'>
                {/* Passing in more fighter details such as their name into alt tag and image link into src */}
                <img alt={`Profile of ${fighter.name}`} className='group-hover:-translate-y-8 group-hover:scale-125 duration-200 ease-in-out transition-transform max-w-full rounded-t-lg' src={fighter.img} />
              </div>

              <div className='text-left flex flex-col gap-2 justify-start'>
                {/* Fighter name, win/loss and nickname */}
                <div className='flex flex-col gap-2 relative'>
                  <h4 className='leading-none'>{fighter.name}
                  </h4>
                  <div className='flex gap-2'>
                    <span className='bg-green-500 px-2 rounded-lg w-auto'>{fighter.wins}</span>
                    <span className='bg-red-700 px-2 rounded-lg w-auto'>{fighter.losses}</span>
                  </div>
                  {/* Used a JavaScript Ternary/Conditional Operator here as a more efficient if/else alternative */}
                  {/* If there is a nickname it will be displayed, if nickname is empty string it will be displayed but without quotations so it doesn't take up any space in the DOM */}
                  <span className='absolute right-0 bottom-0'>{fighter.nickname ? `'${fighter.nickname}'` : fighter.nickname}</span>
                </div>

                {/* Latest fight */}
                {/* Here i am drilling into the "latestFight" object within each fighter's object in the fighters.json in order to display a new set of details pertaining to the fighter's latest bout and its result. */}
                <div className='border-t py-2'>
                  <div className='border rounded-lg flex flex-col items-center p-2'>
                    {/* Ternary/Conditional Operator checking if result is win or loss and displaying different coloured "pill" depending on result. */}
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
                      {/* Opted for a HTML "non breaking space" character entity rather than padding. */}
                      &nbsp;
                      vs {fighter.latestFight.opponent}
                    </p>
                    <p>{fighter.latestFight.name}</p>
                  </div>

                  {/* Win method and round */}
                  <div className='flex flex-col justify-center items-center'>
                    <p className='text-center'>{fighter.latestFight.method}</p>
                    <p><span>Round {fighter.latestFight.round}</span></p>
                    <p className=''><span>Time: {fighter.latestFight.time}</span></p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
// Made the Favorites page into a component.
export function Favorites() {
  // Used localStorage method of WebStorage API for the favoriting functionality rather than sessionStorage.
  // This is because sessionStorage only keeps data for a session and deletes it when browser/tab is closed and storage limit is low.
  // localStorage data persists after browser is closed and has no expiry data. And has larger storage limit of the two.
  // localStorage was the better choice for making this an "app" that a user could theoretically come back to with favorites persisting between sessions
  // Retrieve favorites from localStorage
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  // Checking first if localStorage has a stored item called "favorites", if not it displays content for no favorited fighters
  if (localStorage.getItem("favorites")) {
    // Made the favorites an object of key-value pairs rather than an array, as i needed to be able to access and set the keys manually which would have been way harder with an array
    // Object.keys is an ES6 feature, allows looping through an object to get the keys. Which was necessary because in the localStorage favorites object i made each fighter object's key their fighter id.
    // Saw solutions online for this issue that involved jQuery but i did not want to use jQuery for this assignment so i avoided that.
    // This first checks if there are no keys in the object and if the object is in fact an object before proceeding
    // If true, it returns the same page for no favorites. If false, it returns a page containing a fighter card for each fighter object within the favorites localStorage object.
    // Adding validation for no fighter localStorage item, and existing fighter localStorage item but empty object was necessary because the user could favorite a fighter (create the localStorage item) but then unfavorite all fighters. Leaving the "favorites" item still there but empty.
    if (Object.keys(favorites).length === 0 && favorites.constructor === Object) {
      return (
        <>
          <Navigation />
          <section className=''>
            <div className='flex flex-col text-center items-center gap-4 my-14 p-4'>
              <h1 className=''>No favorited fighters</h1>
              <p className=''>To favorite a fighter, view their profile and click the "heart" icon on the right.</p>
            </div>

            <div className='bg-white/5 mx-auto mb-8 flex flex-row flex-wrap gap-4 justify-center items-center py-14'>
              <p>There's nothing here <span>☹️</span></p>
            </div>
          </section>
          <Footer />
        </>
      );
    } else {
      return (
        <>
          <Navigation />
          <section className=''>
            <h1 className='text-center my-14'>Favorited fighters</h1>
            {/* Rendering fighter cards for each favorited fighter */}
            <div className='bg-white/5 mx-auto mb-8 flex flex-row flex-wrap gap-4 justify-center items-center py-14'>
              {/* Here i am using the map method on the favorite keys to grab each key, and create a favorite const that uses that key to find the fighter's object by key value. Each key in the favorites object matches the id of the fighter per fighter object */}
              {Object.keys(favorites).map((fighterId) => {
                const favorite = favorites[fighterId];
                return (
                  <div className='w-4/5 xs:w-4/12 md:w-2/12 hover:bg-gradient-to-br from-secondary1 to-secondary2 border border-black-400 hover:border-slate-400 shadow-lg shadow-indigo-900/60 rounded-lg hover:-translate-y-3 transition-transform p-2 h-80 group' key={fighterId}>
                    {/* Again adding the fighterId as a key in the div so React can keep track of it, and then linking to the fighter profile using the fighterId in the url params. React will be able to pick this up in the Profile when i use useParams */}
                    <Link to={`/profile/${fighterId}`}>
                      <div className='flex flex-col gap-4'>
                        <div className='w-32 self-center'>
                          {/* Similar to the fighter cards on Home page, however this is now filling out the details using the individual fighter JSON object that contains extra information. Displayed favorite.association, a value not present in fighter.json in order to demonstrate this. */}
                          <img alt={`Image of ${favorite.name}`} className='group-hover:-translate-y-8 group-hover:scale-125 duration-200 ease-in-out transition-transform max-w-full rounded-t-lg' src={favorite.img} />
                        </div>
                        <div className='text-left flex flex-col justify-start'>
                          <div className='flex flex-col relative text-center'>
                            <h4 className='leading-none'>{favorite.name}</h4>
                            <span>{favorite.nickname ? `'${favorite.nickname}'` : favorite.nickname}</span>
                            <span>{favorite.association}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </section>
          <Footer />
        </>
      );
    }
  } else {
    return (
      <>
        <Navigation />
        <section className=''>
          <div className='flex flex-col text-center items-center gap-4 my-14 p-4'>
            <h1 className=''>No favorited fighters</h1>
            <p className=''>To favorite a fighter, view their profile and click the "heart" icon on the right.</p>
          </div>
          {/* Render fighter cards for each favorited fighter */}
          <div className='bg-white/5 mx-auto mb-8 flex flex-row flex-wrap gap-4 justify-center items-center py-14'>
            <p>There's nothing here <span>☹️</span></p>
          </div>
        </section>
        <Footer />
      </>
    )
  }

}
// Profile component, using fighter id from params passed in via the div in each card
// useParams automatically gets the id from url params, so i didnt need to pass it in here
export function Profile() {
  const { id } = useParams();
  // Adding state to fighterData again as another Fetch needs to be made here to get the individual fighter JSON file using the id in the filename to search for the file.
  const [fighterData, setFighterData] = useState(null);

  // Get favorites object from localStorage parsing it from string, or failing that creating an empty favorites object
  const favorites = JSON.parse(localStorage.getItem('favorites')) || {};

  // Use State for isAlreadyFavorited so button component can be updated based on true or false
  const [isAlreadyFavorited, setIsAlreadyFavorited] = useState(false);

  // Created a Ping component, small aesthetic circle element that "pings" like a radar. Used to visually notify user of which fight card on Profile is the latest one
  // This uses animate-ping which is a Tailwind feature. Have added this in my resources statement
  function Ping() {
    return (
      <span className="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
      </span>
    )
  }

  // Checking if the fighter is already in favorites with useEffect, which is a React Hook for side effects
  // Checks favorites using hasOwnProperty and passing in the id. If it contains the id and returns true, isAlreadyFavorited will be set to true. Vice versa for no matching id in the object.
  // The useEffect runs whenever changes are made in the "favorites" or "id" values (dependancy array)
  useEffect(() => {
    setIsAlreadyFavorited(favorites.hasOwnProperty(id));
  }, [favorites, id]);

  // Another useEffect for Fetching the individual profile using the fighter Id in a template literal for the Fetch URL. Then setting the fighterData with the response JSON data
  useEffect(() => {
    fetch(`/data/fighter${id}.json`)
      .then((response) => response.json())
      .then((data) => setFighterData(data));
  }, [id]);

  // Checking if fighterData exists before proceeding, else there will be "Loading..." text presented.
  if (fighterData) {
    // Created a FightCard function which presents all the data around the fighter's latest fights from the "fights" array in the individual fighters' JSON file.
    // I have used an arrayNum prop to specify which fight item in the fights array i want to bring in.
    // I also used a "latest" prop so i can choose which card has the Ping element on it.
    function FightCard({ arrayNum, latest }) {
      return (
        <div className='relative border border-slate-700 p-4 bg-gradient-to-r from-primary1 to-primary2 rounded-lg w-full'>
          {/* Conditional/Ternary operator that returns Ping component if latest is true, else its just a null value (no Ping) */}
          {latest ? <Ping /> : null}
          <div className='border-b'>
            {/* Added a View Fight Card link to an external site (Sherdog) where users can view the full fight card if they wish to */}
            <span className='relative inline-flex float-right'>
              <a className='flex items-center hover:underline bg-transparent text-bold rounded-lg px-2 float-end' href={`https://www.sherdog.com${fighterData.fights[arrayNum].url}`} target='blank'>View fight card
              </a>
            </span>
            {/* Here i used the arrayNum prop to populate the data relating to that index i will pass into the prop */}
            <h4>{fighterData.fights[arrayNum].name}</h4>
            {/* Here i used that capitalising helper function i created at the start of the app for the result string */}
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


    // Function to add a fighter to favorites
    const addToFavorites = () => {
      // If not already favorited, add to favorites with newFavorite const. Uses the fighter Id as the key
      if (!isAlreadyFavorited) {
        const newFavorite = {
          [id]: fighterData,
        };

        // Then updates the favorites in localStorage
        // Uses setItem on localStorage, targeting the favorites item and stringifying the newFavorite when adding it
        // Uses the spread operator to "expand" the newFavorite object and merge it with favorites
        localStorage.setItem('favorites', JSON.stringify({ ...favorites, ...newFavorite }));
        // Setting isAlreadyFavorited to be true, updating its state.
        setIsAlreadyFavorited(true);
      }
    };

    // Function to remove a fighter from favorites
    const removeFromFavorites = () => {
      // If already favorited, remove from favorites
      if (isAlreadyFavorited) {
        // Create a copy of the favorites object without the object with the specified Id
        const { [id]: removedFavorite, ...updatedFavorites } = favorites;

        // Update favorites in localStorage. Same as adding to favorites but instead of merging, its just adding the updated favorites object without the one that was removed.
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        // Updating the isAlreadyFavorited state again with the setter
        setIsAlreadyFavorited(false);
      }
    };

    // Made the Favorite button into a component so it would be easier to add in other places in the app in the future.
    // Passes in the checks for already favorited, as well as the adding and removing functionality.
    function FavoriteButton({ isAlreadyFavorited, addToFavorites, removeFromFavorites }) {
      return (
        <span>
          {/* Checks if isAlreadyFavorited is true, in which case it runs the remove from favorites function. Or adds to favorites if false. */}
          <div className='w-8' onClick={isAlreadyFavorited ? removeFromFavorites : addToFavorites}>
            {/* SVG has two different src links depending on the value of isAlreadyFavorited */}
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
            <div className='flex items-center border-b my-8'>
              <h1 className='text-center mr-auto'>{fighterData.name}</h1>
              <FavoriteButton
                isAlreadyFavorited={isAlreadyFavorited}
                addToFavorites={addToFavorites}
                removeFromFavorites={removeFromFavorites}
              />
            </div>
            {/* Bio, stats and style sections */}
            <div className='flex flex-col xl:flex-row gap-4'>
              {/* Bio */}
              <div className='xl:w-6/12 border border-slate-700 bg-gradient-to-r from-primary1 to-primary2 rounded-lg p-6'>
                <h3 id='bio'>Bio</h3>
                <div>
                  <p>{fighterData.bio}</p>
                </div>
                <div>
                  <ul className='py-2 flex flex-wrap'>
                    {fighterData.summary.map((style) => (
                      <li className='p-2 w-6/12 md:w-64 border inline rounded-lg uppercase text-center font-semibold' key={style}>{style}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Stats, style */}
              <div className='flex flex-col gap-4 p-6 xl:w-6/12 border border-slate-700 bg-gradient-to-r from-primary1 to-primary2 rounded-lg'>
                <h3>Stats</h3>
                {/* Info cards */}
                <div className='flex gap-2'>
                  <div className='rounded-md border border-slate-600 p-4 w-full'>
                    {/* Win/Loss */}
                    <div className='h-24'>
                      <svg className='rounded-sm' width="full" height="full">
                        {/* <rect width="640" height="280" fill="red" /> */}
                        <rect x="0" y="0" width="100%" id="svg_rect" height="50"
                          fill="green" />
                        <text x="10" y="30%" font-size="60" fill="aliceblue" className='text-xs xs:text-lg font-bold'>Wins: {fighterData.wins.total} </text>
                        <rect x="0" y="50" width={(fighterData.losses.total / fighterData.wins.total * 100) + "%"} id="svg_rect" height="50"
                          fill="maroon" />
                        <text x="10" y="80%" font-size="60" fill="aliceblue" className='text-xs xs:text-lg font-bold'>{fighterData.losses.total} Loss ({(fighterData.losses.total / fighterData.wins.total * 100).toFixed(1) + "%"})</text>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className='rounded-md border border-slate-600 w-full flex flex-col gap-5 p-4'>
                  {/* Wins */}
                  <div className='h-24'>
                    <svg className='rounded-sm' width="full" height="full">
                      {/* <rect width="640" height="280" fill="red" /> */}
                      <rect x="0" y="0" width="100%" id="svg_rect" height="50"
                        fill="salmon" />
                      <text x="10" y="30%" font-size="60" fill="aliceblue" className='text-xs xs:text-lg font-bold'>Total wins: {fighterData.wins.total} </text>
                      <rect x="0" y="50" width={(fighterData.wins.knockouts / fighterData.wins.total * 100) + "%"} id="svg_rect" height="50"
                        fill="lightsalmon" />
                      <text x="10" y="80%" font-size="60" fill="aliceblue" className='text-xs xs:text-lg font-bold'>{fighterData.wins.knockouts} knockouts. ({(fighterData.wins.knockouts / fighterData.wins.total * 100).toFixed(1) + "%"})</text>
                    </svg>
                  </div>
                  {/* Strikes */}
                  <div className='h-24'>
                    <svg className='rounded-sm' width="full" height="full">
                      {/* <rect width="640" height="280" fill="red" /> */}
                      <rect x="0" y="0" width="100%" id="svg_rect" height="50"
                        fill="maroon" />
                      <text x="10" y="30%" font-size="60" fill="aliceblue" className='text-xs xs:text-lg font-bold'>Attempted strikes: {fighterData.strikes.attempted}</text>
                      <rect x="0" y="50" width={(fighterData.strikes.successful / fighterData.strikes.attempted * 100) + "%"} id="svg_rect" height="50"
                        fill="brown" />
                      <text x="10" y="80%" font-size="60" fill="aliceblue" className='text-xs xs:text-lg font-bold'>{fighterData.strikes.successful} successful. ({(fighterData.strikes.successful / fighterData.strikes.attempted * 100).toFixed(1) + "%"})</text>
                    </svg>
                  </div>
                  {/* Takedowns */}
                  <div className='h-24'>
                    <svg className='rounded-sm' width="full" height="full">
                      {/* <rect width="640" height="280" fill="red" /> */}
                      <rect x="0" y="0" width="100%" id="svg_rect" height="50"
                        fill="blue" />
                      <text x="10" y="30%" font-size="60" fill="aliceblue" className='text-xs xs:text-lg font-bold'>Takedowns attempted: {fighterData.takedowns.attempted}</text>
                      <rect x="0" y="50" width={(fighterData.takedowns.successful / fighterData.takedowns.attempted * 100) + "%"} id="svg_rect" height="50"
                        fill="royalblue" />
                      <text x="10" y="80%" font-size="60" fill="aliceblue" className='text-xs xs:text-lg font-bold'>{fighterData.takedowns.successful} successful. ({(fighterData.takedowns.successful / fighterData.takedowns.attempted * 100).toFixed(1) + "%"})</text>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Breakdown */}
              <div className='flex flex-col gap-4 p-6 xl:w-6/12 border border-slate-700 bg-gradient-to-r from-primary1 to-primary2 rounded-lg'>
                <h3>Full Breakdown</h3>
                {/* Info cards */}
                <div className='flex flex-col md:flex gap-3'>
                  {/* Wins */}
                  <div className='rounded-md border border-slate-600 p-4 w-full flex flex-col items-center bg-white/20 shadow-lg gap-2'>
                    <h4>Wins</h4>
                    <div className='flex flex-col gap-2 md:flex-row justify-around w-full'>
                      <div className='bg-gradient-to-r from-primary1 to-primary2 p-2 flex flex-col justify-center items-center rounded-lg w-full'>
                        <p>Knockouts</p>
                        <p>{fighterData.wins.knockouts}</p>
                      </div>
                      <div className='bg-gradient-to-r from-primary1 to-primary2 p-2 flex flex-col justify-center items-center rounded-lg w-full'>
                        <p>Submissions</p>
                        <p>{fighterData.wins.submissions}</p>
                      </div>
                      <div className='bg-gradient-to-r from-primary1 to-primary2 p-2 flex flex-col justify-center items-center rounded-lg w-full'>
                        <p>Decisions</p>
                        <p>{fighterData.wins.decisions}</p>
                      </div>
                      <div className='bg-gradient-to-r from-primary1 to-primary2 p-2 flex flex-col justify-center items-center rounded-lg w-full'>
                        <p>Others</p>
                        <p>{fighterData.wins.others}</p>
                      </div>
                    </div>
                  </div>
                  {/* Losses */}
                  <div className='rounded-md border border-slate-600 p-4 w-full flex flex-col items-center bg-white/20 shadow-lg gap-2'>
                    <h4>Losses</h4>
                    <div className='flex flex-col gap-2 md:flex-row justify-around w-full'>
                      <div className='bg-gradient-to-r from-primary1 to-primary2 p-2 flex flex-col justify-center items-center rounded-lg w-full'>
                        <p>Knockouts</p>
                        <p>{fighterData.losses.knockouts}</p>
                      </div>
                      <div className='bg-gradient-to-r from-primary1 to-primary2 p-2 flex flex-col justify-center items-center rounded-lg w-full'>
                        <p>Submissions</p>
                        <p>{fighterData.losses.submissions}</p>
                      </div>
                      <div className='bg-gradient-to-r from-primary1 to-primary2 p-2 flex flex-col justify-center items-center rounded-lg w-full'>
                        <p>Decisions</p>
                        <p>{fighterData.losses.decisions}</p>
                      </div>
                      <div className='bg-gradient-to-r from-primary1 to-primary2 p-2 flex flex-col justify-center items-center rounded-lg w-full'>
                        <p>Others</p>
                        <p>{fighterData.losses.others}</p>
                      </div>
                    </div>
                  </div>

                  {/* Strikes */}
                  <div className='rounded-md border border-slate-600 p-4 w-full flex flex-col items-center bg-white/20 shadow-lg gap-2'>
                    <h4>Strikes</h4>
                    <div className='flex flex-col gap-2 md:flex-row justify-around w-full'>
                      <div className='bg-gradient-to-r from-primary1 to-primary2 p-2 flex flex-col justify-center items-center rounded-lg w-full'>
                        <p>Successful</p>
                        <p>{fighterData.strikes.successful}</p>
                      </div>
                      <div className='bg-gradient-to-r from-primary1 to-primary2 p-2 flex flex-col justify-center items-center rounded-lg w-full'>
                        <p>Standing</p>
                        <p>{fighterData.strikes.standing}</p>
                      </div>
                      <div className='bg-gradient-to-r from-primary1 to-primary2 p-2 flex flex-col justify-center items-center rounded-lg w-full'>
                        <p>Clinch</p>
                        <p>{fighterData.strikes.clinch}</p>
                      </div>
                      <div className='bg-gradient-to-r from-primary1 to-primary2 p-2 flex flex-col justify-center items-center rounded-lg w-full'>
                        <p>Ground</p>
                        <p>{fighterData.strikes.ground}</p>
                      </div>
                    </div>
                  </div>

                  {/* Takedowns */}
                  <div className='rounded-md border border-slate-600 p-4 w-full flex flex-col items-center bg-white/20 shadow-lg gap-2'>
                    <h4>Takedowns</h4>
                    <div className='flex flex-col gap-2 md:flex-row justify-around w-full'>
                      <div className='bg-gradient-to-r from-primary1 to-primary2 p-2 flex flex-col justify-center items-center rounded-lg w-full'>
                        <p>Successful</p>
                        <p>{fighterData.takedowns.successful}</p>
                      </div>
                      <div className='bg-gradient-to-r from-primary1 to-primary2 p-2 flex flex-col justify-center items-center rounded-lg w-full'>
                        <p>Submissions</p>
                        <p>{fighterData.takedowns.submissions}</p>
                      </div>
                      <div className='bg-gradient-to-r from-primary1 to-primary2 p-2 flex flex-col justify-center items-center rounded-lg w-full'>
                        <p>Passes</p>
                        <p>{fighterData.takedowns.passes}</p>
                      </div>
                      <div className='bg-gradient-to-r from-primary1 to-primary2 p-2 flex flex-col justify-center items-center rounded-lg w-full'>
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
              <div className='flex flex-col w-full lg:flex-row gap-4'>
                <FightCard arrayNum="0" latest={true} />
                <FightCard arrayNum="1" latest={false} />
              </div>
              <div className='flex flex-col w-full lg:flex-row gap-4'>
                <FightCard arrayNum="2" latest={false} />
                <FightCard arrayNum="2" latest={false} />
              </div>
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
    <footer className='bg-black mt-96 p-4 flex gap-4 justify-center'>
      <div className='py-6 flex flex-col items-start'>
        <h4 className='underline'>FighterTrax</h4>
        <p>by Yusaf Saddiq</p>
      </div>
      <div className='py-6'>
        <h4 className='underline'>Sitemap</h4>
        <ul className='flex flex-col items-start'>
          <Link className='hover:text-secondary1 font-bold' to={"/"}>Home</Link>
          <Link className='hover:text-secondary1 font-bold' to={"/favorites"}>Favorites</Link>
        </ul>
      </div>
    </footer>
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

