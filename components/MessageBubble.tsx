import React, { memo } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface Message {
  id: string;
  message: string;
  sender: {
    image: string;
    is_kyc_verified: boolean;
    self: boolean;
    user_id: string;
  };
  time: string;
}

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble = memo(({ message }: MessageBubbleProps) => {
  const { sender, message: text, time } = message;
  const isSelf = sender.self;
  
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <View style={[styles.container, isSelf ? styles.selfContainer : styles.otherContainer]}>
      {!isSelf && (
        <Image 
          source={{ uri: sender.image }} 
          style={styles.avatar}
          defaultSource={{ uri: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1' }}
        />
      )}
      
      <View style={[styles.bubble, isSelf ? styles.selfBubble : styles.otherBubble]}>
        <Text style={[styles.messageText, isSelf ? styles.selfText : styles.otherText]}>
          {text}
        </Text>
        <Text style={[styles.timeText, isSelf ? styles.selfTime : styles.otherTime]}>
          {formatTime(time)}
        </Text>
      </View>
    </View>
  );
});

MessageBubble.displayName = 'MessageBubble';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 4,
    alignItems: 'flex-end',
  },
  selfContainer: {
    justifyContent: 'flex-end',
  },
  otherContainer: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
    marginBottom: 4,
    backgroundColor: '#E0E0E0',
  },
  bubble: {
    maxWidth: '75%',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 18,
    position: 'relative',
  },
  selfBubble: {
    backgroundColor: '#DCF8C6',
    borderBottomRightRadius: 4,
    marginRight: 8,
  },
  otherBubble: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 4,
  },
  selfText: {
    color: '#303030',
  },
  otherText: {
    color: '#303030',
  },
  timeText: {
    fontSize: 12,
    alignSelf: 'flex-end',
  },
  selfTime: {
    color: '#6B6B6B',
  },
  otherTime: {
    color: '#999999',
  },
});

export default MessageBubble;