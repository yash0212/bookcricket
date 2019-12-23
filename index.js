var possibleRuns = [0, 1, 2, 4, 6, 8];
var teamOneScore = [];
var teamTwoScore = [];
var teamOneName = "CSK";
var teamTwoName = "Mumbai Indians";
var matchOver = false;
var turn;
selectTurn();
updateButtonText();
updateScore();
updateNames();

document.getElementById("strike-button").addEventListener("click", e => {
	if (!matchOver) {
		var run = possibleRuns[Math.floor(Math.random() * possibleRuns.length)];
		run = run == 8 ? "W" : run;
		if (turn == 1) {
			teamOneScore.push(run);
		} else {
			teamTwoScore.push(run);
		}
		turn = turn == 1 ? 2 : 1;
		updateButtonText();
		updateScore();
	}
});

function selectTurn() {
	turn = [1, 2][Math.floor(Math.random() * 2)];
}

function updateButtonText() {
	var button = document.getElementById("strike-button");
	var result = document.getElementById("result");
	result.style.visibility = "";
	if (teamOneScore.length == 6 && teamTwoScore.length == 6) {
		matchOver = true;
		button.remove();
		if (calculateRuns(teamOneScore) == calculateRuns(teamTwoScore)) {
			result.textContent = `Its a draw`;
		} else {
			result.textContent = `${
				calculateRuns(teamOneScore) > calculateRuns(teamTwoScore)
					? teamOneName
					: teamTwoName
			} Wins`;
		}
	} else {
		button.textContent = `Strike (${
			turn == 1 ? teamOneName : teamTwoName
		})`;
	}
}
function updateScore() {
	document.getElementById("team-1-score").textContent = teamOneScore.length
		? calculateRuns(teamOneScore)
		: 0;
	document.getElementById("team-2-score").textContent = teamTwoScore.length
		? calculateRuns(teamTwoScore)
		: 0;
	updateRuns();
}

function updateNames() {
	document.getElementById("team-1-name").textContent = teamOneName;
	document.getElementById("team-2-name").textContent = teamTwoName;
}

function updateRuns() {
	var teamOneRuns = document.getElementById("team-1-round-score").children;
	var teamTwoRuns = document.getElementById("team-2-round-score").children;
	teamOneScore.forEach((x, i) => {
		teamOneRuns[i].textContent = x;
	});

	teamTwoScore.forEach((x, i) => {
		teamTwoRuns[i].textContent = x;
	});
}

function calculateRuns(score) {
	return score
		.map(num => {
			return num == "W" ? 0 : num;
		})
		.reduce((total, num) => total + num);
}
