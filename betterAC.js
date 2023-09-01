if (window.MutationObserver) {
	var observer = new MutationObserver(function (mutations) {
        addLinks();
        changeButtonText()
	});

	observer.observe(document.body, {
		childList: true,
		attributes: false,
		characterData: true,
		subtree: true
	});
}

// Change button text
function changeButtonText(){
    // XPATH
    buttonElement = document.evaluate('//button[contains(text(),"New Request")]', document, null, XPathResult.ANY_TYPE, null).iterateNext();
    if (buttonElement == null) {
        return;
    }
    buttonElement.textContent = "New Search";
};

// Linkify Record Name
const recordRegEx = RegExp("^(BLD|PLN)-");
const baseQueryUrl = "https://aca-prod.accela.com/LEXKY/Cap/GlobalSearchResults.aspx?QueryText=";

function addLinks(){
    document.querySelectorAll(".notificationsAddressSpanBold").forEach(function(e){
        if(recordRegEx.test(e.textContent)){
            // Element is a record number
            a = document.createElement('a');
            link = document.createTextNode(e.textContent);
            a.appendChild(link);
            a.title = e.textContent;
            a.href = baseQueryUrl + e.textContent;
            a.target = "_blank";
            a.style.fontWeight = "bold";
            a.style.textDecoration = "underline";
            e.parentNode.replaceChild(a, e);
        }
    })
};

