var items = new Array(); //all the items in the level
function addItem(which) {
	var n = items.push(which) - 1 ;
	items[n].n = n;
	items[n].div = document.createElement('div');
	$('#gamearea').append(items[n].div);
	$(items[n].div).addClass('tile');
	$(items[n].div).css('background-position-y', Math.floor(items[n].tile.charCodeAt(0) / R.tileHeight)*-R.tileHeight);
	$(items[n].div).css('background-position-x', (items[n].tile.charCodeAt(0) % R.tileHeight)*-R.tileWidth);
 }
 function drawItem(i) { 
	
		//if (player.room == monsters[i].room) {
			$(items[i].div).css('display','block');
			$(items[i].div).css('left', items[i].x * R.tileWidth);
			$(items[i].div).css('top', (items[i].y * R.tileHeight)+R.tileHeight);
		//} else {
			//$(monsters[i].div).css('display','none');
		//} 
 
 }

function clsnItem(){
	for (var i = 0; i < items.length; i++) {
		
		if ((player.x == items[i].x) && (player.y == items[i].y)) {  
			player.inventory.push(items[i]);
			log("you picked up "+items[i].name);
			$(items[i].div).remove();  
			items.splice(i,1);		
			
		}
	}
} 
// ARMORS
function armor() {
	this.name = "plate mail";
	this.whatis = "armor";
	this.cursed = false;
	this.value = 5;
	this.tile = "]";
	this.div;
}

function plate_mail() {
	this.value = 3;
}plate_mail.prototype = new armor();

//WEAPONS

function weapon() {
	this.name = "sword";
	this.whatis = "weapon";
	this.acc_imp = 0;
	this.dam_imp = 0;
	this.x = 0;
	this.y = 0;
	this.damage = "3d4";
	this.tile = ")";
	this.div;
	
}

function mace() {
	this.name = "polystyrene mace";
	this.damage = "2d4";
}mace.prototype = new weapon();

function dagger() {
	this.name = "talcum dagger";
	this.damage = "1d6";
}dagger.prototype = new weapon();
