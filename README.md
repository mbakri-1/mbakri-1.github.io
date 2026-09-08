# Mohammed Fouad — Portfolio

A responsive personal portfolio with light/dark themes, animated sections, visible profile links, and an editable project system.

## Make it yours

- **Profile text and links:** edit `index.html`.
- **Projects:** edit `js/projects.js`. Duplicate one project object, update its text and links, and the new card appears automatically.
- **Profile photo:** replace `images/mohammed-fouad.png` with another square image using the same filename.
- **Colors:** edit the light and dark variables at the top of `css/style.css`.
- **Motion:** animation timing and reduced-motion support live in `css/style.css` and `js/script.js`.

When you know a project's exact GitHub repository or demo URL, replace its `repository` or `demo` value in `js/projects.js`. Set either value to `null` to hide that link.

## Preview locally

```bash
npm install
npm run dev
```

Open the local address shown in the terminal.

## Production build

```bash
npm run build
```

The optimized site is written to `dist/`.
