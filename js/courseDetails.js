
const courseDetails = {
    1: {
        title: "Cách dễ nhất để học C++ cho người mới bắt đầu",
        description: "Xây dựng dự án thực tế từ cơ bản tới chuyên sâu, được thiết kế và hướng dẫn bởi TTA",
        courseCode: "CPP001",
        content: [
            "Cơ bản về C++",
            "Biến và kiểu dữ liệu",
            "Cấu trúc điều khiển",
            "Hàm và thủ tục",
            "Mảng và chuỗi",
            "Con trỏ và tham chiếu",
            "Lập trình hướng đối tượng",
            "Template và STL"
        ],
        startDate: "6/1/2025",
        endDate: "6/4/2025"
    },
    2: {
        title: "Cách dễ nhất để học React JS cho người mới bắt đầu",
        description: "Xây dựng ứng dụng web hiện đại với React, được thiết kế và hướng dẫn bởi PTA",
        courseCode: "RJS001",
        content: [
            "JSX và Components",
            "Props và State",
            "Event Handling",
            "Lifecycle Methods",
            "Hooks (useState, useEffect)",
            "Context API",
            "React Router",
            "Redux cơ bản"
        ],
        startDate: "6/1/2025",
        endDate: "6/7/2025"
    },
    3: {
        title: "Cách dễ nhất để học Javascript cho người mới bắt đầu",
        description: "Xây dựng dự án thực tế từ cơ bản tới chuyên sâu, được thiết kế và hướng dẫn bởi HMD",
        courseCode: "JVS001",
        content: [
            "Biến (var, let, const)",
            "Hàm và các loại hàm",
            "Tư duy ứng dụng vòng lặp", 
            "Hiểu rõ về toán tử ++, --",
            "Object và Array",
            "DOM Manipulation",
            "Event Handling",
            "Async/Await và Promise"
        ],
        startDate: "6/6/2025",
        endDate: "6/10/2025"
    },
    4: {
        title: "Cách dễ nhất để học Node & Express.JS cho người mới bắt đầu",
        description: "Xây dựng API và ứng dụng backend mạnh mẽ, được thiết kế và hướng dẫn bởi NQS",
        courseCode: "NOD001",
        content: [
            "Node.js cơ bản",
            "NPM và Package Management",
            "Express.js Framework",
            "Routing và Middleware",
            "Database Integration",
            "Authentication & Authorization",
            "RESTful API Design",
            "Deployment và Production"
        ],
        startDate: "6/1/2025",
        endDate: "6/7/2025"
    },
    5: {
        title: "Cách dễ nhất để học Javascript nâng cao cho người có kinh nghiệm",
        description: "Nâng cao kỹ năng JavaScript với các concept phức tạp, được thiết kế và hướng dẫn bởi TTA",
        courseCode: "JVA001",
        content: [
            "Closure và Scope",
            "Prototype và Inheritance",
            "ES6+ Features",
            "Async Programming",
            "Design Patterns",
            "Performance Optimization",
            "Testing với Jest",
            "Module Systems"
        ],
        startDate: "6/1/2025",
        endDate: "6/7/2025"
    },
    6: {
        title: "Cách dễ nhất để học HTML, CSS cho người mới bắt đầu",
        description: "Nền tảng vững chắc cho web development, được thiết kế và hướng dẫn bởi TTA",
        courseCode: "WEB001",
        content: [
            "HTML cơ bản và semantic",
            "CSS Selectors và Properties",
            "Box Model và Layout",
            "Flexbox và Grid",
            "Responsive Design",
            "CSS Animations",
            "Sass/SCSS",
            "Best Practices"
        ],
        startDate: "6/1/2025",
        endDate: "6/4/2025"
    }
};


function loadCourseDetail() {
    const selectedCourse = JSON.parse(localStorage.getItem('selectedCourse'));
    
    if (!selectedCourse) {
        window.location.href = 'index.html';
        return;
    }
    
    const courseDetail = courseDetails[selectedCourse.id];
    
    if (!courseDetail) {
        console.error('Không tìm thấy thông tin chi tiết khóa học');
        return;
    }
    

    updateCourseInfo(selectedCourse, courseDetail);
}

function updateCourseInfo(course, detail) {
    // Cập nhật tiêu đề
    const titleElement = document.querySelector('.detail-panel h1');
    if (titleElement) {
        titleElement.textContent = detail.title;
    }
    
    // Cập nhật mô tả
    const descElement = document.querySelector('.detail-panel .text-muted');
    if (descElement) {
        descElement.textContent = detail.description;
    }
    
    // Cập nhật thông tin khóa học
    const courseInfoElements = document.querySelectorAll('.detail-panel ul li');
    if (courseInfoElements.length >= 2) {
        courseInfoElements[0].innerHTML = `<strong>Khóa học:</strong> ${course.title}`;
        courseInfoElements[1].innerHTML = `<strong>Mã khóa học:</strong> ${detail.courseCode}`;
    }
    
    // Cập nhật nội dung khóa học
    const contentColumns = document.querySelectorAll('.detail-panel .col-6 ul');
    if (contentColumns.length >= 2 && detail.content) {
        const halfLength = Math.ceil(detail.content.length / 2);
        const firstHalf = detail.content.slice(0, halfLength);
        const secondHalf = detail.content.slice(halfLength);
        
        contentColumns[0].innerHTML = firstHalf.map(item => `<li>${item}</li>`).join('');
        contentColumns[1].innerHTML = secondHalf.map(item => `<li>${item}</li>`).join('');
    }
    
    // Cập nhật lộ trình học
    const scheduleElement = document.querySelector('.detail-panel .section:nth-last-child(3)');
    if (scheduleElement && detail.startDate && detail.endDate) {
        scheduleElement.innerHTML = `<strong>Lộ trình học:</strong> ${detail.startDate} → ${detail.endDate}`;
    }
    
    // Cập nhật giá
    const priceElement = document.querySelector('.detail-panel .text-danger');
    if (priceElement) {
        priceElement.textContent = `Giá: ${formatPrice(course.currentPrice)}`;
    }
}

// Format price function (copy từ main.js)
function formatPrice(price) {
    return price.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " vnđ";
}

// Chạy khi trang được load
document.addEventListener('DOMContentLoaded', function() {
    loadCourseDetail();
});