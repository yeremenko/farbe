//Learning JavaScript while creating a list of colors used on a web page

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

        	//make sure uploaded file is a css
        	function checkFileExt () {
        		var splitFileName 	= selectedFileName.split('.');									//splits file name based on "."
        		var selectedFileExt	= splitFileName[splitFileName.length-1];						//get last index of array

				//Check if uploaded file is a CSS file
				if (selectedFileExt != "css") {
					console.log("This is NOT a CSS file!");
				} else {
       	 			console.log('File Name: ' + selectedFileName);
       	 			console.log('File Size: ' + selectedFile.size + ' bytes');

       	 			//Function that gets contents from inside file
       	 			function getFileContents () {
		        		var reader = new FileReader();						
													//Empty array for colors


		        		reader.onload 	 = function(contents) {
		        			var fileContents = contents.target.result;								//Stores file contents

		        			var hexMatch 	 = /#[0-9a-f]{3,6}( *)/gi;								//RegEx searches file for starting #hex, ends with ;, 
							var hexGroup 	 = fileContents.match(hexMatch);						//Runs file contents through Regex

		        			var rgbMatch	 = /(rgb\([^)]*\))/gi;									//RegEx matches rgb
							var rgbGroup 	 = fileContents.match(rgbMatch);						//Runs file contents through Regex

							var rgbaMatch	 = /(rgba\([^)]*\))/gi;									//RegEx matches rgb
							var rgbaGroup 	 = fileContents.match(rgbaMatch);						//Runs file contents through Regex

							//var wordMatch	 = / /gi;												//RegEx matches word
							//var wordGroup  = fileContents.match(wordMatch);						//Runs file contents through Regex

							var colorList	= hexGroup.concat(rgbGroup).concat(rgbaGroup);			//Combine all matched groups into colorList array
							var $colorListUl = $('#colorList');											//Name of DOM div where colors will be added


							//add each matched color to #colorList UL
							$(colorList).each(function (i, color) {	
								$('<li>' + color + '</li>').appendTo($colorListUl);
							});

							console.log('HEX' , hexGroup);
							console.log('RGB' , rgbGroup);
							console.log('RGBA' , rgbaGroup);
							// console.log('WORD' , wordGroup);

		        		};
		        		reader.readAsText(selectedFile);											//Gets file contents into string

		        	};

		        	getFileContents();

				};
        	};

        	checkFileExt();

	});

});