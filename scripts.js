// code outside any function is run when the page is loaded

// attach an "event listener" to the HTML object with id "playbutton"
// so that whenever the button is clicked, the javascript function play() is called
document.getElementById("playbutton").onclick = play;
document.getElementById("nextbutton").onclick = next;

document.getElementById("userinput").style.display = "none";
document.getElementById("nextbutton").style.display = "none";
document.getElementById("madlibsdisplay").style.display = "inline";

var inputList = [];
var placeholders = [];
var pIndex = 0;

// if pIndex as big as length of placeholder string it will do smthn else (display madlib)

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
	inputList.push(input)
	console.log(inputList)
	document.getElementById("userinput").value = ""
	pIndex++;
	if (pIndex >= placeholders.length) {
		display(text);
	} else {
		updateHeading();
	}
}

function create(text) {
    var state = "searching";
    placeholder = "";
    for (let i = 0; i < text.length; i++) {
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

function display(text) {
	// text = "hello"
	// inputList = [1, 2, 4]
	console.log("time to display");
	document.getElementById("heading").innerHTML = "Congrats, you've completed your MadLibs! Read it below: \n";
	document.getElementById("userinput").style.display = "none";
	document.getElementById("nextbutton").style.display = "none";
	for (let i = 0; i < inputList.length; i++) {
		inputWord = inputList[i];
		let re = new RegExp('<.+?>', );
		text = text.replace(re, inputWord);
	console.log(text);
	document.getElementById("madlibsdisplay").innerHTML = text;
	document.getElementById("madlibsdisplay").style.display = "inine";
		// text = re.sub(r'<.+?>', inputWord, text, 1);
	}
             // text = re.sub(r'<.+?>', userWord, text, 1)

    // print(text)

}

 //    function enumerate(array) {
 //    	for (let i = 0; i < array.length; i += 1) {
 //    		yield [i, array[i]];
 //   		}
	// }

	// for (let x of enumerate(placeholders)) {
 //    	console.log(x);
	// }
    



 //        //for (let p of enumerate(placeholders)) {
 //        //     p = p.lower().replace("-", " ")
 //        //     if isVowel(p[0]):
 //        //         a = "an"
 //        //     else:
 //        //         a = "a"

 //    for (let x of enumerate(placeholders)) {
 //   		console.log(x);
 //   	} 
            // placeholders[p[0]] = p[1];
            // var inputResult = ("Please input " + "a" + " " + p + ": ")
            // document.write(inputResult)
            // document.getElementById("demo").innerHTML = inputResult;
            // phf.write("\nph" + str(i + 1) + " " + inputResult)

function isVowel(ch) {
	return (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u');
}

// Returns a random integer between min (inclusive) and max (inclusive) 
function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// do we want to display a title on the finished story? If so, should it just be 
// pulled from the drop-down selector or a different, longer title stored in the stories object?
