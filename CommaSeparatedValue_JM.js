"use strict";

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
  var tamFilaComun = NaN;
  var r = [];
  var row = "<% _.each(items, function(name) { %>"     +
            "                    <td><%= name %></td>" +
            "              <% }); %>";

  
  if (window.localStorage)
      {
          localStorage.datosIN  = datos;
      }


  for(var i = 0; i < lineas.length; i++)
  {
       var elementos = lineas[i].match(regexp);
       var resultado = [];
       var error = false;

        if(elementos)
        {
            if (tamFilaComun && (tamFilaComun != elementos.length)) 
            {
              error = true;
            }
            else {
              tamFilaComun = elementos.length;
              error = false;
            }

            for(var j = 0; j < elementos.length; j++)
            {
                elementos[j] = elementos[j].replace(/,\s*$/,''); // Eliminar las comas
                elementos[j] = elementos[j].replace(/^\s*"/,''); // Eliminar la primera comilla doble
                elementos[j] = elementos[j].replace(/"\s*$/,''); // Eliminar la ultima comilla doble
                elementos[j] = elementos[j].replace(/\\"/,'"');  // Reemplazar las comillas escapadas por comillas dobles sin escapar
                resultado.push(elementos[j]);
            }

            var tr = error? '<tr class="error">' : '<tr>';
            r.push(tr+_.template(row, {items : resultado})+"</tr>");
        }
        else
        {
            alert("Los datos introducidos no pertenecen al formato CSV");
            error = true;
        }
      
      r.unshift('<p>\n<table class="center" id="result">');
      r.push('</table>');
      tablaResultados.innerHTML = r.join('\n');
  }
  
  
  
  



}
 
 
 
 
 
 
 
 
 
 
 
 
window.onload = function() {
  if (window.localStorage && localStorage.datosIN) {
    document.getElementById("datosIN").value = localStorage.datosIN;
  }
};
