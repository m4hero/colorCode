var resultObj;
var resultArr;
var doc;
var title;



var CV_URL = 'https://vision.googleapis.com/v1/images:annotate?key=' + window.apiKey;

$(function () {
  $('#fileform').on('submit', uploadFiles);
});

function uploadFiles (event) {
  event.preventDefault(); // Prevent the default form post

  // Grab the file and asynchronously convert to base64.
  var file = $('#fileform [name=fileField]')[0].files[0];
  var reader = new FileReader();
  reader.onloadend = processFile;
  reader.readAsDataURL(file);
}

function processFile (event) {
  var content = event.target.result;
  sendFileToCloudVision(content.replace('data:image/jpeg;base64,', ''));
}

function sendFileToCloudVision (content) {
  var type = $('#fileform [name=type]').val();

  var request = {
    requests: [{
      image: {
        content: content
      },
      features: [{
        type: type,
        maxResults: 200
      }]
    }]
  };

  $('#results').text('Loading...');
  $.post({
    url: CV_URL,
    data: JSON.stringify(request),
    contentType: 'application/json'
  }).fail(function (jqXHR, textStatus, errorThrown) {
    $('#results').text('ERRORS: ' + textStatus + ' ' + errorThrown);
  }).done(displayJSON);
}

function displayJSON (data) {
  var contents = JSON.stringify(data, null, 4);
  
  $('#results').text(contents);


  var y = JSON.parse(contents);
  var x = y["responses"];
  var z = x[0];
  var q = z["fullTextAnnotation"]
  resultObj = q["text"];
  
  
  var evt = new Event('results-displayed');
  evt.results = contents;
  document.dispatchEvent(evt);
  ;

}


  function makeDocument() {
  var frame = document.getElementById("theFrame");
          
  var doc = document.implementation.createHTMLDocument();
  // $(doc).find("head").remove()
 
  // $("html").addClass("mainHtml")
  resultArr =  resultObj.split("\n") 
  
  
  // function buildHeadElement(){
  // var head = doc.createElement('head');
  // doc.appendChild(doc);
  // }
function buildTitleElement(){
  if (title == undefined) {
  title = doc.createElement("title");
    doc.head.appendChild(title);
    title.innerText = "Title Placeholder";
}}

function buildParaElement(){
   var p = doc.createElement("p");
    doc.body.appendChild(p);
    p.innerText = "Paragraph Placeholder";
}

function buildHeaderTwoElement(){
    var h2 = doc.createElement("h2");
    doc.body.appendChild(h2);
    p.innerText = "Header Placeholder";
}

function buildImageElement(){
  var img = doc.createElement("img");
    doc.body.appendChild(img);
    img.src= "http://www.techonline.com/img/tmp/logo-placeholder.png";
}

function buildBreakElement(){
  var br = doc.createElement("br");
    doc.body.appendChild(br);
}

function buildCenterElement(){
  var center = doc.createElement("center");
    doc.body.appendChild(center);
}

function buildBoldElement(){
    var bold = doc.createElement("b");
    doc.body.appendChild(bold);
}

function buildItalicElement(){
  var italic = doc.createElement("i");
    doc.body.appendChild(italic);
}



function generatePageElements(resultArr){
  for(var i=0;i<resultArr.length;i++){
    // if(resultArr[i].includes("head")){
    //   buildHeadElement();
    if(resultArr[i].includes("title")){
      buildTitleElement();
    }else if(resultArr[i].includes("p")){
      buildParaElement();
    }else if(resultArr[i].includes("h2")){
      buildHeaderTwoElement();
    }else if(resultArr[i].includes("img")){
      buildImageElement();
    }else if(resultArr[i].includes("br")){
      buildBreakElement();
    }else if(resultArr[i].includes("center")){
      buildCenterElement();
    }else if(resultArr[i].includes("b")){
      buildBoldElement();
    }else if(resultArr[i].includes("i")){
      buildItalicElement();
    }
    
  }
}
generatePageElements(resultArr);


// function checkforBasics(resultArr){
//   var countup = 0;
// for(var i=0;i<resultArr.length;i++){
//   if(resultArr[i].includes("head")){
//     countup += 1;
//   }else if(resultArr[i].includes("body")){
//     countup +=1;
//   }else if(resultArr[i].includes("html")){
//     countup +=1;
//   }else if(countup === 3){
//     generatePageElements(resultArr);
//   }
// }
  
// checkforBasics(resultArr);

  //  var p = doc.createElement("p");
 
  
  //  p.innerText = resultObj;
  
  // try {
  //   doc.body.appendChild(p);
  // } catch(e) {
  //   console.log(e);
  // }

  // Copy the new HTML document into the frame

  var destDocument = frame.contentDocument;
  var srcNode = doc.documentElement;
  var newNode = destDocument.importNode(srcNode, true);
  
  destDocument.replaceChild(newNode, destDocument.documentElement);
  }