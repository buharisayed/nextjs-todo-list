import connectDb from "@/db";
import Todo from "@/models/todo";

connectDb();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const todos = await Todo.find({});
    res.status(200).json(todos);
  } else if (req.method === 'POST') {
    const { text } = req.body;
    const todo = new Todo({ text });
    await todo.save();
    res.status(201).json(todo);
  } else if (req.method === 'DELETE') {
    const { id } = req.query; // Assuming you're using query parameters
    try {
      await Todo.findByIdAndDelete(id);
      res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting todo' });
    }
  }
}
