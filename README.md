# Bundle Builder

A responsive multi-step bundle builder built with React. The application allows users to configure a home security system, manage product quantities and variants, review their selections in real time, and save their configuration for later.

---

## Demo

> Add your deployed application link here.

```
[https://your-demo-url.com](https://wyze-bundle-builder-eta.vercel.app/)
```

---

## Repository

> Add your GitHub repository link here.

```
[https://github.com/your-username/bundle-builder](https://github.com/AlaaTarek898/wyze-bundle-builder.git)
```

---

## Features

- Multi-step accordion bundle builder
- Live review panel
- Product variant selection
- Quantity management with synchronized steppers
- Real-time price calculation
- Savings calculation
- Responsive layout
- Save configuration using Local Storage
- Restore saved configuration after page refresh
- Context API state management
- JSON-driven product rendering

---

## Tech Stack

- React
- Context API
- Tailwind CSS
- React Hot Toast
- Vite

---

## Project Structure

```
src/
│
├── components/
│   ├── BuilderSection/
│   ├── BuilderStep/
│   ├── ProductCard/
│   ├── ProductGrid/
│   ├── ReviewPanel/
│   ├── ReviewSection/
│   └── AppLayout/
│
├── context/
│   └── BundleContext.jsx
│
├── data/
│   └── product.json
│
├── App.jsx
└── AppContent.jsx
```

---

## Installation

Clone the repository

```bash
git clone https://github.com/your-username/bundle-builder.git
```

Install dependencies

```bash
npm install
```

Run the development server

```bash
npm run dev
```

Build for production

```bash
npm run build
```

---

## State Management

The application uses **React Context API** to manage global state including:

- Bundle configuration
- Selected variants
- Current accordion step
- Open accordion section
- Quantity management
- Pricing calculations

This approach removes prop drilling and keeps the components clean and maintainable.

---

## Persistence

The bundle configuration is saved in **Local Storage**.

The following data is persisted:

- Selected products
- Product quantities
- Selected variants
- Current step
- Open accordion section

When the user returns or refreshes the page, the previous configuration is restored automatically.

---

## Design Decisions

- Product data is completely JSON-driven.
- Each product variant maintains its own quantity.
- Review panel stays synchronized with product cards.
- Local Storage was used for persistence instead of a backend API.
- Context API was chosen over Redux due to the application's size and requirements.


---

## Author

**Alaa Tarek**

Frontend Developer
