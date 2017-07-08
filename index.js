const {h, mount, Component, Text} = require('ink');

const Twitter = require("twitter")

const {
  consumer_key,
  consumer_secret,
  access_token_key,
  access_token_secret } = process.env

const client = new Twitter({
  consumer_key,
  consumer_secret,
  access_token_key,
  access_token_secret
})


const Tweet = (props) => {
  return(
    <div>
      <Text green>@{props.user.screen_name}</Text><br/>
      <Text>{props.text}</Text><br/><br/>
    </div>
  )
}

class Tink extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tweets: [],
      error: null
    }

    client.get('statuses/user_timeline', (err, t) => {
      if(err) {
        const message = err[0] ? err[0].message : err
        console.log("😎 err", err);
        this.setState({
          tweets: [],
          error: `ERROR: '${message}'`
        })
      } else {
        this.setState({
          tweets: t,
          error: null
        })
      }
    })
  }

  render() {
    return (
      <div>
        <Text red>{this.state.error}</Text>
        {this.state.tweets.map(t => <Tweet {...t} />)}
        <br/>
      </div>
    );
  }
}

const unmount = mount(<Tink/>, process.stdout);

setTimeout(() => {
  console.log("😎 goodbye.");
  unmount();
}, 4000);
