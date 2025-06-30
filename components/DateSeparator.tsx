import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface DateSeparatorProps {
  date: string;
}

const DateSeparator = memo(({ date }: DateSeparatorProps) => {
  const formatDate = (timestamp: string) => {
    const messageDate = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (messageDate.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (messageDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return messageDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }).replace(/,/g, '').toUpperCase();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.separator}>
        <Text style={styles.dateText}>{formatDate(date)}</Text>
      </View>
    </View>
  );
});

DateSeparator.displayName = 'DateSeparator';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 16,
  },
  separator: {
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  dateText: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
  },
});

export default DateSeparator;