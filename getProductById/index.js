const {MongoClient, ObjectId} = require("mongodb")

/*
GetProductById retrieves a single product document from MongoDB by id.

Parameters: 
- req: The request object containing the query parameters. Must have an id parameter.

Returns:  
- context.res: The response object. Will contain:
-- status: The HTTP status code.
-- headers: The response headers.  
-- body: The response body. Will contain the product document or an error message.

Functionality:
- Checks that the request has an id query parameter. If not, returns a 400 response.
- Connects to MongoDB and selects the traktor database and products collection.  
- Finds a single document in the products collection by the id query parameter.
- Closes the MongoDB connection.  
- If a document is found, returns it in the response with a 200 status.
- If no document is found, returns a 404 response with an error message.
*/

// MongoDB connection string
const url = 'mongodb://mongo:VjHvECefgmUbvyapJ926@containers-us-west-195.railway.app:7647'
const dbName = 'traktor'

// Connection pool
const client = new MongoClient(url, {useUnifiedTopology: true})
const db = client.db(dbName)

// Product query cache
let productCache = []

module.exports = async function (context, req) {


    // Check get parameter id from request
    if (!req.query.hasOwnProperty("id")) {
        context.res = {
            status: 400,
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                msg: "Request must have a id parameter.",
                params: req.query
            }
        }
        return
    }
    const productId = req.query.id

    // Check cache for product
    if (productCache[productId]) {
        returnProduct(context, productCache[productId])
        return
    }

    // Connect to DB if not in cache
    const collection = db.collection('products')
    const filter = {_id: new ObjectId(productId)}
    const product = await collection.findOne(filter)

    // Check if document was found
    if (!product) {
        context.res = {
            status: 404,
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                msg: 'No product found with id: ' + productId,
            }
        }
        return
    }

    // Add to cache and return
    productCache[productId] = product
    returnProduct(context, product)
}

function returnProduct(context, product) {
    context.res = {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        },
        body: product
    }
}
