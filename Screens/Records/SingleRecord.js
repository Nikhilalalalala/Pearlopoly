import React, { Component } from "react";
import { StyleSheet, Text, View , Modal, Dimensions, TouchableOpacity} from "react-native";
import { Icon } from "react-native-elements";

export default class SingleRecord extends Component {
  
  state = { 
    isModalOpen: false,
    useruid: ''
  }

  componentDidMount() {
    let useruid = firebase.auth().currentUser.uid;
    this.setState({ useruid: useruid });
  }
  
  iconify = (cat) => {
    let nameIcon;
    let type = "";
    switch (cat) {
      case "Food":
        nameIcon = "restaurant";
        break;
      case "Education":
        nameIcon = "school";
        break;
      case "Transport":
        nameIcon = "train";
        break;
      case "Shopping":
        nameIcon = "shopping-bag";
        type = "font-awesome";
        break;
      case "Other Spending":
        nameIcon = "question-circle-o";
        type = "font-awesome";
        break;
      case "Income":
        nameIcon = "usd";
        type = "font-awesome";
        break;
    }
    return (
      <Icon
        style={stylesSingleRecord.categoryIcon}
        name={nameIcon}
        type={type}
        color={cat !== "Income" ? "#ed6a5a" : "#75B9BE"}
      />
    );
  };

  deleteRecord = () => {
    let id = this.props.key;
    let date = new Date (this.props.timestamp);
    firebase.firestore().collection('users').doc(`${this.state.useruid}`).collection("records").doc(id).delete();
    firebase.firestore().collection("users").doc(`${this.state.useruid}`).collection("statistics")
      .orderBy("beginDate", "desc")
      .limit(1)
      .get()
      .then((data) => {
        if (!data.empty) {
          data.forEach((dat) => {
            let docData = dat.data();
            let statsDate = new Date(docData.beginDate);
            // only changes stats doc if it is in the current week 
            if (date > statsDate) {
              let newData;
              switch (this.props.category) {
                case "Food":
                  newData = {
                    TotalFood: docData.TotalFood - this.props.value,
                    TotalOverall: docData.TotalOverall - this.props.value,
                  };
                  break;
                case "Education":
                  newData = { TotalEducation: docData.TotalEducation - this.props.value,
                    TotalOverall: docData.TotalOverall - this.props.value,
                  };
                  break;
                case "Transport":
                  newData = { TotalTransport: docData.TotalTransport - this.props.value,
                    TotalOverall: docData.TotalOverall - this.props.value,
                  };
                  break;
                case "Shopping":
                  newData = { TotalShopping: docData.TotalShopping  - this.props.value,
                    TotalOverall: docData.TotalOverall - this.props.value,
                  };
                  break;
                case "Other Spending":
                  newData = {
                    TotalOtherSpending: docData.TotalOtherSpending  - this.props.value,
                    TotalOverall: docData.TotalOverall - this.props.value,
                  };
                  break;
                case "Income":
                  newData = { TotalIncome: docData.TotalIncome - this.props.value,
                  };
                  break;
              }
              firebase.firestore().collection("users").doc(`${this.state.useruid}`).collection("statistics")
              .doc(docData.statsID).set(
                newData, {merge: true}
              )
            }
          })
        }
      })
  }

  ratify = (numRating) =>  {
    let rating  = []
    if (numRating > 0) {
      for (let i = 0; i < numRating; i++) {
        rating.push(
            <Icon
              name={"star"}
              // type= "font-awesome"
              size={18}
              style={{paddingRight: 5, bottom:2,}}
              color={"#f2cc5a"} /> 
        )
      }
    }
    return rating
  }
  render() {
      return (
        <View>
          <TouchableOpacity style={stylesSingleRecord.container} onPress={() => this.setState({isModalOpen: true})}>
            <View style={stylesSingleRecord.bottomRow}>
              <Text style={stylesSingleRecord.name}>{this.props.date}</Text>
              <View style={{flexDirection: 'row', }}>{this.ratify(this.props.rating)}</View>          
            </View>
      
            <View style={stylesSingleRecord.bottomRow}>
              <View style={stylesSingleRecord.nameAndIcon}>
                {this.iconify(this.props.category)}
                <Text style={stylesSingleRecord.name}>{this.props.name}</Text>
              </View>
              <Text
                style={
                  this.props.isIncome
                    ? stylesSingleRecord.incomevalue
                    : stylesSingleRecord.expensevalue
                }
              >
                $ {Number(this.props.value).toFixed(2)}
              </Text>
            </View>
          </TouchableOpacity>
          <Modal
                animationType='slide'
                transparent={true}
                visible={this.state.isModalOpen}>
            <View style={modal.backgroundDim}>
              <View style={modal.overallEdit}>
                {/* <View style= {modal.field}> */}

              <Text> Name Of Expense: {this.props.name}</Text>
              <Text> Amount: $ {Number(this.props.value).toFixed(2)}</Text>
              <Text> Date Of Expense: {this.props.date}</Text>
              { this.ratify(this.props.rating).length > 0 && <View style={{flexDirection: 'row', }}><Text> Satisfaction Rating: </Text>{this.ratify(this.props.rating)}</View>  }
                {/* </View> */}
                <View style={{flexDirection:'row', alignItems:'center', justifyContent: "center", width: '100%',}}>
                  <TouchableOpacity style={modal.buttonDelete} onPress={() => this.deleteRecord()}>
                    <Text style={{ fontFamily: 'Lato-Regular' }}>Delete</Text>
                  </TouchableOpacity> 
                  <TouchableOpacity style={modal.button} onPress={() => this.setState({isModalOpen: false})}>
                    <Text style={{ fontFamily: 'Lato-Regular' }}>Done</Text>
                  </TouchableOpacity>
                </View>
              </View>
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
    overallEdit: {
      width: '80%',
      height: windowHeight /4,
      backgroundColor: '#FAF3DD',
      borderRadius: 31,
      padding: 20,
      marginTop: windowHeight / 4,
      position: 'absolute',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      height: 35,
      width: 70,
      marginTop: 20,
      backgroundColor: '#BB7E5D',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius:4,
      marginHorizontal: 6,
    },
    buttonDelete: {
      backgroundColor: "#E90F0F",
      height: 35,
      width: 70,
      marginTop: 20,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius:4,
      marginHorizontal: 6,
    }
  })

  const stylesSingleRecord = StyleSheet.create({
    container: {
      backgroundColor: "#E1E2DA",
      marginTop: 10,
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 5,
      width: '95%',
      height: 60,
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      alignSelf:"center",
    },
  
    nameAndIcon: {
      paddingBottom: 5,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      // width:'100%'
    },
    bottomRow: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
    },
    name: {
      fontFamily: "Lato-Regular",
      textAlign: "left",
      paddingLeft: 5,
      paddingBottom: 5,
    },
    category: {
      fontFamily: "Lato-Regular",
      textAlign: "left",
      paddingLeft: 5,
      paddingBottom: 5,
    },
    categoryIcon: {
      textAlign: "left",
      paddingLeft: 5,
      paddingBottom: 5,
    },
    incomevalue: {
      color: "#75B9BE",
      fontFamily: "Lato-Regular",
      textAlign: "right",
      // bottom: 28,
      paddingRight: 5,
      alignSelf: "flex-end",
    },
    expensevalue: {
      color: "#ED6A5A",
      fontFamily: "Lato-Regular",
      textAlign: "right",
      // bottom: 28,
      fontSize:20,
      paddingBottom: 15,
      paddingRight: 5,
      alignSelf: "flex-end",
    },
  });