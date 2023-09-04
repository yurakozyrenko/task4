const fs = require('fs');

class UserServices {

    getUsers() {
        return new Promise((res, rej) => {
            fs.readFile('data.json', 'utf8', (err, data) => {
                if (err) {
                    throw new Error('Do not read');
                }
                return res(JSON.parse(data));
            });
        });
    }

    createUser(data) {
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
}

module.exports = new UserServices();