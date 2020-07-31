import React, {useCallback, useMemo, useRef, useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const AVG_ORDER_TIME = 3000;

const App = () => {
  const [orderQueue, setOrderQueue] = useState([]);
  const [readyQueue, setReadyQueue] = useState([]);

  const keyRef = useRef(0);

  const addCafe = useCallback(() => {
    keyRef.current = keyRef.current + 1;
    const key = keyRef.current;
    setOrderQueue([
      ...orderQueue,
      {value: 'Cafe Au Lait', key: keyRef.current},
    ]);
    setTimeout(() => {
      setReadyQueue([...readyQueue, {value: 'Cafe Au Lait', key}]);
      setOrderQueue([...orderQueue.filter((item) => item.value !== key)]);
      setTimeout(() => {
        setReadyQueue([...readyQueue.filter((item) => item.value !== key)]);
      }, AVG_ORDER_TIME);
    }, 4000);
  }, [orderQueue, readyQueue]);

  const addCap = useCallback(() => {
    keyRef.current = keyRef.current + 1;
    const key = keyRef.current;
    setOrderQueue([...orderQueue, {value: 'Cappuccino', key: keyRef.current}]);
    setTimeout(() => {
      setReadyQueue([...readyQueue, {value: 'Cappuccino', key}]);
      setOrderQueue([...orderQueue.filter((item) => item.value !== key)]);
    }, 10000);
    setTimeout(() => {
      setReadyQueue([...readyQueue.filter((item) => item.value !== key)]);
    }, AVG_ORDER_TIME);
  }, [orderQueue, readyQueue]);

  const addExp = useCallback(() => {
    keyRef.current = keyRef.current + 1;
    const key = keyRef.current;
    setOrderQueue([...orderQueue, {value: 'Expresso', key: keyRef.current}]);
    setTimeout(() => {
      setReadyQueue([...readyQueue, {value: 'Expresso', key}]);
      setOrderQueue([...orderQueue.filter((item) => item.value !== key)]);
      setTimeout(() => {
        setReadyQueue([...readyQueue.filter((item) => item.value !== key)]);
      }, AVG_ORDER_TIME);
    }, 15000);
  }, [orderQueue, readyQueue]);

  const renderOrderQueue = useMemo(() => {
    return orderQueue.length ? (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionDescription}>Orders:</Text>
        <View style={styles.orderQueue}>
          {orderQueue.map((item) => (
            <Text key={item.key} style={styles.sectionDescription}>
              {item.value} #{item.key}
            </Text>
          ))}
        </View>
      </View>
    ) : null;
  }, [orderQueue]);

  const renderReadyQueue = useMemo(() => {
    return readyQueue.length ? (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionDescription}>Ready For Pickup:</Text>
        <View style={styles.orderQueue}>
          {readyQueue.map((item) => (
            <Text key={item.key} style={styles.sectionDescription}>
              {item.value} #{item.key}
            </Text>
          ))}
        </View>
      </View>
    ) : null;
  }, [readyQueue]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionDescription}>
                Welcome. Select a drink to get started.
              </Text>
            </View>
            <View style={styles.container}>
              <Button title="Cafe Au Lait" onPress={addCafe} />
              <Button title="Cappuccino" onPress={addCap} />
              <Button title="Expresso" onPress={addExp} />
            </View>
            <View style={styles.menuInfo}>
              {renderOrderQueue}
              {renderReadyQueue}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 100,
    padding: 30,
    backgroundColor: Colors.black,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.white,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  orderQueue: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: Colors.black,
  },
  picker: {
    flex: 1,
    width: '100%',
  },
  menuInfo: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default App;
