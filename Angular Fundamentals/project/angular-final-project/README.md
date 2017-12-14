# AngularFinalProject – STORAGR


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.3. This project is a part of the Angular Fundamentals course at SoftUni.

## 1. Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## 2. Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## 3. Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## 4. Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## 5. Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## 6. Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## 7. About the Project

**_STORAGR_** is an e-commerce project which consists of products catalog and a map, displaying all of the locations where the product is in storage.

### 7.1 User roles

There are 2 user roles: `user` (which is the default role for every user) and `admin`, which can be only created from the database core. User roles can also be managed directly from the database inerface, since this project depends on **_Kinvey_** as a REST service and it offers a very easy way to manage not only user roles, but also the whole database structure of your project. More information about **_Kinvey_** can be found on: [Kinvey](https://www.kinvey.com/)

### 7.2 What can users do?

After a successful login/register, every user can explore the site catalog and see the details for the different items displayed. They can order the item if it is not out of stock and also manage their orders from the **_My Orders_** menu. 
Users can cancel their orders until they receive status “Complete”. Once complete, the order stays in the user’s orders list and the user can remove it from his orders list if he wants to.
Users are not allowed to enter any URLs purposed to be used from the admin.

### 7.3 What can admin do?

Unlike the user’s opportunities, admins have a lot more control over the site. Every admin can Create and Edit a product and also manage the orders of all of the users (change their status). They also have users functionality, such as ordering a product and managing their own orders.

## 8. Public Part

Every user can explore the site catalog or see all of the available storage locations on the site, without having to create an account. But in order to see items details, order any item and manage his orders, the user must create an account or log in if he already has one.

## 9. Storages and Map Displaying

In order to display all storages available and all of the storages in which a current item is in stock, the project depends on `Leaflet` as an open-source JavaScript library for mobile-friendly interactive maps. Full information about it can be found on: [LeafletJS](http://leafletjs.com/)

## 10. UI & UX

This project is designed with `Materalize` - a modern responsive front-end framework based on Material Design. Full information about it can be found on: [Materialize](http://materializecss.com/)

Any suggestions for improving the project idea and functionality would be gladly discussed. Star the repository if you find it useful.

