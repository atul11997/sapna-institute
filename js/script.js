/* ========================================
   SAPNA English Institute - JavaScript
   ======================================== */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // Mobile Menu Toggle
    // ========================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Toggle icon between menu and close
            const icon = this.querySelector('svg');
            if (navLinks.classList.contains('active')) {
                icon.innerHTML = `
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                `;
            } else {
                icon.innerHTML = `
                    <line x1="3" y1="12" x2="21" y2="12"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <line x1="3" y1="18" x2="21" y2="18"/>
                `;
            }
        });
        
        // Close menu when clicking on a link
        const links = navLinks.querySelectorAll('.nav-link');
        links.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
            });
        });
    }
    
    // ========================================
    // Hero Slider
    // ========================================
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.getElementById('sliderPrev');
    const nextBtn = document.getElementById('sliderNext');
    
    if (slides.length > 0) {
        let currentSlide = 0;
        let slideInterval;
        
        function showSlide(index) {
            // Remove active class from all slides and dots
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Add active class to current slide and dot
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            
            currentSlide = index;
        }
        
        function nextSlide() {
            const next = (currentSlide + 1) % slides.length;
            showSlide(next);
        }
        
        function prevSlide() {
            const prev = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(prev);
        }
        
        // Auto-advance slides
        function startSlideshow() {
            slideInterval = setInterval(nextSlide, 5000);
        }
        
        function stopSlideshow() {
            clearInterval(slideInterval);
        }
        
        // Event listeners
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                stopSlideshow();
                prevSlide();
                startSlideshow();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                stopSlideshow();
                nextSlide();
                startSlideshow();
            });
        }
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                stopSlideshow();
                showSlide(index);
                startSlideshow();
            });
        });
        
        // Start the slideshow
        startSlideshow();
    }
    
    // ========================================
    // Gallery Filter & Lightbox
    // ========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    
    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            galleryItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Lightbox functionality
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (lightbox && lightboxImg) {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
    
    function closeLightbox() {
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // Close lightbox with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
    
    // ========================================
    // Enquiry Form Handling
    // ========================================
    const enquiryForm = document.getElementById('enquiryForm');
    
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // Get submit button
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = `
                <svg class="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10" stroke-dasharray="60" stroke-dashoffset="20"/>
                </svg>
                Submitting...
            `;
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(function() {
                // Show success message
                showToast('Enquiry Submitted!', 'We will contact you shortly. Thank you for your interest!');
                
                // Reset form
                enquiryForm.reset();
                
                // Restore button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // ========================================
    // Toast Notification
    // ========================================
    function showToast(title, message) {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <div class="toast-content">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <div>
                    <h4>${title}</h4>
                    <p>${message}</p>
                </div>
            </div>
        `;
        
        // Add toast styles if not exists
        if (!document.getElementById('toast-styles')) {
            const styles = document.createElement('style');
            styles.id = 'toast-styles';
            styles.textContent = `
                .toast {
                    position: fixed;
                    bottom: 2rem;
                    right: 2rem;
                    background: white;
                    border-radius: 0.75rem;
                    box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.2);
                    padding: 1rem 1.5rem;
                    z-index: 1000;
                    animation: slideIn 0.3s ease;
                }
                .toast-content {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }
                .toast-content svg {
                    color: #22c55e;
                    flex-shrink: 0;
                }
                .toast-content h4 {
                    font-family: 'Playfair Display', serif;
                    font-size: 1rem;
                    font-weight: 700;
                    color: hsl(222, 47%, 11%);
                    margin-bottom: 0.25rem;
                }
                .toast-content p {
                    font-size: 0.875rem;
                    color: hsl(215, 16%, 47%);
                }
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                .spinner {
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(styles);
        }
        
        document.body.appendChild(toast);
        
        // Remove toast after 4 seconds
        setTimeout(function() {
            toast.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(function() {
                toast.remove();
            }, 300);
        }, 4000);
    }
    
    // ========================================
    // Scroll Animations
    // ========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Animate cards on scroll
    const animateElements = document.querySelectorAll('.stat-card, .feature-card, .course-card, .testimonial-card, .value-card, .gallery-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // ========================================
    // Active Nav Link Highlight
    // ========================================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinksAll = document.querySelectorAll('.nav-link');
    
    navLinksAll.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
});


// 

  const openBtn = document.getElementById("openModal");
  const closeBtn = document.getElementById("closeModal");
  const modal = document.getElementById("enqModal");

  openBtn.addEventListener("click", () => {
    modal.classList.add("active");
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  // Close on outside click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });
