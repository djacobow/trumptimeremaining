
var opt_names = [ 'ref_date', 'icon_mode' ];

var draw_progress = function(fr) {
    var elem = document.getElementById('progress_done');
    var width = Math.floor(fr*100 + 0.5);
    if (width < 0)   width = 0;
    if (width > 100) width = 100;
    elem.style.width = width.toString() + '%';
};


var do_update = function() {

    times = calc_times();

    document.getElementById('tte').innerText = times.elapsed.dhms_str;
    document.getElementById('ttr').innerText = times.remaining.dhms_str;
    document.getElementById('tpe').innerText = times.elapsed.frac_str;
    document.getElementById('tpr').innerText = times.remaining.frac_str;

    draw_progress(times.elapsed.frac);
};



var save_opts = function() {
    for (var i=0; i<opt_names.length; i++) {
        var optname = opt_names[i];
        options[optname] = document.getElementById(optname).value;
    }
    chrome.storage.local.set({ options: options }, function() {
    });
};


var load_opts = function(cb) {
    chrome.storage.local.get(['options'], function(items) {
        if (items.hasOwnProperty('options')) {
            options = items.options;
        }
        for (var i=0; i<opt_names.length; i++) {
            var optname = opt_names[i];
            document.getElementById(optname).value = options[optname];
        }
        return cb();
    });

};


var updater = function() {
    do_update();
    window.setTimeout(updater,1000);
};


var startup = function() {
    for (var i=0; i<opt_names.length; i++) {
        document.getElementById(opt_names[i]).addEventListener('change',save_opts); 
    }
    load_opts(function() {
        updater();
    });
};


startup();

