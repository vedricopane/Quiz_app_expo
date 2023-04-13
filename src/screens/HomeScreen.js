import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();

  const onBtnStartQuiz = () => {
    navigation.navigate("Quiz");
  };

  return (
    <View>
      <Image
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9k2hf2J5rbVVpb4Z1Gy4y9D0vWZHQnA1dW6GxHchAKtufJapZ_bJOkZ_ESB3nDoSvgFw&usqp=CAU",
        }}
        style={styles.image}
      />

      <View>
        <Text style={styles.title}>QUIZ RULES</Text>

        <View style={styles.bgQiuzRules}>
          <View style={styles.containerRules}>
            <Text style={styles.numRules}>a.</Text>
            <Text style={styles.containRules}>
              For each correct answer you get 5 points.
            </Text>
          </View>

          <View style={styles.containerRules}>
            <Text style={styles.numRules}>b.</Text>
            <Text style={styles.containRules}>
              There is no negative marking for wrong answer.
            </Text>
          </View>

          <View style={styles.containerRules}>
            <Text style={styles.numRules}>c.</Text>
            <Text style={styles.containRules}>
              Each question has a time of 15 seconds.
            </Text>
          </View>

          <View style={styles.containerRules}>
            <Text style={styles.numRules}>d.</Text>
            <Text style={styles.containRules}>
              You have to compulsarily answer all the question given.
            </Text>
          </View>
        </View>

        <Pressable onPress={onBtnStartQuiz} style={styles.btnStartQuiz}>
          <Text style={styles.titleStartQuiz}>Start Quiz</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 370,
    resizeMode: "contain",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "magenta",
    textAlign: "center",
  },
  bgQiuzRules: {
    backgroundColor: "#f88379",
    borderRadius: 6,
    padding: 10,
    margin: 10,
  },
  containerRules: {
    flexDirection: "row",
    marginVertical: 5,
  },
  numRules: {
    color: "white",
    fontSize: 15,
  },
  containRules: {
    marginLeft: 4,
    fontSize: 15,
    fontWeight: "500",
    color: "#722f37",
  },
  btnStartQuiz: {
    backgroundColor: "magenta",
    width: 100,
    padding: 10,
    borderRadius: 20,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 30,
  },
  titleStartQuiz: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
