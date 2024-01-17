import Timer from './timer.js';

const myTimer = new Timer();

// Inputs
const dd = document.querySelector('#dd');
const mm = document.querySelector('#mm');
const yy = document.querySelector('#yy');

const inputsArr = [dd, mm, yy];

// Result timer
const result = document.querySelectorAll('#timer-con span');

const arrow = document.querySelector('#arrow');

arrow.addEventListener('click', () => {
    const isDateValid = myTimer.isDateValid(dd.value, mm.value, yy.value);
    if (isDateValid === true) {
        const day = parseInt(dd.value, 10);
        const month = parseInt(mm.value, 10) - 1;
        const year = parseInt(yy.value, 10);

        const myDate = new Date(year, month, day);

        // Verificar si la fecha generada es diferente a los valores ingresados
        if (myDate.getDate() !== day) {
            showError(dd, "The day submited does not correspond tho the given month");
            clearResult();
            return;
        }

        myTimer.setDate(myDate);

        myTimer.setState("success");
        
        if (myTimer.getYears() > 0) animateValue(result[0], 0, myTimer.getYears(), 500); else result[0].innerHTML = 0;
        if (myTimer.getMonths() > 0) animateValue(result[1], 0, myTimer.getMonths(), 800); else result[1].innerHTML = 0;
        if (myTimer.getDays() > 0) animateValue(result[2], 0, myTimer.getDays(), 1000); else result[2].innerHTML = 0;

        resetErrors();
        
    } else {
        for (let key in isDateValid) {
            if (isDateValid.hasOwnProperty(key)) {
                switch (key) {
                    case "d":
                        showError(dd, isDateValid[key]);
                        break;
                
                    case "m":
                        showError(mm, isDateValid[key]);
                        break;
                    case "y":
                        showError(yy, isDateValid[key]);
                        break;
                    case "future":
                        showError(dd, isDateValid[key], [mm, yy]);
                        break;
                }

                if (myTimer.state === 'success') clearResult();
                myTimer.setState("failed");
                // console.log(`Field: ${key}, Error: ${isDateValid[key]}`);
            }
        }
    }
});

function clearResult() {
    animateValue(result[0], myTimer.getYears(), 0, 300, true);
    animateValue(result[1], myTimer.getMonths(), 0, 450, true);
    animateValue(result[2], myTimer.getDays(), 0, 600, true);
}

function resetErrors() {
    inputsArr.forEach(el => {
        el.nextElementSibling.classList.add('opacity-0');
        el.nextElementSibling.classList.add('select-none');
        el.nextElementSibling.textContent = "This field is required";
    });
}

function showError(input, content, optionals = []) {
    input.nextElementSibling.textContent = content;
    input.nextElementSibling.classList.remove('opacity-0');
    input.nextElementSibling.classList.remove('select-none');
    input.nextElementSibling.classList.add('error');

    optionals.forEach(opt => {
        opt.nextElementSibling.textContent = content;
        opt.nextElementSibling.classList.remove('opacity-0');
        input.nextElementSibling.classList.remove('select-none');
        opt.nextElementSibling.classList.add('error');
    });
}

function animateValue(node, start, end, duration, clear = false) {
    if (start === end) return;

    let startTime;
    function update(time) {
        if (!startTime) startTime = time;
        const progress = Math.min((time - startTime) / duration, 1);
        const current = start + progress * (end - start);
        node.innerHTML = Math.round(current);

        if (progress < 1) {
            requestAnimationFrame(update);
        } else if (clear) {
            result[0].innerHTML = "--";
            result[1].innerHTML = "--";
            result[2].innerHTML = "--";
        }
    }

    requestAnimationFrame(update);
}
