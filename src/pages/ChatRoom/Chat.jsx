import React, { Fragment, useEffect, useState, useRef } from "react";
import {
  Container,
  Segment,
  Message,
  Input,
  Form,
  Icon,
  Dimmer,
  Loader,
} from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getConversation } from "../../actions/chat";
import { useSelector } from "react-redux";
import actionCable from "actioncable";

const Chat = ({ getConversation, loading, conversation, match }) => {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "60vw",
    height: "60vh",
  };

  const senderStyle = {
    alignSelf: "flex-end",
    minHeight: "max-content",
  };

  const receiverStyle = {
    alignSelf: "flex-start",
    minHeight: "max-content",
  };

  const user = useSelector((state) => state.auth.user);
  const loadingUser = useSelector((state) => state.auth.loading);
  const token = useSelector((state) => state.auth.token);
  const messagesEndRef = useRef();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const chatChannelRef = useRef(null);
  const cableApp = actionCable.createConsumer("ws://localhost:3000/cable");

  const handleSubmit = () => {
    chatChannelRef.current.createChatMessage({
      text: message,
    });
    setMessage("");
  };

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const onChange = (e) => setMessage(e.target.value);

  useEffect(() => {
    getConversation(match.params.id);
    if (conversation) {
      setMessages(conversation.messages);
      scrollToBottom();
    }

    chatChannelRef.current = cableApp.subscriptions.create(
      {
        channel: "ChatroomChannel",
        room: match.params.id,
      },
      {
        received: (updatedMessages) => {
          setMessages(JSON.parse(updatedMessages.messages));
          scrollToBottom();
        },
        createChatMessage(text) {
          chatChannelRef.current.perform("create_message", {
            text: text.text,
            token: token,
          });
        },
      }
    );
  }, [getConversation, loading, loadingUser, match.params.id]);

  return (
    <Container style={containerStyle}>
      {console.log("Loading ===>", loading)}
      {conversation ? (
        <Fragment>
          <Segment
            style={{
              height: "100%",
              overflow: "scroll",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {user && messages.length !== 0
              ? messages.map((message, index) => (
                  <Fragment key={index}>
                    <Message
                      style={
                        message.user_id === user.id
                          ? senderStyle
                          : receiverStyle
                      }
                      color={message.user_id === user.id ? "violet" : "teal"}
                      compact
                    >
                      {message.text}
                    </Message>
                    <br />
                  </Fragment>
                ))
              : ""}
            <div ref={messagesEndRef}></div>
          </Segment>
          <Form.Field>
            <Input
              style={{ width: "100%" }}
              icon
              placeholder="Write a message..."
            >
              <input type="text" value={message} onChange={onChange} />
              <Icon
                color="violet"
                name="send"
                link
                onClick={handleSubmit}
              ></Icon>
            </Input>
          </Form.Field>
        </Fragment>
      ) : (
        <Dimmer active>
          <Loader />
        </Dimmer>
      )}
    </Container>
  );
};

Chat.propTypes = {
  getConversation: PropTypes.func.isRequired,
  conversation: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  conversation: state.chat.conversation,
  loading: state.chat.loading,
});

export default connect(mapStateToProps, { getConversation })(Chat);
