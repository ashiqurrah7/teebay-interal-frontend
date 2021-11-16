import React, { Fragment, useEffect, useState, useRef } from "react";
import {
  Container,
  Segment,
  Message,
  Input,
  Form,
  Icon,
} from "semantic-ui-react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getConversation } from "../../actions/chat";
import { useSelector } from "react-redux";

const Chat = ({ getConversation, conversation, cableApp, match, loading }) => {
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
    if (!loading) {
      setMessages(conversation.messages);
      scrollToBottom();
      chatChannelRef.current = cableApp.cable.subscriptions.create(
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
    }
  }, [loading, loadingUser]);

  return (
    <Container style={containerStyle}>
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
                    message.user_id === user.id ? senderStyle : receiverStyle
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
        <Input style={{ width: "100%" }} icon placeholder="Write a message...">
          <input type="text" value={message} onChange={onChange} />
          <Icon color="violet" name="send" link onClick={handleSubmit}></Icon>
        </Input>
      </Form.Field>
    </Container>
  );
};

Chat.propTypes = {
  getConversation: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  conversation: state.chat.conversation,
  loading: state.chat.loading,
});

export default connect(mapStateToProps, { getConversation })(Chat);
