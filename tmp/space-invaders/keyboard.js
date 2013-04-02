/**
 * @author Cesar Valdez
 */


	//====================================================================
			//
			//		gestion de teclado.
			//
			//====================================================================


			var autoFire = false; 

			function doKeyDown(evt) {

				var translate;
				var numlock = {};
				translate = evt.keyCode;		
				
				if(translate == 39){nave.move_max_x = true;}
				if(translate == 37){nave.move_min_x = true; }
				
				if(!autoFire){
					if(translate == 32){nave.shoot = true; autoFire= true;}
				}else{
					nave.shoot = false; 
				}
				
				//alert(translate);
			}
		
		
			function doKeyUp(evt){
				var translate;
				var numlock = {};
				translate = evt.keyCode;
			
				if(translate == 39)nave.move_max_x = false;
				if(translate == 37)nave.move_min_x = false;
				if(translate == 32){nave.shoot = false; autoFire= false; }
			}