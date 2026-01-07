const CORRECT_ANSWER = 'r15';

function initPasswordProtection() {
    const passwordModal = document.getElementById('passwordModal');
    const mainContent = document.getElementById('mainContent');
    const passwordForm = document.getElementById('passwordForm');
    const passwordInput = document.getElementById('passwordInput');
    const passwordError = document.getElementById('passwordError');
    const passwordContainer = document.querySelector('.password-container');
    
    if (passwordModal) passwordModal.classList.remove('hidden');
    if (mainContent) mainContent.style.display = 'none';
    
    if (passwordForm) {
        passwordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const termsCheckbox = document.getElementById('termsCheckbox');
            
            if (!termsCheckbox || !termsCheckbox.checked) {
                if (passwordError) {
                    passwordError.textContent = '❌ Press the tick mark of terms and conditions';
                    passwordError.classList.add('show');
                }
                
                if (passwordContainer) {
                    passwordContainer.style.animation = 'none';
                    setTimeout(() => {
                        passwordContainer.style.animation = 'shake 0.5s ease-in-out';
                    }, 10);
                }
                return;
            }
            
            const userAnswer = passwordInput.value.trim().toLowerCase();
            
            if (userAnswer === CORRECT_ANSWER.toLowerCase()) {
                if (passwordModal) {
                    passwordModal.style.animation = 'fadeOut 0.6s ease-out forwards';
                    setTimeout(() => {
                        passwordModal.classList.add('hidden');
                    }, 600);
                }
                
                if (passwordError) {
                    passwordError.textContent = '';
                    passwordError.classList.remove('show');
                }
                
                const catLoader = document.getElementById('catLoader');
                if (catLoader) {
                    catLoader.classList.add('active');
                    
                    setTimeout(() => {
                        catLoader.classList.add('fade-out');
                        
                        setTimeout(() => {
                            catLoader.classList.remove('active', 'fade-out');
                            if (mainContent) {
                                mainContent.style.display = 'block';
                                mainContent.style.animation = 'fadeIn 0.8s ease-in';
                            }
                            
                            initParticleSystem();
                            
                            window.scrollTo(0, 0);
                        }, 1000);
                    }, 3500);
                } else {
                    if (mainContent) mainContent.style.display = 'block';
                    window.scrollTo(0, 0);
                }
            } else {
                if (passwordError) {
                    passwordError.textContent = '❌ That\'s not quite right. Try again!';
                    passwordError.classList.add('show');
                }
                
                if (passwordInput) {
                    passwordInput.value = '';
                    passwordInput.focus();
                }
                
                if (passwordContainer) {
                    passwordContainer.style.animation = 'none';
                    setTimeout(() => {
                        passwordContainer.style.animation = 'shake 0.5s ease-in-out';
                    }, 10);
                }
            }
        });
    }
    
    if (passwordInput) {
        setTimeout(() => {
            passwordInput.focus();
        }, 100);
    }
}

const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
        20%, 40%, 60%, 80% { transform: translateX(10px); }
    }
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', () => {
    initPasswordProtection();
    
    const termsCheckbox = document.getElementById('termsCheckbox');
    const termsPopup = document.getElementById('termsPopup');
    const popupClose = document.getElementById('popupClose');
    
    if (termsCheckbox && termsPopup) {
        termsCheckbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                termsPopup.classList.add('show');
            }
        });
    }
    
    if (popupClose && termsPopup) {
        popupClose.addEventListener('click', () => {
            termsPopup.classList.remove('show');
        });
    }
    
    if (termsPopup) {
        termsPopup.addEventListener('click', (e) => {
            if (e.target === termsPopup) {
                termsPopup.classList.remove('show');
            }
        });
    }
});

function typeWriter(element, text, speed = 100) {
    if (!element || !text) return;
    
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            element.style.animation = 'textComplete 0.5s ease';
        }
    }
    
    type();
}

window.addEventListener('DOMContentLoaded', () => {
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        const originalText = typewriterElement.textContent || 'Happy Birthday, Ammu!';
        typeWriter(typewriterElement, originalText, 90);
    }
});

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.classList.contains('polaroid-card')) {
                const cards = Array.from(document.querySelectorAll('.polaroid-card'));
                const index = cards.indexOf(entry.target);
                entry.target.style.transitionDelay = `${index * 0.05}s`;
            }
        }
    });
}, observerOptions);

window.addEventListener('DOMContentLoaded', () => {
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => observer.observe(title));
    
    const titleDecoration = document.querySelector('.title-decoration');
    if (titleDecoration) {
        observer.observe(titleDecoration);
    }
    
    const polaroidCards = document.querySelectorAll('.polaroid-card');
    polaroidCards.forEach((card) => {
        observer.observe(card);
    });
    
    const messageVideo = document.querySelector('.message-video');
    const messageCard = document.querySelector('.message-card');
    
    if (messageVideo && messageCard) {
        const triggerMessageCardFade = () => {
            setTimeout(() => {
                if (messageCard) {
                    messageCard.classList.add('visible');
                    const messageTexts = messageCard.querySelectorAll('.message-text');
                    messageTexts.forEach((text, index) => {
                        setTimeout(() => {
                            text.style.animation = `textFadeIn 0.8s ease forwards`;
                        }, index * 200);
                    });
                }
            }, 2000);
        };
        
        messageVideo.addEventListener('error', () => {
            setTimeout(() => {
                if (messageCard) {
                    messageCard.classList.add('visible');
                }
            }, 3000);
        });
        
        if (messageVideo.readyState >= 2 && !messageVideo.paused) {
            triggerMessageCardFade();
        } else {
            messageVideo.addEventListener('playing', triggerMessageCardFade, { once: true });
            setTimeout(() => {
                if (messageCard && !messageCard.classList.contains('visible')) {
                    messageCard.classList.add('visible');
                }
            }, 5000);
        }
    } else if (messageCard) {
        setTimeout(() => {
            messageCard.classList.add('visible');
        }, 3000);
    }
});

let ticking = false;
let lastScrollY = 0;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset || window.scrollY || 0;
            const hero = document.querySelector('.hero');
            
            if (hero) {
                const heroContent = hero.querySelector('.hero-content');
                const heroVideo = hero.querySelector('.hero-video');
                
                if (scrolled < window.innerHeight) {
                    if (heroContent) {
                        const parallaxSpeed = 0.3;
                        heroContent.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
                        heroContent.style.opacity = Math.max(0.3, 1 - (scrolled / window.innerHeight) * 0.7);
                    }
                    
                    if (heroVideo) {
                        heroVideo.style.transform = `translateY(${scrolled * 0.5}px) scale(${1 + scrolled * 0.0005})`;
                    }
                }
            }
            
            const galleryCards = document.querySelectorAll('.polaroid-card');
            galleryCards.forEach((card, index) => {
                const rect = card.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                
                if (rect.top < windowHeight && rect.bottom > 0) {
                    const cardCenter = rect.top + rect.height / 2;
                    const windowCenter = windowHeight / 2;
                    const distance = cardCenter - windowCenter;
                    const parallaxOffset = distance * 0.1;
                    
                    card.style.transform = `translateY(${parallaxOffset}px) rotate(${index % 2 === 0 ? '-3deg' : '3deg'})`;
                }
            });
            
            lastScrollY = scrolled;
            ticking = false;
        });
        ticking = true;
    }
});

function initParticleSystem() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const particles = [];
    const particleCount = window.innerWidth < 768 ? 30 : 50;
    
    function resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        ctx.scale(dpr, dpr);
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';
    }
    
    resizeCanvas();
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(resizeCanvas, 250);
    });
    
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * (canvas.width / (window.devicePixelRatio || 1));
            this.y = Math.random() * (canvas.height / (window.devicePixelRatio || 1));
            this.size = Math.random() * 3 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.color = Math.random() > 0.5 ? 'rgba(255, 107, 157, 0.6)' : 'rgba(192, 132, 252, 0.6)';
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            const maxWidth = canvas.width / (window.devicePixelRatio || 1);
            const maxHeight = canvas.height / (window.devicePixelRatio || 1);
            
            if (this.x < 0) this.x = maxWidth;
            if (this.x > maxWidth) this.x = 0;
            if (this.y < 0) this.y = maxHeight;
            if (this.y > maxHeight) this.y = 0;
            
            this.opacity += Math.sin(Date.now() * 0.001 + this.x) * 0.01;
            this.opacity = Math.max(0.2, Math.min(0.8, this.opacity));
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
            ctx.fill();
            ctx.restore();
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.save();
                    ctx.globalAlpha = (1 - distance / 150) * 0.3;
                    ctx.strokeStyle = particle.color;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.stroke();
                    ctx.restore();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

document.addEventListener('DOMContentLoaded', () => {
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s ease-out';
            ripple.style.pointerEvents = 'none';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    }
    
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
    
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.complete && img.naturalHeight !== 0) {
            img.style.opacity = '1';
        } else {
            img.addEventListener('load', function() {
                this.style.opacity = '0';
                this.style.transition = 'opacity 0.5s ease';
                requestAnimationFrame(() => {
                    this.style.opacity = '1';
                });
            });
        }
        
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn('Image failed to load:', this.src);
        });
    });
    
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        if (video.readyState >= 2) {
            video.style.opacity = '1';
        } else {
            video.addEventListener('loadeddata', function() {
                this.style.opacity = '1';
            }, { once: true });
            
            video.addEventListener('canplay', function() {
                this.style.opacity = '1';
            }, { once: true });
        }
        
        video.addEventListener('error', function() {
            console.warn('Video failed to load:', this.querySelector('source')?.src);
            const overlay = this.parentElement.querySelector('.hero-overlay, .message-overlay');
            if (overlay) {
                overlay.style.background = 'linear-gradient(135deg, rgba(255, 214, 232, 0.8) 0%, rgba(255, 179, 217, 0.8) 100%)';
            }
        });
    });
});

let mouseX = 0;
let mouseY = 0;
let cursorHearts = [];

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    if (Math.random() > 0.95) {
        createCursorHeart(e.clientX, e.clientY);
    }
});

function createCursorHeart(x, y) {
    const heart = document.createElement('div');
    heart.innerHTML = '💕';
    heart.style.position = 'fixed';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.fontSize = '1.5rem';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '9998';
    heart.style.opacity = '0.8';
    heart.style.transform = 'translate(-50%, -50%) scale(0)';
    heart.style.transition = 'all 1s ease-out';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.style.transform = 'translate(-50%, -50%) scale(1) translateY(-30px)';
        heart.style.opacity = '0';
    }, 10);
    
    setTimeout(() => {
        heart.remove();
    }, 1000);
}

function smoothScrollTo(element, duration = 1000) {
    const start = window.pageYOffset;
    const target = element.offsetTop;
    const distance = target - start;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutCubic(timeElapsed, start, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    }
    
    requestAnimationFrame(animation);
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        smoothScrollTo(section, 1200);
    }
}

window.addEventListener('scroll', () => {
    const scrollProgress = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
    document.documentElement.style.setProperty('--scroll-progress', scrollProgress);
});

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.cta-button, .password-submit');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const galleryImages = document.querySelectorAll('.polaroid-card img');
    
    galleryImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
});

function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const optimizedScrollHandler = throttle(() => {
}, 16);
