const salutations = new Set(['doctor', 'dr', 'miss', 'mister', 'mr', 'mrs', 'ms', 'prof', 'professor']);
const suffixes = new Set(['ii', 'iii', 'iv', 'jr', 'sr', 'v']);
const surnamePrefixes = new Set(['da', 'de', 'del', 'della', 'den', 'der', 'di', 'do', 'du', 'la', 'le', 'mac', 'nic', 'ní', 'ó', 'van', 'vanden', 'vander', 'von']);

const contains = (set, key) => {
    return set.has(key.replace(/\.$/, '').toLowerCase());
};

const lexicalToWestern = (value) => {
    return String(value).split(',').reverse().join(' ');
};

exports.parse = (value) => {
    if (!value) {
        return {};
    }

    value = String(value).trim();

    if (!value) {
        return {};
    }

    if (value.includes(',')) {
        value = lexicalToWestern(value);
    }

    const name = {};
    const tokens = value.match(/\S+/g) || [];

    if (tokens[0] && contains(salutations, tokens[0])) {
        name.salutation = tokens.shift();

        // If there's only one token remaining it's the last name (Mister Rogers)
        if (tokens.length === 1) {
            name.last = tokens.shift();
        }
    }

    if (tokens.length > 2 && contains(suffixes, tokens[tokens.length - 1])) {
        name.suffix = tokens.pop();
    }

    if (tokens.length) {
        name.first = tokens.shift();
    }

    if (tokens.length > 1 && !contains(surnamePrefixes, tokens[0])) {
        name.middle = tokens.shift();
    }

    if (tokens.length) {
        name.last = tokens.join(' ');
    }

    return name;
};
