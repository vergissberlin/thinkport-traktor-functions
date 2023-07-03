const {MongoClient} = require("mongodb")

module.exports = async function (context, req) {
    const uri = "mongodb://mongo:VjHvECefgmUbvyapJ926@containers-us-west-195.railway.app:7647"
    const client = new MongoClient(uri)

    // Check if product json has a angle, led and display property
    if (!req.body.hasOwnProperty("angle") || !req.body.hasOwnProperty("led") || !req.body.hasOwnProperty("display")) {
        context.res = {
            status: 400,
            headers: {
                "Content-Type": "application/json"
            },
            body: {msg: "Product JSON must have a angle, led and display property."}
        }
        return
    }

    try {
        // Assumption: Products are transferred as a JSON string in the request body with a POST request
        let product = req.body

        // Connect to MongoDB
        await client.connect()
        const database = client.db("traktor")
        const collection = database.collection("products")

        const result = await collection.insertOne(product)
        context.res = {
            status: 201,
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                msg: `Product successfully added to the database.`,
                _id: result.insertedId
            }
        }
    } catch (error) {
        context.res = {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            },
            body: {msg: error.message}
        }
    } finally {
        await client.close()
    }
}
