import * as React from 'react';
//@ts-ignore
import {
  ActivityIndicator,
  Modal,
  StatusBar,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import FontFamily from '../res/FontFamily';
import Button from './Button';

interface DMInterface {
  style?: StyleProp<ViewStyle>;
  modalStyle: object;
  innerModalStyle: object;
  progress: number;
  visible: boolean;
  onPress(): any;

  progressVisible?: boolean;
  title?: any;
  buttonTitle?: any;

  buttonVisible?: boolean;

  download?: boolean;
}

export default class DownloadModal extends React.Component<DMInterface, any> {
  constructor(props: DMInterface) {
    super(props);
    this.state = {};
  }

  public static defaultProps = {
    style: null,
    modalStyle: null,
    innerModalStyle: null,
    progress: 0,
    visible: false,
    progressVisible: false,

    title: 'Downloading!',
    buttonTitle: 'Stop',

    buttonVisible: true,
    download: false,
  };

  render() {
    let {
      style,
      modalStyle,
      innerModalStyle,
      progress,
      visible,
      progressVisible,
      title,
      buttonTitle,
      buttonVisible,
    } = this.props;

    var modalBackgroundStyle = {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    };

    return (
      <View style={[styles.mainContainer, style]}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={visible}
          onRequestClose={() => {}}>
          <View
            style={[styles.container, modalBackgroundStyle, {...modalStyle}]}>
            <View
              style={[
                styles.innerContainerTransparentStyle,
                {...innerModalStyle},
              ]}>
              <Text style={styles.downloadText}>{title}</Text>
              <ActivityIndicator color={'#000'} size={40} />

              {progressVisible && (
                <Text style={styles.percentageText}>
                  {progress} / {`100%`}
                </Text>
              )}

              {buttonVisible && (
                <Button
                  onPress={() => {
                    this.props.onPress();
                  }}
                  text={buttonTitle}
                  style={{
                    borderRadius: 10,
                    bottom: -5,
                    zIndex: 5,
                  }}
                  textStyle={{
                    fontFamily: FontFamily.Poppins.Bold,
                    fontSize: 15,
                    color: 'white',
                  }}
                  gradientColors={['#EF039D', '#F76A20']}
                  gradientStyles={{
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  isLoading={false}
                />
              )}
            </View>
          </View>
        </Modal>
      </View>
    );
  } // end of Function Render
} //end of class CustomTextInput

const styles = StyleSheet.create({
  mainContainer: {
    // paddingBottom: StatusBar.currentHeight,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#ecf0f1',
  },
  innerContainerTransparentStyle: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    width: '60%',
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 5,
  },
  percentageText: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    paddingVertical: 10,
    color: '#000',
  },
  downloadText: {
    alignSelf: 'center',
    fontSize: 17,
    paddingVertical: 10,
    color: '#000',
  },
}); //end of StyleSheet STYLES
