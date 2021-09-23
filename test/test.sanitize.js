const chai = require('chai');
const expect = chai.expect;

const { sanitizeJSON } = require('../util');

describe('Sanitización de JSON', () => {
    it('should remove all empty fields', done => {
        const obj = {
            name: "Diego",
            age: "",
            occupation: null,
            house: undefined,
            school: "BEDU"
        }

        const obj2 = {
            usuario: "Diego", 
            email: "d@d.d",
            password: 'd',
            rol: false
        }

        expect(sanitizeJSON(obj)).to.deep.equal({ name: "Diego", school: "BEDU" });
        expect(sanitizeJSON(obj2)).to.deep.equal({
            usuario: "Diego", 
            email: "d@d.d",
            password: 'd'
        });
        done();
    })
})