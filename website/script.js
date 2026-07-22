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
        currentLang = lang;
    }

    setLanguage(currentLang);

    langToggle.addEventListener('click', function() {
        var newLang = currentLang === 'pt' ? 'en' : 'pt';
        setLanguage(newLang);
    });

    // ========== CARREGAR JSONs ==========
    carregarRadar();
    carregarMetricas();
    carregarHero();
    carregarArquivo();

});

// ========== RADAR ==========
function carregarRadar() {
    fetch('radar.json')
        .then(function(response) { return response.json(); })
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
                var linkPT = document.createElement('a');
                linkPT.href = artigo.link;
                linkPT.textContent = artigo.titulo_pt;
                linkPT.style.color = 'inherit';
                h3PT.appendChild(linkPT);

                var h3EN = document.createElement('h3');
                h3EN.className = 'lang-en';
                var linkEN = document.createElement('a');
                linkEN.href = artigo.link;
                linkEN.textContent = artigo.titulo_en;
                linkEN.style.color = 'inherit';
                h3EN.appendChild(linkEN);
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
        .catch(function(error) { console.error('Erro radar:', error); });
}

// ========== MÉTRICAS ==========
function carregarMetricas() {
    fetch('metricas.json')
        .then(function(response) { return response.json(); })
        .then(function(metricas) {
            var container = document.getElementById('metricas-container');
            if (!container) return;
            container.innerHTML = '';

            metricas.forEach(function(m) {
                var card = document.createElement('div');
                card.className = 'metrica-card';

                var valor = document.createElement('div');
                valor.className = 'metrica-valor';
                valor.textContent = m.valor;

                var unidadePT = document.createElement('div');
                unidadePT.className = 'metrica-unidade lang-pt';
                unidadePT.textContent = m.unidade_pt;

                var unidadeEN = document.createElement('div');
                unidadeEN.className = 'metrica-unidade lang-en';
                unidadeEN.textContent = m.unidade_en;
                unidadeEN.style.display = 'none';

                var tendencia = document.createElement('div');
                tendencia.className = 'metrica-tendencia';
                tendencia.textContent = m.tendencia === 'up' ? '📈' : '📉';

                card.appendChild(valor);
                card.appendChild(unidadePT);
                card.appendChild(unidadeEN);
                card.appendChild(tendencia);

                container.appendChild(card);
            });

            aplicarIdiomaAtual();
        })
        .catch(function(error) { console.error('Erro métricas:', error); });
}

// ========== HERO (Deep Dive) ==========
function carregarHero() {
    fetch('analise.json')
        .then(function(response) { return response.json(); })
        .then(function(analise) {
            var kickerPT = document.getElementById('hero-kicker-pt');
            var kickerEN = document.getElementById('hero-kicker-en');
            var tituloPT = document.getElementById('hero-titulo-pt');
            var tituloEN = document.getElementById('hero-titulo-en');
            var textoPT = document.getElementById('hero-texto-pt');
            var textoEN = document.getElementById('hero-texto-en');
            var linkPT = document.getElementById('hero-link-pt');
            var linkEN = document.getElementById('hero-link-en');

            if (kickerPT) kickerPT.textContent = analise.eyebrow_pt;
            if (kickerEN) kickerEN.textContent = analise.eyebrow_en;
            if (tituloPT) tituloPT.textContent = analise.titulo_pt;
            if (tituloEN) tituloEN.textContent = analise.titulo_en;
            if (textoPT) textoPT.textContent = analise.texto_pt;
            if (textoEN) textoEN.textContent = analise.texto_en;
            if (linkPT) linkPT.href = analise.link_url;
            if (linkEN) linkEN.href = analise.link_url;

            aplicarIdiomaAtual();
        })
        .catch(function(error) { console.error('Erro hero:', error); });
}

// ========== ARQUIVO ==========
function carregarArquivo() {
    var listaDeep = document.getElementById('lista-deepdives');
    var listaBrief = document.getElementById('lista-briefings');
    
    if (listaDeep) {
        fetch('analise.json')
            .then(function(response) { return response.json(); })
            .then(function(analise) {
                listaDeep.innerHTML = '';
                var li = document.createElement('li');
                
                var a = document.createElement('a');
                a.href = analise.link_url;
                a.className = 'lang-pt';
                a.textContent = analise.titulo_pt;
                
                var aEN = document.createElement('a');
                aEN.href = analise.link_url;
                aEN.className = 'lang-en';
                aEN.textContent = analise.titulo_en;
                aEN.style.display = 'none';
                
                var span = document.createElement('span');
                span.className = 'arquivo-data lang-pt';
                span.textContent = 'Jul 2026';
                
                var spanEN = document.createElement('span');
                spanEN.className = 'arquivo-data lang-en';
                spanEN.textContent = 'Jul 2026';
                spanEN.style.display = 'none';

                li.appendChild(a);
                li.appendChild(aEN);
                li.appendChild(span);
                li.appendChild(spanEN);
                listaDeep.appendChild(li);
            });
    }

    if (listaBrief) {
        fetch('radar.json')
            .then(function(response) { return response.json(); })
            .then(function(briefings) {
                listaBrief.innerHTML = '';
                briefings.forEach(function(b) {
                    var li = document.createElement('li');
                    
                    var a = document.createElement('a');
                    a.href = b.link;
                    a.className = 'lang-pt';
                    a.textContent = b.titulo_pt;
                    
                    var aEN = document.createElement('a');
                    aEN.href = b.link;
                    aEN.className = 'lang-en';
                    aEN.textContent = b.titulo_en;
                    aEN.style.display = 'none';
                    
                    var span = document.createElement('span');
                    span.className = 'arquivo-data lang-pt';
                    span.textContent = 'Jul 2026';
                    
                    var spanEN = document.createElement('span');
                    spanEN.className = 'arquivo-data lang-en';
                    spanEN.textContent = 'Jul 2026';
                    spanEN.style.display = 'none';

                    li.appendChild(a);
                    li.appendChild(aEN);
                    li.appendChild(span);
                    li.appendChild(spanEN);
                    listaBrief.appendChild(li);
                });
            });
    }
    
    setTimeout(aplicarIdiomaAtual, 300);
}

// ========== APLICAR IDIOMA ==========
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

    // Atualizar placeholder do campo de email da newsletter conforme o idioma
    var emailInput = document.getElementById('newsletter-email');
    if (emailInput) {
        emailInput.placeholder = lang === 'pt' ? 'O seu email' : 'Your email';
    }
}