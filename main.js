/*
 * Da eseguire quando il documento � completamente caricato
 */
$(document).ready(function () {
	log("Welcome to the Dungeons of Doom");
	initDivMat();
	parseLevel("level.txt");
	drawStats();
	
});