var resultObj;
var resultArr;
var doc;
var title;
var frame;
var srcNode;
var destDocument;
var modal;
var newNode;

var CV_URL = 'https://vision.googleapis.com/v1/images:annotate?key=' + window.apiKey;

$(function() {
  $('#fileform').on('submit', uploadFiles);
});

function uploadFiles(event) {
  $('.loader').css('display', 'block');
  event.preventDefault(); // Prevent the default form post

  // Grab the file and asynchronously convert to base64.
  var file = $('#fileform [name=fileField]')[0].files[0];
  var reader = new FileReader();
  reader.onloadend = processFile;
  reader.readAsDataURL(file);
}

function processFile(event) {
  var content = event.target.result;
  sendFileToCloudVision(content.replace('data:image/jpeg;base64,', ''));
}

function sendFileToCloudVision(content) {
  var type = $('#fileform [name=type]').val();

  var request = {
    requests: [
      {
        image: {
          content: content
        },
        features: [
          {
            type: type,
            maxResults: 200
          }
        ]
      }
    ]
  };

  $('#results').text('Loading...');
  $.post({url: CV_URL, data: JSON.stringify(request), contentType: 'application/json'}).fail(function(jqXHR, textStatus, errorThrown) {
    $('#results').text('ERRORS: ' + textStatus + ' ' + errorThrown);
  }).success(function() {
    $('.loader').css('animation-play-state', 'paused');
  }).done(displayJSON);

}

function displayJSON(data) {
  $("#inputBtn").attr("value", "File Submitted");
  var contents = JSON.stringify(data, null, 4);

  $('#results').text(contents);

  var y = JSON.parse(contents);
  var x = y.responses;
  var z = x[0];
  var q = z.fullTextAnnotation;
  resultObj = q.text;

}


function makeDocument() {
  // window.open('popup.html', 'width=150, height=300');

  // frame = document.getElementById("theFrame");
  doc = document.implementation.createHTMLDocument();

  // $(doc).find("head").remove()

  // $("html").addClass("mainHtml")
  resultArr = resultObj.split("\n");

  // function buildHeadElement(){
  // var head = doc.createElement('head');
  // doc.appendChild(doc);
  // }
  function buildTitleElement() {
    if (title === undefined) {
      title = doc.createElement("title");
      doc.head.appendChild(title);
      title.innerText = "Title Placeholder";
    }
  }

  function buildParaElement() {
    var p = doc.createElement("p");
    doc.body.appendChild(p);
    p.innerText = "Paragraph Placeholder";
  }

  function buildHeaderOneElement() {
    var h1 = doc.createElement("h1");
    doc.body.appendChild(h1);
    h1.innerText = "Header Placeholder";
  }

  function buildHeaderTwoElement() {
    var h2 = doc.createElement("h2");
    doc.body.appendChild(h2);
    h2.innerText = "Header Placeholder";
  }

  function buildImageElement() {
    var img = doc.createElement("img");
    doc.body.appendChild(img);
    img.src = "http://www.techonline.com/img/tmp/logo-placeholder.png";
  }

  function buildBreakElement() {
    var br = doc.createElement("br");
    doc.body.appendChild(br);
  }

  function buildCenterElement() {
    var center = doc.createElement("center");
    doc.body.appendChild(center);
  }

  function buildBoldElement() {
    var bold = doc.createElement("b");
    doc.body.appendChild(bold);
  }

  function buildItalicElement() {
    var italic = doc.createElement("i");
    doc.body.appendChild(italic);
  }

  function generatePageElements(resultArr) {
    for (var i = 0; i < resultArr.length; i++) {
      // if(resultArr[i].includes("head")){
      //   buildHeadElement();

      if ((resultArr[i].includes("title") || resultArr[i].includes("TITLE")) && (resultArr[i].includes("/") !== true)) {
        buildTitleElement();
      } else if ((resultArr[i].includes("p") || resultArr[i].includes("P")) && ((resultArr[i].includes("/") !== true))) {
        buildParaElement();
      } else if ((resultArr[i].includes("h1") || resultArr[i].includes("H1")) && ((resultArr[i].includes("/") !== true))) {
        buildHeaderOneElement();
      } else if ((resultArr[i].includes("h2") || resultArr[i].includes("H2")) && ((resultArr[i].includes("/") !== true))) {
        buildHeaderTwoElement();
      } else if ((resultArr[i].includes("img") || resultArr[i].includes("IMG")) && ((resultArr[i].includes("/") !== true))) {
        buildImageElement();
      } else if ((resultArr[i].includes("br") || resultArr[i].includes("BR")) && ((resultArr[i].includes("/") !== true))) {
        buildBreakElement();
      } else if ((resultArr[i].includes("center") || resultArr[i].includes("CENTER")) && ((resultArr[i].includes("/") !== true))) {
        buildCenterElement();
      } else if ((resultArr[i].includes("b") || resultArr[i].includes("B")) && ((resultArr[i].includes("/") !== true))) {
        buildBoldElement();
      } else if ((resultArr[i].includes("i") || resultArr[i].includes("I")) && ((resultArr[i].includes("/") !== true))) {
        buildItalicElement();
      }

    }
  }
  generatePageElements(resultArr);

  // Copy the new HTML document into the frame

  // destDocument = frame.contentDocument;
  srcNode = doc.documentElement;
  //  newNode = destDocument.importNode(srcNode, true);
  //
  // destDocument.replaceChild(newNode, destDocument.documentElement);

  // -----------------------------------------------
  // Get the modal
  modal = document.getElementById('myModal');

  // Get the button that opens the modal
  var btn = document.getElementById("myBtn");

  // Get the <span> element that closes the modal
  // var span = document.getElementsByClassName("close")[0];

  // When the user clicks the button, open the modal
  btn.onclick = function() {
    modal.style.display = "block";
  };

  // When the user clicks on <span> (x), close the modal
  // span.onclick = function() {
  //   modal.style.display = "none";
  // };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  $('#myModal .modal-content').html(srcNode);

}
