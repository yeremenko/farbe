//Learning JavaScript while creating a list of colors used on a web page
var arrayUnique = function(a) {
    return a.reduce(function(p, c) {
        if (p.indexOf(c) < 0) p.push(c);
        return p;
    }, []);
};

var getFileContents = function (selectedFile) {
	var reader = new FileReader();												//Empty array for colors


	reader.onload 	 = function(contents) {
		var fileContents = contents.target.result;								//Stores file contents

		var hexMatch 	 = /#[0-9a-f]{3,6}( *)/gi;								//RegEx searches file for starting #hex, ends with ;, 
		var hexGroup 	 = fileContents.toUpperCase().match(hexMatch);			//Runs file contents through Regex and uppercases

		var rgbMatch	 = /(rgb\([^)]*\))/gi;									//RegEx matches rgb
		var rgbGroup 	 = fileContents.toUpperCase().match(rgbMatch);			//Runs file contents through Regex and uppercases

		var rgbaMatch	 = /(rgba\([^)]*\))/gi;									//RegEx matches rgb
		var rgbaGroup 	 = fileContents.toUpperCase().match(rgbaMatch);			//Runs file contents through Regex and uppercases

		//var wordMatch	 = / /gi;												//RegEx matches word
		//var wordGroup  = fileContents.match(wordMatch);						//Runs file contents through Regex

		var colorList	= arrayUnique(hexGroup.concat(rgbGroup).concat(rgbaGroup));			//Combine all matched groups into colorList array
		var $colorListUl = $('#color-list');									//Div where colors will be added to jQuery selector


		//add each matched color to #colorList UL
		$(colorList).each(function (i, color) {	
			var $li = $('<li>');
			
			$li.addClass( 'color-wrapper' );
			$li.css( 'background-color' , color );
			$li.html( color );
			$colorListUl.append( $li );
		});

		console.log('HEX' , hexGroup);
		console.log('RGB' , rgbGroup);
		console.log('RGBA' , rgbaGroup);
		// console.log('WORD' , wordGroup);

	};
	reader.readAsText(selectedFile);											//Gets file contents into string

};


var  isFileCss = function(selectedFileName, selectedFile) {
	var splitFileName 	= selectedFileName.split('.');									//splits file name based on "."
	var selectedFileExt	= splitFileName[splitFileName.length-1];						//get last index of array

	//Check if uploaded file is a CSS file
	if (selectedFileExt != "css") {
		return false
	} else {
		return true
	};
};


$(document).ready(function(){

	// Check for the various File API support.
	if (window.File && window.FileReader && window.FileList && window.Blob) {
	  // alert('Great success! All the File APIs are supported.');
	} else {
	  alert('The File APIs are not fully supported in this browser.');
	}

	//Event when user uploads file
	$('#searchField').on('change' , function(){
        var selectedFile 		= this.files[0],
			selectedFileName	= selectedFile.name;												//store file name

		console.log('File Name: ' + selectedFileName);
		console.log('File Size: ' + selectedFile.size + ' bytes');

		//make sure uploaded file is a css
		if (isFileCss(selectedFileName)){
			getFileContents(selectedFile);
		} else {
			alert("Not css, try again!")
		};

	});

});
