var image = document.getElementById('image');
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
ctx.drawImage(image, 
              0, 0, image.width, image.height,
              0, 0, canvas.width, canvas.height);

const scale = canvas.width / image.width;

function detect() {
  if (window.FaceDetector == undefined) {
    console.error('Face Detection not supported');
    return;
  }
  
  console.log('ignition!');
  var faceDetector = new FaceDetector();
  faceDetector.detect(image)
    .then(faces => {
      console.log('yes');
      // Draw the faces on the <canvas>.
      var ctx = document.getElementById('canvas').getContext("2d");
      ctx.lineWidth = 2;
      ctx.strokeStyle = "red";
      for(var i = 0; i < faces.length; i++) {
        const face = faces[i].boundingBox;
        ctx.rect(Math.floor(face.x * scale), 
                 Math.floor(face.y * scale),
                 Math.floor(face.width * scale), 
                 Math.floor(face.height * scale));
        ctx.stroke();
      }

      // Add the faces as strings to the <footer>
      var footer = document.getElementsByTagName('footer')[0];
      footer.innerHTML = 
          '<p>Detected ' + faces.length + ' faces</p><ul>';
      for(var i = 0; i < faces.length; i++) {
        const face = faces[i].boundingBox;
        footer.innerHTML += 
            '<li>@ (' + face.x + ',' + face.y + '), size ' + 
            face.width + 'x' + face.height + '</li>';
      }
      footer.innerHTML += '</ul>';
  
    }).catch((e) => {
      console.log('no');
      console.error("Boo, Face Detection failed: " + e);
    })
}