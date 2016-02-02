/*
 * Gestione della Mappa
 * floor  = 0				tiles
 * tunnel = 1 				camminabili
 *   door = 2
 * empty  = 3
 * horizontal wall = 4
 * vertical wall = 5
 * 
 */
 var dungeon = new Array();
 for (var i = 0; i < R.mapHeight; i++)
	dungeon[i] = new Array();
 
 /* Oggetto stanza */
function room(y1, x1, y2, x2) {
	this.row1 = y1;
	this.col1 = x1;
	this.row2 = y2;
	this.col2 = x2;
}

/* matrice delle stanze */
var rooms = new Array();

/*
 * Disegna il rettangolo di mappa compreso tra le 2 coordinate
 */
function drawMap(row1,col1,row2,col2) {
	//var temp;
	for (var row = row1; row <= row2; row++) {
		for (var col = col1; col <= col2; col++) {
			switch (dungeon[row][col]) {
				case 0:  //FLOOR
					if (player.room > -1) {
						$(divMat[row][col]).css('background-position-y', -2*R.tileHeight);
						$(divMat[row][col]).css('background-position-x', -14*R.tileWidth);
					} else {
						$(divMat[row][col]).css('background-position-y', 0);
						$(divMat[row][col]).css('background-position-x', 0);
					}					
					break;
				case 1:  //TUNNEL
					$(divMat[row][col]).css('background-position-y', -2*R.tileHeight);
					$(divMat[row][col]).css('background-position-x', -3*R.tileWidth);
					break;
				case 2:  //DOOR
					$(divMat[row][col]).css('background-position-y', -2*R.tileHeight);
					$(divMat[row][col]).css('background-position-x', -11*R.tileWidth);
					break;
				case 3:  //EMPTY
					$(divMat[row][col]).css('background-position-y', 0);
					$(divMat[row][col]).css('background-position-x', 0);
					break;
				case 4:  //HORIZONTAL WALL
					$(divMat[row][col]).css('background-position-y', -2*R.tileHeight);
					$(divMat[row][col]).css('background-position-x', -13*R.tileWidth);
					break;
				case 5:  //VERTICAL WALL
					$(divMat[row][col]).css('background-position-y', -7*R.tileHeight);
					$(divMat[row][col]).css('background-position-x', -12*R.tileWidth);
					break;
			}
		}
	}
}
