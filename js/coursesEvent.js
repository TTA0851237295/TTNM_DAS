// coursesEvent.js - Xử lý sự kiện click vào khóa học

// Thêm event listener cho các course cards
document.addEventListener('DOMContentLoaded', function() {
    // Chờ course cards được load xong
    setTimeout(() => {
        addCourseClickEvents();
    }, 100);
});

function addCourseClickEvents() {
    const courseCards = document.querySelectorAll('.course-card');
    
    courseCards.forEach(card => {
        card.addEventListener('click', function() {
            const courseId = this.getAttribute('data-id');
            
            // Lưu thông tin khóa học vào localStorage để sử dụng ở trang chi tiết
            const course = courses.find(c => c.id == courseId);
            if (course) {
                localStorage.setItem('selectedCourse', JSON.stringify(course));
                
                // Chuyển đến trang chi tiết khóa học
                window.location.href = 'Khoahoc.html';
            }
        });
        
        // Thêm cursor pointer để người dùng biết có thể click
        card.style.cursor = 'pointer';
    });
}

// Gọi lại hàm này mỗi khi courses được load lại (ví dụ sau khi search)
function refreshCourseEvents() {
    addCourseClickEvents();
}