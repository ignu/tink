const {h, mount, Component, Text} = require('ink');

//const redux = require('redux')
//const {connect} = require('react-redux')
//
//const Twitter = require('twitter');
//const client = new Twitter({})

const Tink = (props) => {
  return (
    <Text green>
      cool
      <br/>
    </Text>
  );
}

const unmount = mount(<Tink/>, process.stdout);

setTimeout(() => {
  console.log("😎 goodbye.");
  unmount();
}, 10000);
