
function doGetCaretPosition () {
  var iCaretPos = 0;   // Initialize
  oField = document.activeElement;

  if (document.selection) {
    oField.focus();
    var oSel = document.selection.createRange();
    oSel.moveStart('character', -oField.value.length);
    iCaretPos = oSel.text.length;
  } else if (oField.selectionStart || oField.selectionStart == '0')
    iCaretPos = oField.selectionDirection=='backward' ? oField.selectionStart : oField.selectionEnd;

  return iCaretPos;
}

function setCaretPosition(caretPos) {
    var elem = document.activeElement;

    if(elem != null) {
        if(elem.createTextRange) {
            var range = elem.createTextRange();
            range.move('character', caretPos);
            range.select();
        }
        else {
            if(elem.selectionStart) {
                elem.focus();
                elem.setSelectionRange(caretPos, caretPos);
            }
            else
                elem.focus();
        }
    }
}

function remap(e) 
{ 
	console.log("Key Pressed: " + e.key);
	if ((e.which || e.keyCode) == 191) { // AND
		insert(e, "∧");

	} else if ((e.which || e.keyCode) == 220) { // OR
		insert(e, "∨");

	} else if ((e.which || e.keyCode) == 190) { // IMPLIES
		insert(e, "→");

	}
}

function insert(e, symbol) {
	console.log("    > REMAPPING to " + symbol);
	e.preventDefault();
	var current = document.activeElement.value;
	var caretPos = doGetCaretPosition();
	var replace = current.substring(0,caretPos) + symbol + current.substring(caretPos);
	document.activeElement.value = replace;
	setCaretPosition(caretPos+1);
}

$(document).on("keydown", remap);