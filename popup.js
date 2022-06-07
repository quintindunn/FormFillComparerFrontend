document.addEventListener("DOMContentLoaded", function(){
        chrome.storage.local.get("fill_url", function(result) {
            chrome.tabs.create({url : result.fill_url});
        });
});