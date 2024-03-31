const request = require("supertest");
const app = require("../src/app");
const Cars = require("../src/mongoose/models/cars");
const { cars, setUpDatabase } = require("./utils/testDB");

beforeEach(setUpDatabase);

//adding a new car
test("Adding a new car", async () => {
    const response = await request(app).post("/cars").send({
        name: "car 7",
        price: 10200000,
        capacity: 7,
        type: "XUV",
        manufacturer: "Audi"
    }).expect(201);
    expect(await Cars.find().count()).toBe(7);
    expect(response.body.message).toBe("Added a new car successfully");
});

//viewing all the cars form the database
test("Viewing cars form database", async () => {
    const response = await request(app).get("/cars").expect(200);
    expect(response.body.length).toBe(6);
    for (let i = 0; i < response.body.length; i++) {
        expect(response.body[i].name).toBe(cars[i].name);
        expect(response.body[i].type).toBe(cars[i].type);
        expect(response.body[i].capacity).toBe(cars[i].capacity);
        expect(response.body[i].price).toBe(cars[i].price);
        expect(response.body[i].manufacturer).toBe(cars[i].manufacturer);
    }
});

//viewing cars with serach value
test("Viewing cars with a particular search value in name or manufacturer", async () => {
    const response = await request(app).get("/cars?search=N").expect(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0].name).toBe(cars[1].name);
    expect(response.body[0].type).toBe(cars[1].type);
    expect(response.body[0].capacity).toBe(cars[1].capacity);
    expect(response.body[0].price).toBe(cars[1].price);
    expect(response.body[0].manufacturer).toBe(cars[1].manufacturer);
    expect(response.body[1].name).toBe(cars[2].name);
    expect(response.body[1].type).toBe(cars[2].type);
    expect(response.body[1].capacity).toBe(cars[2].capacity);
    expect(response.body[1].price).toBe(cars[2].price);
    expect(response.body[1].manufacturer).toBe(cars[2].manufacturer);
});

//viewing cars with search value
test("Viewing cars with a particular search value in name or manufacturer", async () => {
    const response = await request(app).get("/cars?search=dI").expect(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0].name).toBe(cars[0].name);
    expect(response.body[0].type).toBe(cars[0].type);
    expect(response.body[0].capacity).toBe(cars[0].capacity);
    expect(response.body[0].price).toBe(cars[0].price);
    expect(response.body[0].manufacturer).toBe(cars[0].manufacturer);
    expect(response.body[1].name).toBe(cars[5].name);
    expect(response.body[1].type).toBe(cars[5].type);
    expect(response.body[1].capacity).toBe(cars[5].capacity);
    expect(response.body[1].price).toBe(cars[5].price);
    expect(response.body[1].manufacturer).toBe(cars[5].manufacturer);
});

//viewing cars based on the capacity of it
test("Viewing cars based on its capacity", async () => {
    const response = await request(app).get("/cars?capacity=5").expect(200);
    expect(response.body.length).toBe(3);
    expect(response.body[0].name).toBe(cars[0].name);
    expect(response.body[0].type).toBe(cars[0].type);
    expect(response.body[0].capacity).toBe(cars[0].capacity);
    expect(response.body[0].price).toBe(cars[0].price);
    expect(response.body[0].manufacturer).toBe(cars[0].manufacturer);
    expect(response.body[1].name).toBe(cars[1].name);
    expect(response.body[1].type).toBe(cars[1].type);
    expect(response.body[1].capacity).toBe(cars[1].capacity);
    expect(response.body[1].price).toBe(cars[1].price);
    expect(response.body[1].manufacturer).toBe(cars[1].manufacturer);
    expect(response.body[2].name).toBe(cars[4].name);
    expect(response.body[2].type).toBe(cars[4].type);
    expect(response.body[2].capacity).toBe(cars[4].capacity);
    expect(response.body[2].price).toBe(cars[4].price);
    expect(response.body[2].manufacturer).toBe(cars[4].manufacturer);
});

//viewing cars in ascending order of the price
test("Viewing cars in the ascending order of its price", async () => {
    const response = await request(app).get("/cars?price=asc").expect(200);
    expect(response.body.length).toBe(6);
    expect(response.body[0].name).toBe(cars[4].name);
    expect(response.body[0].type).toBe(cars[4].type);
    expect(response.body[0].capacity).toBe(cars[4].capacity);
    expect(response.body[0].price).toBe(cars[4].price);
    expect(response.body[0].manufacturer).toBe(cars[4].manufacturer);
    expect(response.body[1].name).toBe(cars[1].name);
    expect(response.body[1].type).toBe(cars[1].type);
    expect(response.body[1].capacity).toBe(cars[1].capacity);
    expect(response.body[1].price).toBe(cars[1].price);
    expect(response.body[1].manufacturer).toBe(cars[1].manufacturer);
    expect(response.body[2].name).toBe(cars[0].name);
    expect(response.body[2].type).toBe(cars[0].type);
    expect(response.body[2].capacity).toBe(cars[0].capacity);
    expect(response.body[2].price).toBe(cars[0].price);
    expect(response.body[2].manufacturer).toBe(cars[0].manufacturer);
    expect(response.body[3].name).toBe(cars[2].name);
    expect(response.body[3].type).toBe(cars[2].type);
    expect(response.body[3].capacity).toBe(cars[2].capacity);
    expect(response.body[3].price).toBe(cars[2].price);
    expect(response.body[3].manufacturer).toBe(cars[2].manufacturer);
    expect(response.body[4].name).toBe(cars[3].name);
    expect(response.body[4].type).toBe(cars[3].type);
    expect(response.body[4].capacity).toBe(cars[3].capacity);
    expect(response.body[4].price).toBe(cars[3].price);
    expect(response.body[4].manufacturer).toBe(cars[3].manufacturer);
    expect(response.body[5].name).toBe(cars[5].name);
    expect(response.body[5].type).toBe(cars[5].type);
    expect(response.body[5].capacity).toBe(cars[5].capacity);
    expect(response.body[5].price).toBe(cars[5].price);
    expect(response.body[5].manufacturer).toBe(cars[5].manufacturer);
});

//viewing cars in descending order of the price
test("Viewing cars in the descending order of its price", async () => {
    const response = await request(app).get("/cars?price=desc").expect(200);
    expect(response.body.length).toBe(6);
    expect(response.body[5].name).toBe(cars[4].name);
    expect(response.body[5].type).toBe(cars[4].type);
    expect(response.body[5].capacity).toBe(cars[4].capacity);
    expect(response.body[5].price).toBe(cars[4].price);
    expect(response.body[5].manufacturer).toBe(cars[4].manufacturer);
    expect(response.body[4].name).toBe(cars[1].name);
    expect(response.body[4].type).toBe(cars[1].type);
    expect(response.body[4].capacity).toBe(cars[1].capacity);
    expect(response.body[4].price).toBe(cars[1].price);
    expect(response.body[4].manufacturer).toBe(cars[1].manufacturer);
    expect(response.body[3].name).toBe(cars[0].name);
    expect(response.body[3].type).toBe(cars[0].type);
    expect(response.body[3].capacity).toBe(cars[0].capacity);
    expect(response.body[3].price).toBe(cars[0].price);
    expect(response.body[3].manufacturer).toBe(cars[0].manufacturer);
    expect(response.body[2].name).toBe(cars[2].name);
    expect(response.body[2].type).toBe(cars[2].type);
    expect(response.body[2].capacity).toBe(cars[2].capacity);
    expect(response.body[2].price).toBe(cars[2].price);
    expect(response.body[2].manufacturer).toBe(cars[2].manufacturer);
    expect(response.body[1].name).toBe(cars[3].name);
    expect(response.body[1].type).toBe(cars[3].type);
    expect(response.body[1].capacity).toBe(cars[3].capacity);
    expect(response.body[1].price).toBe(cars[3].price);
    expect(response.body[1].manufacturer).toBe(cars[3].manufacturer);
    expect(response.body[0].name).toBe(cars[5].name);
    expect(response.body[0].type).toBe(cars[5].type);
    expect(response.body[0].capacity).toBe(cars[5].capacity);
    expect(response.body[0].price).toBe(cars[5].price);
    expect(response.body[0].manufacturer).toBe(cars[5].manufacturer);
});

//filtering based on its manufacturer
test("Viewing cars based on its manufacturers", async () => {
    const response = await request(app).get("/cars?manufacturer=Suzuki").expect(200);
    expect(response.body.length).toBe(2);
    expect(response.body[1].name).toBe(cars[4].name);
    expect(response.body[1].type).toBe(cars[4].type);
    expect(response.body[1].capacity).toBe(cars[4].capacity);
    expect(response.body[1].price).toBe(cars[4].price);
    expect(response.body[1].manufacturer).toBe(cars[4].manufacturer);
    expect(response.body[0].name).toBe(cars[0].name);
    expect(response.body[0].type).toBe(cars[0].type);
    expect(response.body[0].capacity).toBe(cars[0].capacity);
    expect(response.body[0].price).toBe(cars[0].price);
    expect(response.body[0].manufacturer).toBe(cars[0].manufacturer);
});

//filtering cars based on search value and ordering in descending based on its price
test("Viewing cars based on the search value and descending order of its price", async () => {
    const response = await request(app).get("/cars?search=Di&price=desc");
    expect(response.body.length).toBe(2);
    expect(response.body[1].name).toBe(cars[0].name);
    expect(response.body[1].type).toBe(cars[0].type);
    expect(response.body[1].capacity).toBe(cars[0].capacity);
    expect(response.body[1].price).toBe(cars[0].price);
    expect(response.body[1].manufacturer).toBe(cars[0].manufacturer);
    expect(response.body[0].name).toBe(cars[5].name);
    expect(response.body[0].type).toBe(cars[5].type);
    expect(response.body[0].capacity).toBe(cars[5].capacity);
    expect(response.body[0].price).toBe(cars[5].price);
    expect(response.body[0].manufacturer).toBe(cars[5].manufacturer);
});

//filtering cars based on capacity and ordering in descending based on its price
test("Viewing cars based on the capacity and descending order of its price", async () => {
    const response = await request(app).get("/cars?capacity=7&price=desc");
    expect(response.body.length).toBe(2);
    expect(response.body[1].name).toBe(cars[2].name);
    expect(response.body[1].type).toBe(cars[2].type);
    expect(response.body[1].capacity).toBe(cars[2].capacity);
    expect(response.body[1].price).toBe(cars[2].price);
    expect(response.body[1].manufacturer).toBe(cars[2].manufacturer);
    expect(response.body[0].name).toBe(cars[5].name);
    expect(response.body[0].type).toBe(cars[5].type);
    expect(response.body[0].capacity).toBe(cars[5].capacity);
    expect(response.body[0].price).toBe(cars[5].price);
    expect(response.body[0].manufacturer).toBe(cars[5].manufacturer);
});

//filteirng cars based on search value and its manufacturer
test("Viewing cars based on its manufacturer and search value", async () => {
    const response = await request(app).get("/cars?manufacturer=Audi&search=DI").expect(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].name).toBe(cars[5].name);
    expect(response.body[0].type).toBe(cars[5].type);
    expect(response.body[0].capacity).toBe(cars[5].capacity);
    expect(response.body[0].price).toBe(cars[5].price);
    expect(response.body[0].manufacturer).toBe(cars[5].manufacturer);
});

//filtering cars based on capacity, search value and, ordering in ascending based on its price
test("Viewing cars based on the capacity, search value and ascending order of its price", async () => {
    const response = await request(app).get("/cars?capacity=5&price=asc&search=U");
    expect(response.body.length).toBe(3);
    expect(response.body[2].name).toBe(cars[0].name);
    expect(response.body[2].type).toBe(cars[0].type);
    expect(response.body[2].capacity).toBe(cars[0].capacity);
    expect(response.body[2].price).toBe(cars[0].price);
    expect(response.body[2].manufacturer).toBe(cars[0].manufacturer);
    expect(response.body[1].name).toBe(cars[1].name);
    expect(response.body[1].type).toBe(cars[1].type);
    expect(response.body[1].capacity).toBe(cars[1].capacity);
    expect(response.body[1].price).toBe(cars[1].price);
    expect(response.body[1].manufacturer).toBe(cars[1].manufacturer);
    expect(response.body[0].name).toBe(cars[4].name);
    expect(response.body[0].type).toBe(cars[4].type);
    expect(response.body[0].capacity).toBe(cars[4].capacity);
    expect(response.body[0].price).toBe(cars[4].price);
    expect(response.body[0].manufacturer).toBe(cars[4].manufacturer);
});

//updating a car details
test("Updating a car detail", async () => {
    const response = await request(app).patch(`/cars/${cars[3]._id}`).send({
        price: 8000000,
        capacity: 4
    });
    const updated_car = await Cars.findById(cars[3]._id);
    expect(updated_car.price).toBe(8000000);
    expect(updated_car.capacity).toBe(4);
    expect(response.body.message).toBe("Updated successfully");
});

//updating a car details
test("Updating a car detail", async () => {
    const response = await request(app).patch(`/cars/${cars[1]._id}`).send({
        name: "New car",
        price: 9000000,
        capacity: 8,
        type: "MUV",
        manufacturer: "Toyota"
    });
    const updated_car = await Cars.findById(cars[1]._id);
    expect(updated_car.price).toBe(9000000);
    expect(updated_car.capacity).toBe(8);
    expect(updated_car.name).toBe("New car");
    expect(updated_car.type).toBe("MUV");
    expect(updated_car.manufacturer).toBe("Toyota");
    expect(response.body.message).toBe("Updated successfully");
});

//deleting a car from DB
test("Deleting a car from Database", async () => {
    const response = await request(app).delete(`/cars/${cars[0]._id}`).expect(200);
    expect(await Cars.find().count()).toBe(5);
    expect(response.body.message).toBe("Deleted successfully");
});