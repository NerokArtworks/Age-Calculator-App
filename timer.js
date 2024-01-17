export default class Timer {
    date;
    #state;

    constructor() {
        this.date = new Date();
    }

    setDate(date) {
        this.date = date;
        // console.log(`Updated ${this.date}`);
    }

    setState(state) {
        this.#state = state;
    }

    get state() {
        return this.#state;
    }

    getDays() {
        const now = new Date();

        const milisecondsDiff = now - this.date;

        const daysDiff = Math.abs(Math.floor(milisecondsDiff / (1000 * 60 * 60 * 24)));

        return daysDiff;
    }

    getMonths() {
        const now = new Date();
      
        const yearsDiff = now.getFullYear() - this.date.getFullYear();
        const monthsDiff = now.getMonth() - this.date.getMonth();
      
        // Calculate total difference between months
        const totalMonthsDiff = yearsDiff * 12 + monthsDiff;
      
        // Check if birthday passed this month
        const isBirthdayPassed = now.getDate() >= this.date.getDate();
      
        // Subtract 1 year if birthday passed this month
        const finalMonthsDiff = isBirthdayPassed ? totalMonthsDiff : totalMonthsDiff - 1;
      
        return Math.abs(finalMonthsDiff);
    }
      
    getYears() {
        const now = new Date();
      
        const yearsDiff = now.getFullYear() - this.date.getFullYear();
      
        // Check if birthday is already passed
        const isBirthdayPassed = now.getMonth() > this.date.getMonth() || (now.getMonth() === this.date.getMonth() && now.getDate() >= this.date.getDate());
      
        // Subtract 1 year if birthday is already passed
        const finalYearsDiff = isBirthdayPassed ? yearsDiff : yearsDiff - 1;
      
        return Math.abs(finalYearsDiff);
    }

    isDateValid(d, m, y) {
        let errors = {};

        if (isNaN(d) || (d < 1 || d > 31) ) errors["d"] = "Day field must be a number between 1 and 31";
        if (isNaN(m) || (m < 1 || m > 12) ) errors["m"] = "Month field must be a number between 1 and 12";
        if (isNaN(y) || (y < 1) ) errors["y"] = "Year field must be a number";

        let newDate = new Date(y, m - 1, d);

        if (newDate > new Date() && Object.keys(errors).length === 0) {
            errors["future"] = "This date does not belong to the past";
        }

        if (Object.keys(errors).length !== 0) return errors;
        return true;
    } 
}