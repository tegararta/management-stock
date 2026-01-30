# Management Stock

This repository contains a stock management system built with a Django backend and a Next.js frontend.

## Project Structure

- **backend/**: Contains the Django backend, including APIs for authentication and product management.
  - `api/auth/`: Handles user authentication.
  - `api/produk/`: Manages product-related operations.
  - `config/`: Django project settings and configurations.
  - `manage.py`: Django's command-line utility.

- **frontend/**: Contains the Next.js frontend for the application.
  - `app/`: Includes pages and layouts for the frontend.
  - `lib/`: Contains shared utilities like API calls and type definitions.

## Getting Started

### Backend
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the development server:
   ```bash
   python manage.py runserver
   ```

### Frontend
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Run the development server:
   ```bash
   pnpm dev
   ```

## License

This project is licensed under the MIT License.