1. As a client app I can make a GET request to http://localhost:5000/companies and receive back an array of 20 companies.
2. As a client app I can make a GET request to http://localhost:5000/companies?page=n and receive an array, the nth array of 20 companies.
3. As a client app I can make a GET request to http://localhost:5000/companies?city=Miami,New%20York. and receive back a list of companies with jobs in those cities Miami & New York. Hint: AND (7%)
4. As a client app I can make a POST request to add a new company with exact structure as any company in the database. Meaning it have to have all the keys-value.
5. As a client app I can make a PUT request to http://localhost:5000/companies/:id and add a property enterprise, which is true, to the company that match given id.
6. As a client app I can make a DELETE request to http://localhost:5000/companies/:id delete a company by id.
7. Rocket (BE): All get route must have a queryValidation middleware which only allow page, city, company, rating, sort, and order. Which will throw an exeception message "Query xxx is not allow" (10%)
8. Rocket (BE): All POST, PUT, DELETE route must have isAuthenticated protection which only allow request with req.headers.accesstoken === "123" (10%)
9. Rocket (BE): As a client app I can make a GET request to http://localhost:5000/companies?sortBy=ratings&order=asc/desc and receive back an array of 20 companies sorted by average ratings* ascending/descending order by default. (10%) *Hint: A company rating is the average score from these criteria workLifeBalanceRatings,payAndBenefits,jobsSecurityAndAdvancement,management,culture
10. Super Rocket (Full-stack): As a user I could save a list of favorite company in another .json file and able to request for its data via some UI (20%)