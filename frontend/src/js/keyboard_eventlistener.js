document.addEventListener('keydown', function(event) {
    if (event.key === 'Tab' || event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        let focusableElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
        let firstElement = focusableElements[0];
        let lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
        }
    }
});

