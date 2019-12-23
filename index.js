var possibleRuns = [0, 1, 2, 4, 6, 8]; //All the possible runs in the game
var teamOneScore = []; // Array to store runs for team 1
var teamTwoScore = []; // Array to store runs for team 2
var teamOneName = "CSK"; //Name of team 1
var teamTwoName = "Mumbai Indians"; // Name of team 2
var matchOver = false; // Flag to mark match end
var strikeChange = false; // Flag to mark the change of strike
var turn; // strike deciding variable
selectTurn(); // decide strike of team
updateButtonText(); // update the text of button according to strike
updateScore(); // Initialize the score board with 0
updateNames(); // Update the team names

// Event listener for handling strike button click
document.getElementById("strike-button").addEventListener("click", e => {
	// check if match is not over
	if (!matchOver) {
		// select a random run from list of possible runs
		var run = possibleRuns[Math.floor(Math.random() * possibleRuns.length)];
		run = run == 8 ? "W" : run; // if run is 8 then mark it as wicket

		// check which team is on strike
		if (turn == 1) {
			teamOneScore.push(run); //Update team 1's score
		} else {
			teamTwoScore.push(run); //Update team 2's score
		}

		// Update the button text
		updateButtonText();
		// Update the scoreboard
		updateScore();
	}
});

// Function to assign a random strike to a team at start of the match
function selectTurn() {
	turn = [1, 2][Math.floor(Math.random() * 2)];
}

// Function to update the strike button text
function updateButtonText() {
	var button = document.getElementById("strike-button"); // strike button element
	var result = document.getElementById("result"); // element used to display the win message
	result.style.visibility = ""; // keep the result hidden until game is over

	// Check if game is over
	if (teamOneScore.length == 6 && teamTwoScore.length == 6) {
		matchOver = true; // mark the matchover flag as true
		button.remove(); // delete the strike button from game screen

		// Check if match is a draw
		if (calculateRuns(teamOneScore) == calculateRuns(teamTwoScore)) {
			result.textContent = `Its a draw`;
		} else {
			// The match has a winner
			result.textContent = `${
				calculateRuns(teamOneScore) > calculateRuns(teamTwoScore)
					? teamOneName
					: teamTwoName
			} Wins`;
		}
	} else {
		// Match is not over yet

		// Check if strike of first team is over
		if (
			(teamOneScore.length == 6 || teamTwoScore.length == 6) &&
			strikeChange == false
		) {
			strikeChange = true; //Mark the strike change flag to true
			turn = turn == 1 ? 2 : 1; // Alter the turn to other team
		}

		// Update the strike button text
		button.textContent = `Strike (${
			turn == 1 ? teamOneName : teamTwoName
		})`;
	}
}

//Function to update the score
function updateScore() {
	//Update the total score of team 1
	document.getElementById("team-1-score").textContent = teamOneScore.length
		? calculateRuns(teamOneScore)
		: 0;
	//Update the total score of team 2
	document.getElementById("team-2-score").textContent = teamTwoScore.length
		? calculateRuns(teamTwoScore)
		: 0;
	updateRuns(); //Update the scoreboard
}

// Function to update names of the teams
function updateNames() {
	document.getElementById("team-1-name").textContent = teamOneName; // Update name of team 1
	document.getElementById("team-2-name").textContent = teamTwoName; // Update name of team 2
}

// Function to update runs on scoreboard
function updateRuns() {
	var teamOneRuns = document.getElementById("team-1-round-score").children;
	var teamTwoRuns = document.getElementById("team-2-round-score").children;

	// Update runs on scoreboard for team 1
	teamOneScore.forEach((x, i) => {
		teamOneRuns[i].textContent = x;
	});

	// Update runs on scoreboard for team 2
	teamTwoScore.forEach((x, i) => {
		teamTwoRuns[i].textContent = x;
	});
}

// Function to calculate total score
function calculateRuns(score) {
	// Change W in score array to 0 and then calculate total score
	return score
		.map(num => {
			return num == "W" ? 0 : num;
		})
		.reduce((total, num) => total + num);
}
