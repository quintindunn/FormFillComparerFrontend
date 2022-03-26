chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // Checks that is mail related.
    if (!request.url.includes("https://mail.google.com/mail")) return;
    if (!request.url.includes("#inbox/")) return;

    // Wait for email to load.
    setTimeout(function() {
        // Check that email is from Grodski Grader
        const graderName = "Grodski Grader";
        const graderEmail = "grodskib@whbschools.org";
        // Select Email Body
        var emailData = document.querySelector("#\\:1 > div > div > div > table > tr > td.Bu.bAn > div.nH.if > div.nH.aHU");
        var emailInnerText = emailData.innerText;
        var emailInnerHTML = emailData.innerHTML;
        if (!(emailInnerHTML.includes(graderEmail) && emailInnerText.includes(graderName))) return;
        chrome.runtime.sendMessage({message: emailInnerHTML});
    }, 1000);

});


var wakeup = function(){

    setTimeout(function(){
        try {
                    chrome.runtime.sendMessage('ping', function(){
            });
        } catch {}


        wakeup();
    }, 10000);
}
wakeup();

