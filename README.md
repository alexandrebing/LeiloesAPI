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
    "price": 1599.00, 
    "createdAt": "2019-06-20T00:30:30.799Z"
  },
  { 
    "id" "1", 
    "title": "Notebook", 
    "price": 1999.00, 
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
    "price": 2399.00,
    "createdAt": "2019-06-21T00:45:50.799Z"
  }
  {
    "id": "1",
    "price": 2199.00,
    "createdAt": "2019-06-20T00:45:50.799Z"
  }
]
```


### POST /auctions/:id/bids

Request:
```json
{
  "price": 2199.00
}
```

Response:

No content response (204)

Status 400 (Preço abaixo ou igual do valor atual do leilão)
```json
{ "code: "INVALID_PRICE" }
```

Status 404 (Não encontrou leilão com o id informado)
```json
{ "code: "RESOURCE_NOT_FOUND" }
```