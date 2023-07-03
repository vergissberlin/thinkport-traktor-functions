# Traktor - Azure Functions

## Introduction

This project is a collection of Azure Functions that can be used to automate tasks in Traktor.

## Functions

### Traktor - getProdcts

This function will return a list of products from Traktor.

#### Request

```http
GET /api/getProducts?code=<code>
```

#### Response

```json
[
    {
        "id": "1",
        "name": "Product 1",
        "description": "Product 1 description",
        "price": 10.0,
        "currency": "EUR",
        "image": "https://www.traktor.com/images/product1.jpg"
    },
    {
        "id": "2",
        "name": "Product 2",
        "description": "Product 2 description",
        "price": 20.0,
        "currency": "EUR",
        "image": "https://www.traktor.com/images/product2.jpg"
    }
]
```

## Development

### Prerequisites

- [Visual Studio Code](https://code.visualstudio.com/)
- [Azure Functions Extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurefunctions)
- [Azure Functions Core Tools](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=windows%2Ccsharp%2Cbash#v2)

### Running the project

1. Open the project in Visual Studio Code
2. Press `F5` to start the project
3. Open a browser and navigate to `http://localhost:7071/api/getProducts?code=<code>`
