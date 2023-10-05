import { StyleSheet } from 'react-native';
import { Colors } from 'constants/Colors';

export const styles = StyleSheet.create({
  drawerContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  drawerHeader: {
    fontFamily: 'roboto',
    color: Colors.text,
    fontSize: 20,
    padding: 16,
  },
  drawerFrame: {
    width: '80%',
    maxWidth: 400,
    paddingBottom: 32,
  },
  drawerLogo: {
    aspectRatio: 1,
    resizeMode: 'contain',
    borderRadius: 8,
    width: null,
    height: null,
  },
  drawerLogoEdit: {
    position: 'absolute',
    top: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.drawerBase,
    paddingLeft: 8,
    paddingRight: 8,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  drawerEditDivider: {
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  drawerLine: {
    borderWidth: 1,
    borderColor: Colors.areaBase,
    flexGrow: 1,
  },
  drawerDivider: {
    width: '80%',
    borderWidth: 1,
    borderColor: Colors.areaBase,
    marginTop: 16,
  },
  drawerName: {
    width: '80%',
    paddingLeft: 8,
    paddingRight: 8,
  },
  drawerNameSet: {
    color: Colors.text,
    fontFamily: 'roboto',
    fontSize: 48,
    flexGrow: 1,
    flexShrink: 1,
  },
  drawerNameUnset: {
    color: Colors.inputPlaceholder,
    fontFamily: 'roboto',
    fontSize: 48,
    fontStyle: 'italic',
    flexGrow: 1,
  },
  drawerNameEdit: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
    paddingRight: 8,
  },
  drawerEntry: {
    width: '80%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 8,
  },
  container: {
    width: '100%',
    height: '100%',
  },
  content: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    display: 'flex',
    alignItems: 'center',
  },
  blur: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.modalOverlay,
  },
  logo: {
    alignSelf: 'center',
  },
  details: {
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
    backgroundColor: Colors.screenBase,
    borderTopWidth: 1,
    borderColor: Colors.areaBorder,
    borderLeftWidth: 0.2,
    borderRightWidth: 0.2,
    paddingLeft: 1,
    paddingRight: 1,
    display: 'flex',
    flexShrink: 1,
    flexGrow: 1,
    paddingBottom: 16,
  },
  control: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  edit: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: Colors.screenBase,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderColor: Colors.areaBorder,
  },
  editLabel: {
    color: Colors.text,
    paddingRight: 8,
    paddingTop: 2,
    fontSize: 16,
    fontFamily: 'roboto',
    color: Colors.linkText,
  },
  nameSet: {
    color: Colors.text,
    fontFamily: 'roboto',
    fontSize: 48,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
  },
  nameUnset: {
    color: Colors.inputPlaceholder,
    fontFamily: 'roboto',
    fontSize: 48,
    paddingTop: 8,
    paddingLeft: 16,
    fontStyle: 'italic',
  },
  username: {
    color: Colors.text,
    fontFamily: 'roboto',
    fontSize: 18,
    paddingLeft: 16,
    paddingBottom: 16,
  },
  group: {
    marginLeft: 16,
    marginRight: 16,
    backgroundColor: Colors.areaBase,
    borderRadius: 8,
    marginTop: 16,
    display: 'flex',
  },
  attributes: {
    marginLeft: 16,
    marginRight: 16,
    backgroundColor: Colors.areaBase,
    borderRadius: 8,
    marginTop: 16,
    display: 'flex',
    flexShrink: 1,
  },
  divider: {
    width: '100%',
    height: 3, 
    backgroundColor: Colors.screenBase,
  },
  entry: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 8,
  },
  description: {
    display: 'flex',
    flexShrink: 1,
  },
  descriptionIcon: {
    alignSelf: 'flex-start',
    paddingLeft: 8,
    paddingRight: 16,
  },
  drawerDescriptionIcon: {
    alignSelf: 'flex-start',
    paddingLeft: 8,
    paddingRight: 8,
  },
  icon: {
    paddingLeft: 8,
    paddingRight: 16,
  },
  drawerIcon: {
    paddingLeft: 8,
    paddingRight: 8,
  },
  locationSet: {
    fontSize: 16,
    color: Colors.text,
    fontFamily: 'roboto',
    flex: 1,
  },
  locationUnset: {
    fontSize: 16,
    color: Colors.inputPlaceholder,
    fontFamily: 'roboto',
    fontStyle: 'italic',
    flex: 1,
  },
  descriptionSet: {
    fontSize: 16,
    color: Colors.text,
    fontFamily: 'roboto',
    flex: 1,
  },
  descriptionUnset: {
    fontSize: 16,
    color: Colors.inputPlaceholder,
    fontFamily: 'roboto',
    fontStyle: 'italic',
    flex: 1,
  },
  visibleLabel: {
    fontSize: 16,
    color: Colors.text,
    fontFamily: 'roboto',
    paddingRight: 8,
  },
  track: {
    false: Colors.idleFill,
    true: Colors.activeFill,
  },
  visibleSwitch: {
    transform: [{ scaleX: .6 }, { scaleY: .6 }],
  },
  trigger: {
    triggerTouchable: {
      activeOpacity: 70,
    },
  },
  options: {
    backgroundColor: Colors.areaBase,
    borderWidth: 0.2,
    borderColor: Colors.areaBorder,
  },
  option: {
    padding: 6,
    color: Colors.text,
    backgroundColor: Colors.areaBase,
    fontFamily: 'roboto',
    fontSize: 16,
    textAlign: 'center',
  },
  modalOverlay: {
    width: '100%',
    height: '100%',
  },
  modalBase: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center' 
  },
  modalContainer: {
    backgroundColor: Colors.modalBase,
    borderColor: Colors.modalBorder,
    borderWidth: 1,
    width: '80%',
    maxWidth: 400,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 8,
  },
  modalClose: {
    position: 'absolute',
    width: '100%',
    display: 'flex',
    alignItems: 'flex-end',
  },
  dismissButton: {
    padding: 12,
  },
  modalHeader: {
    fontSize: 18,
    paddingTop: 16,
    paddingBottom: 16,
    color: Colors.labelText,
    fontFamily: 'Roboto',
  },
  modalInput: {
    marginRight: 16,
    marginLeft: 16,
    marginTop: 8,
    marginBottom: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  field: {
    input: {
      backgroundColor: Colors.inputBase,
      borderRadius: 8,
      minHeight: 40,
      maxHeight: 128,
      paddingLeft: 8,
    },
    inputText: {
      color: Colors.inputText,
    },
    label: {
      height: 16,
      paddingLeft: 8,
    },
    labelText: {
      color: Colors.inputPlaceholder,
      fontSize: 12,
    },
    container: {
      width: '100%',
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 8,
    },
  },
  buttons: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    padding: 8,
    alignItem: 'flex-end',
    justifyContent: 'flex-end',
  },
  cancelButton: {
    marginTop: 8,
    marginBottom: 16,
    marginRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 4,
    backgroundColor: Colors.cancelButton,
    width: '33%',
    height: 32,
    display: 'flex',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: Colors.cancelButtonText,
    fontFamily: 'Roboto',
  },
  saveButton: {
    marginTop: 8,
    marginBottom: 16,
    marginRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 4,
    backgroundColor: Colors.primaryButton,
    width: '33%',
    height: 32,
    display: 'flex',
    alignItems: 'center',
  },
  saveButtonText: {
    color: Colors.primaryButtonText,
    fontFamily: 'Roboto',
  },
});

