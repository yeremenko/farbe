//Learning JavaScript while creating a list of colors used on a web page

var getFileContents = function (selectedFile) {
  var reader = new FileReader();

  // internall maybe:

// var contentsObj = {/* whatver */ };
//   FileReader.onload(contentsObj)

  reader.onload = function(contents) {
  var fileContents = contents.target.result;

  var hexMatch  = /#[0-9a-f]{3,6}( *)/gi;
  var hexGroup  = fileContents.toUpperCase().match(hexMatch);

  var rgbMatch  = /(rgb\([^)]*\))/gi;
  var rgbGroup  = fileContents.toUpperCase().match(rgbMatch);

  var rgbaMatch = /(rgba\([^)]*\))/gi;
  var rgbaGroup = fileContents.toUpperCase().match(rgbaMatch);
  
  var colorList	= hexGroup.concat(rgbGroup).concat(rgbaGroup);
  // $.unique(colorList);
  // console.log(colorList);


  var $colorListUl = $('#color-list');


    // $.fn.each = function (cb) {

    //   // iterate over some stuff.

    //   $(this); // => [elem1, elem2, elem3, ...]
    //   var idx = 0, currentElem;

    //   $(this).forEach(function (elem) {
    //     cb(idx, elem);
    //     idx += 1;
    //   });

    // };



    //add each matched color to #colorList UL
    $(colorList).each(function (i, color) {	
      var $li = $('<li>');
			
      $li.addClass( 'color-wrapper' );
      $li.css( 'background-color' , color );
      $li.css( 'color' , color );
      $li.html( color );
      $li.appendTo($colorListUl);
    });

    };
    reader.readAsText(selectedFile);
};

//Check if uploaded file is a CSS file
var isFileCss = function(selectedFileName, selectedFile) {
  var splitFileName   = selectedFileName.split('.');
  var selectedFileExt	= splitFileName[splitFileName.length-1];

  if (selectedFileExt != "css") {
    return false;
  } else {
    return true;
  }
};

//Give section a pattern background to see color's transparency
var listBG = function(sectionID){
  var bgPattern = "img/pat-bg.jpg";
  $(sectionID).css('background-image', 'url(' + bgPattern + ')');
};

var adjustHeight   = function () {
  var $huge        = $("#huge"),
      windowHeight = $(window).height();

    $huge.height(windowHeight - 120);
};

var changeBtnValue = function() {
  $('.urlSearch-label').text('Success!');
};

$(document).ready(function(){

  adjustHeight(); 

  // Check for the various File API support.
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    // alert('Great success! All the File APIs are supported.');
  } else {
    alert('The File APIs are not fully supported in this browser.');
  }

  //Event when user uploads file
  $('#searchField').on('change' , function(){
    var selectedFile = this.files[0],
    selectedFileName = selectedFile.name;

    // console.log('File Name: ' + selectedFileName);
    // console.log('File Size: ' + selectedFile.size + ' bytes');

		//make sure uploaded file is a css
		if (isFileCss(selectedFileName)){
			getFileContents(selectedFile);
      // listBG('#color-list-wrapper');
      changeBtnValue();

		} else {
			alert("Not css, try again!");
		}

	});

  $(window).on('resize', adjustHeight);

});
