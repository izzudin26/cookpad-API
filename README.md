#### Using

- Install Dependency
  ```
    $ npm installl
  ```
- Unit Testing
  ```
    $ npm run test
  ```
- Build Distribution Nodejs
  ```
    $ npm run build
  ```
- Start Application
  ```
    $ npm start
  ```

#### API Endpoint

- `GET /api/food?name={foodname}&page={page}`

  - Example: `/api/food?name=burger&page=1
  - Response
    ```json
    {
      "status": 200,
      "message": "Success get {foodname} page {page}",
      "data": [
        {
          "recipeId": "string recipeId of food",
          "title": "string foodname",
          "imageUrl": "string url of image food"
        }
      ]
    }
    ```

- `GET /api/recipe?id={recipeId}`
  - Example: `/api/recipe?id=15441817`
  - Response
    ```json
    {
        "status": 200,
        "message": "Success get recipe {recipeId}",
        "data": {
            "title": "string food name",
            "imageUrl": "image of food",
            "ingredements": [
                "string"
            ],
            "steps": [
                "string
            ]
        }
    }
    ```
