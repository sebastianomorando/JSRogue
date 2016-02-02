/*
  * Funzione collisionManger per il controllo delle collisioni
  */
function clsnMan() {
	if ((dungeon[player.y][player.x] > 2) || clsnMon())
		return false;
	else
		return true;
}//Gestione delle collisioni con i mostri:
//TODO: vettore con tutti i mostri istanziati
//scorre il vettore per vedere se un mostro collide con il protagonista

/*
 * Funzione per verificare in quale stanza � il player
 */
 
 function whichRoom(x,y) {
	for (var i = 0; i < rooms.length; i++) {
		if (((y >= rooms[i].row1) && (y <= rooms[i].row2)) && ((x >= rooms[i].col1) && (x <= rooms[i].col2))) 
			return i;
		
		}
	return -1;
 }
 
 function key_code(k) {
 	switch (k) {
 		case 37:
 			return 'left';
 			break;
 		case 38:
 			return 'up'
 			break;
 		case 39:
 			return 'right'
 			break;
 		case 40:
 			return 'down'
 			break;
 		default:
 			return String.fromCharCode(k);
 	}
 		
 } 

/*
 * Gestione dei Movimenti del Player
 */
jwerty.key("[←-↓]/.",function(e){
	var key = key_code(e.keyCode); 
	if (state == "play") {
		play(key);
	}
});

jwerty.key("i", function(e){
	if (state == "play") {
		drawInventory();
		state = "inventory";
	} else if (state == "inventory"){
		$("#inventory").empty();
		state = "play";
	}
});

jwerty.key("[a-z]",function(e){
	if(state == "play") {
		if(jwerty.is("w",e)) {
		log("wield what?");
		state = "wield";
		drawInventory();
		}
	} else if (state == "wield"){
		var temp = e.keyCode-65;
		if (player.inventory[temp] != undefined) {
			if (player.inventory[temp].whatis == "weapon") {
				player.inHand = temp;
				
			} else {
				log ("is not a weapon");
			}
		} else {
			log ("not in inventory");
		}
	$("#inventory").empty();
	state = "play";
	} else if (state == "wear"){
		var temp = e.keyCode-65;
		if (player.inventory[temp] != undefined) {
			if (player.inventory[temp].whatis == "armor") {
				player.wearing = temp;
				
			} else {
				log ("is not armor");
			}
		} else {
			log ("not in inventory");
		}
	drawStats();
	$("#inventory").empty();
	state = "play";
	}
});

jwerty.key("shift+w",function(e){
	if (state == "play") {
		log("wear what?");
		state = "wear";
		drawInventory();
	}
});
