if(typeof wdplugin_donation_worker_url==='undefined'){var wdplugin_donation_worker_url='https://donation.whydonate.dev';}
if(typeof wdplugin_fundraiser_worker_url==='undefined'){var wdplugin_fundraiser_worker_url='https://fundraiser.whydonate.dev';}
if(typeof wdplugin_account_worker_url==='undefined'){var wdplugin_account_worker_url='https://account.whydonate.dev';}
if(typeof whydonate_home_url==='undefined'){var whydonate_home_url='https://whydonate.com/';}
if(typeof currency_symbol_object==='undefined'){var currency_symbol_object={};}
if(typeof currency_code_object==='undefined'){var currency_code_object={};}
if(typeof selected_interval_object==='undefined'){var selected_interval_object={};}
if(typeof fundraiser_donation_values_object==='undefined'){var fundraiser_donation_values_object={};}
function formatCurrency(value,languageCode){let thousandSeparator=languageCode==='en'?',':'.';let decimalSeparator=languageCode==='en'?'.':',';let parts=value.toString().split('.');let integerPart=parts[0];let decimalPart=parts.length>1?parts[1]:'';let integerPartWithSeparators='';for(let i=integerPart.length-1,j=1;i>=0;i--,j++){integerPartWithSeparators=integerPart[i]+integerPartWithSeparators;if(j%3===0&&i!==0){integerPartWithSeparators=thousandSeparator+integerPartWithSeparators;}}
return decimalPart?integerPartWithSeparators+decimalSeparator+decimalPart:integerPartWithSeparators;}
async function get_stripe_charges(slug){const url=`${wdplugin_fundraiser_worker_url}/fundraiser/payment/status/?slug=${slug}`;try{const response=await fetch(url,{method:'GET',});if(!response.ok){throw new Error(`Failed to fetch data. Status: ${response.status}`);}
const data=await response.json();return data;}catch(error){throw new Error('Network error: '+error.message);}}
async function get_fundraiser_info(slug,language_code){const url=`${wdplugin_fundraiser_worker_url}/fundraiser/get?slug=${slug}&language=${language_code}`;return fetch(url).then((response)=>{if(!response.ok){throw new Error(`Failed to fetch data. Status: ${response.status}`);}
return response.text();}).catch((error)=>{throw new Error('Network error');});}
async function get_all_currencies(){const url=`${wdplugin_donation_worker_url}/donation/stripe/currencies`;return fetch(url).then((response)=>{if(!response.ok){throw new Error(`Failed to fetch data. Status: ${response.status}`);}
return response.json();}).catch((error)=>{throw new Error('Network error');});}
function get_fundraiser_styling(shortcode){const url=`${wdplugin_fundraiser_worker_url}/fundraiser/user/style?shortcode=${shortcode}`;return fetch(url).then((response)=>{if(!response.ok){throw new Error(`Failed to fetch data. Status: ${response.status}`);}
return response.text();}).catch((error)=>{throw new Error('Network error');});}
async function makeDonation(data,successUrl,failureUrl,donorInfo){const donationApi=`${wdplugin_donation_worker_url}/donation/order/`;const url=donationApi;var modal=document.getElementById('modal');modal.style.display='block';await fetch(url,{method:'post',headers:{'Content-Type':'application/json','Access-Control-Allow-Headers':'*','Access-Control-Allow-Methods':'*','Access-Control-Allow-Origin':'*',},body:JSON.stringify(data),}).then(function(response){return response.json();}).then(function(result){localStorage.setItem('donor_info',JSON.stringify(donorInfo));var modal=document.getElementById('modal');modal.style.display='none';if(result['data']['url']!='undefined'){localStorage.setItem('success_url',successUrl);localStorage.setItem('fail_url',failureUrl);window.location.replace(result['data']['url']);}});}
async function getDonorStatus(orderId,success_url,fail_url){var api=`${wdplugin_donation_worker_url}/donation/order/status/?order_id=${orderId}`;var url=api;await fetch(url,{method:'get',}).then(function(response){return response.json();}).then(function(result){if(success_url!=''&&!success_url.startsWith('http')){success_url='https://'+success_url;}
if(fail_url!=''&&!fail_url.startsWith('http')){fail_url='https://'+fail_url;}
if(result.data.status=='paid'){window.location.href=success_url;}else if(result.data.status=='canceled'||result.data.status=='open'||result.data.status=='unpaid'){window.location.href=fail_url;}else{}});}
async function checkInstallations(payload){let apiUrl=`${wdplugin_account_worker_url}/account/check/installations`;const settings={method:'post',headers:{'Content-Type':'application/json',},body:JSON.stringify(payload),};const res=await fetch(apiUrl,settings);if(res.ok){const json=await res.json();}else{console.log('Track installations error: '+response.status);}}
function addslashes(str){return str.replace(/\\/g,'\\\\').replace(/'/g,"\\'").replace(/"/g,'\\"').replace(/\0/g,'\\0');}
function _e(text,lang){const translations={en:{of:'of','':'',Monthly:'Monthly',Yearly:'Yearly','Select Amount':'Select Amount',Anonymous:'Anonymous',Donate:'Donate','Powered by ':'Powered by ',funded:'funded ',Other:'Other ',Amount:'Amount','Total Charge:':'Total Charge:','Whydonate has a 0% platform fee for organizers and relies on the generosity of donors like you to operate our service.':'Whydonate has a 0% platform fee for organizers and relies on the generosity of donors like you to operate our service.','Thank you for including a tip of':'Thank you for including a tip of','Enter Amount':'Enter Amount','First Name':'First Name','Last Name':'Last Name','Email Address':'Email Address',Currency:'Currency','The minimum amount is':'The minimum amount is','The maximum amount is':'The maximum amount is','Must be between':'Must be between',and:'and',characters:'characters','Please enter a valid email.':'Please enter a valid email.','Fundraiser is either closed by time or owner closed it!':'Fundraiser is either closed by time or owner closed it.','Select the currency in which you want to make the donation. If it is different from the default currency, the amount will be exchanged automatically.':'Select the currency in which you want to make the donation. If it is different from the default currency, the amount will be exchanged automatically.',closed:'closed',},bg:{of:'на','':'Един Път',Monthly:'Месечно',Yearly:'Годишно','Select Amount':'Изберете Сума',Anonymous:'Анонимен',Donate:'Дарение','Powered by':'Задвижвани от',funded:'финансиран',Other:'Други',Amount:'Сума','Total Charge:':'Общи Разходи:','':'WhyDonate има 0% такса за платформата за организаторите и се разчита на щедростта на дарителите като вас, за да функционира нашата услуга.','Thank you for including a tip of':'Благодаря за включването на дарение от:','Enter Amount':'Въведете Сума','First Name':'First Name','Last Name':'Фамилия','Email Address':'Имейл Адрес',Currency:'Валута','The minimum amount is':'Минималната сума е','The maximum amount is':'Максималната сума е','Must be between':'Трябва да е между',and:'и',characters:'символи','Please enter a valid email.':'Въведете валиден имейл адрес.','Fundraiser is either closed by time or owner closed it!':'Фондосъбирателят е или затворен поради изтичане на времето, или е затворен от собственика!','Select the currency in which you want to make the donation. If it is different from the default currency, the amount will be exchanged automatically.':'Изберете валутата, в която искате да направите дарение Ако тя се различава от валутата по подразбиране, сумата ще бъде автоматично обменена.',closed:'затворено',},de:{of:'von','':'Einmalig',Monthly:'Monatlich',Yearly:'Jährlich','Select Amount':'Betrag auswählen',Anonymous:'Anonym',Donate:'Spenden','Powered by':'Betrieben von',funded:'finanziert',Other:'Andere',Amount:'Betrag','Total Charge:':'Gesamtbetrag:','':'WhyDonate hat eine Plattformgebühr von 0 % für Organisatoren und ist auf die Großzügigkeit von Spendern wie Ihnen angewiesen, um unseren Service zu betreiben.','Thank you for including a tip of':'Vielen Dank, dass Sie einen Tipp mit aufgenommen haben:','Enter Amount':'Menge Eingeben','First Name':'Vorname','Last Name':'Nachname','Email Address':'E-Mail-Adresse',Currency:'Währung','The minimum amount is':'Der Mindestbetrag beträgt','The maximum amount is':'Der Höchstbetrag beträgt','Must be between':'Muss zwischen',and:'und',characters:'zeichen','Please enter a valid email.':'Bitte geben Sie eine gültige E-Mail-Adresse ein.','Fundraiser is either closed by time or owner closed it!':'Die Spendenaktion ist entweder abgelaufen oder wurde vom Besitzer geschlossen!','Select the currency in which you want to make the donation. If it is different from the default currency, the amount will be exchanged automatically.':'Wählen Sie die Währung aus, in der Sie spenden möchten. Wenn sie sich von der Standardwährung unterscheidet, wird der Betrag automatisch umgerechnet.',closed:'geschlossen',},el:{of:'του','':'Μια Φορά',Monthly:'Μηνιαίο',Yearly:'Ετήσιο','Select Amount':'Επιλέξτε Ποσό',Anonymous:'Ανώνυμος',Donate:'Δωρεά','Powered by':'Τροφοδοτείται από',funded:'χρηματοδοτημένο',Other:'Άλλο',Amount:'Ποσό','Total Charge:':'Συνολικό Κόστος:','':'Το WhyDonate έχει 0% χρέωση πλατφόρμας για τους διοργανωτές και βασίζεται στη γενναιοδωρία χορηγών όπως εσείς για να λειτουργήσει την υπηρεσία μας.','Thank you for including a tip of':'Σας ευχαριστούμε που περιλάβατε ένα φιλοδώρημα των:','Enter Amount':'Εισάγετε Ποσό','First Name':'Όνομα','Last Name':'Επώνυμο','Email Address':'Διεύθυνση Ηλεκτρονικού Ταχυδρομείου',Currency:'Νόμισμα','The minimum amount is':'Το ελάχιστο ποσό είναι','The maximum amount is':'Το μέγιστο ποσό είναι','Must be between':'Πρέπει να είναι μεταξύ',and:'και',characters:'χαρακτήρες','Please enter a valid email.':'Παρακαλώ εισάγετε μια έγκυρη διεύθυνση email.','Fundraiser is either closed by time or owner closed it!':'Ο έρανος είτε έκλεισε με τον καιρό είτε τον έκλεισε ο ιδιοκτήτης!','Select the currency in which you want to make the donation. If it is different from the default currency, the amount will be exchanged automatically.':'Επιλέξτε το νόμισμα στο οποίο θέλετε να κάνετε τη δωρεά Εάν διαφέρει από το προεπιλεγμένο νόμισμα, το ποσό θα ανταλλαχθεί αυτόματα.',closed:'κλειστό',},nl:{of:'van','':'Eenmalig',Monthly:'Maandelijks',Yearly:'Jaarlijks','Select Amount':'Selecteer Bedrag',Anonymous:'Anoniem',Donate:'Doneer','Powered by':'Ondersteund door',funded:'gefinancierd',Other:'Ander',Amount:'Bedrag','Total Charge:':'Totale Kosten:','':'WhyDonate heeft 0% platformkosten voor organisatoren en vertrouwt op de vrijgevigheid van donateurs zoals jij om onze service te laten functioneren.','Thank you for including a tip of':'Bedankt voor het geven van een fooi van:','Enter Amount':'Voer bedrag in','First Name':'Voornaam','Last Name':'Achternaam','Email Address':'E-mailadres',Currency:'Valuta','The minimum amount is':'Het minimale bedrag is','The maximum amount is':'Het maximale bedrag is','Must be between':'Moet tussen',and:'en',characters:'Tekens','Please enter a valid email.':'Voer een geldig e-mailadres in.','Fundraiser is either closed by time or owner closed it!':'De inzamelingsactie is ofwel gesloten door tijd of door de eigenaar!','Select the currency in which you want to make the donation. If it is different from the default currency, the amount will be exchanged automatically.':'Selecteer de valuta waarin je wilt doneren. Als dit anders is dan de standaardvaluta, wordt het bedrag automatisch omgewisseld.',closed:'gesloten',},pt:{of:'de','':'Uma Vez',Monthly:'Mensal',Yearly:'Anual','Select Amount':'Selecionar Montante',Anonymous:'Anônimo',Donate:'Doar','Powered by':'Potencializado por',funded:'financiado',Other:'Outro',Amount:'Montante','Total Charge:':'Carga Total:','':'WhyDonate tem uma taxa de plataforma de 0% para organizadores e depende da generosidade de doadores como você para operar nosso serviço.','Thank you for including a tip of':'Obrigado por incluir uma gorjeta de','Enter Amount':'Inserir Montante','First Name':'Nome','Last Name':'Sobrenome','Email Address':'Endereço de Email',Currency:'Moeda','The minimum amount is':'O valor mínimo é','The maximum amount is':'O valor máximo é','Must be between':'Deve estar entre',and:'e',characters:'caracteres','Please enter a valid email.':'Por favor, insira um e-mail válido.','Fundraiser is either closed by time or owner closed it!':'A campanha de arrecadação de fundos foi encerrada por hora ou o proprietário a fechou!','Select the currency in which you want to make the donation. If it is different from the default currency, the amount will be exchanged automatically.':'Selecione a moeda em que deseja fazer a doação. Se for diferente da moeda padrão, o montante será convertido automaticamente.',closed:'fechado',},ro:{of:'de','':'O singură dată',Monthly:'Lunar',Yearly:'Anual','Select Amount':'Selectați suma',Anonymous:'Anonim',Donate:'Donează','Powered by':'Propulsat de',funded:'finanțat',Other:'Altul',Amount:'Sumă','Total Charge:':'Taxă totală:','':'WhyDonate are o taxă de platformă de 0% pentru organizatori și se bazează pe generozitatea donatorilor ca dvs. pentru a opera serviciul nostru.','Thank you for including a tip of':'Vă mulțumim pentru includerea unui bacșiș','Enter Amount':'Introduceți suma','First Name':'Prenume','Last Name':'Nume','Email Address':'Adresa de email',Currency:'Monedă','The minimum amount is':'Suma minimă este','The maximum amount is':'Suma maximă este','Must be between':'Trebuie să fie între',and:'și',characters:'caractere','Please enter a valid email.':'Vă rugăm să introduceți o adresă de email validă.','Fundraiser is either closed by time or owner closed it!':'Strângerea de fonduri este fie închisă la timp, fie proprietarul a închis-o!','Select the currency in which you want to make the donation. If it is different from the default currency, the amount will be exchanged automatically.':'Selectați moneda în care doriți să faceți donația. Dacă este diferită de moneda implicită, suma va fi schimbată automat.',closed:'închis',},sk:{of:'z','':'Jednorazovo',Monthly:'Mesačne',Yearly:'Ročne','Select Amount':'Vyberte sumu',Anonymous:'Anonymný',Donate:'Darovať','Powered by':'Poháňaný',funded:'Financované',Other:'iné',Amount:'Suma','Total Charge:':'Celkový poplatok:','':'WhyDonate má 0% poplatok za platformu pre organizátorov a funguje vďaka štedrosti darcov ako ste vy.','Thank you for including a tip of':'Ďakujeme za pridanie tipu','Enter Amount':'Zadajte sumu','First Name':'Krstné meno','Last Name':'Priezvisko','Email Address':'Emailová adresa',Currency:'Mena','The minimum amount is':'Minimálna suma je','The maximum amount is':'Maximálna suma je','Must be between':'Musí byť medzi',and:'a',characters:'znakov','Please enter a valid email.':'Zadajte platný email.','Fundraiser is either closed by time or owner closed it!':'Zbierka je buď uzavretá časom alebo ju uzavrel majiteľ!','Select the currency in which you want to make the donation. If it is different from the default currency, the amount will be exchanged automatically.':'Vyberte menu, v ktorej chcete darovať. Ak je odlišná od predvolenej meny, suma bude automaticky prepočítaná.',closed:'Uzavreté',},es:{of:'de','':'Una vez',Monthly:'Mensual',Yearly:'Anual','Select Amount':'Seleccione cantidad',Anonymous:'Anónima',Donate:'Donar','Powered by':'Energizado por',funded:'fundada',Other:'Otra',Amount:'Cantidad','Total Charge:':'Carga total:','':'','Thank you for including a tip of':'Gracias por incluir un consejo de','Enter Amount':'Introduzca la cantidad','First Name':'Nombre de pila','Last Name':'Apellido','Email Address':'Dirección de Email',Currency:'Divisa','The minimum amount is':'El monto mínimo es','The maximum amount is':'El importe máximo es','Must be between':'Debe estar entre',and:'y',characters:'caracteres','Please enter a valid email.':'Por favor introduzca de Email válida.','Fundraiser is either closed by time or owner closed it!':'La recaudación de fondos está cerrada por tiempo o el propietario la cerró!','Select the currency in which you want to make the donation. If it is different from the default currency, the amount will be exchanged automatically.':'Selecciona la moneda en la que deseas realizar la donación. Si es diferente a la moneda predeterminada, el importe se cambiará automáticamente.',closed:'cerrada',},fr:{of:'de','':'Une Fois',Monthly:'Mensuel',Yearly:'Annuel','Select Amount':'Sélectionnez le Montant',Anonymous:'Anonyme',Donate:'Faire un Don','Powered by':'Propulsé par',funded:'financé',Other:'Autre',Amount:'Montant','Total Charge:':'Frais Totaux :','':'WhyDonate a des frais de plateforme de 0 % pour les organisateurs et compte sur la générosité de donateurs comme vous pour faire fonctionner notre service.','Thank you for including a tip of':"Merci d'avoir inclus un pourboire de",'Enter Amount':'Entrez le Montant','First Name':'Prénom','Last Name':'Nom','Email Address':'Adresse E-Mail',Currency:'Devise','The minimum amount is':'Le montant minimum est','The maximum amount is':'Le montant maximum est','Must be between':'Doit être compris entre',and:'et',characters:'caractères','Please enter a valid email.':'Veuillez saisir une adresse e-mail valide.','Fundraiser is either closed by time or owner closed it!':"La collecte de fonds est soit fermée par heure, soit le propriétaire l'a fermée !",'Select the currency in which you want to make the donation. If it is different from the default currency, the amount will be exchanged automatically.':'Sélectionnez la devise dans laquelle vous souhaitez faire le don. Si elle est différente de la devise par défaut, le montant sera échangé automatiquement.',closed:'fermé',},cs:{of:'z','':'Jednou',Monthly:'Měsíční',Yearly:'Roční','Select Amount':'Vyberte Částka',Anonymous:'Anonymní',Donate:'Darovat','Powered by':'Poháněno',funded:'financované',Other:'Jiný',Amount:'Množství','Total Charge:':'Celkový Poplatek:','':'WhyDonate má pro organizátory 0% poplatek za platformu a při provozování naší služby spoléhá na štědrost dárců, jako jste vy.','Thank you for including a tip of':'Děkuji za zařazení tipu','Enter Amount':'Vložit Sumu','First Name':'Jméno','Last Name':'Příjmení','Email Address':'Emailová Adresa',Currency:'Měna','The minimum amount is':'Minimální částka je','The maximum amount is':'Maximální částka je','Must be between':'Musí být mezi',and:'a',characters:'postavy','Please enter a valid email.':'Prosím zadejte platný email.','Fundraiser is either closed by time or owner closed it!':'Sbírka je buď uzavřena časem, nebo ji uzavřel majitel!','Select the currency in which you want to make the donation. If it is different from the default currency, the amount will be exchanged automatically.':'Vyberte měnu, ve které chcete darovat. Pokud se liší od výchozí měny, bude částka automaticky směněna.',closed:'ZAVŘENO',},hr:{of:'od','':'Jednom',Monthly:'Mjesečno',Yearly:'Godišnje','Select Amount':'Odaberite Iznos',Anonymous:'Anonimno',Donate:'Donirajte','Powered by':'Powered by',funded:'financiran',Other:'Ostalo',Amount:'Iznos','Total Charge:':'Ukupna Naknada:','':'WhyDonate ima 0% naknade za platformu za organizatore i oslanja se na velikodušnost donatora poput vas za upravljanje našom uslugom.','Thank you for including a tip of':'Hvala što ste uključili savjet o','Enter Amount':'Unesite Iznos','First Name':'Ime','Last Name':'Prezime','Email Address':'Email Adresa',Currency:'Valuta','The minimum amount is':'Minimalni iznos je','The maximum amount is':'Maksimalni iznos je','Must be between':'Mora biti između',and:'i',characters:'likovi','Please enter a valid email.':'Unesite valjanu e-poštu.','Fundraiser is either closed by time or owner closed it!':'Prikupljanje sredstava zatvoreno je zbog vremena ili ga je zatvorio vlasnik!','Select the currency in which you want to make the donation. If it is different from the default currency, the amount will be exchanged automatically.':'Odaberite valutu u kojoj želite dati donaciju. Ako se razlikuje od zadane valute, iznos će se automatski zamijeniti.',closed:'zatvoreno',},uk:{of:'з','':'Одного разу',Monthly:'Щомісяця',Yearly:'Щорічно','Select Amount':'Виберіть Сума',Anonymous:'Анонім',Donate:'Пожертвуйте','Powered by':'На основі',funded:'фінансується',Other:'Інший',Amount:'Сума','Total Charge:':'ЗагальнаСума:','':'WhyDonate має 0% комісії за платформу для організаторів і покладається на щедрість таких жертводавців, як ви, для роботи нашого сервісу.','Thank you for including a tip of':'Дякуємо, що додали підказку','Enter Amount':'Введіть Суму','First Name':"Ім'я",'Last Name':'Прізвище','Email Address':'Адреса електронної пошти',Currency:'Валюта','The minimum amount is':'Мінімальна сума становить','The maximum amount is':'Максимальна сума становить','Must be between':'Має бути між',and:'і',characters:'персонажів','Please enter a valid email.':'Введіть дійсну адресу електронної пошти.','Fundraiser is either closed by time or owner closed it!':'Збір коштів або закрито через час, або власник закрив його!','Select the currency in which you want to make the donation. If it is different from the default currency, the amount will be exchanged automatically.':'Виберіть валюту, в якій ви хочете зробити пожертву. Якщо вона відрізняється від валюти за умовчанням, сума буде обміняна автоматично.',closed:'ЗАЧИНЕНО',},pl:{of:'z','':'Jeden raz',Monthly:'Miesięczny',Yearly:'Rocznie','Select Amount':'Wybierz Kwota',Anonymous:'Anonimowy',Donate:'Podarować','Powered by':'Obsługiwane przez',funded:'finansowane',Other:'Inny',Amount:'Kwota','Total Charge:':'Łączna opłata:','':'WhyDonate ma 0% opłaty za platformę dla organizatorów i polega na hojności darczyńców takich jak Ty, aby obsługiwać nasze usługi.','Thank you for including a tip of':'Dziękujemy za dodanie wskazówki','Enter Amount':'Wprowadź Ilość','First Name':'Imię','Last Name':'Nazwisko','Email Address':'Adres e-mail',Currency:'Waluta','The minimum amount is':'Minimalna kwota to','The maximum amount is':'Maksymalna kwota to','Must be between':'Musi być pomiędzy',and:'I',characters:'postacie','Please enter a valid email.':'Proszę podać poprawny adres e-mail.','Fundraiser is either closed by time or owner closed it!':'Zbiórka jest albo zamknięta z czasem, albo właściciel ją zamknął!','Select the currency in which you want to make the donation. If it is different from the default currency, the amount will be exchanged automatically.':'Wybierz walutę, w której chcesz przekazać darowiznę. Jeżeli jest ona inna niż domyślna waluta, kwota zostanie wymieniona automatycznie.',closed:'Zamknięte',},sv:{of:'av','':'En Gång',Monthly:'En gång i månaden',Yearly:'Årlig','Select Amount':'Välj Belopp',Anonymous:'Anonym',Donate:'Donera','Powered by':'Drivs av',funded:'finansieras',Other:'Övrig',Amount:'Belopp','Total Charge:':'Total kostnad:','':'WhyDonate har en plattformsavgift på 0 % för arrangörer och förlitar sig på generositeten hos givare som du för att driva vår tjänst.','Thank you for including a tip of':'Tack för att du inkluderade ett tips','Enter Amount':'Ange Belopp','First Name':'Förnamn','Last Name':'Efternamn','Email Address':'E-postadress',Currency:'Valuta','The minimum amount is':'Minsta belopp är','The maximum amount is':'Maxbeloppet är','Must be between':'Måste vara mellan',and:'och',characters:'tecken','Please enter a valid email.':'Ange en giltig e-postadress.','Fundraiser is either closed by time or owner closed it!':'Insamlingen är antingen stängd av tid eller så har ägaren stängt den!','Select the currency in which you want to make the donation. If it is different from the default currency, the amount will be exchanged automatically.':'Välj den valuta som du vill göra donationen i. Om den skiljer sig från standardvalutan kommer beloppet att växlas automatiskt.',closed:'stängd',},fi:{of:'/','':'Kerran',Monthly:'Kuukausittain',Yearly:'Vuosittain','Select Amount':'Valitse Summa',Anonymous:'Nimetön',Donate:'Lahjoittaa','Powered by':'Voimanlähteenä',funded:'rahoitettu',Other:'muu',Amount:'Määrä','Total Charge:':'Kokonaismaksu:','':'WhyDonatella on 0 %:n alustamaksu järjestäjille, ja se luottaa kaltaisten lahjoittajien anteliaisuuteen palvelumme hoitamisessa.','Thank you for including a tip of':'Kiitos vinkin sisällyttämisestä','Enter Amount':'Syötä Summa','First Name':'Etunimi','Last Name':'Sukunimi','Email Address':'Sähköpostiosoite',Currency:'Valuutta','The minimum amount is':'Vähimmäismäärä on','The maximum amount is':'Suurin määrä on','Must be between':'Täytyy olla välillä',and:'ja',characters:'hahmoja','Please enter a valid email.':'Anna kelvollinen sähköpostiosoite.','Fundraiser is either closed by time or owner closed it!':'Varainkeruu on joko päättynyt ajan kuluessa tai omistaja sulki sen!','Select the currency in which you want to make the donation. If it is different from the default currency, the amount will be exchanged automatically.':'Valitse valuutta, jolla haluat tehdä lahjoituksen. Jos se on eri kuin oletusvaluutta, summa vaihdetaan automaattisesti.',closed:'suljettu',},it:{of:'Di','':'Una volta',Monthly:'Mensile',Yearly:'Annuale','Select Amount':'Seleziona importo',Anonymous:'Anonima',Donate:'Donare','Powered by':'Offerto da',funded:'finanziata',Other:'Altra',Amount:'Quantità','Total Charge:':'Costo totale:','':'WhyDonate prevede una commissione di piattaforma pari allo 0% per gli organizzatori e fa affidamento sulla generosità di donatori come te per gestire il nostro servizio.','Thank you for including a tip of':'Grazie per aver incluso un suggerimento','Enter Amount':"Inserire l'importo",'First Name':'Nome di battesimo','Last Name':'Cognome','Email Address':'Indirizzo email',Currency:'Valuta','The minimum amount is':"L'importo minimo è",'The maximum amount is':"L'importo massimo è",'Must be between':'Deve essere compreso tra',and:'E',characters:'caratteri','Please enter a valid email.':'Inserisci una email valida.','Fundraiser is either closed by time or owner closed it!':'La raccolta fondi è stata chiusa per tempo oppure è stata chiusa dal proprietario!','Select the currency in which you want to make the donation. If it is different from the default currency, the amount will be exchanged automatically.':"Seleziona la valuta in cui vuoi effettuare la donazione. Se è diversa dalla valuta predefinita, l'importo verrà convertito automaticamente.",closed:'chiusa',},da:{of:'af','':'En gang',Monthly:'Månedlige',Yearly:'Årligt','Select Amount':'Vælg Beløb',Anonymous:'Anonym',Donate:'Doner','Powered by':'Drevet af',funded:'finansieret',Other:'Andet',Amount:'Beløb','Total Charge:':'Samlet afgift:','':'WhyDonate har et platformsgebyr på 0 % for arrangører og er afhængig af donorernes generøsitet som dig til at drive vores service.','Thank you for including a tip of':'Tak for at inkludere et tip','Enter Amount':'Indtast beløb','First Name':'Fornavn','Last Name':'Efternavn','Email Address':'Email adresse',Currency:'Betalingsmiddel','The minimum amount is':'Minimumsbeløbet er','The maximum amount is':'Det maksimale beløb er','Must be between':'Skal være imellem',and:'og',characters:'tegn','Please enter a valid email.':'Indtast venligst en gyldig e-mail.','Fundraiser is either closed by time or owner closed it!':'Pengeindsamler er enten lukket af tid, eller ejeren lukkede den!','Select the currency in which you want to make the donation. If it is different from the default currency, the amount will be exchanged automatically.':'Vælg den valuta, som du vil give donationen i. Hvis den er forskellig fra standardvalutaen, vil beløbet blive udvekslet automatisk.',closed:'lukket',},hu:{of:'nak,-nek','':'Egyszer',Monthly:'Havi',Yearly:'Évi','Select Amount':'Válassza az Összeg lehetőséget',Donate:'Adományozni',Anonymous:'Névtelen','Powered by':'Powered by',funded:'finanszírozott',Other:'Egyéb',Amount:'Összeg','Total Charge:':'Teljes díj:','':'A WhyDonate 0%-os platformdíjat számít fel a szervezőknek, és a hozzád hasonló adományozók nagylelkűségére támaszkodik szolgáltatásunk működtetésében.','Thank you for including a tip of':'Köszönjük, hogy beírtál egy tippet','Enter Amount':'Adja meg az összeget','First Name':'Keresztnév','Last Name':'Vezetéknév','Email Address':'Email cím',Currency:'Valuta','The minimum amount is':'A minimális összeg az','The maximum amount is':'A maximális összeg','Must be between':'Között kell lennie',and:'és',characters:'karakterek','Please enter a valid email.':'Kérlek létező email címet adj meg.','Fundraiser is either closed by time or owner closed it!':'Az adománygyűjtés vagy idővel lezárult, vagy a tulajdonos lezárta!','Select the currency in which you want to make the donation. If it is different from the default currency, the amount will be exchanged automatically.':'Válassza ki azt a pénznemet, amelyben adományozni kíván. Ha eltér az alapértelmezett pénznemtől, az összeg automatikusan átváltásra kerül.',closed:'zárva',},};return translations[lang]&&translations[lang][text]?translations[lang][text]:text;}
function convertHtmlStringToHtml(htmlString){const tempElement=document.createElement('div');tempElement.innerHTML=htmlString;return tempElement.firstChild;}
function stringToBinary(str){const textEncoder=new TextEncoder();const uint8Array=textEncoder.encode(str);const binaryString=Array.from(uint8Array).map((byte)=>byte.toString(2).padStart(8,'0')).join('');return binaryString;}
function binaryToString(binaryString){const chunks=binaryString.match(/.{1,8}/g);const decodedString=chunks.map((chunk)=>String.fromCharCode(parseInt(chunk,2))).join('');return decodedString;}
function showInterval(index,tip_enabled,id,shortcode,donation_options_binary,font){let selectedDonationDptionsString=binaryToString(donation_options_binary)||'';var widgetIdValue=document.getElementById(`widget-id-${shortcode}`).innerHTML;var donationOptionsSection=document.getElementById(`interval-container-${widgetIdValue}`);var otherAmountNumber=document.getElementById(`other-amount-div-${widgetIdValue}`);if(index===0){selected_interval_object[widgetIdValue]='once';donationOptionsSection.innerHTML=selectedDonationDptionsString;currency_value_updater(widgetIdValue,tip_enabled,font);otherAmountNumber.style.display='none';}else if(index===1){selected_interval_object[widgetIdValue]='monthly';donationOptionsSection.innerHTML=selectedDonationDptionsString;currency_value_updater(widgetIdValue,tip_enabled,font);otherAmountNumber.style.display='none';}else if(index===2){selected_interval_object[widgetIdValue]='yearly';donationOptionsSection.innerHTML=selectedDonationDptionsString;currency_value_updater(widgetIdValue,tip_enabled,font);otherAmountNumber.style.display='none';}}
async function fundraiser_donation_values_api(id){let currency_select=document.getElementById(`currency-select-${id}`).value;let fundraiser_slug_value=document.getElementById(`widget-slug-${id}`).innerHTML;if(fundraiser_slug_value&&currency_select){let url=`${wdplugin_fundraiser_worker_url}/fundraiser/wp/donation/values?slug=${fundraiser_slug_value}&currency=${currency_select}`;let response=await fetch(url);let response_json=await response.json();currency_code_object[id]=response_json.data.currency;currency_symbol_object[id]=response_json.data.symbol;return response_json;}}
async function fundraiser_donation_values_share_api(id,currencyCode='none'){if(currencyCode=='none'){currency_select=document.getElementById(`currency-select-${id}`);currencyCode=currency_select.value;}
if(id){let url=`${wdplugin_fundraiser_worker_url}/fundraiser/donation/values?slug=${id}&currency=${currencyCode}`;let response=await fetch(url);let response_json=await response.json();currency_code_object[id]=response_json.data.currency;currency_symbol_object[id]=response_json.data.symbol;return response_json;}}
async function currency_value_updater(id,tip_enabled,font){let fundraiser_donation_values_response=fundraiser_donation_values_object[id];let currency_select=document.getElementById(`currency-select-${id}`);let source=document.getElementById(`source-${id}`);if(currency_select.value!=currency_code_object[id]){if(source=='share_mode'){fundraiser_donation_values_object[id]=await fundraiser_donation_values_share_api(id);}else{fundraiser_donation_values_object[id]=await fundraiser_donation_values_api(id);}
fundraiser_donation_values_response=fundraiser_donation_values_object[id];}
if(tip_enabled==1){var tip_box_span=document.getElementById(`tip-box-span-curr-symbol-${id}`);tip_box_span.innerHTML=fundraiser_donation_values_response.data.symbol;var tip_box_input=document.getElementById(`input-tip${id}`);tip_box_input.value=fundraiser_donation_values_response.data.tip_amount.default_values.tip_amount_fixed_default;}
let lang=document.getElementById(`language-code-${id}`).innerHTML;var first_radio=document.getElementById('select-amount-first-'+id);var first_radio_label=document.getElementById('amount-boundary-box-1-label-'+id);var second_radio=document.getElementById('select-amount-second-'+id);var second_radio_label=document.getElementById('amount-boundary-box-2-label-'+id);var third_radio=document.getElementById('select-amount-third-'+id);var third_radio_label=document.getElementById('amount-boundary-box-3-label-'+id);var forth_radio=document.getElementById('select-amount-forth-'+id);var forth_radio_label=document.getElementById('amount-boundary-box-4-label-'+id);var open_amount_symbol=document.getElementById('open-amount-number-currency-symbol-'+id);var other_amount_symbol=document.getElementById(`other-amount-div-currency-symbol-${id}`);var openAmountNumber=document.getElementById('open-amount-number-'+id);var otherRadio=document.getElementById('select-amount-other-'+id);if(selected_interval_object[id]=='once'){fundraiser_donation_values_response.data.customdonationconfiguration.onetime.default_1;if(first_radio){first_radio.value=fundraiser_donation_values_response.data.customdonationconfiguration.onetime.default_1;}
if(first_radio_label){first_radio_label.innerHTML=fundraiser_donation_values_response.data.symbol+
' '+
formatCurrency(fundraiser_donation_values_response.data.customdonationconfiguration.onetime.default_1,lang);}
if(second_radio){second_radio.value=fundraiser_donation_values_response.data.customdonationconfiguration.onetime.default_2;}
if(second_radio_label){second_radio_label.innerHTML=fundraiser_donation_values_response.data.symbol+
' '+
formatCurrency(fundraiser_donation_values_response.data.customdonationconfiguration.onetime.default_2,lang);}
if(third_radio){third_radio.value=fundraiser_donation_values_response.data.customdonationconfiguration.onetime.default_3;}
if(third_radio_label){third_radio_label.innerHTML=fundraiser_donation_values_response.data.symbol+
' '+
formatCurrency(fundraiser_donation_values_response.data.customdonationconfiguration.onetime.default_3,lang);}
if(forth_radio){forth_radio.value=fundraiser_donation_values_response.data.customdonationconfiguration.onetime.default_4;}
if(forth_radio_label){forth_radio_label.innerHTML=fundraiser_donation_values_response.data.symbol+
' '+
formatCurrency(fundraiser_donation_values_response.data.customdonationconfiguration.onetime.default_4,lang);}
if(open_amount_symbol){open_amount_symbol.innerHTML=currency_symbol_object[id]+' ';}
if(openAmountNumber){openAmountNumber.value=0;}
if(other_amount_symbol){other_amount_symbol.innerHTML=currency_symbol_object[id]+' ';}}else if(selected_interval_object[id]=='monthly'){if(first_radio){first_radio.value=fundraiser_donation_values_response.data.customdonationconfiguration.monthly.default_1;}
if(first_radio_label){first_radio_label.innerHTML=fundraiser_donation_values_response.data.symbol+
' '+
formatCurrency(fundraiser_donation_values_response.data.customdonationconfiguration.monthly.default_1,lang);}
if(second_radio){second_radio.value=fundraiser_donation_values_response.data.customdonationconfiguration.monthly.default_2;}
if(second_radio_label){second_radio_label.innerHTML=fundraiser_donation_values_response.data.symbol+
' '+
formatCurrency(fundraiser_donation_values_response.data.customdonationconfiguration.monthly.default_2,lang);}
if(third_radio){third_radio.value=fundraiser_donation_values_response.data.customdonationconfiguration.monthly.default_3;}
if(third_radio_label){third_radio_label.innerHTML=fundraiser_donation_values_response.data.symbol+
' '+
formatCurrency(fundraiser_donation_values_response.data.customdonationconfiguration.monthly.default_3,lang);}
if(forth_radio){forth_radio.value=fundraiser_donation_values_response.data.customdonationconfiguration.monthly.default_4;}
if(forth_radio_label){forth_radio_label.innerHTML=fundraiser_donation_values_response.data.symbol+
' '+
formatCurrency(fundraiser_donation_values_response.data.customdonationconfiguration.monthly.default_4,lang);}
if(open_amount_symbol){open_amount_symbol.innerHTML=currency_symbol_object[id]+' ';}
if(openAmountNumber){openAmountNumber.value=0;}
if(other_amount_symbol){other_amount_symbol.innerHTML=currency_symbol_object[id]+' ';}}else if(selected_interval_object[id]=='yearly'){if(first_radio){first_radio.value=fundraiser_donation_values_response.data.customdonationconfiguration.yearly.default_1;}
if(first_radio_label){first_radio_label.innerHTML=fundraiser_donation_values_response.data.symbol+
' '+
formatCurrency(fundraiser_donation_values_response.data.customdonationconfiguration.yearly.default_1,lang);}
if(second_radio){second_radio.value=fundraiser_donation_values_response.data.customdonationconfiguration.yearly.default_2;}
if(second_radio_label){second_radio_label.innerHTML=fundraiser_donation_values_response.data.symbol+
' '+
formatCurrency(fundraiser_donation_values_response.data.customdonationconfiguration.yearly.default_2,lang);}
if(third_radio){third_radio.value=fundraiser_donation_values_response.data.customdonationconfiguration.yearly.default_3;}
if(third_radio_label){third_radio_label.innerHTML=fundraiser_donation_values_response.data.symbol+
' '+
formatCurrency(fundraiser_donation_values_response.data.customdonationconfiguration.yearly.default_3,lang);}
if(forth_radio){forth_radio.value=fundraiser_donation_values_response.data.customdonationconfiguration.yearly.default_4;}
if(forth_radio_label){forth_radio_label.innerHTML=fundraiser_donation_values_response.data.symbol+
' '+
formatCurrency(fundraiser_donation_values_response.data.customdonationconfiguration.yearly.default_4,lang);}
if(open_amount_symbol){open_amount_symbol.innerHTML=currency_symbol_object[id]+' ';}
if(openAmountNumber){openAmountNumber.value=0;}
if(other_amount_symbol){other_amount_symbol.innerHTML=currency_symbol_object[id]+' ';}}
if(tip_enabled==1){createTipboxDropDown(id,'#9E9E9E',font);handleTipDropdownNew(id);}}
function checkVideoUrl(url){const vimeoPattern=/^(?:https?:\/\/)?(?:www\.)?(?:vimeo\.com\/)(\d+)(?:\S+)?$/;const youtubePattern=/^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:embed\/|watch\?v=|v\/|shorts\/)|youtu\.be\/)([\w\-]+)(?:\S+)?$/;if(url.match(vimeoPattern)){return this.generateVimeoIframe(url);}else if(url.match(youtubePattern)){return this.generateYouTubeIframe(url);}else{return 'unknown';}}
function generateVimeoIframe(videoLink){const vimeoVideoId=this.getVideoIdVimeo(videoLink);return `https://vumbnail.com/${vimeoVideoId}.jpg`;}
function generateYouTubeIframe(videoLink){const videoId=this.getVideoIdYoutube(videoLink);return `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`;}
function getVideoIdYoutube(videoLink){const pattern=/^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:embed\/|watch\?v=|v\/|shorts\/)|youtu\.be\/)([\w\-]+)(?:\S+)?$/;const match=videoLink?.match(pattern);return match&&match[1]?match[1]:'';}
function getVideoIdVimeo(videoLink){const pattern=/^(?:https?:\/\/)?(?:www\.)?(?:vimeo\.com\/)(\d+)(?:\S+)?$/;const match=videoLink?.match(pattern);return match&&match[1]?match[1]:'';}
function getValidLanguageCode(fullLocale){var languageCode=fullLocale.substr(0,2);switch(languageCode){case 'en':case 'fr':case 'es':case 'de':case 'nl':break;default:languageCode='en';break;}
return languageCode;}
function differentiateUrl(url){var currentUrl=url;var ipRegex=/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;if(ipRegex.test(currentUrl)){return whydonate_home_url;}else if(currentUrl.indexOf('localhost')!==-1){return whydonate_home_url;}else if(currentUrl.endsWith('.html')){return whydonate_home_url;}else{return currentUrl;}}
async function shortcode_func_html_generator(options={},slug='',language_code='',success_url='',fail_url='',source=''){let shortcode=options.shortcode||'';let id=options.id||'id';let pluginStyle=options.pluginStyle||'Default';let primaryColorCode=options.primaryColor||'#32BF55';let secondaryColorCode=options.secondaryColor||'#363396';let color=options.colorCode||'';let showDonateButton=options.showDonateButton||0;let showProgressBar=options.showProgressBar||0;let showRaisedAmount=options.showRaisedAmount||0;let showEndDate=options.showEndDate||0;let showDonationFormOnly=options.showDonationFormOnly||0;let doNotShowBox=options.doNotShowBox||0;let oneTimeCheck=options.oneTimeCheck||0;let monthlyCheck=options.monthlyCheck||0;let yearlyCheck=options.yearlyCheck||0;let firstAmountCheck=options.firstAmountCheck||0;let secondAmountCheck=options.secondAmountCheck||0;let thirdAmountCheck=options.thirdAmountCheck||0;let forthAmountCheck=options.forthAmountCheck||0;let otherChecked=options.otherChecked||0;let firstAmount=options.firstAmount||0;let secondAmount=options.secondAmount||0;let thirdAmount=options.thirdAmount||0;let forthAmount=options.forthAmount||0;let firstAmountMonthly=options.firstAmountMonthly||0;let secondAmountMonthly=options.secondAmountMonthly||0;let thirdAmountMonthly=options.thirdAmountMonthly||0;let forthAmountMonthly=options.fourthAmountMonthly||0;let firstAmountYearly=options.firstAmountYearly||0;let secondAmountYearly=options.secondAmountYearly||0;let thirdAmountYearly=options.thirdAmountYearly||0;let forthAmountYearly=options.fourthAmountYearly||0;let font=options.font||'';let flocalId=options.flocalId||0;let progress_bar=options.progress_bar||0.0;let progress_bar_width=options.progress_bar_width||0.0;let appearanceWindowHeight=options.appearanceWindowHeight||199;let selectInterval=0;let donationTitle=options.donationTitle||'';let elapsed=options.elapsed||'';let fundraiserTitle=options.fundraiserTitle||'';let buttonRadius=options.buttonRadius||30;let tip_enabled=true;let stripe_status=options.stripe_status||true;let fundraising_local_id='';let background='';let background_allowed=options.background_allowed||0;let open_amount=options.open_amount||0;let open_amount_monthly=options.open_amount_monthly||0;let open_amount_yearly=options.open_amount_yearly||0;let card_shadow=options.card_shadow||1;await loadFont(font);currency_code_object[id]='eur';currency_symbol_object[id]='€';var html_lang=document.documentElement.lang||'en';if(slug==''){slug=options.slug||options.slugName||'';}
if(language_code==''){language_code=options.language_code||'en';}else if(language_code=='auto'){language_code=getValidLanguageCode(html_lang);}else{switch(language_code){case 'en':case 'fr':case 'es':case 'de':case 'nl':case 'bg':case 'el':case 'pt':case 'ro':case 'sk':case 'hr':case 'uk':case 'pl':case 'sv':case 'fi':case 'it':case 'da':case 'hu':break;default:language_code='en';break;}}
let successUrl;if(success_url){successUrl=options.successUrl||success_url||window.location.href;}
let failureUrl;if(success_url){failureUrl=options.failureUrl||fail_url||window.location.href;}
if(pluginStyle=='Default'||pluginStyle=='Standaard'||pluginStyle=='Selecteer een stijl'){font='';primaryColorCode='#32BF55';secondaryColorCode='#363396';showDonateButton=1;showProgressBar=2;showRaisedAmount=3;showEndDate=4;showDonationFormOnly=0;doNotShowBox=0;oneTimeCheck=1;monthlyCheck=2;yearlyCheck=3;firstAmountCheck=1;secondAmountCheck=2;thirdAmountCheck=3;forthAmountCheck=4;otherChecked=1;firstAmount=25;secondAmount=50;thirdAmount=75;forthAmount=100;donationTitle='My Safe Donation';}else{font=font;primaryColorCode=primaryColorCode;secondaryColorCode=secondaryColorCode;showDonateButton=showDonateButton;showProgressBar=showProgressBar;showRaisedAmount=showRaisedAmount;showEndDate=showEndDate;showDonationFormOnly=showDonationFormOnly;doNotShowBox=doNotShowBox;oneTimeCheck=oneTimeCheck;monthlyCheck=monthlyCheck;yearlyCheck=yearlyCheck;firstAmountCheck=firstAmountCheck;secondAmountCheck=secondAmountCheck;thirdAmountCheck=thirdAmountCheck;forthAmountCheck=forthAmountCheck;otherChecked=otherChecked;firstAmount=firstAmount;secondAmount=secondAmount;thirdAmount=thirdAmount;forthAmount=forthAmount;donationTitle=donationTitle;buttonRadius=buttonRadius;}
if(oneTimeCheck!=0){selected_interval_object[id]='once';selectInterval=1;}else if(monthlyCheck!=0){selected_interval_object[id]='monthly';selectInterval=2;}else{selected_interval_object[id]='yearly';selectInterval=3;}
if(firstAmountCheck!=0){selectAmount=1;}else if(secondAmountCheck!=0){selectAmount=2;}else if(thirdAmountCheck!=0){selectAmount=3;}else if(forthAmountCheck!=0){selectAmount=4;}else{selectAmount=5;}
let response;if(source!='edit_preivew'){let original_response=await get_fundraiser_info(slug,language_code);let original_response_json=JSON.parse(original_response);let response_stripe=await get_stripe_charges(slug);if(original_response_json.data.result?.background.video==''||original_response_json?.data?.result?.background?.video==undefined){background=original_response_json.data?.result?.background?.image||'https://imagedelivery.net/_0vgnXOEIHPwLg2E52a7gg/production/fundraiser_header/default/public';}else{background=checkVideoUrl(original_response_json?.data?.result?.background?.video);}
currency_code_object[id]=original_response_json?.data?.result?.currency_code;currency_symbol_object[id]=original_response_json?.data?.result?.currency_symbol;if(response_stripe){if(response_stripe.data.status==true){stripe_status=true;}else{stripe_status=false;}}
if(background!=''&&background_allowed==1&&doNotShowBox==0){appearanceWindowHeight=371;}
fundraising_local_id=original_response_json?.data?.result?.id;response=original_response_json?.data?.result;}else{if(slug){let original_response=await get_fundraiser_info(slug,language_code);let original_response_json=JSON.parse(original_response);if(original_response_json?.data?.result?.background?.video==''||original_response_json?.data?.result?.background?.video==undefined){background=original_response_json.data?.result?.background?.image||'https://imagedelivery.net/_0vgnXOEIHPwLg2E52a7gg/production/fundraiser_header/default/public';}else{background=checkVideoUrl(original_response_json?.data?.result?.background?.video);}
currency_code_object[id]=original_response_json?.data?.result?.currency_code||'eur';currency_symbol_object[id]=original_response_json?.data?.result?.currency_symbol||'€';}else{background='https://imagedelivery.net/_0vgnXOEIHPwLg2E52a7gg/production/fundraiser_header/default/public';}
font='';colorCode='#2828d6';showDonateButton=1;showProgressBar=2;showRaisedAmount=3;showEndDate=4;showDonationFormOnly=0;doNotShowBox=0;oneTimeCheck=1;monthlyCheck=2;yearlyCheck=3;firstAmountCheck=1;secondAmountCheck=2;thirdAmountCheck=3;forthAmountCheck=4;otherChecked=1;donationTitle='';response={title:'Default',tip_enabled:false,amount_target:2500,donation:{amount:1000,count:200},end_date:new Date(new Date().setDate(new Date().getDate()+30)).toISOString().slice(0,10),is_opened:true,is_draft:false,show_donation_details:true,};stripe_status=true;if(background!=''&&background_allowed==1&&doNotShowBox==0){appearanceWindowHeight=404;}}
if(showRaisedAmount==0||showProgressBar==0){appearanceWindowHeight=200;}
if(showRaisedAmount==0&&showProgressBar==0){appearanceWindowHeight=100;}
let data=response;if(response){fundraiserTitle=addslashes(data?.title);tip_enabled=data?.tip_enabled?1:0;if(data.amount_target){if(data.amount_target!=0){const raw_value=(data.donation.amount/data.amount_target)*100;progress_bar=raw_value.toFixed(2).replace('.',',');if(raw_value>100){progress_bar_width=100;}else if(raw_value==0){progress_bar_width=0;}else{progress_bar_width=progress_bar;}}}}
const today=new Date();if(data.end_date){const endDate=new Date(data.end_date);if(endDate<today){elapsed='closed';}else{const timeDiff=endDate.getTime()-today.getTime();const daysElapsed=Math.floor(timeDiff/(1000*3600*24));if(daysElapsed<1000){elapsed=daysElapsed;}else{elapsed='';}}}
if(response){if(data.is_opened!=undefined){if(!data.is_opened||elapsed=='closed'){colorCode='#D3D3D3';}}}
if((data.amount_target==0)&(background_allowed==0)){appearanceWindowHeight=170;}
if(data.is_opened==false||elapsed=='closed'){appearanceWindowHeight+=44;}
if(showProgressBar==2&&showRaisedAmount==3&&background_allowed==1){appearanceWindowHeight=410;}
btnId='apreview-donate-btn-'+pluginStyle;modalId='donate-window-modal-'+pluginStyle;let background_preview=`<img id="widget-image-background" src="${background}" style="border-top-left-radius: 10px;
    border-top-right-radius: 10px;display:${
background_allowed==1&&showDonationFormOnly==0&&doNotShowBox==0?'':'none'
}";>`;let background_preview_modal=`<img id="form-image-background" src="${background}" style="display:${
background_allowed==1&&showDonationFormOnly==1?'':'none'
}";>`;let card_shadow_css;if(card_shadow==1){card_shadow_css='0 2px 1px -1px #0003, 0 1px 1px #00000024, 0 1px 3px #0000001f;';}else if(card_shadow==2){card_shadow_css='0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;';}else if(card_shadow==3){card_shadow_css='0 2px 4px -1px #0003, 0 4px 5px #00000024, 0 1px 10px #0000001f;';}else if(card_shadow==4){card_shadow_css='0 2px 4px -1px #0003, 0 4px 5px #00000024, 0 1px 10px #0000001f;';}
if(showDonationFormOnly==1&&data['show_donation_details']==false&&data['amount_target']==0){showRaisedAmount=0;}
const donation_box=`<div class="style-container-shortcode" id="style-container-shortcode">
    

    <div class="appearance-preview" id="appearance-preview" style="display : ${
showDonationFormOnly==1?'none':'flex'
}; font-family: '${font}' !important;">
        
         <div class="appearance-preview-card-shortcode" id="appearance-preview-card-shortcode" style="height:${appearanceWindowHeight}px;background:${
doNotShowBox==1?'transparent !important;':'rgb(248, 245, 245);'
} box-shadow:${doNotShowBox==1?'none;':card_shadow_css}">
         ${background_preview}
         <div class="apreview-amount-raised" id="apreview-amount-raised" style="align-items: baseline; height: ${
showRaisedAmount==0?'0px':'40px'
}">
         ${
data['show_donation_details']==true?data.hasOwnProperty('donation')&&data.hasOwnProperty('amount_target')?`
             ${
showRaisedAmount==3?`
                 <div class="apreview-collected-amount-div" id="apreview-collected-amount-div" style="font-family: '${font}' !important;">
                     <label for="apreview-collected-amount" style="display: block; font-size: 32px"><span class="currency-symbol">${
currency_symbol_object[id]
}</span> ${formatCurrency(data['donation']['amount'],language_code)}</label>
                 </div>
             `:''
}
             ${
showProgressBar==2&&data['amount_target']!=0?`
                 <div class="apreview-target-amount-div" id="apreview-target-amount-div" style="font-family: '${font}' !important; font-weight: 300; display: flex">
                     ${
showProgressBar==2&&showRaisedAmount==3?`
                         <div class="apreview-target-amount-div-label-1" id="apreview-target-amount-div-label-1">
                             <label id="apreview-target-amount-of" style="color: gray; display: block; font-size: 22px"> ${_e('of',language_code)}
                             </label>
                         </div>
                     `:''
}
                     <div class="apreview-target-amount-div-label-2" id="apreview-target-amount-div-label-2">
                         <label for="apreview-target-amount" style="color: gray; margin-left: 10px; display: block; font-size: 22px"> <span class="currency-symbol">${
currency_symbol_object[id]
}</span> ${formatCurrency(data['amount_target'],language_code)}</label>
                     </div>
                 </div>
             `:''
}
         `:`
         <h1>No Data Found</h1>
         `:data.hasOwnProperty('donation')&&data.hasOwnProperty('amount_target')?`

                ${
showProgressBar==2&&data['amount_target']!=0?`
                    <div class="apreview-target-amount-div" id="apreview-target-amount-div" style="font-family: '${font}' !important; font-weight: 300; display: flex">
                        <div class="apreview-target-amount-div-label-2" id="apreview-target-amount-div-label-2">
                            <label for="apreview-target-amount" style="color:#000000de; font-weight: 400; display: block; font-size: 24px"> <span class="currency-symbol">${
currency_symbol_object[id]
}</span> ${formatCurrency(data['amount_target'],language_code)}</label>
                        </div>
                    </div>
                `:''
}
            `:`
            <h1>No Data Found</h1>
        `
}
     </div>
     
     <div class="apreview-progress-bar" id="apreview-progress-bar">
         ${
data.hasOwnProperty('amount_target')?`
             ${
showProgressBar==2&&data['amount_target']!=0?`
                 <div class="apreview-full-bar" id="apreview-full-bar">
                     <div id="apreview-raised-bar" class="apreview-raised-bar" style="width: ${
data['show_donation_details']==false?0:progress_bar_width
}%; background-color:${primaryColorCode} !important;">
					</div>
                 </div>
             `:''
}
             <div class="apreview-progress-info" id="apreview-progress-info" style="font-family: '${font}' !important;">
                 ${
showProgressBar==2&&data['amount_target']!=0?`
                               <div class="apreview-achieved-percent" id="apreview-achieved-percent" >
                                   <label style="font-family: '${font}' !important;font-size: 14px; font-weight: 300; color: gray; display: ${
data['show_donation_details']==false?'none':'block'
}">
								   ${progress_bar}%${_e('funded',language_code)}</label>
                               </div>
                 `:''
}
                 ${
showEndDate==4?`
                     <div class="apreview-days-left" id="apreview-days-left" style="font-family: '${font}' !important;">
                         <label style="display: block; font-size: 14px; font-weight: 300; color: gray">
                             ${
data['is_opened']&&elapsed!='closed'?elapsed:''
}
                             ${
elapsed!=''?data['is_opened']&&elapsed!='closed'?'day(s) left':_e('closed',language_code):''
}
                         </label>
                     </div>
                 `:''
}
             </div>
         `:`
         <h1>No Data Found</h1>
         `
}
     </div>
     
         ${
showDonateButton==1?`
         <div class="apreview-donate-btn-div info-img-container" id="apreview-donate-btn-div" style="font-family: '${font}' !important;">
             ${
data.hasOwnProperty('donation')&&data.hasOwnProperty('amount_target')?`
                 <button class="apreview-donate-btn" id="apreview-donate-btn-${id}" onclick="showDonateWindow('${id}', ${tip_enabled}, '${secondaryColorCode}', '${language_code}')" style="font-family: '${font}' !important; background-color: ${secondaryColorCode}; border-radius: ${buttonRadius}px" ${
!data['is_opened']||elapsed=='closed'||data['is_draft']||!stripe_status?'disabled':''
}>
                     ${_e('Donate',language_code)}
                 </button>
             `:''
}
             ${
data.hasOwnProperty('is_opened')?`
                 ${
data['is_opened']==false||elapsed=='closed'?`
                        <div class="info-img-hover-box" style="font-family: '${font}' !important;">
                        <p style="font-family: '${font}' !important;">${_e('Fundraiser is either closed by time or owner closed it!',language_code)}</p>
                    </div>
                 `:''
}
             `:''
}
         </div>
         `:''
}
     </div>
 `;let donation_options=`     
        <label style="margin-top: 20px; font-family: '${font}' !important; font-size: 14px; font-weight: 400; display: ${
open_amount==0?'block':'none'
}">${_e('Select Amount',language_code)}</label>                    
        <label style="margin-top: 20px; font-family: '${font}' !important; font-size: 14px; font-weight: 400; display: ${
open_amount==1?'block':'none'
}">${_e('Enter Amount',language_code)}</label>                    
        <div class="preview-select-amount-options" id="preview-select-amount-options-${id}" style="padding-top: 15px;padding-bottom: 15px;">
            <div id ="donation-option-amount" style="display:${
open_amount==0?'flex':'none'
};flex-direction:row;gap:16px;flex-wrap: wrap;">
                ${
firstAmountCheck==1?`
                <div class="amount-boundary-box-1-s" id="amount-boundary-box-1-s-${id}" style="text-align: center; position: relative; background-color: ${
selectInterval==1?primaryColorCode:''
};">
                    <input type="radio" value="${firstAmount}" ${
selectInterval==1&&open_amount==0?'checked':''
} name="select-amount-${id}" id="select-amount-first-${id}" onchange="selectFirstAmount('${primaryColorCode}', '${id}', ${tip_enabled})" style="margin-left: -5px; z-index: 10; position: absolute;" />
                    <label for="select-amount-first-${id}" id="amount-boundary-box-1-label-${id}"  style="font-family: '${font}' !important; font-size: 16px; font-weight: 600;">${
currency_symbol_object[id]+
' '+
formatCurrency(firstAmount,language_code)
}</label>
                </div>
                `:''
}
                ${
secondAmountCheck==2?`
                <div class="amount-boundary-box-2-s" id="amount-boundary-box-2-s-${id}" style="text-align: center; position: relative; background-color: ${
selectInterval==2?primaryColorCode:''
};">
                    <input type="radio" value="${secondAmount}" ${
selectInterval==2&&open_amount==0?'checked':''
} name="select-amount-${id}" id="select-amount-second-${id}" onchange="selectSecondAmount('${primaryColorCode}', '${id}', ${tip_enabled})" style="margin-left: -5px; z-index: 10; position: absolute;" />
                    <label for="select-amount-second-${id}" id = "amount-boundary-box-2-label-${id}" style="font-family: '${font}' !important; font-size: 16px; font-weight: 600${
selectInterval==2?';color:white;':''
}">${
currency_symbol_object[id]+
' '+
formatCurrency(secondAmount,language_code)
}</label>
                </div>
                `:''
}
                ${
thirdAmountCheck==3?`
                <div class="amount-boundary-box-3-s" id="amount-boundary-box-3-s-${id}" style="text-align: center; position: relative; background-color: ${
selectInterval==3?primaryColorCode:''
};">
                    <input type="radio" value="${thirdAmount}" ${
selectInterval==3&&open_amount==0?'checked':''
} name="select-amount-${id}" id="select-amount-third-${id}" onchange="selectThirdAmount('${primaryColorCode}', '${id}', ${tip_enabled})" style="margin-left: -5px; z-index: 10; position: absolute;" />
                    <label for="select-amount-third-${id}" id="amount-boundary-box-3-label-${id}" style="font-family: '${font}' !important; font-size: 16px; font-weight: 600${
selectInterval==3?';color:white;':''
}">${
currency_symbol_object[id]+
' '+
formatCurrency(thirdAmount,language_code)
}</label>
                </div>
                `:''
}
                ${
forthAmountCheck==4?`
                <div class="amount-boundary-box-4-s" id="amount-boundary-box-4-s-${id}" style="text-align: center; position: relative; background-color: ${
selectInterval==4?primaryColorCode:''
};">
                    <input type="radio" value="${forthAmount}" ${
selectInterval==4&&open_amount==0?'checked':''
} name="select-amount-${id}" id="select-amount-forth-${id}" onchange="selectForthAmount('${primaryColorCode}', '${id}', ${tip_enabled})" style="margin-left: -5px; z-index: 10; position: absolute;" />
                    <label for="select-amount-forth-${id}" id="amount-boundary-box-4-label-${id}" style="font-family: '${font}' !important; font-size: 16px; font-weight: 600${
selectInterval==4?';color:white;':''
}">${
currency_symbol_object[id]+
' '+
formatCurrency(forthAmount,language_code)
}</label>
                </div>
                `:''
}
                ${
otherChecked==1?`
                <div class="amount-boundary-box-other-s" id="amount-boundary-box-other-s-${id}" style="text-align: center; position: relative; background-color: ${
selectInterval==5?primaryColorCode:''
};">
                    <input type="radio" value="other" ${
selectInterval==5&&open_amount!=0?'checked':''
} name="select-amount-${id}" id="select-amount-other-${id}" onchange="selectOtherAmount('${primaryColorCode}', '${id}', ${tip_enabled})" style="position: absolute" />
                    <label for="select-amount-other-${id}" style="font-family: '${font}' !important; font-size: 16px; margin-right: 3px; font-weight: 600${
selectInterval==5?';color:white;':''
}">${_e('Other',language_code)}</label>
                </div>`:''
}
            </div>
            <div id ="donation-option-open-amount" style="width: 100%; display:${
open_amount!=0?'':'none'
}; max-width: 358px;">
                <div class="open-amount-div" id="open-amount-div-${id}" style="display: flex; align-items: center; background-color: white; width: 100%; height: 100%; font-family: '${font}' !important; font-size: 14px; border-radius: 0px; border: 1px solid !important; --darkreader-inline-bgcolor: #181a1b; --darkreader-inline-border-top: currentcolor; --darkreader-inline-border-right: currentcolor; --darkreader-inline-border-bottom: currentcolor; --darkreader-inline-border-left: currentcolor;">
                    <input type="radio" ${
open_amount!=0?'checked':''
} name="select-open-amount-${id}" id="select-open-amount-${id}" value="open" style="display:none">
                    <span id="open-amount-number-currency-symbol-${id}" style="font-family: '${font}' !important;text-align: center; width: 15px; padding-left: 14px;">${
currency_symbol_object[id]
} </span>
                    <input type="text" name="amount" class="other-amount-input-number" placeholder="00,00" id="open-amount-number-${id}" style="font-family: '${font}' !important; !important" onkeyup="handleOpenAmountInput(event.target.value, '${id}','${language_code}')" onkeydown="isRestrictKeysForOtherAmount(event, ${id})" oninput="amountInputSpinner(event.target.value, '${id}')" min="5">
                </div>
            </div>
    </div>
    `;let donation_options_monthly=`                         
        <label style="margin-top: 20px; font-family: '${font}' !important; font-size: 14px; font-weight: 400; display: ${
open_amount_monthly==0?'block':'none'
}">${_e('Select Amount',language_code)}</label>                    
        <label style="margin-top: 20px; font-family: '${font}' !important; font-size: 14px; font-weight: 400; display: ${
open_amount_monthly==1?'block':'none'
}">${_e('Enter Amount',language_code)}</label>     
    <div class="preview-select-amount-options" id="preview-select-amount-options-${id}" style="padding-top: 15px;padding-bottom: 15px;">
        
        <div id ="donation-option-amount" style="display:${
open_amount_monthly==0?'flex':'none'
};flex-direction:row;flex-wrap:wrap;gap:16px;">
        ${
firstAmountCheck==1?`
            <div class="amount-boundary-box-1-s" id="amount-boundary-box-1-s-${id}" style="text-align: center; position: relative; background-color: ${
selectInterval==1?primaryColorCode:''
}">
                <input type="radio" value="${firstAmountMonthly}" ${
selectInterval==1&&open_amount_monthly==0?'checked':''
} name="select-amount-${id}" id="select-amount-first-${id}" onchange="selectFirstAmount('${primaryColorCode}', '${id}', ${tip_enabled})" style="margin-left: -5px; z-index: 10; position: absolute;" />
                <label for="select-amount-first-${id}" id="amount-boundary-box-1-label-${id}"  style="font-family: '${font}' !important; font-size: 16px; font-weight: 600">${
currency_symbol_object[id]+
' '+
formatCurrency(firstAmountMonthly,language_code)
}</label>
            </div>
            `:''
}
            ${
secondAmountCheck==2?`
            <div class="amount-boundary-box-2-s" id="amount-boundary-box-2-s-${id}" style="text-align: center; position: relative; background-color: ${
selectInterval==2?primaryColorCode:''
}">
                <input type="radio" value="${secondAmountMonthly}" ${
selectInterval==2&&open_amount_monthly==0?'checked':''
} name="select-amount-${id}" id="select-amount-second-${id}" onchange="selectSecondAmount('${primaryColorCode}', '${id}', ${tip_enabled})" style="margin-left: -5px; z-index: 10; position: absolute;" />
                <label for="select-amount-second-${id}" id = "amount-boundary-box-2-label-${id}" style="font-family: '${font}' !important; font-size: 16px; font-weight: 600${
selectInterval==2?';color:white;':''
}">${
currency_symbol_object[id]+
' '+
formatCurrency(secondAmountMonthly,language_code)
}</label>
            </div>
            `:''
}
            ${
thirdAmountCheck==3?`
            <div class="amount-boundary-box-3-s" id="amount-boundary-box-3-s-${id}" style="text-align: center; position: relative; background-color: ${
selectInterval==3?primaryColorCode:''
}">
                <input type="radio" value="${thirdAmountMonthly}" ${
selectInterval==3&&open_amount_monthly==0?'checked':''
} name="select-amount-${id}" id="select-amount-third-${id}" onchange="selectThirdAmount('${primaryColorCode}', '${id}', ${tip_enabled})" style="margin-left: -5px; z-index: 10; position: absolute;" />
                <label for="select-amount-third-${id}" id="amount-boundary-box-3-label-${id}" style="font-family: '${font}' !important; font-size: 16px; font-weight: 600${
selectInterval==3?';color:white;':''
}">${
currency_symbol_object[id]+
' '+
formatCurrency(thirdAmountMonthly,language_code)
}</label>
            </div>
            `:''
}
            ${
forthAmountCheck==4?`
            <div class="amount-boundary-box-4-s" id="amount-boundary-box-4-s-${id}" style="text-align: center; position: relative; background-color: ${
selectInterval==4?primaryColorCode:''
}">
                <input type="radio" value="${forthAmountMonthly}" ${
selectInterval==4&&open_amount_monthly==0?'checked':''
} name="select-amount-${id}" id="select-amount-forth-${id}" onchange="selectForthAmount('${primaryColorCode}', '${id}', ${tip_enabled})" style="margin-left: -5px; z-index: 10; position: absolute;" />
                <label for="select-amount-forth-${id}" id="amount-boundary-box-4-label-${id}" style="font-family: '${font}' !important; font-size: 16px; font-weight: 600${
selectInterval==4?';color:white;':''
}">${
currency_symbol_object[id]+
' '+
formatCurrency(forthAmountMonthly,language_code)
}</label>
            </div>
            `:''
}
            ${
otherChecked==1?`
            <div class="amount-boundary-box-other-s" id="amount-boundary-box-other-s-${id}" style="text-align: center; position: relative; background-color: ${
selectInterval==5?primaryColorCode:''
}">
                <input type="radio" value="other" ${
selectInterval==5&&open_amount_monthly==0?'checked':''
} name="select-amount-${id}" id="select-amount-other-${id}" onchange="selectOtherAmount('${primaryColorCode}', '${id}', ${tip_enabled})" style="position: absolute" />
                <label for="select-amount-other-${id}" style="font-family: '${font}' !important; font-size: 16px; margin-right: 3px; font-weight: 600${
selectInterval==5?';color:white;':''
} ">${_e('Other',language_code)}</label>
            </div>`:''
}
        </div>
        <div id ="donation-option-open-amount" style="width: 100%;display:${
open_amount_monthly!=0?'':'none'
};">
            <div class="open-amount-div" id="open-amount-div-${id}" style="display: flex; align-items: center; background-color: white; width: 100%; height: 100%; font-family: '${font}' !important; font-size: 14px; border-radius: 0px; border: 1px solid !important; --darkreader-inline-bgcolor: #181a1b; --darkreader-inline-border-top: currentcolor; --darkreader-inline-border-right: currentcolor; --darkreader-inline-border-bottom: currentcolor; --darkreader-inline-border-left: currentcolor;">
                <input type="radio" ${
open_amount_monthly!=0?'checked':''
} name="select-open-amount-${id}" id="select-open-amount-${id}" value="open" style="display:none">
                <span id="open-amount-number-currency-symbol-${id}" style="font-family: '${font}' !important;text-align: center; width: 15px; padding-left: 14px;">${
currency_symbol_object[id]
} </span>
                <input type="text" name="amount" class="other-amount-input-number" placeholder="00,00" id="open-amount-number-${id}" style="font-family: '${font}' !important;" onkeyup="handleOpenAmountInput(event.target.value, '${id}','${language_code}')" onkeydown="isRestrictKeysForOtherAmount(event)" oninput="amountInputSpinner(event.target.value, '${id}')" min="5">
            </div>
        </div>
    </div>
    `;let donation_options_yearly=`              
        <label style="margin-top: 20px; font-family: '${font}' !important; font-size: 14px; font-weight: 400; display: ${
open_amount_yearly==0?'block':'none'
}">${_e('Select Amount',language_code)}</label>                    
        <label style="margin-top: 20px; font-family: '${font}' !important; font-size: 14px; font-weight: 400; display: ${
open_amount_yearly==1?'block':'none'
}">${_e('Enter Amount',language_code)}</label>             
    <div class="preview-select-amount-options " id="preview-select-amount-options-${id}" style="padding-top: 15px;padding-bottom: 15px;">
        <div id ="donation-option-amount" style="display:${
open_amount_yearly==0?'flex':'none'
};flex-direction:row;flex-wrap:wrap; gap:16px;">        
            ${
firstAmountCheck==1?`
            <div class="amount-boundary-box-1-s" id="amount-boundary-box-1-s-${id}" style="text-align: center; position: relative; background-color: ${
selectInterval==1?primaryColorCode:''
}">
                <input type="radio" value="${firstAmountYearly}" ${
selectInterval==1&&open_amount_yearly==0?'checked':''
} name="select-amount-${id}" id="select-amount-first-${id}" onchange="selectFirstAmount('${primaryColorCode}', '${id}', ${tip_enabled})" style="margin-left: -5px; z-index: 10; position: absolute;" />
                <label for="select-amount-first-${id}" id="amount-boundary-box-1-label-${id}"  style="font-family: '${font}' !important; font-size: 16px; font-weight: 600 ">${
currency_symbol_object[id]+
' '+
formatCurrency(firstAmountYearly,language_code)
}</label>
            </div>
            `:''
}
            ${
secondAmountCheck==2?`
            <div class="amount-boundary-box-2-s" id="amount-boundary-box-2-s-${id}" style="text-align: center; position: relative; background-color: ${
selectInterval==2?primaryColorCode:''
}">
                <input type="radio" value="${secondAmountYearly}" ${
selectInterval==2&&open_amount_yearly==0?'checked':''
} name="select-amount-${id}" id="select-amount-second-${id}" onchange="selectSecondAmount('${primaryColorCode}', '${id}', ${tip_enabled})" style="margin-left: -5px; z-index: 10; position: absolute;" />
                <label for="select-amount-second-${id}" id = "amount-boundary-box-2-label-${id}" style="font-family: '${font}' !important; font-size: 16px; font-weight: 600${
selectInterval==2?';':''
}">${
currency_symbol_object[id]+
' '+
formatCurrency(secondAmountYearly,language_code)
}</label>
            </div>
            `:''
}
            ${
thirdAmountCheck==3?`
            <div class="amount-boundary-box-3-s" id="amount-boundary-box-3-s-${id}" style="text-align: center; position: relative; background-color: ${
selectInterval==3?primaryColorCode:''
}">
                <input type="radio" value="${thirdAmountYearly}" ${
selectInterval==3&&open_amount_yearly==0?'checked':''
} name="select-amount-${id}" id="select-amount-third-${id}" onchange="selectThirdAmount('${primaryColorCode}', '${id}', ${tip_enabled})" style="margin-left: -5px; z-index: 10; position: absolute;" />
                <label for="select-amount-third-${id}" id="amount-boundary-box-3-label-${id}" style="font-family: '${font}' !important; font-size: 16px; font-weight: 600${
selectInterval==3?';':''
}">${
currency_symbol_object[id]+
' '+
formatCurrency(thirdAmountYearly,language_code)
}</label>
            </div>
            `:''
}
            ${
forthAmountCheck==4?`
            <div class="amount-boundary-box-4-s" id="amount-boundary-box-4-s-${id}" style="text-align: center; position: relative; background-color: ${
selectInterval==4?primaryColorCode:''
}">
                <input type="radio" value="${forthAmountYearly}" ${
selectInterval==4&&open_amount_yearly==0?'checked':''
} name="select-amount-${id}" id="select-amount-forth-${id}" onchange="selectForthAmount('${primaryColorCode}', '${id}', ${tip_enabled})" style="margin-left: -5px; z-index: 10; position: absolute;" />
                <label for="select-amount-forth-${id}" id="amount-boundary-box-4-label-${id}" style="font-family: '${font}' !important; font-size: 16px; font-weight: 600${
selectInterval==4?';':''
}">${
currency_symbol_object[id]+
' '+
formatCurrency(forthAmountYearly,language_code)
}</label>
            </div>
            `:''
}
            ${
otherChecked==1?`
            <div class="amount-boundary-box-other-s" id="amount-boundary-box-other-s-${id}" style="text-align: center; position: relative; background-color: ${
selectInterval==5?primaryColorCode:''
}">
                <input type="radio" value="other" ${
selectInterval==5&&open_amount_yearly==0?'checked':''
} name="select-amount-${id}" id="select-amount-other-${id}" onchange="selectOtherAmount('${primaryColorCode}', '${id}', ${tip_enabled})" style="position: absolute" />
                <label for="select-amount-other-${id}" style="font-family: '${font}' !important; font-size: 16px; margin-right: 3px; font-weight: 600${
selectInterval==5?';':''
}">${_e('Other',language_code)}</label>
            </div>`:''
}
        </div>
        <div id ="donation-option-open-amount" style="width: 100%;display:${
open_amount_yearly!=0?'':'none'
};">
            <div class="open-amount-div" id="open-amount-div-${id}" style="display: flex; align-items: center; background-color: white; width: 100%; height: 100%; font-family: '${font}' !important; font-size: 14px; border-radius: 0px; border: 1px solid !important; --darkreader-inline-bgcolor: #181a1b; --darkreader-inline-border-top: currentcolor; --darkreader-inline-border-right: cuzrrentcolor; --darkreader-inline-border-bottom: currentcolor; --darkreader-inline-border-left: currentcolor;">
                <input type="radio" ${
open_amount_yearly!=0?'checked':''
} name="select-open-amount-${id}" id="select-open-amount-${id}" value="open" style="display:none">
                <span id="open-amount-number-currency-symbol-${id}" style="font-family: '${font}' !important; text-align: center; width: 15px; padding-left: 14px;">${
currency_symbol_object[id]
} </span>
                <input type="text" name="amount" class="other-amount-input-number" placeholder="00,00" id="open-amount-number-${id}" style="font-family: '${font}' !important;" onkeyup="handleOpenAmountInput(event.target.value, '${id}','${language_code}')" onkeydown="isRestrictKeysForOtherAmount(event)" oninput="amountInputSpinner(event.target.value, '${id}')" min="5">
            </div>
        </div>
    </div>
    `;let selected_donation_options='';if(oneTimeCheck!=0){selected_donation_options=donation_options;}else if(oneTimeCheck==0&&monthlyCheck!=0){selected_donation_options=donation_options_monthly;}else if(oneTimeCheck==0&&monthlyCheck==0&&yearlyCheck!=0){selected_donation_options=donation_options_yearly;}
const donation_window_modal_content=` 
    <!-- Modal content -->
    <div class="donate-window-content" style="font-family: '${font}' !important;">
        <div id="widget-id-${shortcode}" style="display:none;">${id}</div>
        <div id="widget-slug-${id}" style="display:none;">${slug}</div>
        <div id="language-code-${id}" style="display:none;">${language_code}</div>
        <div id="source-${id}" style="display:none;">${source}</div>

        <div class="preview" id="preview-${id}" style="min-width:300px; margin-left: ${
showDonationFormOnly==1?'0px;':'30px;'
}; ${showDonationFormOnly==1?'z-index:0 !important;':''}">

            <div class="preview-card" id="preview-card-${id}" style="box-shadow:${
doNotShowBox==1&&showDonationFormOnly==1?'none;':card_shadow_css
}">
                ${
donationTitle==''?`${
showDonationFormOnly!=1?`<span class="close-wp" id="${id}">&times;</span>`:''
}`:`<div class="preview-header" id="preview-header-${id}" style="background-color: ${secondaryColorCode};">
                    <div class="preview-header-label-div" id="preview-header-label-div-${id}" style="font-family: '${font}' !important;">
                        <label for="preview-header-label-${id}" id="preview-header-label-${id}" style="color: white; display: block">
                            ${donationTitle}
                        </label>
                        <label id="preview-header-flocaldId-${id}" style="display: none">${flocalId}</label>
                    </div>
                    ${
showDonationFormOnly!=1?`<span class="close-wp" id="${id}">&times;</span>`:''
}
                </div>`
}
               ${background_preview_modal}
               <!-- Progress bar with related items START-->

               <div id = "progress-bar-modal" style="display: ${
showDonationFormOnly==1?';':'none;'
}${
showDonationFormOnly==1&&data['show_donation_details']==false&&data['amount_target']==0?'height:0px !important;':''
}">
                   <div class="apreview-amount-raised" id="apreview-amount-raised" style="align-items: baseline; height: ${
showRaisedAmount==0?'0px':'40px'
}">
                   ${
data['show_donation_details']==true?data.hasOwnProperty('donation')&&data.hasOwnProperty('amount_target')?`
                   ${
showRaisedAmount==3?`
                       <div class="apreview-collected-amount-div" id="apreview-collected-amount-div" style="font-family: '${font}' !important;">
                           <label for="apreview-collected-amount" style="display: block; font-size: 32px"><span class="currency-symbol">${
currency_symbol_object[id]
}</span> ${formatCurrency(data['donation']['amount'],language_code)}</label>
                       </div>
                   `:''
}
                   ${
showProgressBar==2&&data['amount_target']!=0?`
                       <div class="apreview-target-amount-div" id="apreview-target-amount-div" style="font-family: '${font}' !important; font-weight: 300; display: flex">
                           ${
showProgressBar==2&&showRaisedAmount==3?`
                               <div class="apreview-target-amount-div-label-1" id="apreview-target-amount-div-label-1">
                                   <label id="apreview-target-amount-of" style="font-family: '${font}' !important;color: gray; display: block; font-size: 22px"> ${_e('of',language_code)}
                                   </label>
                               </div>
                           `:''
}
                           <div class="apreview-target-amount-div-label-2" id="apreview-target-amount-div-label-2">
                               <label for="apreview-target-amount" style="color: gray; margin-left: 10px; display: block; font-size: 22px"> <span class="currency-symbol">${
currency_symbol_object[id]
}</span> ${formatCurrency(data['amount_target'],language_code)}</label>
                           </div>
                       </div>
                   `:''
}
               `:`
               <h1>No Data Found</h1>
               `:data.hasOwnProperty('donation')&&data.hasOwnProperty('amount_target')?`
      
                      ${
showProgressBar==2&&data['amount_target']!=0?`
                          <div class="apreview-target-amount-div" id="apreview-target-amount-div" style="font-family: '${font}' !important; font-weight: 300; display: flex">
                              <div class="apreview-target-amount-div-label-2" id="apreview-target-amount-div-label-2">
                                  <label for="apreview-target-amount" style="color:#000000de; font-weight: 400; display: block; font-size: 24px"> <span class="currency-symbol">${
currency_symbol_object[id]
}</span> ${formatCurrency(data['amount_target'],language_code)}</label>
                              </div>
                          </div>
                      `:''
}
                  `:`
                  <h1>No Data Found</h1>
              `
}
                   </div>

                   <div class="apreview-progress-bar" id="apreview-progress-bar">
                   ${
data.hasOwnProperty('amount_target')?`
                       ${
showProgressBar==2&&data['amount_target']!=0?`
						<div class="apreview-full-bar" id="apreview-full-bar">
							<div id="apreview-raised-bar" class="apreview-raised-bar" style="width: ${
data['show_donation_details']==false?0:progress_bar_width
}%; background-color:${primaryColorCode} !important;">
							</div>
						</div>
                       `:''
}
                       <div class="apreview-progress-info" id="apreview-progress-info" style="font-family: '${font}' !important;">
                           ${
showProgressBar==2&&data['amount_target']!=0?`
                               <div class="apreview-achieved-percent" id="apreview-achieved-percent" >
                                   <label style="font-family: '${font}' !important;font-size: 14px; font-weight: 300; color: gray; display: ${
data['show_donation_details']==false?'none':'block'
}">
								   ${progress_bar}%${_e('funded',language_code)}</label>
                               </div>
                           `:''
}
                           ${
showEndDate==4?`
                               <div class="apreview-days-left" id="apreview-days-left" style="font-family: '${font}' !important;">
                                   <label style="display: block; font-size: 14px; font-weight: 300; color: gray">
                                       ${
data['is_opened']&&elapsed!='closed'?elapsed:''
}
                                       ${
elapsed!=''?data['is_opened']&&elapsed!='closed'?'day(s) left':_e('closed',language_code):''
}
                                   </label>
                               </div>
                           `:''
}
                       </div>
                   `:`
                   <h1>No Data Found</h1>
                   `
}
                   </div>
               </div>
               <!-- Progress bar with related items END-->

                <div class="preview-period-intervals" id="preview-period-intervals-${id}">
                    ${
oneTimeCheck==1?`
                    <div class="preview-intervals-onetime" id="preview-intervals-onetime-${id}" style="padding-top: 20px;">
                        <input type="radio" value="once" name="period-intervals-${id}" id="onetime-radio-${id}" onchange="changeOnetimeBar('${secondaryColorCode}', '${id}')" ${
selectInterval==1?'checked':''
} 
                        onclick="showInterval(0, ${tip_enabled}, '${id}', '${shortcode}','${stringToBinary(donation_options)}', '${font}')" />
                        <label for="onetime-radio-${id}" style="font-family: '${font}' !important;display: block; font-size: 14px;">${_e('',language_code)}</label>
                    </div>
                    `:''
}

                    ${
monthlyCheck==2?`
                    <div class="preview-intervals-monthly" id="preview-intervals-monthly-${id}" style="padding-top: 20px;">
                        <input type="radio" value="monthly" name="period-intervals-${id}" id="monthly-radio-${id}" onchange="changeMonthlyBar('${secondaryColorCode}', '${id}')" ${
selectInterval==2?'checked':''
} onclick="showInterval(1, ${tip_enabled}, '${id}', '${shortcode}','${stringToBinary(donation_options_monthly)}', '${font}')" />
                        <label for="monthly-radio-${id}" style="font-family: '${font}' !important; font-size: 14px; display: block">${_e('Monthly',language_code)}</label>
                    </div>
                    `:''
}

                    ${
yearlyCheck==3?`
                    <div class="preview-intervals-yearly" id="preview-intervals-yearly-${id}" style="padding-top: 20px;">
                        <input type="radio" value="yearly" name="period-intervals-${id}" id="yearly-radio-${id}" onchange="changeYearlyBar('${secondaryColorCode}', '${id}')" ${
selectInterval==3?'checked':''
} onclick="showInterval(2, ${tip_enabled}, '${id}', '${shortcode}','${stringToBinary(donation_options_yearly)}', '${font}')"  />
                        <label for="yearly-radio-${id}" style="font-family: '${font}' !important; font-size: 14px; display: block">${_e('Yearly',language_code)}</label>
                    </div>
                    `:''
}
                </div>

                <div class="preview-intervals-divider" id="preview-intervals-divider-${id}">
                    ${
oneTimeCheck==1?`
                    <div class="preview-intervals-onetime-bar" id="preview-intervals-onetime-bar-${id}" style="background-color: ${
selectInterval==1?secondaryColorCode:''
}">
                    </div>
                    `:''
}
                    
                    ${
monthlyCheck==2?`
                    <div class="preview-intervals-monthly-bar" id="preview-intervals-monthly-bar-${id}" style="background-color: ${
selectInterval==2?secondaryColorCode:''
}">
                    </div>
                    `:''
}
                    
                    ${
yearlyCheck==3?`
                    <div class="preview-intervals-yearly-bar" id="preview-intervals-yearly-bar-${id}" style="background-color: ${
selectInterval==3?secondaryColorCode:''
}">
                    </div>
                `:''
}
                </div>

                <div class="preview-select-amount-s" id="preview-select-amount-s-${id}">
                         <div id="currency-options" style="padding-top: 0px; display:none">
                            <label for="currency-select" style="font-family: '${font}' !important;">${_e('Currency',language_code)} 
                                <div class="info-img-container">
                                    <img src="https://whydonate.com/cdn-cgi/imagedelivery/_0vgnXOEIHPwLg2E52a7gg/shared/infoWarnBlack/public">
                                    <div class="info-img-hover-box">
                                        <p style="font-family: '${font}' !important;">${_e('Select the currency in which you want to make the donation. If it is different from the default currency, the amount will be exchanged automatically.',language_code)}</p>
                                    </div>
                                </div>
                            </label>

                            <!-- Select dropdown with options -->
                            <select id="currency-select-${id}" class="whydonate-currecy-selected" name="currency-multi" onChange="currency_value_updater('${id}', '${tip_enabled}', '${font}')">
                            </select>
                        </div>
                       <div id="interval-container-${id}">
                           <div id = "onetime_section">${selected_donation_options}</div>
                       </div>
                    
                        ${
otherChecked==1?`
                        <div class="other-amount-div" id="other-amount-div-${id}" style="display: ${
selectInterval==5?'block':'none'
}" >
                            <span id="other-amount-div-currency-symbol-${id}" style="text-align: center; width: 15px; padding-left: 14px; height: 100%">${
currency_symbol_object[id]
} </span>
                            <input type="text" name="amount" class="other-amount-input-number" style="font-family: '${font}' !important;" placeholder="00,00" id="other-amount-number-${id}" value="0" style="font-family: '${font}' !important; !important" onkeyup="handleOtherAmountInput(event.target.value, '${id}', '${language_code}')" onkeydown="isRestrictKeysForOtherAmount(event)" oninput="amountInputSpinner(event.target.value, '${id}')" min="5">
                        </div>
                        <label id="show-other-amount-error-msg-${id}" style="margin-top: 5px; font-size: 10px; color: red; visibility: hidden"></label>

                        `:''
}
                        <div class="preview-user-info-div" id="review-user-info-div-${id}" style="margin-top: 0px; margin-bottom: 0px;">
                        <div class="preview-user-info-firstname-s" id="preview-user-info-firstname-${id}" style="height:0px !important; margin-top:0px; margin-bottom:0px">
                            <!-- <p>First Name</p> -->
                            <input type="text" id="firstname-${id}" name="firstName-${id}" placeholder="${_e('First Name',language_code)}" value="Nombre" style="display: none; visibility:hidden; max-height: 0; background-color: white; width: 100%; padding-left:16px !important; height: 0%; font-family: '${font}' !important; font-size: 0px; border-radius: 0px; border: 0px solid !important; margin-top:0px; margin-bottom:0px">
                        </div>
                        <label id="show-firstname-error-msg-${id}" style="display: none; font-size: 10px; color: red">${_e('Must be between',language_code)} 1 ${_e('and',language_code)} 30 ${_e('characters',language_code)}.</label>
                        <div class="preview-user-info-lastname-s" id="preview-user-info-lastname-${id}" style="height:0px !important; margin-top:0px; margin-bottom:0px">
                            <!-- <p>Last Name</p> -->
                            <input type="text" id="lastname-${id}" name="lastName-${id}" placeholder="${_e('Last Name',language_code)}" value="Apellidos" style="display: none; visibility:hidden; max-height: 0; background-color: white; width: 100%; padding-left:16px !important;height: 0%; font-family: '${font}' !important; font-size: 0px; border-radius: 0px; border: 0px solid !important; margin-top:0px; margin-bottom:0px">
                        </div>
                        <label id="show-lastname-error-msg-${id}" style="display: none; font-size: 10px; color: red">${_e('Must be between',language_code)} 1 ${_e('and',language_code)} 30 ${_e('characters',language_code)}.</label>
                        <div class="preview-user-info-email-s" id="preview-user-info-email-${id}" style="height:0px !important; margin-top:0px; margin-bottom:0px">
                            <!-- <p>Email</p> -->
                            <input type="text" id="email-${id}" name="email-${id}" placeholder="${_e('Email Address',language_code)}" value="donacion@email.com" style="display: none; visibility:hidden; max-height: 0; background-color: white; width: 100%; padding-left:16px !important;height: 0%; font-family: '${font}' !important; font-size: 0px; border-radius: 0px; border: 0px solid !important; margin-top:0px; margin-bottom:0px">
                        </div>
                        <label id="show-email-error-msg-${id}" style="display: none; font-size: 10px; color: red">${_e('Please enter a valid email.',language_code)}</label>
                    </div>

                    <!-- tipbox -->
                    ${
tip_enabled?`<div id="tip-box-${id}" class="tip-box" style="height: 0px !important; display: none; font-family: ${font} !important; visibility:hidden" data-id="${id}" data-color="${secondaryColorCode}" data-lang="${language_code}"></div>`:''
}

                    <div class="preview-user-donate-btn-div" id="preview-user-donate-btn-div-${id}" style="display: flex; flex-direction: column; margin-top: 5px">
                    
                   <div class="checkbox-if-anonymous-s" style="display:none !important">
                        <div class="checkbox-if-anonymous-s-checkbox" id="checkbox-if-anonymous-s-checkbox">
                            <input type="checkbox" id="is-anonymous-${id}" class="custom-checkbox default-checkbox-visually-hidden">
                            <label for="is-anonymous-${id}" class="custom-checkbox-label"></label>                        
                        </div>
                        <div class="checkbox-if-anonymous-s-div-label" id="checkbox-if-anonymous-s-div-label">
                            <label for="is-anonymous-${id}" style="display: block; margin-top: 3px; margin-left: 10px; font-size: 16px; font-weight: 400; font-family: '${font}' !important;">${_e('Donate',language_code)}
                                <strong> ${_e('Anonymous',language_code)} </strong></label>
                        </div>
                    </div>
                    
                    <div class="info-img-container preview-donate-btn-div" id="preview-donate-btn-div" style="font-family: '${font}' !important;">
                        <button data-tooltip="Hovered content" class="preview-donate-btn" id="preview-donate-btn-${id}" style="margin-top: 5px; font-family: '${font}' !important; background-color: ${
data['is_opened']==false||elapsed=='closed'?'#aaaaaa':secondaryColorCode
}; border-radius: ${buttonRadius}px" ${
data['is_opened']==false||elapsed=='closed'?'disabled':''
} onclick="submitDonation(event, '${fundraising_local_id}', '${fundraiserTitle}', '${id}', '${successUrl}', '${failureUrl}', ${tip_enabled})"><span id="donation-loader-text-${id}">${_e('Donate',language_code)}</span></button>
        ${
data.hasOwnProperty('is_opened')?`
        ${
data['is_opened']==false||elapsed=='closed'?`
               <div class="info-img-hover-box" style="font-family: '${font}' !important;">
               <p style="font-family: '${font}' !important;">${_e('Fundraiser is either closed by time or owner closed it!',language_code)}</p>
           </div>
        `:''
}
    `:''
}
                    </div>
                    <div style="display: flex; width: 100%; height: 20px; justify-content: flex-end; margin-top: 20px; margin-bottom: 10px; align-items: center">
                        <label style="font-family: '${font}' !important; color:#9E9E9E; font-size: 12px; margin-top: 5px; margin-right: 5px; font-weight: 500">${
_e('Powered by',language_code)+' '
}</label>
                        <a href="https://whydonate.com" target="_blank">
                            <img src="https://whydonate.com/cdn-cgi/imagedelivery/_0vgnXOEIHPwLg2E52a7gg/shared/Variant3/public" style="height: 15px;
                            margin-top: 4px;"/>
                        </a>
                    </div>
                </div>
                
            </div>

        </div>

    </div>`;const donation_window_modal=`
 
     <!-- The Modal -->
     <div id="donate-window-modal-${id}" class="donate-window-modal" style="z-index: ${
showDonationFormOnly==1?'0;':'900;'
} display: ${showDonationFormOnly==1?'flex;':'none;'} position: ${
showDonationFormOnly==1?'static;':'fixed;'
} background-color: ${
showDonationFormOnly==1?'transparent;':'rgb(0,0,0,0.4);'
} padding-top: ${showDonationFormOnly==1?'0px;':'10px;'}">
 
        ${donation_window_modal_content}
 
     </div>`;let media_rules=source!='edit_preivew'?`<style>
        @media screen and (max-width: 600px) {
            .donate-window-modal {
                padding: 0 !important;
            }
            .preview-card {
                min-width: 350px !important;
                margin-top: 0 !important;
                height: 100vh !important;
            }
        
            .donate-window-content {
                min-width: 350px !important;
                padding: 0 !important;
            }
        }
        
        @media screen and (max-width: 600px) {
            .preview {
                width: 100%; /* The width is 100%, when the viewport is 800px or smaller */
                margin: 0 auto !important;
                max-width: 100% !important;
            }
        }
        
        @media screen and (max-width: 600px) {
            .appearance-preview {
                width: 100%; /* The width is 100%, when the viewport is 800px or smaller */
                margin-left: 0px;
            }
        }
        
        @media screen and (max-width: 600px) {
            .appearance-preview-card-shortcode {
                width: 100%; /* The width is 100%, when the viewport is 800px or smaller */
                margin-left: 0px;
            }
        }
    </style>`:'';let htmlCode=media_rules+donation_box+donation_window_modal;if(source=='edit_preivew'){let existingDiv=document.createElement('div');existingDiv.id=`widget-here-${id}`;existingDiv.style.display='none';document.body.appendChild(existingDiv);var tempContainer=document.createElement('div');tempContainer.innerHTML=htmlCode;var newElement=tempContainer.firstChild;existingDiv.appendChild(newElement);}else{if(source=='share_mode'){if(document.getElementById(`share-widget-${shortcode}`)!=null){if(showDonationFormOnly==1){document.getElementById(`share-widget-${shortcode}`).innerHTML=donation_window_modal_content;}else{document.getElementById(`share-widget-${shortcode}`).innerHTML=htmlCode;}}}else{if(document.getElementById(`widget-here-${shortcode}`)!=null){if(showDonationFormOnly==1){document.getElementById(`widget-here-${shortcode}`).innerHTML=donation_window_modal_content;}else{document.getElementById(`widget-here-${shortcode}`).innerHTML=htmlCode;}}}}
var currencySelectElement=document.getElementById(`currency-select-${id}`);let currencies_array=await get_all_currencies();let currencyData=currencies_array?.data?.list_of_currencies;if(currencySelectElement){for(var i=0;i<currencies_array?.data?.list_of_currencies.length;i++){var option=document.createElement('option');option.value=currencies_array?.data?.list_of_currencies[i].currency;option.text=currencyData[i].symbol+' '+currencyData[i].currency.toUpperCase();currencySelectElement.appendChild(option);if(currencyData[i].currency===currency_code_object[id]){option.setAttribute('selected','selected');}}}
let donationBoxDiv=document.getElementById(`donate-window-modal-${id}`);if(source=='share_mode'){fundraiser_donation_values_object[id]=await fundraiser_donation_values_share_api(id,currency_code_object[id]);}else{fundraiser_donation_values_object[id]=await fundraiser_donation_values_api(id);}
var tipBoxArray=document.getElementsByClassName('tip-box');if(tipBoxArray.length>0){for(var i=0;i<tipBoxArray.length;i++){let tipBox=tipBoxArray[i];let id=tipBox.dataset.id;let languageCode=tipBox.dataset.lang;lang=languageCode.split('_')[0];color=tipBox.dataset.color;createTipboxDropDown(id,'#9E9E9E',font);}}
let urlAddress=window.location.href;if(urlAddress.includes('&orderId=')){let urlAddressArr=urlAddress.split('&orderId=');let orderId=urlAddressArr[1].split('&')[0];getDonorStatus(orderId,success_url,fail_url);let actualUrlArr=urlAddress.split('?donorId=');let donorId=urlAddressArr[1].split('&')[0];var donorInfo=localStorage.getItem('donor_info');donorInfo=JSON.parse(donorInfo);donorInfo['orderId']=urlAddressArr[1].split('&client=')[0];window.history.replaceState({},document.title,actualUrlArr[0]);var url=`${wdplugin_donation_worker_url}/donation/order/status/?order_id=${orderId}`;var params='action=check_order_status&order_id='+urlAddressArr[1].split('&')[0];fetch(url+'?'+params).then(function(response){return response.json();}).then(function(data){if(data['status']=='canceled'||data['status']=='open'){window.location.replace(fail_url);}else if(data['status']=='paid'){window.location.replace(success_url);}else{}}).catch(function(error){}).finally(function(){});}
else{let domainPart=urlAddress.split('//');let domain=domainPart[1].split('/')[0];let payload={url:domain,product:'plugin',};await checkInstallations(payload);}
if(source=='edit_preivew'){return{donation_box:donation_box,donation_window_modal:donationBoxDiv.innerHTML,};}}
var whydonateSlugs={};var lang='';function showDonateWindow(id,tip_enabled,colorCode,languageCode){document.getElementsByTagName('body')[0].style.overflow='hidden';document.getElementsByTagName('body')[0].style.height='100vh';lang=languageCode.split('_')[0];var modal=document.getElementById('donate-window-modal-'+id);var btn=document.getElementById('apreview-donate-btn-'+id);var span=document.getElementById(''+id);if(modal.style.display=='flex'){modal.style.display='none';}else{modal.style.display='flex';}
span.onclick=function(){document.getElementsByTagName('body')[0].style.overflow='';document.getElementsByTagName('body')[0].style.height='initial';modal.style.display='none';};window.onclick=function(event){if(event.target==modal){document.getElementsByTagName('body')[0].style.overflow='';document.getElementsByTagName('body')[0].style.height='initial';modal.style.display='none';}};}
async function loadFont(fontName){var link=document.createElement('link');link.rel='stylesheet';link.href='https://fonts.googleapis.com/css?family='+encodeURIComponent(fontName);document.head.appendChild(link);}


function createTipboxDropDown(id,color,font){let fundraiser_donation_values_response=fundraiser_donation_values_object[id];let lang=document.getElementById(`language-code-${id}`).innerHTML;var cardDiv=document.getElementById('preview-'+id);cardDiv.style.height='910px';document.getElementById('preview-card-'+id).style.height='845px';var tipBox=document.getElementById('tip-box-'+id);tipBox.className='tip-box';tipBox.style.display='block';tipBox.style.height='auto';tipBox.style.marginTop='0px';tipBox.style.padding='0px';tipBox.style.paddingLeft='0px';tipBox.style.backgroundColor=color+'10';var para1=document.createElement('p');para1.style.fontSize='12px';para1.style.fontWeight='400';para1.style.color='black';para1.textContent=_e('',lang);if(!tipBox.innerHTML){tipBox.appendChild(para1);}
var selectPercentileDiv=document.createElement('div');selectPercentileDiv.id='whydonate-select-percentile-div'+id;selectPercentileDiv.style.display='none';selectPercentileDiv.style.justifyContent='space-around';var para2=document.createElement('p');para2.style.fontSize='12px';para2.style.fontWeight='400';para2.style.color='black';para2.style.marginTop='6px';para2.textContent=_e('Thank you for including a tip of',lang)+' ';selectPercentileDiv.appendChild(para2);var selectElement=document.createElement('select');selectElement.classList.add('whydonate-currecy-selected');var selectedValue=getSelectedValue(id);let options;if(selectedValue>=10)
{options=[{text:'0% ('+
formatCurrency((selectedValue*0).toFixed(2),lang)+
')',value:(selectedValue*0).toFixed(2),},{text:'5% ('+
formatCurrency((selectedValue*0.05).toFixed(2),lang)+
')',value:(selectedValue*0.05).toFixed(2),},{text:'10% ('+
formatCurrency((selectedValue*0.1).toFixed(2),lang)+
')',value:(selectedValue*0.1).toFixed(2),},{text:_e('Other',lang),value:'Amount'},];}else{options=[{text:currency_symbol_object[id]+
' '+
formatCurrency(fundraiser_donation_values_response.data.tip_amount.tip_amount_fixed.third_option,lang),value:fundraiser_donation_values_response.data.tip_amount.tip_amount_fixed.third_option,},{text:currency_symbol_object[id]+
' '+
formatCurrency(fundraiser_donation_values_response.data.tip_amount.tip_amount_fixed.first_option,lang),value:fundraiser_donation_values_response.data.tip_amount.tip_amount_fixed.first_option,},{text:currency_symbol_object[id]+
' '+
formatCurrency(fundraiser_donation_values_response.data.tip_amount.tip_amount_fixed.second_option,lang),value:fundraiser_donation_values_response.data.tip_amount.tip_amount_fixed.second_option,},{text:_e('Other',lang),value:'Amount'},];}
options.forEach(function(optionData){var option=document.createElement('option');option.text=optionData.text;option.value=optionData.value;selectElement.appendChild(option);});selectElement.setAttribute('id',`select-dropdown-${id}`);selectElement.setAttribute('onchange',`handleTipDropdownOnChange(${id}, this.value)`);selectPercentileDiv.appendChild(selectElement);var inputTipDiv=document.createElement('div');inputTipDiv.id='input-tip-div'+id;inputTipDiv.style.display='none';inputTipDiv.style.justifyContent='flex-end';inputTipDiv.style.marginTop='10px';var inputTipSpan=document.createElement('div');var inputTipTextBox=document.createElement('input');inputTipSpan.innerHTML=inputTipTextBox.outerHTML;inputTipSpan.innerHTML=`<div class="tip-box-span" style="font-family: ${font} !important;"><span id="tip-box-span-curr-symbol-${id}" class="tip-box-span-curr-symbol">${currency_symbol_object[id]}</span>`+
' '+
'<input type="text"'+
'id="input-tip'+
id+
'"'+
`onkeyup = "calculateTotalAmountDropDown('${id}', 'Amount')"`+
` value=${fundraiser_donation_values_response.data.tip_amount.default_values.tip_amount_fixed_default}  name="currency" value="0.00" style="width: 110px; height: 25px; border-radius: 3px !important; border-color: transparent !important; font-family: '${font}' !important; font-size: 15px; text-align: right; background: white !important; min-height: auto !important"></div>`+
`<label id="show-other-tip-error-msg-${id}" style="font-size: 10px; color: red; visibility: hidden; display:none">${_e('The minimum amount is',lang)} ${
fundraiser_donation_values_response?.data?.symbol+
fundraiser_donation_values_response?.data?.customdonationconfiguration?.min_donation_amount
}  </br>${_e('and',lang)} ${_e('the maximum amount is',lang)}</br>${
fundraiser_donation_values_response?.data?.symbol+
fundraiser_donation_values_response?.data?.customdonationconfiguration.max_donation_amount
} </label>`;inputTipDiv.appendChild(inputTipSpan);var selectPercentileDivElement=document.getElementById('whydonate-select-percentile-div'+id);if(!selectPercentileDivElement){tipBox.appendChild(selectPercentileDiv);}
var inputTipDivElement=document.getElementById('input-tip-div'+id);if(!inputTipDivElement){tipBox.appendChild(inputTipDiv);}
var totalChargeDiv=document.createElement('div');totalChargeDiv.id='whydonate-total-charge-div'+id;totalChargeDiv.style.height='0px';totalChargeDiv.style.marginTop='none';totalChargeDiv.style.marginTop='0px';var totalChargeLabel=document.createElement('label');totalChargeLabel.id='total-charge-label'+id;totalChargeLabel.style.fontFamily=font;totalChargeLabel.style.fontSize='0px';totalChargeLabel.innerHTML=_e('Total Charge:',lang)+' '+currency_symbol_object[id]+' ';totalChargeLabel.style.color='black';totalChargeLabel.style.fontWeight='0';totalChargeLabel.style.width='0%';var totalChargeDivElement=document.getElementById('whydonate-total-charge-div'+id);if(!totalChargeDivElement){totalChargeDiv.appendChild(totalChargeLabel);tipBox.appendChild(totalChargeDiv);}

let dropDownValue=document.getElementById(`select-dropdown-${id}`).value;calculateTotalAmountDropDown(id,dropDownValue);document.getElementById(`input-tip${id}`).oninput=function(){removeNonIntegerChars(this);};}
function removeNonIntegerChars(inputElement){inputElement.value=inputElement.value.replace(/\D/g,'');}


function handleTipDropdownNew(id){let options=[];let fundraiser_donation_values_response=fundraiser_donation_values_object[id];let selectedValue=getSelectedValue(id);if(selectedValue>=10){options=[{text:'0% ('+
formatCurrency((selectedValue*0).toFixed(2),lang)+
')',value:(selectedValue*0.0).toFixed(2),},{text:'15% ('+
formatCurrency((selectedValue*0).toFixed(2),lang)+
')',value:(selectedValue*0.0).toFixed(2),},{text:'10% ('+
formatCurrency((selectedValue*0).toFixed(2),lang)+
')',value:(selectedValue*0.0).toFixed(2),},{text:_e('Other',lang),value:'Amount'},];}else{options=[{text:currency_symbol_object[id]+
' '+
formatCurrency(fundraiser_donation_values_response.data.tip_amount.tip_amount_fixed.third_option,lang),value:fundraiser_donation_values_response.data.tip_amount.tip_amount_fixed.third_option,},{text:currency_symbol_object[id]+
' '+
formatCurrency(fundraiser_donation_values_response.data.tip_amount.tip_amount_fixed.first_option,lang),value:fundraiser_donation_values_response.data.tip_amount.tip_amount_fixed.first_option,},{text:currency_symbol_object[id]+
' '+
formatCurrency(fundraiser_donation_values_response.data.tip_amount.tip_amount_fixed.second_option,lang),value:fundraiser_donation_values_response.data.tip_amount.tip_amount_fixed.second_option,},{text:_e('Other',lang),value:'Amount'},];}



let dropDownValue=document.getElementById(`select-dropdown-${id}`).value;var selectElement=document.getElementById(`select-dropdown-${id}`);selectElement.innerHTML='';options.forEach(function(option){var optionElement=document.createElement('option');optionElement.text=option.text;optionElement.value=option.value;selectElement.appendChild(optionElement);});let otherRadio=document.getElementById('select-amount-other-'+id);let openRadio=document.getElementById('select-open-amount-'+id);let inputTipDivEle=document.getElementById(`input-tip-div${id}`);if(otherRadio&&otherRadio.checked&&dropDownValue=='Amount'){for(var i=0;i<selectElement.options.length;i++){if(selectElement.options[i].value==='Amount'){selectElement.options[i].selected=true;break;}}}else if(openRadio&&openRadio.checked&&dropDownValue=='Amount'){for(var i=0;i<selectElement.options.length;i++){if(selectElement.options[i].value==='Amount'){selectElement.options[i].selected=true;break;}}}else{inputTipDivEle.style.display='none';}
var tip_box_input=document.getElementById(`input-tip${id}`);tip_box_input.value=fundraiser_donation_values_response.data.tip_amount.default_values.tip_amount_fixed_default;if(dropDownValue=='Amount'&&selectedValue>=10){calculateTotalAmountDropDown(id,selectedValue*0.0);}else if(dropDownValue=='Amount'&&selectedValue<10){calculateTotalAmountDropDown(id,fundraiser_donation_values_response.data.tip_amount.tip_amount_fixed.third_option);}else{calculateTotalAmountDropDown(id,dropDownValue);}}
function handleTipDropdownOnChange(id,value){let inputTipDivEle=document.getElementById(`input-tip-div${id}`);if(value!='Amount'){inputTipDivEle.style.display='none';}
otherTipAmountHandler(id);calculateTotalAmountDropDown(id,value);}
function lightenColor(color,percent){var num=parseInt(color.replace('#',''),16),amt=Math.round(2.55*percent),R=(num>>16)+amt,B=((num>>8)&0x00ff)+amt,G=(num&0x0000ff)+amt;return('#'+
(0x1000000+
(R<255?(R<1?0:R):255)*0x10000+
(B<255?(B<1?0:B):255)*0x100+
(G<255?(G<1?0:G):255)).toString(16).slice(1));}
function getSelectedValue(id){var firstRadio=document.getElementById('select-amount-first-'+id);var secondRadio=document.getElementById('select-amount-second-'+id);var thirdRadio=document.getElementById('select-amount-third-'+id);var forthRadio=document.getElementById('select-amount-forth-'+id);var otherRadio=document.getElementById('select-amount-other-'+id);var openRadio=document.getElementById('select-open-amount-'+id);var selectedValue=0;if(firstRadio&&firstRadio.checked){selectedValue=firstRadio.value;}
if(secondRadio&&secondRadio.checked){selectedValue=secondRadio.value;}
if(thirdRadio&&thirdRadio.checked){selectedValue=thirdRadio.value;}
if(forthRadio&&forthRadio.checked){selectedValue=forthRadio.value;}
if(otherRadio&&otherRadio.checked){var otherAmountInputBox=document.getElementById('other-amount-number-'+id);if(otherAmountInputBox.value!=''&&typeof parseFloat(otherAmountInputBox.value)=='number'){var amount=otherAmountInputBox.value;selectedValue=parseFloat(amount.replace(',','.'));}else{selectedValue=0.0;}}
if(otherRadio&&otherRadio.checked){var otherAmountInputBox=document.getElementById('other-amount-number-'+id);if(otherAmountInputBox.value!=''&&typeof parseFloat(otherAmountInputBox.value)=='number'){var amount=otherAmountInputBox.value;selectedValue=parseFloat(amount.replace(',','.'));}else{selectedValue=0.0;}}
if(openRadio&&openRadio.checked){var otherAmountInputBox=document.getElementById('open-amount-number-'+id);if(otherAmountInputBox.value!=''&&typeof parseFloat(otherAmountInputBox.value)=='number'){var amount=otherAmountInputBox.value;selectedValue=parseFloat(amount.replace(',','.'));}else{selectedValue=0.0;}}
return selectedValue;}
function calculateTotalAmountDropDown(slug,dropDownValue){let fundraiser_donation_values_response=fundraiser_donation_values_object[slug];var selectedAmount=parseFloat(getSelectedValue(slug));var selectItem=dropDownValue;let lang=document.getElementById(`language-code-${slug}`).innerHTML;var tipAmount='';if(selectItem=='Amount'){tipAmount=parseFloat(document.getElementById(`input-tip${slug}`).value);}else{tipAmount=parseFloat(document.getElementById(`select-dropdown-${slug}`).value);}
if(selectedAmount==0){tipAmount=1.0;}
if(isNaN(tipAmount)){tipAmount=0.0;}
var totalAmount=selectedAmount+tipAmount;var tipLabel=document.getElementById('total-charge-label'+slug);totalAmount=(Math.round(totalAmount*100)/100).toFixed(2);tipLabel.innerHTML='';let totalChargeLabel=document.getElementById(`total-charge-label${slug}`);totalChargeLabel.innerHTML=_e('Total Charge:',lang)+
' '+
currency_symbol_object[slug]+
' '+
formatCurrency(totalAmount,lang);var tipBox=document.getElementById('tip-box-'+slug);let tipMinMaxError=document.getElementById(`show-other-tip-error-msg-${slug}`);tipMinMaxError.style.visibility='hidden';tipMinMaxError.style.display='none';var minimumAllowed=fundraiser_donation_values_response.data.customdonationconfiguration.min_donation_amount;var maximumAllowed=fundraiser_donation_values_response.data.customdonationconfiguration.max_donation_amount;tipMinMaxError.style.visibility='hidden';tipMinMaxError.style.display='none';if(isNaN(totalAmount)||parseFloat(totalAmount)<parseFloat(minimumAllowed)||parseFloat(totalAmount)>parseFloat(maximumAllowed)){tipMinMaxError.style.visibility='visible';tipMinMaxError.style.display='block';}
if(tipBox.style.display=='none'){tipAmount=0.0;}
return tipAmount;}
async function otherTipAmountHandler(slug){var selectedValue=document.getElementById(`select-dropdown-${slug}`).value;let fundraiser_donation_values_response=fundraiser_donation_values_object[slug];if(selectedValue=='Amount'||selectedValue=='Bedrag'||selectedValue=='Menge'||selectedValue=='Cantidat'){var inputTipDiv=document.getElementById('input-tip-div'+slug);inputTipDiv.style.display='flex';var inputTipBox=document.getElementById('input-tip'+slug);inputTipBox.value=fundraiser_donation_values_response.data.tip_amount.default_values.tip_amount_fixed_default;var otherRadio=document.getElementById('select-amount-other-'+slug);var otherRadioText=document.getElementById('select-amount-other-text-'+slug);if(otherRadio&&otherRadio.checked){var otherAmountInputBox=document.getElementById('other-amount-number-'+slug);if(parseInt(otherAmountInputBox.value)>9){inputTipBox.value=(otherAmountInputBox.value*0.1).toFixed(2);inputTipBox.value=(Math.round(inputTipBox.value*100)/100).toFixed(2);}else{inputTipBox.value=(Math.round(inputTipBox.value*100)/100).toFixed(2);}}
if(otherRadioText&&otherRadioText.checked){var otherAmountInputBox=document.getElementById('other-amount-number-'+slug);if(parseInt(otherAmountInputBox.value)>9){inputTipBox.value=(otherAmountInputBox.value*0.1).toFixed(2);inputTipBox.value=(Math.round(inputTipBox.value*100)/100).toFixed(2);}else{inputTipBox.value=(Math.round(inputTipBox.value*100)/100).toFixed(2);}}}}
function closeAllSelect(elmnt){var x,y,i,arrNo=[];x=document.getElementsByClassName('whydonate--select-items');y=document.getElementsByClassName('whydonate--select-selected');for(i=0;i<y.length;i++){if(elmnt==y[i]){arrNo.push(i);}else{y[i].classList.remove('select-arrow-active');}}
for(i=0;i<x.length;i++){if(arrNo.indexOf(i)){x[i].classList.add('select-hide');}}}
function handleOtherAmountInput(value,slug){let fundraiser_donation_values_response=fundraiser_donation_values_object[slug];let language_code=document.getElementById(`language-code-${slug}`).innerHTML;let amountError=document.getElementById('show-other-amount-error-msg-'+slug);amountError.style.display='block';amountError.style.visibility='hidden';if(value==''||parseInt(value)<parseInt(fundraiser_donation_values_response.data.customdonationconfiguration.min_donation_amount)){amountError.style.visibility='visible';amountError.innerHTML=_e('Minimum amount',language_code)+
' '+
fundraiser_donation_values_response.data.symbol+
' '+
fundraiser_donation_values_response.data.customdonationconfiguration.min_donation_amount;}else if(value==''||parseInt(value)>parseInt(fundraiser_donation_values_response.data.customdonationconfiguration.max_donation_amount)){amountError.style.visibility='visible';amountError.innerHTML=_e('Maximum amount',language_code)+
' '+
fundraiser_donation_values_response.data.symbol+
' '+
fundraiser_donation_values_response.data.customdonationconfiguration.max_donation_amount;}else{if(value.includes(currency_symbol_object[slug])){value=value.split(currency_symbol_object[slug]+' ')[1];}
if(!isNaN(value)){var tipBox=document.getElementById('tip-box-'+slug);var inputVal=document.getElementById('other-amount-number-'+slug).value;var intval=parseInt(inputVal);if(tipBox&&intval>=5){var tipInputDiv=document.getElementById('input-tip-div'+slug);handleTipDropdownNew(slug);calculateTotalAmountDropDown(slug);}}else{document.getElementById('other-amount-number-'+slug).value='';}}}
function handleOpenAmountInput(value,slug,language_code){let fundraiser_donation_values_response=fundraiser_donation_values_object[slug];let amountError=document.getElementById('show-other-amount-error-msg-'+slug);amountError.style.display='block';amountError.style.visibility='hidden';if(value==''||parseInt(value)<parseInt(fundraiser_donation_values_response.data.customdonationconfiguration.min_donation_amount)){amountError.style.visibility='visible';amountError.innerHTML=_e('Minimum amount',language_code)+
' '+
fundraiser_donation_values_response.data.symbol+
' '+
fundraiser_donation_values_response.data.customdonationconfiguration.min_donation_amount;}else if(value==''||parseInt(value)>parseInt(fundraiser_donation_values_response.data.customdonationconfiguration.max_donation_amount)){amountError.style.visibility='visible';amountError.innerHTML=_e('Maximum amount',language_code)+
' '+
fundraiser_donation_values_response.data.symbol+
' '+
fundraiser_donation_values_response.data.customdonationconfiguration.max_donation_amount;}else{if(value.includes(currency_symbol_object[slug])){value=value.split(currency_symbol_object[slug]+' ')[1];}
if(!isNaN(value)){var tipBox=document.getElementById('tip-box-'+slug);var inputVal=document.getElementById('open-amount-number-'+slug).value;var intval=parseInt(inputVal);if(tipBox&&intval>=5){var tipInputDiv=document.getElementById('input-tip-div'+slug);handleTipDropdownNew(slug);calculateTotalAmountDropDown(slug);}}else{document.getElementById('open-amount-number-'+slug).value='';}}}
function isRestrictKeysForOtherAmount(event,id){var restrictedInput=['.',',','e','-',' ','v',currency_symbol_object[id],];if(restrictedInput.includes(event.key)){event.preventDefault();}}
function changeMonthlyBar(colorCode,id){var monthlyDiv=document.getElementById('preview-intervals-monthly-bar-'+id);if(monthlyDiv!=null){monthlyDiv.style.backgroundColor=colorCode;}
var onetimeDiv=document.getElementById('preview-intervals-onetime-bar-'+id);if(onetimeDiv!=null){onetimeDiv.style.backgroundColor='#E8E8E8';}
var yearlyDiv=document.getElementById('preview-intervals-yearly-bar-'+id);if(yearlyDiv!=null){yearlyDiv.style.backgroundColor='#E8E8E8';}}
function changeYearlyBar(colorCode,id){var monthlyDiv=document.getElementById('preview-intervals-monthly-bar-'+id);if(monthlyDiv!=null){monthlyDiv.style.backgroundColor='#E8E8E8';}
var onetimeDiv=document.getElementById('preview-intervals-onetime-bar-'+id);if(onetimeDiv!=null){onetimeDiv.style.backgroundColor='#E8E8E8';}
var yearlyDiv=document.getElementById('preview-intervals-yearly-bar-'+id);if(yearlyDiv!=null){yearlyDiv.style.backgroundColor=colorCode;}}
function changeOnetimeBar(colorCode,id){var monthlyDiv=document.getElementById('preview-intervals-monthly-bar-'+id);if(monthlyDiv!=null){monthlyDiv.style.backgroundColor='#E8E8E8';}
var onetimeDiv=document.getElementById('preview-intervals-onetime-bar-'+id);if(onetimeDiv!=null){onetimeDiv.style.backgroundColor=colorCode;}
var yearlyDiv=document.getElementById('preview-intervals-yearly-bar-'+id);if(yearlyDiv!=null){yearlyDiv.style.backgroundColor='#E8E8E8';}}
function selectFirstAmount(colorCode,id,tip_enabled){var selectOtherAmountError=document.getElementById('show-other-amount-error-msg-'+id);if(selectOtherAmountError){document.getElementById('show-other-amount-error-msg-'+id).style.display='none';}
var selectFirst=document.getElementById('amount-boundary-box-1-s-'+id);if(selectFirst!=null){selectFirst.style.backgroundColor=colorCode;}
var selectSecond=document.getElementById('amount-boundary-box-2-s-'+id);if(selectSecond!=null){selectSecond.style.backgroundColor='white';}
var selectThird=document.getElementById('amount-boundary-box-3-s-'+id);if(selectThird!=null){selectThird.style.backgroundColor='white';}
var selectForth=document.getElementById('amount-boundary-box-4-s-'+id);if(selectForth!=null){selectForth.style.backgroundColor='white';}
var selectOther=document.getElementById('amount-boundary-box-other-s-'+id);if(selectOther!=null){selectOther.style.backgroundColor='white';}
var otherAmountDiv=document.getElementById('other-amount-div-'+id);if(otherAmountDiv!=null){otherAmountDiv.style.display='none';}
if(tip_enabled){handleTipDropdownNew(id);}}
function selectSecondAmount(colorCode,id,tip_enabled){var selectOtherAmountError=document.getElementById('show-other-amount-error-msg-'+id);if(selectOtherAmountError){document.getElementById('show-other-amount-error-msg-'+id).style.display='none';}
var selectFirst=document.getElementById('amount-boundary-box-1-s-'+id);if(selectFirst!=null){selectFirst.style.backgroundColor='white';}
var selectSecond=document.getElementById('amount-boundary-box-2-s-'+id);if(selectSecond!=null){selectSecond.style.backgroundColor=colorCode;}
var selectThird=document.getElementById('amount-boundary-box-3-s-'+id);if(selectThird!=null){selectThird.style.backgroundColor='white';}
var selectForth=document.getElementById('amount-boundary-box-4-s-'+id);if(selectForth!=null){selectForth.style.backgroundColor='white';}
var selectOther=document.getElementById('amount-boundary-box-other-s-'+id);if(selectOther!=null){selectOther.style.backgroundColor='white';}
var otherAmountDiv=document.getElementById('other-amount-div-'+id);if(otherAmountDiv!=null){otherAmountDiv.style.display='none';}
if(tip_enabled){handleTipDropdownNew(id);}}
function selectThirdAmount(colorCode,id,tip_enabled){var selectOtherAmountError=document.getElementById('show-other-amount-error-msg-'+id);if(selectOtherAmountError){document.getElementById('show-other-amount-error-msg-'+id).style.display='none';}
var selectFirst=document.getElementById('amount-boundary-box-1-s-'+id);if(selectFirst!=null){selectFirst.style.backgroundColor='white';}
var selectSecond=document.getElementById('amount-boundary-box-2-s-'+id);if(selectSecond!=null){selectSecond.style.backgroundColor='white';}
var selectThird=document.getElementById('amount-boundary-box-3-s-'+id);if(selectThird!=null){selectThird.style.backgroundColor=colorCode;}
var selectForth=document.getElementById('amount-boundary-box-4-s-'+id);if(selectForth!=null){selectForth.style.backgroundColor='white';}
var selectOther=document.getElementById('amount-boundary-box-other-s-'+id);if(selectOther!=null){selectOther.style.backgroundColor='white';}
var otherAmountDiv=document.getElementById('other-amount-div-'+id);if(otherAmountDiv!=null){otherAmountDiv.style.display='none';}
if(tip_enabled){handleTipDropdownNew(id);}}
function selectForthAmount(colorCode,id,tip_enabled){var selectOtherAmountError=document.getElementById('show-other-amount-error-msg-'+id);if(selectOtherAmountError){document.getElementById('show-other-amount-error-msg-'+id).style.display='none';}
var selectFirst=document.getElementById('amount-boundary-box-1-s-'+id);if(selectFirst!=null){selectFirst.style.backgroundColor='white';}
var selectSecond=document.getElementById('amount-boundary-box-2-s-'+id);if(selectSecond!=null){selectSecond.style.backgroundColor='white';}
var selectThird=document.getElementById('amount-boundary-box-3-s-'+id);if(selectThird!=null){selectThird.style.backgroundColor='white';}
var selectForth=document.getElementById('amount-boundary-box-4-s-'+id);if(selectForth!=null){selectForth.style.backgroundColor=colorCode;}
var selectOther=document.getElementById('amount-boundary-box-other-s-'+id);if(selectOther!=null){selectOther.style.backgroundColor='white';}
var otherAmountDiv=document.getElementById('other-amount-div-'+id);if(otherAmountDiv!=null){otherAmountDiv.style.display='none';}
if(tip_enabled){handleTipDropdownNew(id);}}
function selectOtherAmount(colorCode,id,tip_enabled){var selectOtherAmountError=document.getElementById('show-other-amount-error-msg-'+id);if(selectOtherAmountError){document.getElementById('show-other-amount-error-msg-'+id).style.display='none';}
var selectFirst=document.getElementById('amount-boundary-box-1-s-'+id);if(selectFirst!=null){selectFirst.style.backgroundColor='white';}
var selectSecond=document.getElementById('amount-boundary-box-2-s-'+id);if(selectSecond!=null){selectSecond.style.backgroundColor='white';}
var selectThird=document.getElementById('amount-boundary-box-3-s-'+id);if(selectThird!=null){selectThird.style.backgroundColor='white';}
var selectForth=document.getElementById('amount-boundary-box-4-s-'+id);if(selectForth!=null){selectForth.style.backgroundColor='white';}
var selectOther=document.getElementById('amount-boundary-box-other-s-'+id);if(selectOther!=null){selectOther.style.backgroundColor=colorCode;}
var otherAmountDiv=document.getElementById('other-amount-div-'+id);otherAmountDiv.style.display='flex';if(tip_enabled){handleTipDropdownNew(id);}}
function submitDonation(event,fundraising_local_id,title,id,successUrl,failureUrl,tip_enabled){event.preventDefault();let fundraiser_donation_values_response=fundraiser_donation_values_object[id];event.stopPropagation();let language_code=document.getElementById(`language-code-${id}`).innerHTML;let currencySelect=document.getElementById(`currency-select-${id}`);var redirectLink=differentiateUrl(window.location.href);var periods=document.getElementsByName('period-intervals-'+id);var periodsVal='';for(var i=0,length=periods.length;i<length;i++){if(periods[i].checked){periodsVal=periods[i].value;break;}}
var amount=document.getElementsByName('select-amount-'+id);var amountVal='';for(var i=0,length=amount.length;i<length;i++){if(amount[i].checked){amountVal=amount[i].value;if(amountVal=='other'){amountVal=document.getElementById('other-amount-number-'+id).value;}
break;}}
let openAmountNumberSelectEle=document.getElementById(`select-open-amount-${id}`);let openAmountNumberEle=document.getElementById(`open-amount-number-${id}`);if(openAmountNumberSelectEle.checked){amountVal=openAmountNumberEle.value;}
var flocalId=fundraising_local_id;var firstName=document.getElementById('firstname-'+id).value;var lastName=document.getElementById('lastname-'+id).value;var email=document.getElementById('email-'+id).value;var isAnonymous=document.getElementById('is-anonymous-'+id);var tipBoxDiv=document.getElementById('tip-box-'+id);var tipBoxEnabled=tipBoxDiv?true:false;var lang=getLang();var tipAmount=0;if(tipBoxEnabled){var selectItem=document.getElementById(`select-dropdown-${id}`).value;if(selectItem=='Amount'){tipAmount=parseFloat(document.getElementById(`input-tip${id}`).value);}else{tipAmount=parseFloat(document.getElementById(`select-dropdown-${id}`).value);}}
let flocalData={amount:amountVal,bank_account:'',currency_code:`${currencySelect.value}`,description:title,email:email,first_name:firstName,fundraising_local_id:flocalId,is_anonymous:isAnonymous.checked?true:false,is_tip_enabled:tipBoxEnabled,lang:lang,last_name:lastName,pay_period:periodsVal,return_url:redirectLink,tip_amount:tipAmount,ui_mode:'checkout',source:'plugin',};var previewCard=document.getElementById('preview-card-'+id);previewCard.style.height='600px';var firstnameError=document.getElementById('show-firstname-error-msg-'+id);var lastnameError=document.getElementById('show-lastname-error-msg-'+id);var emailError=document.getElementById('show-email-error-msg-'+id);var otherAmountError=document.getElementById('show-other-amount-error-msg-'+id);firstnameError.style.display='none';lastnameError.style.display='none';emailError.style.display='none';if(otherAmountError){otherAmountError.style.display='none';}
let check=true;var selectOtherAmountBox=document.getElementById('select-amount-other-'+id);if(selectOtherAmountBox){var selectOther=document.getElementById('select-amount-other-'+id).checked;}
if(!/\S/.test(firstName)){firstnameError.style.display='block';check=false;}
if(!/\S/.test(lastName)){lastnameError.style.display='block';check=false;}
if(!validateEmail(email)){emailError.style.display='block';check=false;}
let minimumAllowed=parseFloat(fundraiser_donation_values_response.data.customdonationconfiguration.min_donation_amount);let maximumAllowed=parseFloat(fundraiser_donation_values_response.data.customdonationconfiguration.max_donation_amount);if(amountVal==''||amountVal.includes('-')||amountVal.includes('.')||amountVal.includes(',')){check=false;if(otherAmountError){otherAmountError.style.display='block';}}else{if(otherAmountError){otherAmountError.style.display='block';}
if(amountVal==''||parseFloat(amountVal)<minimumAllowed){check=false;if(otherAmountError){otherAmountError.style.visibility='visible';otherAmountError.innerHTML=_e('Minimum amount',language_code)+
' '+
fundraiser_donation_values_response.data.symbol+
' '+
fundraiser_donation_values_response.data.customdonationconfiguration.min_donation_amount;}}else if(amountVal==''||parseFloat(amountVal)>maximumAllowed){check=false;if(otherAmountError){otherAmountError.style.visibility='visible';otherAmountError.innerHTML=_e('Maximum amount',language_code)+
' '+
fundraiser_donation_values_response.data.symbol+
' '+
fundraiser_donation_values_response.data.customdonationconfiguration.max_donation_amount;}}}
let totalAmount=parseFloat(amountVal)+parseFloat(tipAmount);if(totalAmount>maximumAllowed){check=false;}else if(totalAmount<minimumAllowed){check=false;}
if(openAmountNumberSelectEle.checked){let openAmountValue=parseFloat(openAmountNumberEle.value);if(openAmountValue==''||openAmountValue<minimumAllowed){check=false;if(otherAmountError){otherAmountError.style.visibility='visible';otherAmountError.innerHTML=_e('Minimum amount',language_code)+
' '+
fundraiser_donation_values_response.data.symbol+
' '+
fundraiser_donation_values_response.data.customdonationconfiguration.min_donation_amount;}}else if(openAmountValue==''||openAmountValue>maximumAllowed){check=false;if(otherAmountError){otherAmountError.style.visibility='visible';otherAmountError.innerHTML=_e('Maximum amount',language_code)+
' '+
fundraiser_donation_values_response.data.symbol+
' '+
fundraiser_donation_values_response.data.customdonationconfiguration.max_donation_amount;}}}
console.log('check',check);if(check){var donorInfo={email:email,firstname:firstName,lastname:lastName,is_anonymous:isAnonymous.checked?true:false,language_code:lang,};var btn=document.getElementById(`preview-donate-btn-${id}`);btn.classList.add('loading');var donation_loader_text=document.getElementById(`donation-loader-text-${id}`);setTimeout(function(){btn.classList.remove('loading');donation_loader_text.style.display='inline';},8000);makeDonation(flocalData,successUrl,failureUrl,donorInfo);}}
function getLang(){var lang=navigator.userLanguage||navigator.language||document.documentElement.lang;if(!lang){return 'en';}
var reg_patt=new RegExp('^[a-z]{0,3}');lang=reg_patt.exec(lang).toString();if(lang.length!=2){lang='en';}
return lang;}
function validateEmail(email){var re=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;return re.test(String(email).toLowerCase());}
function amountInputSpinner(value,id){const currencySymbol=currency_symbol_object[id]||'';const regex=new RegExp(`[^0-9${currencySymbol.replace(/[-\/\\^$*+?.()|[\]{}]/g,'\\$&')}]*`,'g');value=value.replace(regex,'');if(value<0){value*=-1;}
handleOtherAmountInput(value,id);return value;}
async function edit_preview_html_generator(options={},languageCode=''){const id=options.id||'id';let originl_html=await shortcode_func_html_generator(options,'',languageCode,'','','edit_preivew');document.getElementById(`widget-here-${id}`).remove();return originl_html;}
async function wp_html_generator(options){try{const get_fundraiser_styling_response=await get_fundraiser_styling(options.shortcode);const get_fundraiser_styling_response_json=JSON.parse(get_fundraiser_styling_response);let html_result;if(get_fundraiser_styling_response_json.data.message=='Not_Avaliable'){html_result=await shortcode_func_html_generator(options);}else{html_result=await shortcode_func_html_generator(get_fundraiser_styling_response_json.data);}
return html_result;}catch(error){}}
document.addEventListener('DOMContentLoaded',function(){var modalDiv=document.createElement('div');modalDiv.className='modal';modalDiv.id='modal';document.body.appendChild(modalDiv);});var donationWidgetDiv=document.querySelectorAll('.widget-here');donationWidgetDiv.forEach(function(donationWidgetDiv){var shortcode=donationWidgetDiv.dataset.shortcode;var language_code=donationWidgetDiv.dataset.lang;var success_url=donationWidgetDiv.dataset.success_url;var fail_url=donationWidgetDiv.dataset.fail_url;var slug=donationWidgetDiv.dataset.slug;get_fundraiser_styling(shortcode).then(async(get_fundraiser_styling_response)=>{let get_fundraiser_styling_response_json=JSON.parse(get_fundraiser_styling_response);await shortcode_func_html_generator(get_fundraiser_styling_response_json.data,slug,language_code,success_url,fail_url);});});var donationWidgetDiv=document.querySelectorAll('.share-widget');donationWidgetDiv.forEach(async function(donationWidgetDiv){var shortcode=donationWidgetDiv.dataset.slug;var language_code=donationWidgetDiv.dataset.lang;var success_url=donationWidgetDiv.dataset.success_url;var fail_url=donationWidgetDiv.dataset.fail_url;var slug=donationWidgetDiv.dataset.slug;var cardShow=donationWidgetDiv.dataset.card;var form_mode=donationWidgetDiv.dataset.form_mode;let fundraiserInfo=await get_fundraiser_info(slug,language_code);let fundraiserInfoJson=JSON.parse(fundraiserInfo);let currencyCode=fundraiserInfoJson.data.result.currency_code;let donationAmountOptions=await fundraiser_donation_values_share_api(slug,currencyCode);let firstAmount=donationAmountOptions.data.customdonationconfiguration.onetime.default_1;let secondAmount=donationAmountOptions.data.customdonationconfiguration.onetime.default_2;let thirdAmount=donationAmountOptions.data.customdonationconfiguration.onetime.default_3;let forthAmount=donationAmountOptions.data.customdonationconfiguration.onetime.default_4;let firstAmountMonthly=donationAmountOptions.data.customdonationconfiguration.monthly.default_1;let secondAmountMonthly=donationAmountOptions.data.customdonationconfiguration.monthly.default_2;let thirdAmountMonthly=donationAmountOptions.data.customdonationconfiguration.monthly.default_3;let forthAmountMonthly=donationAmountOptions.data.customdonationconfiguration.monthly.default_4;let firstAmountYearly=donationAmountOptions.data.customdonationconfiguration.yearly.default_1;let secondAmountYearly=donationAmountOptions.data.customdonationconfiguration.yearly.default_2;let thirdAmountYearly=donationAmountOptions.data.customdonationconfiguration.yearly.default_3;let forthAmountYearly=donationAmountOptions.data.customdonationconfiguration.yearly.default_4;let primaryColor=fundraiserInfoJson.data.result.profile.primary_color;let secondaryColor=fundraiserInfoJson.data.result.profile.secondary_color;let font=fundraiserInfoJson.data.result.font;let buttonRadius=fundraiserInfoJson.data.result.button_radius;let card_shadow=fundraiserInfoJson.data.result.card_shadow;let doNotShowBox,showProgressBar,showRaisedAmount,showEndDate,showDonationFormOnly,background_allowed;if(cardShow=='show'){doNotShowBox=0;showProgressBar=2;showRaisedAmount=3;showEndDate=4;}else{doNotShowBox=1;showProgressBar=0;showRaisedAmount=0;showEndDate=0;}
if(form_mode=='donation-form+widget'){showDonationFormOnly=1;background_allowed=0;}else if(form_mode=='donation-form'){showDonationFormOnly=0;background_allowed=0;}else if(form_mode=='show-with-image'){showDonationFormOnly=0;background_allowed=1;}else if(form_mode=='donation-form+image'){showDonationFormOnly=1;background_allowed=1;}
let options={id:slug,shortcode:shortcode,firstAmount,secondAmount,thirdAmount,forthAmount,firstAmountMonthly,secondAmountMonthly,thirdAmountMonthly,forthAmountMonthly,firstAmountYearly,secondAmountYearly,thirdAmountYearly,forthAmountYearly,primaryColor,secondaryColor,showDonateButton:1,showProgressBar,showRaisedAmount,showEndDate,showDonationFormOnly,doNotShowBox,oneTimeCheck:1,monthlyCheck:2,yearlyCheck:3,firstAmountCheck:1,secondAmountCheck:2,thirdAmountCheck:3,forthAmountCheck:4,otherChecked:1,font,buttonRadius,card_shadow,pluginStyle:'Custom',background_allowed,};await shortcode_func_html_generator(options,slug,language_code,success_url,fail_url,'share_mode');});