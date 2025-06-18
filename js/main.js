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
