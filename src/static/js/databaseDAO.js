let { remote } = require('electron');
let { databases } = remote.require("./main.js");

class DatabaseDAO {
    constructor(databaseName) {
        this.db = databases[databaseName];
    }

    async insert(data) {
        return await this.db.insert(data);
    }

    async update(dataToUpdate, newData) {
        return await this.db.update(dataToUpdate, newData, {});
    }

    async find(data) {
        return await this.db.find(data);
    }

    async countElementsFrom(data) {
        return await this.db.count(data);
    }

    async remove(username) {
        return await this.db.remove({ username: username }, {});
    }
}

module.exports = DatabaseDAO;