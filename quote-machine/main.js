
$.ajaxSetup({ cache: false });

var getQuote = () => {
    // Add spin effect to refresh button
    $('#newQuoteBtn > i').addClass('fa-spin')

    // Ajax request to server
    $.ajax({
        url: "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1", 
        success: (result) => {
            $('#quote').html(result[0]['content']);
            $('#author').text(' - ' + result[0]['title']);
            
            // Remove spin effect
            $('#newQuoteBtn > i').removeClass('fa-spin')
        },
        error: (err) => {
            $('#quote').text('Unable to fetch data');
            console.error('Some error occured \n' + err)
        }
    })    
}

// Add event on the button
$('#newQuoteBtn').on('click', () => {
  getQuote();
});

// Call the function initially
getQuote();

// Share on twitter
$('#twitter_btn').on('click', () => {
    var text = $('#quote p').text() + '\n' + $('#author').text();
    var new_url = 'https://twitter.com/share?text=' + text;
    $('#twitter_btn').attr('href', new_url)
})

