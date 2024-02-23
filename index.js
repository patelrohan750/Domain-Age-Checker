// Function to fetch the domain age from the API
var API_URL = 'YOUR_API';
function getDomainAge(domain) {
    return fetch(`${API_URL}${domain}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch domain age');
            }
            return response.json();
        })
        .then(data => {
            return data.age;
        })
        .catch(error => {
            console.error('Error fetching domain age:', error);
            return null;
        });
}

// Function to display the domain age on the page
function showDomainAge(age) {
    const result = document.querySelector('#result');
    result.textContent = `Domain age: ${age}`;
}


chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const currentUrl = tabs[0].url;
    const currentDomain = new URL(currentUrl).hostname;

    getDomainAge(currentDomain)
        .then(age => {
            if (age !== null) {
                showDomainAge(age);
            }
    });
});