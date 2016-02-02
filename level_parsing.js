/* 
 * Level parsing da file
 * TODO: settare async : false
 * usando $.ajax invece di $.get
 * cos� da poter fare il return del valore
 */
 
 function parseLevel (filename) {   
	$.get(
		filename, 
		function(data) {
		data = data.replace(/[\r\n]/g, ""); //ELIMINA TUTTI GLI A CAPO
		// . ---> 0 floor
		// # ---> 1 tunnel
		// + ---> 2 door
		// 0 ---> 3 empty tile
		// - ---> 4 horizontal wall
		// | ---> 5 vertical wall
		// formuletta: dungeon[parte intera di i/80][resto di i/80] = data.charAt(i) convertito in numero
		var i = 0;
		var sRooms = "";
		for (i = 0; i < (R.mapWidth*R.mapHeight); i++) {
			switch(data.charAt(i)) {
				case '.':
					dungeon[Math.floor(i/R.mapWidth)][i%R.mapWidth] = 0;
				break;
				case '#':
					dungeon[Math.floor(i/R.mapWidth)][i%R.mapWidth] = 1;
				break;
				case '+':
					dungeon[Math.floor(i/R.mapWidth)][i%R.mapWidth] = 2;
				break;
				case '0':
					dungeon[Math.floor(i/R.mapWidth)][i%R.mapWidth] = 3;
				break;
				case '-':
					dungeon[Math.floor(i/R.mapWidth)][i%R.mapWidth] = 4;
				break;
				case '|':
					dungeon[Math.floor(i/R.mapWidth)][i%R.mapWidth] = 5;
				break;
			}
			
		}//alert(i);
		for(i; data.charAt(i) != 'E'; i++)
			sRooms += data.charAt(i);
		var aRooms = sRooms.split(":");
		for(var c = 0; c < aRooms.length; c++) {
			var tRoom = aRooms[c].split(",");
			rooms[c] = new room(parseInt(tRoom[0]),parseInt(tRoom[1]),parseInt(tRoom[2]),parseInt(tRoom[3]));
			
		}
		
		var tempRoom = rooms[player.room];
		drawMap(tempRoom.row1, tempRoom.col1, tempRoom.row2, tempRoom.col2);
		addItem(new dagger());
		items[0].x = 5;
		items[0].y = 5;
		drawItem(0);
		//addMonster(new bat());
		//addMonster(new bat());
		//addMonster(new bat());
		addMonster(new iceMonster());
		addMonster(new hobgoblin());
		drawMonster(0);
		drawMonster(1);
		
	}
	
	);
 
 
 }