# NgCocktails

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.0.

## Development server

Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `npm run test` to execute the unit tests via [Karma].

# Intro

This project is using the 'TheCocktailDB' api in order to fetch & present a list with all the Cocktails available in the api.
Each Cocktail item is selectable and a new page will open presenting further details like ingredients, instructions etc.

## Functionalities

Theme toggling is supported for light-dark theme switch at the top right of the header.
Clicking on the logo will return to Home page.
Pagination for the list results is added at the bottom of the page.
At details page, instructions language can be changed to each one available.

## Implementation

### Folder Structure
The folder structure under 'app' folder is divided in three main sub-folders: Core, Pages, Shared & Testing.

Core folder includes everything that is crucial for the functionality of the app and usually are instantiated only once,
and this can include some singleton services, static components (header, footer etc), interceptors, resolvers etc.

Pages folder contains all the components that are entry components for each route (list, details, not-found etc)

Shared folder contains components, helpers, models, services etc that can be used multiple times across the app.

Testing folder is all about testing stubs, mocks etc that are needed for the unit tests.

### Layout & Style

A Layout component is used as a container for the rest of the application via the 
routing system for each route that belongs under the base url. This is done as a pattern for 
using different layouts per route in the future. For example, there could be a login page with different layout,
so components like the header might not be needed there and the styling might also be different.

In the 'assets' folder, all the images and global styles are located. 

The styling is done using scss and there are some files for each main styling category like colors, typography etc.
There are color variables for the light and dark theme and depending on selection the app has different colors, using the same variable names.
This happens because the same variable names are declared either in ':root{}' or in '.theme-dark', so by toggling the latter class in the body element the values of the colors change.

Each component has it's specific styling inside a scss file located in every components' folder.

### Design

A global State service is instantiated and contains the data for Cocktails List & selected Cocktail Details.

An interceptor is catching all the requests for presenting/hiding a loader and another interceptor catches all the network errors.
The data fetching for each page is happening inside a corresponding resolver that firstly check if there are existing data in the State,
before sending an api request.

The data fetching of All the Cocktails available was not possible in a single-call since the api does not support this, so a workaround was used,
taking advantage the api endpoint for fetching all cocktails by the starting letter, the resolver is using a forkjoin to fetch multiple results for
each letter of the alphabet and the a random sorting is applied on the unified-flattened result.

Since the app gets all available Cocktails at the start of the App, all the filtering is taking place in the FE and no further call 
is done to the api. Even when a single Cocktail Details page is opened from the list, the data are set in State. If a Cocktail Details page
is visited directly, then and only then the app will call the api for the details. The same applies if we need to go back to Cocktails List page.

### Performance

In terms of performance, the first and foremost was the usage of lazy-loading for the pages.

The main concern of this app was the heavy network requests when loading the list for the first time.
- As a start, the usage of a forkjoin for the requests, makes them run in parallel.
- Then the new NgOptimizedImage directive was used to handle the loading of all these images and even further a pagination was used,
so that the number of images to load when scrolling are minimized.
- The usage of state in order to reduce extra calls to the api since the data are already available in the FE.
