const fs = require('fs');

const productIds = JSON.parse(fs.readFileSync('product_ids.json', 'utf-8'));

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// JST (UTC+9) 시간으로 맞추기
const now = new Date(new Date().getTime() + 9 * 60 * 60 * 1000); // 9시간 더함
const yyyy = now.getFullYear();
const mm = String(now.getMonth() + 1).padStart(2, '0');
const dd = String(now.getDate()).padStart(2, '0');
const hh = String(now.getHours()).padStart(2, '0');
const hourKey = `${yyyy}-${mm}-${dd}-${hh}`;

let fomo = {};
try {
  if (fs.existsSync('fomo.json')) {
    const content = fs.readFileSync('fomo.json', 'utf-8');
    if (content.trim()) {
      fomo = JSON.parse(content);
    }
  }
} catch (e) {
  console.error("❗️fomo.json 파싱 실패:", e);
  fomo = {};
}

productIds.forEach(id => {
  if (!fomo[id]) fomo[id] = {};
  fomo[id][hourKey] = getRandomInt(5, 30);
});

fs.writeFileSync('fomo.json', JSON.stringify(fomo, null, 2));
