import { services } from './services-map.js';

document.addEventListener('DOMContentLoaded', () => {
    const productCards = document.querySelectorAll('.product-card');
    const servicesContainer = document.getElementById('services-container');
    const servicesList = document.getElementById('services-list');

    productCards.forEach(card => {
        card.addEventListener('click', () => {
            const productKey = card.getAttribute('data-product');
            const selectedServices = services[productKey];

            if (!selectedServices) return;

            // 1. Quitar clase activa de todas las tarjetas
            productCards.forEach(c => c.classList.remove('active'));

            // 2. Activar visualmente la tarjeta clickeada
            card.classList.add('active');

            // 3. Mostrar servicios
            servicesList.innerHTML = '';
            servicesContainer.classList.remove('hidden');

            selectedServices.forEach(service => {
                const card = document.createElement('div');
                card.className = 'service-card';
                card.innerHTML = `
            <h4>${service.title}</h4>
            <h5>${service.subtitle}</h5>
            <p>${service.description}</p>
          `;
                servicesList.appendChild(card);
            });

            servicesContainer.scrollIntoView({ behavior: 'smooth' });
        });
    });
});

// BOTONES DE DESPLAZAMIENTO
document.addEventListener('DOMContentLoaded', () => {
    const scrollContainer = document.getElementById('services-list');
    const leftBtn = document.getElementById('scroll-left');
    const rightBtn = document.getElementById('scroll-right');

    const updateScrollButtons = () => {
        if (!scrollContainer) return;

        const scrollLeft = scrollContainer.scrollLeft;
        const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;

        leftBtn.style.display = scrollLeft > 0 ? 'block' : 'none';
        rightBtn.style.display = scrollLeft < maxScrollLeft - 5 ? 'block' : 'none';
    };

    if (leftBtn && rightBtn && scrollContainer) {
        // Mostrar u ocultar botones al hacer scroll
        scrollContainer.addEventListener('scroll', updateScrollButtons);

        // Botones para desplazar
        leftBtn.addEventListener('click', () => {
            scrollContainer.scrollBy({ left: -350, behavior: 'smooth' });
        });

        rightBtn.addEventListener('click', () => {
            scrollContainer.scrollBy({ left: 350, behavior: 'smooth' });
        });

        // Forzar estado correcto después de renderizar servicios
        const observer = new MutationObserver(updateScrollButtons);
        observer.observe(scrollContainer, { childList: true });

        // Ajuste inicial
        updateScrollButtons();
    }
});
