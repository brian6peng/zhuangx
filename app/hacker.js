$(
    function () {
        $(document).keydown(
            function (event) {
                if (event.keyCode != 8)
                    Typer.addText(event);
                else {
                    Typer.removeText();
                    event.preventDefault();
                }
            }
        );
    }
);

var fs = nodeRequire('fs');
var path = nodeRequire('path');

var Typer = {
    text: null,
    accessCountimer: null,
    index: 0, // current cursor position
    speed: 2, // speed of the Typer
    accessCount: 0, //times alt is pressed for Access Granted
    deniedCount: 0, //times caps is pressed for Access Denied
    coldCount: 0, //times caps is pressed for Access Denied
    secCount: 0, //times caps is pressed for Access Denied
    radarCount: 0,
    windowCount: 0,
    ponyCount: 0,
    tagList: [],
    typeIntervalCounter: 0,
    typeInterval: false,
    init: function () {// inizialize Hacker Typer
        accessCountimer = setInterval(function () {
            Typer.updLstChr();
        }, 500); // inizialize timer for blinking cursor
        fs.readFile(path.join(__dirname, 'source.txt'), "utf8", function (error, data) {
            if (error) throw error;
            Typer.text = data;
        });
    },

    content: function () {
        return $("#console").html();// get console content
    },

    write: function (str) {// append to console content
        $("#console").append(str);
        return false;
    },

    removeText: function () {
        if (Typer.text) {
            Typer.index = (Typer.index > 0) ? Typer.index - Typer.speed * 2 : 0;
            Typer.addText(event);
        }
    },

    addText: function (key) {//Main function to add the code
        if (Typer.text) { // otherway if text is loaded

            if (Typer.index <= 0) {
                $("#console").html('');
            }

            Typer.index = Typer.index % Typer.text.length

            var cont = Typer.content(); // get the console content
            if (cont.substring(cont.length - 1, cont.length) == "|") // if the last char is the blinking cursor
                $("#console").html($("#console").html().substring(0, cont.length - 1)); // remove it before adding the text

            var text = Typer.text.substr(Typer.index, Typer.speed)//Typer.index-(Typer.speed));// parse the text for stripping html enities
            var rtn = new RegExp("\n", "g"); // newline regex
            var rtt = new RegExp("\\t", "g"); // tab regex
            text = text.replace(rtn, "<br/>").replace(rtt, "&nbsp;&nbsp;&nbsp;&nbsp;");//.replace(rts,"&nbsp;");// replace newline chars with br, tabs with 4 space and blanks with an html blank
            $("#console").append(text);

            var usedTags = new RegExp("<img.*?>", "g"),
                systemTags = new RegExp("{(.*?)}", "g");
            var foundTag = usedTags.exec(Typer.text.substring(Typer.index)),
                foundSystemTag = systemTags.exec(Typer.text.substring(Typer.index));
            if (foundTag instanceof Array && foundTag.index <= Typer.speed) {
                Typer.index += foundTag.index + foundTag[0].length;
                $("#console").append(foundTag[0]);
            } else if (foundSystemTag instanceof Array && foundSystemTag.index <= Typer.speed) {
                Typer.index += foundSystemTag.index + foundSystemTag[0].length;
                $("#console").append(foundSystemTag[1]);
            } else Typer.index += Typer.speed;
            $('body').scrollTop($("#console").height());
            window.scrollBy(0, 50); // scroll to make sure bottom is always visible 
        }
        if (key.preventDefault && key.keyCode != 122) { // prevent F11(fullscreen) from being blocked
            key.preventDefault()
        };
        if (key.keyCode != 122) { // otherway prevent keys default behavior
            key.returnValue = false;
        }
    },

    updLstChr: function () { // blinking cursor
        var cont = this.content(); // get console 
        if (cont.substring(cont.length - 1, cont.length) == "|") // if last char is the cursor
            $("#console").html($("#console").html().substring(0, cont.length - 1)); // remove it
        else
            this.write("|"); // else write it
    }
}

Typer.init();