

const BASE_URL = 'https://restcountries.eu/rest/v2/name/';


function fetchCountries(name) {
const PROPERTIES = 'prop=name;capital;population;flag;languages'
    return fetch(`${BASE_URL}${name}?${PROPERTIES}`).then(response => {
        return response.json();
    })
    .catch(error => {console.log(error)
    });
}

export default { fetchCountries }