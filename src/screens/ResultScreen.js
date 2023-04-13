import {
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

const ResultScreen = () => {
  const route = useRoute();
  // console.log(route.params);

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.StatusBar}>
      <View style={styles.containerHeader}>
        <Text>Your Results</Text>

        <View style={styles.share}>
          <Text>Share</Text>
          <AntDesign
            style={styles.iconShare}
            name="sharealt"
            size={18}
            color="black"
          />
        </View>
      </View>

      <View style={styles.quesAnswer}>
        <Text>Question Answered</Text>
        <Text>(5/5)</Text>
      </View>

      <Pressable style={styles.containerScoreCard}>
        <Text style={styles.textScoreCard}>Score Card</Text>

        <FlatList
          numColumns={2}
          data={route.params.answer}
          renderItem={({ item, i }) => (
            <View style={styles.flatList}>
              <Text>{item.question}</Text>
              {item.answer === true ? (
                <AntDesign name="checkcircle" size={20} color="green" />
              ) : (
                <AntDesign name="closecircle" size={20} color="red" />
              )}
            </View>
          )}
        />

        <Text style={styles.textScore}>Score: {route.params.point}</Text>
        <Pressable
          onPress={() => navigation.replace("Home")}
          style={styles.aaa}
        >
          <Text style={styles.textContinue}>Continue</Text>
        </Pressable>
      </Pressable>
    </SafeAreaView>
  );
};

export default ResultScreen;

const styles = StyleSheet.create({
  StatusBar: {
    marginTop: StatusBar.currentHeight,
    marginHorizontal: 10,
  },
  containerHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  share: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconShare: {
    marginLeft: 4,
  },
  quesAnswer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  containerScoreCard: {
    backgroundColor: "white",
    height: 250,
    borderRadius: 7,
    marginTop: 20,
  },
  textScoreCard: {
    fontSize: 15,
    fontWeight: "500",
    color: "magenta",
    textAlign: "center",
    marginTop: 8,
  },
  // optionText1: {
  //   borderColor: "#00ffff",
  //   borderWidth: 0.5,
  //   width: 40,
  //   height: 40,
  //   borderRadius: 40 / 2,
  //   textAlign: "center",
  //   padding: 10,
  // },
  flatList: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    marginLeft: "auto",
    marginRight: "auto",
  },
  aaa: {
    backgroundColor: "green",
    borderRadius: 5,
    padding: 8,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 20,
  },
  textContinue: {
    color: "white",
    textAlign: "center",
  },
  textScore: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
});
