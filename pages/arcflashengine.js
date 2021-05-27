// -------------------------------------------
// DEFAULT INPUT AND OUTPUT AREA
textarea = document.querySelector( '#input-area' );
textarea.value= "Heading\n=======\n\nSub-heading\n-----------\n \n### Another deeper heading\n \nParagraphs are separated\nby a blank line.\n\nLeave 2 spaces at the end of a line to do a  \nline break\n\nText attributes *italic*, **bold**, \n`monospace`, ~~strikethrough~~ .\n\nShopping list:\n\n  * apples\n  * oranges\n  * pears\n\nNumbered list:\n\n  1. apples\n  2. oranges\n  3. pears\n\nThe rain---not the reign---in\nSpain.\n\n [Splurket Marketplace](https://splurket.com) \n\n![Image Name](https://i.imgur.com/AaslDzA.png)"
let outputArea = document.querySelector( '#output-area' );
let previewMessage = document.querySelector( '.preview-message' );

// -------------------------------------------
// TOOLBAR
// -------------------------------------------
const preview = document.querySelector( '#preview' );
const boldButton = document.querySelector( '#bold' );
const italicButton = document.querySelector( '#italic' );
const heading1Button = document.querySelector( '#heading1' );
const heading2Button = document.querySelector( '#heading2' );
const heading3Button = document.querySelector( '#heading3' );
const linkButton = document.querySelector( '#link' );
const imgbutton=document.querySelector( '#imagebtn' )
const tokenButton = document.querySelector( '#token' );
const ulButton = document.querySelector( '#list-ul' );
const olButton = document.querySelector( '#list-ol' );




boldButton.addEventListener( 'click', () =>
	insertText( textarea, '****', 'demo', 2, 6 )
);

italicButton.addEventListener( 'click', () =>
	insertText( textarea, '**', 'demo',  1, 5 )
);

heading1Button.addEventListener( 'click', () =>
	insertText( textarea, '#', 'heading1', 1, 9 )
);

heading2Button.addEventListener( 'click', () =>
	insertText( textarea, '##', 'heading2', 2, 10 )
);

heading3Button.addEventListener( 'click', () =>
	insertText( textarea, '###', 'heading3', 3, 11 )
);

linkButton.addEventListener( 'click', () =>
	insertText( textarea, '[](http://...)', 'url text', 1, 9 )
);

imgbutton.addEventListener( 'click', () =>
	insertText( textarea, '![](https://...)', 'Image Name', 2, 9 )
);

ulButton.addEventListener( 'click', function() {
	insertText( textarea, '* ', 'item', 2, 6 );
} );

olButton.addEventListener( 'click', () =>
	insertText( textarea, '1. ', 'item', 3, 7 )
);

// -------------------------------------------

function setInputArea( inputElement ) {
	textarea = inputElement;
}

function setOutputArea( outputElement ) {
	outputArea = outputElement;
}

function insertText( textarea, syntax, placeholder = 'demo', selectionStart = 0, selectionEnd = 0 ) {
	// Current Selection
	const currentSelectionStart = textarea.selectionStart;
	const currentSelectionEnd = textarea.selectionEnd;
	const currentText = textarea.value;

	if( currentSelectionStart === currentSelectionEnd ) {
		const textWithSyntax = textarea.value = currentText.substring( 0, currentSelectionStart ) + syntax + currentText.substring( currentSelectionEnd );
		textarea.value = textWithSyntax.substring( 0, currentSelectionStart + selectionStart ) + placeholder + textWithSyntax.substring( currentSelectionStart + selectionStart )

		textarea.focus();
		textarea.selectionStart = currentSelectionStart + selectionStart;
		textarea.selectionEnd = currentSelectionEnd + selectionEnd;
	} else {
		const selectedText = currentText.substring( currentSelectionStart, currentSelectionEnd );
		const withoutSelection = currentText.substring( 0, currentSelectionStart ) + currentText.substring( currentSelectionEnd );
		const textWithSyntax = withoutSelection.substring( 0, currentSelectionStart ) + syntax + withoutSelection.substring( currentSelectionStart );

		// Surround selected text
		textarea.value = textWithSyntax.substring( 0, currentSelectionStart + selectionStart ) + selectedText + textWithSyntax.substring( currentSelectionStart + selectionStart );

		textarea.focus();
		textarea.selectionEnd = currentSelectionEnd + selectionStart + selectedText.length;
	}
}

function output( lines ) {
	outputArea.innerHTML = lines;
}

// -------------------------------------------
// PARSER
// -------------------------------------------

function parse( content ) {
	// Regular Expressions
	const h1 = /^#{1}[^#].*$/gm;
	const h2 = /^#{2}[^#].*$/gm;
	const h3 = /^#{3}[^#].*$/gm;
	const bold = /\*\*[^\*\n]+\*\*/gm;
	const italics = /[^\*]\*[^\*\n]+\*/gm;
	const link = /\[[\w|\(|\)|\s|\*|\?|\-|\.|\,]*(\]\(){1}[^\)]*\)/gm;
	const lists = /^((\s*((\*|\-)|\d(\.|\))) [^\n]+))+$/gm;
	const unorderedList = /^[\*|\+|\-]\s.*$/;
	const unorderedSubList = /^\s\s\s*[\*|\+|\-]\s.*$/;
	const orderedList = /^\d\.\s.*$/;
	const orderedSubList = /^\s\s+\d\.\s.*$/;

	// Example: # Heading 1
	if( h1.test( content ) ) {
		const matches = content.match( h1 );

		matches.forEach( element => {
			const extractedText = element.slice( 1 );
			content = content.replace( element, '<h1>' + extractedText + '</h1>' );
		} );
	}

	// Example: # Heading 2
	if( h2.test( content ) ) {
		const matches = content.match( h2 );

		matches.forEach( element => {
			const extractedText = element.slice( 2 );
			content = content.replace( element, '<h2>' + extractedText + '</h2>' );
		} );
	}

	// Example: # Heading 3
	if( h3.test( content ) ) {
		const matches = content.match( h3 );

		matches.forEach( element => {
			const extractedText = element.slice( 3 );
			content = content.replace( element, '<h3>' + extractedText + '</h3>' );
		} );
	}

	// Example: **Bold**
	if( bold.test( content ) ) {
		const matches = content.match( bold );

		matches.forEach( element => {
			const extractedText = element.slice( 2, -2 );
			content = content.replace( element, '<strong>' + extractedText + '</strong>' );
		} );
	}

	// Example: *Italic*
	if( italics.test( content ) ) {
		const matches = content.match( italics );

		matches.forEach( element => {
			const extractedText = element.slice( 2, -1 );
			content = content.replace( element, ' <em>' + extractedText + '</em>' );
		} );
	}

	// Example: [I'm an inline-style link](https://www.google.com)
	if( link.test( content ) ) {
		const links = content.match( link );

		links.forEach( element => {
			const text = element.match( /^\[.*\]/ )[ 0 ].slice( 1, -1 );
			const url = element.match( /\]\(.*\)/ )[ 0 ].slice( 2, -1 );

			content = content.replace( element, '<a href="' + url + '">' + text + '</a>' );
		} );
	}
	// Example: ![I'm An Image](http://someimage.com)
	if( link.test( content ) ) {
		const links = content.match( link );

		links.forEach( element => {
			const text = element.match( /^\[.*\]/ )[ 0 ].slice( 1, -1 );
			const url = element.match( /\]\(.*\)/ )[ 0 ].slice( 2, -1 );

			content = content.replace( element, '<a href="' + url + '">' + text + '</a>' );
		} );
	}

	if( lists.test( content ) ) {
		const matches = content.match( lists );

		matches.forEach( list => {
			const listArray = list.split( '\n' );

			const formattedList = listArray.map( ( currentValue, index, array ) => {
				if( unorderedList.test( currentValue ) ) {
					currentValue = '<li>' + currentValue.slice( 2 ) + '</li>';

					if( !  unorderedList.test( array[ index - 1 ] ) && ! unorderedSubList.test( array[ index - 1 ] ) ) {
						currentValue = '<ul>' + currentValue;
					}

					if( !  unorderedList.test( array[ index + 1 ] )  &&  ! unorderedSubList.test( array[ index + 1 ] ) ) {
						currentValue = currentValue + '</ul>';
					}

					if( unorderedSubList.test( array[ index + 1 ] ) || orderedSubList.test( array[ index + 1 ] ) ) {
						currentValue = currentValue.replace( '</li>', '' );
					}
				}

				if( unorderedSubList.test( currentValue ) ) {
					currentValue = currentValue.trim();
					currentValue = '<li>' + currentValue.slice( 2 ) + '</li>';

					if( ! unorderedSubList.test( array[ index - 1 ] ) ) {
						currentValue = '<ul>' + currentValue;
					}

					if( ! unorderedSubList.test( array[ index + 1 ] ) && unorderedList.test( array[ index + 1 ] ) ) {
						currentValue = currentValue + '</ul></li>';
					}

					if( ! unorderedSubList.test( array[ index + 1 ] ) && ! unorderedList.test( array[ index + 1 ] ) ) {
						currentValue = currentValue + '</ul></li></ul>';
					}
				}

				if( orderedList.test( currentValue ) ) {
					currentValue = '<li>' + currentValue.slice( 2 ) + '</li>';

					if( ! orderedList.test( array[ index - 1 ] ) && ! orderedSubList.test( array[ index - 1 ] ) ) {
						currentValue = '<ol>' + currentValue;
					}

					if( ! orderedList.test( array[ index + 1 ] ) && ! orderedSubList.test( array[ index + 1 ] ) && ! orderedList.test( array[ index + 1 ] ) ) {
						currentValue = currentValue + '</ol>';
					}

					if( unorderedSubList.test( array[ index + 1 ] ) || orderedSubList.test( array[ index + 1 ] ) ) {
						currentValue = currentValue.replace( '</li>', '' );
					}
				}

				if( orderedSubList.test( currentValue ) ) {
					currentValue = currentValue.trim();
					currentValue = '<li>' + currentValue.slice( 2 ) + '</li>';

					if( ! orderedSubList.test( array[ index - 1 ] ) ) {
						currentValue = '<ol>' + currentValue;
					}

					if( orderedList.test( array[ index + 1 ] ) && ! orderedSubList.test( array[ index + 1 ] ) ) {
						currentValue = currentValue + '</ol>';
					}

					if( ! orderedList.test( array[ index + 1 ] ) && ! orderedSubList.test( array[ index + 1 ] ) ) {
						currentValue = currentValue + '</ol></li></ol>';
					}
				}

				return currentValue;
			} ).join( '' );

			console.log( formattedList );
			content = content.replace( list, formattedList );
		} );
	}

	return content.split( '\n' ).map( line => {
		if( ! h1.test( line ) && ! h2.test( line ) && ! h3.test( line ) && ! unorderedList.test( line ) && ! unorderedSubList.test( line ) && ! orderedList.test( line ) && ! orderedSubList.test( line ) ) {
			return line.replace( line, '<p>' + line + '</p>' );
		}
	} ).join( '' );
}
function textwrite(){
      var linestuff = JSON.stringify(textarea.value);
      document.write(linestuff)
    }
function previewfunc(){
	document.getElementById('input-area').style.display ="none"
	document.getElementById('container').style.display ="block"
	document.getElementById('preview').style.display ="none"
	document.getElementById('editor').style.display ="inline-block"
	document.getElementById('showcase').style.display ="block"
	what(textarea.value);
}
function editfunc(){
	document.getElementById('input-area').style.display ="block"
	document.getElementById('container').style.display ="none"
	document.getElementById('preview').style.display ="inline-block"
	document.getElementById('editor').style.display ="none"
	document.getElementById('showcase').style.display ="none"
}