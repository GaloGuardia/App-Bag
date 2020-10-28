let { remote } = require('electron');
let { databases } = remote.require("./main.js");

class DatabaseDAO {
    constructor(databaseName) {
        this.db = databases[databaseName];
    }

    async insert(data) {
        return await this.db.insert(data);
    }

    async update(dataToUpdate, dataToReplace) {
        // dataToReplace debe contener toda la linea a modificar, usar find(dataToUpdate).
        return await this.db.update(dataToUpdate, dataToReplace, {}).then((dataUpdated) => {
            // numReplaced = 1
            // The doc #3 has been replaced by { _id: 'id3', planet: 'Pluton' }
            // Note that the _id is kept unchanged, and the document has been replaced
            // (the 'system' and inhabited fields are not here anymore)
            return dataUpdated;
        }).catch((err) => {
            alert(err);
        });
    }

    async find(data) {
        return await this.db.find(data);
    }

    async countElementsFrom(data) {
        return await this.db.count(data);
    }

    async remove(id) {
        return await this.db.remove({ _id: id }, {}).then((value) => {
            // value = 1
            return value;
        }).catch((err) => {
            alert(err);
        });
    }
}

module.exports = DatabaseDAO;