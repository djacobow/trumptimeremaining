
var options = {
    ref_date: 'inauguration',
    icon_mode: 'days_remaining',
};

var x = new Date('January 1, 2017 12:00:00');
console.log(x);

var config = {
    // These dates are in GMT, hence the +4 hours
    // Based on EST (for Wash DC in Nov & Jan
    dates: {
        start: {
            inauguration: new Date('January 20, 2017 16:00:00Z'),
            election: new Date('November 8, 2016 04:00:00Z'),
        },
        end: {
            inauguration: new Date('January 20, 2021 16:00:00Z'),
            election: new Date('November 3, 2020 04:00:00Z'),
        }
    },
    basic_intervals: {
        day: 1000 * 60 * 60 * 24,
        hour: 1000 * 60 * 60,
        minute: 1000 * 60,
        second: 1000,
    }
};

var ms_to_dhms = function(ms) {
    var rv = {};
    var iv_names = Object.keys(config.basic_intervals);
    for (var i=0; i<iv_names.length; i++) {
        var ivn = iv_names[i];
        var iv  = config.basic_intervals[ivn];
        var ivc = Math.floor(ms / iv);
        rv[ivn] = ivc;
        ms -= ivc * iv;
    }
    return rv;
};

var dhms_to_str = function(dhms) {
    var os = dhms.day.toString() +
             ' days ';
    var hstr = dhms.hour   < 10 ? '0' : '';
    var mstr = dhms.minute < 10 ? '0' : '';
    var sstr = dhms.second < 10 ? '0' : '';
    hstr += dhms.hour.toString();
    mstr += dhms.minute.toString();
    sstr += dhms.second.toString();

    os += hstr + ':' + mstr + ':' + sstr;
    return os;
};


var calc_times = function() {
    var now = new Date();
    var end = config.dates.end[options.ref_date];
    var start = config.dates.start[options.ref_date];
    // console.log('ref_date: ' + options.ref_date);
    // console.log('start: '); console.log(start);
    // console.log('end: '); console.log(end);
    var total_presidency_ms = end - start;
    var total_elapsed_ms = now - start;
    var total_remaining_ms = end - now;

    var total_elapsed_dhms = ms_to_dhms(total_elapsed_ms);
    var total_remaining_dhms = ms_to_dhms(total_remaining_ms);
    var frac_elapsed = total_elapsed_ms / total_presidency_ms;
    var frac_remaining = total_remaining_ms / total_presidency_ms;

    return {
        elapsed: {
            dhms: total_elapsed_dhms,
            dhms_str: dhms_to_str(total_elapsed_dhms),
            frac: frac_elapsed,
            frac_str: (Math.floor(frac_elapsed * 10000) / 100).toString(),
        },
        remaining: {
            dhms: total_remaining_dhms,
            dhms_str: dhms_to_str(total_remaining_dhms),
            frac: frac_remaining,
            frac_str:  (Math.floor(frac_remaining * 10000) / 100).toString(),
        },
    };
};
