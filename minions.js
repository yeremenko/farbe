//learning JavaScript while creating a list of colors used on a web page
$(document).ready(function(){


	// Check for the various File API support.
	if (window.File && window.FileReader && window.FileList && window.Blob) {
	  // alert('Great success! All the File APIs are supported.');
	} else {
	  alert('The File APIs are not fully supported in this browser.');
	}

	//Event when user uploads file
	$('#searchField').on('change' , function(){
        var selectedFile = this.files[0];
        alert('Successfully uploaded' + ' ' + selectedFile.name);
        // alert('Successfully Uploaded' + ' ' + selectedFile.size);
	});

	//find colors in css files
	function findColors() {

		// $('p').on('click' , function() {
		// 	var url = this.text();

		// 	alert(url);
		// });

	};

});




//find inline colors