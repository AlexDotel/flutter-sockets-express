const {v4 : uuidv4} = require('uuid')

class Band {

    constructor(name = 'no-name'){

        this.id = uuidv4(); //Esta libreria genera un id unico
        this.name = name;
        this.votes = 1;

    }

}

module.exports = Band;