module.exports = async function (context, req) {

    let products = [
        {
            "angle": "12",
            "led": [
                "black",
                "black",
                "black",
                "black",
                "black",
                "black"
            ],
            "display": [
                "Pause",
                "",
                "Scan product"
            ]
        },
        {
            "angle": "34",
            "led": [
                "blue",
                "green",
                "green",
                "green",
                "green",
                "blue"
            ],
            "display": [
                "DiFlexx",
                "Distance: 20 m",
                "Heigth:   50 cm"
            ]
        },
        {
            "angle": "12",
            "led": [
                "black",
                "black",
                "green",
                "green",
                "black",
                "black"
            ],
            "display": [
                "Mateno",
                "Distance: 12 m",
                "Heigth:   25 cm"
            ]
        },
        {
            "angle": "12",
            "led": [
                "black",
                "green",
                "green",
                "green",
                "green",
                "black"
            ],
            "display": [
                "Decis Pro",
                "Distance: 10 m",
                "Heigth:   15 cm"
            ]
        }
    ]

    const product = (req.query.product || (req.body && req.body.product))
    const responseMessage = products[product.substring(1)]
    
    // Check if product parameter is valid
    if (product.substring(0, 1) !== "P" || product.substring(1) > products.length - 1) {
        context.res = {
            status: 400,
            body: { msg: "Invalid product parameter.", param: product }
        }
        return
    }

    context.res = {
        headers: {"Content-Type": "application/json"},

        // status: 200, /* Defaults to 200 */
        body: responseMessage
    }
}
