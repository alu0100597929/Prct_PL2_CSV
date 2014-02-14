// See http://en.wikipedia.org/wiki/Comma-separated_values
"use strict"; // Use ECMAScript 5 strict mode in browsers that support it

$(document).ready(function() {
   $("button").click(function() {
     tablaCSV();
   });
 });
 
 
 
function tablaCSV()
{
  var datos = document.getElementById("datosIN").value;
  var regexp = /\s*"((?:[^"\\]|\\.)*)"\s*,?|\s*([^,]+),?|\s*,/g;
  var lineas = datos.split(/\n+\s*/);
  var r = [];
  var i;
  var j;

  
  if (window.localStorage)
      {
          localStorage.datosIN  = datos;
      }

  /*=========================================================
    El siguiente codigo se encarga de calcular el tamaño de filas mas comun.

    En la implementacion anterior, el tamaño de fila por defecto se asignaba al
    tamaño de la primera fila, de tal forma que el tamaño de la primera fila era
    el correcto, por tanto el tamaño de las siguientes filas era correcto si era 
    IGUAL al de la primera fila, en caso contrario era erroneo.

    El siguiente codigo compara el tamaño de todas las filas e interpreta como 
    correcto el tamaño mas comun entra las filas, independientemente de su posicion 
    en la tabla.
  =========================================================*/
  var tam = new Array(lineas.length);           //Array tam = almacena el tamaño de cada fila            
  var comp = true;

  for(i = 0; i < lineas.length; i++)
  {
      var elementos = lineas[i].match(regexp);
      tam[i] = elementos.length;
  }


  var repet = new Array(tam.length);          //Array repet = almacena el numero de veces que se repite el tamaño
  var errorTam = new Array(tam.length);       //Array errorTam = almacena false si el tamaño es el mas comun, true en caso contrario
  var num;
  var repetido;

  for(i = 0; i < tam.length; i++)
  {
    num = tam[i];
    repetido = 1;

    for(j = 0; j < tam.length; j++)
    {
      if(j != i)
      {
        if(tam[j] == num)
          {
            repetido++;
            repet[i] = repetido;
          }
          else
            {
              repet[i] = repetido;
            }
      }
    }
  }

  var max = repet[0];

  for(i = 0; i < tam.length; i++)
    { 
      if(repet[i] > max)
      {
        max = repet[i];
      }
    }

    for(i = 0; i < tam.length; i++) 
    { 
      if(repet[i] == max)
      {
        errorTam[i] = false;
      }
      else
        {
          errorTam[i] = true;
        }
        
    }

  /*=========================================================*/


  for(i = 0; i < lineas.length; i++)
  {
       var elementos = lineas[i].match(regexp);
       var resultado = [];
       var error = false;

        if(elementos)
        {

            error = errorTam[i];

            for(var j = 0; j < elementos.length; j++)
            {
                elementos[j] = elementos[j].replace(/,\s*$/,''); // Eliminar las comas
                elementos[j] = elementos[j].replace(/^\s*"/,''); // Eliminar la primera comilla doble
                elementos[j] = elementos[j].replace(/"\s*$/,''); // Eliminar la ultima comilla doble
                elementos[j] = elementos[j].replace(/\\"/,'"');  // Reemplazar las comillas escapadas por comillas dobles sin escapar
                resultado.push(elementos[j]);
            }

            var rowc = error? 'error' : '';
            r.push({ value: resultado, rowc: rowc});
        }
        else
        {
            alert("Los datos introducidos no pertenecen al formato CSV");
            error = true;
        }

  }

  var undtemplate = tabla.innerHTML;
  tablaResultados.innerHTML = _.template(undtemplate, {items: r});

}
 
 
  
 
window.onload = function() {
  if (window.localStorage && localStorage.datosIN) {
    document.getElementById("datosIN").value = localStorage.datosIN;
  }
};

