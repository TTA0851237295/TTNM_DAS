document.addEventListener('DOMContentLoaded', () => {

    // --- CƠ SỞ DỮ LIỆU CÁC KHÓA HỌC ---
    const courseDatabase = {
        cpp: {
            title: "Khóa học C++ từ cơ bản đến nâng cao",
            lessons: [
                { title: "Bài 1: Giới thiệu về C++", videoUrl: "videos/cpp_lesson_1.mp4" },
                { title: "Bài 2: Cài đặt môi trường", videoUrl: "videos/cpp_lesson_2.mp4" },
            ]
        },
        htmlcss: {
            title: "Nền tảng Web từ Zero đến Hero",
            lessons: [
                { title: "Bài 1: HTML là gì?", videoUrl: "videos/html_lesson_1.mp4" },
            ]
        }
    };

    // --- PHẦN XỬ LÝ LOGIC ---

    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('course');
    const courseData = courseDatabase[courseId];

    const courseTitleEl = document.getElementById('course-title');
    const videoPlayer = document.getElementById('video-player-element');
    const lessonListContainer = document.getElementById('lesson-list');
    const progressTextEl = document.getElementById('progress-text');

    if (courseData) {
        // Cập nhật các thông tin chung của khóa học
        courseTitleEl.textContent = courseData.title;
        document.title = courseData.title;
        progressTextEl.textContent = `0/${courseData.lessons.length} Bài học`;
        lessonListContainer.innerHTML = ''; 

        // Tải video của bài học đầu tiên
        if (courseData.lessons.length > 0) {
            videoPlayer.src = courseData.lessons[0].videoUrl;
        }

        // Tạo danh sách bài học
        courseData.lessons.forEach((lesson, index) => {
            const lessonItem = document.createElement('div');
            lessonItem.className = 'lesson-item';
            if (index === 0) {
                lessonItem.classList.add('active');
            }
            lessonItem.innerHTML = `<i class="bi bi-play-circle-fill"></i> ${lesson.title}`;
            
            lessonItem.addEventListener('click', () => {
                videoPlayer.src = lesson.videoUrl; // Đặt nguồn video mới
                // Trình duyệt sẽ tự động phát nhờ thuộc tính 'autoplay' trên thẻ video
                
                document.querySelectorAll('.lesson-item').forEach(item => item.classList.remove('active'));
                lessonItem.classList.add('active');
            });

            lessonListContainer.appendChild(lessonItem);
        });

    } else {
        // Xử lý trường hợp không tìm thấy khóa học
        courseTitleEl.textContent = "Không tìm thấy khóa học";
        lessonListContainer.innerHTML = '<p style="padding: 16px;">Vui lòng chọn một khóa học từ trang trước.</p>';
    }
});