This is a simple todo app. Backend is in .Net Core. Frontend is in Angular 11.
Supported features:
 - List Todo Items
 - Add a Todo item
 - Update a Todo item
 - Delete Todo Item
 - Mark Item as Completed

# Instalation
 1)download this repo  
 2)navigate to ToDoApp\TodoApp.Api open the solution and start ToDoApp.Api project. This is an api for a frontend  
 3)frontend part is expecting, that api will be on http://localhost:54825. If on the step2 iis started with another port,
 navigate to ToDoApp\ToDoApp.Frontend\src\environments, open environment.ts and update the apiUrl parameter with the proper url of ToDoApp.Api.  
 4)open terminal, navigate to ToDoApp\ToDoApp.Frontend and run npm install to install js libraries  
 5)in the terminal, run ng serve to run a frontend part  
 6)open a browser and navigate to http://localhost:4200/ to use the app.  
