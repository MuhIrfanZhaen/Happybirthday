const balloonContainer = document.getElementById('balloonContainer');
const envelope = document.getElementById('envelope');
const heartsContainer = document.getElementById('heartsContainer');
const fullscreenLetter = document.getElementById('fullscreenLetter');
let isClicked = false;

// Prevent default touch behaviors
document.addEventListener('touchmove', function(e) {
    if (e.target.closest('.letter-paper')) {
        return;
    }
    e.preventDefault();
}, { passive: false });

// Prevent zoom on double tap
let lastTouchEnd = 0;
document.addEventListener('touchend', function(e) {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Add click event to balloon container
balloonContainer.addEventListener('click', function() {
    if (isClicked) return;
    isClicked = true;

    balloonContainer.classList.add('flying');

    setTimeout(() => {
        envelope.classList.add('open');
    }, 4000);

    setTimeout(() => {
        createFallingHearts();
    }, 4500);

    setTimeout(() => {
        fullscreenLetter.classList.add('show');
    }, 5000);
});

// Close letter when clicking outside the paper
fullscreenLetter.addEventListener('click', function(e) {
    if (e.target === fullscreenLetter) {
        fullscreenLetter.classList.remove('show');
    }
});

// Function to create falling hearts
function createFallingHearts() {
    const heartCount = 50;
    for (let i = 0; i < heartCount; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'falling-heart';
            heart.innerHTML = '❤';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
            heart.style.animationDelay = (Math.random() * 2) + 's';
            heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
            heartsContainer.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 7000);
        }, i * 100);
    }
}

// Enhanced snake-like string animation with dynamic movement
function animateStrings() {
    const stringPaths = document.querySelectorAll('.string-path');
    
    stringPaths.forEach((path, index) => {
        let time = index * 1.5;
        const speed = 0.015 + (index * 0.003);
        const amplitude = 15 + (index * 3);
        
        function animate() {
            time += speed;
            
            const wave1 = Math.sin(time) * amplitude;
            const wave2 = Math.cos(time * 1.3) * (amplitude * 0.6);
            const wave3 = Math.sin(time * 0.7) * (amplitude * 0.4);
            const wave4 = Math.cos(time * 1.8) * (amplitude * 0.3);
            
            const q1x = 50 + wave1;
            const q2x = 50 + wave2;
            const q3x = 50 + wave3;
            const q4x = 50 + wave4;
            
            const newPath = `M 50 0 Q ${q1x} 60, 50 120 Q ${q2x} 180, 50 240 Q ${q3x} 270, 50 300`;
            path.setAttribute('d', newPath);
            
            requestAnimationFrame(animate);
        }
        
        animate();
    });
}

// Initialize string animations on load
window.addEventListener('load', () => {
    animateStrings();
});

// Add subtle parallax effect to clouds (only on desktop)
if (window.innerWidth > 768) {
    window.addEventListener('mousemove', (e) => {
        const clouds = document.querySelectorAll('.cloud');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        clouds.forEach((cloud, index) => {
            const speed = (index + 1) * 10;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            
            cloud.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// Add keyboard shortcut to close letter (ESC key)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && fullscreenLetter.classList.contains('show')) {
        fullscreenLetter.classList.remove('show');
    }
});