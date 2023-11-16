import express from 'express';
import cors from "cors"
import {
    getAllFoodWithPrisma,
    getFoodWithPrisma,
    createFoodWithPrisma,
    updateFoodWithPrisma,
    deleteFoodWithPrisma,
    addFoodToOrder,
    getAllOrderWithPrisma,
    getAllCommandWithPrisma,
    getCommandWithPrismaByID,
    getCommandWithPrismaByTable,
    createCommandWithPrisma,
    deleteCommandWithPrisma,
    getAllOrderByCustomer,
    getOrderByCustomerByID,
    getOrderByCommand,
    getOrderByCustomerByOrderID
} from '../index.js'

const app = express();
const PORT = 3002;

app.use(express.json())
app.use(cors())

app.get('/', async (req, res) => {
    res.json("Bienvenido a la API de WaitLess");
})

app.get("/menu", getAllFoodWithPrisma)
app.get("/order", getAllOrderWithPrisma)
app.get("/command", getAllCommandWithPrisma)
app.get("/orderByCustomer", getAllOrderByCustomer)

//Trae lo que quiero según su ID
app.get("/menu/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    const menu = await getFoodWithPrisma(id)
    res.json(menu)
})
app.get("/orders/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    const orders = await getOrderByPrismaID(id)
    if (!orders) {
        throw new Error("The order is empty")
    }
    res.json(orders)
})
app.get("/orderes", async (req, res) => {
    const orders = await getAllOrderWithPrisma()
    if (!orders) {
        throw new Error("The order list is empty")
    }
    res.json({ message: "Success", data: orders })
})

app.get("/command/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    const command = await getCommandWithPrismaByID(id)
    if (!command) {
        throw new Error("The command is empty")
    }
    res.json(command)
})
app.get("/commandTable/:table", async (req, res) => {
    const table = parseInt(req.params.table)
    const command = await getCommandWithPrismaByTable(table)
    if (!command) {
        throw new Error("The command is empty")
    }
    res.json(command)
})
app.get("/orders", async (req, res) => {
    const orders = await getAllOrderWithPrisma()
    if (!orders) {
        throw new Error("The order list is empty")
    }
    res.json({ message: "Success", data: orders })
})
app.get("/orderByCustomer/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    const orderByCustomer = await getOrderByCustomerByID(id)
    if (!orderByCustomer) {
        throw new Error("OrderByCustomer is empty")
    }
    res.json(orderByCustomer)
})
// app.get("foodFromCommand/:id", async (req, res) => {
//     const orders = await getOrderByCommand(id)
//     const orderids = orders.map(item => item.id)
//     const ordersFromOrdersId = await getOrderByCustomerByOrderID(orderids)
//     const foodIds = ordersFromOrdersId.map(item => item.foodId); 
// })
//Agrega a menu lo que quieras
app.post("/menu", async (req, res) => {
    const { title, contents } = req.body
    const nuevoPedido = await createFoodWithPrisma(title, contents)
    res.status(201).json(nuevoPedido)
})
app.post("/ordersFood", async (req, res) => {
    const { orderId, foodId, customerId, quantity, state } = req.body;
    console.log(req.body);
    const agregarComida = await addFoodToOrder(orderId, foodId, customerId, quantity, state)
    res.status(201).json(agregarComida)
})
//Modifica de menu lo que quieras
app.put("/menu/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    const { title, contents } = req.body
    const menu = await updateFoodWithPrisma(title, contents, id)
    res.json(menu)
})
//Borra de menu lo que quieras
app.delete("/menu/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    const success = await deleteFoodWithPrisma(id)
    res.json({ success })
})

//Alert de que algo no funciona
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json('Something broke 💩')
})

app.listen(PORT, () =>
    console.log(`server running on port: http://localhost:${PORT}`));