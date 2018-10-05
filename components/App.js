var GIPHY_API_URL = 'https://api.giphy.com';
var GIPHY_PUB_KEY = 'VNDkSlOSRXHTyG8nidKP1xNxqFTnh2LO';

App = React.createClass({
    getInitialState: function() {
        return {
            loading: false,
            searchingText: '',
            gif: {}
        };
    },

    handleSearch: function(searchingText) {  // 1 - pobieramy wpisywany tekst 
        this.setState({
          loading: true  // 2 sygnalizacja procesu ladowania
        });
        this.getGif(searchingText).then((gif) => {  // 3 - rozpoczęcie pobierania gifa  // wywołanie promisa z linijki 27 poprzez then
          this.setState({  // 4 - przy ukończeniu pobierania:
            loading: false,  // a - zakończ ladowanie 
            gif: gif,  // b - ustaw nowego gifa z wyniku pobierania
            searchingText: searchingText  // c - ustaw nowy stan dla wyszukiwanego tekstu 
          });
        });
    },

    getGif: function(searchingText) {
        return new Promise((resolve, reject) => {  
            var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;  
            var xhr = new XMLHttpRequest();  
            xhr.open('GET', url);
            xhr.onload = function() {
                if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText).data; 
                    var gif = {  
                        url: data.fixed_width_downsampled_url,
                        sourceUrl: data.url
                    };
                    resolve(gif);  
                }
            };
            xhr.send();
        });
    },

    render: function() {

        var styles = {
            margin: '0 auto',
            textAlign: 'center',
            width: '90%'
        };

        var styles_for_h = {
            fontSize: '2.5em'
        };

        var styles_for_p = {
            fontSize: '1.6em'
        }

        return (
          <div style={styles} className={'appWrapper'}>
                <h1 style={styles_for_h}>GIF Search Engine!</h1>
                <p style={styles_for_p}>Find GIFs on <a href='http://giphy.com'>Giphy</a>. Press enter for more GIFs.</p>
                <Search onSearch={this.handleSearch}/>
                <Gif
                    loading={this.state.loading}
                    url={this.state.gif.url}
                    sourceUrl={this.state.gif.sourceUrl}
                />
          </div>
        );
    }
});