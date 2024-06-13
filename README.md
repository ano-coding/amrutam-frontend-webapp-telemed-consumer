# Amrutam Frontend Webapp Telemed Consumer

This project is the frontend web application for Amrutam, an Ayurvedic lifestyle brand and wellness community, focusing on telemedicine for consumers. It is built using React and leverages Vite for an optimized development experience.

## Getting Started

### Prerequisites

Before you begin, ensure you have installed the latest version of [Node.js](https://nodejs.org/). This project was built using Node.js version 14.x or higher.

### Installation

1. Clone the repository to your local machine:

```sh
git clone https://github.com/amrutamofficial/amrutam-frontend-webapp-telemed-consumer.git
```

2. Navigate to the project directory:

```sh
cd amrutam-frontend-webapp-telemed-consumer
```

3. Install the project dependencies:

```sh
npm install
```

### Running the Development Server

To start the development server, run:

```sh
npm run dev
```

This will launch the Vite development server, and you can view the application in your browser at `http://localhost:3000`.

### Building for Production

```sh
npm run build
```

This will generate a dist directory with your compiled assets, ready to be deployed.

## Project Structure

The project follows a standard React application structure, enhanced with Vite for tooling and Tailwind CSS for styling.

```
.
├── .eslintrc.cjs
├── .gitignore
├── .prettierrc
├── index.html
├── package.json
├── postcss.config.js
├── public/
├── README.md
├── src/
│   ├── App.jsx
│   ├── components/
│   ├── features/
│   │   ├── Appointments/
│   │   ├── Call-Recordings/
│   │   ├── Caregiver/
│   │   ├── Chats/
│   │   ├── Consumer/
│   │   ├── Doctor/
│   │   ├── Forum/
│   │   ├── Medical-Records/
│   │   ├── Payments/
│   │   ├── Questionnaire/
│   │   └── Routine/
│   ├── index.css
│   ├── main.jsx
│   └── pages/
├── tailwind.config.js
└── vite.config.js

```

- `src/`: Contains the source code for the application, including components, styles, and the main entry point.
- `public/`: Houses static assets like images and icons.
- `index.html`: The entry HTML file for the application.
- `package.json`: Defines the project dependencies and scripts.
- `vite.config.js`: Configuration for Vite, the build tool used in the project.
- `.eslintrc.cjs` and `.prettierrc`: Configuration files for ESLint and Prettier, ensuring code quality and consistency.
