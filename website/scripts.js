document.addEventListener('DOMContentLoaded', function() {
    const langToggle = document.getElementById('langToggle');
    const ptElements = document.querySelectorAll('.lang-pt');
    const enElements = document.querySelectorAll('.lang-en');
    
    // Verifica se há idioma guardado
    let currentLang = localStorage.getItem('coordenada25_lang') || 'pt';
    
    // Função para mostrar/esconder conforme o idioma
    function setLanguage(lang) {
        if (lang === 'pt') {
            ptElements.forEach(el => el.style.display = '');
            enElements.forEach(el => el.style.display = 'none');
            langToggle.textContent = '🇬🇧 EN';
            document.documentElement.lang = 'pt';
        } else {
            ptElements.forEach(el => el.style.display = 'none');
            enElements.forEach(el => el.style.display = '');
            langToggle.textContent = '🇵🇹 PT';
            document.documentElement.lang = 'en';
        }
        localStorage.setItem('coordenada25_lang', lang);
        currentLang = lang;
    }
    
    // Aplica o idioma guardado
    setLanguage(currentLang);
    
    // Evento de clique no botão
    langToggle.addEventListener('click', function() {
        const newLang = currentLang === 'pt' ? 'en' : 'pt';
        setLanguage(newLang);
    });
});