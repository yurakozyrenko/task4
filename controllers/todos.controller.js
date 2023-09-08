const ToDosServices = require('../services/todos.service');
const { v4: uuidv4 } = require('uuid');

class ToDosControllers {
    async getToDos(user) {
        const toDos = await ToDosServices.getToDos();
        const toDo = toDos.filter((item) => item.idUser === user.id);
        return toDo;
    }

    async createToDo(toDo, user) {
        const toDos = await ToDosServices.getToDos();
        toDo.id = uuidv4();
        toDo.isCompleted = false;
        toDo.idUser = user.id;
        toDos.push(toDo);
        await ToDosServices.createToDo(toDos);
        return toDo;
    }

    async patchToDo(newTitle, id, user) {
        const toDos = await ToDosServices.getToDos();
        const toDo = toDos.filter((item) => item.idUser === user.id);
        if (toDo.length === 0) {
            throw new Error('no task for user');
        }
        const foundToDo = toDo.filter((item) => item.id === id);
        if (foundToDo.length === 0) {
            throw new Error('no find title task');
        }
        foundToDo[0].title = newTitle.title;
        await ToDosServices.createToDo(toDos);
        return foundToDo;
    }
    async deleteToDo(id, user) {
        const toDos = await ToDosServices.getToDos();
        
        const toDo = toDos.filter((item) => item.idUser === user.id);
        if (toDo.length === 0) {
            throw new Error('no task for user');
        }
        
        const foundToDo = toDo.filter((item) => item.id === id);
        if (foundToDo.length === 0) {
            throw new Error('false');
        }
        
        const newToDos = toDos.filter((item) => item.id !== id);
        await ToDosServices.createToDo(newToDos);
        return true;
    }

    async patchToDoStatus(id, user) {
        const toDos = await ToDosServices.getToDos();
        const toDo = toDos.filter((item) => item.idUser === user.id);
        if (toDo.length === 0) {
            throw new Error('no task for user');
        }

        const foundToDo = toDo.filter((item) => item.id === id);
        if (foundToDo.length === 0) {
            throw new Error('no find title task');
        }

        foundToDo[0].isCompleted = !foundToDo[0].isCompleted;
        await ToDosServices.createToDo(toDos);
        return foundToDo;
    }
}
module.exports = new ToDosControllers();
