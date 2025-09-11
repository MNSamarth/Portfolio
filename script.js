// Portfolio functionality
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
    initializeMinigame();
});

function initializePortfolio() {
    // Navigation card interactions
    const navCards = document.querySelectorAll('.nav-card');
    const contentSections = document.querySelectorAll('.content-section');
    
    navCards.forEach(card => {
        card.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            showSection(targetSection);
        });
        
        // Add hover sound effect (optional)
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    function showSection(sectionId) {
        // Hide all sections
        contentSections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // Smooth scrolling for scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const minigameSection = document.querySelector('.minigame-section');
            minigameSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        const rate = scrolled * -0.5;
        
        if (heroSection) {
            heroSection.style.transform = `translate3d(0, ${rate}px, 0)`;
        }
    });
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.nav-card, .project-card, .skill-category, .timeline-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Minigame functionality
function initializeMinigame() {
    const gameBoard = document.getElementById('gameBoard');
    const player = document.getElementById('player');
    const scoreElement = document.getElementById('score');
    const highScoreElement = document.getElementById('highScore');
    const startButton = document.getElementById('startGameBtn');
    
    let gameState = {
        isPlaying: false,
        score: 0,
        highScore: localStorage.getItem('starCollectorHighScore') || 0,
        playerPosition: { x: 50, y: 50 },
        stars: [],
        gameSpeed: 100,
        starSpawnRate: 2000
    };
    
    // Update high score display
    highScoreElement.textContent = gameState.highScore;
    
    let gameLoop;
    let starSpawnTimer;
    let keys = {};
    
    // Keyboard controls
    document.addEventListener('keydown', function(e) {
        keys[e.code] = true;
        if (gameState.isPlaying) {
            e.preventDefault();
        }
    });
    
    document.addEventListener('keyup', function(e) {
        keys[e.code] = false;
    });
    
    // Start game button
    startButton.addEventListener('click', startGame);
    
    function startGame() {
        gameState.isPlaying = true;
        gameState.score = 0;
        gameState.stars = [];
        gameState.playerPosition = { x: 50, y: 50 };
        
        // Hide start button
        startButton.style.display = 'none';
        
        // Clear existing stars
        const existingStars = gameBoard.querySelectorAll('.game-star');
        existingStars.forEach(star => star.remove());
        
        // Update display
        updateScore();
        updatePlayerPosition();
        
        // Start game loops
        gameLoop = setInterval(updateGame, gameState.gameSpeed);
        starSpawnTimer = setInterval(spawnStar, gameState.starSpawnRate);
        
        // Auto-end game after 60 seconds
        setTimeout(endGame, 60000);
    }
    
    function updateGame() {
        if (!gameState.isPlaying) return;
        
        // Update player position based on keys
        const speed = 3;
        const boardRect = gameBoard.getBoundingClientRect();
        const playerRect = player.getBoundingClientRect();
        
        let newX = gameState.playerPosition.x;
        let newY = gameState.playerPosition.y;
        
        // Movement controls (Arrow keys and WASD)
        if (keys['ArrowUp'] || keys['KeyW']) {
            newY = Math.max(5, gameState.playerPosition.y - speed);
        }
        if (keys['ArrowDown'] || keys['KeyS']) {
            newY = Math.min(95, gameState.playerPosition.y + speed);
        }
        if (keys['ArrowLeft'] || keys['KeyA']) {
            newX = Math.max(5, gameState.playerPosition.x - speed);
        }
        if (keys['ArrowRight'] || keys['KeyD']) {
            newX = Math.min(95, gameState.playerPosition.x + speed);
        }
        
        gameState.playerPosition.x = newX;
        gameState.playerPosition.y = newY;
        updatePlayerPosition();
        
        // Check star collisions
        checkStarCollisions();
        
        // Remove old stars and update positions
        updateStars();
    }
    
    function updatePlayerPosition() {
        player.style.left = gameState.playerPosition.x + '%';
        player.style.top = gameState.playerPosition.y + '%';
    }
    
    function spawnStar() {
        if (!gameState.isPlaying) return;
        
        const star = document.createElement('div');
        star.className = 'game-star';
        
        // Random position
        const x = Math.random() * 90 + 5; // 5% to 95%
        const y = Math.random() * 90 + 5;
        
        star.style.left = x + '%';
        star.style.top = y + '%';
        
        gameBoard.appendChild(star);
        
        gameState.stars.push({
            element: star,
            x: x,
            y: y,
            collected: false
        });
        
        // Remove star after 8 seconds if not collected
        setTimeout(() => {
            if (star.parentNode) {
                star.remove();
                gameState.stars = gameState.stars.filter(s => s.element !== star);
            }
        }, 8000);
    }
    
    function checkStarCollisions() {
        const playerSize = 30;
        const starSize = 20;
        const collisionDistance = (playerSize + starSize) / 2;
        
        gameState.stars.forEach(star => {
            if (star.collected) return;
            
            const playerCenterX = gameState.playerPosition.x;
            const playerCenterY = gameState.playerPosition.y;
            const starCenterX = star.x;
            const starCenterY = star.y;
            
            const distance = Math.sqrt(
                Math.pow(playerCenterX - starCenterX, 2) + 
                Math.pow(playerCenterY - starCenterY, 2)
            );
            
            if (distance < collisionDistance / 2) {
                // Star collected!
                star.collected = true;
                star.element.remove();
                gameState.score += 10;
                updateScore();
                
                // Create collection effect
                createCollectionEffect(starCenterX, starCenterY);
                
                // Increase game speed slightly
                if (gameState.score % 50 === 0) {
                    gameState.gameSpeed = Math.max(50, gameState.gameSpeed - 5);
                    gameState.starSpawnRate = Math.max(1000, gameState.starSpawnRate - 100);
                    
                    // Restart timers with new speed
                    clearInterval(gameLoop);
                    clearInterval(starSpawnTimer);
                    gameLoop = setInterval(updateGame, gameState.gameSpeed);
                    starSpawnTimer = setInterval(spawnStar, gameState.starSpawnRate);
                }
            }
        });
        
        // Clean up collected stars
        gameState.stars = gameState.stars.filter(star => !star.collected);
    }
    
    function createCollectionEffect(x, y) {
        const effect = document.createElement('div');
        effect.innerHTML = '+10';
        effect.style.cssText = `
            position: absolute;
            left: ${x}%;
            top: ${y}%;
            color: #64ffda;
            font-weight: bold;
            font-family: 'Orbitron', monospace;
            font-size: 18px;
            pointer-events: none;
            z-index: 100;
            animation: scoreFloat 1s ease-out forwards;
        `;
        
        // Add floating animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes scoreFloat {
                0% {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translate(-50%, -100px) scale(1.5);
                }
            }
        `;
        document.head.appendChild(style);
        
        gameBoard.appendChild(effect);
        
        setTimeout(() => {
            effect.remove();
            style.remove();
        }, 1000);
    }
    
    function updateStars() {
        // Add subtle movement to stars
        gameState.stars.forEach(star => {
            if (star.collected) return;
            
            // Slight floating animation
            const time = Date.now() * 0.001;
            const offset = Math.sin(time + star.x) * 2;
            star.element.style.transform = `translateY(${offset}px)`;
        });
    }
    
    function updateScore() {
        scoreElement.textContent = gameState.score;
        
        // Check for new high score
        if (gameState.score > gameState.highScore) {
            gameState.highScore = gameState.score;
            highScoreElement.textContent = gameState.highScore;
            localStorage.setItem('starCollectorHighScore', gameState.highScore);
            
            // Celebrate new high score
            if (gameState.score > 0) {
                createHighScoreEffect();
            }
        }
    }
    
    function createHighScoreEffect() {
        const effect = document.createElement('div');
        effect.innerHTML = 'NEW HIGH SCORE!';
        effect.style.cssText = `
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            color: #ffeb3b;
            font-weight: bold;
            font-family: 'Orbitron', monospace;
            font-size: 24px;
            text-shadow: 0 0 20px #ffeb3b;
            pointer-events: none;
            z-index: 100;
            animation: highScoreCelebrate 2s ease-out forwards;
        `;
        
        gameBoard.appendChild(effect);
        
        setTimeout(() => effect.remove(), 2000);
    }
    
    function endGame() {
        gameState.isPlaying = false;
        
        // Clear timers
        clearInterval(gameLoop);
        clearInterval(starSpawnTimer);
        
        // Show final score
        const finalScore = document.createElement('div');
        finalScore.innerHTML = `
            <div style="
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                background: rgba(0, 0, 0, 0.9);
                color: #64ffda;
                padding: 20px;
                border-radius: 15px;
                text-align: center;
                border: 2px solid #64ffda;
                font-family: 'Orbitron', monospace;
                z-index: 200;
            ">
                <h3>Game Over!</h3>
                <p>Final Score: ${gameState.score}</p>
                <p>High Score: ${gameState.highScore}</p>
                <button onclick="this.parentElement.parentElement.remove(); document.getElementById('startGameBtn').style.display = 'block';" 
                        style="
                            background: linear-gradient(45deg, #64ffda, #1de9b6);
                            color: #0a0a0f;
                            border: none;
                            padding: 10px 20px;
                            border-radius: 5px;
                            cursor: pointer;
                            font-weight: bold;
                            margin-top: 10px;
                        ">Play Again</button>
            </div>
        `;
        
        gameBoard.appendChild(finalScore);
        
        // Clean up stars
        const allStars = gameBoard.querySelectorAll('.game-star');
        allStars.forEach(star => star.remove());
        gameState.stars = [];
    }
    
    // Add CSS for high score animation
    const gameStyles = document.createElement('style');
    gameStyles.textContent = `
        @keyframes highScoreCelebrate {
            0% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.5);
            }
            50% {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1.2);
            }
            100% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(1);
            }
        }
    `;
    document.head.appendChild(gameStyles);
}

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 1000);
    }
    
    // Add random star twinkle effects
    function createRandomTwinkle() {
        const twinkle = document.createElement('div');
        twinkle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: white;
            border-radius: 50%;
            pointer-events: none;
            z-index: -1;
            left: ${Math.random() * 100}vw;
            top: ${Math.random() * 100}vh;
            animation: twinkleEffect 3s ease-in-out;
        `;
        
        document.body.appendChild(twinkle);
        
        setTimeout(() => twinkle.remove(), 3000);
    }
    
    // Add twinkle animation CSS
    const twinkleStyles = document.createElement('style');
    twinkleStyles.textContent = `
        @keyframes twinkleEffect {
            0%, 100% { opacity: 0; transform: scale(0); }
            50% { opacity: 1; transform: scale(1); }
        }
    `;
    document.head.appendChild(twinkleStyles);
    
    // Create random twinkles
    setInterval(createRandomTwinkle, 2000);
    
    // Add cursor trail effect
    const trail = [];
    const trailLength = 5;
    
    document.addEventListener('mousemove', function(e) {
        trail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
        
        if (trail.length > trailLength) {
            trail.shift();
        }
        
        // Create trail particle
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: radial-gradient(circle, #64ffda, transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${e.clientX - 3}px;
            top: ${e.clientY - 3}px;
            animation: fadeTrail 0.8s ease-out forwards;
        `;
        
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 800);
    });
    
    // Add trail animation CSS
    const trailStyles = document.createElement('style');
    trailStyles.textContent = `
        @keyframes fadeTrail {
            0% { opacity: 0.8; transform: scale(1); }
            100% { opacity: 0; transform: scale(0.3); }
        }
    `;
    document.head.appendChild(trailStyles);
});

// Add some easter eggs
document.addEventListener('keydown', function(e) {
    // Konami Code easter egg
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    if (!window.konamiProgress) window.konamiProgress = 0;
    
    if (e.code === konamiCode[window.konamiProgress]) {
        window.konamiProgress++;
        if (window.konamiProgress === konamiCode.length) {
            // Easter egg activated!
            document.body.style.filter = 'hue-rotate(180deg)';
            setTimeout(() => {
                document.body.style.filter = 'none';
            }, 3000);
            window.konamiProgress = 0;
            
            // Show easter egg message
            const message = document.createElement('div');
            message.innerHTML = '🌟 EASTER EGG ACTIVATED! 🌟';
            message.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(0, 0, 0, 0.9);
                color: #64ffda;
                padding: 20px;
                border-radius: 10px;
                z-index: 10000;
                font-family: 'Orbitron', monospace;
                border: 2px solid #64ffda;
                animation: easterEggPulse 3s ease-in-out;
            `;
            document.body.appendChild(message);
            setTimeout(() => message.remove(), 3000);
        }
    } else {
        window.konamiProgress = 0;
    }
});

// Add easter egg animation
const easterEggStyles = document.createElement('style');
easterEggStyles.textContent = `
    @keyframes easterEggPulse {
        0%, 100% { transform: translate(-50%, -50%) scale(1); }
        50% { transform: translate(-50%, -50%) scale(1.1); }
    }
`;
document.head.appendChild(easterEggStyles);