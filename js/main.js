window.addEventListener('load', function() {
    /* Crosshair Cursor */
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    
    if (dot && ring) {
        window.addEventListener('mousemove', (e) => {
            dot.style.left = `${e.clientX}px`;
            dot.style.top = `${e.clientY}px`;
            
            // Smoother ring movement
            setTimeout(() => {
                ring.style.left = `${e.clientX}px`;
                ring.style.top = `${e.clientY}px`;
            }, 50);
        });
    }

    // Hover states delegation
    document.body.addEventListener('mouseover', (e) => {
        if(e.target.closest('.interactable') || e.target.tagName.toLowerCase() === 'a' || e.target.tagName.toLowerCase() === 'button' || e.target.tagName.toLowerCase() === 'input' || e.target.tagName.toLowerCase() === 'textarea') {
            document.body.classList.add('cursor-hover');
        }
    });
    document.body.addEventListener('mouseout', (e) => {
        if(e.target.closest('.interactable') || e.target.tagName.toLowerCase() === 'a' || e.target.tagName.toLowerCase() === 'button' || e.target.tagName.toLowerCase() === 'input' || e.target.tagName.toLowerCase() === 'textarea') {
            document.body.classList.remove('cursor-hover');
        }
    });

    /* Three.js Background Logic (Matrix-ish / Tech Grid) */
    const container = document.getElementById('webgl-container');
    if (container && typeof THREE !== 'undefined') {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 50;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        // Particle System
        const particlesCount = 1000;
        const posArray = new Float32Array(particlesCount * 3);
        for(let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 200;
        }

        const particlesGeo = new THREE.BufferGeometry();
        particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        const particlesMat = new THREE.PointsMaterial({
            size: 0.5,
            color: 0xCCFF00,
            transparent: true,
            opacity: 0.5
        });

        const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
        scene.add(particlesMesh);

        let mouseX = 0;
        let mouseY = 0;
        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX - window.innerWidth / 2) * 0.05;
            mouseY = (e.clientY - window.innerHeight / 2) * 0.05;
        });

        function animate() {
            requestAnimationFrame(animate);
            particlesMesh.rotation.y += 0.001;
            particlesMesh.rotation.x += 0.0005;
            
            camera.position.x += (mouseX - camera.position.x) * 0.05;
            camera.position.y += (-mouseY - camera.position.y) * 0.05;
            camera.lookAt(scene.position);
            
            renderer.render(scene, camera);
        }
        animate();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    /* Scroll Reveal Logic */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => revealObserver.observe(el));

    /* Active Nav Link */
    const path = window.location.pathname;
    const page = path.split("/").pop() || "index.html";
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === page) link.classList.add('active');
    });

    /* Active Node Display */
    const nodeDisplay = document.getElementById('current-node-display');
    if (nodeDisplay) {
        const pageName = page.replace('.html', '').toUpperCase() || 'HOME';
        nodeDisplay.innerText = `[ ${pageName} ]`;
    }

    /* Mobile Menu Toggle */
    const menuBtn = document.getElementById('mobile-menu-btn');
    const menuOverlay = document.getElementById('mobile-menu-overlay');
    if (menuBtn && menuOverlay) {
        menuBtn.addEventListener('click', () => {
            const isOpen = menuOverlay.classList.contains('active');
            if (isOpen) {
                menuOverlay.classList.remove('active');
                menuBtn.innerText = '[ MENU ]';
                document.body.style.overflow = '';
            } else {
                menuOverlay.classList.add('active');
                menuBtn.innerText = '[ CLOSE ]';
                document.body.style.overflow = 'hidden';
            }
        });
        
        // Close menu when clicking link
        menuOverlay.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuOverlay.classList.remove('active');
                menuBtn.innerText = '[ MENU ]';
                document.body.style.overflow = '';
            });
        });
    }
});

/* Carousel Controller */
window.slideCarousel = function(carouselId, direction) {
    const container = document.getElementById(carouselId);
    if (!container) return;
    
    const track = container.querySelector('.carousel-track');
    const images = track.querySelectorAll('img');
    const total = images.length;
    
    let currentIndex = parseInt(track.dataset.index || 0);
    currentIndex = (currentIndex + direction + total) % total;
    
    track.dataset.index = currentIndex;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Auto-play carousels
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.project-launch').forEach((card) => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project-id');
            if (projectId) {
                window.location.href = `proof.html?project=${projectId}`;
            }
        });
    });

    setInterval(() => {
        document.querySelectorAll('.carousel-container').forEach(carousel => {
            slideCarousel(carousel.id, 1);
        });
    }, 5000);
});
