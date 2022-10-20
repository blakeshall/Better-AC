if (window.MutationObserver) {
	var observer = new MutationObserver(function (mutations) {
		// Array.prototype.forEach.call(mutations, function (m) {
			addLinks();
            changeButtonText()
		// });
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
    buttonElement.textContent = "New Search";

    // CSS
    // document.querySelectorAll("button").forEach(function(e){
    //     if (e.textContent === "New Request"){
    //         e.textContent = "New Search";
    //     }
    // })
};

// Linkify Record Name
const recordRegEx = RegExp("^(BLD|PLN)-");
const baseQueryUrl = "https://aca-prod.accela.com/LEXKY/Cap/GlobalSearchResults.aspx?QueryText=";

function addLinks(){
    console.log("Looking for Links");
    document.querySelectorAll(".notificationsAddressSpanBold").forEach(function(e){
        if(recordRegEx.test(e.textContent)){
            console.log('Record found')
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

    // console.log(setTimeout(addLinks(), 1000));
};

