// code outside any function is run when the page is loaded

// attach an "event listener" to the HTML object with id "playbutton"
// so that whenever the button is clicked, the javascript function play() is called
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
var title = "";

function playagain() {
	document.getElementById("subheading").style.display = "block";
	document.getElementById("madlibsdisplay").style.display = "none";
	document.getElementById("playAgainbutton").style.display = "none";
	document.getElementById("heading").innerHTML = "Welcome to Mad Libs!";
	document.getElementById("start_form").style.display = "inline";
	// document.getElementById("selector").style.display = "inline";
	document.getElementById("madlibsdisplay").style.display = "none";	
	document.getElementById("subheading").style.display = "inline";
	document.getElementById("divider").style.display = "inline";
	document.getElementById("selector").value = "rand";
	inputList = [];
	placeholders = [];
	pIndex = 0;
	text = "";
	title = "";
}

// if pIndex as big as length of placeholder string it will do smthn else (display madlib)

function focus_on_play() {
	document.getElementById("playbutton").focus();
}

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

function play() {
	document.getElementById("subheading").style.display = "none";
	document.getElementById("start_form").style.display = "none";
	document.getElementById("words_form").style.display = "block";
	document.getElementById("userinput").focus(); // put focus on textbox
	var selection = document.getElementById("selector").value;
	if (selection == "rand")
		selection = document.getElementById("selector").options[randomInt(1, 5)].value;
	// console.log(selection);
	text = stories[selection].body;
	title = stories[selection].title;
	create();
	updateHeading();
}

function next() {
	var input = document.getElementById("userinput").value;
	inputList.push(input);
	// console.log(inputList);
	document.getElementById("userinput").value = "";
	document.getElementById("userinput").focus(); // put focus back on textbox for next entry
	pIndex++;
	if (pIndex >= placeholders.length) {
		display();
	} else {
		updateHeading();
	}
}

function create() {
    var state = "searching";
    var placeholder = "";
    for (var i = 0; i < text.length; i++) {
    	var c = text[i];
        if (state == "searching" && c == "<") {
            state = "reading";
        } else if (state == "reading" && c == ">") {
            placeholders.push(placeholder);
            // console.log(placeholder);
            placeholder = "";
            state = "searching";
        } else if (state == "reading") {
            placeholder += c;
        }
    }
}

function display() {
	document.getElementById("heading").innerHTML = title;
	document.getElementById("words_form").style.display = "none";
	for (var i = 0; i < inputList.length; i++) {
		var inputWord = inputList[i];
		var re = new RegExp('<.+?>');
		text = text.replace(re, inputWord);
	}
	document.getElementById("divider").style.display = "none";
	document.getElementById("madlibsdisplay").style.display = "inline";
	document.getElementById("madlibsdisplay").innerHTML = text;
	document.getElementById("playAgainbutton").style.display = "block";
}

function isVowel(ch) {
	return (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u');
}

// Returns a random integer between min (inclusive) and max (inclusive) 
function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// do we want to display a title on the finished story? If so, should it just be 
// pulled from the drop-down selector or a different, longer title stored in the stories object?
