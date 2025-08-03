// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Reveal animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});

// Animate skill items when in view
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillItems = entry.target.querySelectorAll('.skill-item');
            skillItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.transform = 'translateX(0)';
                    item.style.opacity = '1';
                }, index * 100);
            });
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-category').forEach(el => {
    skillObserver.observe(el);
});

// Contact form handling
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Here you would typically send the data to a server
    // For now, we'll show a success message
    alert('Thank you for your message! I\'ll get back to you soon.');
    this.reset();
});

// Mobile menu toggle
let mobileMenuOpen = false;
document.querySelector('.mobile-menu').addEventListener('click', function() {
    const navMenu = document.querySelector('.nav-menu');
    const spans = this.querySelectorAll('span');
    
    if (!mobileMenuOpen) {
        navMenu.style.display = 'flex';
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '100%';
        navMenu.style.left = '0';
        navMenu.style.right = '0';
        navMenu.style.background = 'var(--bg-primary)';
        navMenu.style.padding = '1rem';
        navMenu.style.borderTop = '1px solid var(--border)';
        navMenu.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        
        // Animate hamburger to X
        spans[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        
        mobileMenuOpen = true;
    } else {
        navMenu.style.display = 'none';
        
        // Reset hamburger
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
        
        mobileMenuOpen = false;
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (mobileMenuOpen) {
            document.querySelector('.mobile-menu').click();
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(10, 14, 39, 0.98)';
    } else {
        nav.style.background = 'rgba(10, 14, 39, 0.95)';
    }
});

// Add typing animation to hero text
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

// Initialize typing animation after page load
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-text h1');
    const originalText = heroTitle.textContent;
    setTimeout(() => {
        typeWriter(heroTitle, originalText, 150);
    }, 500);
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.3;
    hero.style.transform = `translateY(${rate}px)`;
});

// Add hover effects to cards
document.querySelectorAll('.project-card, .award-card, .experience-item').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
        this.style.boxShadow = '0 25px 50px rgba(233, 30, 99, 0.2)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(-5px) scale(1)';
        this.style.boxShadow = 'none';
    });
});

// Add particle effect to hero section
function createParticle() {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(233, 30, 99, 0.6);
        border-radius: 50%;
        pointer-events: none;
        animation: float 8s linear infinite;
    `;
    
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 8 + 's';
    
    const hero = document.querySelector('.hero');
    hero.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 8000);
}

// Create particles periodically
setInterval(createParticle, 400);

// Add loading animation with AI theme
window.addEventListener('load', () => {
    const loader = document.createElement('div');
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--bg-primary);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `;
    
    loader.innerHTML = `
        <div style="text-align: center;">
            <div style="
                width: 60px;
                height: 60px;
                border: 3px solid var(--border);
                border-top: 3px solid var(--accent);
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 1rem;
            "></div>
            <p style="color: var(--accent); font-weight: 600;">Loading Mehak's Portfolio...</p>
        </div>
    `;
    
    document.body.appendChild(loader);
    
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 500);
    }, 1500);
});

// Add dynamic background effect
function createBackgroundEffect() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.1;
    `;
    
    document.body.appendChild(canvas);
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const particles = [];
    
    function createBackgroundParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1
        };
    }
    
    for (let i = 0; i < 50; i++) {
        particles.push(createBackgroundParticle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = '#e91e63';
            ctx.fill();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

createBackgroundEffect();

// Add CGPA counter animation
function animateNumber(element, target, duration = 2000) {
    const start = 0;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = start + (target - start) * progress;
        element.textContent = current.toFixed(2);
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// Animate CGPA when stats section comes into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const cgpaElement = entry.target.querySelector('.stat-number');
            if (cgpaElement && cgpaElement.textContent === '9.07') {
                animateNumber(cgpaElement, 9.07);
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-card').forEach(el => {
    statsObserver.observe(el);
});

// Add interactive elements for awards
document.querySelectorAll('.award-card').forEach(card => {
    card.addEventListener('click', function() {
        const title = this.querySelector('.award-title').textContent;
        const year = this.querySelector('.award-year').textContent;
        
        // Create a modal or highlight effect
        const popup = document.createElement('div');
        popup.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--bg-card);
            padding: 2rem;
            border-radius: 15px;
            border: 1px solid var(--border);
            z-index: 10000;
            max-width: 400px;
            text-align: center;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
        `;
        
        popup.innerHTML = `
            <h3 style="color: var(--accent); margin-bottom: 1rem;">${title}</h3>
            <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">${year}</p>
            <button onclick="this.parentElement.remove()" style="
                background: var(--gradient);
                color: white;
                border: none;
                padding: 0.5rem 1.5rem;
                border-radius: 25px;
                cursor: pointer;
                font-weight: 600;
            ">Close</button>
        `;
        
        document.body.appendChild(popup);
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            if (popup.parentElement) {
                popup.remove();
            }
        }, 3000);
    });
});

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: var(--gradient);
    z-index: 10001;
    transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = (window.scrollY / scrollHeight) * 100;
    progressBar.style.width = scrollProgress + '%';
});

// Add enhanced visual feedback for form
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
        this.style.borderColor = 'var(--accent)';
        this.style.boxShadow = '0 0 20px rgba(233, 30, 99, 0.2)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
        this.style.borderColor = 'var(--border)';
        this.style.boxShadow = 'none';
    });
});

// Add achievement celebration effect
function celebrateAchievement(element) {
    const celebration = document.createElement('div');
    celebration.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        font-size: 2rem;
        animation: celebrate 1s ease-out;
    `;
    celebration.innerHTML = '🎉';
    
    element.style.position = 'relative';
    element.appendChild(celebration);
    
    setTimeout(() => {
        celebration.remove();
    }, 1000);
}

// Trigger celebration when awards come into view
const awardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                celebrateAchievement(entry.target);
            }, Math.random() * 1000);
        }
    });
}, observerOptions);

document.querySelectorAll('.award-card').forEach(el => {
    awardObserver.observe(el);
});
