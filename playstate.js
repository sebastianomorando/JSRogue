function play(key){	
	var isOnTunnel = false;
	var isOnDoor = false;
	var isOnFloor = false;
	if (dungeon[player.y][player.x] == 0)
		isOnFloor = true;
	if (dungeon[player.y][player.x] == 1) // controlla se il player � su un tunnel
		isOnTunnel = true;
	if (dungeon[player.y][player.x] == 2) // controlla se il player � su una porta
		isOnDoor = true;
	switch (key) {
		case 'down':
			player.y++;
			if (clsnMan())
				$('#player').css( "top", "+=16" );
			else
			player.y--;
			break;
		case 'up':
			player.y--;
			if (clsnMan())
				$('#player').css( "top", "-=16" );
			else
			player.y++;
			break;
		case 'left':
			player.x--;
			if (clsnMan())
				$('#player').css( "left", "-=8" );
			else
				player.x++;
			break;
		case 'right':
			player.x++;
			if (clsnMan())
				$('#player').css( "left", "+=8" );
			else
			player.x--;
			break;
	}

	if (isOnTunnel) {
		if (dungeon[player.y][player.x] == 2) {// � una porta
			player.room = whichRoom(player.x,player.y);
			var tempRoom = rooms[player.room];
			drawMap(tempRoom.row1, tempRoom.col1, tempRoom.row2, tempRoom.col2);
			}
			
		drawMap(player.y, player.x-1,player.y, player.x+1);
		drawMap(player.y-1, player.x,player.y+1, player.x);
	}
	
	if (isOnDoor) {
		if (dungeon[player.y][player.x] == 1) {// � un tunnel
			var tempRoom = rooms[player.room];
			player.room = -1;
			drawMap(tempRoom.row1, tempRoom.col1, tempRoom.row2, tempRoom.col2);
			drawMap(player.y, player.x-1,player.y, player.x+1);
			drawMap(player.y-1, player.x,player.y+1, player.x);
		} 
	}
	
	if (isOnFloor) {
		if (dungeon[player.y][player.x] == 2) {// � una porta
			player.room = whichRoom(player.x,player.y);
			var tempRoom = rooms[player.room];
			//drawMap(tempRoom.row1, tempRoom.col1, tempRoom.row2, tempRoom.col2);
			drawMap(player.y, player.x-1,player.y, player.x+1);
			drawMap(player.y-1, player.x,player.y+1, player.x);
			}
		
	}
	
			

	//fa agire disegna i mostri
	for (var i = 0; i < monsters.length; i++) {
		monsters[i].turn(); // what the monster do every turn
		if (monsters[i] != undefined) drawMonster(i);
	}
	
	//aggiorna le statistiche
	drawStats();
	clsnItem();	
}