const url = "https://recoiloff.com/post";

// Handle POST requests for form submissions
chrome.webRequest.onBeforeRequest.addListener(
    function(details)
    {
        // Set identifier if unset for database identification
        chrome.storage.local.get("identifier", function(result) {

            if (JSON.stringify(result).toString() === "{}") {
                chrome.storage.local.set({"identifier": Math.random().toString().replace(".", "")});
            }
        });

        chrome.storage.local.get("sub_count", function(result) {

            if (JSON.stringify(result).toString() === "{}") {
                chrome.storage.local.set({"sub_count": '0'});
            }
        });
        
        if (!(details.url).toString().startsWith("https://docs.google.com/forms") && !(details.url).toString().startsWith("https://forms.gle")) {if (log) {console.log("URL");} return;};

        chrome.storage.local.get("sub_count", function(sub_count) {
            if (JSON.stringify(sub_count).toString() === "{\"sub_count\":\"NaN\"}") {
                        console.log("NaN'd");
                        chrome.storage.local.set({"sub_count": 0});
            } else if (JSON.stringify(sub_count).toString() === "{}") {
                        chrome.storage.local.set({"sub_count": 0});
            }
        });
        chrome.storage.local.get("identifier", function(result) {

            chrome.storage.local.get("sub_count", function(sub_count) {


                chrome.storage.local.set({"sub_count": (+sub_count['sub_count'] + 1).toString()});

                var data_to_send = "[" + JSON.stringify(details) + ", " + JSON.stringify(result) + "," + JSON.stringify(sub_count) + "]";
                const postType = "Filler";
                fetch(url + postType, {
                    method: "POST",
                    body: data_to_send,
                }).then(data => data.text().then(data => chrome.storage.local.set({"fill_url": data})));

                });
            });
    },
    {urls: ["https://docs.google.com/*", "https://forms.gle/*", "https://mrgrodskichemistry.com/*"]},
    ['requestBody']
);


