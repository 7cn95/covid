const note = document.getElementById('alert-danger');
const allCases = document.getElementById('allCases');
const recover = document.getElementById('recover');
const activeCases = document.getElementById('active');
const death = document.getElementById('deaths');
const topCountry = document.getElementById('topCountry');
const closeNoti = document.getElementById('closeNoti');
const themeBTN = document.getElementById('theme');
///////////////////////
setInterval(() => {
        if (note.style.display == "none") {
            note.style.display = "flex"
        }
    }, 60000)
    // ! display notification alarte
function noti() {
    note.style.display = "none"
}
// ! convert btw light and dark theme
function dark() {
    if (document.body.className == "light") {
        document.body.classList.replace("light", "dark")
        themeBTN.innerText = "Light"
        themeBTN.style.color = "#F3F3F3"
    } else {
        document.body.classList.replace("dark", "light")
        themeBTN.innerText = "Dark"
        themeBTN.style.color = "#000"
    }
}
////////////////////// ? Events
closeNoti.addEventListener("click", noti);
themeBTN.addEventListener("click", dark)
    ////////////////////////
    //? get data as a Promis from api
    //! corona data and country data
async function getData() {
    try {
        const res2 = await fetch("https://api.covid19api.com/summary");
        const resSummary = await res2.json();
        const restCoun = await fetch("https://restcountries.eu/rest/v2/lang/ar");
        const restArabicCountry = await restCoun.json();
        return { resSummary, restArabicCountry }
    } catch (err) {
        console.log(err + "Summary error");
    }
}

// display this data to main section in page
getData()
    .then((data) => {
        let dataGlobal = data.resSummary.Global;

        allCases.innerHTML = formatNumber(dataGlobal.TotalConfirmed);
        recover.innerHTML = formatNumber(dataGlobal.TotalRecovered);
        death.innerHTML = formatNumber(dataGlobal.TotalDeaths);
        //activeCases.innerHTML = formatNumber(dataGlobal.TotalConfirmed - dataGlobal.TotalRecovered - dataGlobal.TotalDeaths);
    }).catch((err) => {
        console.log(err);
    })
let notArabicCountry = ["TD"] // todo convert nested if down below to array
getData().then((data) => {
        let dataCoun = data.resSummary.Countries;
        let araCountries = data.restArabicCountry;

        araCountries.forEach(araCountry => {
            const { alpha2Code, flag, name } = araCountry;
            dataCoun.forEach(dataco => {
                const { Country, TotalConfirmed, TotalRecovered, TotalDeaths, CountryCode } = dataco;
                if (CountryCode == alpha2Code) {
                    if (alpha2Code != "TD")
                        if (alpha2Code != "IL")
                            if (alpha2Code != "KM")
                                if (alpha2Code != "DJ")
                                    if (alpha2Code != "ER") {
                                        var contentTag = `
                                        <div class="countryList" >
                                        <div>
                                        <img src="${flag}" alt="flag" style="width: 150px;">
                                        <p>${name}</p></div>

                                        <div class="t"><p>${formatNumber(TotalConfirmed) }</p>
                                        <p>${formatNumber(TotalRecovered)}</p>
                                        <p>${formatNumber(TotalConfirmed-TotalRecovered-TotalDeaths)}</p>
                                        <p>${formatNumber(TotalDeaths)}</p>
                                        </div>
                                        </div>`
                                        topCountry.innerHTML += contentTag;
                                    }
                }
            });
        });
    })
    .catch((err) => {
        console.log(err);
    })

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
}