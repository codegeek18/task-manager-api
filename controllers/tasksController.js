const Tasks = require('../model/Tasks');

const getAllTasks = async (req, res) => {
    const tasks = await Tasks.find();
    if (!tasks) return res.status(204).json({ 'message': 'No Tasks found.' });
    res.json(tasks);
}

const createNewTask = async (req, res) => {
    const { id, title, description, status } = req.body;
    if (!title || !description || !status) {
        return res.status(400).json({ 'message': 'Title, Description and Status are required' });
    }

    try {
        const result = await Tasks.create({
            id: id,
            title: title,
            description: description,
            status: status
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

const updateTask = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Task ID required.' });
    
    const task = await Tasks.findOne({ id: req.params.id }).exec();
    if (!task) {
        return res.status(204).json({ "message": `No task matches ID ${req.params.id}.` });
    }
    if ( req.method === 'PATCH') {
        task.status = req.body.status;
    }
    else if (req.method === 'PUT') {
        task.id = req.params.id;
        task.title = req.body.title;
        task.description = req.body.description;
        task.status = req.body.status;
    }
    const result = await task.save();
    res.json(result);
}

const deleteTask = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Task ID required.' });

    const task = await Tasks.findOne({ id: req.params.id }).exec();
    if (!task) {
        return res.status(204).json({ "message": `No Task matches ID ${req.params.id}.` });
    }
    const result = await task.deleteOne();
    res.json(result);
}


module.exports = {
    getAllTasks,
    createNewTask,
    updateTask,
    deleteTask,
}