# DevTools Toolkit

A modern and lightweight toolbox for developers, built with Next.js 14 and TypeScript.

## Features

  - **JSON Formatter:** Format, validate, and minify JSON data.
  - **Hash Generator:** Generate MD5, SHA-1, and SHA-256 hashes from text.
  - **Base64 Encoder/Decoder:** Encode and decode strings using Base64.
  - **URL Encoder/Decoder:** Encode and decode URL components.
  - **Color Picker:** Select colors and convert between formats (Hex, RGB, HSL).
  - **Regex Tester:** Validate and test regular expressions against strings.

## Tech Stack

  - Next.js 14 (App Router)
  - TypeScript
  - Tailwind CSS
  - Lucide React (for icons)

## Getting Started

To get a local copy up and running, follow these steps.

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/devtools-toolkit.git
    cd devtools-toolkit
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) in your browser to see the result.

## Deployment

This project is optimized for deployment on Vercel.

To deploy your instance, install the Vercel CLI and run the following command:

```bash
vercel --prod
```

## Customization

The project is structured for easy extension:

  - **Add a new tool:** Create a new component in the `app/tools/` directory.
  - **Modify styling:** Global styles and Tailwind CSS configuration can be adjusted in `app/globals.css` and `tailwind.config.ts`.
  - **Update the homepage:** Add a new card for your tool in `app/page.tsx`.