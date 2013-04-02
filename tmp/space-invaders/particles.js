/**
 * @author Cesar Valdez
 */

function Particle() {
	this.x = 0;
	this.y = 0;
	this.angle = 0;
	this.tamano = 0;
	this.destino = 0;
	this.visible = true;
	this.green = 20;
	this.yellow = 26;
	this.esfera_size= 0;
	
}

function Explode() {
	this.particle_matrix = new Array();
	this.is_state_over = false;
	this.pos_x = 0;
	this.pos_y = 0;

}
var explodeArray = new Array();
var explodeX;
var explodeY;
var explCnt = 0;

function generateParticles(explodeX,explodeY, size, expansion, part_size) {

	var explosion = new Explode();
	var particulas;
	for(var i = 0; i < expansion; i++) {
		particulas = new Particle();

		particulas.destino = Math.random() * size;
		particulas.tamano = Math.random() * 5;
		explX = explodeX;
		explY = explodeY;

		particulas.angle = Math.random() * (Math.PI * 2);
		particulas.x = Math.cos(particulas.angle) * particulas.tamano + explodeX;
		particulas.y = Math.sin(particulas.angle) * particulas.tamano + explodeY;

		explosion.particle_matrix[i] = particulas;
		
		particulas.esfera_size= part_size;

	}

	explosion.pos_x = explodeX;
	explosion.pos_y = explodeY;
	explosion.is_state_over = false;

	if(explodeArray.length == 0) {
		explodeArray[0] = explosion;
	} else {
		var counter = -1;
		var reserve_memory = true;
		for(var i = 0; i < explodeArray.length; i++) {
			if(explodeArray[i].particle_matrix.length === 0) {
				counter++;
				explodeArray[i] = explosion;
				reserve_memory = false;
				break;
			}

		};
		if(counter == -1)
			counter = explodeArray.length;
		if(reserve_memory)
			explodeArray[counter] = explosion;
	}

}

function explodeAnim(delta, ctx) {

	var calc_frame = delta / 5;

	for(var x = 0; x < explodeArray.length; x++) {
		//recuperando matrix.
		if(explodeArray[x] == null)
			break;

		var escenario_particle = null;
		escenario_particle = explodeArray[x].particle_matrix;

		for(var i = 0; i < escenario_particle.length; i++) {
			var particle = escenario_particle[i];

			if(particle != null) {
				if(particle.tamano < particle.destino) {

					particle.tamano += calc_frame;
					particle.x = Math.cos(particle.angle) * particle.tamano + explodeArray[x].pos_x;
					particle.y = Math.sin(particle.angle) * particle.tamano + explodeArray[x].pos_y;

				} else {
					particle.visible = false;
					particle = null;
					//escenario_particle[i] = particle;
					escenario_particle.splice(i, 1);
					break;
				}
				particle.green += 1;
				
				if(particle.green > 255 )particle.green =0;
				ctx.fillStyle = "rgba(247, " + 250 + ", 250, 1)";
				ctx.fillRect(particle.x, particle.y, particle.esfera_size, particle.esfera_size);
			}
		};

	};

}