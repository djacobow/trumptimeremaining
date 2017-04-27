

var update = function() {
    chrome.storage.local.get(['options'], function(items) {
        if (items.hasOwnProperty('options')) {
            options = items.options;
        }

        var times = calc_times();

        var istr = '';
        var tstr = '';
        switch (options.icon_mode) {
            case 'days_remaining': 
                var day = times.remaining.dhms.day;
                if (day < 0) {
                    istr = '<1';
                } else {
                    istr = day.toString();
                }
                tstr = times.remaining.dhms_str + ' to go';
                break;
            case 'days_complete': 
                istr = times.elapsed.dhms.day.toString();
                tstr = times.elapsed.dhms_str + 'are behind us';
                break;
            case 'perc_remaining': 
                istr = Math.floor(times.remaining.frac * 100 + 0.5).toString() + '%';
                tstr = times.remaining.frac_str + '% left to go';
                break;
            case 'perc_complete': 
                istr = Math.floor(times.elapsed.frac * 100 + 0.5).toString() + '%';
                tstr = 'It\'s ' + times.elapsed.frac_str + '% over';
                break;

        }
        chrome.browserAction.setTitle({
            title: tstr,
        });
        chrome.browserAction.setBadgeText({
            text: istr,
        });
    });

    setTimeout(update,1*1000);
};

update();

