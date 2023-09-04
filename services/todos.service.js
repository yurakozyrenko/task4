const fs = require('fs');

class ToDosServices {
    getToDos() {
        return new Promise((res, rej) => {
            fs.readFile('data.json', 'utf8', (err, data) => {
                if (err) {
                    throw new Error('Do not read');
                }
                return res(JSON.parse(data));
            });
        });
    }

    createToDo(data) {
        return new Promise((res, rej) => {
            fs.writeFile('data.json', JSON.stringify(data,null,4), (err, response) => {
                if (err) {
                    throw new Error('Do not create');
                }

                return res({
                    message: 'toDo created.',
                });
            });
        });
    }

    updateToDo(data) {
        return new Promise((res, rej) => {
            fs.writeFile('data.json', JSON.stringify(data), (err, response) => {
                if (err) return res(false);

                return res({
                    message: 'Todo updated.',
                });
            });
        });
    }

    deleteToDo(data) {
        return new Promise((res, rej) => {
            fs.writeFile('data.json', JSON.stringify(data), (err, response) => {
                if (err) return res(false);

                return res({
                    message: 'ToDo deleted.',
                });
            });
        });
    }
}

module.exports = new ToDosServices();
