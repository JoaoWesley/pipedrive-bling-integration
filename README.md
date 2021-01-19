# pipedrive-bling-integration
Integration between pipedrive and bling.

# Github repository
# https://github.com/JoaoWesley/pipedrive-bling-integration

## How to run
 - Make a copy of .env.example file and then fill all variables in a new .env file
 - On the project root folder run `npm install` then `npm run dev`
 - Then the application will be available at: http://localhost:3000

### Linter
 - Run the command `npm run lint` to execute lint on the project
### Tests
  - Run the command `npm run test` to execute all the tests on the application.

# API DOCUMENTATION

## Endpoint

  http://localhost:3000

## Requests

### - POST orders

This request Start the integration

#### HTTP Method

    POST

#### URL

    /orders/

#### Response

````json
    [
        {
            "pedido": {
                "numero": "45",
                "idPedido": 10937740590,
                "codigos_rastreamento": {
                    "codigo_rastreamento": null
                },
                "volumes": [
                    {
                        "servico": "SEDEX - CONTRATO",
                        "codigoRastreamento": ""
                    }
                ]
            }
        },
        {
            "pedido": {
                "numero": "46",
                "idPedido": 10937740606,
                "codigos_rastreamento": {
                    "codigo_rastreamento": null
                },
                "volumes": [
                    {
                        "servico": "SEDEX - CONTRATO",
                        "codigoRastreamento": ""
                    }
                ]
            }
        },    
    ]
````

### - GET orders

Get all stored orders integrated

#### HTTP Method

    GET

#### URL

    /orders/

#### Parameters

    {date} - Optional date of creation parameter to filter orders    
#### Response

````json
    [
        {
            "orders": [
                {
                    "pedido": {
                        "numero": "38",
                        "idPedido": 10936916777,
                        "codigos_rastreamento": {
                            "codigo_rastreamento": null
                        },
                        "volumes": [
                            {
                                "servico": "SEDEX - CONTRATO",
                                "codigoRastreamento": ""
                            }
                        ]
                    }
                },
                {
                    "pedido": {
                        "numero": "39",
                        "idPedido": 10936916856,
                        "codigos_rastreamento": {
                            "codigo_rastreamento": null
                        },
                        "volumes": [
                            {
                                "servico": "SEDEX - CONTRATO",
                                "codigoRastreamento": ""
                            }
                        ]
                    }
                },
                {
                    "pedido": {
                        "numero": "40",
                        "idPedido": 10936918569,
                        "codigos_rastreamento": {
                            "codigo_rastreamento": null
                        },
                        "volumes": [
                            {
                                "servico": "SEDEX - CONTRATO",
                                "codigoRastreamento": ""
                            }
                        ]
                    }
                },
                {
                    "pedido": {
                        "numero": "41",
                        "idPedido": 10936918582,
                        "codigos_rastreamento": {
                            "codigo_rastreamento": null
                        },
                        "volumes": [
                            {
                                "servico": "SEDEX - CONTRATO",
                                "codigoRastreamento": ""
                            }
                        ]
                    }
                }
            ],
            "_id": "600431c777c16c0b0c2c91f3",
            "total": 950,
            "date": "2021-01-17",
            "__v": 0
        }
    ]
````
