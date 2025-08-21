import React, { useState } from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

let timer = null;
let ss = 0;
let mm = 0;
let hh = 0; 

export default function App() {

  const [cronometro, setCronometro] = useState(0);
  const [botaoStartStop, setBotaoStartStop] = useState('Iniciar');
  const [ultimoTempo, setUltimoTempo] = useState(null);

  function start () {
    if(timer !== null){
      clearInterval(timer);
      timer = null;
      
      setBotaoStartStop('Iniciar');
    } 
    else {
      timer = setInterval(() => {
        ss++;
        if (ss === 60) {
          ss = 0;
          mm++;
        }
        if (mm === 60) {
          mm = 0;
          hh++;
        }

        let format = 
        ( hh < 10 ? `0${hh}` : hh) + ':' +
        ( mm < 10 ? `0${mm}` : mm) + ':' +
        ( ss < 10 ? `0${ss}` : ss);

        setCronometro(format);
        setBotaoStartStop('Parar');
      },1000);
      setBotaoStartStop('Pausar');
    }
  }

  function zerar () {
    if(timer !== null){
      clearInterval(timer);
      timer = null;
    }
    setUltimoTempo(cronometro);
    setCronometro(0);
    ss = 0;
    mm = 0;
    hh = 0;
    setBotaoStartStop('Iniciar');
  }

  return (
    <View style={styles.container}>

      <Image
      source={require('./src/crono.png')}
      />

      <Text style={styles.timer}> {cronometro} </Text>

      <View style={styles.btnArea}>

        <TouchableOpacity style={styles.btn} onPress={start}>
          <Text style={styles.btnText}>
            {botaoStartStop}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={zerar}>
          <Text style={styles.btnText}>
            Resetar
          </Text>
        </TouchableOpacity>

      </View>

      <View style={styles.viewHistorico}>
        <Text style={styles.historicoTempo}>
          { ultimoTempo ? `Último tempo: ${ultimoTempo}` : ''}
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:25,
    marginBottom:45,
    flex: 1,
    backgroundColor: '#3b6fffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timer:{
    fontSize: 50,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: -160,
  },
  btnArea:{
    flexDirection: 'row',
    height:50,
    marginTop: 120,
  },
  btn:{
    flex:1,
    margin: 17,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  btnText:{
    fontSize: 23,
    fontWeight: 'bold',
    color: '#3b6fffff',
  },
  viewHistorico:{
    marginTop: 40,
    alignItems: 'center',
  },
  historicoTempo:{
    fontSize: 23,
    color: '#fff',
    fontStyle: 'italic',
  },
});
