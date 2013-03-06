/*
 * Taimer object
 *
 * @param: limit
 *     integer: in seconds
 * @param: prefix
 *     string: display string before timer
 * @param: htmlId
 *     string: id of HTML element to display timer
 * @param: reverse
 *     boolean: false to start with 0, true to countdown to 0
 *
 */
function Taimer(limit, prefix, htmlId, reverse) {
  this.timerStarted = new Date().getTime();
  this.timerPaused = 0;
  this.running = false; // is timer running or not
  this.limit = limit*1000; // timer in milisecconds
  this.refreshRate = 1000; // 1 second by default
  this.htmlId = htmlId;
  this.prefix = prefix;
  this.consoleOutput = true; // display to console
  this.reverse = reverse; // display to console
  
  // Start time if not running
  this.startTimer = function() {
	  if (!this.running) {
	    this.running = true;
	    this.reset();
	  }
	};

  // Stop timer if running
  this.stopTimer = function() {
	  this.timerPaused = new Date().getTime();
	  if (this.running) {
	    this.running = false;
	  }
	};

  // Reset timer
  this.resetTimer = function() {
	  this.timerStarted = new Date().getTime();
	  this.timerPaused = 0;
	  this.lastSync = 0;
	};

  // Run on completion 
  this._onTimerComplete = function() {
	  this._display(this.limit/1000);
	  clearInterval(this.interval);
	  clearInterval(this.refreshInterval);
	  this.running = false;
	};

  // Run on completion 
  this._onTimerRefresh = function() {
	  var timeNow = new Date().getTime();
	  var displayTime = Math.round((timeNow - this.timerStarted)/1000);
	  
	  // Correcting sync problems
	  var now = new Date().getTime();
	  var sync = ((now - this.timerStarted) % this.refreshRate);
	  clearInterval(this.refreshInterval);
	  this.refreshInterval = window.setInterval(function(){this._onTimerRefresh()},this.refreshRate - sync);

	  this._display(displayTime);
	};

  // Display data
  this._display = function(value) {


  	  value = (this.reverse)?(this.limit/1000 - value):value;
	  value = (value < 10)?('0' + value):value;
	  
	  // Visual update
	  if (this.consoleOutput) {
	  	console.log(this.prefix + value);
	  }

	  if (this.htmlId != null) {
	  	var htmlElem = document.getElementById(htmlId);
	  	htmlElem.innerHTML = this.prefix + value;
	  }
	};

  // Update HTML document
  this.setHtmlElement = function(htmlId) {
  		this.htmlId = htmlId;
	};

  // Setting intervals
  this.interval = window.setInterval(function(){this._onTimerComplete()},this.limit);
  this.refreshInterval = window.setInterval(function(){this._onTimerRefresh()},this.refreshRate);

  this._display(0);
}