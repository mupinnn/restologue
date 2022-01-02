const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const targetDir = path.resolve(__dirname, "src/public/images/heros");
const destDir = path.resolve(__dirname, "dist/images/heros");

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

fs.readdirSync(targetDir).forEach((img) => {
  // large
  sharp(`${targetDir}/${img}`)
    .resize(800)
    .toFile(
      path.resolve(
        __dirname,
        `${destDir}/${img.split(".").slice(0, -1).join(".")}-large.jpg`
      )
    );

  // Small
  sharp(`${targetDir}/${img}`)
    .resize(400)
    .toFile(
      path.resolve(
        __dirname,
        `${destDir}/${img.split(".").slice(0, -1).join(".")}-small.jpg`
      )
    );
});
