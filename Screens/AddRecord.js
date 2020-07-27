import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import { Icon } from "react-native-elements";
import { Rating , AirbnbRating } from 'react-native-elements';
import { Tooltip } from 'react-native-elements';
import * as firebase from "firebase";
import firebaseDb from "../firebaseDb";
import { ScrollView } from "react-native-gesture-handler";

class AddRecord extends Component {
  state = {
    name: "",
    amount: "",
    chosenCategory: "",
    useruid: null,
    rating: 0,
    ratingName: 'Choose a rating between 1-5',
    modalVisible: false,
  };

  componentDidMount() {
    let useruid = firebase.auth().currentUser.uid;
    this.setState({ useruid: useruid });
  }
  // componentWillUnmount() { need to detach listeners}

  /* handleAmount = (amount) => {
    let amount_actual = amount.nativeEvent.text
    if (!isNaN(amount_actual)) {
      let amt = parseFloat(amount_actual, 10);
      if (amt > 0) {
        console.log(amt)
        this.setState({ amount: amt });
      } else {
        Alert.alert(
          "Invalid Amount",
          "Please enter a valid amount",
          [{ text: "OK" }],
          { cancelable: false }
        );
      }
    } else {
      Alert.alert(
        "Invalid Amount",
        "Please enter a valid amount",
        [{ text: "OK" }],
        { cancelable: false }
      );
    }
  }; */

  handleName = (name) => {
    this.setState({ name: name });
  };

  handleCategory = (category) => {
    this.setState({ chosenCategory: category });
  };

  updateAmountState = (amount) => {
    this.setState({ amount: amount });
  };

  addDocID = (id) => {
    firebaseDb
      .firestore()
      .collection("users")
      .doc(`${this.state.useruid}`)
      .collection("records")
      .doc(`${id}`)
      .set({ recordID: id }, { merge: true });
  };

  updateStatistics = (amt, cat) => {
    firebase
      .firestore()
      .collection("users")
      .doc(`${this.state.useruid}`)
      .collection("statistics")
      .orderBy("beginDate", "desc")
      .limit(1)
      .get()
      .then((data) => {
        //if there is already an existing stats document
        let needToCreateNewStats = false
        if (!data.empty) {
          data.forEach((dat) => {
            let docData = dat.data();
            let recentDate = new Date(docData.beginDate);
            let nextWeek = new Date(
              recentDate.getFullYear(),
              recentDate.getMonth(),
              recentDate.getDate() + 7
            );
            let nowDate = new Date();
            let statsID = docData.statsID;
            // if it is within the timelimit
            if (nowDate < nextWeek) {
              //check if that data is within a week
              //if not add a new document
              let newData;
              switch (cat) {
                case "Food":
                  newData = {
                    TotalFood: amt + docData.TotalFood,
                    TotalOverall: amt + docData.TotalOverall,
                  };
                  break;
                case "Education":
                  newData = { TotalEducation: amt + docData.TotalEducation,
                    TotalOverall: amt + docData.TotalOverall,
                  };
                  break;
                case "Transport":
                  newData = { TotalTransport: amt + docData.TotalTransport,
                    TotalOverall: amt + docData.TotalOverall,
                  };
                  break;
                case "Shopping":
                  newData = { TotalShopping: amt + docData.TotalShopping,
                    TotalOverall: amt + docData.TotalOverall,
                  };
                  break;
                case "Other Spending":
                  newData = {
                    TotalOtherSpending: amt + docData.TotalOtherSpending,
                    TotalOverall: amt + docData.TotalOverall,
                  };
                  break;
                case "Income":
                  newData = { TotalIncome: amt + docData.TotalIncome,
                  };
                  break;
              }
              firebase
                .firestore()
                .collection("users")
                .doc(`${this.state.useruid}`)
                .collection("statistics")
                .doc(`${statsID}`)
                .set(newData, { merge: true });
            } else {
              needToCreateNewStats = true
            }
          });
        } else {
          needToCreateNewStats = true
        }
        if (needToCreateNewStats) {
          firebase
            .firestore()
            .collection("users")
            .doc(`${this.state.useruid}`)
            .collection("statistics")
            .add({
              TotalEducation: 0,
              TotalFood: 0,
              TotalShopping: 0,
              TotalTransport: 0,
              TotalOtherSpending: 0,
              TotalIncome: 0,
              TotalOverall: 0,
              beginDate: Date.now(),
            })
            .then((key) => {
              let newData;
              switch (cat) {
                case "Food":
                  newData = { TotalFood: amt, TotalOverall: amt, statsID: key.id };
                  break;
                case "Education":
                  newData = { TotalEducation: amt, TotalOverall: amt, statsID: key.id };
                  break;
                case "Transport":
                  newData = { TotalTransport: amt, TotalOverall: amt, statsID: key.id };
                  break;
                case "Shopping":
                  newData = { TotalShopping: amt, TotalOverall: amt, statsID: key.id };
                  break;
                case "Other Spending":
                  newData = { TotalOtherSpending: amt, TotalOverall: amt, statsID: key.id };
                  break;
                case "Income":
                  newData = { TotalIncome: amt, statsID: key.id };
                  break;
              }
              firebase
                .firestore()
                .collection("users")
                .doc(`${this.state.useruid}`)
                .collection("statistics")
                .doc(key.id)
                .set(newData, { merge: true });
            });
        }
      });
  };

  addRecord = () => {
    if (this.state.name && this.state.amount && this.state.chosenCategory && this.state.rating > 0) {
      let invalid = false
      let amount = this.state.amount
      var amount_number
      if (!isNaN(amount)) { 
        amount_number = parseFloat(amount, 10);
        if (amount_number <0) invalid = true
      } else {
        invalid = true
      }
      if (invalid) {
        Alert.alert(
          "Invalid Amount", "Please enter a valid amount",
          [{ text: "OK" }],{ cancelable: false }
        );
      } else {
          let name = this.state.name;
          // let realAmt = this.state.amount;
          let chosenCategory = this.state.chosenCategory;
          let satisfactionRating = this.state.rating;
          this.setState({ name: "", amount: "", chosenCategory: "", rating: 0, ratingName: 'Choose a rating between 1-5'});
    
          firebaseDb
            .firestore()
            .collection("users")
            .doc(`${this.state.useruid}`)
            .collection("records")
            .add({
              name: name,
              amount: amount_number,
              Timestamp: Date.now(),
              category: chosenCategory,
              satisfactionRating: satisfactionRating
            })
            .then((doc) => {
              this.addDocID(doc.id);
              this.updateStatistics(amount_number, chosenCategory);
              this.props.navigation.navigate("Record");
            });
      }
    } else if (!this.state.amount) {
      Alert.alert(
        "Invalid Amount", "Please enter a valid amount",
        [{ text: "OK" }], { cancelable: false }
      );
    } else if (this.state.rating === 0) {
      Alert.alert(
        "Invalid Rating", "Please give a statisfaction rating between 1 to 5",
        [{ text: "OK" }], { cancelable: false }
      );
    } else if (!this.state.chosenCategory) {
      Alert.alert(
        "No Category Chosen", "Please choose a suitable category",
        [{ text: "OK" }], { cancelable: false }
      );
    } else if (!this.state.name) {
      Alert.alert(
        "Invalid Name", "Please enter a valid name",
        [{ text: "OK" }], { cancelable: false }
      );
    }
  };

  category(cat, iconName, type, typeOfSpending) {
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState({ chosenCategory: cat });
        }}
      >
        <Icon
          name={iconName}
          type={type}
          color={
            this.state.chosenCategory === cat
              ? "#BB7E5D"
              : typeOfSpending === "expense"
              ? "#ed6a5a"
              : "#0081af"
          }
        />
        <Text
          style={
            this.state.chosenCategory === cat
              ? styles.categoryPressed
              : typeOfSpending === "expense"
              ? styles.categoryExpense
              : styles.categoryIncome
          }
        >
          {cat}
        </Text>
      </TouchableOpacity>
    );
  }

  ratingCompleted = (rating) => {
    let ratingNames = ['Choose a rating between 1-5', 'Should not have done that', 'A little guilty', 'Meh', "I'm Satisfied!", 'Yes! That spending/income was a good one!']
    let ratingName = ratingNames[rating]
    let numRating = rating
    this.setState({
      rating: numRating,
      ratingName: ratingName
    })

  }

  render() {
    return (
      <SafeAreaView style={screen.container}>
        <View style={main.line} />

        <ScrollView style={{alignSelf:'center',}}> 
          <View style={styles.container} key={0}>
            <View style={styles.fieldViewName}>
              <Text style={styles.fieldTitle}> Name of Expense: </Text>
              <TextInput
                placeholder="Name"
                onChangeText={this.handleName}
                style={styles.nameField}
                value={this.state.name}
                keyboardType="default"
              ></TextInput>
            </View>
            <View style={styles.fieldViewName}>
              <Text style={styles.fieldTitle}> Amount: </Text>
              <TextInput
                placeholder="Amount"
                onChangeText = {this.updateAmountState}
                // onSubmitEditing={this.updateAmountState}
                style={styles.amountField}
                value={this.state.amount}
                keyboardType="numeric"
              ></TextInput>
            </View>
            <View style={styles.fieldViewName}>
              <View style={{flexDirection:"row", marginTop: 5, alignItems:"center"}}
               >
                <Text style={styles.fieldTitle}  onPress={() => this.setState({modalVisible: true})} > Satisfaction Rating: </Text>  
                <Icon 
                onPress={() => this.setState({modalVisible: true})}
                name={"question-circle-o"}
                type={'font-awesome'}
                color='#BB7E5D'
                iconStyle={{fontSize: 18}}
                />
              </View>
              <Modal
                animationType='slide'
                transparent={true}
                visible={this.state.modalVisible}
              >
                <View style={modal.backgroundDim}>
                  <View style={modal.overallEdit}>
                    <Text style={modal.overallEdit}> </Text>
                    <Text style={{ fontFamily: 'Lato-Regular', paddingTop:5, textAlign:'center' }}>
                      We have all had the times when we are satisfied with our haul or guilty with our splurge. 
                      Go ahead and take note of this in your records as well!
                    </Text>
                    <TouchableOpacity style={modal.button} onPress={() => this.setState({modalVisible: false})}>
                      <Text style={{ fontFamily: 'Lato-Regular' }}>Done</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
              <Text
                style={styles.fieldTitleRatingName}
              >{this.state.ratingName}</Text>
              <Rating
                type='custom'
                reviews={['1','2','3','4','5']}
                ratingCount={5}
                startingValue={this.state.rating}
                imageSize={30}
                style={{marginTop:5}}
                // showRating
                ratingBackgroundColor={"#FAF3DD"}
                ratingColor={"#BB7E5D"}
                ratingTextColor={"#BB7E5D"}
                onFinishRating={this.ratingCompleted}
                />
            </View>


            <View style={styles.categoryRowOne}>
              {this.category("Education", "school", "", "expense")}
              {this.category(
                "Shopping",
                "shopping-bag",
                "font-awesome",
                "expense"
              )}
              {this.category("Food", "restaurant", "", "expense")}
            </View>
            <View style={styles.categoryRowTwo}>
              {this.category("Transport", "train", "", "expense")}
              {this.category(
                "Other Spending",
                "question-circle-o",
                "font-awesome",
                "expense"
              )}
              {this.category("Income", "usd", "font-awesome", "", "income")}
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={this.addRecord} key={1}>
            <Text
              style={{
                alignSelf: "center",
                fontSize: 18,
                fontFamily: "Lato-Bold",
              }}
            >
              Add Record
            </Text>
          </TouchableOpacity>
            
        </ScrollView>

        <View style={main.line} />
      </SafeAreaView>
    );
  }
}

const screen = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFBE86",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

const main = StyleSheet.create({
  line: {
    width: "100%",
    height: 3,
    backgroundColor: "#FAF3DD",
  },
});

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
  }
})

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    backgroundColor: "#FAF3DD",
    alignItems: "center",
    // flexDirection:'column',
    width: "90%",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  inputAmount: {
    fontFamily: "Lato-Bold",
    textAlign: "right",
    height: 40,
    marginTop: 10,
    fontSize: 20,
    marginRight: 20,
    alignSelf: "flex-end",
    width: "100%",
  },
  nameField: {
    fontFamily: "Lato-Bold",
    fontSize: 20,
    borderColor: "#BB7E5D",
    borderWidth: 2,
    padding: 5,
    textAlign: "center",
  },
  fieldTitle: {
    fontFamily: "Lato-Bold",
    fontSize: 14,
    color: "#BB7E5D",
    padding: 5,
  },

  fieldTitleRatingName: {
    fontFamily: "Lato-Bold",
    fontSize: 14,
    color: "#BB7E5D",
    width:  "100%",
    textAlign: 'center'
    // padding: 5,
  },

  amountField: {
    fontFamily: "Lato-Bold",
    fontSize: 20,
    borderColor: "#BB7E5D",
    borderWidth: 2,
    padding: 5,
    width: "100%",
    textAlign: "center",
  },
  fieldViewName: {
    width: "90%",
  },
  fieldViewAmount: {
    // display: "flex",
    // flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "flex-start",
    // width: "100%",
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  categoryRowOne: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-evenly",
    width: 325,
    marginTop: 20,
  },
  categoryRowTwo: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-evenly",
    width: 325,
    marginTop: 20,
    marginBottom: 10,
  },
  categoryExpense: {
    color: "#ed6a5a",
    fontFamily: "Lato-Bold",
    paddingTop: 7,
  },
  categoryIncome: {
    color: "#0081af",
    fontFamily: "Lato-Bold",
    paddingTop: 7,
  },
  categoryPressed: {
    color: "#BB7E5D",
    fontFamily: "Lato-Bold",
    paddingTop: 7,
  },
  button: {
    width: 150,
    backgroundColor: "#FAF3DD",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 30,
    alignSelf: "center",
  },
  categoryName: {
    fontFamily: "Lato-Bold",
    paddingTop: 7,
  },
});

export default AddRecord;
