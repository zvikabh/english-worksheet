'use strict';

let vocab;

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
};

async function loadVocab() {
  // Get the vocab URL argument
  const urlParams = new URLSearchParams(window.location.search);
  const jsonUrl = 'data/' + urlParams.get('vocab')
  const response = await fetch(jsonUrl);
  if (!response.ok) {
    alert(`Failed to load ${jsonUrl}, status: ${response.status}`);
    throw new Error(`Failed to load ${jsonUrl}, status: ${response.status}`);
  }
  vocab = await response.json();
}

function buildWorksheet() {
  shuffle(vocab);
  const urlParams = new URLSearchParams(window.location.search);
  const practiceMode = (urlParams.get('practice-mode') === 'on');
  const buildVocabEntry = practiceMode ? buildVocabEntryForPractice : buildVocabEntryForQuiz;
  vocab.forEach(vocabEntry => {
    $('#main').append(buildVocabEntry(vocabEntry));
  });
}

function buildVocabEntryForQuiz(entry) {
  return ($('<div class="row mb-4">')
    .append($('<div class="col">')
      .append($('<span class="pe-3">').text(entry.heb))
      .append($('<span>').text('________________'))
    )
  );
}

function buildVocabEntryForPractice(entry) {
  return ($('<div class="row mb-4">')
    .append($('<div class="col">')
      .append($('<span class="pe-3">').text(entry.heb))
      .append($('<span class="pe-3">').text(entry.eng))
      .append($('<span class="pe-3">').text('________________'))
      .append($('<span class="pe-3">').text('________________'))
      .append($('<span class="pe-3">').text('________________'))
    )
  );
}

async function init() {
  try {
    await loadVocab();
  } catch(error) {
    return;
  }
  buildWorksheet();
}
