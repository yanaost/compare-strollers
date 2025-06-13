# Stroller Comparison Frontend

A modern, user-friendly web application for comparing different stroller models. Built with React, TypeScript, and Material-UI, this application helps parents make informed decisions when choosing a stroller by providing detailed feature comparisons.

## Features

- 🔍 **Smart Search**: Search strollers by model name, brand, or alternative names
- 📊 **Detailed Comparison**: Compare multiple strollers side by side with organized feature groups
- 🎨 **Modern UI**: Clean and intuitive interface built with Material-UI
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🔄 **Real-time Updates**: Instant search results and comparison updates

## Feature Groups

The comparison is organized into logical groups:

- Basic Information
- Dimensions & Weight
- Seat Features
- Safety & Comfort
- Storage & Accessories

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend server running on port 5001

### Installation

1. Clone the repository
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
4. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

The application will be available at `http://localhost:3000`

## Usage

1. **Search for Strollers**

   - Use the search bar to find strollers by name or brand
   - Results appear in real-time as you type

2. **Compare Strollers**
   - Select strollers from the search results
   - View detailed comparisons organized by feature groups
   - Compare specifications side by side

## Technical Stack

- **Framework**: React with TypeScript
- **UI Library**: Material-UI (MUI)
- **State Management**: React Context API
- **API Communication**: Axios
- **Type Safety**: TypeScript interfaces for all data structures

## Project Structure

```
frontend/
├── src/
│   ├── components/        # Reusable UI components
│   ├── types/            # TypeScript type definitions
│   ├── services/         # API service functions
│   ├── context/          # React context providers
│   └── utils/            # Utility functions
├── public/               # Static assets
└── package.json          # Project dependencies
```

## API Integration

The frontend communicates with the backend API running on port 5001. Key endpoints include:

- `GET /api/strollers/search?query=...` - Search strollers
- `GET /api/strollers/comparison-data?ids=...` - Get detailed comparison data

## License

This project is licensed under the MIT License - see the LICENSE file for details.
