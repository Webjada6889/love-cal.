// Load history from localStorage
let history = JSON.parse(localStorage.getItem('loveHistory')) || [];

function saveToHistory(name1, name2, percentage) {
    history.unshift({
        name1: name1,
        name2: name2,
        percentage: percentage,
        date: new Date().toLocaleDateString()
    });

    if (history.length > 8) history.pop(); // Keep only last 8

    localStorage.setItem('loveHistory', JSON.stringify(history));
    renderHistory();
}

function renderHistory() {
    const list = document.getElementById('historyList');
    list.innerHTML = '';

    history.forEach(item => {
        const div = document.createElement('div');
        div.className = 'history-item';
        div.innerHTML = `
            <strong>${item.name1}</strong> ❤️ <strong>${item.name2}</strong><br>
            <span style="color:#ff3366">${item.percentage}%</span> - ${item.date}
        `;
        list.appendChild(div);
    });
}

function confetti() {
    for (let i = 0; i < 80; i++) {
        setTimeout(() => {
            const conf = document.createElement('div');
            conf.style.position = 'fixed';
            conf.style.left = Math.random() * 100 + 'vw';
            conf.style.top = '-10px';
            conf.style.fontSize = '20px';
            conf.style.zIndex = '1000';
            conf.textContent = ['❤️', '💕', '💖', '✨'][Math.floor(Math.random() * 4)];
            
            document.body.appendChild(conf);

            let y = 0;
            const fall = setInterval(() => {
                y += Math.random() * 8 + 5;
                conf.style.top = y + 'px';
                conf.style.transform = `rotate(${y * 2}deg)`;
                
                if (y > window.innerHeight) {
                    clearInterval(fall);
                    conf.remove();
                }
            }, 20);
        }, i * 8);
    }
}

function calculateLove() {
    const name1 = document.getElementById("name1").value.trim();
    const name2 = document.getElementById("name2").value.trim();
    const resultDiv = document.getElementById("result");

    if (!name1 || !name2) {
        resultDiv.innerHTML = "😊 Please enter both names!";
        resultDiv.style.color = "red";
        resultDiv.classList.add("show");
        return;
    }

    const lovePercentage = Math.floor(Math.random() * 41) + 60;

    let message = "";
    if (lovePercentage >= 90) message = "🔥 Soulmates! Perfect Match!";
    else if (lovePercentage >= 80) message = "💕 Amazing Connection!";
    else if (lovePercentage >= 70) message = "💖 Great Match!";
    else message = "💞 There's potential!";

    resultDiv.innerHTML = `
        <h2>${lovePercentage}%</h2>
        <p>${message}</p>
        <p><strong>${name1}</strong> ❤️ <strong>${name2}</strong></p>
    `;
    resultDiv.style.color = "#ff3366";
    resultDiv.classList.add("show");

    // Save to history
    // saveToHistory(name1, name2, lovePercentage);

    // Confetti for high scores
    if (lovePercentage >= 99) {
        confetti();
    }
}

// function clearAll() {
//     document.getElementById("name1").value = "";
//     document.getElementById("name2").value = "";
//     document.getElementById("result").classList.remove("show");
// }
