const fs = require('fs');
const path = require('path');

/**
 * Gera furniture-data.js diretamente a partir de furniture.json.
 * Não adiciona itens automaticamente com base em imagens.
 */

const root = path.join(__dirname, '..');
const assets = path.join(root, 'assets');
const outPath = path.join(assets, 'furniture.json');
const bundlePath = path.join(assets, 'furniture-data.js');

const raw = fs.readFileSync(outPath, 'utf8');
const data = JSON.parse(raw);
const phone = data && data.phone ? String(data.phone) : '5585999539681';
const items = Array.isArray(data.items)
  ? data.items.map((item, index) => ({
      id: item && item.id != null ? item.id : index + 1,
      nome: item && item.nome != null ? String(item.nome) : 'Móvel ' + String(index + 1).padStart(2, '0'),
      descricao: item && item.descricao != null ? String(item.descricao) : 'Descreva o móvel, medidas e estado de conservação.',
      valor: item && item.valor != null ? String(item.valor) : 'R$ 0,00',
      imagens: Array.isArray(item && item.imagens)
        ? item.imagens.map((img) => String(img || '').trim()).filter(Boolean).slice(0, 3)
        : [],
    }))
  : [];

fs.writeFileSync(bundlePath, 'window.__ANA_FURNITURE=' + JSON.stringify({ phone, items }, null, 2) + ';', 'utf8');
console.log('OK — items:', items.length);
