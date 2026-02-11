const assert = require('node:assert');
const test = require('node:test');

const whosit = require('../index');

test('Western Order', { concurrency: true }, async (t) => {
    t.test('Shawn', () => {
        const name = whosit.parse('Shawn');
        assert.equal(name.first, 'Shawn');
    });

    t.test('Shawn Miller', () => {
        const name = whosit.parse('Shawn Miller');
        assert.equal(name.first, 'Shawn');
        assert.equal(name.last, 'Miller');
    });

    t.test(' Shawn  Miller ', () => {
        const name = whosit.parse(' Shawn  Miller ');
        assert.equal(name.first, 'Shawn');
        assert.equal(name.last, 'Miller');
    });

    t.test('Shawn Michael Miller', () => {
        const name = whosit.parse('Shawn Michael Miller');
        assert.equal(name.first, 'Shawn');
        assert.equal(name.middle, 'Michael');
        assert.equal(name.last, 'Miller');
    });

    t.test('Mr. Shawn Michael Miller', () => {
        const name = whosit.parse('Mr. Shawn Michael Miller');
        assert.equal(name.salutation, 'Mr.');
        assert.equal(name.first, 'Shawn');
        assert.equal(name.middle, 'Michael');
        assert.equal(name.last, 'Miller');
    });

    t.test('Shawn Michael Miller Sr', () => {
        const name = whosit.parse('Shawn Michael Miller Sr');
        assert.equal(name.first, 'Shawn');
        assert.equal(name.middle, 'Michael');
        assert.equal(name.last, 'Miller');
        assert.equal(name.suffix, 'Sr');
    });

    t.test('Mr. Shawn Michael Miller Sr.', () => {
        const name = whosit.parse('Mr. Shawn Michael Miller Sr.');
        assert.equal(name.salutation, 'Mr.');
        assert.equal(name.first, 'Shawn');
        assert.equal(name.middle, 'Michael');
        assert.equal(name.last, 'Miller');
        assert.equal(name.suffix, 'Sr.');
    });

    t.test('Mister Rogers', () => {
        const name = whosit.parse('Mister Rogers');
        assert.equal(name.salutation, 'Mister');
        assert.equal(name.last, 'Rogers');
    });

    t.test('Doctor Who', () => {
        const name = whosit.parse('Doctor Who');
        assert.equal(name.salutation, 'Doctor');
        assert.equal(name.last, 'Who');
    });

    t.test('Dr. Dre', () => {
        const name = whosit.parse('Dr. Dre');
        assert.equal(name.salutation, 'Dr.');
        assert.equal(name.last, 'Dre');
    });

    t.test('Prof. Plum', () => {
        const name = whosit.parse('Prof. Plum');
        assert.equal(name.salutation, 'Prof.');
        assert.equal(name.last, 'Plum');
    });

    t.test('Professor Plum', () => {
        const name = whosit.parse('Professor Plum');
        assert.equal(name.salutation, 'Professor');
        assert.equal(name.last, 'Plum');
    });

    t.test('Robert Griffin III', () => {
        const name = whosit.parse('Robert Griffin III');
        assert.equal(name.first, 'Robert');
        assert.equal(name.last, 'Griffin');
        assert.equal(name.suffix, 'III');
    });

    t.test('Robert Lee Griffin III', () => {
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
test('Lexical Order', { concurrency: true }, async (t) => {
    t.test('Miller,Shawn', () => {
        const name = whosit.parse('Miller,Shawn');
        assert.equal(name.first, 'Shawn');
        assert.equal(name.last, 'Miller');
    });

    t.test('Miller, Shawn', () => {
        const name = whosit.parse('Miller, Shawn');
        assert.equal(name.first, 'Shawn');
        assert.equal(name.last, 'Miller');
    });

    t.test('Miller, Shawn, Prof.', () => {
        const name = whosit.parse('Miller, Shawn, Prof.');
        assert.equal(name.salutation, 'Prof.');
        assert.equal(name.first, 'Shawn');
        assert.equal(name.last, 'Miller');
    });

    t.test('Miller,Shawn Michael', () => {
        const name = whosit.parse('Miller,Shawn Michael');
        assert.equal(name.first, 'Shawn');
        assert.equal(name.middle, 'Michael');
        assert.equal(name.last, 'Miller');
    });

    t.test('Miller, Shawn Michael', () => {
        const name = whosit.parse('Miller, Shawn Michael');
        assert.equal(name.first, 'Shawn');
        assert.equal(name.middle, 'Michael');
        assert.equal(name.last, 'Miller');
    });

    t.test('Miller, Shawn Michael, Prof.', () => {
        const name = whosit.parse('Miller, Shawn Michael, Prof.');
        assert.equal(name.salutation, 'Prof.');
        assert.equal(name.first, 'Shawn');
        assert.equal(name.middle, 'Michael');
        assert.equal(name.last, 'Miller');
    });
});

test('Edge Cases', { concurrency: true }, async (t) => {
    t.test('null', () => {
        const name = whosit.parse(null);
        assert(name);
        assert.strictEqual(Object.keys(name).length, 0);
    });

    t.test('undefined', () => {
        let name = whosit.parse();
        assert(name);
        assert.strictEqual(Object.keys(name).length, 0);

        name = whosit.parse(undefined);
        assert(name);
        assert.strictEqual(Object.keys(name).length, 0);
    });

    t.test('empty string', () => {
        let name = whosit.parse('');
        assert(name);
        assert.strictEqual(Object.keys(name).length, 0);

        name = whosit.parse('   ');
        assert(name);
        assert.strictEqual(Object.keys(name).length, 0);
    });

    t.test('single comma', () => {
        let name = whosit.parse(',');
        assert(name);
        assert.strictEqual(Object.keys(name).length, 0);

        name = whosit.parse(' , ');
        assert(name);
        assert.strictEqual(Object.keys(name).length, 0);
    });
});

test('Complex Surnames', { concurrency: true }, async (t) => {
    t.test('Michael O Connor', () => {
        const name = whosit.parse('Michael O Connor');
        assert.equal(name.first, 'Michael');
        assert.equal(name.middle, 'O');
        assert.equal(name.last, 'Connor');
    });

    t.test('Michael O. Connor', () => {
        const name = whosit.parse('Michael O. Connor');
        assert.equal(name.first, 'Michael');
        assert.equal(name.middle, 'O.');
        assert.equal(name.last, 'Connor');
    });

    t.test('Michael O\'Connor', () => {
        const name = whosit.parse('Michael O\'Connor');
        assert.equal(name.first, 'Michael');
        assert.equal(name.last, 'O\'Connor');
    });

    t.test('Michael Ó Conchúir', () => {
        const name = whosit.parse('Michael Ó Conchúir');
        assert.equal(name.first, 'Michael');
        assert.equal(name.last, 'Ó Conchúir');
    });

    t.test('O\'Connor, Michael', () => {
        const name = whosit.parse('O\'Connor, Michael');
        assert.equal(name.first, 'Michael');
        assert.equal(name.last, 'O\'Connor');
    });

    t.test('Ó Conchúir, Michael', () => {
        const name = whosit.parse('Ó Conchúir, Michael');
        assert.equal(name.first, 'Michael');
        assert.equal(name.last, 'Ó Conchúir');
    });

    t.test('Fintan MacNeill', () => {
        const name = whosit.parse('Fintan MacNeill');
        assert.equal(name.first, 'Fintan');
        assert.equal(name.last, 'MacNeill');
    });

    t.test('Fintan Mac Néill', () => {
        const name = whosit.parse('Fintan Mac Néill');
        assert.equal(name.first, 'Fintan');
        assert.equal(name.last, 'Mac Néill');
    });

    t.test('MacNeill, Fintan', () => {
        const name = whosit.parse('MacNeill, Fintan');
        assert.equal(name.first, 'Fintan');
        assert.equal(name.last, 'MacNeill');
    });

    t.test('Mac Néill, Fintan', () => {
        const name = whosit.parse('Mac Néill, Fintan');
        assert.equal(name.first, 'Fintan');
        assert.equal(name.last, 'Mac Néill');
    });

    t.test('Joost van der Meer', () => {
        const name = whosit.parse('Joost van der Meer');
        assert.equal(name.first, 'Joost');
        assert.equal(name.last, 'van der Meer');
    });

    t.test('van der Meer, Joost', () => {
        const name = whosit.parse('van der Meer, Joost');
        assert.equal(name.first, 'Joost');
        assert.equal(name.last, 'van der Meer');
    });

    t.test('Van Morrison', () => {
        const name = whosit.parse('Van Morrison');
        assert.equal(name.first, 'Van');
        assert.equal(name.last, 'Morrison');
    });

    t.test('Beyoncé Knowles-Carter', () => {
        const name = whosit.parse('Beyoncé Knowles-Carter');
        assert.equal(name.first, 'Beyoncé');
        assert.equal(name.last, 'Knowles-Carter');
    });

    t.test('Maria de la Cruz', () => {
        const name = whosit.parse('Maria de la Cruz');
        assert.equal(name.first, 'Maria');
        assert.equal(name.last, 'de la Cruz');
    });
});
