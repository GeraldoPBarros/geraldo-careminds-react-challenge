## Project Description

This is a Next.js application that allows you to manage your investment wallets and the assets within each wallet. You can create new wallets, add, edit, and delete assets, and also modify or remove existing wallets. The application uses a JSON server as a simple backend for data storage.

## Demo Account:

Email: demo@example.com / 
Password: 123456

## Dependencies Explanation

Here's a breakdown of the main libraries used in this project:

**Core Framework & UI:**

* **`nextjs` (version 15.3.1):** Next.js framework. It provides features like server-side rendering (SSR), static site generation (SSG), routing, and API routes, making it easier to build performant and SEO-friendly React applications. The `--turbopack` flag used in the `dev` script indicates the experimental Turbopack bundler is being utilized for potentially faster development builds.
* **`react` (version 19.0.0):** The fundamental JavaScript library for building user interfaces. Next.js is built on top of React.
* **`react-dom` (version 19.0.0):** Provides the entry point to the DOM and server-rendering functionalities for React.

**UI Components & Styling:**

* **`@radix-ui/react-dialog` (version 1.1.11):** A set of unstyled, accessible UI primitives for building dialog (modal) components. It provides the foundational structure and behavior for modals, allowing for customization of appearance.
* **`@radix-ui/react-label` (version 2.1.4):** Another Radix UI primitive, this provides accessible labels associated with form elements.
* **`class-variance-authority` (version 0.7.1):** A utility function for creating reusable and type-safe Tailwind CSS variant classes. It helps manage the different visual states and styles of your components.
* **`clsx` (version 2.1.1):** A tiny utility for constructing `className` strings conditionally, which is very useful when working with Tailwind CSS and dynamic styling.
* **`lucide-react` (version 0.503.0):** A library of beautiful and consistent open-source icons implemented as React components. This provides a set of icons you can easily use in your application.
* **`react-icons` (version 5.5.0):** Another popular icon library that provides a wide range of icons from different icon sets (like Font Awesome, Material Icons, etc.) as React components.
* **`react-toastify` (version 11.0.5):** A library that makes it easy to display elegant and customizable toast notifications in your React application for user feedback.
* **`tailwind-merge` (version 3.2.0):** A utility function to intelligently merge Tailwind CSS class names, resolving conflicts and ensuring the correct styles are applied. This is helpful when combining dynamic class names.

**Backend & Data:**

* **`json-server` (version 1.0.0-beta.3):** A simple way to create a full fake REST API with zero coding in less than 30 seconds. It uses a `db.json` file (located in `src/db/` in this project) to serve data and handle basic CRUD (Create, Read, Update, Delete) operations. This is likely used for development and testing purposes to simulate a real backend.
* **`firebase` (version 11.6.1):** A comprehensive Backend-as-a-Service (BaaS) platform by Google. It offers various services like a NoSQL database (Firestore), authentication, storage, and more. In this application, it's likely used for storing and managing the investment wallet and asset data in a more persistent and scalable way than `json-server`, especially for a production environment. **In this project was used only for authentication**

**Utility:**

* **`uuid` (version 11.1.0):** A library for generating universally unique identifiers (UUIDs). These are often used to uniquely identify wallets and assets within the application's data.

## Running the Application

Follow these steps to run the Next.js application:

1.  **Navigate to the project directory:**
    ```bash
    cd your-project-directory
    ```
    (Replace `your-project-directory` with the actual name of your project folder).

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```
    This command will download and install all the necessary libraries listed in the `package.json` file.

3.  **Start the Next.js development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```
    This command will start the Next.js development server using Turbopack. You should then be able to access the application in your web browser, usually at `http://localhost:3000`.

## Running the JSON Server

The `json-server` is likely used as a mock backend for development. Here's how to run it:

1.  **Make sure you have `json-server` installed globally or as a project dependency.** You should have it installed as a project dependency because it's listed in your `package.json`.

2.  **Check the `scripts` section in your `package.json` file for the `server` script:**

    ```json
    "scripts": {
      "dev": "next dev --turbopack",
      "build": "next build",
      "start": "next start",
      "lint": "next lint",
      "server": "json-server src/db/db.json --port 5000"
    }
    ```

    As you can see, there's a script named `server` defined to run the `json-server` command. It's configured to watch the `db.json` file located in the `src/db/` directory and serve the data on port `5000`. The `--port 5000` flag explicitly sets the server to run on this port.

3.  **Run the JSON server using the `server` script:**
    ```bash
    npm run server
    # or
    yarn server
    # or
    pnpm run server
    ```
    This command will start the JSON server. You should see output in your terminal indicating that the server is running, specifically at `http://localhost:5000`.
