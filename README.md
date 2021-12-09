# PROJECT3

## Description

Platform to search create and share recipies.


## User Stories

- **404** - Display a 404 page when a page does not exist.
- **homepage** - Users can acces the homepage and search recipies or check the Top rankings.
- **sign up** - User can sign up on the app to be able to login.
- **login** - User can log in in theyr account.
- **logout** - User can logout from the app.
- **profile** - User can display theyr account information and delete saved recipies or created Recipies.
- **editprofile** - User can edit theyr profile
- **Search recipies** - User can search recipies filtering on diferent ways: By ingredients, by kind of cuisine and by time of preparation. 
- **Top rankings** - User can choose 3 diferent rankings: Top recipies, top ingredients and top cuisine.
- **Top rankings recipies** - User can se the top 3 recipies of the week, by clicking to any recipy we will display the recipy.
- **Top rankings ingredients** - User can se the top 3 ingredients of the week, by clicking to any ingredient we will display 3 recipies done with that ingredient. We will be able to click again to the recipy to display it. 
- **Top rankings cuisine** - User can se the top 3 food "cuisine" of the week, by clicking to any, we will display 3 recipies of that type of cuisine. We will be able to click again to the recipy to display it. 
- **Create Recipy** - User will fill in a form in order to create a recipy
- **Display Recipy**- User can display recipies. 
- **logout** - Nav bar at the bottom of the screen includes 4 links: homepage link, top rankings link, create recipy link and profile link. 



## Server routes

| **Method** | **Route**                       | **Description**                                                                            | Request - Body            |
| ---------- | ------------------------------- | ------------------------------------------------------------------------------------------ | ------------------------- |
| `GET`      | `/` | Main page route. Renders home `index` view. |  |
| `GET`      | `/users/login` | Renders `login`  view.  |  |
| `POST`     | `/users/login` | Sends Login form data to the server. | { email, password }  |
| `GET`      | `/users/signup`| Renders `signup-form` view. |    |
| `POST`     | `/users/signup`| Sends Sign Up info to the server and creates user in the DB. | { name,lastname, email, password } |
| `GET`      | `/users/logout`| Deletes session and redirects to `signup-form`  |   |
| `GET`      | `/users/profile`| Renders {avatarUrl, name , email} to the server  |
| `POST`     | `/users/profile/:id`| Deletes recipies on the server and updates recipies in DB redirectos to `/users/profile`.  |   |
| `GET`      | `/users/edit-profile/`| renders `edit-profile` view.  |   |
| `POST`     | `/users/edit-profile/`  | edits users to the DB and redirects to `/users/profile` |
| `GET`      | `/users/notifications`  | Renders notifications view.  |
| `GET`      | `/recipy/home` | Renders homepage where user can chose to filter by ingredients or type of cuisine  |   |
| `POST`      | `/recipy/home` |   |    |
| `GET`     | `/recipy/search-by-ing`| Renders `search-by-ing` | |
| `POST`      | `/recipy/search-by-ing` | |    |
| `GET`      | `/top/recipies` | Renders `top-recipies` view. |
| `POST`     | `/top/recipies` |  |  |
| `GET`      | `/top/ingredients`  | Renders `top-ingredients` view. |   |
| `POST`     | `/top/ingredients` |   |   |
| `GET`      | `/top/recipieslist` | Renders `top-recipieslist` view.  |  |
| `POST`     | `/top/recipieslist`  | |  |
| `GET`      | `/top/cuisine`   | Renders `top-cuisine` view.  |  |
| `POST`     | `/top/cuisine` |  |    |



## Models

## User model

```javascript
{
  "avatarUrl": { type: String, default: '../images/avatar.png' },
  "name": String, required
  "lastname": String, required
  "email": String, unique, required
  "password": String, required
  "favRecipies": [{type:Schema.Types.ObjectId, ref: 'Recipies', default: [] }]
  "MyRecipies": [{type:Schema.Types.ObjectId, ref: 'Recipies', default: [] }]
  "favIngredients": [type:String]
  "restrictions": String, required


  
}
```

## Recipies model

```javascript
{
  "imgUrl": { type: String, default: '../images/avatar.png' }
  "name": String, required
  "ingredients": [{type:Schema.Types.ObjectId, ref: 'Ingredients', default: [] }]
  "time": Number, required
  "description": [type:String], required
  "type of cuisine": String
  "diet": String

}
```

## Ingredient model

```javascript
{
  "name": String, required
  "quantity": Number
  "type": String, required  
}


## Links

#### Git

[Repository Link](https://github.com/orgs/giofagi-corp/repositories)

#### Trello

[Our Trello board](https://trello.com/b/VN3t67SR/what-the-food)

#### Slides

[Our Trello board]()
