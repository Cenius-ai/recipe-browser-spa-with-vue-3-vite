# Usage

Once the development server is running (`npm run dev`), open `http://localhost:5173` in a web browser.

## Routes and Screens

The app is a single-page application with the following client-side routes:

### Home (`/`)
The landing page displays all available recipes. Use the **SearchBar** component at the top to filter by recipe name or ingredient. The **CategoryFilter** component lets you narrow results by category (e.g., "breakfast", "dinner"). Each recipe is displayed as a **RecipeCard**; click one to view its detail.

### Category View (`/category/:slug`)
Shows recipes belonging to a specific category. The `:slug` comes from the recipe data (e.g., `/category/breakfast`).

### Recipe Detail (`/recipe/:id`)
Displays the full details of a single recipe: title, image, cooking time, servings, ingredient list, and step-by-step instructions. The recipe `:id` matches a recipe object's `id` from `src/data/recipes.json`.

### Favorites (`/favorites`)
Requires authentication. If you are not logged in, you will be redirected to `/login`. Once authenticated, this page shows all recipes you have saved as favorites (persisted in `localStorage`).

#### Logging in
Navigate to `/login`. The login page (implemented in `src/views/LoginView.vue`) simulates authentication: it stores a token `auth_token` in `localStorage`. After login, you are redirected back to the favorites page. There is no real backend, so any credentials will work—just click the login button.

### About (`/about`)
Information about the Recipe Browser app.

### Not Found (`/:pathMatch(.*)*`)
Any undefined route displays a 404 page (`src/views/NotFoundView.vue`).

## Navigation

Use the **bottom navigation bar** (footer) to quickly switch between Browse (Home), Favorites, and About. The footer is always visible on mobile screens.

## Favorites Toggle

On any recipe card or detail page, you can toggle the favorites status using the **FavoritesToggle** component. This adds or removes the recipe from the favorites list stored in the `favorites` Pinia store (backed by `localStorage`).

## Search & Filter

- **Search** (`SearchBar.vue` + `useSearch.js`) filters recipes client-side as you type.
- **Category filter** (`CategoryFilter.vue` + `useCategoryFilter.js`) shows category tabs that filter by recipe category.

Both filters work together; you can combine a search term with a selected category.