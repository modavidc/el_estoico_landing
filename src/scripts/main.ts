// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Handle smooth scroll for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const offsetTop = (target as HTMLElement).offsetTop - 80; // Account for fixed nav
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Pricing toggle functionality - switch between monthly and annual
    const pricingToggle = document.getElementById('pricing-toggle') as HTMLButtonElement;
    const monthlyLabel = document.getElementById('monthly-label') as HTMLElement;
    const annualLabel = document.getElementById('annual-label') as HTMLElement;
    const premiumPrice = document.getElementById('premium-price') as HTMLElement;
    const premiumPeriod = document.getElementById('premium-period') as HTMLElement;
    const premiumSavings = document.getElementById('premium-savings') as HTMLElement;
    
    if (pricingToggle) {
        pricingToggle.addEventListener('click', function() {
            const isAnnual = this.getAttribute('aria-checked') === 'true';
            
            if (isAnnual) {
                // Switch to monthly
                this.setAttribute('aria-checked', 'false');
                if (premiumPrice) premiumPrice.textContent = '$2.99';
                if (premiumPeriod) premiumPeriod.textContent = '/mes';
                if (premiumSavings) premiumSavings.innerHTML = 'o <strong style="color: rgb(var(--foreground));">$19.99/año</strong> (ahorra 44%)';
                if (monthlyLabel) {
                    monthlyLabel.style.color = 'rgb(var(--foreground))';
                    monthlyLabel.style.fontWeight = '600';
                }
                if (annualLabel) {
                    annualLabel.style.color = 'rgb(var(--muted-foreground))';
                    annualLabel.style.fontWeight = '400';
                }
            } else {
                // Switch to annual
                this.setAttribute('aria-checked', 'true');
                if (premiumPrice) premiumPrice.textContent = '$19.99';
                if (premiumPeriod) premiumPeriod.textContent = '/año';
                if (premiumSavings) premiumSavings.innerHTML = '<span style="color: rgb(var(--muted-foreground));">Equivale a $1.67/mes</span>';
                if (monthlyLabel) {
                    monthlyLabel.style.color = 'rgb(var(--muted-foreground))';
                    monthlyLabel.style.fontWeight = '400';
                }
                if (annualLabel) {
                    annualLabel.style.color = 'rgb(var(--foreground))';
                    annualLabel.style.fontWeight = '600';
                }
            }
        });
    }

    // Add active state to navigation links on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNavLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = (section as HTMLElement).offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    const href = link.getAttribute('href');
                    if (href === `#${sectionId}` || href === `/#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Navbar scroll effect (optional)
    const nav = document.querySelector('.nav') as HTMLElement;
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (nav) {
            if (currentScroll > 100) {
                nav.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
            } else {
                nav.style.boxShadow = 'none';
            }
        }
        
        lastScroll = currentScroll;
    });
    
    // Features section - Phone preview animation
    const featureCards = document.querySelectorAll('.feature-card');
    const phonePreview = document.getElementById('feature-phone-preview') as HTMLImageElement;
    
    if (featureCards.length > 0 && phonePreview) {
        let currentFeature: string | null = null;
        
        featureCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const featureId = this.getAttribute('data-feature');
                
                // Remove active class from all cards
                featureCards.forEach(c => c.classList.remove('active'));
                // Add active class to current card
                this.classList.add('active');
                
                // Change phone screen with fade effect
                if (currentFeature !== featureId) {
                    phonePreview.style.opacity = '0';
                    phonePreview.style.transform = 'scale(0.95)';
                    
                    setTimeout(() => {
                        // Here you could change the image source if you have different screenshots
                        // phonePreview.src = `/assets/images/feature-${featureId}.png`;
                        
                        phonePreview.style.opacity = '1';
                        phonePreview.style.transform = 'scale(1)';
                        currentFeature = featureId;
                    }, 200);
                }
            });
            
            card.addEventListener('click', function() {
                const featureId = this.getAttribute('data-feature');
                
                // Remove active class from all cards
                featureCards.forEach(c => c.classList.remove('active'));
                // Add active class to clicked card
                this.classList.add('active');
                
                // Change phone screen
                phonePreview.style.opacity = '0';
                phonePreview.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    phonePreview.style.opacity = '1';
                    phonePreview.style.transform = 'scale(1)';
                    currentFeature = featureId;
                }, 200);
            });
        });
        
        // Keep first feature active by default
        if (featureCards[0]) {
            featureCards[0].classList.add('active');
            currentFeature = featureCards[0].getAttribute('data-feature');
        }
    }
});
