const assert = require('assert');
const { describe, it } = require('node:test');
const whosit = require('../lib');

describe('Western Order', function() {
    it('Shawn', function() {
        const name = whosit.parse('Shawn');
        assert.equal(name.first, 'Shawn');
    });

    it('Shawn Miller', function() {
        const name = whosit.parse('Shawn Miller');
        assert.equal(name.first, 'Shawn');
        assert.equal(name.last, 'Miller');
    });

    it(' Shawn  Miller ', function() {
        const name = whosit.parse(' Shawn  Miller ');
        assert.equal(name.first, 'Shawn');
        assert.equal(name.last, 'Miller');
    });

    it('Shawn Michael Miller', function() {
        const name = whosit.parse('Shawn Michael Miller');
        assert.equal(name.first, 'Shawn');
        assert.equal(name.middle, 'Michael');
        assert.equal(name.last, 'Miller');
    });

    it('Mr. Shawn Michael Miller', function() {
        const name = whosit.parse('Mr. Shawn Michael Miller');
        assert.equal(name.salutation, 'Mr.');
        assert.equal(name.first, 'Shawn');
        assert.equal(name.middle, 'Michael');
        assert.equal(name.last, 'Miller');
    });

    it('Shawn Michael Miller Sr', function() {
        const name = whosit.parse('Shawn Michael Miller Sr');
        assert.equal(name.first, 'Shawn');
        assert.equal(name.middle, 'Michael');
        assert.equal(name.last, 'Miller');
        assert.equal(name.suffix, 'Sr');
    });

    it('Mr. Shawn Michael Miller Sr.', function() {
        const name = whosit.parse('Mr. Shawn Michael Miller Sr.');
        assert.equal(name.salutation, 'Mr.');
        assert.equal(name.first, 'Shawn');
        assert.equal(name.middle, 'Michael');
        assert.equal(name.last, 'Miller');
        assert.equal(name.suffix, 'Sr.');
    });

    it('Mister Rogers', function() {
        const name = whosit.parse('Mister Rogers');
        assert.equal(name.salutation, 'Mister');
        assert.equal(name.last, 'Rogers');
    });

    it('Doctor Who', function() {
        const name = whosit.parse('Doctor Who');
        assert.equal(name.salutation, 'Doctor');
        assert.equal(name.last, 'Who');
    });

    it('Dr. Dre', function() {
        const name = whosit.parse('Dr. Dre');
        assert.equal(name.salutation, 'Dr.');
        assert.equal(name.last, 'Dre');
    });

    it('Prof. Plum', function() {
        const name = whosit.parse('Prof. Plum');
        assert.equal(name.salutation, 'Prof.');
        assert.equal(name.last, 'Plum');
    });

    it('Professor Plum', function() {
        const name = whosit.parse('Professor Plum');
        assert.equal(name.salutation, 'Professor');
        assert.equal(name.last, 'Plum');
    });

    it('Robert Griffin III', function() {
        const name = whosit.parse('Robert Griffin III');
        assert.equal(name.first, 'Robert');
        assert.equal(name.last, 'Griffin');
        assert.equal(name.suffix, 'III');
    });

    it('Robert Lee Griffin III', function() {
        const name = whosit.parse('Robert Lee Griffin III');
        assert.equal(name.first, 'Robert');
        assert.equal(name.middle, 'Lee');
        assert.equal(name.last, 'Griffin');
        assert.equal(name.suffix, 'III');
    });
});

// http://en.wikipedia.org/wiki/Personal_name#Lexical_order
// http://en.wikipedia.org/wiki/Surname#Order_of_names
// https://github.com/stores-com/whosit/pull/1
describe('Lexical Order', function() {
    it('Miller,Shawn', function() {
        const name = whosit.parse('Miller,Shawn');
        assert.equal(name.first, 'Shawn');
        assert.equal(name.last, 'Miller');
    });

    it('Miller, Shawn', function() {
        const name = whosit.parse('Miller, Shawn');
        assert.equal(name.first, 'Shawn');
        assert.equal(name.last, 'Miller');
    });

    it('Miller, Shawn, Prof.', function() {
        const name = whosit.parse('Miller, Shawn, Prof.');
        assert.equal(name.salutation, 'Prof.');
        assert.equal(name.first, 'Shawn');
        assert.equal(name.last, 'Miller');
    });

    it('Miller,Shawn Michael', function() {
        const name = whosit.parse('Miller,Shawn Michael');
        assert.equal(name.first, 'Shawn');
        assert.equal(name.middle, 'Michael');
        assert.equal(name.last, 'Miller');
    });

    it('Miller, Shawn Michael', function() {
        const name = whosit.parse('Miller, Shawn Michael');
        assert.equal(name.first, 'Shawn');
        assert.equal(name.middle, 'Michael');
        assert.equal(name.last, 'Miller');
    });

    it('Miller, Shawn Michael, Prof.', function() {
        const name = whosit.parse('Miller, Shawn Michael, Prof.');
        assert.equal(name.salutation, 'Prof.');
        assert.equal(name.first, 'Shawn');
        assert.equal(name.middle, 'Michael');
        assert.equal(name.last, 'Miller');
    });
});

describe('Edge Cases', function() {
    it('null', function() {
        const name = whosit.parse(null);
        assert(name);
        assert.strictEqual(Object.keys(name).length, 0);
    });

    it('undefined', function() {
        let name = whosit.parse();
        assert(name);
        assert.strictEqual(Object.keys(name).length, 0);

        name = whosit.parse(undefined);
        assert(name);
        assert.strictEqual(Object.keys(name).length, 0);
    });

    it('empty string', function() {
        let name = whosit.parse('');
        assert(name);
        assert.strictEqual(Object.keys(name).length, 0);

        name = whosit.parse('   ');
        assert(name);
        assert.strictEqual(Object.keys(name).length, 0);
    });

    it('single comma', function() {
        let name = whosit.parse(',');
        assert(name);
        assert.strictEqual(Object.keys(name).length, 0);

        name = whosit.parse(' , ');
        assert(name);
        assert.strictEqual(Object.keys(name).length, 0);
    });
});

describe('Complex Surnames', function() {
    it('Michael O Connor', function() {
        const name = whosit.parse('Michael O Connor');
        assert.equal(name.first, 'Michael');
        assert.equal(name.middle, 'O');
        assert.equal(name.last, 'Connor');
    });
    it('Michael O. Connor', function() {
        const name = whosit.parse('Michael O. Connor');
        assert.equal(name.first, 'Michael');
        assert.equal(name.middle, 'O.');
        assert.equal(name.last, 'Connor');
    });
    it('Michael O\'Connor', function() {
        const name = whosit.parse('Michael O\'Connor');
        assert.equal(name.first, 'Michael');
        assert.equal(name.last, 'O\'Connor');
    });
    it('Michael Ó Conchúir', function() {
        const name = whosit.parse('Michael Ó Conchúir');
        assert.equal(name.first, 'Michael');
        assert.equal(name.last, 'Ó Conchúir');
    });
    it('O\'Connor, Michael', function() {
        const name = whosit.parse('O\'Connor, Michael');
        assert.equal(name.first, 'Michael');
        assert.equal(name.last, 'O\'Connor');
    });
    it('Ó Conchúir, Michael', function() {
        const name = whosit.parse('Ó Conchúir, Michael');
        assert.equal(name.first, 'Michael');
        assert.equal(name.last, 'Ó Conchúir');
    });
    it('Fintan MacNeill', function() {
        const name = whosit.parse('Fintan MacNeill');
        assert.equal(name.first, 'Fintan');
        assert.equal(name.last, 'MacNeill');
    });
    it('Fintan Mac Néill', function() {
        const name = whosit.parse('Fintan Mac Néill');
        assert.equal(name.first, 'Fintan');
        assert.equal(name.last, 'Mac Néill');
    });
    it('MacNeill, Fintan', function() {
        const name = whosit.parse('MacNeill, Fintan');
        assert.equal(name.first, 'Fintan');
        assert.equal(name.last, 'MacNeill');
    });
    it('Mac Néill, Fintan', function() {
        const name = whosit.parse('Mac Néill, Fintan');
        assert.equal(name.first, 'Fintan');
        assert.equal(name.last, 'Mac Néill');
    });
    it('Joost van der Meer', function() {
        const name = whosit.parse('Joost van der Meer');
        assert.equal(name.first, 'Joost');
        assert.equal(name.last, 'van der Meer');
    });
    it('van der Meer, Joost', function() {
        const name = whosit.parse('van der Meer, Joost');
        assert.equal(name.first, 'Joost');
        assert.equal(name.last, 'van der Meer');
    });
    it('Van Morrison', function() {
        const name = whosit.parse('Van Morrison');
        assert.equal(name.first, 'Van');
        assert.equal(name.last, 'Morrison');
    });
    it('Beyoncé Knowles-Carter', function() {
        const name = whosit.parse('Beyoncé Knowles-Carter');
        assert.equal(name.first, 'Beyoncé');
        assert.equal(name.last, 'Knowles-Carter');
    });
    it('Maria de la Cruz', function() {
        const name = whosit.parse('Maria de la Cruz');
        assert.equal(name.first, 'Maria');
        assert.equal(name.last, 'de la Cruz');
    });
});