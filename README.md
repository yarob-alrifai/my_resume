# Yarob Alrifai — Personal CV Website

A multilingual personal CV website supporting **English**, **Arabic (RTL)**, and **Russian**.

## 🚀 Live on GitHub Pages

After deploying, the site will be available at:  
`https://<your-username>.github.io/<repo-name>/`

## 📁 Project Structure

```
my_website/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # All styles (dark theme, responsive, RTL)
├── js/
│   └── app.js          # Dynamic rendering + language switching
├── data/
│   └── cv.json         # ⭐ All CV data in 3 languages — edit this file to update your CV
└── README.md
```

## ✏️ How to Update Your CV

**All content lives in `data/cv.json`.**  
You never need to touch HTML or JavaScript.

Each text field looks like:
```json
"title": {
  "en": "English text",
  "ar": "النص العربي",
  "ru": "Текст на русском"
}
```

Just edit the values and push to GitHub.

## 🌐 Deploy to GitHub Pages

1. Create a new repository on GitHub (e.g., `my-cv`)
2. Push this folder to the repo:
   ```bash
   git init
   git add .
   git commit -m "Initial CV website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/my-cv.git
   git push -u origin main
   ```
3. Go to **Settings → Pages → Source: Deploy from branch → main / root**
4. Done! Your site is live.

## 🛠️ Local Development

Since the site fetches `data/cv.json`, you need a local server:

```bash
# Python
python -m http.server 8080

# Node.js (npx)
npx serve .
```

Then open `http://localhost:8080`

## 🌍 Features

- 🌐 **3 languages**: English, Arabic (RTL), Russian
- 🌙 **Dark theme** — elegant and professional
- 📱 **Fully responsive** — works on mobile, tablet, desktop
- ⚡ **Data-driven** — all content in one JSON file
- 🔗 **GitHub Pages ready** — zero build step needed
