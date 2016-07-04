var Observable = require("FuseJS/Observable");

var stopwatchItems = Observable();

var now = function() {
    return new Date().getTime();
};

var getMillis = function(stopwatch) {
    return now() - stopwatch["startTime"];
};

var addStopwatch = function() {
    stopwatchItems.add({
        "title": "tempName",
        "running": Observable(false),
        "startTime": now(),
        "cachedTime": 0,
        "timeString": Observable("")
    });
};
addStopwatch();

function updateTimeString(stopwatch) {
	function pad(d) {
 		return (d < 10) ? '0' + d.toString() : d.toString();
 	}

	var millis = getMillis(stopwatch);
    var seconds = millis / 1000;
	mins = Math.floor(seconds / 60);
	secs = Math.floor(seconds) % 60,
 	hundredths = Math.floor((millis % 10e2) / 10);
 	stopwatch.timeString.value =  pad(mins) + ":" + pad(secs) + ":" + pad(hundredths);
}

var updateStopwatch = function(stopwatch) {
    if (stopwatch.running.value)
        updateTimeString(stopwatch);
};

function updateStopwatches() {
    stopwatchItems.forEach(updateStopwatch);
	setTimeout(updateStopwatches, 10);
}
updateStopwatches();

function reset(stopwatch) {
    stopwatch = stopwatch.data;
    stopwatch["startTime"] = now();
    updateTimeString(stopwatch);
}

var stopStart = function (stopwatch) {
    stopwatch = stopwatch.data;

    var isRunning = stopwatch["running"].value;

    if (isRunning)
        stopwatch["cachedTime"] = getMillis(stopwatch);
    else
        stopwatch["startTime"] = now() - stopwatch["cachedTime"];

    stopwatch["running"].value = !isRunning;
};

module.exports = {
	reset: reset,
	stopStart: stopStart,
    stopwatchItems: stopwatchItems,
    addStopwatch: addStopwatch
};
