const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

const mockData = [
    { id: 1, name: "Product A", price: 10 },
    { id: 2, name: "Product B", price: 20 },
    { id: 3, name: "Product C", price: 30 },
  ];

  app.get("/items", (req, res) => {
    res.json(mockData); // to send the books array as a response
  });

  app.get("/items/:id", (req, res) => {
    const data = mockData.find((b) => b.id === parseInt(req.params.id)); // to find the book by id
    if (!data) return res.status(404).json({ message: "ulol" }); // to send a 404 status code and a message if the book is not found
    res.json(data); // to send the book as a response
  });
  
  app.put("/items:id", (req, res) => {
    const data = mockData.find((b) => b.id === parseInt(req.params.id)); // to find the book by id
    if (!data) return res.status(404).json({ message: "Book not found" }); // to send a 404 status code and a message if the book is not found
    
    const { name, price } = req.body; // to get the title and author from the request body
    data.name = name; // to update the title of the book
    data.price = price; // to update the author of the book
    res.json(data); // to send the updated book as a response
  });   

  app.delete("/items/:id", (req, res) => {
    const index = mockData.findIndex((b) => b.id === parseInt(req.params.id)); // to find the index of the book by id
    if (index === -1) return res.status(404).json({ message: "Book not found" }); // to send a 404 status code and a message if the book is not found
  
    mockData.splice(index, 1); // to delete the book from the books array
    res.status(204).send(); // to send a 204 status code
  });