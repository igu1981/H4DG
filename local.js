/********************Proyecto '¿y ahora que?' para el h4Gijón*************/ 
var salidasProfesionales = new Array();/*registaría cada entrada, se accedería local o DB*/
var opacidad_temporal = 1;/*lleva el control de la opacidad del sobrefondo*/

//esta funcion devuelve un objeto 'salidaProfesional'
//nombre es un string, motivaciones y habilidades son arrays
function asignarSalida(nombre,motivaciones,habilidades){
       
	   salidasProfesionales[nombre] = new Object();
	   salidasProfesionales[nombre].motivaciones = motivaciones;
	   salidasProfesionales[nombre].habilidades = habilidades;
	   
}

var intereses_mostrados = new Array();/*almacena los intereses mostrados*/
var habilidades_mostradas = new Array();/*almacena las habilidades*/

/*esta función devuelve las salidas laborales que devuelvan coincidencias. Realiza una busqueda de las dos arrays asociadas. Hace tres busquedas para establecer un orden de prioridad. Eso es mejorable*/
function  obtenerSalidas(){

      var posibles_salidas = new Array();
      var i;var e;var t;var a;
	  var keys = Object.keys(salidasProfesionales);	 
	 
	 //UNO: comprueba que haya intereses y habilidades comunes comparando cada caso      
	 for(i=0; i < keys.length;i++){
	       var uno = false;
		   for(e = 0;e < intereses_mostrados.length;e++){
		       a = salidasProfesionales[keys[i]].motivaciones;/*acumula temporalmente las listas de cada destino profesional*/
			   for(t=0; t < a.length;t++){
		           if(intereses_mostrados[e] == a[t]) uno = true;
				   }
		   }
		   var dos = false;
		   for(e = 0;e < habilidades_mostradas.length;e++){
		            a = salidasProfesionales[keys[i]].habilidades;
					for(t=0; t < a.length;t++){
		           if(habilidades_mostradas[e] == a[t]) dos = true;
				   }
		   }
		   if(uno && dos) posibles_salidas.push(keys[i]);
	  }
	  
	   //DOS: comprueba en base a las habilidades
	 for(i=0; i < keys.length;i++){
	       var uno = false;
		   for(e = 0;e < habilidades_mostradas.length;e++){
		         a = salidasProfesionales[keys[i]].habilidades;
					for(t=0; t < a.length;t++){
		        if(habilidades_mostradas[e] == a[t]){
		         if(posibles_salidas.indexOf(keys[i]) == -1) posibles_salidas.push(keys[i]);
				 }
			 }
		   }

	  }
	  
	    //TRES: comprueba en base a las motivaciones
	 for(i=0; i < keys.length;i++){
	       var uno = false;
		   for(e = 0;e < intereses_mostrados.length;e++){        
		   
		          a = salidasProfesionales[keys[i]].motivaciones;/*acumula temporalmente las listas de cada destino profesional*/
			   for(t=0; t < a.length;t++){
		         if(intereses_mostrados[e] == a[t]){
		         if(posibles_salidas.indexOf(keys[i]) == -1) posibles_salidas.push(keys[i]);
				    }
				 }
		   }

	  }
	  
	  
	  //da un valor, si no se ha econtrado nada
	  if(posibles_salidas.length == 0) posibles_salidas = ['te recomendamos el sector servicios multiservicial'];
	  //y devuelve el resultado
	  return posibles_salidas;

}



/*función de testeo*/
function probar(){
    intereses_mostrados = ['cine'];
	habilidades_mostradas = ['diletante'];
	asignarSalida('carnicero',['patinete'],['vaguear']);
	asignarSalida('panadero',['facebook'],['suspender']);
	asignarSalida('galán de cine',['cine'],['rapear']);
	var p_salidas = obtenerSalidas();
	
	//limpia el DIV prueba y los va rellenando.
	document.getElementById('prueba').innerHTML = '';
	var i=0;
	for(i=0;i < p_salidas.length;i++){
	    document.getElementById('prueba').innerHTML += p_salidas[i];
		document.getElementById('prueba').innerHTML += '<br>';
	}
}
/*El testeo funcionó correctamente*/

//Esta función controla la opacidad del sobrefondo si se le dan
//el paso en el que se está y el total de pasos.
function fundido_Fondo(paso_actual,pasos){
    
	//cuanta opacidad le corresponde según el número de pasos
	var porcion = 1/pasos;
	var opacidad_temporal = porcion * paso_actual;
	
	//finalmente, le cambia la opacidad 
	//se supone que el ID es "tapa_fondo"
	document.getElementById('tapa_fondo').style.opaciity = opacidad_temporal;
}

//



