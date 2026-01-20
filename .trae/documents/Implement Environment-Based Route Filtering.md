I will implement the environment-based route filtering by modifying the configuration files.

**1. Modify `config/routes.ts`**
Add a custom `devOnly: true` property to the specific routes that should be hidden in production.
- Add `devOnly: true` to the '前端草稿' (Frontend Draft) route definition.
- Add `devOnly: true` to the '图表' (Charts) route definition.

**2. Modify `config/config.ts`**
Implement logic to filter out these routes during the production build.
- Create a `filterRoutes` function that recursively checks for the `devOnly` property.
- If `process.env.NODE_ENV === 'production'`, execute the filtering logic to exclude any routes marked with `devOnly: true`.
- Use the filtered routes list in the Umi configuration.

This approach ensures that these routes are completely removed from the production build, providing both security and a cleaner user interface.