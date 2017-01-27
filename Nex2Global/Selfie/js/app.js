$('.draggable').draggable();

$('.resizable').resizable({
    aspectRatio: true,
    handles: 'ne, se, sw, nw'
});

$("#drag").draggable({ containment: [-100, -119, 0, 0], scroll: false });           

$(document).on('mouseover', '.rot', function(){
    var tc = $(this);
    tc.rotatable({
        handle:tc.children('.rotate.left, .rotate.right')
    });
    return true;
});