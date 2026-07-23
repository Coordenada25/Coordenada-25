const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const MAX_RADAR = 6;

function lerPasta(pasta) {
  if (!fs.existsSync(pasta)) return [];
  return fs.readdirSync(pasta)
    .filter(f => f.endsWith('.md'))
    .map(f => {
      const conteudo = fs.readFileSync(path.join(pasta, f), 'utf-8');
      const { data } = matter(conteudo);
      return { ...data, _ficheiro: f };
    });
}

function guardarJSON(caminho, dados) {
  fs.writeFileSync(caminho, JSON.stringify(dados, null, 2));
  console.log('✅', caminho);
}

['_dados/radar/ativo', '_dados/radar/arquivo', '_dados/metricas', '_dados/analise'].forEach(p => {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
});

console.log('\n📡 Radar...');
let ativos = lerPasta('_dados/radar/ativo');

const paraMover = ativos.filter(a => a.arquivar === true);
paraMover.forEach(a => {
  const origem = path.join('_dados/radar/ativo', a._ficheiro);
  const destino = path.join('_dados/radar/arquivo', a._ficheiro);
  if (fs.existsSync(origem)) {
    fs.renameSync(origem, destino);
    console.log('  📦 Arquivado:', a.titulo_pt);
  }
});

ativos = lerPasta('_dados/radar/ativo');

if (ativos.length > MAX_RADAR) {
  ativos.sort((a, b) => new Date(a.data) - new Date(b.data));
  const excesso = ativos.slice(0, ativos.length - MAX_RADAR);
  excesso.forEach(a => {
    const origem = path.join('_dados/radar/ativo', a._ficheiro);
    const destino = path.join('_dados/radar/arquivo', a._ficheiro);
    if (fs.existsSync(origem)) {
      fs.renameSync(origem, destino);
      console.log('  📦 Arquivado (limite):', a.titulo_pt);
    }
  });
}

ativos = lerPasta('_dados/radar/ativo');
ativos.sort((a, b) => new Date(b.data) - new Date(a.data));
guardarJSON('radar.json', ativos);

console.log('\n📊 Métricas...');
const metricas = lerPasta('_dados/metricas');
guardarJSON('metricas.json', metricas);

console.log('\n🎯 Análise...');
const analises = lerPasta('_dados/analise');
guardarJSON('analise.json', analises[0] || {});

console.log('\n✨ Concluído!\n');