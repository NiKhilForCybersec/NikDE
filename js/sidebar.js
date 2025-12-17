/**
 * Sidebar Navigation - Dynamic expand/collapse with scroll into view
 */

document.addEventListener('DOMContentLoaded', function() {
    initSidebar();
});

function initSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;

    // Get all nav sections
    const navSections = document.querySelectorAll('.nav-section');
    
    // Add click handlers to section headers
    navSections.forEach(section => {
        const header = section.querySelector('.nav-section-header');
        if (header) {
            header.addEventListener('click', function(e) {
                e.preventDefault();
                toggleSection(section);
            });
        }
    });

    // Find and highlight active page
    highlightActivePage();
    
    // Scroll active item into view
    scrollActiveIntoView();
    
    // Mobile menu toggle
    initMobileMenu();
}

function toggleSection(section) {
    const isExpanded = section.classList.contains('expanded');
    
    // Toggle current section
    if (isExpanded) {
        section.classList.remove('expanded');
    } else {
        section.classList.add('expanded');
    }
}

function highlightActivePage() {
    // Get current page path
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop();
    
    // Find matching nav item
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (!href) return;
        
        const linkPage = href.split('/').pop();
        
        // Check if this is the current page
        if (linkPage === currentPage || href.endsWith(currentPage)) {
            item.classList.add('active');
            
            // Expand parent section
            const section = item.closest('.nav-section');
            if (section) {
                section.classList.add('expanded');
            }
        } else {
            item.classList.remove('active');
        }
    });
}

function scrollActiveIntoView() {
    // Wait a bit for DOM to settle
    setTimeout(() => {
        const activeItem = document.querySelector('.nav-item.active');
        if (activeItem) {
            const navSections = document.querySelector('.nav-sections');
            if (navSections) {
                // Calculate position
                const itemRect = activeItem.getBoundingClientRect();
                const containerRect = navSections.getBoundingClientRect();
                
                // Check if item is out of view
                if (itemRect.top < containerRect.top || itemRect.bottom > containerRect.bottom) {
                    activeItem.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            }
        }
    }, 100);
}

function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('mobile-open');
        });
        
        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 1024) {
                if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                    sidebar.classList.remove('mobile-open');
                }
            }
        });
    }
}

// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const query = e.target.value.toLowerCase().trim();
            filterNavItems(query);
        });
    }
});

function filterNavItems(query) {
    const navItems = document.querySelectorAll('.nav-item');
    const navSections = document.querySelectorAll('.nav-section');
    
    if (!query) {
        // Show all items, collapse non-active sections
        navItems.forEach(item => {
            item.style.display = '';
        });
        navSections.forEach(section => {
            const hasActive = section.querySelector('.nav-item.active');
            if (!hasActive) {
                section.classList.remove('expanded');
            }
        });
        return;
    }
    
    // Filter items
    navItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(query)) {
            item.style.display = '';
            // Expand parent section
            const section = item.closest('.nav-section');
            if (section) {
                section.classList.add('expanded');
            }
        } else {
            item.style.display = 'none';
        }
    });
}

// Expandable content sections (for Q&A, etc.)
document.addEventListener('DOMContentLoaded', function() {
    const expandables = document.querySelectorAll('.expandable');
    
    expandables.forEach(exp => {
        const header = exp.querySelector('.expandable-header');
        if (header) {
            header.addEventListener('click', function() {
                exp.classList.toggle('open');
            });
        }
    });
});

// Copy code button functionality
document.addEventListener('DOMContentLoaded', function() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const codeBlock = this.closest('.code-block');
            const code = codeBlock.querySelector('code');
            
            if (code) {
                navigator.clipboard.writeText(code.textContent).then(() => {
                    const originalText = this.textContent;
                    this.textContent = 'Copied!';
                    setTimeout(() => {
                        this.textContent = originalText;
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy:', err);
                });
            }
        });
    });
});

// Tab functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabContainers = document.querySelectorAll('.tabs-container');
    
    tabContainers.forEach(container => {
        const buttons = container.querySelectorAll('.tab-btn');
        const contents = container.querySelectorAll('.tab-content');
        
        buttons.forEach(btn => {
            btn.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Remove active from all
                buttons.forEach(b => b.classList.remove('active'));
                contents.forEach(c => c.classList.remove('active'));
                
                // Add active to clicked
                this.classList.add('active');
                const targetContent = container.querySelector(`#${tabId}`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    });
});
