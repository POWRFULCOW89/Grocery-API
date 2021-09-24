/* 
    Removing all properties with falsy values to ease
    modification of records instead of manually checking each one,
    including empty objects and arrays.
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