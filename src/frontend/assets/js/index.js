var React = require('react')
var ReactDOM = require('react-dom')

export default class BooksList extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { data: [] };
        this.loadBooksFromServer = this.loadBooksFromServer.bind(this);
    }

    loadBooksFromServer(){
        var self = this;
        $.ajax({
            url: this.props.url_api,
            datatype: 'json',
            cache: false,
            success: function(data) {
                self.setState({data: data});
            }
        })
    }

    componentDidMount() {
        this.loadBooksFromServer();
        this.timer = setInterval(this.loadBooksFromServer, this.props.pollInterval);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        console.log('DATA!')
        const bookNodes = this.state.data.map((book, index) =>
            <li key={index}>
            {book.title}
            </li>
        );
        
        return (
            <div>
                <h1>Hello React!</h1>
                <ul>
                    {bookNodes}
                </ul>
            </div>
        )
    }
}

ReactDOM.render(<BooksList url_api='/api/' pollInterval={1000} />, document.getElementById('container'))
