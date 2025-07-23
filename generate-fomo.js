const fs = require('fs');

const productIds = JSON.parse(fs.readFileSync('product_ids.json', 'utf-8'));

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// JST (UTC+9)
const now = new Date(new Date().getTime() + 9 * 60 * 60 * 1000);
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

// 🔥 이전 시간 제거 후 현재 시간만 할당
productIds.forEach(id => {
  fomo[id] = {};  // ← 이거 하나로 해결
  fomo[id][hourKey] = getRandomInt(5, 30);
});

fs.writeFileSync('fomo.json', JSON.stringify(fomo, null, 2));
