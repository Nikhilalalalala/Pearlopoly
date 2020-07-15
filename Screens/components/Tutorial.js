import React from 'react';
import { View, ScrollView, StyleSheet, Dimensions, Alert, Text, Modal} from 'react-native';

class Tutorial extends React.Component {
  state = {
    modalVisible: this.props.visible,
  };

  render() {
    return(
      <View style={modal.backgroundDim}>
        <Modal 
          animationType='slide'
          transparent={true}
          visible={this.state.modalVisible}
        >
          <View style={modal.main}>
            {/*insert carousel here*/}
          </View>
        </Modal>
      </View>
    );
  }
}

const windowHeight = Dimensions.get('window').height;

const modal = StyleSheet.create({
  backgroundDim: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  main: {
    height: '80%',
    width: '90%',
    backgroundColor: '#FAF3DD',
    borderRadius: 31,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent:'center',
    marginTop: windowHeight*0.1,
  },
  page: {
    height: '90%',
    width: '90%',
    backgroundColor: 'white'
  }

})

export default Tutorial;