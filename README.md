# E-Commerce Website

This project is a modern e-commerce website built using **Next.js** and **Tailwind CSS**, featuring a sleek dark theme. The primary focus is on creating a user-friendly and visually appealing interface. Additional accent colors include electric blue, cyan, fiery orange, and soft purple.

## Features

- **Dark Theme:** A visually appealing dark theme with carefully chosen colors for a modern look.
- **Responsive Design:** Fully responsive across devices including desktops, tablets, and mobile phones.
- **Welcome Screen:** An engaging landing page for the website using the specified color scheme.
- **Tailwind CSS Integration:** Highly customizable and efficient styling with Tailwind CSS.

## Tech Stack

- **Next.js:** React-based framework for building fast and SEO-friendly web applications.
- **Tailwind CSS:** Utility-first CSS framework for rapid UI development.

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/Anoteros09/kewl-e-com.git
   ```

2. Navigate to the project directory:

   ```bash
   cd kewl-e-com
   ```

3. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

4. Setting Up the `.env.local` File

   To configure environment variables for the application, create a `.env.local` file in the root of your project. 
   This file is used to store sensitive or environment-specific variables and should not be committed to version control (ensure `.env.local` is listed in your `.gitignore`).
   
   #### Steps
   
   i. Create a new file named `.env.local` in the root directory of your project:
      ```bash
      touch .env.local
      ```
   
   ii. Add the required environment variables to the file. Here's an example:
      ```env
      NEXT_PUBLIC_JWT_KEY=your-hash-string
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
      CLERK_SECRET_KEY=your-clerk-secret-key
      DATABASE_URL=your-db-details
      .
      .
      ```
   
   ##### Notes
   - Prefix environment variables with `NEXT_PUBLIC_` if they need to be exposed to the browser.
   - *IF USING `NEXT_PUBLIC_[Var]` please use server action to avoid exposing environment variable to browser*
   - Avoid sharing sensitive information in publicly accessible variables.

5. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## File Structure

```
.
├── pages
│   ├── layout.jsx        # Entry point of the application
│   ├── page.jsx          # Welcome screen
├── styles
│   ├── globals.css       # Global styles
├── public
│   ├── assets            # Static assets like images
├── README.md             # Project documentation
├── package.json          # Project dependencies
```

## Color Scheme

- **Background:** Black (#000000)
- **Foreground:** White (#FFFFFF)
- **Primary 1:** Electric Blue (#007BFF)
- **Primary 2:** Vibrant Cyan (#00D1FF)
- **Secondary 1:** Fiery Orange (#FF6B35)
- **Secondary 2:** Soft Purple (#9C88FF)

## Roadmap

- [x] _Create a base web application with custom dark theme style_
- [x] _Create a responsive navbar_
- [x] _Create basic routes_
  - Products list
  - Cart
  - Orders
  - Profile
- [x] _Implement Zustand state management_
- [x] _Create filter component_ for filtering based on various aspects
- [x] _Responsive grid_ according to the screen size
- [ ] _Product Page_ to view detailed info
- [ ] _Pagination_ to load data efficiently
- [ ] _Search functionality_ to search based on keywords/tags
- [x] _Add to cart functionality_
- [ ] Add to cart for Non-signed in user
- [ ] _Cart page_ to view items added in cart
- [ ] _Orders page_ to view ordered items based on selected timeline
- [x] _Setup database_ to store user order data
- [x] _Add authentication using Clerk_

## Contributing

Contributions are welcome! If you have ideas for improvements or encounter issues, please feel free to create a pull request or submit an issue.

## License

This project is licensed under the [MIT License](LICENSE).

## Author

[Anurag](https://github.com/Anoteros09)

---
