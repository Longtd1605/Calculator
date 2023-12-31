import React, { useState } from 'react';
import { SafeAreaView, FlatList, StyleSheet, Text, View, TouchableOpacity, Alert, Dimensions} from 'react-native';
import { SearchBar } from 'react-native-elements'
export default function App() {

    const [ lastNumber, setLastNumber ] = useState();
    const [ currentNumber, setCurrentNumber ] = useState('');
    const [ history, setHistory] = useState([]);
    const [ search, setSearch] = useState();
    const [ text, setText] = useState('');
    const [show, setShow] = useState(false)
    //chuỗi số vừa nhập
    const operators = [ "AC", "DEL", "%", "/", 7, 8, 9, "*", 4, 5, 6, "-", 1, 2, 3, "+", "+/-", 0, ".", "=" ];


    var result;

      const styles = StyleSheet.create({
      main: {
        flex: 1,
        display: 'flex',
      },

      resultContainer: {
        backgroundColor: 'black',
        flex: 2,
        maxWidth: '100%',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
      },

      themeTouchable : {
        position: 'absolute', 
        justifyContent: "flex-end",
        alignSelf: "flex-start",
        marginLeft: 15,
        bottom: '65%',
      },
      
      textContainer: {
        minHeight: 105,
        justifyContent: "flex-end"
      },
    
      textHistory: {
        color:"#FFF",
        fontSize: 26,
        paddingRight: 15,
        alignSelf: "flex-end",
      },

    
      textResult: {
        color:"#FFF",
        fontSize: 36,
        paddingRight: 15,
        alignSelf: "flex-end",
     
      },
    
      operatorContainer: {
        backgroundColor: "#000",
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 20,
        justifyContent: 'center',
        lignItems: 'flex-end',
      },
      
      operators: {
        flex: 1,
        minHeight: Dimensions.get('window').height/10,
        minWidth: Dimensions.get('window').width/5,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        margin: 2,
      }, 
      
      operatorsText: {
        color: "#FFF",
        fontSize: 24,
      },
      item: {
        backgroundColor: '#808080',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        fontSize: 24
      },
      title: {
        fontSize: 32,
      },

      button: {
        textAlign:'center',
        justifyContent:'center',
        backgroundColor: "#000",
        border: "none",
        padding: 10,
        fontSize: 30,
        height:50,
        cursor: 'pointer',
      },
      
      text_: {
        fontSize: 18,
        color: "#FFF",
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
      }

    });
    

    function handleButtonPress(buttonPressed){
      if(buttonPressed == "+" || buttonPressed == "-" || buttonPressed == "*" || buttonPressed == "/"){
        if(currentNumber.toString().indexOf("+") == -1 && 
        currentNumber.toString().indexOf("*") == -1 && currentNumber.toString().indexOf("/") == -1){
          //Nếu trong currentNumber chưa từng nhập toán tử
          //Tạo ra khoảng trắng giữa số và toán tử
          setCurrentNumber(currentNumber + " " + buttonPressed + " ");
          //nếu người dùng nhập vào cuối có toán tử thì không xử lý.
          //AC 9 +
          return;
        }else{
          //9+***
          //Nếu trong biểu thức đã có toán tử mà người dùng vẫn nhập thêm toán tử thì xóa toán tử có sẵn.
          const newNumberCurrent = currentNumber.toString().substring(0, currentNumber.length - 3);
          setCurrentNumber('');
          setCurrentNumber(newNumberCurrent + " " + buttonPressed + " ");
          return;
        }
      }

      switch(buttonPressed){
        case 'AC':
          // Nếu nút 'AC' được bấm, xóa cả lastNumber và currentNumber.
          setLastNumber('');
          setCurrentNumber('');
        return;
        case 'DEL':
          // Nếu nút 'DEL' được bấm, xóa ký tự cuối cùng từ currentNumber.
          if(typeof(currentNumber)=='number'){
            // Nếu currentNumber là một số, xóa cả lastNumber và currentNumber.
            setLastNumber('');
            setCurrentNumber('');
          }else{
            // Ngược lại, xóa ký tự cuối cùng từ currentNumber.
            setCurrentNumber(currentNumber.slice(0, -1));
          }
        return;
        case '=':
          // Nếu nút '=' được bấm, tính toán kết quả và cập nhật lịch sử.
          setLastNumber(currentNumber + " = ");
          calculate()
          var a = history
          a.push({
            exp: currentNumber,
            res: result
      });
          setHistory(a);
          setSearch(a);
        return;
        case '+/-':
          // Nếu nút '+/-' được bấm, đổi dấu của currentNumber.
          var change = currentNumber * -1;
          isNaN(change) ? Alert.alert("Invalid Format") : setCurrentNumber(parseFloat(change));
        return;
        case '%':
          // Nếu nút '%' được bấm, tính phần trăm của currentNumber.
          var change = currentNumber / 100;
          isNaN(change) ? Alert.alert("Invalid Format") : setCurrentNumber(change);
          console.log(typeof(currentNumber));
        return;
      }
      //Nếu ký tự nhập vào là 1 số thì add vào curentNumber
      setCurrentNumber(currentNumber + buttonPressed);
    }

    function calculate(){
     const splitNumbers = currentNumber.toString().split(" ");
     const firstNumber = parseFloat(splitNumbers[0]);
     const secondNumber = parseFloat(splitNumbers[2]);
     const operation = splitNumbers[1];

      if(!isNaN(secondNumber)){
        switch(operation){
          case '+':
            result = firstNumber + secondNumber;
            setCurrentNumber(result);
          return;
          case '-':
            result = firstNumber - secondNumber;
            setCurrentNumber(result);
          return;
          case '*':
            result = firstNumber * secondNumber;
            setCurrentNumber(result);
          return;
          case '/':
            result = firstNumber / secondNumber;
            setCurrentNumber(result);
          return;
          default: 
            setLastNumber('');
            setCurrentNumber('');
          return;
        }
      }else{
        Alert.alert("Invalid format");
      }
    }
    const Item = ({ title }) => (
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
      </View>
    );

    const text_ = show ? 'CALCULATE':'HISTORY AND SEARCH';
  return (
    <>
      {/* <AwesomeButton>Text</AwesomeButton> */}
      <View style={styles.main}>
      <TouchableOpacity title={text_} style={styles.button} type="secondary" onPress={()=>setShow(!show)} ><Text style={styles.text_}>{text_}</Text></TouchableOpacity>
        {/* Search */}
        {show?<>
          <View style={styles.history}>
            <SearchBar 
              placeholder="Type to search"
              onChangeText = {newText => {
                setText(newText);
                var s = history.filter((value, index, arr) => {
                  return value.exp.toString().includes(newText) || value.res.toString().includes(newText);
                });
                setSearch(s);
              }}
              value={text}/>
          </View>

        {/* History */}
          <SafeAreaView style={styles.container}>  
            <FlatList
              data={search}
              renderItem={({item}) => (
                <Text key={item.key} style={styles.item}>{item.exp} = {item.res} </Text>
                )}

              keyExtractor={item => item.id}
            />
          </SafeAreaView>
        </>: null}

        {/* Result */}
        {  !show?      
        <>
          <View 
            style={styles.resultContainer}>
            <TouchableOpacity style={styles.themeTouchable}></TouchableOpacity>
            <View style={styles.textContainer}>
              <Text style={styles.textHistory}>
                {lastNumber}
              </Text>
              <Text style={styles.textResult}>
                {currentNumber}
              </Text>          
            </View>
          </View>
        
          {/* calculate */}
          <View style={styles.operatorContainer}>
              {
                operators.map((char) => (
                  (char) === 'AC' ?
                    <TouchableOpacity
                      key={char} 
                      style={[styles.operators, {backgroundColor:'#f55b77'}]}
                      onPress={() => handleButtonPress(char)}
                    >
                      <Text style={styles.operatorsText}>{char}</Text>
                    </TouchableOpacity>
                  :
                    <TouchableOpacity 
                      key={char} 
                      style={[styles.operators, {
                        backgroundColor: typeof(char) === 'number'  || (char) === 'DEL'  || (char) === '%' || (char) === '+/-' || (char) === '.'  ? 
                          '#4e4e4e'
                          :
                          '#ffbb00'
                      }]}
                      onPress={() => handleButtonPress(char)}
                    >
                      {/* Ký tự bên trong nút bấm */}
                      <Text style={styles.operatorsText}>{char}</Text>
                    </TouchableOpacity>

                ))
              }
          </View>
        </>:null}
      </View>
    </>
    );
}