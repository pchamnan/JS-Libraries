document.addEventListener('DOMContentLoaded', function() {
    // Make sections visible
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = 1;
    });

    // Initialize AOS animation library
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: false,
        mirror: true
    });

    // Refresh AOS for better compatibility
    setTimeout(() => {
        AOS.refreshHard();
    }, 100);

    // Initialize Glider.js Carousel
    new Glider(document.querySelector('.glider'), {
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable: true,
        dots: false,
        arrows: {
            prev: '.glider-prev',
            next: '.glider-next'
        },
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 3
                }
            }
        ]
    });

    // Initialize Chart.js for customer satisfaction chart
    const ctx = document.getElementById('customer-satisfaction').getContext('2d');
    const satisfactionChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['2020', '2021', '2022', '2023', '2024'],
            datasets: [{
                label: 'Customer Satisfaction Score (out of 10)',
                data: [8.2, 8.5, 8.9, 9.3, 9.7],
                backgroundColor: [
                    'rgba(255, 209, 102, 0.6)',
                    'rgba(255, 209, 102, 0.7)',
                    'rgba(255, 209, 102, 0.8)',
                    'rgba(255, 209, 102, 0.9)',
                    'rgba(255, 209, 102, 1)'
                ],
                borderColor: 'rgba(255, 209, 102, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 10,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.2)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.8)',
                        font: {
                            size: 12
                        }
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.2)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.8)',
                        font: {
                            size: 12
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: 'rgba(255, 255, 255, 0.8)',
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    padding: 10,
                    cornerRadius: 4
                }
            }
        }
    });

    // Initialize Lightbox2 for gallery images
    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true,
        'fadeDuration': 300,
        'imageFadeDuration': 300,
        'albumLabel': "Image %1 of %2"
    });

    // Mobile navigation toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
        });
    }

    // Close mobile menu when a nav link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            if (mobileNavToggle) {
                mobileNavToggle.textContent = '☰';
            }
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Form validation and submission
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const destination = document.getElementById('destination').value;
            const travelDate = document.getElementById('travel-date').value;
            
            if (!name || !email || !phone || !destination || !travelDate) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Success message (in a real application, you would send the data to a server)
            alert('Thank you for your booking inquiry! Our travel specialists will contact you shortly.');
            this.reset();
        });
    }

    // Counter animation for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    
    // Function to animate counting up
    function animateCounter(el, target) {
        let current = 0;
        const increment = target > 100 ? Math.ceil(target / 50) : 1;
        const timer = setInterval(() => {
            current += increment;
            
            // Handle different formats (with + or without)
            if (target > 1000) {
                el.textContent = Math.min(current, target).toLocaleString() + '+';
            } else {
                el.textContent = Math.min(current, target) + '+';
            }
            
            if (current >= target) {
                clearInterval(timer);
            }
        }, 30);
    }
    
    // Intersection Observer to trigger counter animation when in view
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const value = el.id === 'destinations-count' ? 50 :
                              el.id === 'happy-travelers' ? 10000 :
                              el.id === 'years-experience' ? 15 : 200;
                
                animateCounter(el, value);
                observer.unobserve(el);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
});