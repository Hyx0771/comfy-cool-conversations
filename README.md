# Clobol Chat Widget Project

## Project Overview

This project contains both a full web application and an embeddable chat widget that can be deployed to any website.

**Main App URL**: https://lovable.dev/projects/86f9b26b-89a7-43b1-8459-fdcf309dff5d

## Components

- **Main Application**: Full-featured chat application with FAQ, HVAC quotes, and support
- **Embeddable Widget**: Standalone widget for embedding on external websites

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/86f9b26b-89a7-43b1-8459-fdcf309dff5d) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Deployment Options

### Main Application
Simply open [Lovable](https://lovable.dev/projects/86f9b26b-89a7-43b1-8459-fdcf309dff5d) and click on Share -> Publish.

### Embeddable Widget
The widget can be deployed separately for embedding on external websites:

```bash
# Build the widget
node build-widget.js

# Deploy to Netlify or any static hosting service
# Upload contents of 'dist-widget' folder
```

**Widget Deployment Guide**: See [WIDGET-DEPLOYMENT.md](./WIDGET-DEPLOYMENT.md) for detailed instructions.

### Custom Domain

**For Main App**: Navigate to Project > Settings > Domains and click Connect Domain in Lovable.

**For Widget**: Configure custom domain in your hosting provider (e.g., Netlify).

Read more: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Build Scripts

```bash
# Development
npm run dev

# Build main application
npm run build

# Build embeddable widget
node build-widget.js
```
