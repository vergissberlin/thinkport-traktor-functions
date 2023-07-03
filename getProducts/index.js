const {MongoClient} = require("mongodb")

module.exports = async function (context, req) {

    // Import MongoDB
    const url = 'mongodb://mongo:VjHvECefgmUbvyapJ926@containers-us-west-195.railway.app:7647'
    const dbName = 'traktor'

    try {
        // Connect to MongoDB
        const client = await MongoClient.connect(url)

        // Select the database
        const db = client.db(dbName)

        // Get the "products" collection
        const collection = db.collection('products')

        // Find all documents in the collection
        const documents = await collection.find({}).toArray()

        // Close the MongoDB connection
        client.close()

        context.res = {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            body: documents
        }
    } catch (error) {
        context.res = {
            status: 500,
            body: 'Error occurred while retrieving data: ' + error.message
        }
    }
}
