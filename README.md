# Micro-Frontend Music Library Application

This repository contains two interconnected applications demonstrating a micro-frontend architecture: a main container application and a dynamically loaded music library application.

## How to Run Locally

To run both applications locally, follow these steps:

1.  **Clone the Repository:**

    For the Main Container App 
    ```bash
    git clone https://github.com/Rich-1007/main-music-library    
    ```
    
    For the Music Library App
    ```bash
    git clone https://github.com/Rich-1007/music-library
    
    ```

2.  **Install Dependencies:**
    Navigate into each application's directory and install its dependencies.

    For the Main Container App
    ```bash
    cd main-music-library
    npm install
    ```
    
    For the Music Library App
    ```bash
    cd music-library
    npm install
    ```


3.  **Start Each Application:**
    Open two separate terminal windows.

    In Terminal 1 (for Music Library App)
    ```bash
    cd music-library
    npm run dev
    ```

    This will typically start the music library app on `http://localhost:5001` (or a similar port). Ensure this port is accessible by the main app. (In the federation-remoteEntry - remote_app: path)

     In Terminal 2 (for Main Container App)
    ```bash
    cd main-music-library
    npm run dev
    ```

    This will typically start the main container app on `http://localhost:5000` (or a similar port). Once both are running, the main app should dynamically load the music library app.

## How I Deployed It

Both the main container application and the music library application were deployed to Vercel using the Vercel CLI.

1.  **Vercel CLI Installation:**
    Install the Vercel CLI globally:

    ```bash
    npm install -g vercel
    ```

2.  **Deployment Steps for Each App:**
    Navigate into each application's directory and run the `vercel` command.

    For the Main Container App
    ```bash
    cd main-app-directory
    vercel
    ```

    Follow the prompts to link your project and deploy.

    For the Music Library App
    ```bash
    cd music-library-app-directory
    vercel
    ```

    Follow the instructions to link your project and deploy.

    **Important Note:** The main application's configuration for loading the micro-frontend (music library) dynamically references the _deployed URL_ of the music library app. Ensure that the deployed URL of the music library app is correctly configured in your main application's code. (In the federation-remoteEntry - remote_app: path)
    
    ### Handling CORS Issues During Deployment
    
    When deploying micro-frontends to different networks or origins, you might encounter Cross-Origin Resource Sharing (CORS) errors. This happens because security restrictions prevent a web page from making requests to a different domain than the one that served the web page.
    
    To bypass potential CORS errors between the deployed main app and the music library app, the following steps were taken for the **music library app**:
    
    -   **`vercel.json` Configuration:** A `vercel.json` file was added to the root of the music library app's directory with the following configuration:
        
        JSON
        
        ```
        {
          "headers": [
            {
              "source": "/(.*)",
              "headers": [
                {
                  "key": "Access-Control-Allow-Origin",
                  "value": "*"
                },
                {
                  "key": "Access-Control-Allow-Methods",
                  "value": "GET,HEAD,PUT,PATCH,POST,DELETE"
                },
                {
                  "key": "Access-Control-Allow-Headers",
                  "value": "Content-Type, Authorization"
                }
              ]
            }
          ]
        }
        
        ```
        
        The `Access-Control-Allow-Origin: *` header allows requests from any origin. In a production environment, it is recommended to replace `*` with the specific domain of your main application for tighter security.
        
    -   **Disabling Vercel Protection:** For development and demonstration purposes, Vercel's default protection mechanisms (like some caching or security headers) were disabled for the deployed music library app directly from the Vercel project dashboard. This ensures that the custom CORS headers from `vercel.json` are honored without interference.

## Credentials for Admin and User

  * **Admin:**

      * **Username:** `admin@example.com`
      * **Password:** `adminpassword`

  * **Regular User:**

      * **Username:** `user@example.com`
      * **Password:** `password123`

## Explanation of How Micro Frontend and Role-Based Auth Work

### Micro Frontend Architecture

This project implements a micro-frontend architecture using **Vite**.

  * **Main Container App:** This application acts as the host. It is responsible for:

      * Providing the main layout and authentication.
      * Dynamically loading the music library micro-frontend at runtime.
      * Using `vite-plugin-federation`'s `remotes` configuration to specify the URL of the exposed music library app.

  * **Music Library App:** This is a micro-frontend application. It is responsible for:

      * Managing music-related functionalities - display songs list, filter, groupBy and other features.
      * Exposing its components and modules to the main container app using `vite-plugin-federation`'s `exposes` configuration.

The `@originjs/vite-plugin-federation` library uses Webpack's Module Federation concept to allow these two independent applications to share and use modules from each other during runtime. This allows each part of the application to be developed, deployed, and scaled independently.

### Role-Based Authentication

Role-based authentication is used to control access to certain features or content based on the user's assigned role (admin or regular user).

  * **Authentication Flow:**
      * Users log in with their credentials.
      * After a successful login, the system determines the user's role.
      * This role information is then used to:
          * **Conditionally display interface elements:** For instance, buttons or sections specific to administrators might only be visible to users with the 'admin' role.
          * **Control access to routes or components:** Security checks prevent unauthorized users from accessing certain parts of the application.

In this app, the admin can add and delete songs whereas a user can only view and filter the songs.
