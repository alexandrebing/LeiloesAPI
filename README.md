# LeiloesAPI

## Recursos

### GET /auctions

Orderred by title desc

Response:
```json
[
  { 
    "id" "2", 
    "title": "Desktop", 
    "price": 159900, 
    "createdAt": "2019-06-20T00:30:30.799Z"
  },
  { 
    "id" "1", 
    "title": "Notebook", 
    "price": 199900, 
    "createdAt": "2019-06-20T00:30:30.799Z"
  }
]
```

### GET /auctions/:id
Ordered by createdAt desc

Response:
```json
[
  {
    "id": "2",
    "price": 239900,
    "createdAt": "2019-06-21T00:45:50.799Z"
  }
  {
    "id": "1",
    "price": 219900,
    "createdAt": "2019-06-20T00:45:50.799Z"
  }
]
```


### POST /auctions/:id/bids

Request:
```json
{
  "price": 2199000
}
```

Response:

No content response (204)

Status 400 (Preço abaixo do valor atual do leilão)
```json
{ "code: "INVALID_PRICE" }
```

Status 404 (Não encontrou leilão com o id informado)
```json
{ "code: "RESOURCE_NOT_FOUND" }
```