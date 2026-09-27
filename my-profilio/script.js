// ==========================================
// Kushalm's Portfolio Interactive Features
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    const cursorBall = document.querySelector(".cursor-ball");

    if (cursorBall && window.matchMedia("(pointer: fine)").matches) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;

        const updateCursor = (event) => {
            mouseX = event.clientX;
            mouseY = event.clientY;
        };

        const animateCursor = () => {
            cursorBall.style.left = `${mouseX}px`;
            cursorBall.style.top = `${mouseY}px`;
            requestAnimationFrame(animateCursor);
        };

        window.addEventListener("pointermove", updateCursor);
        requestAnimationFrame(animateCursor);
    }
    
    // 1. Interactive Sidebar Tab Switcher
    const sidebarItems = document.querySelectorAll(".sidebar-item");
    
    sidebarItems.forEach(item => {
        item.addEventListener("click", () => {
            // Remove active class from all items
            sidebarItems.forEach(i => i.classList.remove("active"));
            
            // Add active class to clicked item
            item.classList.add("active");

            // Show a mini notification when switching files
            const fileName = item.textContent.trim();
            showVSCodeToast(`Opened file: ${fileName}`);
        });
    });

    // 2. Add Line Numbers to Code Cards Automatically
    const cards = document.querySelectorAll(".card");
    cards.forEach((card, index) => {
        const lineNum = document.createElement("span");
        lineNum.style.cssText = `
            font-family: var(--font-mono);
            color: #5c6370;
            font-size: 0.8rem;
            float: right;
            user-select: none;
        `;
        lineNum.textContent = `Ln ${ (index + 1) * 12 }, Col 1`;
        card.prepend(lineNum);
    });

    // 3. Cricket Interactive Counter / Mini Widget
    const cricketBadge = document.querySelector(".sports-badge");
    if (cricketBadge) {
        let runs = 0;
        cricketBadge.style.cursor = "pointer";
        cricketBadge.title = "Click to score runs!";

        cricketBadge.addEventListener("click", () => {
            runs += 4;
            cricketBadge.textContent = `🏏 Favorite Sport: Cricket | Score: ${runs} Runs! 🏏`;
            showVSCodeToast(`FOUR! Kushalm scores +4 runs! Total: ${runs}`);
        });
    }

    // 4. Custom VS Code Notification Toast Generator
    function showVSCodeToast(message) {
        let toast = document.getElementById("vscode-toast");
        
        if (!toast) {
            toast = document.createElement("div");
            toast.id = "vscode-toast";
            toast.style.cssText = `
                position: fixed;
                bottom: 30px;
                right: 20px;
                background-color: #252526;
                color: #cccccc;
                border: 1px solid #007acc;
                border-left: 4px solid #007acc;
                padding: 10px 18px;
                font-family: var(--font-mono), monospace;
                font-size: 0.85rem;
                border-radius: 4px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.5);
                z-index: 1000;
                transition: opacity 0.3s ease;
            `;
            document.body.appendChild(toast);
        }

        toast.textContent = message;
        toast.style.opacity = "1";

        // Auto hide notification after 2.5 seconds
        setTimeout(() => {
            toast.style.opacity = "0";
        }, 2500);
    }

    // Welcome Console Message
    console.log("%c [VS Code Console] Portfolio loaded for Kushalm! ", "background: #007acc; color: white; font-weight: bold; padding: 4px 8px; border-radius: 3px;");
});