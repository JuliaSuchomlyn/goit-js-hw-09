import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
        return resolve({position, delay})
    // Fulfill
    } else {
      return reject({ position, delay });
    // Reject
  }
  })
}

function onButtonSubmit(e) {
  e.preventDefault();

  let delay = e.currentTarget.delay.value;
  const step = e.currentTarget.step.value;
  const amount = e.currentTarget.amount.value;

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => { Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`); })
      .catch(({ position, delay }) => { Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`); });
    delay += step;
  }
  
}
formEl.addEventListener('click', onButtonSubmit);
