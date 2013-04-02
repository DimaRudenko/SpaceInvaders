/**
 * @author Cesar Valdez
 */

var level = new Array();

level[0] = "00X00000";
level[1] = "0X0X0000";
level[2] = "00C00000";
level[3] = "0X0D00X0";
level[4] = "0XD00XD0";
level[5] = "0CDD00D0";
level[6] = "0C0DD0C0";
level[7] = "0XD0ZXD0";
level[7] = "0X0ZZCX0";

function lvloader() {
	
	var stage = new Array();
	for(var i in level) {

		var x = level[i];
		// alert(x);
		//document.write(x + "<br>");

		for(var msg in x) {
			var y = x.charAt(msg);
			//document.write(y + "     ");
			

		}
	}

}

function getEsquema(stage){
	var x = level[stage];	
	
	var tmp_array = new Array();
	
	for(var msg in x) {
		var y = x.charAt(msg);
		tmp_array[msg] = y; 
	}
	
	return tmp_array;
}



