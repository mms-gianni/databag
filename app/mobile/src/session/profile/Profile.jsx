import { ActivityIndicator, KeyboardAvoidingView, Modal, View, Switch, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/AntDesign';
import MatIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker'
import { Colors } from 'constants/Colors';
import { useProfile } from './useProfile.hook';
import { Logo } from 'utils/Logo';
import { styles } from './Profile.styled';
import { BlockedTopics } from './blockedTopics/BlockedTopics';
import { BlockedContacts } from './blockedContacts/BlockedContacts';
import { BlockedMessages } from './blockedMessages/BlockedMessages';

export function ProfileHeader() {
  const { state, actions } = useProfile();
  const handle = state.node ? `${state.handle}@${state.node}` : state.handle;

  return (
    <Text style={styles.headerText}>{ handle }</Text>
  )
}

export function ProfileBody() {
  const { state, actions } = useProfile();

  const logout = async () => {
    Alert.alert(
      "Logging Out",
      "Confirm?",
      [
        { text: "Cancel",
          onPress: () => {},
        },
        { text: "Logout", onPress: () => {
          actions.logout();
        }}
      ]
    );
  }

  const remove = async () => {
    try {
      await actions.remove();
    }
    catch (err) {
      console.log(err);
      Alert.alert(
        'Failed to Delete Account',
        'Please try again.'
      )
    }
  }

  const onGallery = async () => {
    try {
      const full = await ImagePicker.openPicker({ mediaType: 'photo', width: 256, height: 256 });
      const crop = await ImagePicker.openCropper({ path: full.path, width: 256, height: 256, cropperCircleOverlay: true, includeBase64: true });
      await actions.setProfileImage(crop.data);
    }
    catch (err) {
      console.log(err);
    }
  }

  const setNotifications = async (notify) => {
    try {
      await actions.setNotifications(notify);
    }
    catch (err) {
      console.log(err);
      Alert.alert(
        'Account Update Failed',
        'Please try again.',
      );
    }
  }

  const setVisible = async (visible) => {
    try {
      await actions.setVisible(visible);
    }
    catch (err) {
      console.log(err);
      Alert.alert(
        'Account Update Failed',
        'Please try again.'
      );
    }
  }

  const saveSeal = async () => {
    try {
      await actions.saveSeal();
      actions.hideEditSeal();
    }
    catch (err) {
      console.log(err);
      Alert.alert(
        'Failed to Update Topic Sealing',
        'Please try again.',
      )
    }
  }

  const saveDetails = async () => {
    try {
      await actions.saveDetails();
      actions.hideEditDetails();
    }
    catch (err) {
      console.log(err);
      Alert.alert(
        'Failed to Save Details',
        'Please try again.'
      )
    }
  }

  const saveLogin = async () => {
    try {
      await actions.saveLogin();
      actions.hideEditLogin();
    }
    catch (err) {
      console.log(err);
      Alert.alert(
        'Failed to Change Login',
        'Please try again.'
      )
    }
  }

  return (
    <View style={styles.body}>

      <View style={styles.logo}>
        <View>
          <Logo src={state.imageSource} width={128} height={128} radius={8} />
          <TouchableOpacity style={styles.gallery} onPress={onGallery}>
            <Ionicons name="picture" size={14} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </View>
 
      <View style={styles.alert}>
        { state.disconnected && (
          <Text style={styles.alertText}>Disconnected</Text>
        )}
      </View>

      <TouchableOpacity style={styles.detail} onPress={actions.showEditDetails}>
        <View style={styles.attribute}>
          { state.name && (
            <Text style={styles.nametext}>{ state.name }</Text>
          )}
          { !state.name && (
            <Text style={styles.nonametext}>Name</Text>
          )}
          <Ionicons name="edit" size={16} color={Colors.text} />
        </View>
        <View style={styles.attribute}>
          <View style={styles.icon}>
            <Ionicons name="enviromento" size={14} color={Colors.text} />
          </View>
          { state.location && (
            <Text style={styles.locationtext}>{ state.location }</Text>
          )}
          { !state.location && (
            <Text style={styles.nolocationtext}>Location</Text>
          )}
        </View> 
        <View style={styles.attribute}>
          <View style={styles.icon}>
            <Ionicons name="book" size={14} color={Colors.text} />
          </View>
          { state.description && (
            <Text style={styles.descriptiontext}>{ state.description }</Text>
          )}
          { !state.description && (
            <Text style={styles.nodescriptiontext}>Description</Text>
          )}
        </View> 
      </TouchableOpacity>
  
      <View style={styles.group}>
        <View style={styles.enable}>
          <TouchableOpacity onPress={() => setVisible(!state.searchable)} activeOpacity={1}>
            <Text style={styles.enableText}>Visible in Registry</Text>
          </TouchableOpacity>
          <Switch style={styles.enableSwitch} value={state.searchable} onValueChange={setVisible} trackColor={styles.switch}/>
        </View>
        <View style={styles.enable}>
          <TouchableOpacity onPress={() => setNotifications(!state.pushEnabled)} activeOpacity={1}>
            <Text style={styles.enableText}>Enable Notifications</Text>
          </TouchableOpacity>
          <Switch style={styles.enableSwitch} value={state.pushEnabled} onValueChange={setNotifications} trackColor={styles.switch}/>
        </View>
      </View>

      <TouchableOpacity style={styles.logout} activeOpacity={1} onPress={logout}>
        <Ionicons name="logout" size={14} color={Colors.primary} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logout} onPress={actions.showEditLogin}>
        <Ionicons name="user" size={20} color={Colors.primary} />
        <Text style={styles.logoutText}>Change Login</Text>
      </TouchableOpacity>
 
      { state.sealable && (
        <TouchableOpacity style={styles.logout} onPress={actions.showEditSeal}>
          <Ionicons name="lock" size={22} color={Colors.primary} />
          <Text style={styles.logoutText}>Sealed Topics</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.delete} activeOpacity={1} onPress={actions.showDelete}>
        <Ionicons name="delete" size={16} color={Colors.alert} />
        <Text style={styles.deleteText}>Delete Account</Text>
      </TouchableOpacity>

      <Text style={styles.blockedLabel}>Manage Blocked:</Text>
      <View style={styles.blocked}>
        <TouchableOpacity style={styles.link} onPress={actions.showBlockedCards}>
          <Text style={styles.linkText}>Contacts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.link} onPress={actions.showBlockedChannels}>
          <Text style={styles.linkText}>Topics</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.link} onPress={actions.showBlockedMessages}>
          <Text style={styles.linkText}>Messages</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={state.showDelete}
        supportedOrientations={['portrait', 'landscape']}
        onRequestClose={actions.hideDelete}
      >
        <KeyboardAvoidingView behavior="height" style={styles.modalWrapper}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>Deleting Your Account</Text>
            <View style={styles.inputField}>
              <TextInput style={styles.input} value={state.confirmDelete} onChangeText={actions.setConfirmDelete}
                  autoCapitalize="none" placeholder="Type 'delete' to Confirm" placeholderTextColor={Colors.grey} />
            </View>
            <View style={styles.modalControls}>
              <TouchableOpacity style={styles.cancel} onPress={actions.hideDelete}>
                <Text style={styles.canceltext}>Cancel</Text>
              </TouchableOpacity>
              { state.confirmDelete === 'delete' && (
                <TouchableOpacity style={styles.remove} onPress={remove}>
                  <Text style={styles.removeText}>Delete</Text>
                </TouchableOpacity>
              )}
              { state.confirmDelete !== 'delete' && (
                <TouchableOpacity style={styles.unconfirmed}>
                  <Text style={styles.removeText}>Delete</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={state.blockedCards}
        supportedOrientations={['portrait', 'landscape']}
        onRequestClose={actions.hideBlockedCards}
      >
        <KeyboardAvoidingView behavior="height" style={styles.modalWrapper}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>Blocked Contacts:</Text>
            <View style={styles.modalList}>
              <BlockedContacts />
            </View>
            <View style={styles.modalControls}>
              <TouchableOpacity style={styles.close} onPress={actions.hideBlockedCards}>
                <Text style={styles.canceltext}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={state.blockedChannels}
        supportedOrientations={['portrait', 'landscape']}
        onRequestClose={actions.hideBlockedChannels}
      >
        <KeyboardAvoidingView behavior="height" style={styles.modalWrapper}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>Blocked Topics:</Text>
            <View style={styles.modalList}>
              <BlockedTopics />
            </View>
            <View style={styles.modalControls}>
              <TouchableOpacity style={styles.close} onPress={actions.hideBlockedChannels}>
                <Text style={styles.canceltext}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={state.blockedMessages}
        supportedOrientations={['portrait', 'landscape']}
        onRequestClose={actions.hideBlockedMessages}
      >
        <KeyboardAvoidingView behavior="height" style={styles.modalWrapper}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>Blocked Messages:</Text>
            <View style={styles.modalList}>
              <BlockedMessages />
            </View>
            <View style={styles.modalControls}>
              <TouchableOpacity style={styles.close} onPress={actions.hideBlockedMessages}>
                <Text style={styles.canceltext}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={state.editDetails}
        supportedOrientations={['portrait', 'landscape']}
        onRequestClose={actions.hideEditDetails}
      >
        <KeyboardAvoidingView behavior="height" style={styles.modalWrapper}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>Edit Details:</Text>
            <View style={styles.inputField}>
              <TextInput style={styles.input} value={state.editName} onChangeText={actions.setEditName}
                  autoCapitalize="words" placeholder="Name" placeholderTextColor={Colors.grey} />
            </View>
            <View style={styles.inputField}>
              <TextInput style={styles.input} value={state.editLocation} onChangeText={actions.setEditLocation}
                  autoCapitalize="words" placeholder="Location" placeholderTextColor={Colors.grey} />
            </View>
            <View style={styles.inputField}>
              <TextInput style={styles.input} value={state.editDescription} onChangeText={actions.setEditDescription}
                  autoCapitalize="sentences" placeholder="Description" multiline={true} 
                  placeholderTextColor={Colors.grey} />
            </View>
            <View style={styles.modalControls}>
              <TouchableOpacity style={styles.cancel} onPress={actions.hideEditDetails}>
                <Text style={styles.canceltext}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.save} onPress={saveDetails}>
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={state.editSeal}
        supportedOrientations={['portrait', 'landscape']}
        onRequestClose={actions.hideEditSeal}
      >
        <KeyboardAvoidingView behavior="height" style={styles.modalWrapper}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>Sealed Topics:</Text>
            <View style={styles.sealable}>
              <TouchableOpacity onPress={() => actions.setSealEnable(!state.sealEnabled)} activeOpacity={1}>
                <Text style={styles.sealableText}>Enable Sealed Topics</Text>
              </TouchableOpacity>
              <Switch style={styles.enableSwitch} value={state.sealEnabled} onValueChange={actions.setSealEnable} trackColor={styles.switch}/>
            </View>
            { state.sealMode === 'unlocking' && (
              <>
                { !state.showSealUnlock && (
                  <View style={styles.inputField}>
                    <TextInput style={styles.input} value={state.sealUnlock} onChangeText={actions.setSealUnlock}
                        autoCapitalize={'none'} secureTextEntry={true} placeholder="Password for Seal"
                        placeholderTextColor={Colors.grey} />
                    <TouchableOpacity onPress={actions.showSealUnlock}>
                      <Ionicons style={styles.icon} name="eyeo" size={18} color="#888888" />
                    </TouchableOpacity>
                  </View>
                )}
                { state.showSealUnlock && (
                  <View style={styles.inputField}>
                    <TextInput style={styles.input} value={state.sealUnlock} onChangeText={actions.setSealUnlock}
                        autoCapitalize={'none'} secureTextEntry={false} placeholder="Password for Seal"
                        placeholderTextColor={Colors.grey} />
                    <TouchableOpacity onPress={actions.hideSealUnlock}>
                      <Ionicons style={styles.icon} name="eye" size={18} color="#888888" />
                    </TouchableOpacity>
                  </View>
                )}
              </>
            )}
            { (state.sealMode === 'updating' || state.sealMode === 'enabling') && (
              <>
                { !state.showSealPassword && (
                  <View style={styles.inputField}>
                    <TextInput style={styles.input} value={state.sealPassword} onChangeText={actions.setSealPassword}
                        autoCapitalize={'none'} secureTextEntry={true} placeholder="Password for Seal"
                        placeholderTextColor={Colors.grey} />
                    <TouchableOpacity onPress={actions.showSealPassword}>
                      <Ionicons style={styles.icon} name="eyeo" size={18} color="#888888" />
                    </TouchableOpacity>
                  </View>
                )}
                { state.showSealPassword && (
                  <View style={styles.inputField}>
                    <TextInput style={styles.input} value={state.sealPassword} onChangeText={actions.setSealPassword}
                        autoCapitalize={'none'} secureTextEntry={false} placeholder="Password for Seal"
                        placeholderTextColor={Colors.grey} />
                    <TouchableOpacity onPress={actions.hideSealPassword}>
                      <Ionicons style={styles.icon} name="eye" size={18} color="#888888" />
                    </TouchableOpacity>
                  </View>
                )}
                { !state.showSealConfirm && (
                  <View style={styles.inputField}>
                    <TextInput style={styles.input} value={state.sealConfirm} onChangeText={actions.setSealConfirm}
                        autoCapitalize={'none'} secureTextEntry={true} placeholder="Confirm Password"
                        placeholderTextColor={Colors.grey} />
                    <TouchableOpacity onPress={actions.showSealConfirm}>
                      <Ionicons style={styles.icon} name="eyeo" size={18} color="#888888" />
                    </TouchableOpacity>
                  </View>
                )}
                { state.showSealConfirm && (
                  <View style={styles.inputField}>
                    <TextInput style={styles.input} value={state.sealConfirm} onChangeText={actions.setSealConfirm}
                        autoCapitalize={'none'} secureTextEntry={false} placeholder="Confirm Password"
                        placeholderTextColor={Colors.grey} />
                    <TouchableOpacity onPress={actions.hideSealConfirm}>
                      <Ionicons style={styles.icon} name="eye" size={18} color="#888888" />
                    </TouchableOpacity>
                  </View>
                )}
                <Text style={styles.notice}>saving can take a few minutes</Text>
              </>
            )}
            { state.sealMode === 'disabling' && (
              <View style={styles.inputField}>
                <Ionicons style={styles.warn} name="exclamationcircleo" size={18} color="#888888" />
                <TextInput style={styles.input} value={state.sealDelete} onChangeText={actions.setSealDelete}
                    autoCapitalize={'none'} placeholder="Type 'delete' to remove sealing key"
                    placeholderTextColor={Colors.grey} />
              </View>
            )}
            { state.sealMode === 'unlocked' && (
              <View style={styles.inputField}>
                <TextInput style={styles.input} value={'xxxxxxxx'} editable={false} secureTextEntry={true} />
                <Ionicons style={styles.icon} name="eyeo" size={18} color="#888888" />
                <TouchableOpacity style={styles.sealUpdate} onPress={actions.updateSeal} />
              </View>
            )}
            <View style={styles.modalControls}>
              <TouchableOpacity style={styles.cancel} onPress={actions.hideEditSeal}>
                <Text style={styles.canceltext}>Cancel</Text>
              </TouchableOpacity>
              { state.canSaveSeal && (
                <>
                  { state.sealMode !== 'unlocking' && state.sealMode !== 'unlocked' && (
                    <TouchableOpacity style={styles.save} onPress={saveSeal}>
                      { state.saving && (
                        <ActivityIndicator style={styles.activity} color={Colors.white} />
                      )}
                      <Text style={styles.saveText}>Save</Text>
                    </TouchableOpacity>
                  )}
                  { state.sealMode === 'unlocked' && (
                    <TouchableOpacity style={styles.save} onPress={saveSeal}>
                      { state.saving && (
                        <ActivityIndicator style={styles.activity} color={Colors.white} />
                      )}
                      <Text style={styles.saveText}>Forget</Text>
                    </TouchableOpacity>
                  )}
                  { state.sealMode === 'unlocking' && (
                    <TouchableOpacity style={styles.save} onPress={saveSeal}>
                      { state.saving && (
                        <ActivityIndicator style={styles.activity} color={Colors.white} />
                      )}
                      <Text style={styles.saveText}>Unlock</Text>
                    </TouchableOpacity>
                  )}  
                </>
              )}
              { !state.canSaveSeal && (
                <>
                  { state.sealMode !== 'unlocking' && (
                    <View style={styles.disabled}>
                      { state.saving && (
                        <ActivityIndicator style={styles.activity} color={Colors.white} />
                      )}
                      <Text style={styles.disabledText}>Save</Text>
                    </View>
                  )}
                  { state.sealMode === 'unlocking' && (
                    <View style={styles.disabled}>
                      { state.saving && (
                        <ActivityIndicator style={styles.activity} color={Colors.white} />
                      )}
                      <Text style={styles.disabledText}>Unlock</Text>
                    </View>
                  )}  
                </>
              )}

            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal> 
      <Modal
        animationType="fade"
        transparent={true}
        visible={state.editLogin}
        supportedOrientations={['portrait', 'landscape']}
        onRequestClose={actions.hideEditLogin}
      >
        <KeyboardAvoidingView behavior="height" style={styles.modalWrapper}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>Change Login:</Text>
            <View style={styles.inputField}>
              <TextInput style={styles.input} value={state.editHandle} onChangeText={actions.setEditHandle}
                  autoCapitalize={'none'} placeholder="Username" placeholderTextColor={Colors.grey} />
              { state.checked && state.available && (
                <Ionicons style={styles.icon} name="checkcircleo" size={18} color={Colors.background} />
              )}
              { state.checked && !state.available && (
                <Ionicons style={styles.icon} name="exclamationcircleo" size={18} color={Colors.alert} />
              )}
            </View>
            { !state.showPassword && (
              <View style={styles.inputField}>
                <TextInput style={styles.input} value={state.editPassword} onChangeText={actions.setEditPassword}
                    autoCapitalize={'none'} secureTextEntry={true} placeholder="Password"
                    placeholderTextColor={Colors.grey} />
                <TouchableOpacity onPress={actions.showPassword}>
                  <Ionicons style={styles.icon} name="eyeo" size={18} color="#888888" />
                </TouchableOpacity>
              </View>
            )}
            { state.showPassword && (
              <View style={styles.inputField}>
                <TextInput style={styles.input} value={state.editPassword} onChangeText={actions.setEditPassword}
                    autoCapitalize={'none'} secureTextEntry={false} placeholder="Password"
                    placeholderTextColor={Colors.grey} />
                <TouchableOpacity onPress={actions.hidePassword}>
                  <Ionicons style={styles.icon} name="eye" size={18} color="#888888" />
                </TouchableOpacity>
              </View>
            )}
            { !state.showConfirm && (
              <View style={styles.inputField}>
                <TextInput style={styles.input} value={state.editConfirm} onChangeText={actions.setEditConfirm}
                    autoCapitalize={'none'} secureTextEntry={true} placeholder="Confirm"
                    placeholderTextColor={Colors.grey} />
                <TouchableOpacity onPress={actions.showConfirm}>
                  <Ionicons style={styles.icon} name="eyeo" size={18} color="#888888" />
                </TouchableOpacity>
              </View>
            )}
            { state.showConfirm && (
              <View style={styles.inputField}>
                <TextInput style={styles.input} value={state.editConfirm} onChangeText={actions.setEditConfirm}
                    autoCapitalize={'none'} secureTextEntry={false} placeholder="Confirm"
                    placeholderTextColor={Colors.grey} />
                <TouchableOpacity onPress={actions.hideConfirm}>
                  <Ionicons style={styles.icon} name="eye" size={18} color="#888888" />
                </TouchableOpacity>
              </View>
            )}
            <View style={styles.modalControls}>
              <TouchableOpacity style={styles.cancel} onPress={actions.hideEditLogin}>
                <Text style={styles.canceltext}>Cancel</Text>
              </TouchableOpacity>
              { (state.checked && state.available && state.editConfirm === state.editPassword && state.editPassword) && (
                <TouchableOpacity style={styles.save} onPress={saveLogin}>
                  <Text style={styles.saveText}>Save</Text>
                </TouchableOpacity>
              )}
              { !(state.checked && state.available && state.editConfirm === state.editPassword && state.editPassword) && (
                <View style={styles.disabled}>
                  <Text style={styles.disabledText}>Save</Text>
                </View>
              )}
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

export function Profile() {
  return (
    <View style={styles.full}>
      <ProfileHeader />
      <ProfileBody />
    </View>
  );
}


