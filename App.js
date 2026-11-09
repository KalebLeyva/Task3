import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  ScrollView,
  Pressable,
  Button,
  Alert,
  TextInput,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MAX_MESSAGE = 140;
const BASE_FOLLOWERS = 1200;

const BIO =
  'Building cross-platform apps with React Native. I love clean layouts, accessible design and sharing what I learn with the community. Always exploring new tools in the mobile ecosystem, contributing to open-source libraries, and mentoring new developers who are taking their first steps in tech.';

const SKILLS = ['React Native', 'JavaScript', 'UI Design', 'Git', 'Flexbox'];

const PROJECTS = [
  { id: '1', name: 'Mobile Shop', tech: 'React Native', stars: 124 },
  { id: '2', name: 'Crypto Wallet', tech: 'TypeScript', stars: 89 },
  { id: '3', name: 'Task Manager', tech: 'Expo, SQLite', stars: 256 },
  { id: '4', name: 'Social Feed', tech: 'React Native', stars: 412 },
  { id: '5', name: 'Fitness Tracker', tech: 'HealthKit', stars: 95 },
];

const CONTACTS = [
  'Sarah Connor',
  'John Doe',
  'Emma Watson',
  'Michael Scott',
  'Elena Rostova',
  'David Beckham',
  'Lucas Silva',
  'Anna Kendrick',
];

const COLORS = {
  background: '#EEF1F6',
  card: '#FFFFFF',
  text: '#1E293B',
  muted: '#64748B',
  primary: '#2563EB',
  primaryLight: '#EFF6FF',
  border: '#E2E8F0',
  online: '#22C55E',
  offline: '#94A3B8',
};

export default function App() {
  // Task 2 states
  const [isFollowing, setIsFollowing] = useState(false);
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isBioExpanded, setIsBioExpanded] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [selectedSkills, setSelectedSkills] = useState([]);

  // Task 3 states
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState([]);

  // Derived values
  const followers = BASE_FOLLOWERS + (isFollowing ? 1 : 0);
  const isSendDisabled = message.trim().length === 0;
  const isShareDisabled = selectedContacts.length === 0;

  const STATS = [
    { label: 'Projects', value: '24' },
    { label: 'Followers', followers: followers.toLocaleString(), value: followers.toLocaleString() },
    { label: 'Following', value: '180' },
  ];

  // Handlers
  const handleFollowPress = () => {
    setIsFollowing(!isFollowing);
  };

  const handleMessagePress = () => {
    setIsComposerOpen(!isComposerOpen);
  };

  const handleSendPress = () => {
    Alert.alert('Message sent', message);
    setMessage('');
    setIsComposerOpen(false);
  };

  const handleSkillPress = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((item) => item !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  // Task 3 handlers
  const closeModal = () => {
    setModalVisible(false);
    setSelectedContacts([]);
  };

  const handleContactPress = (name) => {
    if (selectedContacts.includes(name)) {
      setSelectedContacts(selectedContacts.filter((item) => item !== name));
    } else {
      setSelectedContacts([...selectedContacts, name]);
    }
  };

  const handleConfirmShare = () => {
    Alert.alert('Profile shared', 'Sent to: ' + selectedContacts.join(', '));
    closeModal();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          {/* Banner */}
          <Image
            source={require('./assets/banner.png')}
            style={styles.banner}
            resizeMode="cover"
          />

          <View style={styles.content}>
            {/* Header Row: Avatar & Info */}
            <View style={styles.headerRow}>
              <Pressable
                style={({ pressed }) => [
                  styles.avatarWrapper,
                  pressed && styles.pressed,
                ]}
                onPress={() => setIsOnline(!isOnline)}
              >
                <Image
                  source={require('./assets/avatar.png')}
                  style={styles.avatar}
                />
                <View
                  style={[
                    styles.onlineBadge,
                    !isOnline && styles.offlineBadge,
                  ]}
                />
              </Pressable>

              <View style={styles.headerTexts}>
                <Text style={styles.name}>Alex Rivera</Text>
                <Text style={styles.role}>Mobile Developer</Text>
                <Text style={styles.location}>Lisbon, Portugal</Text>
              </View>
            </View>

            {/* Expandable Bio */}
            <Text
              style={styles.bio}
              numberOfLines={isBioExpanded ? undefined : 3}
            >
              {BIO}
            </Text>
            <Pressable onPress={() => setIsBioExpanded(!isBioExpanded)}>
              <Text style={styles.link}>
                {isBioExpanded ? 'Show less' : 'Read more'}
              </Text>
            </Pressable>

            {/* Stats Row */}
            <View style={styles.statsRow}>
              {STATS.map((stat, index) => (
                <View
                  key={stat.label}
                  style={[
                    styles.stat,
                    index < STATS.length - 1 && styles.statDivider,
                  ]}
                >
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              ))}
            </View>

            {/* Selectable Skills */}
            <View style={styles.skillsContainer}>
              {SKILLS.map((skill) => {
                const isSelected = selectedSkills.includes(skill);
                return (
                  <Pressable
                    key={skill}
                    style={({ pressed }) => [
                      styles.tag,
                      isSelected && styles.tagSelected,
                      pressed && styles.pressed,
                    ]}
                    onPress={() => handleSkillPress(skill)}
                  >
                    <Text
                      style={[
                        styles.tagText,
                        isSelected && styles.tagTextSelected,
                      ]}
                    >
                      {skill}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
            <Text style={styles.hint}>
              Tap a skill to select it · {selectedSkills.length} selected
            </Text>

            {/* Step 3: Horizontal Recent Projects */}
            <Text style={styles.sectionTitle}>RECENT PROJECTS</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.projectsRow}
            >
              {PROJECTS.map((project) => (
                <View key={project.id} style={styles.projectCard}>
                  <Text style={styles.projectName}>{project.name}</Text>
                  <Text style={styles.projectTech}>{project.tech}</Text>
                  <Text style={styles.projectStars}>★ {project.stars}</Text>
                </View>
              ))}
            </ScrollView>

            {/* Action Buttons */}
            <View style={styles.actionsRow}>
              <Pressable
                style={({ pressed }) => [
                  styles.button,
                  isFollowing ? styles.buttonFollowing : styles.followButton,
                  pressed && styles.pressed,
                ]}
                onPress={handleFollowPress}
              >
                <Text
                  style={
                    isFollowing
                      ? styles.followingButtonText
                      : styles.followButtonText
                  }
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => [
                  styles.button,
                  styles.messageButton,
                  pressed && styles.pressed,
                ]}
                onPress={handleMessagePress}
              >
                <Text style={styles.messageButtonText}>
                  {isComposerOpen ? 'Close' : 'Message'}
                </Text>
              </Pressable>
            </View>

            {/* Controlled Message Composer */}
            {isComposerOpen && (
              <View style={styles.composer}>
                <TextInput
                  style={styles.input}
                  value={message}
                  onChangeText={(newText) => setMessage(newText)}
                  maxLength={MAX_MESSAGE}
                  placeholder="Write a message..."
                  placeholderTextColor={COLORS.muted}
                />
                <View style={styles.composerFooter}>
                  <Text style={styles.counter}>
                    {message.length}/{MAX_MESSAGE} characters
                  </Text>
                  <Pressable
                    style={({ pressed }) => [
                      styles.sendButton,
                      isSendDisabled && styles.sendButtonDisabled,
                      pressed && !isSendDisabled && styles.pressed,
                    ]}
                    disabled={isSendDisabled}
                    onPress={handleSendPress}
                  >
                    <Text style={styles.sendText}>Send</Text>
                  </Pressable>
                </View>
              </View>
            )}

            {/* Step 1: Share Profile Button opens Modal */}
            <View style={styles.shareWrapper}>
              <Button
                title="Share profile"
                color={COLORS.primary}
                onPress={() => setModalVisible(true)}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Step 1, 2, 4: Share Profile Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.overlay}>
          {/* Backdrop dismiss */}
          <Pressable style={StyleSheet.absoluteFill} onPress={closeModal} />

          {/* Modal Card Sheet */}
          <View style={styles.sheet}>
            <Text style={styles.sheetTitle}>Share profile</Text>
            <Text style={styles.sheetText}>
              Choose who gets Alex's profile.
            </Text>

            {/* Step 4: Vertical ScrollView for Contacts */}
            <ScrollView style={styles.contactList}>
              {CONTACTS.map((name) => {
                const isSelected = selectedContacts.includes(name);
                return (
                  <Pressable
                    key={name}
                    style={styles.contactRow}
                    onPress={() => handleContactPress(name)}
                  >
                    <Text style={styles.contactName}>{name}</Text>
                    <View
                      style={[
                        styles.checkbox,
                        isSelected && styles.checkboxSelected,
                      ]}
                    >
                      {isSelected && <Text style={styles.checkMark}>✓</Text>}
                    </View>
                  </Pressable>
                );
              })}
            </ScrollView>

            {/* Step 4: Share Confirm Button */}
            <Pressable
              style={({ pressed }) => [
                styles.shareButton,
                isShareDisabled && styles.shareButtonDisabled,
                pressed && !isShareDisabled && styles.pressed,
              ]}
              disabled={isShareDisabled}
              onPress={handleConfirmShare}
            >
              <Text style={styles.shareButtonText}>
                {isShareDisabled
                  ? 'Select contacts'
                  : `Share with ${selectedContacts.length}`}
              </Text>
            </Pressable>

            {/* Step 2 & 4: Cancel Button */}
            <Pressable
              style={({ pressed }) => [
                styles.sheetClose,
                pressed && styles.pressed,
              ]}
              onPress={closeModal}
            >
              <Text style={styles.sheetCloseText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.text,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  banner: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
  },
  avatarWrapper: {
    position: 'relative',
    width: 96,
    height: 96,
    marginTop: -48,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 4,
    borderColor: COLORS.card,
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.online,
    borderWidth: 2,
    borderColor: COLORS.card,
  },
  headerTexts: {
    flex: 1,
    marginLeft: 16,
    marginTop: 8,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  role: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
    marginTop: 2,
  },
  location: {
    fontSize: 13,
    color: COLORS.muted,
    marginTop: 2,
  },
  bio: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.text,
    marginTop: 16,
  },
  statsRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 12,
    marginTop: 16,
    marginBottom: 16,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statDivider: {
    borderRightWidth: 1,
    borderColor: COLORS.border,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.muted,
    marginTop: 2,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  tag: {
    backgroundColor: COLORS.primaryLight,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
  },
  tagText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  hint: {
    marginTop: 8,
    fontSize: 12,
    color: COLORS.muted,
  },
  sectionTitle: {
    marginTop: 18,
    marginBottom: 10,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: COLORS.muted,
  },
  projectsRow: {
    gap: 12,
    paddingRight: 4,
  },
  projectCard: {
    width: 140,
    padding: 14,
    borderRadius: 14,
    backgroundColor: COLORS.primaryLight,
  },
  projectName: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
  },
  projectTech: {
    marginTop: 4,
    fontSize: 12,
    color: COLORS.muted,
  },
  projectStars: {
    marginTop: 12,
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primary,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  followButton: {
    backgroundColor: COLORS.primary,
  },
  followButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  followingButtonText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  messageButton: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: 'transparent',
  },
  messageButtonText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonFollowing: {
    backgroundColor: COLORS.primaryLight,
  },
  composer: {
    marginTop: 16,
  },
  composerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  counter: {
    fontSize: 12,
    color: COLORS.muted,
  },
  input: {
    height: 44,
    paddingHorizontal: 12,
    fontSize: 15,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
  },
  link: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
  offlineBadge: {
    backgroundColor: COLORS.offline,
  },
  pressed: {
    opacity: 0.6,
  },
  sendButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
  },
  sendButtonDisabled: {
    backgroundColor: COLORS.offline,
  },
  sendText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  shareWrapper: {
    marginTop: 12,
    alignItems: 'center',
  },
  tagSelected: {
    backgroundColor: COLORS.primary,
  },
  tagTextSelected: {
    color: '#FFFFFF',
  },
  // Task 3 Modal & List styles
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sheet: {
    width: '100%',
    maxWidth: 420,
    padding: 20,
    borderRadius: 20,
    backgroundColor: COLORS.card,
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
  },
  sheetText: {
    marginTop: 4,
    marginBottom: 12,
    fontSize: 14,
    color: COLORS.muted,
  },
  sheetClose: {
    marginTop: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  sheetCloseText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.primary,
  },
  contactList: {
    maxHeight: 240,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  contactName: {
    fontSize: 15,
    color: COLORS.text,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: COLORS.offline,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  checkMark: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  shareButton: {
    marginTop: 16,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  shareButtonDisabled: {
    backgroundColor: COLORS.offline,
  },
  shareButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});