document.addEventListener('DOMContentLoaded', () => {
    // Giả sử đây là danh sách các khóa học mà người dùng đã đăng ký
    const myEnrolledCourses = [
        { id: 1, title: "Khoá học lập trình nâng cao", instructor: "TTA", duration: "3 tháng", image: "img/cpp.png" },
        { id: 2, title: "Khoá học Java cho người mới bắt đầu", instructor: "NQS", duration: "3 tháng", image: "img/java.png" }
    ];

    const grid = document.getElementById('myCoursesGrid');

    // Lặp qua từng khóa học để tạo thẻ HTML
    myEnrolledCourses.forEach(course => {
        // Tạo một thẻ div bên ngoài cho mỗi card
        const card = document.createElement('div');
        card.className = 'course-card';

        // --- PHẦN SỬA LỖI NẰM Ở ĐÂY ---
        // Nội dung HTML hoàn chỉnh cho một card, được bọc trong thẻ <a>
        // để người dùng có thể nhấn vào và chuyển trang.
        card.innerHTML = `
            <a href="course-player.html?courseId=${course.id}" class="card-link">
                <img src="${course.image}" alt="${course.title}" class="card-image">
                <div class="card-body">
                    <h3 class="card-title">${course.title}</h3>
                    <div class="card-meta">
                        <div class="meta-item">
                            <i class="bi bi-person-fill"></i>
                            <span>${course.instructor}</span>
                        </div>
                        <div class="meta-item">
                            <i class="bi bi-clock"></i>
                            <span>${course.duration}</span>
                        </div>
                    </div>
                </div>
            </a>
        `;
        // --- KẾT THÚC PHẦN SỬA LỖI ---

        // Thêm card vừa tạo vào grid để hiển thị ra màn hình
        // Dòng này đã bị thiếu trong file bị lỗi của bạn
        grid.appendChild(card);
    });
});