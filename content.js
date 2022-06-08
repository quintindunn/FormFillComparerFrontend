/* FOR FUTURE USAGE
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(JSON.stringify(request));
    // Set identifier if unset for database identification
    chrome.storage.local.get("identifier", function(result) {

        if (JSON.stringify(result).toString() === "{}") {
            chrome.storage.local.set({"identifier": Math.random().toString().replace("0.", "")});
        }
    });
    // Checks that is mail related.
    if (!request.url.includes("https://mail.google.com/mail")) return;
    if (!request.url.includes("#inbox/")) return;
    // Wait for email to load.
    setTimeout(function() {
        console.log("timeout");
        // Check that email is from Grodski Grader
        const graderName = "Grodski Grader";
        const graderEmail = "grodskib@whbschools.org";
        // Select Email Body
        var emailData = document.querySelector("#\\:1 > div > div > div > table > tr > td.Bu.bAn > div.nH.if > div.nH.aHU");
        var emailInnerText = emailData.innerText;
        var emailInnerHTML = emailData.innerHTML;
        console.log("Sending");
        if (!(emailInnerHTML.includes(graderEmail) && emailInnerText.includes(graderName))) return;
        chrome.runtime.sendMessage({message: emailInnerHTML});
    }, 1000);

});
*/


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


