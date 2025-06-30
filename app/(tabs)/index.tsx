import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
  Platform,
} from 'react-native';
import axios from 'axios';
import ChatHeader from '@/components/ChatHeader';
import MessageBubble from '@/components/MessageBubble';
import ChatInput from '@/components/ChatInput';
import DateSeparator from '@/components/DateSeparator';

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

interface ChatData {
  chats: Message[];
  from: string;
  message: string;
  name: string;
  status: string;
  to: string;
}

interface MessageWithSeparator extends Message {
  showDateSeparator?: boolean;
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [chatInfo, setChatInfo] = useState<ChatData | null>(null);

  const fetchMessages = useCallback(async (pageNum: number, isRefresh = false) => {
    if (loading && !isRefresh) return;
    
    setLoading(true);
    try {
      const response = await axios.get(`https://qa.corider.in/assignment/chat?page=${pageNum}`);
      const data: ChatData = response.data;
      
      if (pageNum === 0) {
        setChatInfo(data);
      }
      
      const newMessages = data.chats || [];
      
      if (isRefresh) {
        setMessages(newMessages);
        setPage(0);
      } else {
        setMessages(prev => pageNum === 0 ? newMessages : [...prev, ...newMessages]);
      }
      
      setHasMore(newMessages.length > 0);
      if (!isRefresh) {
        setPage(pageNum);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [loading]);

  useEffect(() => {
    fetchMessages(0);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(0);
    fetchMessages(0, true);
  }, [fetchMessages]);

  const loadMoreMessages = useCallback(() => {
    if (hasMore && !loading) {
      const nextPage = page + 1;
      fetchMessages(nextPage);
    }
  }, [hasMore, loading, page, fetchMessages]);

  // Memoized processed messages with date separators
  const processedMessages = useMemo(() => {
    const messagesWithSeparators: MessageWithSeparator[] = [];
    
    for (let i = 0; i < messages.length; i++) {
      const currentMessage = messages[i];
      const nextMessage = messages[i + 1];
      
      // Add the message
      messagesWithSeparators.push(currentMessage);
      
      // Check if we need a date separator after this message
      const showDateSeparator = i === messages.length - 1 || 
        (nextMessage && 
         new Date(currentMessage.time).toDateString() !== new Date(nextMessage.time).toDateString());
      
      if (showDateSeparator) {
        messagesWithSeparators.push({
          ...currentMessage,
          id: `separator-${currentMessage.id}`,
          showDateSeparator: true,
        });
      }
    }
    
    return messagesWithSeparators;
  }, [messages]);

  // Optimized render function with memoization
  const renderMessage = useCallback(({ item }: { item: MessageWithSeparator }) => {
    if (item.showDateSeparator) {
      return <DateSeparator date={item.time} />;
    }
    return <MessageBubble message={item} />;
  }, []);

  const renderFooter = useCallback(() => {
    if (!loading) return null;
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#25D366" />
      </View>
    );
  }, [loading]);

  const keyExtractor = useCallback((item: MessageWithSeparator) => item.id, []);

  const getItemLayout = useCallback((data: any, index: number) => ({
    length: 80, // Approximate height of a message
    offset: 80 * index,
    index,
  }), []);

  return (
    <SafeAreaView style={styles.container}>
      <ChatHeader 
        title="Trip 1"
        from={chatInfo?.from || "IGI Airport, T3"}
        to={chatInfo?.to || "Sector 28"}
      />
      
      <View style={styles.chatContainer}>
        <FlatList
          data={processedMessages}
          renderItem={renderMessage}
          keyExtractor={keyExtractor}
          inverted={Platform.OS !== 'web'}
          onEndReached={loadMoreMessages}
          onEndReachedThreshold={0.1}
          ListFooterComponent={Platform.OS !== 'web' ? renderFooter : null}
          ListHeaderComponent={Platform.OS === 'web' ? renderFooter : null}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#25D366']}
              tintColor="#25D366"
            />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.messagesList}
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={50}
          initialNumToRender={15}
          windowSize={10}
          getItemLayout={getItemLayout}
          maintainVisibleContentPosition={
            Platform.OS !== 'web' ? {
              minIndexForVisible: 0,
              autoscrollToTopThreshold: 10,
            } : undefined
          }
        />
      </View>
      
      <ChatInput />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  messagesList: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  loadingContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});