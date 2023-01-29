# API
-FOOD (Food item and their details)
-Resturant (Resturant and their detail)
-Menu(Menu and their detail)
-Image(store all images related to the zomato)
-order(Order and their detail)
-Review(store all list of reviews)
-user(details of user = name,mail,password)

# session Based Appln
-tokens
-when we login or create account
   >> at this pt of time ->new jwt token will generated.
   >> once its generated -->if we revisite app again after some time we dont need to passs the credential instead dwhile making a req   the      generated jwt token will be sent to server.

# jwt ==> jsonwebtoken
-it stored in client or enduserbrowser (cookies,localstorage)
-it has expiration -->it depends on business perspective.