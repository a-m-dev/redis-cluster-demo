# Redis-cluster example

Hey 👋 

what you need to do:

1. have `docker` + `docker compose` installed
2. pull the repo
3. run `yarn`
4. run `yarn seed:employees` after your pg instance is up
5. after compose file is done working, open browser and go to `localhost:5000` for seeing your redis commander GUI
6. open a new tab and go to `localhost:8081`
7. the express app has an endpoint `/:limit` => call it with multiple numbers


running `localhost:8081/3` will return you the data of 3 users  
running `localhost:8081/5` will return you the data of 5 users  
...


# What will happen? 
we have 3 redis instances running in cluster mode. in each request, you will see that what ever service load balancer redirects the request will hit the database and update the cache.

But if you refresh to run the same query, load balancer will hit another service and the point is that request will not hit the database, redis will take over in this step!



## little note
Sorry if you see log or dev codes somewhere in project, this project is just a POC and completed overnight ☠️ 🍻