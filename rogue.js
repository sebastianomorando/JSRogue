/*
 * Variabili generali da inserire nella classe rogue(R)
 * in vista di futuri update:
 * charTileHeight
 * charTileWidth
 * 
 */
var R = {
	tileHeight: 16,
	tileWidth: 8,
	mapHeight: 23,
	mapWidth: 80,
	divMatHeight: 23, //dimensione della matrice dei div, che � anche
	divMatWidth: 80   //la dimensione dello spazio visualizzato
}

var state = "play"; // stati(play,menu,inventario)

var level = 1;	//Piano del dungeon

/* gestione del Player */
//var boh = new plate_mail();
var player =  {
	x : 4, //posizione del player sulla mappa
	y :  3,
	room : 0, // riferimento all'indice dell' array delle stanze, se � in un tunnel = -1, se � una porta = -2
	hits :  10,
	maxHits : 10,
	str : 10,
	maxStr : 10,
	gold : 0,
	inventory: new Array(),
	wearing : -1, // -1: nulla, altrimenti un intero che specifica la posizione nell'inventario
	inHand : 1,		// -1: bare hands idem
	armor : function () {
		if (this.wearing > -1)
			return this.inventory[this.wearing].value;
		else 
			return 0;
		},
	damage : function () {
		if (this.inHand > -1)
			return dice(this.inventory[this.inHand].damage);
		else
			return dice("1d4");
		},
	expPoints : 0,
	expLevel : 1
	}

player.inventory.push(new plate_mail());
player.inventory.push(new mace());

 //for (var i = 0; i < R.mapHeight; i++)
//	dungeon[i] = new Array();

/* matrice dei  riferimenti ai div che contengono le tiles come background 
 * ed � anche la parte di mappa visualizzata */
var divMat = new Array();
for (var i = 0; i < R.divMatHeight; i++)
	divMat[i] = new Array();





/*
 * Aggiunge al DOM del document tutti i div che conterranno le tiles
 */
function initDivMat() {
	for (var row = 0; row < R.divMatHeight; row++) {
		for (var col = 0; col < R.divMatWidth; col++) {
			divMat[row][col] = document.createElement('div');
			$('#gamearea').append(divMat[row][col]);
			$(divMat[row][col]).addClass('tile');
			$(divMat[row][col]).css('left', col * R.tileWidth);
			$(divMat[row][col]).css('top', (row * R.tileHeight)+R.tileHeight);
		}	
	}

}

/*
 * Funzione per la stampa dei messaggi per il player
 * nella parte in alto a sx dell'area di gioco
 * Conversione testo ---> ASCII tiles
 * le tiles sono da considerarsi 8x16 pixel
 * in una griglia 16x16
 */
var nmessaggi = 0;
var messaggi = new Array(); //TODO: salvare gli ultimi 50 messaggi in un array
function log (message) {
	var temp;
	nmessaggi++;
	if (nmessaggi > 20){
		$('#textarea').val("");
		nmessaggi = 0;
	}
	$('#textarea').val($('#textarea').val()+message+"\n"); 
	$('#message').empty();
	for (var i = 0; i < message.length; i++) {
		temp = document.createElement('div');
		$('#message').append(temp);
		$(temp).addClass('tile');
		$(temp).css('left',i*8);
		$(temp).css('background-position-y', (Math.floor(message.charCodeAt(i) / 16))*-16);
		$(temp).css('background-position-x', (message.charCodeAt(i) % 16) * -8 );
		
	}
 }
 
 function drawStats() {
	var temp;
	var message = 	"  Level:"+level+"     Hits:"+player.hits+"("+player.maxHits+")"
					+"    Str:"+player.str+"("+player.maxStr+")"
					+"    Gold:"+player.gold+"    Armor:"+player.armor();
					+"    Exp:"+player.expLevel+"/"+player.expPoints;
	$('#stats').empty();
	for (var i = 0; i < message.length; i++) {
		temp = document.createElement('div');
		$('#stats').append(temp);
		$(temp).addClass('tile');
		$(temp).css('left',i*8);
		$(temp).css('background-position-y', (Math.floor(message.charCodeAt(i) / 16))*-16);
		$(temp).css('background-position-x', (message.charCodeAt(i) % 16) * -8 );
		
	}
 
 
 }

function writeChar(c,x,y,div) {
	temp = document.createElement('div');
	$(div).append(temp);
	$(temp).addClass('tile');
	$(temp).css('left',x*8);
	$(temp).css('top',y*16);
	$(temp).css('background-position-y', (Math.floor(c.charCodeAt(0) / 16))*-16);
	$(temp).css('background-position-x', (c.charCodeAt(0) % 16) * -8 );
}

function writeLine(s,y,div) {
	for (var i = 0; i < s.length; i++){
		writeChar(s[i],i,y,div);
	}
}

function drawInventory() {
	var message = "Inventory:";
	writeLine(message,0,"#inventory");
	for (var i=0; i < player.inventory.length; i++) {
		message = String.fromCharCode(i+97)+") "+player.inventory[i].name;
		if (i == player.inHand) message += " (weapon in hand)";
		if (i == player.wearing) message += " (being worn)";
		writeLine(message,i+2,"#inventory");
	}
}
 