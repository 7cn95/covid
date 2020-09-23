const note = document.getElementById('alert-danger');
const allCases = document.getElementById('allCases');
const recover = document.getElementById('recover');
const activeCases = document.getElementById('active');
const death = document.getElementById('deaths');
const topCountry = document.getElementById('topCountry');
///////////////////////
fetch("https://api.covid19api.com/summary")
    .then(res => res.json())
    .then(json => {
        const{TotalConfirmed,TotalRecovered,TotalDeaths}=json.Global;
    
        allCases.innerHTML=formatNumber(TotalConfirmed) ;
        recover.innerHTML=formatNumber(TotalRecovered) ;
        death.innerHTML=formatNumber(TotalDeaths) ;
        activeCases.innerHTML=formatNumber(TotalConfirmed-TotalRecovered-TotalDeaths) ;
    }
);
/////////////////////////////
fetch("https://covid19-api.org/api/status")
  .then(res => res.json())
  .then(result => {
      for (let i = 0; i <= 23; i++) {
          const {country,cases,recovered,deaths}=result[i];
          if (country!=="IL") {
              var contentTag=`<div class="countryList" >
          <div class="tt"><span class="flag-icon flag-icon-${country.toLowerCase()}"></span>
          <p>${country}</p></div>

          <div class="t"><p>${formatNumber(cases) }</p>
          <p>${formatNumber(recovered)}</p>
          <p>${formatNumber(cases-recovered-deaths)}</p>
          <p>${formatNumber(deaths)}</p>
          </div></div>`
         topCountry.innerHTML+=contentTag;
          }
        }
    }
);
function formatNumber (num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}