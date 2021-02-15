import re

# GLOBAL VARIABLES
MSG_HELP = str("Available commands:\n| create <output> <template> | display <output> | templates | help | quit |")

MSG_INTRO = str("Welcome to the game of Mad Libs.\n"
+ "I will ask you to provide several words\n"
+ "and phrases to fill in a mad lib story.\n"
+ "The result will be written to an output file.\n" + MSG_HELP)

CMD_PROMPT = "\nCommand? "
CMD_ERR    = "I do not understand your command. Please type help."

# set this to True to print extra debugging output
debug = False


# main program
def MadlibCmd():
    print(MSG_INTRO)
    cmdLoop()


# cmdLoop(): This function continues to read user command
def cmdLoop():

    # CS112: needs to modify the code to make it a loop
    cmdLine = input(CMD_PROMPT)   # read one commandline
    
    commands = cmdLine.split()    # split commandline into words
    cmd = commands[0]             # first word is the cmd
    
    if cmd == "create":
        # create <placeholder_file> <template_file>
        phFileName = commands[1]
        DEBUG("Output to placeholder file: " + phFileName)        

        templateFileName = commands[2]
        DEBUG("Using template file: " + templateFileName)
        
        if (create(phFileName, templateFileName)):
            print("Your mad-lib has been created in " + phFileName + ".")
        else:
            print("Error when creating mad lib in " + phFileName + ".")
        cmdLoop()

    elif cmd == "display": 
        # display <placeholder_file>
        phFileName = commands[1]
        DEBUG("Using placeholder file : " + phFileName )

        display(phFileName)
        cmdLoop()

    elif cmd == "templates":
        print("Available templates:\n| bensonmarty.txt | tarzan.txt | dance.txt | university.txt | clothes.txt |")
        cmdLoop()
        
    elif cmd == "help":
        print(MSG_HELP)
        cmdLoop()

    elif cmd == "quit":
        print("Bye!")
        exit()

    else:
        # if user types in an unknown/invalid command
        print(CMD_ERR)
        cmdLoop()
# end of cmdLoop


# create(): create a placeholder file based on a template and user input.
# The format of a placeholder file is
# Line 1: name of corresponding template file
# Line 2: ph1 <value of first placeholder>
# Line 3: ph2 <value of second placeholder>
# ...

# parameter phFileName (string)
#           Specifies the name of the placeholder file
# parameter templateFileName (string)
#           Specifies the mad lib template
def create(phFileName, templateFileName):

    # if a file is not found, jump down to "except FileNotFoundError"
    try:
        # first try to open template file for reading
        tf = open(templateFileName, "r")
        tfLines = tf.readlines() # creates a list where each line of the file is an item in the list

        # open placeholder file for writing
        #   if placeholder file already exists, this will erase and overwrite it
        #   if placeholder file does not already exist, this will create it
        phf = open(phFileName, "w")

        # Write the first line of a placeholder file: template file name
        phf.write(templateFileName)

        placeholders = []

        for line in tfLines:
            state = "searching"
            placeholder = ""
            for c in line:
                if state == "searching" and c == "<":
                    state = "reading"
                elif state == "reading" and c == ">":
                    placeholders.append(placeholder)
                    placeholder = ""
                    state = "searching"
                elif state == "reading":
                    placeholder += c

        for i, p in enumerate(placeholders):
            p = p.lower().replace("-", " ")
            if isVowel(p[0]):
                a = "an"
            else:
                a = "a"
            placeholders[i] = p
            inputResult = input("Please input " + a + " " + p + ": ")
            phf.write("\nph" + str(i + 1) + " " + inputResult)

        print("") # print an empty line


        return True # returning True means everything went successfully

    except FileNotFoundError: # cannot open the template file
        print("File " + templateFileName + " does not exist.") 
        return False
# end of create


# display(): open a placeholder file to display a mad lib
# parameter phFileName (string)
#       Specifies the file name of the mad lib template
def display(phFileName):    
    try:
        # try to open placeholder file for reading
        phf = open(phFileName, "r")
        phfLines = phf.read().splitlines()

        # first line is template name
        templateFileName = phfLines[0] 

        # try to open template file for reading
        tf = open(templateFileName, "r")
        # tfLines = tf.readlines()
        tfText = tf.read()

        print("") # print an empty line

        userWords = []

        for line in phfLines[1:]:
            userWords.append(line.split(" ", 1)[1])


        for userWord in userWords:
            tfText = re.sub(r'<.+?>', userWord, tfText, 1)

        print(tfText)

        return True # returning True means everything went successfully

    except FileNotFoundError as not_found: # cannot open either the placeholder or template file
        print("File " + not_found.filename + " does not exist.") 
        return False

    
# end of display

# utility method testing if a token (word) is a placeholder

def isAPlaceHolder(token):
    # CS112
    return True


# This will be helpful...  
def isVowel(ch):
    if ch == 'a' or ch == 'e' or ch == 'i' or ch == 'o' or ch == 'u':
        return True



# utility method for debugging. Set debug to false to disable
def DEBUG(s):
    if (debug):
        print("[DEBUG: " + s + "]")


# run the program
MadlibCmd()
