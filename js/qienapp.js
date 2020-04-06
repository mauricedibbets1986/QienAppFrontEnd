// ============================ADMIN JS =============================

// Active page
if (window.location.href.indexOf("admin/dashboard") > -1) {
    document.getElementById("admin-dashboard-link").classList.add("current-nav-link");
}
if (window.location.href.indexOf("admin/profiel") > -1) {
    document.getElementById("admin-profiel-link").classList.add("current-nav-link");
}
if (window.location.href.indexOf("admin/berichten") > -1) {
    document.getElementById("admin-berichten-link").classList.add("current-nav-link");
}

// Active tab
if (window.location.href.indexOf("admin-dashboard-medewerkers") > -1) {
    document.getElementById("aside-admin-medewerkers").classList.add("active");
    openGebruikerTab("admin-dashboard-medewerkers");
}
if (window.location.href.indexOf("admin-dashboard-uren") > -1) {
    document.getElementById("aside-admin-uren").classList.add("active");
    openGebruikerTab("admin-dashboard-uren");
}
if (window.location.href.indexOf("admin-dashboard-opdrachtgevers") > -1) {
    document.getElementById("aside-admin-opdrachtgevers").classList.add("active");
    openGebruikerTab("admin-dashboard-opdrachtgevers");
}

// Active popup TODO


// OPEN NAV DROPDOWN
function openDropdown() {
    document.getElementById("nav-dropdown-toevoegen").classList.add("open");
}


document.addEventListener("click", (evt) => {
    const flyoutElement = document.getElementById("nav-toevoegen-dropdown");
    let targetElement = evt.target; // clicked element

    do {
        if (targetElement == flyoutElement) {
            // This is a click inside. Do nothing, just return.
            return;
        }
        targetElement = targetElement.parentNode;
    } while (targetElement);

    // This is a click outside.
    document.getElementById("nav-dropdown-toevoegen").classList.remove("open");
});


// SHOW TAB SCREENS
function openGebruikerTab(tabname) {
    var i;
    var x = document.getElementsByClassName("content-wrapper");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    document.getElementById(tabname).style.display = "flex";
}

function asideActive(elem) {
    var i;
    var y = document.getElementsByClassName("aside-link-block");
    for (i = 0; i < y.length; i++) {
      y[i].classList.remove("active")
    }
    elem.classList.add("active");
}

function openGebruikerTabFromOtherPage(tabname) {
    window.location.href = "../admin/dashboard.html#" + tabname;
}

// SHOW POPUPS
function openGebruikerPopup(popupname) {
    var i;
    var x = document.getElementsByClassName("popup-background");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";  
    }
    document.getElementById(popupname).style.display = "flex";  
}

function closeGebruikerPopup() {
    var i;
    var x = document.getElementsByClassName("popup-background");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";  
    }
}

// load functies
function laadMedewerkers() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        var inhoudDB = JSON.parse(this.responseText);
        var string1 = "";
        for (x=0; x<inhoudDB.length; x++) {
            string1 += `<div class="medewerkers-inner">
            <div class="medewerker-item-outer-flex">
                <div onclick = "openGebruikerTab('admin-dashboard-medewerker-single'); laadSingleMedewerker(${inhoudDB[x].id})" class="medewerkers-item-flex">
                    <div class="medewerkers-content-wrapper">
                        <div class="gebruiker-img-circle"></div>
                    </div>
                    <div class="medewerkers-content-wrapper medewerker-name-wrapper">
                        <div class="paragraph-content">${inhoudDB[x].voornaam}</div>
                    </div>
                    <div class="medewerkers-content-wrapper medewerker-klant-wrapper">
                        <div class="paragraph-content">${inhoudDB[x].opdrachtgever.bedrijfsnaam}</div>
                    </div>
                    <div class="medewerkers-content-wrapper medewerker-uren-wrapper">
                        <div class="paragraph-content">160</div>
                    </div>
                    <div class="medewerkers-content-wrapper medewerker-uren-wrapper">
                        <div class="paragraph-content">48</div>
                    </div>
                    <div class="medewerkers-content-wrapper status">
                        <img src="../img/status-bad.svg" alt="" class="icon-small status-bad">
                        <img src="../img/status-good.svg" alt="" class="icon-small status-good">
                    </div>
                </div>
                <div class="medewerker-tools-wrapper">
                    <div class="circle-button edit-button" onclick = "laadSingleMedewerker(${inhoudDB[x].id}); openGebruikerPopup('admin-dashboard-gebruiker-wijzigen') ;laadSingleMedewerkerWijzigen(${inhoudDB[x].id})"></div>
                    <div class="circle-button delete-button" onclick = "verwijderMedewerker(${inhoudDB[x].id})"></div>
                </div>
            </div>
        </div>`;
    }
        document.getElementById("medewerkers-outer").innerHTML = string1;
    }
    xhr.open("GET","https://api.qienurenapp.privatedns.org:9100/api/medewerkers/", true);

    xhr.send();
}


function laadSingleOpdrachtgeverAddContactpersoon(id) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        var inhoudDB = JSON.parse(this.responseText);
        var opdrachtgeverId = id;
        var string1 = `
        <div class="popup-wrapper">
            <h2>Contactpersoon toevoegen</h2>
            <form id="contactpersoon-toevoegen" name="contactpersoon-toevoegen" class="popup-form">
                <div class="form-rows-wrapper">
                    <div class="form-flex">
                        <div class="form-item">
                            <label for="contactpersoon-add-voornaam" class="label form-label">Voornaam</label>
                            <input type="text" class="text-field" maxlength="256" name="voornaam" data-name="voornaam" id="contactpersoon-add-voornaam">
                        </div>
                        <div class="form-item">
                            <label for="contactpersoon-add-achternaam" class="label form-label">Achternaam</label>
                            <input type="text" class="text-field" maxlength="256" name="achternaam" data-name="achternaam" id="contactpersoon-add-achternaam">
                        </div>
                    </div>
                    <div class="form-flex">
                        <div class="form-item">
                            <label for="contactpersoon-add-email" class="label form-label">Email</label>
                            <input type="text" class="text-field" maxlength="256" name="email" data-name="email" id="contactpersoon-add-email" required="">
                        </div>
                        <div class="form-item">
                            <label for="contactpersoon-add-telefoonnummer" class="label form-label">Telefoonnummer</label>
                            <input type="text" class="text-field" maxlength="256" name="telefoonnummer" data-name="Telefoonnummer" id="contactpersoon-add-telefoonnummer" required="">
                        </div>
                    </div>
                    <input type="hidden"  id="contactpersoon-add-opdrachtgeverid" required="" value="">
                </div>
                <div class="popup-form-buton-wrapper">
                    <input type="button" value="Toevoegen" data-wait="Please wait..." class="button accent-1" onclick="addContactpersoonToDB(${opdrachtgeverId})">
                </div>
            </form>
            <div onclick="closeGebruikerPopup()" class="close-button"></div>
        </div>
        `;

        document.getElementById("admin-contactpersoon-toevoegen").innerHTML = string1;
    }
    xhr.open("GET","https://api.qienurenapp.privatedns.org:9100/opdrachtgevers/" + id, true);
    xhr.send();
}

function laadSingleMedewerker(id) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        var inhoudDB = JSON.parse(this.responseText);
        var string1 = `
        <div class="main-header-flex">
            <div class="gebruiker-header">
                <h1 class="h1 no-margin">${inhoudDB.voornaam} ${inhoudDB.achternaam}</h1>
            </div>
            <div onclick = "openGebruikerPopup('admin-dashboard-gebruiker-wijzigen'); laadSingleMedewerkerWijzigen(${inhoudDB.id})" class="circle-button"></div>
        </div>
        <div class="content-sections-wrapper">
            <div class="content-section">
                <!-- gegevens medewerker -->
                <div class="content-section">
                    <h2>Gegevens</h2>
                    <div class="gebruiker-gegevens-flex">
                        <div class="flex-item-block">
                            <h3>NAW gegevens</h3>
                            <div class="block-items-flex">
                                <div class="gegevens-item">
                                    <div class="label">Titel</div>
                                    <div class="paragraph-content">mr.</div>
                                </div>
                                <div class="gegevens-item">
                                    <div class="label">Voornaam</div>
                                    <div class="paragraph-content">${inhoudDB.voornaam}</div>
                                </div>
                                <div class="gegevens-item">
                                    <div class="label">Achternaam</div>
                                    <div class="paragraph-content">${inhoudDB.achternaam}</div>
                                </div>
                                <div class="gegevens-item">
                                    <div class="label">Adres</div>
                                    <div class="paragraph-content">${inhoudDB.adres}</div>
                                </div>
                                <div class="gegevens-item">
                                    <div class="label">Plaatsnaam</div>
                                    <div class="paragraph-content">${inhoudDB.plaats}</div>
                                </div>
                            </div>
                        </div>
                        <div class="flex-item-block">
                            <h3>Contactgegevens</h3>
                            <div class="block-items-flex">
                            <div class="gegevens-item">
                                <div class="label">E-mailadres</div>
                                <div class="paragraph-content">${inhoudDB.email}</div>
                            </div>
                            <div class="gegevens-item">
                                <div class="label">Telefoonnummer</div>
                                <div class="paragraph-content">${inhoudDB.telefoonNummer}</div>
                            </div>
                            </div>
                        </div>
                        <div class="flex-item-block">
                            <h3>Werkzaam bij</h3>
                            <div class="block-items-flex">
                                <div class="gegevens-item">
                                    <div class="label">Bedrijf</div>
                                    <div class="paragraph-content">${inhoudDB.opdrachtgever.bedrijfsnaam}</div>
                                </div>
                                <div class="gegevens-item">
                                    <div class="label">Datum in dienst</div>
                                    <div class="paragraph-content">12-01-2016</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- urendeclaraties medewerker -->
                <div class="content-section">
                    <div class="labels-wrapper">
                        <div class="uren-declaraties-flex">
                            <div class="medewerkers-content-wrapper"></div>
                            <div class="medewerkers-content-wrapper medewerker-name-wrapper">
                                <div class="label label-small">Naam</div>
                            </div>
                            <div class="medewerkers-content-wrapper medewerker-klant-wrapper">
                                <div class="label label-small">Klant</div>
                            </div>
                            <div class="medewerkers-content-wrapper medewerker-datum-wrapper">
                                <div class="label label-small">Maand</div>
                            </div>
                            <div class="medewerkers-content-wrapper medewerker-uren-wrapper">
                                <div class="label label-small">Uren</div>
                            </div>
                            <div class="medewerkers-content-wrapper medewerker-status-lang-wrapper">
                                <div class="label label-small">Status Mei</div>
                            </div>
                        </div>
                    </div>
                    <div class="medewerker-item-outer-flex">
                        <a href="#" class="medewerkers-item-flex">
                            <div class="medewerkers-content-wrapper">
                                <div class="gebruiker-img-circle"></div>
                            </div>
                            <div class="medewerkers-content-wrapper medewerker-name-wrapper">
                                <div class="paragraph-content">Karlijn de Jonge</div>
                            </div>
                            <div class="medewerkers-content-wrapper medewerker-klant-wrapper">
                                <div class="paragraph-content">Eneco</div>
                            </div>
                            <div class="medewerkers-content-wrapper maand-wrapper">
                                <div class="paragraph-content">Januari</div>
                            </div>
                            <div class="medewerkers-content-wrapper medewerker-uren-wrapper">
                                <div class="paragraph-content">122</div>
                            </div>
                            <div class="medewerkers-content-wrapper medewerker-status-lang-wrapper">
                                <div class="paragraph-content">Afgekeurd</div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        `;

        document.getElementById("admin-dashboard-medewerker-single").innerHTML = string1;
    }
    xhr.open("GET","https://api.qienurenapp.privatedns.org:9100/api/medewerkers/" + id, true);
    xhr.send();
}

function laadSingleMedewerkerWijzigen(id) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        var inhoudDB = JSON.parse(this.responseText);
        var string1 = `
        <div class="popup-wrapper">
        <h2>Aanpassen: ${inhoudDB.voornaam} ${inhoudDB.achternaam}</h2>
        <form id="medewerker-wijzigen" name="medewerker-wijzigen" class="popup-form">
            <div class="form-rows-wrapper">
                <div class="form-flex">
                    <div class="form-item small">
                        <label for="aanhef" class="label form-label">Aanhef</label>
                        <select id="aanhef" name="aanhef" data-name="Aanhef" required="" class="text-field select-field">
                            <option value="dhr" selected="selected">dhr.</option>
                            <option value="mvr">mvr.</option>
                        </select>
                    </div>
                    <div class="form-item">
                        <label for="voornaam-change" class="label form-label">Voornaam</label>
                        <input type="text" class="text-field" maxlength="256" name="voornaam-change" data-name="Voornaam-change" id="voornaam-change" value=${inhoudDB.voornaam}>
                    </div>
                    <div class="form-item">
                        <label for="achternaam-change" class="label form-label">Achternaam</label>
                        <input type="text" class="text-field" maxlength="256" name="achternaam-change" data-name="Achternaam-change" id="achternaam-change" value=${inhoudDB.achternaam}>
                    </div>
                </div>
                <div class="form-flex">
                    <div class="form-item">
                        <label for="email-change" class="label form-label">E-mailadres</label>
                        <input type="email" class="text-field" maxlength="256" name="email-change" data-name="Email-change" id="email-change" required="" value=${inhoudDB.email}>
                    </div>
                    <div class="form-item">
                        <label for="telefoon-change" class="label form-label">Telefoonnummer</label>
                        <input type="text" class="text-field" maxlength="256" name="telefoon-change" data-name="Telefoon-change" id="telefoon-change" value=${inhoudDB.telefoonNummer}>
                    </div>
                </div>
                <div class="form-flex">
                    <div class="form-item">
                        <label for="adres-change" class="label form-label">Adres</label>
                        <input type="text" class="text-field" maxlength="256" name="adres-change" data-name="Adres-change" id="adres-change" required="" value=${inhoudDB.adres}>
                    </div>
                    <div class="form-item">
                        <label for="plaats-change" class="label form-label">Plaats</label>
                        <input type="text" class="text-field" maxlength="256" name="plaats" data-name="Plaats-change" id="plaats-change" required="" value=${inhoudDB.plaats}>
                    </div>
                </div>
                <div class="form-flex">
                    <div class="form-item">
                        <label for="gekoppelde-opdrachtgever-change" class="label form-label">Opdrachtgever</label>
                        <select id="koppel-medewerker-opdrachtgever-change" name="koppel-medewerker-opdrachtgever-change" data-name="Koppel-medewerker-opdrachtgever-change" required="" class="text-field select-field">
                    </select>
                    </div>
                </div>
            </div>
            <div class="popup-form-buton-wrapper">
                <input type="button" value="Wijzigen" data-wait="Please wait..." class="button accent-1" onclick="addOGToMW(${inhoudDB.id}); changeMedewerker(${inhoudDB.id})">
            </div>
        </form>
        <div onclick="closeGebruikerPopup()" class="close-button"></div>
    </div>
        `;
        
        document.getElementById("admin-dashboard-gebruiker-wijzigen").innerHTML = string1;
        laadOpdrachtgeversSelect(inhoudDB.opdrachtgever.id, inhoudDB.opdrachtgever.bedrijfsnaam);
        
    }

    xhr.open("GET","https://api.qienurenapp.privatedns.org:9100/api/medewerkers/" + id, true);
    xhr.send();
}


function AddMedewerkerLaadOpdrachtgeversSelect() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        var inhoudDB = JSON.parse(this.responseText);
        var string1 = ``;
        for (x=0; x<inhoudDB.length; x++) {
            string1 += 
            `
            <option value="${inhoudDB[x].id}">${inhoudDB[x].bedrijfsnaam}</option>
            `;
        }
        document.getElementById("add-medewerker-opdrachtgever-select").innerHTML = string1;
    }
    xhr.open("GET","https://api.qienurenapp.privatedns.org:9100//api/opdrachtgevers/", true);
    xhr.send();
}


function laadOpdrachtgeversSelect(id, naam) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        var inhoudDB = JSON.parse(this.responseText);
        var string1 = `<option value=${id}>${naam}</option>`;
        for (x=0; x<inhoudDB.length; x++) {
            string1 += 
            `
            <option value="${inhoudDB[x].id}">${inhoudDB[x].bedrijfsnaam}</option>
            `;
        }
        document.getElementById("koppel-medewerker-opdrachtgever-change").innerHTML = string1;
    }
    xhr.open("GET","https://api.qienurenapp.privatedns.org:9100/api/opdrachtgevers/", true);
    xhr.send();
}


function laadSingleOpdrachtgeverWijzigen(id) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        var inhoudDB = JSON.parse(this.responseText);
        var string1 = `
        <div class="popup-wrapper">
        <h2>${inhoudDB.bedrijfsnaam} wijzigen</h2>
        <form id="opdrachtgever-wijzigen" name="opdrachtgever-wijzigen" class="popup-form">
            <div class="form-rows-wrapper">
                <div class="form-flex">
                    <div class="form-item">
                        <label for="bedrijfsnaam-change" class="label form-label">Bedrijfsnaam</label>
                        <input type="text" class="text-field" maxlength="256" name="bedrijfsnaam-change" data-name="Bedrijfsnaam-change" id="bedrijfsnaam-change" value="${inhoudDB.bedrijfsnaam}">
                    </div>
                    <div class="form-item">
                        <label for="plaatsOG-change" class="label form-label">Plaats</label>
                        <input type="text" class="text-field" maxlength="256" name="plaats-change" data-name="Plaats-change" id="plaatsOG-change" value="${inhoudDB.plaats}">
                    </div>
                </div>
                <div class="form-flex">
                    <div class="form-item">
                        <label for="adresOG-change" class="label form-label">Adres</label>
                        <input type="text" class="text-field" maxlength="256" name="adres-change" data-name="Adres-change" id="adresOG-change" required="" value="${inhoudDB.adres}">
                    </div>
                    <div class="form-item">
                        <label for="postcodeOG-change" class="label form-label">Postcode</label>
                        <input type="text" class="text-field" maxlength="256" name="postcode-change" data-name="Postcode-change" id="postcodeOG-change" value="${inhoudDB.postcode}">
                    </div>
                </div>
                <div class="form-flex">
                    <div class="form-item">
                        <label for="emailOG-change" class="label form-label">Email</label>
                        <input type="email" class="text-field" maxlength="256" name="email-change" data-name="Email-change" id="emailOG-change" required="" value="${inhoudDB.email}">
                    </div>
                    <div class="form-item">
                        <label for="telefoonnummerOG-change" class="label form-label">Telefoonnummer</label>
                        <input type="text" class="text-field" maxlength="256" name="telefoonnummer-change" data-name="Telefoonnummer-change" id="telefoonnummerOG-change" required="" value="${inhoudDB.telefoonNummer}">
                    </div>
                </div>
            </div>
            <div class="popup-form-buton-wrapper">
                <input type="button" value="Wijzigen" data-wait="Please wait..." class="button accent-1" onclick="changeOpdrachtgever(${inhoudDB.id})">
            </div>
        </form>
        <div onclick="closeGebruikerPopup()" class="close-button"></div>
    </div>
        `;
        document.getElementById("admin-dashboard-opdrachtgever-wijzigen").innerHTML = string1;
    }
    xhr.open("GET","https://api.qienurenapp.privatedns.org:9100/api/opdrachtgevers/" + id, true);
    xhr.send();
}

function laadSingleOpdrachtgever(id) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        var inhoudDB = JSON.parse(this.responseText);
        var string1 = `
<div class="main-header-flex">
    <div class="gebruiker-header">
        <h1 class="h1 no-margin">${inhoudDB.bedrijfsnaam}</h1>
    </div>
    <div class="medewerker-header-tools">
        <div onclick="openGebruikerPopup('admin-contactpersoon-toevoegen'); laadSingleOpdrachtgeverAddContactpersoon(${inhoudDB.id})" class="header-add-button">
            <img src="../img/plus-green.svg" alt="" class="add-icon">
            <div class="inline-link">Contactpersoon</div>
        </div>
        <div class="circle-button edit" onclick = "openGebruikerPopup('admin-dashboard-opdrachtgever-wijzigen'); laadSingleOpdrachtgeverWijzigen(${inhoudDB.id})"></div>
        <div class="circle-button delete-button"></div>
    </div>
</div>
<div class="content-sections-wrapper">
    <div class="content-section">
        <!-- gegevens opdrachtgever -->
        <div class="content-section">
            <h2>Gegevens</h2>
            <div class="gebruiker-gegevens-flex">
                <div class="flex-item-block">
                    <h3>Algemeen</h3>
                    <div class="block-items-flex">
                        <div class="gegevens-item">
                            <div class="label">Bedrijdsnaam</div>
                            <div class="paragraph-content">${inhoudDB.bedrijfsnaam}</div>
                        </div>
                        <div class="gegevens-item">
                            <div class="label">Adres</div>
                            <div class="paragraph-content">${inhoudDB.adres}</div>
                        </div>
                        <div class="gegevens-item">
                            <div class="label">Plaats</div>
                            <div class="paragraph-content">${inhoudDB.plaats}</div>
                        </div>
                    </div>
                </div>
                <div class="flex-item-block">
                    <h3>Contactgegevens algemeen</h3>
                    <div class="block-items-flex">
                    <div class="gegevens-item">
                        <div class="label">E-mailadres</div>
                        <div class="paragraph-content">${inhoudDB.email}</div>
                    </div>
                    <div class="gegevens-item">
                        <div class="label">Telefoonnummer</div>
                        <div class="paragraph-content">${inhoudDB.telefoonNummer}</div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Contacpersonen bij deze opdrachtgever -->
        <div id="contactpersonen-opdrachtgever-overzicht" class="content-section">
            <h2>Contactpersonen</h2>
            <div class="gebruiker-gegevens-flex">
                <div class="flex-item-block">
                    <div class="contactpersoon-item-header-flex">
                        <div class="gebruiker-img-circle margin-right"></div>
                        <h3 class="no-margin">Caro de Bruijn</h3>
                    </div>
                    <div class="block-items-flex">
                        <div class="gegevens-item">
                            <div class="label">Bedrijfsnaam</div>
                            <div class="paragraph-content">Qien</div>
                        </div>
                        <div class="gegevens-item">
                            <div class="label">Adres</div>
                            <div class="paragraph-content">Steenstraat 12</div>
                        </div>
                    </div>
                </div>
                <div class="flex-item-block add-button-block">
                    <div class="circle-button add-button small-circle-button" onclick="openGebruikerPopup('admin-contactpersoon-toevoegen'); laadSingleOpdrachtgeverAddContactpersoon(${inhoudDB.id})"></div>
                </div>
            </div>
        </div>
        <!-- Medewerkers bij deze opdrachtgever -->
        <div class="content-section">
            <h2>Medewerkers werkzaam bij Qien</h2>
            <div class="labels-wrapper">
                <div class="uren-declaraties-flex">
                    <div class="medewerkers-content-wrapper"></div>
                    <div class="medewerkers-content-wrapper medewerker-name-wrapper">
                        <div class="label label-small">Naam</div>
                    </div>
                    <div class="medewerkers-content-wrapper medewerker-klant-wrapper">
                        <div class="label label-small">Klant</div>
                    </div>
                    <div class="medewerkers-content-wrapper medewerker-datum-wrapper">
                        <div class="label label-small">Maand</div>
                    </div>
                    <div class="medewerkers-content-wrapper medewerker-uren-wrapper">
                        <div class="label label-small">Uren</div>
                    </div>
                    <div class="medewerkers-content-wrapper medewerker-status-lang-wrapper">
                        <div class="label label-small">Status Mei</div>
                    </div>
                </div>
            </div>
            <div class="medewerker-item-outer-flex">
                <a href="#" class="medewerkers-item-flex">
                    <div class="medewerkers-content-wrapper">
                        <div class="gebruiker-img-circle"></div>
                    </div>
                    <div class="medewerkers-content-wrapper medewerker-name-wrapper">
                        <div class="paragraph-content">Karlijn de Jonge</div>
                    </div>
                    <div class="medewerkers-content-wrapper medewerker-klant-wrapper">
                        <div class="paragraph-content">Eneco</div>
                    </div>
                    <div class="medewerkers-content-wrapper maand-wrapper">
                        <div class="paragraph-content">Januari</div>
                    </div>
                    <div class="medewerkers-content-wrapper medewerker-uren-wrapper">
                        <div class="paragraph-content">122</div>
                    </div>
                    <div class="medewerkers-content-wrapper medewerker-status-lang-wrapper">
                        <div class="paragraph-content">Afgekeurd</div>
                    </div>
                </a>
            </div>
        </div>

    </div>
</div>
        `;
        document.getElementById("admin-dashboard-opdrachtgever-single").innerHTML = string1;
        laadContactpersonenVanOpdrachtgever(id)
    }
    xhr.open("GET","https://api.qienurenapp.privatedns.org:9100/api/opdrachtgevers/" + id, true);
    xhr.send();
}


function laadContactpersonenVanOpdrachtgever(id) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        var inhoudDB = JSON.parse(this.responseText);
        var opdrachtgeverId = id;
        var contactpersonen = "";
        var string1 = ""
        for (x=0; x<inhoudDB.length; x++) {
            contactpersonen += 
            `
            <div class="flex-item-block">
                <div class="contactpersoon-item-header-flex">
                    <div class="gebruiker-img-circle margin-right"></div>
                    <h3 class="no-margin">${inhoudDB[x].voornaam} ${inhoudDB[x].achternaam}</h3>
                </div>
                <div class="block-items-flex">
                    <div class="gegevens-item">
                        <div class="label">Emailadres</div>
                        <div class="paragraph-content">${inhoudDB[x].email}</div>
                    </div>
                    <div class="gegevens-item">
                        <div class="label">Telefoon</div>
                        <div class="paragraph-content">${inhoudDB[x].telefoonNummer}</div>
                    </div>
                </div>
            </div>`;
        }
        string1 += `
        <h2>Contactpersonen</h2>
            <div class="gebruiker-gegevens-flex">
                ${contactpersonen}
                <div class="flex-item-block add-button-block">
                   <div class="circle-button add-button small-circle-button" onclick="openGebruikerPopup('admin-contactpersoon-toevoegen'); laadSingleOpdrachtgeverAddContactpersoon(${opdrachtgeverId})"></div>
                </div>
            </div>
        `
        document.getElementById("contactpersonen-opdrachtgever-overzicht").innerHTML = string1;
    }
    xhr.open("GET","https://api.qienurenapp.privatedns.org:9100/api/contactpersonen/opdrachtgever/" + id, true);
    xhr.send();
}


function laadOpdrachtgevers() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        var inhoudDB = JSON.parse(this.responseText);
        var string1 = "";
        for (x=0; x<inhoudDB.length; x++) {
            string1 += 
            `<div class="medewerkers-inner">
            <div class="medewerker-item-outer-flex">
                <div class="medewerkers-item-flex" onclick = "openGebruikerTab('admin-dashboard-opdrachtgever-single'); laadSingleOpdrachtgever(${inhoudDB[x].id})">
                    <div class="medewerkers-content-wrapper">
                        <div class="gebruiker-img-circle"></div>
                    </div>
                    <div class="medewerkers-content-wrapper medewerker-klant-wrapper">
                        <div class="paragraph-content">${inhoudDB[x].bedrijfsnaam}</div>
                    </div>
                    <div class="medewerkers-content-wrapper medewerker-name-wrapper">
                        <div class="paragraph-content">${inhoudDB[x].email}</div>
                    </div>
                    <div class="medewerkers-content-wrapper medewerker-email-wrapper">
                        <div class="paragraph-content">${inhoudDB[x].plaats}</div>
                    </div>
                </div>
                <div class="medewerker-tools-wrapper">
                    <div class="circle-button edit-button"></div>
                    <div class="circle-button delete-button" onclick = "verwijderOpdrachtgever(${inhoudDB[x].id})"></div>
                </div>
            </div>
        </div>`;
            }
        document.getElementById("opdrachtgevers-outer").innerHTML = string1;
    }
    xhr.open("GET","https://api.qienurenapp.privatedns.org:9100/api/opdrachtgevers/", true);
    xhr.send();
}


// add functies
function addMedewerkertoDB(){
    var vVooraam = document.getElementById('voornaam').value;
    var vAchternaam = document.getElementById('achternaam').value;
    var vEmail = document.getElementById('email').value;
    var vTelefoon = document.getElementById('telefoon').value;
    var vAdres = document.getElementById('adres').value;
    var vPlaats = document.getElementById('plaats').value;
    var vWerkgeverId = document.getElementById('add-medewerker-opdrachtgever-select').value;


    var medewerker = {};
    medewerker.voornaam = vVooraam;
    medewerker.achternaam = vAchternaam;
    medewerker.email = vEmail;
    medewerker.telefoonNummer = vTelefoon;
    medewerker.adres = vAdres;
    medewerker.plaats = vPlaats;


    var abc = JSON.stringify(medewerker);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        laadMedewerkers();
        closeGebruikerPopup();
    }
    xhr.open("PUT","https://api.qienurenapp.privatedns.org:9100//api/medewerkers/maakMedewerkerenKoppelOpdrachtgever/" + vWerkgeverId,true);
    xhr.setRequestHeader("Content-type","application/json")
    xhr.send(abc);
 }

 function addOpdrachtgeverToDB(){
    var url = "https://api.qienurenapp.privatedns.org:9100/api/opdrachtgevers/";
    var opdrachtgever = {
        bedrijfsnaam : document.getElementById('bedrijfsnaam').value,
        adres : document.getElementById('adresOG').value,
        email : document.getElementById('emailOG').value,
        telefoonNummer : document.getElementById('telefoonnummerOG').value, 
        plaats : document.getElementById('plaatsOG').value, 
        postcode : document.getElementById('postcodeOG').value, 
    };
    var json = JSON.stringify(opdrachtgever);
    var xhr = new XMLHttpRequest();                     // AJAX
    xhr.onreadystatechange = function() {               // readystate (0 t/m 4), methode gebeurt 4x
        laadOpdrachtgevers();
        closeGebruikerPopup();
    }
    xhr.open("POST",url, true);    // asynchroon betekent tegelijkertijd. Synchroon is afgestemd
    xhr.setRequestHeader("Content-type","application/json");
    xhr.send(json);
}

function addContactpersoonToDB(id){
    var contactpersoon = {
        voornaam : document.getElementById('contactpersoon-add-voornaam').value,
        achternaam : document.getElementById('contactpersoon-add-achternaam').value,
        email : document.getElementById('contactpersoon-add-email').value,
        telefoonNummer : document.getElementById('contactpersoon-add-telefoonnummer').value,
    };
    var json = JSON.stringify(contactpersoon);
    var xhr = new XMLHttpRequest();                     // AJAX
    xhr.onreadystatechange = function() {               // readystate (0 t/m 4), methode gebeurt 4x
        laadSingleOpdrachtgever(id)
        closeGebruikerPopup();
    }
    xhr.open("POST","http://https://api.qienurenapp.privatedns.org:9100/api/contactpersonen/" + id, true);    // asynchroon betekent tegelijkertijd. Synchroon is afgestemd
    xhr.setRequestHeader("Content-type","application/json");
    xhr.send(json);
}

// delete functies
function verwijderMedewerker(id) {
    // var UIP = document.getElementById('userInputDeleteMedewerker').value;
    var url = "https://api.qienurenapp.privatedns.org:9100/api/medewerkers/";
    var xhr = new XMLHttpRequest();

    xhr.open("DELETE", url+id, true);
    xhr.onload = function () {
        var jojo = JSON.parse(xhr.responseText);
        if (xhr.readyState == 4 && xhr.status == "200") {
            console.table(jojo);
        } else {
         console.error(jojo);
        }
    }
    xhr.onreadystatechange = function() {
        laadMedewerkers();
    }
    xhr.send();
}

function verwijderOpdrachtgever(id) {
    var url = "https://api.qienurenapp.privatedns.org:9100/api/opdrachtgevers/";
    var xhr = new XMLHttpRequest();

    xhr.open("DELETE", url+id, true);
    xhr.onload = function () {
        var jojo = JSON.parse(xhr.responseText);
        if (xhr.readyState == 4 && xhr.status == "200") {
            console.table(jojo);
        } else {
         console.error(jojo);
        }
    }
    xhr.onreadystatechange = function() {
        laadOpdrachtgevers();
    }
    xhr.send();
}


window.onload = function() {
    laadMedewerkers();
    laadOpdrachtgevers()
}


// change functies
function changeMedewerker(id) {
    var url = "https://api.qienurenapp.privatedns.org:9100/api/medewerkers/";
    var persoon = {
        voornaam : document.getElementById('voornaam-change').value,
        achternaam : document.getElementById('achternaam-change').value,
        email : document.getElementById('email-change').value,
        adres : document.getElementById('adres-change').value,
        plaats : document.getElementById('plaats-change').value,
        telefoonNummer : document.getElementById('telefoon-change').value,
     // wachtwoordHash : 
    };
    var json = JSON.stringify(persoon);

    var xhr = new XMLHttpRequest();
    xhr.open("PUT", url+id, true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.onload = function () {
        var users = JSON.parse(xhr.responseText);
        if (xhr.readyState == 4 && xhr.status == "200") {
            console.table(users);
        } else {
            console.error(users);
        }
    }
    xhr.onreadystatechange = function() {
        closeGebruikerPopup();
        laadSingleMedewerker(id)
    }
    xhr.send(json);
}

function changeOpdrachtgever(id) {
    var url = "https://api.qienurenapp.privatedns.org:9100/api/opdrachtgevers/";
    var opdrachtgever = {
        bedrijfsnaam : document.getElementById('bedrijfsnaam-change').value,
        adres : document.getElementById('adresOG-change').value,
        email : document.getElementById('emailOG-change').value,
        telefoonNummer : document.getElementById('telefoonnummerOG-change').value, 
        plaats : document.getElementById('plaatsOG-change').value, 
        postcode : document.getElementById('postcodeOG-change').value, 
        // wachtwoordHash : 
    };
    var json = JSON.stringify(opdrachtgever);

    var xhr = new XMLHttpRequest();
    xhr.open("PUT", url+id, true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.onload = function () {
        var users = JSON.parse(xhr.responseText);
        if (xhr.readyState == 4 && xhr.status == "200") {
            console.table(users);
        } else {
            console.error(users);
        }
    }
    xhr.onreadystatechange = function() {
        closeGebruikerPopup();
        laadSingleOpdrachtgever(id)
    }
    xhr.send(json);
}

// koppelen
function addOGToMW(id) {
    var opdrachtgeverId = document.getElementById('koppel-medewerker-opdrachtgever-change').value;
    var url = "https://api.qienurenapp.privatedns.org:9100/api/medewerkers/opdrachtgever/" + id + "/" + opdrachtgeverId;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){

    }
    xhr.open("GET", url, true);
    xhr.send();
}