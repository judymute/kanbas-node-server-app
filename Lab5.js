const assignment = {
  id: 1, title: "NodeJS Assignment",
  description: "Create a NodeJS server with ExpressJS",
  due: "2021-10-10", completed: false, score: 0,
};
const moduleObject = {
  id: "mod123",
  name: "Web Development",
  description: "Learn about building websites",
  course: "CS101"
};
const todos = [
  { id: 1, title: "Task 1", completed: false },
  { id: 2, title: "Task 2", completed: true },
  { id: 3, title: "Task 3", completed: false },
  { id: 4, title: "Task 4", completed: true },
];

// object state persists as long as server is running
// changes to the object persist
// rebooting server resets the object

const Lab5 = (app) => { // accept app reference to express module

  app.post("/a5/todos", (req, res) => {
    const newTodo = {
      ...req.body,
      id: new Date().getTime(),
    };
    todos.push(newTodo);
    res.json(newTodo);
  });

  app.get("/a5/welcome", (req, res) => { // create route to welcome users to assignment 5.
    res.send("Welcome to Assignment 5"); // Here we are using the new arrow function syntax
  });
  app.get("/a5/assignment", (req, res) => {
    // use .json() instead of .send() if you know the response is formatted as JSON
    res.json(assignment);
  });

  // respond with string property
  // can do the same with other properties
  app.get("/a5/assignment/title", (req, res) => {
    res.json(assignment.title);
  });


  // changes to objects in the server
  // persist as long as the server is running
  // rebooting the server resets the object state
  app.get("/a5/assignment/title/:newTitle", (req, res) => {
    const { newTitle } = req.params;
    assignment.title = newTitle;
    res.json(assignment);
  });

  // Route for getting the whole module object
  app.get("/a5/module", (req, res) => {
    res.json(moduleObject);
  });

  // Route for getting the module's name
  app.get("/a5/module/name", (req, res) => {
    res.json({ name: moduleObject.name });
  });

  // Route for updating the module's name
  app.get("/a5/module/name/:newName", (req, res) => {
    const { newName } = req.params;
    moduleObject.name = newName;
    res.json(moduleObject);
  });


  app.get("/a5/todos", (req, res) => {
    const { completed } = req.query;
    if (completed !== undefined) {
      const completedBool = completed === "true";
      const completedTodos = todos.filter(
        (t) => t.completed === completedBool);
      res.json(completedTodos);
      return;
    }
    res.json(todos);
  });


  // Route for updating todo description
  app.get("/a5/todos/:id/description/:description", (req, res) => {
    const { id, description } = req.params;
    // Find and update the todo item's description
    const todo = todos.find(todo => todo.id === parseInt(id));
    if (todo) {
      todo.description = decodeURIComponent(description);
      res.json(todos);
    } else {
      res.status(404).send("Todo not found");
    }
  });

    // Route for updating todo completed status
    app.get("/a5/todos/:id/completed/:completed", (req, res) => {
      const { id, completed } = req.params;
      // Find and update the todo item's completed status
      const todo = todos.find(todo => todo.id === parseInt(id));
      if (todo) {
        todo.completed = completed === 'true';
        res.json(todos);
      } else {
        res.status(404).send("Todo not found");
      }
    });

    app.delete("/a5/todos/:id", (req, res) => {
      const { id } = req.params;
      const todo = todos.find((t) => t.id === parseInt(id));
      todos.splice(todos.indexOf(todo), 1);
      res.sendStatus(200);
    });
  

  app.get("/a5/todos/:id/title/:title", (req, res) => {
    const { id, title } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    todo.title = title;
    res.json(todos);
  });


  // make sure to implement this AFTER the 
  // /a5/todos/create route implemented above

  app.get("/a5/todos/:id", (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    res.json(todo);
  });

  app.put("/a5/todos/:id", (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    todo.title = req.body.title;
    todo.description = req.body.description;
    todo.due = req.body.due;
    todo.completed = req.body.completed;
    res.sendStatus(200);
  });








  // Addition route
  app.get("/a5/add/:a/:b", (req, res) => {
    const { a, b } = req.params; // retrieve path parameters as strings
    const sum = parseInt(a) + parseInt(b); // parse as integers and adds
    res.send(sum.toString()); // sum as string sent back as response
    // don't send integers since can be interpreted as status
    // route expects 2 path parameters after /a5/add
  });
  // Subtraction route
  app.get("/a5/subtract/:a/:b", (req, res) => {
    const { a, b } = req.params; // retrieve path parameters as strings
    const sum = parseInt(a) - parseInt(b); // parse as integers and subtracts
    res.send(sum.toString()); // subtraction as string sent back as response
    // response is converted to string otherwise browser
    // would interpret integer response as a status code
    // route expects 2 path parameters after /a5/subtract
  });

  // Multiply route using path parameters
  app.get("/a5/multiply/:a/:b", (req, res) => {
    const { a, b } = req.params;
    const product = parseInt(a) * parseInt(b);
    res.send(product.toString());
  });

  // Divide route using path parameters
  app.get("/a5/divide/:a/:b", (req, res) => {
    const { a, b } = req.params;
    // Ensure b is not zero to avoid division by zero
    if (parseInt(b) === 0) {
      return res.send("Cannot divide by zero");
    }
    const quotient = parseInt(a) / parseInt(b);
    res.send(quotient.toString());
  });


  app.get("/a5/calculator", (req, res) => {
    // retrieve a, b, and operation parameters in query
    const { a, b, operation } = req.query;

    let result = 0;
    switch (operation) {
      case "add":
        // parse as integers since parameters are strings
        result = parseInt(a) + parseInt(b);
        break;
      case "subtract":
        // parse as integers since parameters are strings
        result = parseInt(a) - parseInt(b);
        break;
      case "multiply":
        result = parseInt(a) * parseInt(b);
        break;
      case "divide":
        // Ensure b is not zero to avoid division by zero
        if (parseInt(b) === 0) {
          result = "Cannot divide by zero";
        } else {
          result = parseInt(a) / parseInt(b);
        }
        break;
      default:
        result = "Invalid operation";
    }

    // convert to string otherwise browser interprets as a status code
    res.send(result.toString());
  });

};

export default Lab5;