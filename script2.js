// Smooth animation on page load
// window.addEventListener('load', () => {
//     document.body.style.opacity = '1';
// });

// Contact form demo
const form = document.querySelector('.contact-form');

form.addEventListener('submit', async(e) => {
    e.preventDefault();
    const formData = {
        name:form.querySelector('input[name="name"]').value,
        email:form.querySelector('input[name="email"]').value,
        message:form.querySelector('textarea[name="message"]').value
    };
    const response = await fetch('http://localhost:3000/contact', {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });
    const result = await response.json();

    alert(result.message);
    form.reset();
});
