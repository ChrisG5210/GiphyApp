$(document).ready(function () {
  const apiKey = 'MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym'

  $('#gifForm').on('submit', function (event) {
    event.preventDefault();
    const searchQuery = $('#searchBar').val();

    if (searchQuery) {
      getGif(searchQuery).then(gifUrl => {
        if (gifUrl) {
          appendGif(gifUrl)
        }
        $('#searchBar').val('');
      });
    }
  });

  $('#gifRemove').on('click', function () {
    $('#entries').empty()
  });

  async function getGif(searchQuery) {
    try{
      const response = await axios.get("https://api.giphy.com/v1/gifs/search" , {
        params: {
          api_key: apiKey,
          q: searchQuery,
          limit: 1
        }
      });
      const gifUrl = response.data.data[0]?.images?.fixed_height?.url || '';
      return gifUrl;
    } catch (error) {
      console.error("Error Getting GIF", error);
      return '';
    }
  }
  function appendGif(gifUrl) {
    const img = $('<img>').attr('src', gifUrl).addClass('gif');
    $('#entries').append(img);
  }
});