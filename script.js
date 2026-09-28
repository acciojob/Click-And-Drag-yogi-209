const container = document.querySelector('.items');
const items = document.querySelectorAll('.item');

items.forEach((item) => {
  item.style.position = 'absolute';

  item.addEventListener('mousedown', (e) => {
    e.preventDefault();

    // Calculate initial click offset inside the element
    const rect = item.getBoundingClientRect();
    const shiftX = e.clientX - rect.left;
    const shiftY = e.clientY - rect.top;

    function moveAt(clientX, clientY) {
      const containerRect = container.getBoundingClientRect();

      let newLeft = clientX - shiftX - containerRect.left;
      let newTop = clientY - shiftY - containerRect.top;

      // Keep element strictly within container bounds
      const maxLeft = containerRect.width - item.offsetWidth;
      const maxTop = containerRect.height - item.offsetHeight;

      newLeft = Math.max(0, Math.min(newLeft, maxLeft));
      newTop = Math.max(0, Math.min(newTop, maxTop));

      item.style.left = `${newLeft}px`;
      item.style.top = `${newTop}px`;
    }

    function onMouseMove(event) {
      moveAt(event.clientX, event.clientY);
    }

    document.addEventListener('mousemove', onMouseMove);

    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', onMouseMove);
    }, { once: true });
  });

  item.ondragstart = () => false;
});