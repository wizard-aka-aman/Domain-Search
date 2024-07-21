document.getElementById('search-button').addEventListener('click', function() {
    const domain = document.getElementById('domain-input').value;
    const extensions = ['.com', '.in', '.io', '.ink'];
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    extensions.forEach(extension => {
        const domainName = domain + extension;
        checkDomainAvailability(domainName);
    });
});

function checkDomainAvailability(domain) {
    fetch(`https://dns.google/resolve?name=${domain}`)
        .then(response => response.json())
        .then(data => {
            const resultElement = document.createElement('div');
            resultElement.textContent += "";
            if (data.Status === 0) {
                const resultleft = document.createElement('div');
                resultleft.textContent += '✅';
                resultElement.appendChild(resultleft)
                resultElement.textContent += domain;
                resultElement.classList.add('available');
                
            } else {
                const resultright = document.createElement('div');
                resultright.textContent += '❌';
                // resultElement.textContent += '❌';
                resultElement.appendChild(resultright)
                resultElement.textContent += domain;
                resultElement.classList.add('not-available');
                
            }
            document.getElementById('results').appendChild(resultElement);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
