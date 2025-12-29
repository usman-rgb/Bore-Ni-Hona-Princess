const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const questionScreen = document.getElementById('question');
const music = document.getElementById('romanticMusic');

const funnyTexts = ["Arre galti se! 😂","No nahi allowed!","Pakdo toh pehle! 😜","Yes hi final answer!","Shehzadi strict mode on? 😭","Button bhag gaya! 🔥","Ab haso na thoda! 😅"];
let attempt = 0;

noBtn.addEventListener('mouseover', () => {
    const x = Math.random() * (window.innerWidth - 200);
    const y = Math.random() * (window.innerHeight - 200);
    
    noBtn.style.position = 'absolute';
    noBtn.style.left = x + 'px';
    noBtn.style.top = y + 'px';
    
    noBtn.innerText = funnyTexts[attempt % funnyTexts.length];
    attempt++;
    
    yesBtn.style.transform = 'scale(1.3)';
    setTimeout(() => yesBtn.style.transform = 'scale(1)', 300);
});

yesBtn.addEventListener('click', () => {
    questionScreen.classList.remove('active');
    document.getElementById('page1').classList.add('active');
    
    music.play().catch(() => console.log("Music blocked"));

    // Hearts + Emojis rain
    const emojis = ['❤️', '💕', '💖', '🌸', '🥰', '😘', '💞', '✨', '🌹', '😍', '💋', '🌟'];
    setInterval(() => {
        const emoji = document.createElement('div');
        emoji.classList.add(Math.random() > 0.5 ? 'falling-heart' : 'floating-emoji');
        emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.left = Math.random() * 100 + 'vw';
        emoji.style.animationDuration = (Math.random() * 5 + 5) + 's';
        emoji.style.fontSize = (Math.random() * 30 + 35) + 'px';
        
        document.querySelector(Math.random() > 0.5 ? '.hearts-rain' : '.floating-emojis').appendChild(emoji);
        
        setTimeout(() => emoji.remove(), 10000);
    }, 400);

    setupScrollAnimations();
});

// Navigation between pages
document.querySelectorAll('.next-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const next = btn.getAttribute('data-next');
        if (next) {
            document.querySelector('.screen.active').classList.remove('active');
            document.getElementById(next).classList.add('active');
            setupScrollAnimations();
        }
    });
});

document.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const prev = btn.getAttribute('data-prev');
        document.querySelector('.screen.active').classList.remove('active');
        document.getElementById(prev).classList.add('active');
        setupScrollAnimations();
    });
});

function setupScrollAnimations() {
    const currentPage = document.querySelector('.screen.active .scrollable-content');
    const paragraphs = currentPage.querySelectorAll('p');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.3 });

    paragraphs.forEach(p => {
        p.classList.remove('visible');
        observer.observe(p);
    });

    // Trigger initial visible ones
    paragraphs.forEach(p => {
        if (p.getBoundingClientRect().top < window.innerHeight) {
            p.classList.add('visible');
        }
    });
}