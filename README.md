# created by ...........

Endpoint POST /auth/signup
Content-Type application/json
{
"email": "email"
"user": "user",
"password": "password"
}

# create a new account

Endpoint POST /auth/signin
Content-Type application/json
{
"email": "email",
"password": "password"
}

# signin to existing account

Endpoint GET /?signature=signature
Content-Type: application/json

# verify id route (main entry)

Endpoint PUT /item/addcart?signature=signature
Content-Type: application/json

{
{
"id" : "id",
"name" : "name"
}
}

# add to cart

Endpoint GET /item/getcart?signature=signature
Content-Type: application/json

# restore carts

Endpoint DELETE /item/deletecart?id=idofcart&signature=signature
Content-Type: application/json

# restore carts
