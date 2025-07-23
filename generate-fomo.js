
const fs = require('fs');

const productIds = JSON.parse(fs.readFileSync('product_ids.json', 'utf-8'));

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const now = new Date();
const yyyy = now.getFullYear();
const mm = String(now.getMonth() + 1).padStart(2, '0');
const dd = String(now.getDate()).padStart(2, '0');
const hh = String(now.getHours()).padStart(2, '0');
const hourKey = `${yyyy}-${mm}-${dd}-${hh}`;

let fomo = {};
if (fs.existsSync('fomo.json')) {
  fomo = JSON.parse(fs.readFileSync('fomo.json', 'utf-8'));
}

productIds.forEach(id => {
  if (!fomo[id]) fomo[id] = {};
  fomo[id][hourKey] = getRandomInt(10, 30);
});

fs.writeFileSync('fomo.json', JSON.stringify(fomo, null, 2));
