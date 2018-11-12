require('dotenv').config()
const {h, mount, Component, Text} = require('ink');

const Twitter = require("twitter")
const R = require("ramda")
const unescape = require("unescape")

const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret : process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
})


const formatDate = (date) => {
  const d = new Date(date)

  let minutes = `${d.getMinutes()}`
  if (minutes.length == 1) { minutes = `0${minutes}` }
  return `${d.getMonth()+1}/${d.getDate()} ${d.getHours()}:${minutes}`
}

const QuotedTweet = (props) => {
  return(<div>
    <Text gray>  ＞ </Text>
    <Text dim blue>@{props.user.screen_name}</Text><br/>
    <Text gray>  ＞ </Text>
    <Text dim gray>{unescape(props.full_text)}</Text><br/>
  </div>)
}

const Tweet = (props) => {
  return(
    <div>
      <Text blue bold>@{props.user.screen_name}</Text>
      <Text gray>↷  {props.retweet_count} | ❤ {props.favorite_count} | {formatDate(props.created_at)}</Text><br/>
      <Text>{unescape(props.full_text)}</Text><br/>
      { props.quoted_status && <QuotedTweet {...props.quoted_status}/> }
      <br/>
      <Text gray>http://twitter.com/{props.user.screen_name}/status/{props.id_str}</Text><br/>
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

    const list = process.env.TWITTER_LIST || 'politics'

    client.get('lists/statuses', { tweet_mode: 'extended', owner_screen_name: "ignu", include_rts: "true", slug: list }, (err, t) => {
      if(err) {
        const message = err[0] ? err[0].message : err
        console.log("😎 err", err);
        this.setState({
          tweets: [],
          error: `ERROR: '${message}'`
        })
      } else {
        this.setState({
          tweets: R.reverse(t),
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
  unmount();
}, 1200);
