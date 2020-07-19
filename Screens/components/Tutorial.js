import React from 'react';
import { View, ScrollView, StyleSheet, Dimensions, Alert, Text, Modal, TouchableOpacity, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const userGuide = [
  {
    title: 'Welcome!',
    img: require('../../assets/guide1.png'),
    desc: 'Welcome to Pearlopoly! This user guide can be found right here in the settings should you need it again or choose to skip it. Swipe to continue!',
    next: 'Next >>>',
    back: '',
  },
  {
    title: 'Navigation',
    img: require('../../assets/guide2.png'),
    desc: 'Navigate the app via the navigation bar at the bottom.',
    next: 'Next >>>',
    back: '<<< Back',
  },
  {
    title: 'Overview: Expenditure',
    img: require('../../assets/guide3.png'),
    desc: 'Each slice of the pie chart can be tapped to reveal the category it represents and the expenditure for the category',
    next: 'Next >>>',
    back: '<<< Back',
  },
  {
    title: 'Add records',
    img: require('../../assets/guide4.png'),
    desc: 'Record your finances here. Enter a short description, the amount, and select the category.',
    next: 'Next >>>',
    back: '<<< Back',
  },
  {
    title: 'Records',
    img: require('../../assets/guide5.png'),
    desc: 'View your records here. The date, description, category and amount will be displayed.',
    next: 'Next >>>',
    back: '<<< Back',
  },
  {
    title: 'Overall goal',
    img: require('../../assets/guide6.png'),
    desc: 'Tap on the progress bar or the pencil icon to set/edit your weekly goal',
    next: 'Next >>>',
    back: '<<< Back',
  },
  {
    title: 'Category goals',
    img: require('../../assets/guide7.png'),
    desc: 'Tap on corresponding buttons to set/edit each goal\'s category. The colour-coded buttons will show the limit set and the current expenditure for the category.',
    next: 'Next >>>',
    back: '<<< Back',
  },
  {
    title: 'Settings',
    img: require('../../assets/placeholder.png'),
    desc: 'idk is this even needed',
    next: 'Next >>>',
    back: '<<< Back',
  },
  {
    title: 'Overview: Goal',
    img: require('../../assets/placeholder.png'),
    desc: 'The limit can be set on the goals page',
    next: '',
    back: '<<< Back',
  },
];

class Tutorial extends React.Component {
  state = {
    modalVisible: true,
  };

  renderItems = ({item, index}) => {
    return(
    <View style={modal.page}>
      <Text style={modal.pageTitle}>{item.title}</Text>
      <Image source={item.img} />
      <Text style={modal.pageDesc}>{item.desc}</Text>
      <View style={modal.pageIndicator}>
        <Text>{item.back}</Text>
        <Text>{item.next}</Text>
      </View>
    </View>
    );
  };

  render() {
    return(
      <View>
        <Modal 
          animationType='slide'
          transparent={true}
          visible={this.state.modalVisible}
        >
          <TouchableOpacity
            style={modal.backgroundDim}
            onPress={ () => console.log('i have been touched')}
          />

          <View style={modal.main}>
            <Carousel
              data = {userGuide}
              renderItem = {this.renderItems}
              itemWidth={carouselWidth*0.9}
              sliderWidth={carouselWidth}
              />
          </View>
        </Modal>

        
      </View>
      
    );
  }
}

const windowHeight = Dimensions.get('window').height;
//wait what the hell is this??? what is the actual fuck?
const carouselWidth = Dimensions.get('window').width - 31 -31;

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
    position: 'absolute',
    marginTop: windowHeight*0.1,
  },
  page: {
    height: '90%',
    width: '100%',
    alignSelf: 'center',
    marginTop: 31,
    justifyContent: 'space-between'
  },
  pageTitle: {
    alignSelf: 'center',
    fontFamily: 'Lato-Regular',
    fontSize: 20,
  },
  pageDesc: {
    textAlign: 'center',
    fontFamily: 'Lato-Regular',
  },
  pageIndicator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }

})

export default Tutorial;