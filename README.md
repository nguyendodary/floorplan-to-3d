# Roomifi - 2D to 3D Floor Plan Visualization

Roomifi is a modern web application that transforms 2D floor plans into photorealistic 3D architectural renders using the Puter.js AI ecosystem.

## 🚀 Features

- **2D to 3D Transformation**: Upload a 2D floor plan image and get an AI-generated 3D interior render instantly.
- **Community Feed**: Share your transformations and explore what others are creating.
- **Auth & Cloud-Ready**: Powered by Puter.js for authentication, AI, and key-value storage.
- **Modern UI/UX**: Built with React 19, Vite, Tailwind CSS, and Framer Motion for a premium, responsive experience.

---

## 🛠 Prerequisites

Before starting, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 20 or higher)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/) (optional, for containerized run)

---

## 💻 Local Installation & Development

To run the application directly on your machine:

1. **Clone the repository**:
   ```bash
   git clone <repository_url>
   cd roomifi/roomifi
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:5173`.

4. **Build for production**:
   ```bash
   npm run build
   ```
   The build artifacts will be located in the `dist/` directory.

5. **Preview production build**:
   ```bash
   npm run preview
   ```

---

## 🐳 Running with Docker

Roomifi is fully containerized for easy deployment.

### Using Docker Compose (Recommended)

To build and run the application in a single command:

1. **Start the container**:
   ```bash
   docker-compose up -d --build
   ```

2. **Access the application**:
   Open your browser and navigate to `http://localhost:8080`.

3. **Stop the container**:
   ```bash
   docker-compose down
   ```

### Manual Docker Build

If you Prefer to build and run the image manually:

1. **Build the image**:
   ```bash
   docker build -t roomifi-app .
   ```

2. **Run the container**:
   ```bash
   docker run -d -p 8080:80 --name roomifi roomifi-app
   ```

---

## 🏗 Project Architecture

- **Frontend**: React 19 (Hooks, Context API).
- **Styling**: Tailwind CSS + Framer Motion (Animations).
- **Backend/Services**: 
  - **Puter.js SDK**: Handles Authentication, FS, KV storage, and AI processing.
  - **AI Logic**: 
    - `puter.ai.txt2img`: Generates the 3D render using image-to-image synthesis.
    - `puter.kv`: Stores transformation history.

---

## 📝 License

This project is for demonstration purposes. Inspired by modern architectural visualization tools.
