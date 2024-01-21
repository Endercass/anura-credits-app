const fs = require("fs");

fetch(
  "https://raw.githubusercontent.com/MercuryWorkshop/anuraOS/main/CREDITS.md"
)
  .then((res) => res.text())
  .then((text) => {
    fs.writeFileSync("public/credits.md", text);
  });
