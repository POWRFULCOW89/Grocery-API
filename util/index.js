/* 
    Removing all properties with falsy values to ease
    modification of records instead of manually checking each one.
*/
const sanitizeJSON = obj => {
    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            const val = obj[key];
            
            if (!val) delete obj[key];
        }
    }
    
    return obj;
}

module.exports = {
    sanitizeJSON
}