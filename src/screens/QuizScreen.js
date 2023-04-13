import {
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import questions from "../data/questions";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

const QuizScreen = () => {
  const navigation = useNavigation();

  // points
  const [points, setPoints] = useState(0);

  // index for the questions
  const [index, setIndex] = useState(0);

  // answer status (true or false)
  const [answerStatus, setAnswerStatus] = useState(null);

  // answer berbentuk object
  const [answers, setAnswer] = useState([]);

  // selected answer
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);

  // counter/timer
  const [counter, setCounter] = useState(15);

  // interval
  let interval = null;

  // progress bar
  const progressPercentage = Math.floor((index / totalQuestions) * 100);

  const data = questions;
  const currentQuestion = data[index];
  const totalQuestions = data.length;
  //   console.log(currentQuestion)

  // useEffect ini running 1 kali setiap pertanyaan, sehingga ditentukan berdasarkan selectedAnswerIndex.
  // useEffect ini untuk selectedAnswerIndex !== null
  useEffect(() => {
    if (selectedAnswerIndex !== null) {
      // correct answer
      if (selectedAnswerIndex === currentQuestion.correctAnswerIndex) {
        setPoints((points) => points + 10);
        setAnswerStatus(true);
        answers.push({ question: index + 1, answer: true });
      } else {
        // wrong answer
        setAnswerStatus(false);
        answers.push({ question: index + 1, answer: false });
      }
    }
  }, [selectedAnswerIndex]);

  // useEffect ini untuk selectedAnswerIndex === null
  useEffect(() => {
    setSelectedAnswerIndex(null);
    setAnswerStatus(null);
  }, [index]);

  // useEffect untuk counter timer
  useEffect(() => {
    const myInterval = () => {
      if (counter >= 1) {
        setCounter((counter) => counter - 1);
      }
      if (counter === 0) {
        setIndex(index + 1);
        setCounter(15);
      }
    };

    interval = setTimeout(myInterval, 1000);

    // clean up the function
    return () => {
      clearTimeout(interval);
    };
  }, [counter]);

  // useEffect ini running setiap currentQuestion berganti.
  useEffect(() => {
    if (index + 1 > data.length) {
      navigation.navigate("Result", {
        answer: answers,
        point: points,
      });
    }
  }, [currentQuestion]);

  // useEffect dirunning setiap kali index benar.
  useEffect(() => {
    if (!interval) {
      setCounter(15);
    }
  }, [index]);

  return (
    <SafeAreaView style={styles.containerStatusBar}>
      <View style={styles.lineHeader}>
        <Text>Quiz Challenge</Text>
        <Pressable style={styles.timer}>
          <Text style={styles.counter}>{counter}</Text>
        </Pressable>
      </View>

      <View style={styles.lineHeader}>
        <Text>Your Progress</Text>
        <Text>
          ({index}/{totalQuestions}) answered
        </Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.containerProgressBar}>
        <Text
          style={{
            backgroundColor: "#ffc0cb",
            borderRadius: 12,
            position: "absolute",
            left: 0,
            right: 0,
            height: 10,
            width: `${progressPercentage}%`,
            marginTop: 20,
          }}
        />
      </View>

      <View style={styles.containerContent}>
        <Text style={styles.question}>{currentQuestion.question}</Text>

        <View style={styles.containerAnswer}>
          {currentQuestion.option.map((item, index) => (
            <Pressable
              onPress={() =>
                selectedAnswerIndex === null && setSelectedAnswerIndex(index)
              }
              style={[
                selectedAnswerIndex === index &&
                index === currentQuestion.correctAnswerIndex
                  ? styles.trueAnswerText
                  : selectedAnswerIndex != null && selectedAnswerIndex === index
                  ? styles.falseAnswerText
                  : styles.defaultAnswerText,
              ]}
            >
              {selectedAnswerIndex === index &&
              index === currentQuestion.correctAnswerIndex ? (
                <AntDesign
                  style={styles.optionText1}
                  name="checkcircle"
                  size={20}
                  color="white"
                />
              ) : selectedAnswerIndex != null &&
                selectedAnswerIndex === index ? (
                <AntDesign
                  style={styles.optionText1}
                  name="closecircle"
                  size={20}
                  color="white"
                />
              ) : (
                <Text style={styles.optionText1}>{item.options}</Text>
              )}

              <Text style={styles.optionText2}>{item.answer}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View
        style={answerStatus === null ? null : styles.containerArgCorrectWrong}
      >
        {answerStatus === null ? null : (
          <Text style={answerStatus === null ? null : styles.argCorrectWrong}>
            {!!answerStatus ? "Correct Answer" : "Wrong answer"}
          </Text>
        )}

        {index + 1 >= questions.length ? (
          <Pressable
            onPress={() =>
              navigation.navigate("Result", {
                point: points,
                answer: answers,
              })
            }
            style={styles.button}
          >
            <Text style={styles.textDone}>Done</Text>
          </Pressable>
        ) : answerStatus === null ? null : (
          <Pressable onPress={() => setIndex(index + 1)} style={styles.button}>
            <Text style={styles.textNextQuestion}>Next Question</Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({
  containerStatusBar: {
    marginTop: StatusBar.currentHeight,
    paddingHorizontal: 10,
  },
  lineHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // paddingHorizontal: 20,
    paddingVertical: 10,
  },
  containerProgressBar: {
    backgroundColor: "white",
    width: "100%",
    height: 10,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginLeft: 10,
  },
  // textProgressBar: {
  //   backgroundColor: "#ffc0cb",
  //   borderRadius: 12,
  //   position: "absolute",
  //   left: 0,
  //   right: 0,
  //   height: 10,
  //   width: `${progressPercentage}%`,
  //   marginTop: 20,
  // },
  timer: {
    backgroundColor: "magenta",
    borderRadius: 30,
    padding: 10,
  },
  counter: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  containerContent: {
    backgroundColor: "#f0f8ff",
    borderRadius: 6,
    marginTop: 30,
    padding: 10,
  },
  question: {
    fontSize: 18,
    fontWeight: "bold",
  },
  containerAnswer: {
    paddingTop: 12,
  },
  trueAnswerText: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#00ffff",
    borderRadius: 20,
    marginVertical: 10,
    backgroundColor: "green",
  },
  falseAnswerText: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#00ffff",
    borderRadius: 20,
    marginVertical: 10,
    backgroundColor: "red",
  },
  defaultAnswerText: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#00ffff",
    borderRadius: 20,
    marginVertical: 10,
  },
  optionText1: {
    borderColor: "#00ffff",
    borderWidth: 0.5,
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    textAlign: "center",
    padding: 10,
  },
  optionText2: {
    marginLeft: 10,
  },
  containerArgCorrectWrong: {
    backgroundColor: "#f0f8ff",
    borderRadius: 7,
    marginTop: 45,
    padding: 10,
    height: 120,
  },
  argCorrectWrong: {
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    backgroundColor: "green",
    marginLeft: "auto",
    marginRight: "auto",
    padding: 10,
    marginTop: 20,
    borderRadius: 6,
  },
  textDone: {
    color: "white",
  },
  textNextQuestion: {
    color: "white",
  },
});
