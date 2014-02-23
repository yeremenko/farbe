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
        	selectedFileName	= selectedFile.name;							//store file name

        	//make sure uploaded file is a css
        	function checkFileExt () {
        		var splitFileName 	= selectedFileName.split(/[\s.]+/);
        		var selectedFileExt	= splitFileName[splitFileName.length-1];	//splits file name based on "."
				// var checkExt		= /\.css$/i; 								//css extention using regex

				if (selectedFileExt != "css") {
					console.log("This is NOT a CSS file!");
				} else {
       	 			console.log('Successfully Uploaded: ' + selectedFileName);
       	 			console.log('File Size: ' + selectedFile.size);
				};
        	};

        	checkFileExt();
	});

	//Find colors in css files
	function findColors() {

	};

});