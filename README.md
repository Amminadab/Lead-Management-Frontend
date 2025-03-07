# Lead Manager Frontend

A modern, responsive frontend for the Lead Manager application built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Modern UI with Shadcn UI components
- Dark/light mode toggle
- Form validation with React Hook Form and Zod
- Responsive design for all device sizes
- Loading states with skeleton components
- Toast notifications for user feedback

## Tech Stack

- **Next.js 14**: React framework with App Router
- **TypeScript**: For type safety
- **Tailwind CSS**: For styling
- **Shadcn UI**: For UI components
- **React Hook Form**: For form handling
- **Zod**: For schema validation
- **Axios**: For API requests
- **React Hot Toast**: For notifications

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository (if you haven't already):

```bash
git clone https://github.com/Amminadab/Lead-Management-Frontend.git
cd lead-manager/frontend
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:
   - Create a `.env.local` file in the frontend directory
   - Add the following variables:

```
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

### Running the Application

1. Start the development server:

```bash
npm run dev
# or
yarn dev
```

2. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
# or
yarn build

```

## Notes

- The frontend communicates with the backend API at the URL specified in the `NEXT_PUBLIC_API_URL` environment variable.
- Make sure the backend server is running before starting the frontend.
- The dark/light mode toggle persists user preference in localStorage.
