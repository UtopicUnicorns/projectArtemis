class CountdownTimer {
    constructor(duration, onTick, onComplete) {
        this.duration = duration; // Duration of the countdown in seconds
        this.onTick = onTick; // Callback function called on each tick
        this.onComplete = onComplete; // Callback function called when countdown completes

        this.intervalId = null; // ID of the interval timer
        this.remainingTime = duration; // Remaining time in seconds
        this.isPaused = false; // Flag to track if the countdown is paused
    }

    start() {
        // If countdown is not already running, start it
        if (!this.intervalId) {
            this.intervalId = setInterval(() => {
                if (!this.isPaused) {
                    this.remainingTime--; // Decrement remaining time
                    this.onTick(this.remainingTime); // Call tick callback with updated remaining time

                    // If remaining time reaches 0, stop the timer and call complete callback
                    if (this.remainingTime <= 0) {
                        this.stop();
                        this.onComplete();
                    }
                }
            }, 1000); // Update every second
        }
    }

    pause() {
        // If countdown is running, pause it
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
            this.isPaused = true;
        }
    }

    resume() {
        // If countdown is paused, resume it
        if (this.isPaused) {
            this.start();
            this.isPaused = false;
        }
    }

    increaseTime(seconds) {
        // Increase the remaining time by the specified number of seconds
        this.remainingTime += seconds;
        if (this.remainingTime < 0) {
            this.remainingTime = 0;
        }
        this.onTick(this.remainingTime); // Update UI with new remaining time
    }

    stop() {
        // Stop the countdown and clear the interval timer
        clearInterval(this.intervalId);
        this.intervalId = null;
    }

    reset() {
        // Reset the countdown to its initial state
        this.remainingTime = this.duration;
        this.isPaused = false;
        this.stop();
        this.onTick(this.remainingTime); // Update UI with initial remaining time
    }
}

