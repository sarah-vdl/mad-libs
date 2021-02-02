// code outside any function is run when the page is loaded

// attach an "event listener" to the HTML object with id "playbutton"
// so that whenever the button is clicked, the javascript function play() is called
document.getElementById("playbutton").onclick = play;


function play() {
	var selection = document.getElementById("selector").value;
	if (selection == "rand")
		selection = document.getElementById("selector").options[randomInt(1, 5)].value;
	var text = stories[selection];
	console.log(text);
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
