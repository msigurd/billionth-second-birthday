document.addEventListener('DOMContentLoaded', () => {
  const BIRTHDATE_PARAM_KEY = 'birthdate';
  const BIRTHDATE_INPUT = document.getElementById('birthdate-input');
  const BSB_OUTPUT_CONTAINER = document.getElementById('bsb-output-container');
  const BSB_OUTPUT = document.getElementById('bsb-output');

  readBirthdateParam();
  calculate(BIRTHDATE_INPUT.value);

  function readBirthdateParam() {
    BIRTHDATE_INPUT.value = readUrlParam(BIRTHDATE_PARAM_KEY);
  }

  function calculate(birthdateString) {
    if (!birthdateString) return toggleBsb(false);

    BSB_OUTPUT.value = new Date(new Date(birthdateString).getTime() + 1_000_000_000_000)
                         .toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    resetBsb();
    toggleBsb(true);
  }

  // Snap back to the hidden state without transitioning, so that showing it again replays the entrance animation
  function resetBsb() {
    BSB_OUTPUT_CONTAINER.style.transition = 'none';
    toggleBsb(false);
    BSB_OUTPUT_CONTAINER.offsetWidth; // Force reflow
    BSB_OUTPUT_CONTAINER.style.transition = '';
  }

  function toggleBsb(on) {
    BSB_OUTPUT_CONTAINER.classList.toggle('hidden', !on);
  }

  BIRTHDATE_INPUT.addEventListener('input', ({ target: { value } }) => {
    setUrlParam(BIRTHDATE_PARAM_KEY, value);
    calculate(value);
  });
});

/* Helpers */

function readUrlParam(key) {
  return new URLSearchParams(window.location.search).get(key);
}

function setUrlParam(key, value) {
  const url = new URL(window.location);
  value ? url.searchParams.set(key, value) : url.searchParams.delete(key);
  window.history.replaceState({}, '', url);
}
