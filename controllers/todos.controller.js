const ToDosServices = require('../services/todos.service');
const { v4: uuidv4 } = require('uuid');

class ToDosControllers {
    async getToDos() {
        const toDos = await ToDosServices.getToDos();
        return toDos;
    }

    async createToDo(toDo, user) {
        const toDos = await ToDosServices.getToDos();
        const foundUser = toDos.find((item) => item.id === user.id);
        toDo.isCompleted = false;
        toDo.id = uuidv4();
        foundUser.task.push(toDo);
        await ToDosServices.createToDo(toDos);
        return toDo;
    }

    async patchToDo(newTitle, id, user) {
        const toDos = await ToDosServices.getToDos();
        const foundUser = toDos.find((item) => item.id === user.id);
        if (!foundUser.task.find((item) => item.id == id)) {
            throw new Error('no find title task');
        }
        const updatedToDo = foundUser.task.map((item) =>
            item.id === id ? Object.assign(item, newTitle) : item
        );
        foundUser.task.splice(0, foundUser.task.length, ...updatedToDo);
        await ToDosServices.createToDo(toDos);
        return foundUser.task.find((item) => item.id === id);
    }
    async deleteToDo(id, user) {
        const toDos = await ToDosServices.getToDos();
        const foundUser = toDos.find((item) => item.id === user.id);
        if (!foundUser.task.find((item) => item.id == id)) {
            throw new Error('no find task');
        }
        foundUser.task = foundUser.task.filter((item) => item.id !== id);
        await ToDosServices.createToDo(toDos);
        return true;
    }

    async patchToDoStatus(id, user) {
        const toDos = await ToDosServices.getToDos();
        const foundUser = toDos.find((item) => item.id === user.id);
        const updatedToDo = foundUser.task.find((item) => item.id === id);
        if (!updatedToDo) {
            throw new Error('no find title task');
        }
        updatedToDo.isCompleted = !updatedToDo.isCompleted;
        await ToDosServices.createToDo(toDos);
        return foundUser.task.find((item) => item.id === id);
    }
}
module.exports = new ToDosControllers();
