const fs = require('fs');
const https = require('https');
const path = require('path');

const download = (url, dest) => {
  return fetch(url).then(r => r.arrayBuffer()).then(buf => {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, Buffer.from(buf));
  });
};

async function main() {
  try {
    await download('https://raw.githubusercontent.com/DavidHDev/react-bits/main/src/assets/lanyard/card.glb', 'src/assets/lanyard/card.glb');
    await download('https://raw.githubusercontent.com/DavidHDev/react-bits/main/src/assets/lanyard/lanyard.png', 'src/assets/lanyard/lanyard.png');
    console.log('Downloaded assets using fetch');
  } catch(e) {
    console.error(e);
  }
}

main();
