import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import Header from '../../components/Header/headerIndex';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

const data = [
  { name: 'Categoria 1', population: 35, color: '#a55eea', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  { name: 'Categoria 2', population: 25, color: '#f54291', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  { name: 'Categoria 3', population: 20, color: '#FF6D01', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  { name: 'Categoria 4', population: 10, color: '#2DBEFC', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  { name: 'Categoria 5', population: 5, color: '#50c878', legendFontColor: '#7F7F7F', legendFontSize: 15 },
  { name: 'Categoria 6', population: 5, color: '#FBBC04', legendFontColor: '#7F7F7F', legendFontSize: 15 }
];

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, 
  barPercentage: 0.5,
  useShadowColorFromDataset: false 
};

const Dashboard = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header />
      <View style={styles.DashContainer}>
        <Text style={styles.sectionTitle}>Dashboard</Text>
        <View style={styles.dashboard}>
          <TouchableOpacity style={styles.buttonAddIncome} onPress={() => {
            navigation.navigate('AdicionarGanho' as never);
          }}>
            <Text style={styles.buttonText}>Adicionar ganhos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonAddExpense} onPress={() => {
            navigation.navigate('AdicionarGastos' as never);
          }}>
            <Text style={styles.buttonText}>Adicionar gastos</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Despesas por categoria</Text>
        <PieChart
          data={data}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
        <TouchableOpacity
          style={styles.categoryButton}
          onPress={() => {
            navigation.navigate('EditCategoria' as never);
          }}
        >
          <Text style={styles.categoryButtonText}>Categorias</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => {
            navigation.navigate('Categoria' as never);
          }}
        >
          <Text style={styles.floatingButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    backgroundColor: '#aedecf',
    paddingVertical: 20,
    alignItems: 'center',
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 16,
    color: '#333',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  dashboard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  buttonAddIncome: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  buttonAddExpense: {
    backgroundColor: '#F44336',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  chartContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryButton: {
    bottom: -35,
    backgroundColor: '#aedecf',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-start'
  },
  categoryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  floatingButton: {
    position: 'relative',
    bottom: 10,
    right: 30,
    backgroundColor: '#aedecf',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  floatingButtonText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  DashContainer: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginHorizontal: 10,
    marginTop: -20,
    borderRadius: 10,
    elevation: 2,
    marginVertical: 5,
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#96CEB4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});

export default Dashboard;
