
var assert = chai.assert;

suite('CSV', function() {
    test('Prueba con comillas dobles', function () {
        datosIN.value = 'pera, manzana\ncoco\n"kiwi, platano"';
        tablaCSV();
        var esperado = '\n        <table id="resultado" class="center">\n          \n            <tbody><tr class="error">\n              \n                <td>pera</td>\n              \n                <td> manzana</td>\n              \n            </tr>\n          \n            <tr class="">\n              \n                <td>coco</td>\n              \n            </tr>\n          \n            <tr class="">\n              \n                <td>kiwi, platano</td>\n              \n            </tr>\n          \n        </tbody></table>\n       ';

        assert.deepEqual(tablaResultados.innerHTML, esperado);
    });
    test('Prueba de almacenamiento local', function () {
        assert.deepEqual(localStorage.datosIN, 'pera, manzana\ncoco\n"kiwi, platano"');
    });
    test('Prueba normal', function () {
        datosIN.value = 'azul, rojo, verde\nblanco, negro\nvioleta, amarillo';
        tablaCSV();
        var esperado = '\n        <table id="resultado" class="center">\n          \n            <tbody><tr class="error">\n              \n                <td>azul</td>\n              \n                <td> rojo</td>\n              \n                <td> verde</td>\n              \n            </tr>\n          \n            <tr class="">\n              \n                <td>blanco</td>\n              \n                <td> negro</td>\n              \n            </tr>\n          \n            <tr class="">\n              \n                <td>violeta</td>\n              \n                <td> amarillo</td>\n              \n            </tr>\n          \n        </tbody></table>\n       ';
        assert.deepEqual(tablaResultados.innerHTML, esperado);
    });
    
});
