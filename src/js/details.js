function loadData(url, callback) {
	fetch(url).then(function (response) {
		return response.json();
	}).then(function (json) {
		callback(json)
	});
} //end of loadData()




function populateContent(fighter) {
	const nameEl = document.querySelector("#name");
	const dobEl = document.querySelector("#dob");
	const weightClassEl = document.querySelector("#weightClass");
	const p4pRankingEl = document.querySelector("#p4pRanking");
	const locationEl = document.querySelector("#location");
	const teamEl = document.querySelector("#team");
	const winsEl = document.querySelector("#wins");
	const lossesEl = document.querySelector("#losses");
	const noContestsEl = document.querySelector("#noContests");
	const descriptionEl = document.querySelector("#description");
	nameEl.textContent = fighter.name;
	dobEl.textContent = fighter.dob;
	weightClassEl.textContent = fighter.weightClass;
	p4pRankingEl.textContent = `P4P Ranking: ${fighter.p4pRanking}`;
	locationEl.textContent = fighter.location;
	teamEl.textContent = `Team: ${fighter.team}`;
	winsEl.textContent = `Wins: ${fighter.wins}`;
	lossesEl.textContent = `Losses: ${fighter.losses}`;
	noContestsEl.textContent = `NC: ${fighter.noContests}`;
	descriptionEl.textContent = `Fighter bio: ${fighter.description}`;
}


function init() {
	//URLSearchParams provides an easy method for getting data from the querystring e.g. details.html?id=3
	//see https://davidwalsh.name/query-string-javascript for more info
	const urlParams = new URLSearchParams(window.location.search);
	const id = urlParams.get("id");
	loadData("data/fighter" + id + ".json", populateContent); //request a JSON file e.g. country3.json
}


init();
