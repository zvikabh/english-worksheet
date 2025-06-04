'use strict';

const VOCABULARIES = [
  {
    name: 'Irregular Verbs B-D',
    dataLink: 'irregular_b2d.json'
  },
  {
    name: 'Irregular Verbs G-M',
    dataLink: 'irregular_g2m.json'
  },
  {
    name: 'Irregular Verbs G-M (Ayala)',
    dataLink: 'irregular_g2m_ayala.json'
  },
  {
    name: 'Unit 2 Vocabulary',
    dataLink: 'unit2.json'
  },
];

function init() {
  VOCABULARIES.forEach((vocab, idx) => {
    $('#vocabulary-radios').append(
      $('<div class="form-check">')
        .append($('<input class="form-check-input" type="radio" name="vocab">')
          .attr('id', `vocabRadio${idx}`)
          .attr('value', vocab.dataLink))
        .append($('<label class="form-check-label">')
          .attr('for', `vocabRadio${idx}`)
          .text(vocab.name))
    );
  });
  $('#vocabulary-radios input')[0].checked = true;
}