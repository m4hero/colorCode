
var fileValue
var pic64
var pic

 var fileInput = document.querySelector('#visiblebutton');
    fileInput.addEventListener('change', function prepareUpload(event)
{
  files = event.target.files;
  pic = files[0];
  pic64 = btoa(pic)
 



  $.ajax({
        url: "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyADkh9ZzP9FqHXjLawyzQU4z78h-4pL8JA",
        type: 'POST',
        data: pic.data,
        body: dataBody,
        processData: false,
        contentType: false,
        success: function(data) {
             console.log("success")
	}
    });

  
} )



var dataBody = {
  "requests":[     
    {
      "image":{
        "content":pic64
      },
      "features":[
        {
          "type":"FACE_DETECTION",
          "maxResults":10
        }
      ]
    }
  ]
}

