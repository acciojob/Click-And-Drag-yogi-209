const container = document.querySelector('.items');
const items = document.querySelectorAll('.item');
items.forEach(item => {
  item.addEventListener('mousedown', function(e) {
    const rect = item.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const shiftX = e.clientX - rect.left;
    const shiftY = e.clientY - rect.top;
    item.style.position = 'absolute';
    function move(e) {
      let left = e.clientX - containerRect.left - shiftX;
      let top = e.clientY - containerRect.top - shiftY;

      const maxLeft = container.clientWidth - item.offsetWidth;
      const maxTop = container.clientHeight - item.offsetHeight;

      if (left < 0) left = 0;
      if (top < 0) top = 0;

      if (left > maxLeft) left = maxLeft;
      if (top > maxTop) top = maxTop;

      item.style.left = left + 'px';
      item.style.top = top + 'px';
    }

    function stop() {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', stop);
    }

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', stop);
  });

  item.ondragstart = function() {
    return false;
  };

});
