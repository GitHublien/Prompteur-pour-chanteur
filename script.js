document.addEventListener('DOMContentLoaded', function() {
    const resetIcon = '↺';
    const generalResetIcon = '🔄';

    window.lyrics = [
        {
            text: "Allô, allô James !\nQuelles nouvelles ?\nAbsente depuis quinze jours,\nAu bout du fil\nJe vous appelle ;\nQue trouverai-je à mon retour ?",
            duration: 24.00,
            color: "#ff69b4"
        },
        {
            text: "Tout va très bien, Madame la Marquise,\nTout va très bien, tout va très bien.\nPourtant, il faut, il faut que l'on vous dise,\nOn déplore un tout petit rien :\nUn incident, une bêtise,\nLa mort de votre jument grise,\nMais, à part ça, Madame la Marquise\nTout va très bien, tout va très bien.",
            duration: 29.67,
            color: "#1e90ff"
        },
        {
            text: "Allô, allô Martin !\nQuelles nouvelles ?\nMa jument gris' morte aujourd'hui !\nExpliquez-moi\nCocher fidèle,\nComment cela s'est-il produit ?",
            duration: 16.76,
            color: "#ff69b4"
        },
        {
            text: "Cela n'est rien, Madame la Marquise,\nCela n'est rien, tout va très bien.\nPourtant il faut, il faut que l'on vous dise,\nOn déplore un tout petit rien :\nElle a péri\nDans l'incendie\nQui détruisit vos écuries.\nMais, à part ça, Madame la Marquise\nTout va très bien, tout va très bien.",
            duration: 29.74,
            color: "#00ff00"
        },
        {
            text: "Allô, allô Pascal !\nQuelles nouvelles ?\nMes écuries ont donc brûlé ?\nExpliquez-moi\nMon chef modèle,\nComment cela s'est-il passé ?",
            duration: 16.61,
            color: "#ff69b4"
        },
        {
            text: "Cela n'est rien, Madame la Marquise,\nCela n'est rien, tout va très bien.\nPourtant il faut, il faut que l'on vous dise,\nOn déplore un tout petit rien :\nSi l'écurie brûla, Madame,\nC'est qu'le château était en flammes.\nMais, à part ça, Madame la Marquise\nTout va très bien, tout va très bien.",
            duration: 30.69,
            color: "#ffa500"
        },
        {
            text: "Allô, allô Lucas !\nQuelles nouvelles ?\nNotre château est donc détruit !\nExpliquez-moi\nCar je chancelle\nComment cela s'est-il produit ?",
            duration: 15.72,
            color: "#ff69b4"
        },
        {
            text: "Eh bien ! Voila, Madame la Marquise,\nApprenant qu'il était ruiné,\nA pein' fut-il rev'nu de sa surprise\nQue M'sieur l'Marquis s'est suicidé.",
            duration: 14.67,
            color: "#00ffff"
        },
        {
            text: "Et c'est en ramassant la pell'\nQu'il renversa tout's les chandelles,\nMettant le feu à tout l'château\nQui s'consuma de bas en haut ;\nLe vent soufflant sur l'incendie,\nLe propagea sur l'écurie,\nEt c'est ainsi qu'en un moment\nOn vit périr votre jument !",
            duration: 15.79,
            color: "#00ffff"
        },
        {
            text: "Mais, à part ça, Madame la Marquise,\nTout va très bien, tout va très bien.",
            duration: 10.24,
            color: "#ff00ff"
        },
        {
            text: "Tout va très bien, tout va très bien.",
            duration: 5.27,
            color: "#ff00ff"
        }
    ];

    const originalLyrics = JSON.parse(JSON.stringify(window.lyrics));

    let currentIndex = 0;
    let countdownTimer = null;
    let isPlaying = false;
    let remainingTime = 0;
    const maxParticles = 100;

    const elements = {
        title: document.getElementById('title'),
        subtitle: document.getElementById('subtitle'),
        startMessage: document.getElementById('start-message'),
        lyrics: document.getElementById('lyrics'),
        status: document.getElementById('status'),
        countdown: document.getElementById('countdown'),
        playButton: document.getElementById('playButton'),
        pauseButton: document.getElementById('pauseButton'),
        stopButton: document.getElementById('stopButton'),
        prevButton: document.getElementById('prevButton'),
        nextButton: document.getElementById('nextButton'),
        startControlButton: document.getElementById('startControlButton'),
        endButton: document.getElementById('endButton'),
        backwardButton: document.getElementById('backwardButton'),
        forwardButton: document.getElementById('forwardButton'),
        progress: document.getElementById('progress'),
        progressBar: document.getElementById('progressBar'),
        particles: document.getElementById('particles'),
        homeButton: document.getElementById('homeButton'),
        tempoAdjustButton: document.getElementById('tempoAdjustButton'),
        tempoModal: document.getElementById('tempoModal'),
        closeTempoModal: document.getElementById('closeTempoModal'),
        tempoForm: document.getElementById('tempoForm'),
        pageNumber: document.getElementById('pageNumber')
    };

    function addTouchSupport(element, callback) {
        if (element) {
            element.addEventListener('touchstart', function(e) {
                e.preventDefault();
                callback();
            });
        }
    }

    window.updateStatus = function(status) {
        elements.status.textContent = status;
    }

    function updateCountdown(seconds) {
        elements.countdown.textContent = `${seconds.toFixed(1)}s`;
    }

    function resetCountdown() {
        remainingTime = window.lyrics[currentIndex].duration;
        updateCountdown(remainingTime);
    }

    function updateProgress() {
        const totalDuration = window.lyrics[currentIndex].duration;
        const progress = ((totalDuration - remainingTime) / totalDuration) * 100;
        elements.progress.style.width = `${progress}%`;
    }

    function createParticle() {
        if (elements.particles.children.length >= maxParticles) return;

        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.bottom = '-10px';
        const size = Math.random() * 8 + 4;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = window.lyrics[currentIndex].color;
        particle.style.opacity = 0.6;
        particle.style.animationDuration = `${Math.random() * 2 + 3}s`;
        elements.particles.appendChild(particle);

        particle.addEventListener('animationend', () => {
            if (elements.particles.contains(particle)) {
                elements.particles.removeChild(particle);
            }
        });
    }

    window.displayLyrics = function() {
        if (currentIndex < window.lyrics.length) {
            elements.title.style.display = 'none';
            elements.subtitle.style.display = 'none';
            elements.startMessage.style.display = 'none';
            elements.lyrics.textContent = window.lyrics[currentIndex].text;
            elements.pageNumber.textContent = `Partie ${currentIndex + 1} / ${window.lyrics.length}`;

            elements.lyrics.style.color = window.lyrics[currentIndex].color;
            elements.lyrics.style.textShadow = `
                -1px -1px 0 #000,  
                1px -1px 0 #000,
                -1px 1px 0 #000,
                1px 1px 0 #000,
                0 0 10px ${window.lyrics[currentIndex].color},
                0 0 20px ${window.lyrics[currentIndex].color},
                0 0 30px ${window.lyrics[currentIndex].color}
            `;

            if (window.lyrics[currentIndex].color === "#ff69b4") {
                elements.lyrics.style.textShadow += `, 
                    0 0 40px #ff69b4,
                    0 0 50px #ff69b4,
                    0 0 60px #ff69b4
                `;
            }

            elements.countdown.style.color = window.lyrics[currentIndex].color;
            if (!isPlaying) {
                resetCountdown();
            }
            if (!isPlaying) {
                window.updateStatus('Prêt à jouer');
            } else {
                window.updateStatus('En lecture');
            }
        } else {
            elements.lyrics.textContent = "Fin de la chanson";
            elements.lyrics.style.color = 'var(--text-color)';
            elements.lyrics.style.textShadow = "none";
            isPlaying = false;
            window.updateStatus('Terminé');
            elements.countdown.textContent = '';
            elements.progress.style.width = '0%';
            elements.pageNumber.textContent = '';
        }
    }

    function startCountdown() {
        if (countdownTimer) clearInterval(countdownTimer);
        if (!isPlaying) window.displayLyrics();
        const startTime = Date.now();
        const initialRemainingTime = remainingTime;
        
        countdownTimer = setInterval(() => {
            const elapsedTime = (Date.now() - startTime) / 1000;
            remainingTime = initialRemainingTime - elapsedTime;
            
            if (remainingTime <= 0) {
                clearInterval(countdownTimer);
                currentIndex++;
                if (currentIndex < window.lyrics.length) {
                    remainingTime = window.lyrics[currentIndex].duration;
                    window.displayLyrics();
                    startCountdown();
                } else {
                    isPlaying = false;
                    window.displayLyrics();
                }
            } else {
                updateCountdown(remainingTime);
                updateProgress();
                if (Math.random() < 0.3) {
                    createParticle();
                }
            }
        }, 100);
    }

    function goToHome() {
        clearInterval(countdownTimer);
        currentIndex = 0;
        isPlaying = false;
        elements.title.style.display = 'block';
        elements.subtitle.style.display = 'block';
        elements.startMessage.style.display = 'block';
        elements.lyrics.textContent = "";
        window.updateStatus('Accueil');
        elements.countdown.textContent = '';
        elements.progress.style.width = '0%';
        elements.pageNumber.textContent = '';
        remainingTime = window.lyrics[currentIndex].duration;
    }

    function goToSongStart() {
        clearInterval(countdownTimer);
        currentIndex = 0;
        isPlaying = false;
        window.displayLyrics();
        window.updateStatus('Prêt à jouer');
        remainingTime = window.lyrics[currentIndex].duration;
        updateCountdown(remainingTime);
        updateProgress();
    }

    function handlePlayButton() {
        if (!isPlaying) {
            if (currentIndex >= window.lyrics.length || elements.lyrics.textContent === "") {
                currentIndex = 0;
                remainingTime = window.lyrics[currentIndex].duration;
                window.displayLyrics();
            }
            isPlaying = true;
            startCountdown();
            window.updateStatus('En lecture');
        }
    }

    function handlePauseButton() {
        if (isPlaying) {
            isPlaying = false;
            clearInterval(countdownTimer);
            window.updateStatus('En pause');
        }
    }

    function handleStopButton() {
        isPlaying = false;
        clearInterval(countdownTimer);
        currentIndex = 0;
        window.displayLyrics();
        window.updateStatus('Arrêté');
        remainingTime = window.lyrics[currentIndex].duration;
        updateCountdown(remainingTime);
        updateProgress();
    }

    function handlePrevButton() {
        currentIndex = Math.max(0, currentIndex - 1);
        remainingTime = window.lyrics[currentIndex].duration;
        window.displayLyrics();
        if (isPlaying) {
            startCountdown();
        } else {
            updateCountdown(remainingTime);
            updateProgress();
        }
        window.updateStatus('Section précédente');
    }

    function handleNextButton() {
        currentIndex = Math.min(window.lyrics.length - 1, currentIndex + 1);
        remainingTime = window.lyrics[currentIndex].duration;
        window.displayLyrics();
        if (isPlaying) {
            startCountdown();
        } else {
            updateCountdown(remainingTime);
            updateProgress();
        }
        window.updateStatus('Section suivante');
    }

    function handleEndButton() {
        clearInterval(countdownTimer);
        currentIndex = window.lyrics.length - 1;
        isPlaying = false;
        window.displayLyrics();
        window.updateStatus('Fin de la chanson');
    }

    function handleBackwardButton() {
        remainingTime = Math.min(window.lyrics[currentIndex].duration, remainingTime + 1);
        updateCountdown(remainingTime);
        updateProgress();
        if (isPlaying) {
            clearInterval(countdownTimer);
            startCountdown();
        }
    }

    function handleForwardButton() {
        remainingTime = Math.max(0, remainingTime - 1);
        updateCountdown(remainingTime);
        updateProgress();
        if (remainingTime === 0) {
            currentIndex++;
            if (currentIndex < window.lyrics.length) {
                remainingTime = window.lyrics[currentIndex].duration;
                window.displayLyrics();
            } else {
                isPlaying = false;
                window.displayLyrics();
            }
        }
        if (isPlaying) {
            clearInterval(countdownTimer);
            startCountdown();
        }
    }

    elements.playButton.addEventListener('click', handlePlayButton);
    elements.pauseButton.addEventListener('click', handlePauseButton);
    elements.stopButton.addEventListener('click', handleStopButton);
    elements.prevButton.addEventListener('click', handlePrevButton);
    elements.nextButton.addEventListener('click', handleNextButton);
    elements.startControlButton.addEventListener('click', goToSongStart);
    elements.endButton.addEventListener('click', handleEndButton);
    elements.backwardButton.addEventListener('click', handleBackwardButton);
    elements.forwardButton.addEventListener('click', handleForwardButton);
    elements.homeButton.addEventListener('click', goToHome);

    addTouchSupport(elements.playButton, handlePlayButton);
    addTouchSupport(elements.pauseButton, handlePauseButton);
    addTouchSupport(elements.stopButton, handleStopButton);
    addTouchSupport(elements.prevButton, handlePrevButton);
    addTouchSupport(elements.nextButton, handleNextButton);
    addTouchSupport(elements.startControlButton, goToSongStart);
    addTouchSupport(elements.endButton, handleEndButton);
    addTouchSupport(elements.backwardButton, handleBackwardButton);
    addTouchSupport(elements.forwardButton, handleForwardButton);
    addTouchSupport(elements.homeButton, goToHome);

    function handleProgressClick(event) {
        const rect = elements.progressBar.getBoundingClientRect();
        const clickX = event.type.startsWith('touch') ? event.touches[0].clientX - rect.left : event.clientX - rect.left;
        const width = rect.width;
        const clickRatio = clickX / width;
        if (currentIndex < window.lyrics.length) {
            remainingTime = window.lyrics[currentIndex].duration * (1 - clickRatio);
            updateCountdown(remainingTime);
            updateProgress();
            if (isPlaying) {
                clearInterval(countdownTimer);
                startCountdown();
            }
        }
    }

    elements.progressBar.addEventListener('click', handleProgressClick);
    elements.progressBar.addEventListener('touchstart', handleProgressClick);

    let isDragging = false;

    elements.progressBar.addEventListener('mousedown', (event) => {
        isDragging = true;
        handleProgressClick(event);
    });

    document.addEventListener('mousemove', (event) => {
        if (isDragging) {
            handleProgressClick(event);
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    elements.progressBar.addEventListener('touchmove', (event) => {
        if (event.touches.length > 0) {
            handleProgressClick(event);
        }
    }, { passive: false });

    elements.progressBar.addEventListener('touchend', () => {
        isDragging = false;
    });

    function openTempoModalFunc() {
        elements.tempoModal.style.display = 'block';
        elements.tempoForm.innerHTML = '';

        window.lyrics.forEach((lyric, index) => {
            const wrapper = document.createElement('div');
            wrapper.style.display = 'flex';
            wrapper.style.alignItems = 'center';
            wrapper.style.marginBottom = '10px';

            const label = document.createElement('label');
            label.htmlFor = `tempo-${index}`;
            label.textContent = `Partie ${index + 1} (${lyric.text.slice(0, 20)}...): `;

            const input = document.createElement('input');
            input.type = 'number';
            input.step = '0.01';
            input.value = lyric.duration.toFixed(2);
            input.id = `tempo-${index}`;
            input.min = '1';

            const resetButton = document.createElement('button');
            resetButton.type = 'button';
            resetButton.textContent = resetIcon;
            resetButton.title = 'Réinitialiser cette partie';
            resetButton.addEventListener('click', () => resetSingleTempo(index));

            wrapper.appendChild(label);
            wrapper.appendChild(input);
            wrapper.appendChild(resetButton);
            elements.tempoForm.appendChild(wrapper);
        });

        const buttonWrapper = document.createElement('div');
        buttonWrapper.style.marginTop = '20px';

        const applyButton = document.createElement('button');
        applyButton.type = 'submit';
        applyButton.textContent = 'Appliquer';
        
        const resetAllButton = document.createElement('button');
        resetAllButton.type = 'button';
        resetAllButton.innerHTML = `${generalResetIcon} Réinitialisation générale`;
        resetAllButton.addEventListener('click', resetTempo);

        buttonWrapper.appendChild(applyButton);
        buttonWrapper.appendChild(resetAllButton);
        elements.tempoForm.appendChild(buttonWrapper);
    }

    function closeTempoModalFunc() {
        elements.tempoModal.style.display = 'none';
    }

    function adjustTempo(event) {
        event.preventDefault();
        if (confirm("Êtes-vous sûr de vouloir appliquer ces changements de tempo ?")) {
            const inputs = elements.tempoForm.querySelectorAll('input[type="number"]');
            inputs.forEach((input, index) => {
                const newDuration = parseFloat(input.value);
                if (!isNaN(newDuration) && newDuration > 0) {
                    window.lyrics[index].duration = newDuration;
                }
            });
            closeTempoModalFunc();
            if (currentIndex < window.lyrics.length) {
                resetCountdown();
                if (isPlaying) {
                    startCountdown();
                }
            }
            window.updateStatus('Tempos modifiés');
        }
    }

    function resetSingleTempo(index) {
        if (confirm(`Êtes-vous sûr de vouloir réinitialiser le tempo de la partie ${index + 1} ?`)) {
            window.lyrics[index].duration = originalLyrics[index].duration;
            document.getElementById(`tempo-${index}`).value = window.lyrics[index].duration.toFixed(2);
            window.updateStatus(`Tempo de la partie ${index + 1} réinitialisé`);
        }
    }

    function resetTempo() {
        if (confirm("Êtes-vous sûr de vouloir réinitialiser tous les tempos ?")) {
            window.lyrics = JSON.parse(JSON.stringify(originalLyrics));
            closeTempoModalFunc();
            if (currentIndex < window.lyrics.length) {
                resetCountdown();
                if (isPlaying) {
                    startCountdown();
                }
            }
            window.updateStatus('Tempos réinitialisés');
            window.displayLyrics();
        }
    }

    elements.tempoAdjustButton.addEventListener('click', openTempoModalFunc);
    elements.closeTempoModal.addEventListener('click', closeTempoModalFunc);
    elements.tempoForm.addEventListener('submit', adjustTempo);

    addTouchSupport(elements.tempoAdjustButton, openTempoModalFunc);

    window.addEventListener('click', (event) => {
        if (event.target == elements.tempoModal) {
            closeTempoModalFunc();
        }
    });

    goToHome();
});