/*
 * Mostri
 */
 
 function monster() {
	this.x = 3;
	this.y = 3;
	this.hits = 5;
	this.armor = 3;
	this.damage = "1d8";
	this.name = "";
	this.tile = 65;
	this.n = 0;
	this.div;
	this.room = 0;
	this.turn = function () {}; //function executed every turn
 }
 
 function iceMonster() {
	this.hits = 10;
	this.name = "Ice Monster";
	this.tile = "I";
	
 } iceMonster.prototype = new monster();
 
function bat() {
	this.hits = 3;
	this.name = "bat";
	this.tile = "B";
	var tempx, tempy;
	this.turn = function () {
		tempx = this.x + Math.floor(Math.random()*5) - 2;	// bat moves randomly 2 tiles per turn
		tempy = this.y + Math.floor(Math.random()*5) - 2;
		if (dungeon[tempy][tempx] < 3) {
			this.x = tempx;
			this.y = tempy;
			this.room = whichRoom(this.x,this.y);
		}
	}
	
 } bat.prototype = new monster();
 
 function hobgoblin() {
	this.hits = 30;
	this.name = "hobgoblin";
	this.tile = "H";
	this.x = 8;
	this.y = 6;
	var tempx, tempy;
	this.turn = function () {
		var minX = 50;
		var minY = 50;
		for (var i = -1; i < 2;i++) { //STUPID PATHFINDING
			for (var j = -1; j <2;j++) {
				if (minX > Math.abs(this.x+i - player.x)) {
					minX = Math.abs(this.x+i - player.x)
					tempx = this.x+i;
				}
				if (minY > Math.abs(this.y+j - player.y)) {
					minY = Math.abs(this.y+j - player.y)
					tempy = this.y+j;
				}
				
			}
		}
		 
		 
		if (dungeon[tempy][tempx] < 3)  {
			if (!( (player.x == tempx) && (player.y == tempy) )) {
				this.x = tempx;
				this.y = tempy;
				this.room = whichRoom(this.x,this.y);
			} else {
				var attack = dice("1d20") + 1;
				var defense = 10 + player.armor();
				console.log("attack:"+attack+" defense:"+defense);
				if (attack >= defense) {
					var danno = dice(this.damage);
					log(this.name+" hit you doing "+danno+" damage");
					player.hits-=danno;
					//monsters[i].hits--;
				} else {
					log(this.name+" misses");
				}
			}
		}
	}
	
 } hobgoblin.prototype = new monster();
 
 monsters = new Array(); //Array contente tutti i mostri presenti nel livello
 
 function addMonster(who) {
	var n = monsters.push(who) - 1 ;
	monsters[n].n = n;
	monsters[n].div = document.createElement('div');
	$('#gamearea').append(monsters[n].div);
	$(monsters[n].div).addClass('tile');
	$(monsters[n].div).css('background-position-y', Math.floor(monsters[n].tile.charCodeAt(0) / R.tileHeight)*-R.tileHeight);
	$(monsters[n].div).css('background-position-x', (monsters[n].tile.charCodeAt(0) % R.tileHeight)*-R.tileWidth);
 }
 
 function drawMonster(i) { //dovrebbe disegnare solo i mostri presenti nella stanza con il player 
						  // o nelle caselle vicine nei tunnel //i: indice del mostro nell'array
	
		//if (player.room == monsters[i].room) {
			$(monsters[i].div).css('display','block');
			$(monsters[i].div).css('left', monsters[i].x * R.tileWidth);
			$(monsters[i].div).css('top', (monsters[i].y * R.tileHeight)+R.tileHeight);
		//} else {
			//$(monsters[i].div).css('display','none');
		//} 
 
 }
 /* verifica se il player collide con un mostro 
  * TODO: diventer� la funzione da eseguire a ogni turno
  * o inseriro la funzione da eseguire ad ogni turno 
  * qui dentro
  */
 function clsnMon() {
	var clsn = false;
	for (var i = 0; i < monsters.length; i++) {  // loop the monster's array
		
		if ((player.x == monsters[i].x) && (player.y == monsters[i].y)) {  // player and monster collides?
			
			
			//attacco
			var attack = dice("1d20") + 1;
			var defense = 10 - player.expLevel + monsters[i].armor;
			console.log("attack:"+attack+" defense:"+defense);
			if (attack >= defense) {
				var danno = player.damage();
				monsters[i].hits -= danno;
				var weapon_name = (player.inHand>-1)?player.inventory[player.inHand].name:"bare hands";
				log("You hit the "+monsters[i].name +" with "+weapon_name+" doing "+danno+" damage");
				//player.hits--;
			} else {
				log("you miss");
			}
			
			if (monsters[i].hits <= 0) {
				log("You defeat the monster. Brao.");
				$(monsters[i].div).remove();  // the div element of the monster is removed
				monsters.splice(i,1);		// the monster is removed from the array
				
			}
			
				/*
				 * how it works
				 *  attack 1d20 + 1 + any to hit modifiers.
				 *  defense 10 - the attackers level + the defenders armor
				 *  if attack >= defense, attack success
				 */
			//drawStats();
		clsn = true;
		}
		//if (monsters[i] != undefined) drawMonster(i);		// aggiorna la posizione del div del mostro
	}
	
	return clsn;
 }