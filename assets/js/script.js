document.addEventListener('DOMContentLoaded', () => {
    // 2. Registro: Validación y habilitación de botón
    const registroForm = document.getElementById('registro-form');
    if (registroForm) {
        const termsCheckbox = document.getElementById('terms');
        const submitBtn = document.getElementById('submit-btn');

        // Habilitar el botón de envío solo si el checkbox está marcado
        termsCheckbox.addEventListener('change', (e) => {
            submitBtn.disabled = !e.target.checked;
        });

        // Verificar que todos los campos estén completos antes de enviar
        registroForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Evitar envío por defecto para la demostración
            
            const inputs = registroForm.querySelectorAll('input:not([type="checkbox"])');
            let allFilled = true;
            
            inputs.forEach(input => {
                if (input.value.trim() === '') {
                    allFilled = false;
                }
            });

            if (allFilled) {
                // Como no usamos required, si se llena el campo de correo y tiene pattern, 
                // el navegador hará su validación al intentar hacer submit, pero si queremos ser estrictos:
                const emailInput = document.getElementById('email');
                const regex = new RegExp(emailInput.pattern);
                if (emailInput.value !== '' && !regex.test(emailInput.value)) {
                    alert('El formato del correo electrónico es inválido.');
                    return;
                }
                
                alert('Formulario enviado correctamente. ¡Registro exitoso!');
                registroForm.reset();
                submitBtn.disabled = true;
            } else {
                alert('Por favor, complete todos los campos.');
            }
        });
    }

    // 3. Quiénes somos: Mostrar/Ocultar información
    const btnVerMas = document.getElementById('btn-ver-mas');
    if (btnVerMas) {
        const extraInfo = document.getElementById('extra-info');
        btnVerMas.addEventListener('click', () => {
            if (extraInfo.classList.contains('hidden')) {
                extraInfo.classList.remove('hidden');
                btnVerMas.textContent = 'Ocultar información';
            } else {
                extraInfo.classList.add('hidden');
                btnVerMas.textContent = 'Ver más';
            }
        });
    }

    // 4. Catálogo: Simular agregar al carrito
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    if (addToCartBtns.length > 0) {
        let cartCount = 0;
        const cartCounter = document.getElementById('cart-counter');
        
        addToCartBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                cartCount++;
                if (cartCounter) {
                    cartCounter.textContent = `(${cartCount})`;
                }
                alert('Producto agregado al carrito exitosamente.');
            });
        });
    }

    // 5. Carrito de compra: Recalcular total
    const cartInputs = document.querySelectorAll('.cart-qty');
    if (cartInputs.length > 0) {
        const totalElement = document.getElementById('cart-total');
        
        const calculateTotal = () => {
            let total = 0;
            cartInputs.forEach(input => {
                const price = parseFloat(input.dataset.price);
                const qty = parseInt(input.value) || 0; // si está vacío será 0
                total += price * qty;
            });
            totalElement.textContent = total.toFixed(2);
        };

        cartInputs.forEach(input => {
            input.addEventListener('input', calculateTotal);
            // Prevenir entradas no numéricas adicionales como 'e' o '-'
            input.addEventListener('keydown', (e) => {
                if (['e', 'E', '-', '+', '.'].includes(e.key)) {
                    e.preventDefault();
                }
            });
        });
    }

    // 6. Búsqueda de productos: Mostrar resultados
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = document.getElementById('search-input').value;
            const resultsArea = document.getElementById('search-results');
            const fakeProducts = document.getElementById('fake-products');
            
            if (query.trim() !== '') {
                resultsArea.textContent = `Resultados para la búsqueda de "${query}"`;
                fakeProducts.classList.remove('hidden');
            } else {
                resultsArea.textContent = 'Por favor, ingrese un término de búsqueda válido.';
                fakeProducts.classList.add('hidden');
            }
        });
    }
});
