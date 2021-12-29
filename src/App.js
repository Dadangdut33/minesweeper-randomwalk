import React, { Component } from "react";
import "./App.css";

function convertToNumber(map, i, j, dimensions) {
	var count = 0;
	var row = dimensions;
	var column = dimensions;
	try {
		if (i > 0) {
			if (j > 0) {
				if (map[i - 1][j - 1] === "💣") count += 1;
			}
			if (map[i - 1][j] === "💣") {
				count += 1;
			}
			if (j < column - 1) {
				if (map[i - 1][j + 1] === "💣") count += 1;
			}
		}
		if (j > 0) {
			if (map[i][j - 1] === "💣") count += 1;
		}
		if (j < column - 1) {
			if (map[i][j + 1] === "💣") count += 1;
		}
		if (i < row - 1)
			if (j > 0) {
				if (map[i + 1][j - 1] === "💣") count += 1;
			}
		if (map[i + 1][j] === "💣") {
			count += 1;
		}
		if (j < column - 1) {
			if (map[i + 1][j + 1] === "💣") count += 1;
		}
	} catch (e) {
		// ignored
		// console.log(e);
	} finally {
		return count;
	}
}

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dimensions: 9,
			maxTunnels: 85,
			maxLength: 45,
			revealed: false,
			reset: true,
			currMap: [],
			win: false,
			lost: false,
			showWin: false,
			bombCounter: 0,
			totalMoves: 0,
			timer: 0,
			timerStr: "00 : 00 : 00",
			playing: true,
			timerStarted: false,
		};
		this.onChange = this.onChange.bind(this);
		this.checkTiles = this.checkTiles.bind(this);
		this.mapCheat = this.mapCheat.bind(this);
		this.checkWin = this.checkWin.bind(this);
		this.hideSHowWin = this.hideSHowWin.bind(this);
		this.startTimer = this.startTimer.bind(this);
		this.formatTime = this.formatTime.bind(this);
		this.changePreset = this.changePreset.bind(this);
		this.generateNew = this.generateNew.bind(this);
	}

	createArray(num, dimensions) {
		var array = [];
		for (var i = 0; i < dimensions; i++) {
			array.push([]);
			for (var j = 0; j < dimensions; j++) {
				array[i].push(num);
			}
		}
		return array;
	}

	onChange(e) {
		if (e.target.name !== "dimensions") {
			if (e.target.value > 0 && e.target.value <= 1000) {
				this.setState({
					[e.target.name]: this.validator(e.target.value),
				});
			} else {
				if (e.target.value < 1) {
					this.setState({
						[e.target.name]: 1,
					});
				} else {
					this.setState({
						[e.target.name]: 1000,
					});
				}
			}
		} else {
			if (e.target.value > 2 && e.target.value <= 100) {
				this.setState({
					[e.target.name]: this.validator(e.target.value),
				});
			} else {
				if (e.target.value < 3) {
					this.setState({
						[e.target.name]: 3,
					});
				} else {
					this.setState({
						[e.target.name]: 100,
					});
				}
			}
		}
	}

	startTimer() {
		var timer = setInterval(() => {
			if (!this.state.playing) {
				clearInterval(timer);
				return;
			}
			this.setState({
				timer: this.state.timer + 1,
			});

			this.formatTime();
		}, 1000);
	}

	formatTime() {
		const getSeconds = `0${this.state.timer % 60}`.slice(-2);
		const minutes = `${Math.floor(this.state.timer / 60)}`;
		const getMinutes = `0${minutes % 60}`.slice(-2);
		const getHours = `0${Math.floor(this.state.timer / 3600)}`.slice(-2);

		this.setState({
			timerStr: `${getHours} : ${getMinutes} : ${getSeconds}`,
		});
	}

	validator(x) {
		let input = Number(x);
		if (isNaN(input)) {
			return 0;
		}
		return input;
	}

	mapCheat(e) {
		alert("Map printed to console");
		console.log("=".repeat(25));
		console.log("Revealing the map...");
		console.log("=".repeat(25));
		console.log(this.state.currMap);
	}

	// create a randomly generated map
	createMap() {
		let dimensions = this.state.dimensions, // width and height of the map
			maxTunnels = this.state.maxTunnels, // max number of tunnels possible
			maxLength = this.state.maxLength, // max length each tunnel can have
			map = this.createArray(1, dimensions), // create a 2d array full of 1's
			currentRow = Math.floor(Math.random() * dimensions), // the current row - start at a random spot
			currentColumn = Math.floor(Math.random() * dimensions), // the current column - start at a random spot
			directions = [
				[-1, 0],
				[1, 0],
				[0, -1],
				[0, 1],
			], // array to get a random direction from (left,right,up,down)
			lastDirection = [], // save the last direction it went
			randomDirection; // next turn/direction - holds a value from directions

		// lets create some tunnels - while maxTunnels, dimentions, and maxLength  is greater than 0.
		while (maxTunnels && dimensions && maxLength) {
			// lets get a random direction - until it is a perpendicular to the lastDirection
			// if the last direction = left or right,
			// then the new direction has to be up or down,
			// and vice versa
			do {
				randomDirection = directions[Math.floor(Math.random() * directions.length)];
			} while ((randomDirection[0] === -lastDirection[0] && randomDirection[1] === -lastDirection[1]) || (randomDirection[0] === lastDirection[0] && randomDirection[1] === lastDirection[1]));

			var randomLength = Math.ceil(Math.random() * maxLength), //length the next tunnel will be (max of maxLength)
				tunnelLength = 0; //current length of tunnel being created

			// lets loop until tunnel is long enough or until it hit an edge
			while (tunnelLength < randomLength) {
				//break the loop if it is going out of the map
				if (
					(currentRow === 0 && randomDirection[0] === -1) ||
					(currentColumn === 0 && randomDirection[1] === -1) ||
					(currentRow === dimensions - 1 && randomDirection[0] === 1) ||
					(currentColumn === dimensions - 1 && randomDirection[1] === 1)
				) {
					break;
				} else {
					map[currentRow][currentColumn] = 0; //set the value of the index in map to 0 (a tunnel, making it one longer)
					currentRow += randomDirection[0]; //add the value from randomDirection to row and col (-1, 0, or 1) to update the location
					currentColumn += randomDirection[1];
					tunnelLength++; //the tunnel is now one longer, so lets increment that variable
				}
			}

			if (tunnelLength) {
				// update the variables unless the last loop broke beforeit made any part of a tunnel
				lastDirection = randomDirection; //set lastDirection, so it can remember what way it went
				maxTunnels--; // we created a whole tunnel so lets decrement how many we have left to create
			}
		}

		var bombCounter = 0; //counter for the number of bombs
		// based on the walls and tunnel, create a minesweeper map
		for (var i = 0; i < dimensions; i++) {
			for (var j = 0; j < dimensions; j++) {
				if (map[i][j] === 1) {
					map[i][j] = "💣";
					bombCounter++;
				} else {
					map[i][j] = "#";
				}
			}
		}

		// check surrounding tiles for mines, convert to numbers. # is a wall, * is a mine
		for (i = 0; i < dimensions; i++) {
			for (j = 0; j < dimensions; j++) {
				if (map[i][j] === "💣") {
					continue;
				} else {
					map[i][j] = convertToNumber(map, i, j, dimensions);
				}
			}
		}

		// if reset/create new map
		if (this.state.reset) {
			// if reset/on start
			this.setState({
				currMap: map,
				reset: false,
				win: false,
				lose: false,
				showWin: false,
				bombCounter: bombCounter,
				totalMoves: 0,
				timer: 0,
				timerStr: "00 : 00 : 00",
				playing: true,
				timerStarted: false,
			});
		} else {
			// if not reset
			map = this.state.currMap;
		}

		return map; // all the tunnels have been created and the map is complete, so lets return it to render()
	}

	revealSurroundings(map, row, col) {
		// check row and col not out of bounds
		if (row < 0 || col < 0 || row >= map.length || col >= map.length) {
			return;
		}

		// if the tile is a number, reveal it and all surrounding tiles
		// check above
		try {
			if (map[row - 1][col] !== "💣") {
				var up = document.getElementById("inner-" + (row - 1) + "-" + col);
				var outerUp = document.getElementById(row - 1 + "-" + col);
				if (up !== null) {
					up.className = "revealed";
					if (up.innerHTML === "") {
						if (outerUp.style.backgroundColor !== "white") {
							// outerUp.style.border = "none";
							outerUp.style.backgroundColor = "white";

							// if empty then check for another empty tile
							this.revealSurroundings(map, row - 1, col);
						}
					} else {
						outerUp.style.backgroundColor = "#f6d852";
					}
				}
			}
		} catch (e) {
			/* Ignored */
			// console.log("up" + e);
		}

		// check below
		try {
			if (map[row + 1][col] !== "💣") {
				var down = document.getElementById("inner-" + (row + 1) + "-" + col);
				var outerDown = document.getElementById(row + 1 + "-" + col);
				if (down !== null) {
					down.className = "revealed";
					if (down.innerHTML === "") {
						if (outerDown.style.backgroundColor !== "white") {
							// outerDown.style.border = "none";
							outerDown.style.backgroundColor = "white";

							// if empty then check for another empty tile
							this.revealSurroundings(map, row + 1, col);
						}
					} else {
						outerDown.style.backgroundColor = "#f6d852";
					}
				}
			}
		} catch (e) {
			/* Ignored */
			// console.log("bellow" + e);
		}

		// check left
		try {
			if (map[row][col - 1] !== "💣") {
				var left = document.getElementById("inner-" + row + "-" + (col - 1));
				var outerLeft = document.getElementById(row + "-" + (col - 1));
				if (left !== null) {
					left.className = "revealed";
					if (left.innerHTML === "") {
						if (outerLeft.style.backgroundColor !== "white") {
							// outerLeft.style.border = "none";
							outerLeft.style.backgroundColor = "white";

							// if empty then check for another empty tile
							this.revealSurroundings(map, row, col - 1);
						}
					} else {
						outerLeft.style.backgroundColor = "#f6d852";
					}
				}
			}
		} catch (e) {
			/* Ignored */
			// console.log("left" + e);
		}

		// check right
		try {
			if (map[row][col + 1] !== "💣") {
				var right = document.getElementById("inner-" + row + "-" + (col + 1));
				var outerRight = document.getElementById(row + "-" + (col + 1));
				if (right !== null) {
					right.className = "revealed";
					if (right.innerHTML === "") {
						if (outerRight.style.backgroundColor !== "white") {
							// outerRight.style.border = "none";
							outerRight.style.backgroundColor = "white";

							// if empty then check for another empty tile
							this.revealSurroundings(map, row, col + 1);
						}
					} else {
						outerRight.style.backgroundColor = "#f6d852";
					}
				}
			}
		} catch (e) {
			/* Ignored */
			// console.log("right" + e);
		}
	}

	resetTiles() {
		// loop through all the elements and for the empty one change the style border and background color
		for (var i = 0; i < this.state.dimensions; i++) {
			for (var j = 0; j < this.state.dimensions; j++) {
				try {
					var tile = document.getElementById(i + "-" + j);
					var innerTile = document.getElementById("inner-" + i + "-" + j);

					tile.style.border = "";
					tile.style.backgroundColor = "";

					innerTile.className = "hidden";
				} catch (e) {
					/* Ignored */
					// console.log("checkTiles" + e);
				}
			}
		}
	}

	revealAll() {
		// loop through all the elements and for the empty one change the style border and background color
		for (var i = 0; i < this.state.dimensions; i++) {
			for (var j = 0; j < this.state.dimensions; j++) {
				try {
					var tile = document.getElementById(i + "-" + j);
					var insideTheTile = document.getElementById("inner-" + i + "-" + j);

					if (insideTheTile.innerHTML === "") {
						// tile.style.border = "none";
						tile.style.backgroundColor = "white";
					} else if (insideTheTile.innerHTML !== "💣") {
						tile.style.backgroundColor = "#f6d852";
					}
				} catch (e) {
					/* Ignored */
					// console.log("checkTiles" + e);
				}
			}
		}
	}

	checkWin() {
		var allSafeRevealed = true;
		for (var i = 0; i < this.state.dimensions; i++) {
			for (var j = 0; j < this.state.dimensions; j++) {
				try {
					var innerTile = document.getElementById("inner-" + i + "-" + j);

					if (innerTile.innerHTML !== "💣") {
						if (innerTile.className === "hidden") {
							allSafeRevealed = false;
						}
					}
				} catch (e) {
					/* Ignored */
					// console.log("checkTiles" + e);
				}
			}
		}

		if (allSafeRevealed) {
			this.setState({
				win: true,
				showWin: true,
				revealed: true,
				playing: false,
			});
		} else {
			this.setState({
				win: false,
			});
		}
	}

	hideSHowWin() {
		this.setState({
			showWin: false,
		});
	}

	generateNew() {
		this.setState({
			revealed: false,
			reset: true,
			map: this.createMap(),
			win: false,
			lost: false,
		});
		this.resetTiles();
	}

	checkTiles(e) {
		// check win or not
		if (this.state.win) {
			if (window.confirm("You have won the game! Would you like to reset?")) {
				this.setState({
					revealed: false,
					map: this.createMap(),
					reset: true,
					win: false,
				});

				this.resetTiles();
			}

			return;
		}

		// check lost or not
		if (this.state.lost) {
			if (window.confirm("You have lost the game! Would you like to reset?")) {
				this.setState({
					revealed: false,
					map: this.createMap(),
					reset: true,
					lost: false,
				});

				this.resetTiles();
			}

			return;
		}

		if (!this.state.timerStarted) {
			this.setState({
				timerStarted: true,
			});
			this.startTimer();
		}

		if (this.state.win === false) {
			// onclick, check if mine or not. if mine tell user lost
			if (e.target.getAttribute("data-tiletype") === "mines") {
				console.log("You lost!");

				alert("You step on a mine. You lost!");

				this.revealAll();

				// reveal the map
				this.setState({
					revealed: true,
					reset: false,
					lost: true,
					playing: false,
				});
			} else {
				var innerTile = document.getElementById("inner-" + e.target.id);

				if (innerTile !== null) {
					if (innerTile.className !== "revealed") {
						innerTile.className = "revealed";

						var outer = document.getElementById(e.target.id);
						// check empty content
						if (innerTile.innerHTML === "") {
							// outer.style.border = "none";
							outer.style.backgroundColor = "white";
						} else {
							outer.style.backgroundColor = "#f6d852";
						}
						// id is row-col
						// separate it
						var row = e.target.id.split("-")[0];
						var col = e.target.id.split("-")[1];
						this.revealSurroundings(this.state.currMap, row, col);

						var currentMove = this.state.totalMoves;
						currentMove++;
						this.setState({
							totalMoves: currentMove,
						});

						this.forceUpdate();

						this.checkWin();
					}
				}
			}
		}
	}

	changePreset(e) {
		console.log(e.target.value);
		var chosen = e.target.value;
		if (chosen === "Easy") {
			this.setState({
				dimensions: 9,
				maxTunnels: 85,
				maxLength: 45,
			});
		} else if (chosen === "Medium") {
			this.setState({
				dimensions: 16,
				maxTunnels: 120,
				maxLength: 60,
			});
		} else if (chosen === "Hard") {
			this.setState({
				dimensions: 22,
				maxTunnels: 200,
				maxLength: 100,
			});
		} else if (chosen === "Very Hard") {
			this.setState({
				dimensions: 28,
				maxTunnels: 220,
				maxLength: 130,
			});
		}
	}

	render() {
		let grid = this.createMap();

		return (
			<div>
				<div className='form-group row text-center'>
					<div className='inline'>
						<label>dimensions</label>
						<input className='form-control' name='dimensions' type='number' min='1' max='1000' value={this.state.dimensions} onChange={this.onChange} />
					</div>
					<div className='inline'>
						<label>maxTunnels</label>
						<input className='form-control' name='maxTunnels' type='number' min='1' max='1000' value={this.state.maxTunnels} onChange={this.onChange} />
					</div>
					<div className='inline'>
						<label>maxLength</label>
						<input className='form-control' name='maxLength' type='number' min='1' max='1000' value={this.state.maxLength} onChange={this.onChange} />
					</div>
					<div className='inline'>
						<label>Preset</label>
						<select className='form-control' name='preset' onChange={this.changePreset}>
							<option value='Easy'>Easy (9x9)</option>
							<option value='Medium'>Medium (16x16)</option>
							<option value='Hard'>Hard (22x22)</option>
							<option value='Very Hard'>Very Hard (28x28)</option>
						</select>
					</div>
					<div className='inline'>
						<label>Generate</label>
						<input className='form-control' type='button' onClick={this.generateNew} value={"Regenerate"} />
					</div>
				</div>
				<table className='grid'>
					<thead>
						{grid.map((obj, row) => (
							<tr key={row}>
								{obj.map((obj2, col) => (
									<td className={this.state.revealed ? "cell-reveal" : "cell-hidden"} id={row + "-" + col} key={col} data-tiletype={obj2 === "💣" ? "mines" : "notmines"} onClick={this.checkTiles}>
										<span id={"inner-" + row + "-" + col} className={this.state.revealed ? "revealed" : "hidden"} data-tiletype={obj2 === "💣" ? "mines" : "notmines"}>
											{/* className={this.state.revealed ? "revealed" : "hidden"} */}
											{obj2 === "💣" ? "💣" : obj2 === 0 ? "" : obj2}
										</span>
									</td>
								))}
							</tr>
						))}
					</thead>
				</table>
				<div className='form-group row text-center'>
					<div className='inline'>
						<label>Status</label>
						<input className='form-control default-cursor' type='button' value={this.state.win ? "Win" : this.state.lost ? "Lost" : "Playing"} />
					</div>
					<div className='inline'>
						<label>Bomb</label>
						<input className='form-control default-cursor' type='button' value={this.state.bombCounter} />
					</div>
					<div className='inline'>
						<label>Moves</label>
						<input className='form-control default-cursor' type='button' value={this.state.totalMoves} />
					</div>
					<div className='inline'>
						<label>Time</label>
						<input className='form-control default-cursor' type='button' value={this.state.timerStr} />
					</div>
					<div className='inline'>
						<label>Cheat</label>
						<input className='form-control' name='cheat' type='button' onClick={this.mapCheat} value={"Show"} />
					</div>
				</div>
				<div className={this.state.showWin ? "block" : "hidden"} id='win-popup'>
					<div className='popup'>
						<div className='popup-content'>
							<h2>Congratulations! You Won the game!</h2>
							<input className='form-control' type='button' onClick={this.hideSHowWin} value={"Okay"} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default App;
