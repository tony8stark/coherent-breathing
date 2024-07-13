document.addEventListener('DOMContentLoaded', function() {
     let timer;
     let animationTimer;
     let isInhaling = true;
     let sessionDuration = 60; // Default to 1 minute
     let isRunning = false;
     let isPaused = false;
     let soundEnabled = true;
     const breathingCircle = document.getElementById('breathing-circle');
     const startPauseButton = document.getElementById('startPause');
     const resetButton = document.getElementById('reset');
     const inhaleSound = document.getElementById('inhale-sound');
     const exhaleSound = document.getElementById('exhale-sound');

     function startPauseTimer() {
         if (!isRunning) {
             // Start the timer
             sessionDuration = parseInt(document.getElementById('duration').value) * 60;
             isRunning = true;
             isPaused = false;
             timer = setInterval(updateTimer, 1000);
             breathingAnimation();
             updateControlsVisibility();
             updateDisplay();
             breathingCircle.classList.add('animate');
             startPauseButton.textContent = 'Pause';
             // Play the first sound after a short delay
             setTimeout(() => {
                 if (soundEnabled) playBreathSound(true);
             }, 100);
         } else if (isPaused) {
             // Resume the timer
             isPaused = false;
             timer = setInterval(updateTimer, 1000);
             breathingAnimation();
             breathingCircle.classList.add('animate');
             startPauseButton.textContent = 'Pause';
         } else {
             // Pause the timer
             clearInterval(timer);
             clearTimeout(animationTimer);
             isPaused = true;
             breathingCircle.classList.remove('animate');
             startPauseButton.textContent = 'Resume';
         }
         updateControlsVisibility();
     }

     function resetTimer() {
         clearInterval(timer);
         clearTimeout(animationTimer);
         isRunning = false;
         isPaused = false;
         isInhaling = true;
         sessionDuration = parseInt(document.getElementById('duration').value) * 60;
         updateDisplay();
         breathingCircle.classList.remove('animate');
         breathingCircle.style.transform = 'scale(0.5)';
         document.getElementById('action').textContent = 'Ready to begin...';
         startPauseButton.textContent = 'Start';
         updateControlsVisibility();
     }

     function updateTimer() {
         if (sessionDuration > 0) {
             sessionDuration--;
             updateDisplay();
         } else {
             clearInterval(timer);
             clearTimeout(animationTimer);
             isRunning = false;
             showCompletionMessage();
         }
     }

     function breathingAnimation() {
         if (!isRunning || isPaused) return;

         const action = document.getElementById('action');

         if (isInhaling) {
             action.textContent = 'Now inhale...';
             if (soundEnabled) playBreathSound(true);
         } else {
             action.textContent = 'Now exhale...';
             if (soundEnabled) playBreathSound(false);
         }

         isInhaling = !isInhaling;

         animationTimer = setTimeout(breathingAnimation, 5000);
     }

     function playBreathSound(isInhale) {
         if (isInhale) {
             inhaleSound.currentTime = 0;
             inhaleSound.play();
         } else {
             exhaleSound.currentTime = 0;
             exhaleSound.play();
         }
     }

     function updateDisplay() {
         const minutes = Math.floor(sessionDuration / 60);
         const seconds = sessionDuration % 60;
         document.getElementById('timer').textContent = 
             `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
     }

     function updateControlsVisibility() {
         if (isRunning || isPaused) {
             resetButton.classList.remove('hidden');
             document.getElementById('duration').classList.add('hidden');
         } else {
             resetButton.classList.add('hidden');
             document.getElementById('duration').classList.remove('hidden');
         }
     }

     function changeDuration() {
         resetTimer();
     }

     function showCompletionMessage() {
         document.getElementById('completion-message').style.display = 'flex';
     }

     function hideCompletionMessage() {
         document.getElementById('completion-message').style.display = 'none';
         resetTimer();
     }

     document.getElementById('sound-toggle').addEventListener('change', function() {
         soundEnabled = this.checked;
     });

     // Background changing functionality
     const backgroundDropdown = document.getElementById('background-dropdown');
 const backgroundImages = {
     mountains: 'https://images.unsplash.com/photo-1519681393784-d120267933ba',
     forest: 'https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1',
     beach: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
     downtown: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000',
     cafe: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0'
 };

 function changeBackground() {
     const selectedBackground = backgroundDropdown.value;
     document.body.style.backgroundImage = `url('${backgroundImages[selectedBackground]}')`;
 }

 backgroundDropdown.addEventListener('change', changeBackground);

 // Initialize with default background
 changeBackground();

 startPauseButton.addEventListener('click', startPauseTimer);
 resetButton.addEventListener('click', resetTimer);
 document.getElementById('duration').addEventListener('change', changeDuration);
 
 // Make sure hideCompletionMessage is accessible globally
 window.hideCompletionMessage = hideCompletionMessage;

 resetTimer(); // Initialize the timer display
});
