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


// Search functionality with suggestions and no results message
function searchCourses() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    const courseGrid = document.getElementById('courseGrid');
    
    if (searchTerm === '') {
        // Nếu không có từ khóa tìm kiếm, hiển thị tất cả khóa học
        courseGrid.innerHTML = courses.map(course => createCourseCard(course)).join('');
        hideSearchSuggestions();
        if (typeof refreshCourseEvents === 'function') {
            refreshCourseEvents();
        }
        return;
    }
    
    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchTerm) ||
        course.instructor.toLowerCase().includes(searchTerm)
    );
    
    if (filteredCourses.length === 0) {
        // Hiển thị thông báo không có kết quả
        courseGrid.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">
                    <i class="bi bi-search" style="font-size: 3rem; color: #ccc;"></i>
                </div>
                <h3>Không có kết quả nào cho '${searchTerm}'</h3>
                <p>Hãy thử tìm kiếm với từ khóa khác</p>
            </div>
        `;
        hideSearchSuggestions();
    } else {
        // Hiển thị kết quả tìm kiếm
        courseGrid.innerHTML = filteredCourses.map(course => createCourseCard(course)).join('');
        hideSearchSuggestions();
        
        // Thêm event listeners sau khi search
        if (typeof refreshCourseEvents === 'function') {
            refreshCourseEvents();
        }
    }
}

// Tạo gợi ý tìm kiếm khi người dùng nhập
function showSearchSuggestions(searchTerm) {
    if (searchTerm.length === 0) {
        hideSearchSuggestions();
        return;
    }
    
    const suggestions = courses.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 5); // Chỉ hiển thị 5 gợi ý đầu tiên
    
    let suggestionsHtml = '';
    
    if (suggestions.length > 0) {
        suggestionsHtml = `
            <div class="search-suggestions">
                <div class="suggestion-header">
                    <i class="bi bi-search"></i>
                    <span>Kết quả cho '${searchTerm}'</span>
                </div>
                <div class="suggestion-section">
                    <h6>Khóa học</h6>
                    <div class="suggestion-link">Xem thêm</div>
                </div>
                ${suggestions.map(course => `
                    <div class="suggestion-item" onclick="selectCourse('${course.title}')">
                        <div class="suggestion-icon" style="background-color: ${course.color || '#007bff'};">
                            <i class="bi bi-book"></i>
                        </div>
                        <span>${course.title}</span>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    // Tạo hoặc cập nhật container gợi ý
    let suggestionContainer = document.getElementById('searchSuggestions');
    if (!suggestionContainer) {
        suggestionContainer = document.createElement('div');
        suggestionContainer.id = 'searchSuggestions';
        suggestionContainer.className = 'search-suggestions-container';
        document.querySelector('.search-box').appendChild(suggestionContainer);
    }
    
    suggestionContainer.innerHTML = suggestionsHtml;
}

// Ẩn gợi ý tìm kiếm
function hideSearchSuggestions() {
    const suggestionContainer = document.getElementById('searchSuggestions');
    if (suggestionContainer) {
        suggestionContainer.innerHTML = '';
    }
}

// Chọn khóa học từ gợi ý
function selectCourse(courseTitle) {
    document.getElementById('searchInput').value = courseTitle;
    searchCourses();
    hideSearchSuggestions();
}

// Event listeners cho search input
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    
    if (searchInput) {
        // Tìm kiếm khi nhập
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.trim();
            if (searchTerm.length > 0) {
                showSearchSuggestions(searchTerm);
            } else {
                hideSearchSuggestions();
                searchCourses(); // Hiển thị lại tất cả khóa học
            }
        });
        
        // Tìm kiếm khi nhấn Enter
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchCourses();
            }
        });
        
        // Ẩn gợi ý khi click ra ngoài
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.search-box')) {
                hideSearchSuggestions();
            }
        });
    }
});

// CSS styles cần thêm vào file CSS
const additionalStyles = `
.no-results {
    text-align: center;
    padding: 60px 20px;
    color: #666;
}

.no-results h3 {
    margin: 20px 0 10px 0;
    font-size: 1.5rem;
    color: #333;
}

.no-results p {
    font-size: 1rem;
    color: #888;
}

.search-suggestions-container {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 1000;
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    max-height: 400px;
    overflow-y: auto;
}

.search-suggestions {
    padding: 0;
}

.suggestion-header {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    background-color: #f8f9fa;
    border-bottom: 1px solid #eee;
    font-weight: 500;
    color: #666;
}

.suggestion-header i {
    margin-right: 8px;
}

.suggestion-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    background-color: #fff;
    border-bottom: 1px solid #eee;
}

.suggestion-section h6 {
    margin: 0;
    font-size: 0.9rem;
    font-weight: 600;
    color: #333;
}

.suggestion-link {
    font-size: 0.85rem;
    color: #007bff;
    cursor: pointer;
}

.suggestion-link:hover {
    text-decoration: underline;
}

.suggestion-item {
    display: flex;
    align-items: center;
    padding: 10px 16px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.suggestion-item:hover {
    background-color: #f8f9fa;
}

.suggestion-icon {
    width: 32px;
    height: 32px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 12px;
    color: white;
    font-size: 0.9rem;
}

.suggestion-item span {
    font-size: 0.95rem;
    color: #333;
}

.search-box {
    position: relative;
}
`;

// Thêm styles vào head của document
function addSearchStyles() {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = additionalStyles;
    document.head.appendChild(styleSheet);
}

// Gọi hàm thêm styles khi trang load
document.addEventListener('DOMContentLoaded', addSearchStyles);

// ==================  Xử lý nút “Xem thêm”  ==================
document.addEventListener('click', function (e) {
    // Kiểm tra có bấm trúng thẻ .suggestion-link không
    if (e.target.classList.contains('suggestion-link')) {
        const keyword = document.getElementById('searchInput').value.trim();
        if (keyword) {
            // Lưu tạm từ khóa rồi điều hướng sang trang tìm kiếm
            localStorage.setItem('searchKeyword', keyword);
            window.location.href = 'search.html';
        }
    }
});
