/**
 * project1 포트폴리오 스크립트
 * 기능: 
 * 1. Intersection Observer API를 활용한 스크롤 등장 애니메이션
 * 2. 부드러운 스크롤 (Smooth Scroll) 구현
 * 3. JavaScript를 활용한 인터랙션 (Hover 이벤트 제어 등)
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. Intersection Observer 스크롤 애니메이션
    // ==========================================
    // 요소가 화면에 보일 때 애니메이션을 트리거하기 위한 옵션 설정
    const observerOptions = {
        root: null, // 뷰포트를 기준으로 관찰
        rootMargin: "0px",
        threshold: 0.15 // 요소의 15%가 뷰포트에 들어왔을 때 실행
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 'show' 클래스를 추가하여 CSS의 페이드인 + 슬라이드업 효과 실행
                entry.target.classList.add("show");
                // 애니메이션이 한 번 실행된 후에는 관찰 중단 (성능 최적화)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // .hidden 클래스를 가진 모든 요소를 찾아 관찰 대상에 추가
    const hiddenElements = document.querySelectorAll(".hidden");
    hiddenElements.forEach(el => observer.observe(el));

    // ==========================================
    // 2. 부드러운 스크롤 (Smooth Scroll)
    // ==========================================
    // "Contact Me" 버튼 클릭 시 부드럽게 Contact 섹션으로 이동
    const contactBtn = document.getElementById("contact-btn");
    const contactSection = document.getElementById("contact");

    if (contactBtn && contactSection) {
        contactBtn.addEventListener("click", () => {
            contactSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    }

    // 네비게이션 메뉴의 링크들도 부드러운 스크롤을 적용 (CSS scroll-behavior 폴백 및 커스텀 로직)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================
    // 3. 자바스크립트를 사용한 Hover 이벤트 제어
    // (요구사항: JavaScript를 사용하여 Hover 이벤트 구현)
    // ==========================================
    
    // 3-1. Skill 카드 Hover 애니메이션 제어
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        // 마우스가 카드 위로 올라갔을 때
        card.addEventListener('mouseenter', () => {
            // JS를 이용해 명시적으로 스타일 속성(scale, shadow) 변경
            card.style.transform = 'scale(1.1)';
            card.style.boxShadow = '0 15px 30px -5px rgba(0, 0, 0, 0.15)';
            card.style.zIndex = '10'; // 다른 카드들 위로 올라오게 설정
        });

        // 마우스가 카드에서 벗어났을 때
        card.addEventListener('mouseleave', () => {
            // 원래 상태로 복구
            card.style.transform = 'scale(1)';
            card.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05)';
            card.style.zIndex = '1';
        });
    });

    // 3-2. Project 카드 Hover 시 추가 인터랙션
    // CSS hover로 구현된 그림자 및 이동 효과 외에 JS를 통한 스타일 제어 추가
    const projectCards = document.querySelectorAll('.js-hover-card');

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // 테두리 색상을 포인트 컬러로 변경하여 강조
            card.style.borderColor = 'rgba(99, 102, 241, 0.5)'; // primary color
        });

        card.addEventListener('mouseleave', () => {
            // 원래 테두리 색상으로 복구
            card.style.borderColor = 'rgba(0,0,0,0.05)';
        });
    });

});
