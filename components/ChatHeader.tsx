import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  Pressable,
} from 'react-native';
import { ArrowLeft, MoveVertical as MoreVertical, Users, Share, Flag } from 'lucide-react-native';

interface ChatHeaderProps {
  title: string;
  from: string;
  to: string;
}

export default function ChatHeader({ title, from, to }: ChatHeaderProps) {
  const [menuVisible, setMenuVisible] = useState(false);

  const memberImages = [
    'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
  ];

  const toggleMenu = () => setMenuVisible(!menuVisible);

  const menuOptions = [
    { icon: Users, label: 'Members', onPress: () => console.log('Members') },
    { icon: Share, label: 'Share Number', onPress: () => console.log('Share Number') },
    { icon: Flag, label: 'Report', onPress: () => console.log('Report') },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        
        <View style={styles.headerInfo}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>
            From <Text style={styles.location}>{from}</Text>
          </Text>
          <Text style={styles.subtitle}>
            To <Text style={styles.location}>{to}</Text>
          </Text>
        </View>

        <View style={styles.rightSection}>
          <View style={styles.memberImages}>
            {memberImages.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={[
                  styles.memberImage,
                  { marginLeft: index > 0 ? -8 : 0, zIndex: memberImages.length - index }
                ]}
              />
            ))}
          </View>
          
          <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
            <MoreVertical size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setMenuVisible(false)}>
          <View style={styles.menuContainer}>
            {menuOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={() => {
                  option.onPress();
                  setMenuVisible(false);
                }}
              >
                <option.icon size={20} color="#333333" />
                <Text style={styles.menuText}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#25D366',
    paddingTop: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 12,
    color: '#E8F5E8',
    lineHeight: 16,
  },
  location: {
    fontWeight: '500',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberImages: {
    flexDirection: 'row',
    marginRight: 12,
  },
  memberImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  menuButton: {
    padding: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 100,
    paddingRight: 16,
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    minWidth: 150,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#333333',
  },
});