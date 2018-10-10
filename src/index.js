import $ from 'jquery'

$(document).ready(() => {
  getTopWord()
})


const getTopWord = () => {
  fetch(`https://wordwatch-api.herokuapp.com/api/v1/top_word`)
    .then(handleResponse)
    .then(topWord => appendTopWord(topWord))
    .catch(error => console.error({ error }));
};

const handleResponse = (response) => {
  return response.json()
    .then((json) => {
      if (!response.ok) {
        const error = {
          status: response.status,
          statusText: response.statusText,
          json
        };
        return Promise.reject(error)
      }
      return json
    });
};

const appendTopWord = (topWord) => {
  let word = Object.keys(topWord['word']);
  let topWordCount = Object.values(topWord['word']);
  $('.word-count').append(`
    <p>
      ${word}: ${topWordCount}
    </p>
  `);
};

const addWord = () => {

  var newWord = $('#new-word-form').val()

  fetch('https://wordwatch-api.herokuapp.com/api/v1/words', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      word: {
              value: `${newWord}`
            }
    })
  })
  $('.word-count').empty()
  getTopWord()
}

$('#break-down').on('click', addWord);
