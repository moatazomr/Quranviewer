 alert('fff');
(function() {
  var canvas = this.__canvas = new fabric.Canvas('c');
  fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';
  fabric.Object.prototype.transparentCorners = false;

  fabric.loadSVGFromURL('all.xml', function(objects, options) {
  
   var obj = fabric.util.groupSVGElements(objects, options);
  canvas.add(obj).renderAll();
  
  return;
  
    var obj = fabric.util.groupSVGElements(objects, options);
    obj.scale(0.5);

    // load shapes
    for (var i = 1; i < 4; i++) {
      for (var j = 1; j < 4; j++) {
        obj.clone(function(i, j) {
          return function(clone) {
            clone.set({
              left: i * 200 - 100,
              top: j * 200 - 100
            });
            canvas.add(clone);
            animate(clone);
          };
        }(i, j));
      }
    }
  });

  function animate(obj) {
    obj.setAngle(0).animate({ angle: 360 }, {
      duration: 3000,
      onComplete: function(){ animate(obj) },
      easing: function(t, b, c, d) { return c*t/d + b }
    });
  }

  function cache() {
    canvas.forEachObject(function(obj, i) {
      if (obj.type === 'image') return;

      var scaleX = obj.scaleX;
      var scaleY = obj.scaleY;

      canvas.remove(obj);
      obj.scale(1).cloneAsImage(function(clone) {
        clone.set({
          left: obj.left,
          top: obj.top,
          scaleX: scaleX,
          scaleY: scaleY
        });
        canvas.insertAt(clone, i);
//        animate(clone);
      });
    });
  }

  (function render(){
    canvas.renderAll();
    fabric.util.requestAnimFrame(render);
  })();

  document.getElementById('cache').onclick = cache;
})();
