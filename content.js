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


