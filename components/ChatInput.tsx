import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Camera, Video, Paperclip, Send } from 'lucide-react-native';

export default function ChatInput() {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      // Send message logic would go here
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="@Rohit Yadav"
          placeholderTextColor="#999999"
          value={message}
          onChangeText={setMessage}
          multiline
          maxLength={1000}
        />
        
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Camera size={24} color="#666666" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Video size={24} color="#666666" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Paperclip size={24} color="#666666" />
          </TouchableOpacity>
        </View>
      </View>
      
      <TouchableOpacity 
        style={[styles.sendButton, message.trim() ? styles.sendButtonActive : styles.sendButtonDisabled]}
        onPress={handleSend}
        disabled={!message.trim()}
      >
        <Send size={20} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    minHeight: 40,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
    maxHeight: 100,
    paddingVertical: 4,
  },
  actionsContainer: {
    flexDirection: 'row',
    marginLeft: 8,
  },
  actionButton: {
    padding: 4,
    marginLeft: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonActive: {
    backgroundColor: '#25D366',
  },
  sendButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
});