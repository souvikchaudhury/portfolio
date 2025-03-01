$(document).ready(function() {
    // Mobile Menu Toggle
    $('.mobile-toggle').click(function() {
        $('.nav-menu').toggleClass('active');
    });
    
    // Smooth Scrolling
    $('a[href*="#"]').on('click', function(e) {
        e.preventDefault();
        
        $('.nav-menu').removeClass('active');
        
        $('html, body').animate(
            {
                scrollTop: $($(this).attr('href')).offset().top - 70,
            },
            500,
            'linear'
        );
    });
    
    // Active Menu Link on Scroll
    $(window).scroll(function() {
        var scrollDistance = $(window).scrollTop();
        
        // Show/hide back to top button
        if (scrollDistance > 300) {
            $('.back-to-top').fadeIn();
        } else {
            $('.back-to-top').fadeOut();
        }
        
        // Assign active class to nav links while scrolling
        $('section').each(function(i) {
            if ($(this).position().top <= scrollDistance + 100) {
                $('.nav-menu a.active').removeClass('active');
                $('.nav-menu a').eq(i).addClass('active');
            }
        });
    }).scroll();
    
    // Form Submission
    $('#contactForm').submit(function(e) {
        e.preventDefault();
        alert('Thank you for your message. I will get back to you soon!');
        $('#contactForm')[0].reset();
    });
    
    // Animation on scroll (simple version)
    $(window).scroll(function() {
        $(".timeline-item, .project-card, .education-card, .achievement-card").each(function() {
            var position = $(this).offset().top;
            var scroll = $(window).scrollTop();
            var windowHeight = $(window).height();
            
            if (scroll + windowHeight > position) {
                $(this).addClass("animated");
            }
        });
    }).scroll();

    initScreenshotSliders();
    initLightbox();
    
    // Initialize all project screenshot sliders
    function initScreenshotSliders() {
        document.querySelectorAll('.screenshot-slider').forEach(slider => {
            const wrapper = slider.querySelector('.slider-wrapper');
            const images = slider.querySelectorAll('.slider-image');
            const dotsContainer = slider.querySelector('.slider-dots');
            const prevBtn = slider.querySelector('.slider-prev');
            const nextBtn = slider.querySelector('.slider-next');
            
            let currentIndex = 0;
            const imageCount = images.length;
            
            // Create dot indicators
            for (let i = 0; i < imageCount; i++) {
                const dot = document.createElement('div');
                dot.classList.add('slider-dot');
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    goToSlide(i);
                });
                dotsContainer.appendChild(dot);
            }
            
            // Set up click handlers for navigation
            prevBtn.addEventListener('click', () => {
                goToSlide((currentIndex - 1 + imageCount) % imageCount);
            });
            
            nextBtn.addEventListener('click', () => {
                goToSlide((currentIndex + 1) % imageCount);
            });
            
            // Set up click handlers for images to open lightbox
            images.forEach((img, index) => {
                img.addEventListener('click', () => {
                    openLightbox(slider, index);
                });
            });
            
            function goToSlide(index) {
                currentIndex = index;
                wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
                
                // Update active dot
                slider.querySelectorAll('.slider-dot').forEach((dot, i) => {
                    dot.classList.toggle('active', i === currentIndex);
                });
            }
        });
    }

    // Lightbox functionality
    function initLightbox() {
        const lightbox = document.getElementById('screenshotLightbox');
        const lightboxImg = document.getElementById('lightboxImage');
        const closeBtn = lightbox.querySelector('.lightbox-close');
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');
        const caption = lightbox.querySelector('.lightbox-caption');
        
        let currentSlider = null;
        let currentImageIndex = 0;
        
        function openLightbox(slider, index) {
            currentSlider = slider;
            currentImageIndex = index;
            
            const images = slider.querySelectorAll('.slider-image');
            const imgSrc = images[index].getAttribute('data-full') || images[index].src;
            const imgAlt = images[index].alt;
            
            lightboxImg.src = imgSrc;
            caption.textContent = imgAlt;
            lightbox.style.display = 'block';
            
            // Disable body scroll when lightbox is open
            document.body.style.overflow = 'hidden';
        }
        
        function closeLightbox() {
            lightbox.style.display = 'none';
            lightboxImg.src = '';
            
            // Enable body scroll again
            document.body.style.overflow = '';
        }
        
        function showPrevImage() {
            if (!currentSlider) return;
            
            const images = currentSlider.querySelectorAll('.slider-image');
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            
            const imgSrc = images[currentImageIndex].getAttribute('data-full') || images[currentImageIndex].src;
            const imgAlt = images[currentImageIndex].alt;
            
            lightboxImg.src = imgSrc;
            caption.textContent = imgAlt;
        }
        
        function showNextImage() {
            if (!currentSlider) return;
            
            const images = currentSlider.querySelectorAll('.slider-image');
            currentImageIndex = (currentImageIndex + 1) % images.length;
            
            const imgSrc = images[currentImageIndex].getAttribute('data-full') || images[currentImageIndex].src;
            const imgAlt = images[currentImageIndex].alt;
            
            lightboxImg.src = imgSrc;
            caption.textContent = imgAlt;
        }
        
        // Set up event listeners
        closeBtn.addEventListener('click', closeLightbox);
        prevBtn.addEventListener('click', showPrevImage);
        nextBtn.addEventListener('click', showNextImage);
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') showPrevImage();
            if (e.key === 'ArrowRight') showNextImage();
        });
        
        // Close on outside click
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
        
        // Expose function to open lightbox
        window.openLightbox = openLightbox;
    }

    // Initialize when DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
        initScreenshotSliders();
        initLightbox();
    });
});