// Sets up entire page + variables for MadLibs
document.getElementById("playbutton").onclick = play;
document.getElementById("nextbutton").onclick = next;
document.getElementById("selector").onchange = focus_on_play;
document.getElementById("playAgainbutton").onclick = playagain;
document.getElementById("words_form").style.display = "none";
document.getElementById("playAgainbutton").style.display = "none";
document.getElementById("madlibsdisplay").style.display = "none";
var inputList = [];
var placeholders = [];
var pIndex = 0;
var text = "";

// sets up CSS and resets variables for replay
function playagain() {
	document.getElementById("subheading").style.display = "block";
	document.getElementById("madlibsdisplay").style.display = "none";
	document.getElementById("playAgainbutton").style.display = "none";
	document.getElementById("heading").innerHTML = "Welcome to Mad Libs!";
	document.getElementById("start_form").style.display = "inline";
	document.getElementById("madlibsdisplay").style.display = "none";	
	document.getElementById("subheading").style.display = "inline";
	document.getElementById("divider").style.display = "inline";
	document.getElementById("selector").value = "rand";
	inputList = [];
	placeholders = [];
	pIndex = 0;
}

// Focuses on play button
function focus_on_play() {
	document.getElementById("playbutton").focus();
}

// Launches MadLibs + sets up CSS for game + calls create()
function play() {
	document.getElementById("subheading").style.display = "none";
	document.getElementById("start_form").style.display = "none";
	document.getElementById("words_form").style.display = "block";
	document.getElementById("userinput").focus(); // put focus on textbox
	var selection = document.getElementById("selector").value;
	if (selection == "rand")
		selection = document.getElementById("selector").options[randomInt(1, 5)].value;
	console.log(selection);
	text = stories[selection];
	console.log(text);
	create(text);
	updateHeading();
}

// Creates list of input prompt keywords
function create() {
    var state = "searching";
    var placeholder = "";
    for (var i = 0; i < text.length; i++) {
    	var c = text[i];
        if (state == "searching" && c == "<") {
            state = "reading";
        } else if (state == "reading" && c == ">") {
            placeholders.push(placeholder);
            console.log(placeholder);
            placeholder = "";
            state = "searching";
        } else if (state == "reading") {
            placeholder += c;
        }
    }
}

// Updates heading for each new input prompt
function updateHeading() {
	var placeholder = placeholders[pIndex];
    placeholder = placeholder.toLowerCase().replace("-", " ");
    var a = "a";
    if (isVowel(placeholder[0])) {
        a = "an";
    }
    var heading = "Please input " + a + " " + placeholder + ": ";
    document.getElementById("heading").innerHTML = heading;
}

// Logs and stores data for each input + transitions to next prompt
function next() {
	var input = document.getElementById("userinput").value;
	inputList.push(input);
	console.log(inputList);
	document.getElementById("userinput").value = "";
	document.getElementById("userinput").focus(); // put focus back on textbox for next entry
	pIndex++;
	if (pIndex >= placeholders.length) {
		display(text);
	} else {
		updateHeading();
	}
}

// Compiles data collected from inputs into story format + displays
function display() {
	document.getElementById("heading").innerHTML = document.getElementById("selector").value;
	if (document.getElementById("selector").value == "rand") {
		document.getElementById("heading").innerHTML = "Random Madlibs:";
	}
	document.getElementById("words_form").style.display = "none";
	for (var i = 0; i < inputList.length; i++) {
		var inputWord = inputList[i];
		var re = new RegExp('<.+?>');
		text = text.replace(re, inputWord);
	}
	console.log(text);
	document.getElementById("divider").style.display = "none";
	document.getElementById("madlibsdisplay").style.display = "inline";
	document.getElementById("madlibsdisplay").innerHTML = text;
	document.getElementById("playAgainbutton").style.display = "block";
}

// Helps determine proper article in input prompts
function isVowel(ch) {
	return (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u');
}

// Returns a random integer between min (inclusive) and max (inclusive) 
function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

