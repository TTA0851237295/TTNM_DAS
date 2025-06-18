// Format price function
function formatPrice(price) {
    return price.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " vnđ";
}


// Create course card
function createCourseCard(course) {
    const cardContent = `
        <div class="course-card" data-id="${course.id}">
            <div class="course-header">
                <img src="${course.image}" alt="${course.title}" onerror="this.style.display='none'; this.nextElementSibling.style.background='linear-gradient(135deg, #667eea 0%, #764ba2 100%)'">
                <div class="overlay">
                    <div class="tech-title">${course.displayText}</div>
                    <div class="tech-subtitle">${course.subtitle}</div>
                </div>
            </div>
            <div class="course-body">
                <h5 class="course-title">${course.title}</h5>
                <div class="price-section">
                    <span class="original-price">${formatPrice(course.originalPrice)}</span>
                    <span class="current-price">${formatPrice(course.currentPrice)}</span>
                </div>
                <div class="course-meta">
                    <div class="instructor">
                        <div class="instructor-avatar">${course.instructor.charAt(0)}</div>
                        <span>${course.instructor}</span>
                    </div>
                    <div class="duration">
                        <i class="bi bi-clock"></i>
                        <span>${course.duration}</span>
                    </div>
                </div>
            </div>
        </div>
    `;


    return cardContent;
}


// Load courses
function loadCourses() {
    const courseGrid = document.getElementById('courseGrid');
    courseGrid.innerHTML = courses.map(course => createCourseCard(course)).join('');
   
    // Thêm event listeners sau khi load courses
    if (typeof refreshCourseEvents === 'function') {
        refreshCourseEvents();
    }
}


// Search functionality
function searchCourses() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchTerm) ||
        course.instructor.toLowerCase().includes(searchTerm)
    );
   
    const courseGrid = document.getElementById('courseGrid');
    courseGrid.innerHTML = filteredCourses.map(course => createCourseCard(course)).join('');
   
    // Thêm event listeners sau khi search
    if (typeof refreshCourseEvents === 'function') {
        refreshCourseEvents();
    }
}


// Event listeners
document.getElementById('searchInput').addEventListener('input', searchCourses);


// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadCourses();
});


// Add click animation to course cards
document.addEventListener('click', function(e) {
    if (e.target.closest('.course-card')) {
        const card = e.target.closest('.course-card');
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
    }
});

// User dropdown functionality
const userIcon = document.getElementById('userIcon');
const userDropdown = document.getElementById('userDropdown');

// Toggle dropdown when clicking user icon
userIcon.addEventListener('click', function(e) {
    e.stopPropagation();
    userDropdown.classList.toggle('show');
});

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
    if (!userDropdown.contains(e.target) && !userIcon.contains(e.target)) {
        userDropdown.classList.remove('show');
    }
});

// Prevent dropdown from closing when clicking inside it
userDropdown.addEventListener('click', function(e) {
    e.stopPropagation();
});

// Handle dropdown item clicks
const dropdownItems = document.querySelectorAll('.dropdown-item');
dropdownItems.forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        const text = this.querySelector('span').textContent;
        
        // Handle different menu items
        switch(text) {
            case 'Trang cá nhân':
                alert('Chuyển đến trang cá nhân');
                break;
            case 'Lịch sử mua':
                // Điều hướng đến trang lịch sử mua
                window.location.href = 'purchase-history.html';
                break;
            case 'Cài đặt':
                alert('Chuyển đến trang cài đặt');
                break;
            case 'Đăng xuất':
                if(confirm('Bạn có chắc chắn muốn đăng xuất?')) {
                    alert('Đăng xuất thành công!');
                    // Here you would typically redirect to login page
                }
                break;
        }
        
        // Close dropdown after action
        userDropdown.classList.remove('show');
    });
});

// Add keyboard support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        userDropdown.classList.remove('show');
    }
});
