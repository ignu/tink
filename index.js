require('dotenv').config()
const {h, mount, Component, Text} = require('ink');

const Twitter = require("twitter")
const R = require("ramda")

const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret : process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
})

const formatDate = (date) => {
  const d = new Date(date)
  return `${d.getMonth()+1}/${d.getDay()} ${d.getHours()}:${d.getMinutes()}`
}

const QuotedTweet = (props) => {
  return(<div>
    <Text gray>  ＞ </Text>
    <Text dim blue>@{props.user.screen_name}</Text><br/>
    <Text gray>  ＞ </Text>
    <Text dim gray>{props.full_text}</Text><br/>
  </div>)
}

const Tweet = (props) => {
  return(
    <div>
      <Text blue bold>@{props.user.screen_name}</Text>
      <Text gray>↷  {props.retweet_count} | ❤ {props.favorite_count} | {formatDate(props.created_at)}</Text><br/>
      <Text blue>{props.full_text}</Text><br/>
      { props.quoted_status && <QuotedTweet {...props.quoted_status}/> }
      <Text>{props.in_reply_to_status_id}</Text>
      <br/>
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

    client.get('lists/statuses', { tweet_mode: 'extended', owner_screen_name: "ignu", include_rts: "true", slug: "politics" }, (err, t) => {
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
