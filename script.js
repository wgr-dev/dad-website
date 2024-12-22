document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.navbar a');
    
    // Handle click events for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target section from the link text
            const targetSection = document.querySelector(`section.${this.textContent.toLowerCase()}`);
            
            if (targetSection) {
                // Get the navbar height for offset
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                
                // Calculate the target position
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update the active link based on scroll position
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.classList[0];
            }
        });
        
        // Update active link styles
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.textContent.toLowerCase() === current) {
                link.classList.add('active');
            }
        });
    });

    // Scroll to top functionality
    const scrollToTopBtn = document.getElementById('scrollToTop');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.pointerEvents = 'auto';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.pointerEvents = 'none';
        }
    });

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Gallery expansion functionality
    const showMoreBtn = document.querySelector('.show-more-btn');
    const showLessBtn = document.querySelector('.show-less-btn');
    const gallery = document.querySelector('.gallery');
    const sectionsRow = gallery.closest('.sections-row');

    if (showMoreBtn && showLessBtn) {
        // Initially hide the "Show Less" button
        showLessBtn.style.display = 'none';

        showMoreBtn.addEventListener('click', function() {
            sectionsRow.classList.add('expanded-view');
            showMoreBtn.style.display = 'none';
            showLessBtn.style.display = 'block';
            
            // Show all images
            const images = document.querySelectorAll('.gallery-item img');
            images.forEach(img => {
                img.style.display = 'block';
            });
        });

        showLessBtn.addEventListener('click', function() {
            sectionsRow.classList.remove('expanded-view');
            showMoreBtn.style.display = 'block';
            showLessBtn.style.display = 'none';
            
            // Hide images after the first two
            const images = document.querySelectorAll('.gallery-item img');
            images.forEach((img, index) => {
                if (index >= 2) {
                    img.style.display = 'none';
                }
            });
            
            // Scroll back to the gallery section
            gallery.scrollIntoView({ behavior: 'smooth' });
        });
    }
});