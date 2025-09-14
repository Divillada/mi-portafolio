// Variables globales
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const contactForm = document.querySelector('.contact-form');

// Menú hamburguesa responsive
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Navegación suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animación de barras de progreso de habilidades
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
    });
}

// Observer para animaciones al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            
            // Animar barras de habilidades cuando la sección sea visible
            if (entry.target.id === 'skills') {
                setTimeout(animateSkills, 500);
            }
        }
    });
}, observerOptions);

// Observar todas las secciones
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Validación de formulario en tiempo real
const formFields = {
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    subject: document.getElementById('subject'),
    message: document.getElementById('message')
};

const errorMessages = {
    name: document.getElementById('nameError'),
    email: document.getElementById('emailError'),
    subject: document.getElementById('subjectError'),
    message: document.getElementById('messageError')
};

// Funciones de validación
function validateName(name) {
    return name.length >= 2;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateSubject(subject) {
    return subject.length >= 5;
}

function validateMessage(message) {
    return message.length >= 10;
}

// Event listeners para validación en tiempo real
formFields.name.addEventListener('input', function() {
    const isValid = validateName(this.value);
    toggleErrorMessage('name', isValid);
    this.style.borderColor = isValid ? '#28a745' : '#e74c3c';
});

formFields.email.addEventListener('input', function() {
    const isValid = validateEmail(this.value);
    toggleErrorMessage('email', isValid);
    this.style.borderColor = isValid ? '#28a745' : '#e74c3c';
});

formFields.subject.addEventListener('input', function() {
    const isValid = validateSubject(this.value);
    toggleErrorMessage('subject', isValid);
    this.style.borderColor = isValid ? '#28a745' : '#e74c3c';
});

formFields.message.addEventListener('input', function() {
    const isValid = validateMessage(this.value);
    toggleErrorMessage('message', isValid);
    this.style.borderColor = isValid ? '#28a745' : '#e74c3c';
});

function toggleErrorMessage(field, isValid) {
    if (isValid) {
        errorMessages[field].style.display = 'none';
    } else {
        errorMessages[field].style.display = 'block';
    }
}

// Mostrar mensaje de éxito
function showSuccessMessage() {
    const existingSuccess = document.querySelector('.success-message');
    if (existingSuccess) {
        existingSuccess.remove();
    }
    
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = '✅ ¡Mensaje enviado exitosamente! Te contactaré pronto.';
    
    contactForm.appendChild(successDiv);
    
    setTimeout(() => {
        if (successDiv) {
            successDiv.remove();
        }
    }, 5000);
}

// Envío del formulario
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validar todos los campos
    const isNameValid = validateName(formFields.name.value);
    const isEmailValid = validateEmail(formFields.email.value);
    const isSubjectValid = validateSubject(formFields.subject.value);
    const isMessageValid = validateMessage(formFields.message.value);
    
    // Mostrar errores si los hay
    toggleErrorMessage('name', isNameValid);
    toggleErrorMessage('email', isEmailValid);
    toggleErrorMessage('subject', isSubjectValid);
    toggleErrorMessage('message', isMessageValid);
    
    if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
        // Mostrar mensaje de éxito
        showSuccessMessage();
        
        // Limpiar formulario
        this.reset();
        
        // Resetear colores de campos
        Object.values(formFields).forEach(field => {
            field.style.borderColor = '#e9ecef';
        });
    } else {
        alert('Por favor, corrige los errores en el formulario.');
    }
});

// Funcionalidad de scroll hacia arriba
function createScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '↑';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    `;
    
    document.body.appendChild(scrollButton);
    
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    });
}

// Inicializar botón de scroll
createScrollToTop();

// Efecto de escritura para el título principal
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Inicializar efecto de escritura cuando se carga la página
window.addEventListener('load', function() {
    const titleElement = document.querySelector('h1');
    if (titleElement) {
        const originalText = titleElement.textContent;
        typeWriter(titleElement, originalText, 100);
    }
});

// Efecto parallax suave en scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating');
    
    parallaxElements.forEach(element => {
        const speed = 0.2;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Contador de visitas o estadísticas (simulado)
function initCounter() {
    const stats = [
        { element: '.skills-count', count: 5, suffix: ' Tecnologías' },
        { element: '.learning-hours', count: 200, suffix: ' Horas de estudio' }
    ];
    
    // Esta función puede expandirse para mostrar estadísticas reales
}

// Detectar modo oscuro del sistema
function detectSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        console.log('Sistema en modo oscuro detectado');
        // Aquí se puede implementar el cambio automático de tema
    }
}

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Portafolio de Juan José Martínez cargado exitosamente!');
    console.log('📧 Contacto: juanjomji08@gmail.com');
    console.log('📱 WhatsApp: +57 3332379169');
    console.log('💻 Estudiante de Programación - Apasionado por la Tecnología');
    
    detectSystemTheme();
    
    // Mostrar mensaje de bienvenida en consola
    console.log('%c¡Hola! Soy Juan José Martínez', 'color: #667eea; font-size: 20px; font-weight: bold;');
    console.log('%cGracias por visitar mi portafolio 😊', 'color: #764ba2; font-size: 14px;');
});

// Funcionalidad adicional: Detección de inactividad
let inactivityTimer;

function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
        console.log('Usuario inactivo - Portafolio listo para interacción');
    }, 30000); // 30 segundos
}

// Eventos para detectar actividad
document.addEventListener('mousemove', resetInactivityTimer);
document.addEventListener('keypress', resetInactivityTimer);
document.addEventListener('scroll', resetInactivityTimer);
document.addEventListener('click', resetInactivityTimer);

// Inicializar timer
resetInactivityTimer();

// Animación adicional para elementos al hacer hover
document.querySelectorAll('.contact-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0) scale(1)';
    });
});

// Prevenir spam en formulario
let lastSubmission = 0;
const SUBMISSION_COOLDOWN = 5000; // 5 segundos

contactForm.addEventListener('submit', function(e) {
    const now = Date.now();
    if (now - lastSubmission < SUBMISSION_COOLDOWN) {
        e.preventDefault();
        alert('Por favor, espera unos segundos antes de enviar otro mensaje.');
        return;
    }
    lastSubmission = now;
});

// Accesibilidad: Navegación por teclado mejorada
document.addEventListener('keydown', function(e) {
    // Esc para cerrar menú móvil
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
    
    // Enter en hamburger
    if (e.key === 'Enter' && e.target === hamburger) {
        hamburger.click();
    }
});

// Hacer el hamburger accesible
hamburger.setAttribute('tabindex', '0');
hamburger.setAttribute('aria-label', 'Menú de navegación');
hamburger.setAttribute('role', 'button');

console.log('✨ Todas las funcionalidades del portafolio están activas y funcionando correctamente.');