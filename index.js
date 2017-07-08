const {h, mount, Component, Text} = require('ink');

class Tink extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tweets: []
    }
  }

  render() {
    return (
      <Text green>
        {this.state.tweets.length}
        <br/>
      </Text>
    );
  }
}

const unmount = mount(<Tink/>, process.stdout);

setTimeout(() => {
  console.log("😎 goodbye.");
  unmount();
}, 10000);
