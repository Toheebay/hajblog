
# MarketChat App

A marketplace application with real-time chat, blog system, and donation features.

## Features

- Buy and sell items in a local marketplace
- Chat directly with sellers
- Blog system for community content
- Donation system to support the platform
- MongoDB database integration

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation

### Installation

1. Clone the repository
2. Install frontend dependencies:
```
npm install
```

3. Set up MongoDB:
   - Create a MongoDB cluster (Atlas or local)
   - Update the connection string in the `.env` file

4. Start the backend server:
```
node server.js
```

5. Start the frontend:
```
npm run dev
```

### Environment Variables

Create a `.env` file in the root directory with the following:

```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

## Project Structure

- `/src` - React frontend code
  - `/components` - UI components
  - `/contexts` - React contexts
  - `/data` - Sample data
  - `/pages` - Application pages
  - `/services` - API service functions
- `/models` - MongoDB schemas
- `/routes` - API routes
- `server.js` - Express server

## Technologies Used

- React (Frontend)
- Express (Backend)
- MongoDB (Database)
- Tailwind CSS (Styling)
- Tanstack Query (Data Fetching)
