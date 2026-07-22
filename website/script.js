document.addEventListener('DOMContentLoaded', function() {

    // ========== TOGGLE DE IDIOMA ==========
    var langToggle = document.getElementById('langToggle');
    if (!langToggle) {
        console.error('Botão langToggle não encontrado!');
        return;
    }

    var currentLang = localStorage.getItem('coordenada25_lang') || 'pt';

    function setLanguage(lang) {
        var ptElements = document.querySelectorAll('.lang-pt');
        var enElements = document.querySelectorAll('.lang-en');

        if (lang === 'pt') {
            ptElements.forEach(function(el) { el.style.display = ''; });
            enElements.forEach(function(el) { el.style.display = 'none'; });
            langToggle.textContent = '🇬🇧 EN';
            document.documentElement.lang = 'pt';
        } else {
            ptElements.forEach(function(el) { el.style.display = 'none'; });
            enElements.forEach(function(el) { el.style.display = ''; });
            langToggle.textContent = '🇵🇹 PT';
            document.documentElement.lang = 'en';
        }
        localStorage.setItem('coordenada25_lang', lang);
    }

    setLanguage(currentLang);

    langToggle.addEventListener('click', function() {
        var newLang = currentLang === 'pt' ? 'en' : 'pt';
        setLanguage(newLang);
        currentLang = newLang;
    });

    // ========== CARREGAR CONTEÚDO DOS JSONs ==========
    carregarRadar();
    carregarDados();
    carregarAnalise();

});

// ========== FUNÇÕES ==========

function carregarRadar() {
    fetch('radar.json')
        .then(function(response) {
            if (!response.ok) throw new Error('Erro ao carregar radar.json');
            return response.json();
        })
        .then(function(artigos) {
            var container = document.getElementById('radar-container');
            if (!container) return;
            container.innerHTML = '';

            artigos.forEach(function(artigo) {
                var article = document.createElement('article');

                var spanPT = document.createElement('span');
                spanPT.className = 'tag tag-' + artigo.categoria + ' lang-pt';
                spanPT.textContent = artigo.categoria_pt;

                var spanEN = document.createElement('span');
                spanEN.className = 'tag tag-' + artigo.categoria + ' lang-en';
                spanEN.textContent = artigo.categoria_en;
                spanEN.style.display = 'none';

                var h3PT = document.createElement('h3');
                h3PT.className = 'lang-pt';
                h3PT.textContent = artigo.titulo_pt;

                var h3EN = document.createElement('h3');
                h3EN.className = 'lang-en';
                h3EN.textContent = artigo.titulo_en;
                h3EN.style.display = 'none';

                var pPT = document.createElement('p');
                pPT.className = 'lang-pt';
                pPT.textContent = artigo.texto_pt;

                var pEN = document.createElement('p');
                pEN.className = 'lang-en';
                pEN.textContent = artigo.texto_en;
                pEN.style.display = 'none';

                article.appendChild(spanPT);
                article.appendChild(spanEN);
                article.appendChild(h3PT);
                article.appendChild(h3EN);
                article.appendChild(pPT);
                article.appendChild(pEN);

                container.appendChild(article);
            });

            aplicarIdiomaAtual();
        })
        .catch(function(error) {
            console.error('Erro no radar:', error);
        });
}

function carregarDados() {
    fetch('dados.json')
        .then(function(response) {
            if (!response.ok) throw new Error('Erro ao carregar dados.json');
            return response.json();
        })
        .then(function(dados) {
            var container = document.getElementById('dados-container');
            if (!container) return;
            container.innerHTML = '';

            dados.forEach(function(item) {
                var div = document.createElement('div');

                var h3 = document.createElement('h3');
                h3.textContent = item.numero;

                var pPT = document.createElement('p');
                pPT.className = 'lang-pt';
                pPT.textContent = item.texto_pt;

                var pEN = document.createElement('p');
                pEN.className = 'lang-en';
                pEN.textContent = item.texto_en;
                pEN.style.display = 'none';

                div.appendChild(h3);
                div.appendChild(pPT);
                div.appendChild(pEN);

                container.appendChild(div);
            });

            aplicarIdiomaAtual();
        })
        .catch(function(error) {
            console.error('Erro nos dados:', error);
        });
}

function carregarAnalise() {
    fetch('analise.json')
        .then(function(response) {
            if (!response.ok) throw new Error('Erro ao carregar analise.json');
            return response.json();
        })
        .then(function(analise) {
            var eyebrowPT = document.getElementById('analise-eyebrow-pt');
            var eyebrowEN = document.getElementById('analise-eyebrow-en');
            var tituloPT = document.getElementById('analise-titulo-pt');
            var tituloEN = document.getElementById('analise-titulo-en');
            var textoPT = document.getElementById('analise-texto-pt');
            var textoEN = document.getElementById('analise-texto-en');
            var linkPT = document.getElementById('analise-link-pt');
            var linkEN = document.getElementById('analise-link-en');

            if (eyebrowPT) eyebrowPT.textContent = analise.eyebrow_pt;
            if (eyebrowEN) eyebrowEN.textContent = analise.eyebrow_en;
            if (tituloPT) tituloPT.textContent = analise.titulo_pt;
            if (tituloEN) tituloEN.textContent = analise.titulo_en;
            if (textoPT) textoPT.textContent = analise.texto_pt;
            if (textoEN) textoEN.textContent = analise.texto_en;
            if (linkPT) {
                linkPT.textContent = analise.link_texto_pt;
                linkPT.href = analise.link_url;
            }
            if (linkEN) {
                linkEN.textContent = analise.link_texto_en;
                linkEN.href = analise.link_url;
            }

            aplicarIdiomaAtual();
        })
        .catch(function(error) {
            console.error('Erro na análise:', error);
        });
}

function aplicarIdiomaAtual() {
    var lang = localStorage.getItem('coordenada25_lang') || 'pt';
    var ptElements = document.querySelectorAll('.lang-pt');
    var enElements = document.querySelectorAll('.lang-en');

    if (lang === 'pt') {
        ptElements.forEach(function(el) { el.style.display = ''; });
        enElements.forEach(function(el) { el.style.display = 'none'; });
    } else {
        ptElements.forEach(function(el) { el.style.display = 'none'; });
        enElements.forEach(function(el) { el.style.display = ''; });
    }
}