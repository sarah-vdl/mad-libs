// code outside any function is run when the page is loaded

// attach an "event listener" to the HTML object with id "playbutton"
// so that whenever the button is clicked, the javascript function play() is called
document.getElementById("playbutton").onclick = play;
document.getElementById("nextbutton").onclick = next;
document.getElementById("selector").onchange = focus_on_play;

document.getElementById("userinput").style.display = "none";
document.getElementById("nextbutton").style.display = "none";
document.getElementById("madlibsdisplay").style.display = "inline";

var inputList = [];
var placeholders = [];
var pIndex = 0;
var text = "";

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
	document.getElementById("playbutton").style.display = "none";
	document.getElementById("selector").style.display = "none";
	document.getElementById("userinput").style.display = "inline";
	document.getElementById("nextbutton").style.display = "inline";
	document.getElementById("userinput").focus(); // put focus on textbox
	var selection = document.getElementById("selector").value;
	if (selection == "rand")
		selection = document.getElementById("selector").options[randomInt(1, 5)].value;
	text = stories[selection];
	console.log(text);
	create(text);
	updateHeading();
}

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

function display() {
	// text = "hello"
	// inputList = [1, 2, 4]
	console.log("time to display");
	document.getElementById("heading").innerHTML = "Congrats, you've completed your MadLibs! Read it below: \n";
	document.getElementById("userinput").style.display = "none";
	document.getElementById("nextbutton").style.display = "none";
	for (var i = 0; i < inputList.length; i++) {
		var inputWord = inputList[i];
		var re = new RegExp('<.+?>');
		text = text.replace(re, inputWord);
	}
	console.log(text);
	document.getElementById("madlibsdisplay").innerHTML = text;
	document.getElementById("madlibsdisplay").style.display = "inine";
		// text = re.sub(r'<.+?>', inputWord, text, 1);
}
             // text = re.sub(r'<.+?>', userWord, text, 1)


function isVowel(ch) {
	return (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u');
}

// Returns a random integer between min (inclusive) and max (inclusive) 
function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// do we want to display a title on the finished story? If so, should it just be 
// pulled from the drop-down selector or a different, longer title stored in the stories object?
