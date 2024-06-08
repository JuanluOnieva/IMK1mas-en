if(typeof wdplugin_donation_worker_url==='undefined'){var wdplugin_donation_worker_url='https://donation.whydonate.workers.dev';}
if(typeof wdplugin_fundraiser_worker_url==='undefined'){var wdplugin_fundraiser_worker_url='https://fundraiser.whydonate.workers.dev';}
if(typeof wdplugin_account_worker_url==='undefined'){var wdplugin_account_worker_url='https://account.whydonate.workers.dev';}
if(typeof currency_symbol_object==='undefined'){var currency_symbol_object={};}
if(typeof currency_code_object==='undefined'){var currency_code_object={};}
if(typeof selected_interval_object==='undefined'){var selected_interval_object={};}
if(typeof fundraiser_donation_values_object==='undefined'){var fundraiser_donation_values_object={};}
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
async function updateDonorInformation(donorInfo,urlToRedirect,donorId,orderId){var api=`${wdplugin_donation_worker_url}/donation/donor/update/`;var url=api;let body={firstname:donorInfo.firstname,lastname:donorInfo.lastname,is_anonymous:donorInfo.is_anonymous,language_code:donorInfo.language_code,name:donorInfo.firstname+' '+donorInfo.lastname,id:donorId,o_id:orderId,email:donorInfo.email,};await fetch(url,{method:'put',headers:{'Content-Type':'application/json','Access-Control-Allow-Headers':'*','Access-Control-Allow-Methods':'*','Access-Control-Allow-Origin':'*',},body:JSON.stringify(body),}).then(function(response){return response.json();}).then(function(result){localStorage.setItem('donor_info',{});setTimeout(function(){if(urlToRedirect&&urlToRedirect!=''){window.location.assign(urlToRedirect);}},3000);});}
async function checkInstallations(payload){let apiUrl=`${wdplugin_account_worker_url}/account/check/installations`;const settings={method:'post',headers:{'Content-Type':'application/json',},body:JSON.stringify(payload),};const res=await fetch(apiUrl,settings);if(res.ok){const json=await res.json();}else{console.log('Track installations error: '+response.status);}}
function addslashes(str){return str.replace(/\\/g,'\\\\').replace(/'/g,"\\'").replace(/"/g,'\\"').replace(/\0/g,'\\0');}
function _e(text,lang){let result;switch(lang){case 'de':switch(text){case 'of':result='of';break;case 'One Time':result='Einmalig';break;case 'Monthly':result='Monatlich';break;case 'Yearly':result='Jährlich';break;case 'Select Amount':result='Betrag auswählen';break;case 'Anonymous':result='Anonym';break;case 'Donate':result='Spenden';break;case 'Powered by ':result='Angetrieben von ';break;case 'funded':result='finanziert ';break;case 'Other':result='Andere ';break;case 'Amount':result='Menge';break;case 'Total Charge:':result='Gesamtsumme:';break;case 'Whydonate has a 0% platform fee for organizers and relies on the generosity of donors like you to operate our service.':result='Whydonate erhebt eine Plattformgebühr von 0% für Organisatoren und ist auf die Großzügigkeit von Spendern wie Ihnen angewiesen, um unseren Dienst zu betreiben.';break;case 'Thank you for including a tip of ':result='Vielen Dank, dass Sie einen Tipp mit aufgenommen haben ';break;case 'Enter amount':result='Menge eingeben';break;case 'First Name':result='Vorname';break;case 'Last Name':result='Nachname';break;case 'Email Address':result='E-Mail-Addresse';break;case 'Currency':result='Währung';break;case 'The minimum amount is':result='Der Mindestbetrag beträgt';break;case 'The maximum amount is':result='Der Höchstbetrag beträgt';break;case 'Must be between':result='Muss zwischen';break;case 'and':result='und';break;case 'characters':result='Zeichen';break;case 'Please enter a valid email.':result='Bitte geben Sie eine gültige E-Mail-Adresse ein.';break;case 'Fundraiser is either closed by time or owner closed it!':result='Eine Spendenaktion ist entweder aufgrund von Zeit abgeschlossen oder vom Eigentümer geschlossen.';break;case 'Select the currency in which you want to make the donation. If it is different from the default currency, the amount will be exchanged automatically.':result='Wählen Sie die Währung aus, in der Sie die Spende tätigen möchten. Ist sie anders als die Standardwährung, wird der Betrag automatisch umgerechnet.';break;case 'closed':result='geschlossen';break;default:result=text;}
break;case 'en':switch(text){case 'of':result='of';break;case 'One Time':result='One Time';break;case 'Monthly':result='Monthly';break;case 'Yearly':result='Yearly';break;case 'Select Amount':result='Select Amount';break;case 'Anonymous':result='Anonymous';break;case 'Donate':result='Donate';break;case 'Powered by ':result='Powered by ';break;case 'funded':result='funded ';break;case 'Other':result='Other ';break;case 'Amount':result='Amount';break;case 'Total Charge:':result='Total Charge:';break;case 'Whydonate has a 0% platform fee for organizers and relies on the generosity of donors like you to operate our service.':result='Whydonate has a 0% platform fee for organizers and relies on the generosity of donors like you to operate our service.';break;case 'Thank you for including a tip of ':result='Thank you for including a tip of ';break;case 'Enter amount':result='Enter Amount';break;case 'First Name':result='First Name';break;case 'Last Name':result='Last Name';break;case 'Email Address':result='Email Address';break;case 'Currency':result='Currency';break;case 'The minimum amount is':result='The minimum amount is';break;case 'The maximum amount is':result='The maximum amount is';break;case 'Must be between':result='Must be between';break;case 'and':result='and';break;case 'characters':result='characters';break;case 'Please enter a valid email.':result='Please enter a valid email.';break;case 'Fundraiser is either closed by time or owner closed it!':result='Fundraiser is either closed by time or owner closed it.';break;case 'Select the currency in which you want to make the donation. If it is different from the default currency, the amount will be exchanged automatically.':result='Select the currency in which you want to make the donation. If it is different from the default currency, the amount will be exchanged automatically.';break;case 'closed':result='closed';break;default:result=text;}
break;case 'es':switch(text){case 'of':result='de';break;case 'One Time':result='';break;case 'Monthly':result='Mensual';break;case 'Yearly':result='Anualmente';break;case 'Select Amount':result='Seleccione la cantidad';break;case 'Anonymous':result='Anónimo';break;case 'Donate':result='Donaciones';break;case 'Powered by ':result='Impulsado por ';break;case 'funded':result='financiado ';break;case 'Other':result='Otros';break;case 'Amount':result='Cantidad';break;case 'Total Charge:':result='Cargo total:';break;case 'Whydonate has a 0% platform fee for organizers and relies on the generosity of donors like you to operate our service.':result='';break;case 'Thank you for including a tip of ':result='Propina para WhyDonate ';break;case 'Enter amount':result='Ingrese la cantidad';break;case 'First Name':result='Nombre';break;case 'Last Name':result='Apellido';break;case 'Email Address':result='Dirección de email';break;case 'Currency':result='Moneda';break;case 'The minimum amount is':result='El importe mínimo es de';break;case 'The maximum amount is':result='El importe máximo es de';break;case 'Must be between':result='Debe estar entre';break;case 'and':result='y';break;case 'characters':result='caracteres';break;case 'Please enter a valid email.':result='Por favor, introduce una dirección de email válida';break;case 'Fundraiser is either closed by time or owner closed it!':result='La recaudación de fondos está cerrada por tiempo o el propietario la cerró.';break;case 'Select the currency in which you want to make the donation. If it is different from the default currency, the amount will be exchanged automatically.':result='Seleccione la moneda en la que desea realizar la donación. Si es diferente de la moneda predeterminada, el monto se cambiará automáticamente.';break;case 'closed':result='cerrado';break;default:result=text;}
break;case 'nl':switch(text){case 'of':result='van';break;case 'One Time':result='Eénmalig';break;case 'Monthly':result='Maandelijks';break;case 'Yearly':result='Jaarlijks';break;case 'Select Amount':result='Selecteer bedrag';break;case 'Anonymous':result='Anoniem';break;case 'Donate':result='Doneer';break;case 'Powered by ':result='Ondersteund door ';break;case 'funded':result='gefinancierd ';break;case 'Other':result='Anders';break;case 'Amount':result='Bedrag';break;case 'Total Charge:':result='Totaalbedrag:';break;case 'Whydonate has a 0% platform fee for organizers and relies on the generosity of donors like you to operate our service.':result='Whydonate heeft 0% platformkosten voor organisatoren en we rekenen op de vrijgevigheid van donateurs zoals jij om onze service te garanderen.';break;case 'Thank you for including a tip of ':result='Bedankt voor het toevoegen van een fooi van ';break;case 'Enter amount':result='Voer bedrag in';break;case 'First Name':result='Voornaam';break;case 'Last Name':result='Achternaam';break;case 'Email Address':result='E-mailadres';break;case 'Currency':result='Valuta';break;case 'The minimum amount is':result='Het minimumbedrag is';break;case 'The maximum amount is':result='Het maximumbedrag is';break;case 'Must be between':result='Moet tussen';break;case 'and':result='en';break;case 'characters':result='tekens';break;case 'Please enter a valid email.':result='Voer alstublieft een geldig e-mailadres in';break;case 'Fundraiser is either closed by time or owner closed it!':result='Inzamelingsactie is ofwel gesloten vanwege tijd, of de eigenaar heeft deze gesloten.';break;case 'Select the currency in which you want to make the donation. If it is different from the default currency, the amount will be exchanged automatically.':result='Selecteer de valuta waarin je de donatie wilt doen. Als deze afwijkt van de standaardvaluta, wordt het bedrag automatisch omgewisseld.';break;case 'closed':result='gesloten';break;default:result=text;}
break;case 'fr':switch(text){case 'of':result='de';break;case 'One Time':result='Une fois';break;case 'Monthly':result='Mensuel';break;case 'Annual':result='Annuel';break;case 'Select Amount':result='Sélectionner le montant';break;case 'Anonymous':result='Anonyme';break;case 'Donate':result='Faire un don';break;case 'Powered by ':result='Alimenté par ';break;case 'funded':result='financé';break;case 'Other':result='Autre';break;case 'Amount':result='Montant';break;case 'Total Charge:':result='Charge totale:';break;case 'Whydonate has a 0% platform fee for organizers and relies on the generosity of donors like you to operate our service.':result='Whydonate propose des frais de plateforme de 0 % aux organisateurs et compte sur la générosité de donateurs comme vous pour faire fonctionner notre service.';break;case 'Thank you for including a tip of ':result="Merci d'avoir inclus un conseil de ";break;case 'Enter amount':result='Entrer le montant';break;case 'First Name':result='Prénom';break;case 'Last Name':result='Nom de famille';break;case 'Email Address':result='Adresse e-mail';break;case 'Currency':result='Monnaie';break;case 'The minimum amount is':result='Le montant minimum est de';break;case 'The maximum amount is':result='Le montant maximum est de';break;case 'Must be between':result='Doit être entre';break;case 'and':result='et';break;case 'characters':result='caractères';break;case 'Please enter a valid email.':result='Veuillez entrer un email valide';break;case 'Fundraiser is either closed by time or owner closed it!':result="La collecte de fonds est soit fermée par le temps, soit le propriétaire l'a fermée.";break;case 'Select the currency in which you want to make the donation. If it is different from the default currency, the amount will be exchanged automatically.':result='Sélectionnez la devise dans laquelle vous souhaitez effectuer le don. Si elle est différente de la devise par défaut, le montant sera échangé automatiquement.';break;case 'closed':result='fermé';break;default:result=text;}
break;default:result=text;}
return result;}
function convertHtmlStringToHtml(htmlString){const tempElement=document.createElement('div');tempElement.innerHTML=htmlString;return tempElement.firstChild;}
function stringToBinary(str){const textEncoder=new TextEncoder();const uint8Array=textEncoder.encode(str);const binaryString=Array.from(uint8Array).map((byte)=>byte.toString(2).padStart(8,'0')).join('');return binaryString;}
function binaryToString(binaryString){const chunks=binaryString.match(/.{1,8}/g);const decodedString=chunks.map((chunk)=>String.fromCharCode(parseInt(chunk,2))).join('');return decodedString;}
function showInterval(index,tip_enabled,id,shortcode,donation_options_binary,font){let selectedDonationDptionsString=binaryToString(donation_options_binary)||'';var widgetIdValue=document.getElementById(`widget-id-${shortcode}`).innerHTML;var donationOptionsSection=document.getElementById(`interval-container-${widgetIdValue}`);var otherAmountNumber=document.getElementById(`other-amount-div-${widgetIdValue}`);if(index===0){selected_interval_object[widgetIdValue]='once';donationOptionsSection.innerHTML=selectedDonationDptionsString;currency_value_updater(widgetIdValue,tip_enabled,font);otherAmountNumber.style.display='none';}else if(index===1){selected_interval_object[widgetIdValue]='monthly';donationOptionsSection.innerHTML=selectedDonationDptionsString;currency_value_updater(widgetIdValue,tip_enabled,font);otherAmountNumber.style.display='none';}else if(index===2){selected_interval_object[widgetIdValue]='yearly';donationOptionsSection.innerHTML=selectedDonationDptionsString;currency_value_updater(widgetIdValue,tip_enabled,font);otherAmountNumber.style.display='none';}}
async function fundraiser_donation_values_api(id){let currency_select=document.getElementById(`currency-select-${id}`);let fundraiser_slug_value=document.getElementById(`widget-slug-${id}`).innerHTML;let url=`${wdplugin_fundraiser_worker_url}/fundraiser/wp/donation/values?slug=${fundraiser_slug_value}&currency=${currency_select.value}`;let response=await fetch(url);let response_json=await response.json();currency_code_object[id]=response_json.data.currency;currency_symbol_object[id]=response_json.data.symbol;return response_json;}
async function currency_value_updater(id,tip_enabled,font){let fundraiser_donation_values_response=fundraiser_donation_values_object[id];let currency_select=document.getElementById(`currency-select-${id}`);if(currency_select.value!=currency_code_object[id]){fundraiser_donation_values_object[id]=await fundraiser_donation_values_api(id);fundraiser_donation_values_response=fundraiser_donation_values_object[id];}
var tip_box_span=document.getElementById(`tip-box-span-curr-symbol-${id}`);tip_box_span.innerHTML=fundraiser_donation_values_response.data.symbol;var tip_box_input=document.getElementById(`input-tip${id}`);tip_box_input.value=fundraiser_donation_values_response.data.tip_amount.default_values.tip_amount_fixed_default;var first_radio=document.getElementById('select-amount-first-'+id);var first_radio_label=document.getElementById('amount-boundary-box-1-label-'+id);var second_radio=document.getElementById('select-amount-second-'+id);var second_radio_label=document.getElementById('amount-boundary-box-2-label-'+id);var third_radio=document.getElementById('select-amount-third-'+id);var third_radio_label=document.getElementById('amount-boundary-box-3-label-'+id);var forth_radio=document.getElementById('select-amount-forth-'+id);var forth_radio_label=document.getElementById('amount-boundary-box-4-label-'+id);var open_amount_symbol=document.getElementById('open-amount-number-currency-symbol-'+id);var other_amount_symbol=document.getElementById(`other-amount-div-currency-symbol-${id}`);var openAmountNumber=document.getElementById('open-amount-number-'+id);var otherRadio=document.getElementById('select-amount-other-'+id);if(selected_interval_object[id]=='once'){fundraiser_donation_values_response.data.customdonationconfiguration.onetime.default_1;if(first_radio){first_radio.value=fundraiser_donation_values_response.data.customdonationconfiguration.onetime.default_1;}
if(first_radio_label){first_radio_label.innerHTML=fundraiser_donation_values_response.data.symbol+
' '+
fundraiser_donation_values_response.data.customdonationconfiguration.onetime.default_1;}
if(second_radio){second_radio.value=fundraiser_donation_values_response.data.customdonationconfiguration.onetime.default_2;}
if(second_radio_label){second_radio_label.innerHTML=fundraiser_donation_values_response.data.symbol+
' '+
fundraiser_donation_values_response.data.customdonationconfiguration.onetime.default_2;}
if(third_radio){third_radio.value=fundraiser_donation_values_response.data.customdonationconfiguration.onetime.default_3;}
if(third_radio_label){third_radio_label.innerHTML=fundraiser_donation_values_response.data.symbol+
' '+
fundraiser_donation_values_response.data.customdonationconfiguration.onetime.default_3;}
if(forth_radio){forth_radio.value=fundraiser_donation_values_response.data.customdonationconfiguration.onetime.default_4;}
if(forth_radio_label){forth_radio_label.innerHTML=fundraiser_donation_values_response.data.symbol+
' '+
fundraiser_donation_values_response.data.customdonationconfiguration.onetime.default_4;}
if(open_amount_symbol){open_amount_symbol.innerHTML=currency_symbol_object[id]+' ';}
if(openAmountNumber){openAmountNumber.value=0;}
if(other_amount_symbol){other_amount_symbol.innerHTML=currency_symbol_object[id]+' ';}}else if(selected_interval_object[id]=='monthly'){if(first_radio){first_radio.value=fundraiser_donation_values_response.data.customdonationconfiguration.monthly.default_1;}
if(first_radio_label){first_radio_label.innerHTML=fundraiser_donation_values_response.data.symbol+
' '+
fundraiser_donation_values_response.data.customdonationconfiguration.monthly.default_1;}
if(second_radio){second_radio.value=fundraiser_donation_values_response.data.customdonationconfiguration.monthly.default_2;}
if(second_radio_label){second_radio_label.innerHTML=fundraiser_donation_values_response.data.symbol+
' '+
fundraiser_donation_values_response.data.customdonationconfiguration.monthly.default_2;}
if(third_radio){third_radio.value=fundraiser_donation_values_response.data.customdonationconfiguration.monthly.default_3;}
if(third_radio_label){third_radio_label.innerHTML=fundraiser_donation_values_response.data.symbol+
' '+
fundraiser_donation_values_response.data.customdonationconfiguration.monthly.default_3;}
if(forth_radio){forth_radio.value=fundraiser_donation_values_response.data.customdonationconfiguration.monthly.default_4;}
if(forth_radio_label){forth_radio_label.innerHTML=fundraiser_donation_values_response.data.symbol+
' '+
fundraiser_donation_values_response.data.customdonationconfiguration.monthly.default_4;}
if(open_amount_symbol){open_amount_symbol.innerHTML=currency_symbol_object[id]+' ';}
if(openAmountNumber){openAmountNumber.value=0;}
if(other_amount_symbol){other_amount_symbol.innerHTML=currency_symbol_object[id]+' ';}}else if(selected_interval_object[id]=='yearly'){if(first_radio){first_radio.value=fundraiser_donation_values_response.data.customdonationconfiguration.yearly.default_1;}
if(first_radio_label){first_radio_label.innerHTML=fundraiser_donation_values_response.data.symbol+
' '+
fundraiser_donation_values_response.data.customdonationconfiguration.yearly.default_1;}
if(second_radio){second_radio.value=fundraiser_donation_values_response.data.customdonationconfiguration.yearly.default_2;}
if(second_radio_label){second_radio_label.innerHTML=fundraiser_donation_values_response.data.symbol+
' '+
fundraiser_donation_values_response.data.customdonationconfiguration.yearly.default_2;}
if(third_radio){third_radio.value=fundraiser_donation_values_response.data.customdonationconfiguration.yearly.default_3;}
if(third_radio_label){third_radio_label.innerHTML=fundraiser_donation_values_response.data.symbol+
' '+
fundraiser_donation_values_response.data.customdonationconfiguration.yearly.default_3;}
if(forth_radio){forth_radio.value=fundraiser_donation_values_response.data.customdonationconfiguration.yearly.default_4;}
if(forth_radio_label){forth_radio_label.innerHTML=fundraiser_donation_values_response.data.symbol+
' '+
fundraiser_donation_values_response.data.customdonationconfiguration.yearly.default_4;}
if(open_amount_symbol){open_amount_symbol.innerHTML=currency_symbol_object[id]+' ';}
if(openAmountNumber){openAmountNumber.value=0;}
if(other_amount_symbol){other_amount_symbol.innerHTML=currency_symbol_object[id]+' ';}}
if(tip_enabled==1){createTipboxDropDown(id,'#9E9E9E',font);handleTipDropdownNew(id);}}
function checkVideoUrl(url){const vimeoPattern=/^(?:https?:\/\/)?(?:www\.)?(?:vimeo\.com\/)(\d+)(?:\S+)?$/;const youtubePattern=/^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:embed\/|watch\?v=|v\/)|youtu\.be\/)([\w\-]+)(?:\S+)?$/;if(url.match(vimeoPattern)){return this.generateVimeoIframe(url);}else if(url.match(youtubePattern)){return this.generateYouTubeIframe(url);}else{return 'unknown';}}
function generateVimeoIframe(videoLink){const vimeoVideoId=this.getVideoIdVimeo(videoLink);return `https://vumbnail.com/${vimeoVideoId}.jpg`;}
function generateYouTubeIframe(videoLink){const videoId=this.getVideoIdYoutube(videoLink);return `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`;}
function getVideoIdYoutube(videoLink){const pattern=/^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:embed\/|watch\?v=|v\/)|youtu\.be\/)([\w\-]+)(?:\S+)?$/;const match=videoLink?.match(pattern);return match&&match[1]?match[1]:'';}
function getVideoIdVimeo(videoLink){const pattern=/^(?:https?:\/\/)?(?:www\.)?(?:vimeo\.com\/)(\d+)(?:\S+)?$/;const match=videoLink?.match(pattern);return match&&match[1]?match[1]:'';}
async function shortcode_func_html_generator(options={},slug='',language_code='',success_url='',fail_url='',source=''){let shortcode=options.shortcode||'';let id=options.id||'id';let pluginStyle=options.pluginStyle||'Default';let primaryColorCode=options.primaryColor||'#32BF55';let secondaryColorCode=options.secondaryColor||'#363396';let color=options.colorCode||'';let showDonateButton=options.showDonateButton||0;let showProgressBar=options.showProgressBar||0;let showRaisedAmount=options.showRaisedAmount||0;let showEndDate=options.showEndDate||0;let showDonationFormOnly=options.showDonationFormOnly||0;let doNotShowBox=options.doNotShowBox||0;let oneTimeCheck=options.oneTimeCheck||0;let monthlyCheck=options.monthlyCheck||0;let yearlyCheck=options.yearlyCheck||0;let firstAmountCheck=options.firstAmountCheck||0;let secondAmountCheck=options.secondAmountCheck||0;let thirdAmountCheck=options.thirdAmountCheck||0;let forthAmountCheck=options.forthAmountCheck||0;let otherChecked=options.otherChecked||0;let firstAmount=options.firstAmount||0;let secondAmount=options.secondAmount||0;let thirdAmount=options.thirdAmount||0;let forthAmount=options.forthAmount||0;let firstAmountMonthly=options.firstAmountMonthly||0;let secondAmountMonthly=options.secondAmountMonthly||0;let thirdAmountMonthly=options.thirdAmountMonthly||0;let forthAmountMonthly=options.fourthAmountMonthly||0;let firstAmountYearly=options.firstAmountYearly||0;let secondAmountYearly=options.secondAmountYearly||0;let thirdAmountYearly=options.thirdAmountYearly||0;let forthAmountYearly=options.fourthAmountYearly||0;let font=options.font||'';let flocalId=options.flocalId||0;let progress_bar=options.progress_bar||0.0;let progress_bar_width=options.progress_bar_width||0.0;let appearanceWindowHeight=options.appearanceWindowHeight||199;let selectInterval=0;let donationTitle=options.donationTitle||'';let elapsed=options.elapsed||'';let fundraiserTitle=options.fundraiserTitle||'';let buttonRadius=options.buttonRadius||30;let tip_enabled=true;let stripe_status=options.stripe_status||true;let fundraising_local_id='';let background='';let background_allowed=options.background_allowed||0;let open_amount=options.open_amount||0;let open_amount_monthly=options.open_amount_monthly||0;let open_amount_yearly=options.open_amount_yearly||0;let card_shadow=options.card_shadow||1;await loadFont(font);currency_code_object[id]='eur';currency_symbol_object[id]='€';if(slug==''){slug=options.slug||options.slugName||'';}
if(language_code==''){language_code=options.language_code||'en';}else{switch(language_code){case 'en':case 'fr':case 'es':case 'de':case 'nl':break;default:languageCode='en';break;}}
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
const today=new Date();const end_date=new Date();if(data.end_date){const endDate=new Date(data.end_date);if(endDate<today){elapsed='closed';}else{const timeDiff=endDate.getTime()-today.getTime();const daysElapsed=Math.floor(timeDiff/(1000*3600*24));if(daysElapsed<1000){elapsed=daysElapsed;}else{elapsed='';}}}
if(response){if(data.is_opened!=undefined){if(!data.is_opened||elapsed=='closed'){colorCode='#D3D3D3';}}}
if((data.amount_target==0)&(background_allowed==0)){appearanceWindowHeight=170;}
if(data.is_opened==false||elapsed=='closed'){appearanceWindowHeight+=44;}
if(showProgressBar==2&&showRaisedAmount==3&&background_allowed==1){appearanceWindowHeight=410;}
btnId='apreview-donate-btn-'+pluginStyle;modalId='donate-window-modal-'+pluginStyle;let background_preview=`<img id="widget-image-background" src="${background}" style="border-top-left-radius: 10px;
    border-top-right-radius: 10px;display:${
background_allowed==1&&showDonationFormOnly==0&&doNotShowBox==0?'':'none'
}";>`;let background_preview_modal=`<img id="form-image-background" src="${background}" style="display:${
background_allowed==1&&showDonationFormOnly==1?'':'none'
}";>`;let card_shadow_css;if(card_shadow==1){card_shadow_css='0 2px 1px -1px #0003, 0 1px 1px #00000024, 0 1px 3px #0000001f;';}else if(card_shadow==2){card_shadow_css='0 3px 1px -2px #0003,0 2px 2px #00000024,0 1px 5px #0000001f;';}else if(card_shadow==3){card_shadow_css='0 2px 4px -1px #0003, 0 4px 5px #00000024, 0 1px 10px #0000001f;';}
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
                     <label for="apreview-collected-amount" style="display: block; font-size: 32px"><span class="currency-symbol">${currency_symbol_object[id]}</span> ${data['donation']['amount']}</label>
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
}</span> ${data['amount_target']}</label>
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
                            <label for="apreview-target-amount" style="color:#000000de; font-weight: 400; display: block; font-size: 24px"> <span class="currency-symbol">${currency_symbol_object[id]}</span> ${data['amount_target']}</label>
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
                     <div id="apreview-raised-bar" class="apreview-raised-bar" style="width: ${progress_bar_width}%; background-color:${primaryColorCode} !important;"></div>
                 </div>
             `:''
}
             <div class="apreview-progress-info" id="apreview-progress-info" style="font-family: '${font}' !important;">
                 ${
showProgressBar==2&&data['amount_target']!=0?`
                     <div class="apreview-achieved-percent" id="apreview-achieved-percent" >
                         <label style="font-size: 14px; font-weight: 300; color: gray; display: block">${progress_bar}%
                             ${_e('funded',language_code)}</label>
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
        <label style="margin-top: 20px; font-family: '${font}' !important;; font-size: 14px; font-weight: 400; display: ${
open_amount==1?'block':'none'
}">${_e('Enter amount',language_code)}</label>                    
        <div class="preview-select-amount-options" id="preview-select-amount-options-${id}" style="padding-top: 15px;padding-bottom: 15px;">
            <div id ="donation-option-amount" style="display:${
open_amount==0?'flex':'none'
};flex-direction:row;gap:16px;flex-wrap: unset;">
                ${
firstAmountCheck==1?`
                <div class="amount-boundary-box-1-s" id="amount-boundary-box-1-s-${id}" style="text-align: center; position: relative; background-color: ${
selectInterval==1?primaryColorCode:''
};">
                    <input type="radio" value="${firstAmount}" ${
selectInterval==1&&open_amount==0?'checked':''
} name="select-amount-${id}" id="select-amount-first-${id}" onchange="selectFirstAmount('${primaryColorCode}', '${id}', ${tip_enabled})" style="margin-left: -5px; z-index: 10; position: absolute;" />
                    <label for="select-amount-first-${id}" id="amount-boundary-box-1-label-${id}"  style="font-family: '${font}' !important; font-size: 16px; font-weight: 600;">${
currency_symbol_object[id]+' '+firstAmount
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
currency_symbol_object[id]+' '+secondAmount
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
currency_symbol_object[id]+' '+thirdAmount
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
currency_symbol_object[id]+' '+forthAmount
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
}">${_e('Enter amount',language_code)}</label>     
    <div class="preview-select-amount-options" id="preview-select-amount-options-${id}" style="padding-top: 15px;padding-bottom: 15px;">
        
        <div id ="donation-option-amount" style="display:${
open_amount_monthly==0?'flex':'none'
};flex-direction:row;flex-wrap:unset;gap:16px;">
        ${
firstAmountCheck==1?`
            <div class="amount-boundary-box-1-s" id="amount-boundary-box-1-s-${id}" style="text-align: center; position: relative; background-color: ${
selectInterval==1?primaryColorCode:''
}">
                <input type="radio" value="${firstAmountMonthly}" ${
selectInterval==1&&open_amount_monthly==0?'checked':''
} name="select-amount-${id}" id="select-amount-first-${id}" onchange="selectFirstAmount('${primaryColorCode}', '${id}', ${tip_enabled})" style="margin-left: -5px; z-index: 10; position: absolute;" />
                <label for="select-amount-first-${id}" id="amount-boundary-box-1-label-${id}"  style="font-family: '${font}' !important; font-size: 16px; font-weight: 600">${
currency_symbol_object[id]+' '+firstAmountMonthly
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
currency_symbol_object[id]+' '+secondAmountMonthly
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
currency_symbol_object[id]+' '+thirdAmountMonthly
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
currency_symbol_object[id]+' '+forthAmountMonthly
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
}">${_e('Enter amount',language_code)}</label>             
    <div class="preview-select-amount-options " id="preview-select-amount-options-${id}" style="padding-top: 15px;padding-bottom: 15px;">
        <div id ="donation-option-amount" style="display:${
open_amount_yearly==0?'flex':'none'
};flex-direction:row;flex-wrap:unset; gap:16px;">        
            ${
firstAmountCheck==1?`
            <div class="amount-boundary-box-1-s" id="amount-boundary-box-1-s-${id}" style="text-align: center; position: relative; background-color: ${
selectInterval==1?primaryColorCode:''
}">
                <input type="radio" value="${firstAmountYearly}" ${
selectInterval==1&&open_amount_yearly==0?'checked':''
} name="select-amount-${id}" id="select-amount-first-${id}" onchange="selectFirstAmount('${primaryColorCode}', '${id}', ${tip_enabled})" style="margin-left: -5px; z-index: 10; position: absolute;" />
                <label for="select-amount-first-${id}" id="amount-boundary-box-1-label-${id}"  style="font-family: '${font}' !important; font-size: 16px; font-weight: 600 ">${
currency_symbol_object[id]+' '+firstAmountYearly
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
currency_symbol_object[id]+' '+secondAmountYearly
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
currency_symbol_object[id]+' '+thirdAmountYearly
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
currency_symbol_object[id]+' '+forthAmountYearly
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
    <div class="donate-window-content" style="font-family: '${font}' !important; min-width: 200% !important">
        <div id="widget-id-${shortcode}" style="display:none;">${id}</div>
        <div id="widget-slug-${id}" style="display:none;">${slug}</div>
        <div id="language-code-${id}" style="display:none;">${language_code}</div>

        <div class="preview preview_box" id="preview-${id}" style="margin-left: ${
showDonationFormOnly==1?'5%;':'30%;'
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
}">
                   <div class="apreview-amount-raised" id="apreview-amount-raised" style="align-items: baseline; height: ${
showRaisedAmount==0?'0px':'40px'
}">
                   ${
data['show_donation_details']==true?data.hasOwnProperty('donation')&&data.hasOwnProperty('amount_target')?`
                   ${
showRaisedAmount==3?`
                       <div class="apreview-collected-amount-div" id="apreview-collected-amount-div" style="font-family: '${font}' !important;">
                           <label for="apreview-collected-amount" style="display: block; font-size: 32px"><span class="currency-symbol">${currency_symbol_object[id]}</span> ${data['donation']['amount']}</label>
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
}</span> ${data['amount_target']}</label>
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
                                  <label for="apreview-target-amount" style="color:#000000de; font-weight: 400; display: block; font-size: 24px"> <span class="currency-symbol">${currency_symbol_object[id]}</span> ${data['amount_target']}</label>
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
                               <div id="apreview-raised-bar" class="apreview-raised-bar" style="width: ${progress_bar_width}%; background-color:${primaryColorCode} !important;"></div>
                           </div>
                       `:''
}
                       <div class="apreview-progress-info" id="apreview-progress-info" style="font-family: '${font}' !important;">
                           ${
showProgressBar==2&&data['amount_target']!=0?`
                               <div class="apreview-achieved-percent" id="apreview-achieved-percent" >
                                   <label style="font-family: '${font}' !important;font-size: 14px; font-weight: 300; color: gray; display: block">${progress_bar}%
                                       ${_e('funded',language_code)}</label>
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
                        onclick="showInterval(0, ${tip_enabled}, ${id}, '${shortcode}','${stringToBinary(donation_options)}', '${font}')" />
                        <label for="onetime-radio-${id}" style="font-family: '${font}' !important;display: block; font-size: 14px;">${_e('One Time',language_code)}</label>
                    </div>
                    `:''
}

                    ${
monthlyCheck==2?`
                    <div class="preview-intervals-monthly" id="preview-intervals-monthly-${id}" style="padding-top: 20px;">
                        <input type="radio" value="monthly" name="period-intervals-${id}" id="monthly-radio-${id}" onchange="changeMonthlyBar('${secondaryColorCode}', '${id}')" ${
selectInterval==2?'checked':''
} onclick="showInterval(1, ${tip_enabled}, ${id}, '${shortcode}','${stringToBinary(donation_options_monthly)}', '${font}')" />
                        <label for="monthly-radio-${id}" style="font-family: '${font}' !important; font-size: 14px; display: block">${_e('Monthly',language_code)}</label>
                    </div>
                    `:''
}

                    ${
yearlyCheck==3?`
                    <div class="preview-intervals-yearly" id="preview-intervals-yearly-${id}" style="padding-top: 20px;">
                        <input type="radio" value="yearly" name="period-intervals-${id}" id="yearly-radio-${id}" onchange="changeYearlyBar('${secondaryColorCode}', '${id}')" ${
selectInterval==3?'checked':''
} onclick="showInterval(2, ${tip_enabled}, ${id}, '${shortcode}','${stringToBinary(donation_options_yearly)}', '${font}')"  />
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
tip_enabled?`<div id="tip-box-${id}" class="tip-box" style="height:0px; display: none; font-family: ${font} !important;" data-id="${id}" data-color="${secondaryColorCode}" data-lang="${language_code}"></div>`:''
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
                        <label style="font-family: '${font}' !important; color:#9E9E9E; font-size: 12px; margin-top: 5px; margin-right: 5px; font-weight: 500">${_e('Powered by ',language_code)}</label>
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
                width: 95%; /* The width is 100%, when the viewport is 800px or smaller */
                margin-top: 0 !important;
                height: 100vh !important;
            }
        
            .donate-window-content {
                min-width: 90% !important;
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
    </style>`:'';let htmlCode=media_rules+donation_box+donation_window_modal;if(source=='edit_preivew'){let existingDiv=document.createElement('div');existingDiv.id=`widget-here-${id}`;existingDiv.style.display='none';document.body.appendChild(existingDiv);var tempContainer=document.createElement('div');tempContainer.innerHTML=htmlCode;var newElement=tempContainer.firstChild;existingDiv.appendChild(newElement);}else{if(document.getElementById(`widget-here-${shortcode}`)!=null){if(showDonationFormOnly==1){document.getElementById(`widget-here-${shortcode}`).innerHTML=donation_window_modal_content;}else{document.getElementById(`widget-here-${shortcode}`).innerHTML=htmlCode;}}}
var currencySelectElement=document.getElementById(`currency-select-${id}`);let currencies_array=await get_all_currencies();let currencyData=currencies_array?.data?.list_of_currencies;if(currencySelectElement){for(var i=0;i<currencies_array?.data?.list_of_currencies.length;i++){var option=document.createElement('option');option.value=currencies_array?.data?.list_of_currencies[i].currency;option.text=currencyData[i].symbol+' '+currencyData[i].currency.toUpperCase();currencySelectElement.appendChild(option);if(currencyData[i].currency===currency_code_object[id]){option.setAttribute('selected','selected');}}}
let donationBoxDiv=document.getElementById(`donate-window-modal-${id}`);fundraiser_donation_values_object[id]=await fundraiser_donation_values_api(id);var tipBoxArray=document.getElementsByClassName('tip-box');if(tipBoxArray.length>0){for(var i=0;i<tipBoxArray.length;i++){let tipBox=tipBoxArray[i];let id=tipBox.dataset.id;let languageCode=tipBox.dataset.lang;lang=languageCode.split('_')[0];color=tipBox.dataset.color;createTipboxDropDown(id,'#9E9E9E',font);}}
let urlAddress=window.location.href;if(urlAddress.includes('&orderId=')){let urlAddressArr=urlAddress.split('&orderId=');let orderId=urlAddressArr[1].split('&')[0];getDonorStatus(orderId,success_url,fail_url);let actualUrlArr=urlAddress.split('?donorId=');let donorId=urlAddressArr[1].split('&')[0];var donorInfo=localStorage.getItem('donor_info');donorInfo=JSON.parse(donorInfo);donorInfo['orderId']=urlAddressArr[1].split('&client=')[0];window.history.replaceState({},document.title,actualUrlArr[0]);var url=`${wdplugin_donation_worker_url}/donation/order/status/?order_id=${orderId}`;var params='action=check_order_status&order_id='+urlAddressArr[1].split('&')[0];fetch(url+'?'+params).then(function(response){return response.json();}).then(function(data){if(data['status']=='canceled'||data['status']=='open'){window.location.replace(fail_url);}else if(data['status']=='paid'){window.location.replace(success_url);}else{}}).catch(function(error){}).finally(function(){});}
else{let domainPart=urlAddress.split('//');let domain=domainPart[1].split('/')[0];let payload={url:domain,product:'plugin',};await checkInstallations(payload);}
if(source=='edit_preivew'){return{donation_box:donation_box,donation_window_modal:donationBoxDiv.innerHTML,};}}
var whydonateSlugs={};var lang='';function showDonateWindow(id,tip_enabled,colorCode,languageCode){document.getElementsByTagName('body')[0].style.overflow='hidden';document.getElementsByTagName('body')[0].style.height='100vh';lang=languageCode.split('_')[0];var modal=document.getElementById('donate-window-modal-'+id);var btn=document.getElementById('apreview-donate-btn-'+id);var span=document.getElementById(''+id);if(modal.style.display=='flex'){modal.style.display='none';}else{modal.style.display='flex';}
span.onclick=function(){document.getElementsByTagName('body')[0].style.overflow='';document.getElementsByTagName('body')[0].style.height='initial';modal.style.display='none';};window.onclick=function(event){if(event.target==modal){document.getElementsByTagName('body')[0].style.overflow='';document.getElementsByTagName('body')[0].style.height='initial';modal.style.display='none';}};}
async function loadFont(fontName){var link=document.createElement('link');link.rel='stylesheet';link.href='https://fonts.googleapis.com/css?family='+encodeURIComponent(fontName);document.head.appendChild(link);}
function createTipboxDropDown(id,color,font){let fundraiser_donation_values_response=fundraiser_donation_values_object[id];let lang=document.getElementById(`language-code-${id}`).innerHTML;var cardDiv=document.getElementById('preview-'+id);cardDiv.style.height='910px';document.getElementById('preview-card-'+id).style.height='845px';var tipBox=document.getElementById('tip-box-'+id);tipBox.className='tip-box';tipBox.style.display='block';tipBox.style.height='0px';tipBox.style.marginTop='0px';tipBox.style.padding='0px';tipBox.style.paddingLeft='0px';tipBox.style.backgroundColor=color+'10';var para1=document.createElement('p');para1.style.fontSize='12px';para1.style.fontWeight='400';para1.style.color='black';para1.textContent=_e('Whydonate has a 0% platform fee for organizers and relies on the generosity of donors like you to operate our service.',lang);if(!tipBox.innerHTML){tipBox.appendChild(para1);}
var selectPercentileDiv=document.createElement('div');selectPercentileDiv.id='whydonate-select-percentile-div'+id;selectPercentileDiv.style.display='none';selectPercentileDiv.style.justifyContent='space-around';var para2=document.createElement('p');para2.style.fontSize='12px';para2.style.fontWeight='400';para2.style.color='black';para2.style.marginTop='6px';para2.textContent=_e('Thank you for including a tip of ',lang);selectPercentileDiv.appendChild(para2);var selectElement=document.createElement('select');selectElement.classList.add('whydonate-currecy-selected');var selectedValue=getSelectedValue(id);let options;if(selectedValue>=10){options=[{text: currency_symbol_object[id]+' '+0, value: 0,},{text:'5% ('+(selectedValue*0.05).toFixed(2)+')',value:(selectedValue*0.05).toFixed(2),},{text:'10% ('+(selectedValue*0.1).toFixed(2)+')',value:(selectedValue*0.1).toFixed(2),},{text:_e('Amount',lang),value:'Amount'},];}else{options=[{text: currency_symbol_object[id]+' '+0, value: 0,},{text:currency_symbol_object[id]+
' '+
fundraiser_donation_values_response.data.tip_amount.tip_amount_fixed.first_option,value:fundraiser_donation_values_response.data.tip_amount.tip_amount_fixed.first_option,},{text:currency_symbol_object[id]+
' '+
fundraiser_donation_values_response.data.tip_amount.tip_amount_fixed.second_option,value:fundraiser_donation_values_response.data.tip_amount.tip_amount_fixed.second_option,},{text:_e('Amount',lang),value:'Amount'},];}
options.forEach(function(optionData){var option=document.createElement('option');option.text=optionData.text;option.value=optionData.value;selectElement.appendChild(option);});selectElement.setAttribute('id',`select-dropdown-${id}`);selectElement.setAttribute('onchange',`handleTipDropdownOnChange(${id}, this.value)`);selectPercentileDiv.appendChild(selectElement);var inputTipDiv=document.createElement('div');inputTipDiv.id='input-tip-div'+id;inputTipDiv.style.display='none';inputTipDiv.style.justifyContent='flex-end';inputTipDiv.style.marginTop='10px';var inputTipSpan=document.createElement('span');var inputTipTextBox=document.createElement('input');inputTipSpan.innerHTML=inputTipTextBox.outerHTML;inputTipSpan.innerHTML=`<div class="tip-box-span" style="font-family: ${font} !important;"><span id="tip-box-span-curr-symbol-${id}" class="tip-box-span-curr-symbol">${currency_symbol_object[id]}</span>`+
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
var totalChargeDiv=document.createElement('div');totalChargeDiv.id='whydonate-total-charge-div'+id;totalChargeDiv.style.height='0px';totalChargeDiv.style.display='none';totalChargeDiv.style.marginTop='0px';totalChargeDiv.style.textAlign='right';var totalChargeLabel=document.createElement('label');totalChargeLabel.id='total-charge-label'+id;totalChargeLabel.style.fontFamily=font;totalChargeLabel.style.fontSize='15px';totalChargeLabel.innerHTML=_e('Total Charge:',lang)+' '+currency_symbol_object[id]+' ';totalChargeLabel.style.color='black';totalChargeLabel.style.fontWeight='600';totalChargeLabel.style.width='100%';var totalChargeDivElement=document.getElementById('whydonate-total-charge-div'+id);if(!totalChargeDivElement){totalChargeDiv.appendChild(totalChargeLabel);tipBox.appendChild(totalChargeDiv);}
let dropDownValue=document.getElementById(`select-dropdown-${id}`).value;calculateTotalAmountDropDown(id,dropDownValue);}
function handleTipDropdownNew(id){let options=[];let fundraiser_donation_values_response=fundraiser_donation_values_object[id];let selectedValue=getSelectedValue(id);if(selectedValue>=10){options=[{text: currency_symbol_object[id]+' '+0, value: 0,},{text:'5% ('+(selectedValue*0.05).toFixed(2)+')',value:(selectedValue*0.05).toFixed(2),},{text:'10% ('+(selectedValue*0.1).toFixed(2)+')',value:(selectedValue*0.1).toFixed(2),},{text:_e('Amount',lang),value:'Amount'},];}else{options=[{text: currency_symbol_object[id]+' '+0, value: 0,},{text:currency_symbol_object[id]+
' '+
fundraiser_donation_values_response.data.tip_amount.tip_amount_fixed.first_option,value:fundraiser_donation_values_response.data.tip_amount.tip_amount_fixed.first_option,},{text:currency_symbol_object[id]+
' '+
fundraiser_donation_values_response.data.tip_amount.tip_amount_fixed.second_option,value:fundraiser_donation_values_response.data.tip_amount.tip_amount_fixed.second_option,},{text:_e('Amount',lang),value:'Amount'},];}
let dropDownValue=document.getElementById(`select-dropdown-${id}`).value;var selectElement=document.getElementById(`select-dropdown-${id}`);selectElement.innerHTML='';options.forEach(function(option){var optionElement=document.createElement('option');optionElement.text=option.text;optionElement.value=option.value;selectElement.appendChild(optionElement);});let otherRadio=document.getElementById('select-amount-other-'+id);let openRadio=document.getElementById('select-open-amount-'+id);let inputTipDivEle=document.getElementById(`input-tip-div${id}`);if(otherRadio&&otherRadio.checked&&dropDownValue=='Amount'){for(var i=0;i<selectElement.options.length;i++){if(selectElement.options[i].value==='Amount'){selectElement.options[i].selected=true;break;}}}else if(openRadio&&openRadio.checked&&dropDownValue=='Amount'){for(var i=0;i<selectElement.options.length;i++){if(selectElement.options[i].value==='Amount'){selectElement.options[i].selected=true;break;}}}else{inputTipDivEle.style.display='none';}
var tip_box_input=document.getElementById(`input-tip${id}`);tip_box_input.value=fundraiser_donation_values_response.data.tip_amount.default_values.tip_amount_fixed_default;if(dropDownValue=='Amount'&&selectedValue>=10){calculateTotalAmountDropDown(id,selectedValue*0.15);}else if(dropDownValue=='Amount'&&selectedValue<10){calculateTotalAmountDropDown(id,fundraiser_donation_values_response.data.tip_amount.tip_amount_fixed.third_option);}else{calculateTotalAmountDropDown(id,dropDownValue);}}
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
totalAmount;var tipBox=document.getElementById('tip-box-'+slug);let tipMinMaxError=document.getElementById(`show-other-tip-error-msg-${slug}`);tipMinMaxError.style.visibility='hidden';tipMinMaxError.style.display='none';var minimumAllowed=fundraiser_donation_values_response.data.customdonationconfiguration.min_donation_amount;var maximumAllowed=fundraiser_donation_values_response.data.customdonationconfiguration.max_donation_amount;tipMinMaxError.style.visibility='hidden';tipMinMaxError.style.display='none';if(isNaN(totalAmount)||parseFloat(totalAmount)<parseFloat(minimumAllowed)||parseFloat(totalAmount)>parseFloat(maximumAllowed)){tipMinMaxError.style.visibility='visible';tipMinMaxError.style.display='block';}
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
function submitDonation(event,fundraising_local_id,title,id,successUrl,failureUrl,tip_enabled){event.preventDefault();let fundraiser_donation_values_response=fundraiser_donation_values_object[id];event.stopPropagation();let currencySelect=document.getElementById(`currency-select-${id}`);var redirectLink=window.location.href;var periods=document.getElementsByName('period-intervals-'+id);var periodsVal='';for(var i=0,length=periods.length;i<length;i++){if(periods[i].checked){periodsVal=periods[i].value;break;}}
var amount=document.getElementsByName('select-amount-'+id);var amountVal='';for(var i=0,length=amount.length;i<length;i++){if(amount[i].checked){amountVal=amount[i].value;if(amountVal=='other'){amountVal=document.getElementById('other-amount-number-'+id).value;}
break;}}
let openAmountNumberSelectEle=document.getElementById(`select-open-amount-${id}`);let openAmountNumberEle=document.getElementById(`open-amount-number-${id}`);if(openAmountNumberSelectEle.checked){amountVal=openAmountNumberEle.value;}
var flocalId=fundraising_local_id;var firstName=document.getElementById('firstname-'+id).value;var lastName=document.getElementById('lastname-'+id).value;var email=document.getElementById('email-'+id).value;var isAnonymous=document.getElementById('is-anonymous-'+id);var tipBoxDiv=document.getElementById('tip-box-'+id);var tipBoxEnabled=tipBoxDiv?true:false;var lang=getLang();var tipAmount=0;if(tipBoxEnabled){var selectItem=document.getElementById(`select-dropdown-${id}`).value;if(selectItem=='Amount'){tipAmount=parseFloat(document.getElementById(`input-tip${id}`).value);}else{tipAmount=parseFloat(document.getElementById(`select-dropdown-${id}`).value);}}
let flocalData={amount:amountVal,bank_account:'',currency_code:`eur`,description:title,email:email,first_name:firstName,fundraising_local_id:flocalId,is_anonymous:isAnonymous.checked?true:false,lang:lang,last_name:lastName,newsletter:false,pay_period:periodsVal,return_url:redirectLink,tip_amount:tipAmount,tip:'0',other_tip_amount:1,source:'plugin',};var previewCard=document.getElementById('preview-card-'+id);previewCard.style.height='600px';var firstnameError=document.getElementById('show-firstname-error-msg-'+id);var lastnameError=document.getElementById('show-lastname-error-msg-'+id);var emailError=document.getElementById('show-email-error-msg-'+id);var otherAmountError=document.getElementById('show-other-amount-error-msg-'+id);firstnameError.style.display='none';lastnameError.style.display='none';emailError.style.display='none';if(otherAmountError){otherAmountError.style.display='none';}
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
if(openAmountNumberSelectEle.checked){let openAmountValue=parseFloat(openAmountNumberEle.value);if(openAmountValue==''||openAmountValue<minimumAllowed){check=false;if(otherAmountError){otherAmountError.style.visibility='visible';otherAmountError.innerHTML=_e('Minimum amount',language_code)+
' '+
fundraiser_donation_values_response.data.symbol+
' '+
fundraiser_donation_values_response.data.customdonationconfiguration.min_donation_amount;}}else if(openAmountValue==''||openAmountValue>maximumAllowed){check=false;if(otherAmountError){otherAmountError.style.visibility='visible';otherAmountError.innerHTML=_e('Maximum amount',language_code)+
' '+
fundraiser_donation_values_response.data.symbol+
' '+
fundraiser_donation_values_response.data.customdonationconfiguration.max_donation_amount;}}}
if(check){var donorInfo={email:email,firstname:firstName,lastname:lastName,is_anonymous:isAnonymous.checked?true:false,language_code:lang,};var btn=document.getElementById(`preview-donate-btn-${id}`);btn.classList.add('loading');var donation_loader_text=document.getElementById(`donation-loader-text-${id}`);setTimeout(function(){btn.classList.remove('loading');donation_loader_text.style.display='inline';},8000);makeDonation(flocalData,successUrl,failureUrl,donorInfo);}}
function getLang(){var lang=navigator.userLanguage||navigator.language||document.documentElement.lang;if(!lang){return 'en';}
var reg_patt=new RegExp('^[a-z]{0,3}');lang=reg_patt.exec(lang).toString();if(lang.length!=2){lang='en';}
return lang;}
function validateEmail(email){var re=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;return re.test(String(email).toLowerCase());}
function amountInputSpinner(value,id){const currencySymbol=currency_symbol_object[id]||'';const regex=new RegExp(`[^0-9${currencySymbol.replace(/[-\/\\^$*+?.()|[\]{}]/g,'\\$&')}]*`,'g');value=value.replace(regex,'');if(value<0){value*=-1;}
handleOtherAmountInput(value,id);return value;}
async function edit_preview_html_generator(options={}){const id=options.id||'id';let originl_html=await shortcode_func_html_generator(options,'','','','','edit_preivew');document.getElementById(`widget-here-${id}`).remove();return originl_html;}
async function wp_html_generator(options){try{const get_fundraiser_styling_response=await get_fundraiser_styling(options.shortcode);const get_fundraiser_styling_response_json=JSON.parse(get_fundraiser_styling_response);let html_result;if(get_fundraiser_styling_response_json.data.message=='Not_Avaliable'){html_result=await shortcode_func_html_generator(options);}else{html_result=await shortcode_func_html_generator(get_fundraiser_styling_response_json.data);}
return html_result;}catch(error){}}
document.addEventListener('DOMContentLoaded',function(){var modalDiv=document.createElement('div');modalDiv.className='modal';modalDiv.id='modal';document.body.appendChild(modalDiv);});var donationWidgetDiv=document.querySelectorAll('.widget-here');donationWidgetDiv.forEach(function(donationWidgetDiv){var shortcode=donationWidgetDiv.dataset.shortcode;var language_code=donationWidgetDiv.dataset.lang;var success_url=donationWidgetDiv.dataset.success_url;var fail_url=donationWidgetDiv.dataset.fail_url;var slug=donationWidgetDiv.dataset.slug;get_fundraiser_styling(shortcode).then(async(get_fundraiser_styling_response)=>{let get_fundraiser_styling_response_json=JSON.parse(get_fundraiser_styling_response);await shortcode_func_html_generator(get_fundraiser_styling_response_json.data,slug,language_code,success_url,fail_url);});});