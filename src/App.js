import React, { Component } from "react";
import "./App.css";

function convertToNumber(map, i, j, dimensions) {
	var count = 0;
	var baris = dimensions;
	var kolom = dimensions;
	try {
		if (i > 0) {
			if (j > 0) {
				if (map[i - 1][j - 1] === "*") count += 1;
			}
			if (map[i - 1][j] === "*") {
				count += 1;
			}
			if (j < kolom - 1) {
				if (map[i - 1][j + 1] === "*") count += 1;
			}
		}
		if (j > 0) {
			if (map[i][j - 1] === "*") count += 1;
		}
		if (j < kolom - 1) {
			if (map[i][j + 1] === "*") count += 1;
		}
		if (i < baris - 1)
			if (j > 0) {
				if (map[i + 1][j - 1] === "*") count += 1;
			}
		if (map[i + 1][j] === "*") {
			count += 1;
		}
		if (j < kolom - 1) {
			if (map[i + 1][j + 1] === "*") count += 1;
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
			dimensions: 20,
			maxTunnels: 100,
			maxLength: 30,
			revealed: false,
			reset: true,
			currMap: [],
		};
		this.onChange = this.onChange.bind(this);
		this.checkTiles = this.checkTiles.bind(this);
		this.mapCheat = this.mapCheat.bind(this);
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
		this.setState({
			[e.target.name]: this.validator(e.target.value),
			reset: true,
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
		console.log("=".repeat(25));
		console.log("Revealing the map...");
		console.log("=".repeat(25));
		console.log(this.state.currMap);
	}

	//lets create a randomly generated map for our dungeon crawler
	createMap() {
		console.log("creating map");

		let dimensions = this.state.dimensions, // width and height of the map
			maxTunnels = this.state.maxTunnels, // max number of tunnels possible
			maxLength = this.state.maxLength, // max length each tunnel can have
			map = this.createArray(1, dimensions), // create a 2d array full of 1's
			currentRow = Math.floor(Math.random() * dimensions), // our current row - start at a random spot
			currentColumn = Math.floor(Math.random() * dimensions), // our current column - start at a random spot
			directions = [
				[-1, 0],
				[1, 0],
				[0, -1],
				[0, 1],
			], // array to get a random direction from (left,right,up,down)
			lastDirection = [], // save the last direction we went
			randomDirection; // next turn/direction - holds a value from directions

		// lets create some tunnels - while maxTunnels, dimentions, and maxLength  is greater than 0.
		while (maxTunnels && dimensions && maxLength) {
			// lets get a random direction - until it is a perpendicular to our lastDirection
			// if the last direction = left or right,
			// then our new direction has to be up or down,
			// and vice versa
			do {
				randomDirection = directions[Math.floor(Math.random() * directions.length)];
			} while ((randomDirection[0] === -lastDirection[0] && randomDirection[1] === -lastDirection[1]) || (randomDirection[0] === lastDirection[0] && randomDirection[1] === lastDirection[1]));

			var randomLength = Math.ceil(Math.random() * maxLength), //length the next tunnel will be (max of maxLength)
				tunnelLength = 0; //current length of tunnel being created

			// lets loop until our tunnel is long enough or until we hit an edge
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
					currentRow += randomDirection[0]; //add the value from randomDirection to row and col (-1, 0, or 1) to update our location
					currentColumn += randomDirection[1];
					tunnelLength++; //the tunnel is now one longer, so lets increment that variable
				}
			}

			if (tunnelLength) {
				// update our variables unless our last loop broke before we made any part of a tunnel
				lastDirection = randomDirection; //set lastDirection, so we can remember what way we went
				maxTunnels--; // we created a whole tunnel so lets decrement how many we have left to create
			}
		}

		// based on the walls and tunnel, create a minesweeper map
		for (var i = 0; i < dimensions; i++) {
			for (var j = 0; j < dimensions; j++) {
				if (map[i][j] === 1) {
					map[i][j] = "*";
				} else {
					map[i][j] = "#";
				}
			}
		}

		// check surrounding tiles for mines, convert to numbers. # is a wall, * is a mine
		for (i = 0; i < dimensions; i++) {
			for (j = 0; j < dimensions; j++) {
				if (map[i][j] === "*") {
					continue;
				} else {
					map[i][j] = convertToNumber(map, i, j, dimensions);
				}
			}
		}

		// this.state.currMap = map;
		// map = this.state.currMap;
		if (this.state.reset) {
			// if reset/on start
			this.setState({
				currMap: map,
				reset: false,
			});
		} else {
			map = this.state.currMap;
		}

		return map; // all our tunnels have been created and our map is complete, so lets return it to our render()
	}

	revealSurroundings(map, row, col) {
		// check row and col not out of bounds
		if (row < 0 || col < 0 || row >= map.length || col >= map.length) {
			return;
		}

		// if the tile is a number, reveal it and all surrounding tiles
		// check above
		try {
			if (map[row - 1][col] !== "*") {
				var up = document.getElementById("inner-" + (row - 1) + "-" + col);
				var outerUp = document.getElementById(row - 1 + "-" + col);
				if (up !== null) {
					if (up.innerHTML === "") {
						if (outerUp.style.backgroundColor !== "white") {
							// outerUp.style.border = "none";
							outerUp.style.backgroundColor = "white";

							// if empty then check for another empty tile
							this.revealSurroundings(map, row - 1, col);
						}
					} else {
						if (up.className !== "revealed") {
							up.className = "revealed";

							outerUp.style.backgroundColor = "#f6d852";
						}
					}
				}
			}
		} catch (e) {
			/* Ignored */
			// console.log("up" + e);
		}

		// check below
		try {
			if (map[row + 1][col] !== "*") {
				var down = document.getElementById("inner-" + (row + 1) + "-" + col);
				var outerDown = document.getElementById(row + 1 + "-" + col);

				if (down !== null) {
					if (down.innerHTML === "") {
						if (outerDown.style.backgroundColor !== "white") {
							// outerDown.style.border = "none";
							outerDown.style.backgroundColor = "white";

							// if empty then check for another empty tile
							this.revealSurroundings(map, row + 1, col);
						}
					} else {
						if (down.className !== "revealed") {
							down.className = "revealed";

							outerDown.style.backgroundColor = "#f6d852";
						}
					}
				}
			}
		} catch (e) {
			/* Ignored */
			// console.log("bellow" + e);
		}

		// check left
		try {
			if (map[row][col - 1] !== "*") {
				var left = document.getElementById("inner-" + row + "-" + (col - 1));
				var outerLeft = document.getElementById(row + "-" + (col - 1));

				if (left !== null) {
					if (left.innerHTML === "") {
						if (outerLeft.style.backgroundColor !== "white") {
							// outerLeft.style.border = "none";
							outerLeft.style.backgroundColor = "white";

							// if empty then check for another empty tile
							this.revealSurroundings(map, row, col - 1);
						}
					} else {
						if (left.className !== "revealed") {
							left.className = "revealed";

							outerLeft.style.backgroundColor = "#f6d852";
						}
					}
				}
			}
		} catch (e) {
			/* Ignored */
			// console.log("left" + e);
		}

		// check right
		try {
			if (map[row][col + 1] !== "*") {
				var right = document.getElementById("inner-" + row + "-" + (col + 1));
				var outerRight = document.getElementById(row + "-" + (col + 1));

				if (right !== null) {
					if (right.innerHTML === "") {
						if (outerRight.style.backgroundColor !== "white") {
							// outerRight.style.border = "none";
							outerRight.style.backgroundColor = "white";

							// if empty then check for another empty tile
							this.revealSurroundings(map, row, col + 1);
						}
					} else {
						if (right.className !== "revealed") {
							right.className = "revealed";

							outerRight.style.backgroundColor = "#f6d852";
						}
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

					tile.style.border = "";
					tile.style.backgroundColor = "";
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
					console.log(i + "-" + j);
					var tile = document.getElementById(i + "-" + j);
					var insideTheTile = document.getElementById("inner-" + i + "-" + j);

					if (insideTheTile.innerHTML === "") {
						// tile.style.border = "none";
						tile.style.backgroundColor = "white";
					} else if (insideTheTile.innerHTML !== "*") {
						tile.style.backgroundColor = "#f6d852";
					}
				} catch (e) {
					/* Ignored */
					// console.log("checkTiles" + e);
				}
			}
		}
	}

	checkTiles(e) {
		// this.forceUpdate();
		// check lost or not
		if (this.state.revealed) {
			if (window.confirm("You have lost the game! Would you like to reset?")) {
				this.setState({
					revealed: false,
					map: this.createMap(),
					reset: true,
				});

				this.resetTiles();
			}
		}

		// onclick, check if mine or not. if mine tell user lost
		if (e.target.getAttribute("data-tiletype") === "mines") {
			console.log("You lost!");

			alert("You step on a mine. You lost!");

			this.revealAll();

			// reveal the map
			this.setState({
				revealed: true,
				reset: false,
			});
		} else {
			console.log("You clicked on a tile");
			var x = document.getElementById("inner-" + e.target.id);

			if (x !== null) {
				if (x.className !== "revealed") {
					x.className = "revealed";

					var outer = document.getElementById(e.target.id);
					// check empty content
					if (x.innerHTML === "") {
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

					this.forceUpdate();
				}
			}
		}
	}

	render() {
		let grid = this.createMap();

		if (grid === undefined) {
			grid = this.state.mapBefore;
		}

		return (
			<div>
				<div className='form-group row text-center'>
					<div className='inline'>
						<label>dimensions</label>
						<input className='form-control' name='dimensions' type='text' minLength='1' maxLength='2' value={this.state.dimensions} onChange={this.onChange} />
					</div>
					<div className='inline'>
						<label>maxTunnels</label>
						<input className='form-control' name='maxTunnels' type='text' minLength='1' maxLength='3' value={this.state.maxTunnels} onChange={this.onChange} />
					</div>
					<div className='inline'>
						<label>maxLength</label>
						<input className='form-control' name='maxLength' type='text' minLength='1' maxLength='3' value={this.state.maxLength} onChange={this.onChange} />
					</div>
				</div>
				<table className='grid'>
					<thead>
						{grid.map((obj, row) => (
							<tr key={row}>
								{obj.map((obj2, col) => (
									<td className={this.state.revealed ? "cell-reveal" : "cell-hidden"} id={row + "-" + col} key={col} data-tiletype={obj2 === "*" ? "mines" : "notmines"} onClick={this.checkTiles}>
										<span id={"inner-" + row + "-" + col} className={this.state.revealed ? "revealed" : "hidden"} data-tiletype={obj2 === "*" ? "mines" : "notmines"}>
											{/* className={this.state.revealed ? "revealed" : "hidden"} */}
											{obj2 === "*" ? "*" : obj2 === 0 ? "" : obj2}
										</span>
									</td>
								))}
							</tr>
						))}
					</thead>
				</table>
				<div className='form-group row text-center'>
					<div className='inline'>
						<label>Cheat</label>
						<input className='form-control' name='cheat' type='button' onClick={this.mapCheat} />
					</div>
				</div>
			</div>
		);
	}
}
export default App;
