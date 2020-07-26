import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  Modal,
  TouchableHighlight,
} from "react-native";
import { Icon } from "react-native-elements";
import * as firebase from "firebase";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Tutorial from '../components/Tutorial';
import Achievements from '../components/Achievements';

class SettingsScreen extends Component {
  state = {
    currentUserUid: null,
    currentUserData: null,
    currentUserName: "",
    isEditingName: false,
    newUserName: "",
    modalVisibleAboutUs: false,
    modalVisibleFAQ: false,
    modalVisibleUserGuide: false,
  };

  componentDidMount() {
    let useruid = firebase.auth().currentUser.uid;
    this.setState({ currentUserUid: useruid });
    firebase
      .firestore()
      .collection("users")
      .doc(`${useruid}`)
      .get()
      .then((doc) => {
        let docData = doc.data();
        this.setState({ currentUserName: docData.name });
        this.setState({ newUserName: docData.name });
        this.setState({ currentUserData: docData });
      });
  }
  setModalVisibleAboutUs = (visible) => {
    this.setState({ modalVisibleAboutUs: visible });
  };
  setModalVisibleFAQ = (visible) => {
    this.setState({ modalVisibleFAQ: visible });
  };
  updateName = () => {
    let newName = this.state.newUserName;
    if (newName) {
      firebase
        .firestore()
        .collection("users")
        .doc(`${this.state.currentUserUid}`)
        .set(
          {
            name: newName,
          },
          { merge: true }
        );
      this.setState({ currentUserName: newName });
    } else {
      Alert.alert(
        "Invalid Username",
        "Please enter a valid name",
        [{ text: "OK" }],
        { cancelable: false }
      );
    }
  };

  cautionDelete = () => {
    Alert.alert(
      "Delete All Records?",
      "You wont be able to revert this!",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            this.deleteCollection("statistics");
            this.deleteCollection("records");
          },
        },
      ],
      { cancelable: false }
    );
  };

  deleteCollection = async (col) => {
    let collectionRef = firebase
      .firestore()
      .collection(`users`)
      .doc(`${this.state.currentUserUid}`)
      .collection(`${col}`);
    // const query = collectionRef.orderBy('Timestamp').limit(100);
    let query;
    if (col === "records") {
      query = collectionRef.orderBy("Timestamp").limit(100);
    } else {
      //col === 'statistics'
      query = collectionRef.orderBy("statsID").limit(100);
    }
    return new Promise((resolve, reject) => {
      this.deleteQueryBatch(query, resolve).catch(reject);
    });
  };

  deleteQueryBatch = async (query, resolve) => {
    const snapshot = await query.get();

    const batchSize = snapshot.size;
    if (batchSize === 0) {
      // When there are no documents left, we are done
      resolve();
      return;
    }

    // Delete documents in a batch
    const batch = firebase.firestore().batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();

    // Recurse on the next process tick, to avoid
    // exploding the stack.
    // process.nextTick(() => {
    //   deleteQueryBatch(query, resolve);
    // });
  };

  logoutUser = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.navigation.reset({ index: 0, routes: [{ name: "Login"}]});;
        this.setState({ currentUser: null });
      });
  };

  render() {
    return (
      <View style={screen.container}>
        <View style={main.line} />
        <ScrollView style={{}} horizontal={false}>
          <Text style={styles.header}>Name</Text>
          <View style={styles.username}>
            {this.state.isEditing ? (
              <TextInput
                style={styles.inputField}
                value={this.state.newUserName}
                onChangeText={(val) => {
                  this.setState({ newUserName: val });
                }}
                autoFocus={true}
                onBlur={() => {
                  this.setState({ isEditing: false });
                  this.updateName();
                }}
              />
            ) : (
              <Text
                style={styles.item}
                onPress={() => this.setState({ isEditing: true })}
              >
                {this.state.currentUserName}
              </Text>
            )}
            <Icon
              name={"edit"}
              style={styles.icon}
              fontSize={20}
              color="#BB7E5D"
              onPress={() => {
                this.setState({ isEditing: true });
              }}
            />
          </View>

          <View style={styles.line} />
            
          <TouchableOpacity>
            <Achievements />
          </TouchableOpacity>

          <View style={styles.line} />

          <Text style={styles.header}>Infomation </Text>

          {/* <TouchableOpacity
            onPress={() => {
              this.setState({ modalVisibleUserGuide: !this.state.modalVisibleUserGuide});
            }}
          >
            <Text style={styles.item}>User Guide</Text>
          </TouchableOpacity>
          <View style={styles.line} />
          <Tutorial visibility={this.state.modalVisibleUserGuide} /> */}

          <TouchableOpacity
            onPress={() => {
              this.setModalVisibleAboutUs(true);
            }}
          >
            <Text style={styles.item}>About Us </Text>
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisibleAboutUs}
            >
              <View style={styles.modal}>
                <TouchableOpacity style={styles.modalBack}>
                  <Icon
                    name={"arrow-back"}
                    color="#FAF3DD"
                    onPress={() => {
                      this.setModalVisibleAboutUs(
                        !this.state.modalVisibleAboutUs
                      );
                    }}
                  />
                  <Text
                    style={styles.modalBackText}
                    onPress={() => {
                      this.setModalVisibleAboutUs(
                        !this.state.modalVisibleAboutUs
                      );
                    }}
                  >
                    Back{" "}
                  </Text>
                </TouchableOpacity>

                <Text style={styles.aboutus}>
                  Hi there!{"\n"}
                  {"\n"}Glad to see you here and hope you have been enjoying
                  Pearlopoly. {"\n"}
                  {"\n"}
                  Having been students ourselves, we know how complicated other
                  money tracking apps are and wanted to make it a easy journey
                  for you! Hence, we created Pearlopoly. With simple pages and
                  easy visuals, we hope that you would not need to say 'Im
                  broke' anymore :)
                  {"\n"}
                  {"\n"}
                  Cheers, {"\n"}
                  Mabel and Nikhila
                </Text>
              </View>
            </Modal>
          </TouchableOpacity>
          <View style={styles.line} />
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisibleFAQ}
          >
            <View style={styles.modal}>
              <View style={styles.modalBack}>
                <Icon
                  name={"arrow-back"}
                  color={"#FAF3DD"}
                  onPress={() => {
                    this.setModalVisibleFAQ(!this.state.modalVisibleFAQ);
                  }}
                />
                <Text
                  style={styles.modalBackText}
                  onPress={() => {
                    this.setModalVisibleFAQ(!this.state.modalVisibleFAQ);
                  }}
                >
                  Back{" "}
                </Text>
              </View>

              <Text style={styles.aboutus}>
                What can I do in this application ? {"\n"}
                {"\n"}
                There's a lot you can do here! You can firstly track your
                expenses by simply adding records everytime you incur an expense
                or earn some money! Its a simple process on the Add Record page!
                Next you can see your expenses in a visual manner and know where
                your money is going finally, you can learn something new with
                our tips on the Overview page. {"\n"}
                {"\n"}
              </Text>
            </View>
          </Modal>
          <TouchableOpacity>
            <Text
              style={styles.item}
              onPress={() => {
                this.setModalVisibleFAQ(true);
              }}
            >
              FAQ{" "}
            </Text>
          </TouchableOpacity>

          <View style={styles.line} />

          <Text style={styles.header}>Account </Text>
          <TouchableOpacity>
            <Text style={styles.item} onPress={() => this.cautionDelete()}>
              Clear All Records
            </Text>
          </TouchableOpacity>
          <View style={styles.line} />
          <TouchableOpacity>
            <Text style={styles.item} onPress={this.logoutUser}>
              Sign Out
            </Text>
          </TouchableOpacity>
          <View style={styles.line} />
        </ScrollView>

        <View style={main.line} />
      </View>
    );
  }
}

const screen = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFBE86",
    alignItems: "flex-start",
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

const styles = StyleSheet.create({
  header: {
    width: "100%",
    paddingTop: 30,
    paddingBottom: 10,
    fontFamily: "Lato-Regular",
    paddingLeft: "3%",
  },
  modal: {
    flex: 1,
    backgroundColor: "#BB7E5D",
  },
  modalBackText: {
    fontFamily: "Lato-Regular",
    fontSize: 20,
    color: "#FAF3DD",
    paddingLeft: 5,
    textDecorationLine: "underline",
  },
  modalBack: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "center",
    paddingTop: 20,
    paddingLeft: 20,
  },
  aboutus: {
    padding: 20,
    fontFamily: "Lato-Regular",
    fontSize: 20,
    color: "#FAF3DD",
  },
  item: {
    width: "90%",
    height: 44,
    fontFamily: "Lato-Regular",
    fontSize: 20,
    paddingLeft: "5%",
    paddingVertical: 10,
  },
  inputField: {
    width: "90%",
    height: 44,
    fontFamily: "Lato-Regular",
    fontSize: 20,
    paddingLeft: "5%",
    paddingVertical: 10,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  icon: {
    opacity: 0.5,
    color: "#BB7E5D",
    fontSize: 20,
    alignSelf: "flex-end",
    justifyContent: "flex-end",
  },
  line: {
    width: "90%",
    height: 3,
    backgroundColor: "#BB7E5D",
    alignSelf: "center",
  },
  username: {
    width: "95%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default SettingsScreen;
