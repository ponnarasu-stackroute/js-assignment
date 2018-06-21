const script = require('../public/js/script.js');
const expect = require('chai').expect;
const EventEmitter = require('events');
const jsdom = require('mocha-jsdom');

describe('Socket Client', () => {
  jsdom();
  let socket;
  let event = {};
  event.preventDefault = function() {};

  beforeEach((done) => {
    document.body.innerHTML =
      `<div class="modal fade" id="exampleModal" tabindex="-1" 
        role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Register</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
          <form>
              <div class="form-group">
                <label for="username" class="col-form-label">Username:</label>
                <input type="text" class="form-control" id="username">
              </div>
              <div class="form-group">
                <label for="channels" class="col-form-label">Channels (comma separated):</label>
                <input type="text" class="form-control" id="channels">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal">Done</button>
          </div>
        </div>
      </div>
    </div>
    <div class="container" id="alertContainer">
    </div>
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-6">
          <h4>Start sending messages..</h4>
          <form>
            <div class="form-group">
              <label for="channel">Channel</label>
              <input id="channel" placeholder="Type your channel" class="form-control" />
            </div>
            <div class="form-group">
              <label for="message">Message</label>
              <textarea id="message" placeholder="Type your message" 
                class="form-control"></textarea>
            </div>
            <button class="btn btn-primary" type="submit">Submit</button>
          </form>
        </div>
        <div class="col-12 col-md-6">
          <h4>Join/Start new channels..</h4>
          <form>
            <div class="form-group">
              <label for="newchannel">Channel</label>
              <input id="newchannel" placeholder="Type your channel" 
                class="form-control" list="channelsList"/>
              <datalist id="channelsList">
              </datalist>
            </div>
            <button id="joinChannel" class="btn btn-success" type="button">Join</button>
            <button id="leaveChannel" class="btn btn-danger" type="button">Leave</button>
          </form>
        </div>
      </div>
      <div id="chatContainer" class="row">
      </div>
    </div>`;
    socket = new EventEmitter();
    done();
  });

  afterEach((done) => {
    socket.removeAllListeners();
    done();
  });

  it('\'sendMessage()\' emits event \'message\' with correct data', (done) => {
    document.getElementById('message').value = 'hello from admin';
    document.getElementById('channel').value = 'general';
    document.getElementById('username').value = 'admin';

    socket.on('message', (data) => {
      expect(data.username).to.equal('admin');
      expect(data.channel).to.equal('general');
      expect(data.message).to.equal('hello from admin');
      done();
    });

    script.sendMessage(event, socket);
  });

  it('\'sendMessage()\' adds the message to DOM inside #chatContainer', (done) => {
    document.getElementById('message').value = 'hello from admin';
    document.getElementById('channel').value = 'general';
    document.getElementById('username').value = 'admin';

    script.sendMessage(event, socket);

    expect(document.getElementById('chatContainer').innerHTML)
      .to.include('Me : hello from admin');
    done();
  });

  it('\'joinChannel()\' emits event \'joinChannel\' with correct data', (done) => {
    document.getElementById('newchannel').value = 'general';

    socket.on('joinChannel', (data) => {
      expect(data.channel).to.equal('general');
      done();
    });

    script.joinChannel(event, socket);
  });

  it('\'leaveChannel()\' emits event \'leaveChannel\' with correct data', (done) => {
    document.getElementById('newchannel').value = 'general';

    socket.on('leaveChannel', (data) => {
      expect(data.channel).to.equal('general');
      done();
    });

    script.leaveChannel(event, socket);
  });

  it('onWelcomeMessageReceived() adds the message in DOM inside #chatContainer', (done) => {
    script.onWelcomeMessageReceived('Welcome foo !!');

    expect(document.getElementById('chatContainer').innerHTML)
      .to.include('System : Welcome foo !!');
    done();
  });

  it('onNewMessageReceived() adds the message in DOM inside #chatContainer', (done) => {
    script.onNewMessageReceived({ username: 'Foo', message: 'this is test message' });

    expect(document.getElementById('chatContainer').innerHTML)
      .to.include('Foo : this is test message');
    done();
  });

  it('onNewMessageReceived() adds the message above welcome message', (done) => {
    script.onWelcomeMessageReceived('Welcome foo !!');
    script.onNewMessageReceived({ username: 'Foo', message: 'message1' });

    const indexOfWelcomeMessage =
      document.getElementById('chatContainer').innerHTML.indexOf('System : Welcome foo !!');
    const indexOfNewMessage =
      document.getElementById('chatContainer').innerHTML.indexOf('Foo : message1');

    expect(indexOfWelcomeMessage).not.to.equal(-1);
    expect(indexOfNewMessage).not.to.equal(-1);
    expect(indexOfNewMessage).to.be.below(indexOfWelcomeMessage);
    done();
  });

  it('\'sendMessage()\' adds the message above welcome message', (done) => {
    document.getElementById('message').value = 'hello from foo';
    document.getElementById('channel').value = 'general';
    document.getElementById('username').value = 'foo';

    script.onWelcomeMessageReceived('Welcome foo !!');
    script.sendMessage(event, socket);

    const indexOfWelcomeMessage =
      document.getElementById('chatContainer').innerHTML.indexOf('System : Welcome foo !!');
    const indexOfSentMessage =
      document.getElementById('chatContainer').innerHTML.indexOf('Me : hello from foo');

    expect(indexOfWelcomeMessage).not.to.equal(-1);
    expect(indexOfSentMessage).not.to.equal(-1);
    expect(indexOfSentMessage).to.be.below(indexOfWelcomeMessage);
    done();
  });

  it('onAddedToNewChannelReceived() adds the channel in the #channelsList', (done) => {
    script.onAddedToNewChannelReceived({ channel: 'test' });

    expect(document.getElementById('channelsList').innerHTML)
      .to.include('test');
    done();
  });

  it('onAddedToNewChannelReceived() writes the success alert in #alertContainer', (done) => {
    script.onAddedToNewChannelReceived({ channel: 'test' });

    expect(document.getElementById('alertContainer').innerHTML)
      .to.include('You are added to <strong>test</strong> successfully!');
    done();
  });
});
