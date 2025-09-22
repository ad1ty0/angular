# Bootstrap Setup Instructions

Since you have Bootstrap files locally on your company laptop, follow these steps:

## Option 1: Copy Bootstrap files to your project

1. Copy your local Bootstrap CSS file to: `src/assets/css/bootstrap.min.css`
2. Copy your local Bootstrap JS file to: `src/assets/js/bootstrap.min.js` (if needed)

3. Add to `src/index.html`:
```html
<link rel="stylesheet" href="assets/css/bootstrap.min.css">
<script src="assets/js/bootstrap.min.js"></script>
```

## Option 2: Reference from a local directory

1. Create an `assets` folder in `src/` if it doesn't exist
2. Create a symlink or copy your Bootstrap folder to `src/assets/bootstrap/`
3. Add to `angular.json` in the `styles` array:
```json
"styles": [
  "src/assets/bootstrap/css/bootstrap.min.css",
  "src/styles.css"
]
```

## Option 3: Use CDN (if allowed)

Add to `src/index.html`:
```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
```

Choose the option that works best with your company's security policies.
