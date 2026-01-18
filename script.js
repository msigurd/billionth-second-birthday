document.addEventListener('DOMContentLoaded', () => {
  const BIRTHDATE_INPUT = document.getElementById('birthdate-input');
  const BSB_OUTPUT_CONTAINER = document.getElementById('bsb-output-container');
  const BSB_OUTPUT = document.getElementById('bsb-output');

  calculate(BIRTHDATE_INPUT.value);

  function calculate(birthdateString) {
    if (!birthdateString) return toggleBsb(false);

    BSB_OUTPUT.value = new Date(new Date(birthdateString).getTime() + 1_000_000_000_000)
                         .toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    toggleBsb(true);
  }

  function toggleBsb(on) {
    BSB_OUTPUT_CONTAINER.classList.toggle('hidden', !on);
  }

  BIRTHDATE_INPUT.addEventListener('input', event => calculate(event.target.value));
});
