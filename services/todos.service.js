const fs = require('fs');

class ToDosServices {
    getToDos() {
        return new Promise((res, rej) => {
            fs.readFile('todo.json', 'utf8', (err, data) => {
                if (err) {
                    throw new Error('Do not read');
                }
                return res(JSON.parse(data));
            });
        });
    }

    createToDo(data) {
        return new Promise((res, rej) => {
            fs.writeFile(
                'todo.json',
                JSON.stringify(data, null, 4),
                (err, response) => {
                    if (err) {
                        throw new Error('Error');
                    }

                    return res({
                        message: 'Completed.',
                    });
                }
            );
        });
    }
}

module.exports = new ToDosServices();
