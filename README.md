# E-Commerce Site

## Description

This application utilizes back-end technologies such as Node.js, Express.js, and Sequelize to create a functional back-end for a simple E-Commerce website. The application allows a user to successfully make POST, GET, PUT, and DELETE requests to products, categories, and tags for the store. This means that a user can add and delete products/categories/tags on their site, and they can update existing information. If desired, a user can also display all products/categories/tags, or search specifically by ID.

I developed a strong appreciation for Sequelize as I built this application, and appreciated not having to worry as much about typing out MySQL queries manually (where it is easy to make simple syntax errors). I also became much more comfortable with using try/catch blocks, and also learned how to successfully implement async/await in several instances. Furthermore, I gained a greater understanding of why object-oriented programming is important, and how it makes the code easier to read and maintain.

A few ideas for future development include:

- Building the front-end for this application and connecting it to the back-end of the site
- Deploying the application on Heroku
- Creating search functionality that utilizes particular keywords

## Table of Contents

- [Installation](#Installation)
- [Usage](#Usage)
- [License](#License)
- [Contributing](#Contributing)
- [Tests](#Tests)
- [Questions](#Questions)
            
## Installation

For this application to run correctly, run ```npm init -y ``` in the working directory of your choice. Next, install the relevant dependencies by running ```npm i```. Alternatively, you can install the dependencies one at a time. Please note that it may take a few minutes for all dependencies to download on your local machine.

You will also need to create a .env file and include your username, password, and database name for MySQL:

Your .env file will look something like this:

```
DB_USER=''
DB_PW=''
DB_NAME=''
```

You will need to create the database in your own MySQL Workbench to ensure that the application runs properly.

To start the application from the command line after all installations have been complete, run the command ```npm run seed``` to seed data to the database you created, then run ```npm start```. You can then use a tool such as Insomnia to test all routes.
            
## Usage

## License

This project has not yet been licensed, and thus, standard copyright laws apply.
            
## Contributing

Valerie Russell is the sole contributor to this project. Starter code was provided by the MSU Coding Bootcamp/Trilogy Education Services.
            
## Tests
            
## Questions

If you have any questions about this application my GitHub username is
vruss14 and you can view my GitHub profile at https://github.com/vruss14.

If you have additional questions, feel free to reach out to me at vruss14@gmail.com.
