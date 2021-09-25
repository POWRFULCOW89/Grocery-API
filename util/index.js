/* 
    Eliminando todas las propiedades con valores de tipo 'falsy',
    para facilitar la modificación de registros. También se eliminan objetos vacíos
*/
const sanitizeJSON = obj => {
    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            const val = obj[key];
            
            if (!val || !val?.length) delete obj[key];
        }
    }
    
    return obj;
}

module.exports = {
    sanitizeJSON
}