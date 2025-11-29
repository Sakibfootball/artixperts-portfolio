# Deploying to Render

This guide will help you deploy your Next.js application to Render.

## Prerequisites

- A [Render](https://render.com) account.
- Your project pushed to a GitHub repository.
- Your Sanity Project ID and Dataset name.

## Option 1: Using `render.yaml` (Recommended)

We have included a `render.yaml` file in your project which automates the configuration.

1.  **Log in to Render** and go to your [Dashboard](https://dashboard.render.com/).
2.  Click **New +** and select **Blueprint**.
3.  Connect your GitHub account if you haven't already, and select your repository.
4.  Render will detect the `render.yaml` file.
5.  You will be prompted to enter the values for the environment variables defined in `render.yaml`:
    -   `NEXT_PUBLIC_SANITY_PROJECT_ID`: Enter your Sanity Project ID.
    -   `NEXT_PUBLIC_SANITY_DATASET`: Enter your Sanity Dataset name (e.g., `production`).
6.  Click **Apply**. Render will start building and deploying your app.

## Option 2: Manual Setup

If you prefer to configure it manually:

1.  **Log in to Render** and click **New +** -> **Web Service**.
2.  Connect your repository.
3.  Configure the service:
    -   **Name**: `artiexperts-portfolio` (or your preferred name)
    -   **Runtime**: `Node`
    -   **Build Command**: `npm install && npm run build`
    -   **Start Command**: `npm start`
4.  **Environment Variables**:
    Scroll down to the "Environment Variables" section and add the following:
    -   `NODE_VERSION`: `20.0.0`
    -   `NEXT_PUBLIC_SANITY_PROJECT_ID`: Your Sanity Project ID.
    -   `NEXT_PUBLIC_SANITY_DATASET`: Your Sanity Dataset name.
    -   `NEXT_PUBLIC_SANITY_API_VERSION`: `2025-11-16`
5.  Click **Create Web Service**.

## Troubleshooting

-   **Build Failures**: Check the logs. Common issues include missing environment variables or type errors during build.
-   **Sanity Issues**: Ensure your Sanity dataset is public or that you have configured a token if it's private (though for public read, just the ID and Dataset are usually enough for the frontend).

## Sanity Configuration (Important)

Your Sanity Studio is embedded in your Next.js application at the `/studio` route. When you deploy your app, the Studio is deployed with it.

**However, you must authorize your deployed application to communicate with Sanity.**

1.  Go to [sanity.io/manage](https://www.sanity.io/manage).
2.  Select your project.
3.  Go to the **API** tab.
4.  Scroll down to **CORS Origins**.
5.  Click **Add CORS Origin**.
6.  Enter your Render deployment URL (e.g., `https://artiexperts-portfolio.onrender.com`).
    -   *Tip: You can find this URL in your Render dashboard after the service is created.*
7.  Check **Allow credentials**.
8.  Click **Save**.

If you skip this step, the Studio at `/studio` will not load and you may see CORS errors in the console.

