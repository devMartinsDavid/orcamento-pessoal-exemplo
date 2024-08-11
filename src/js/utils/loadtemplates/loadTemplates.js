export async function loadTemplate(templatePath) {
    return await fetch(templatePath)
        .then(response => response.text())
        .then(data => {
            const templateDiv = document.createElement('div');
            templateDiv.innerHTML = data;
            document.body.appendChild(templateDiv.firstElementChild);
        })
        .catch(error => console.error('Erro ao carregar o template:', error));
}