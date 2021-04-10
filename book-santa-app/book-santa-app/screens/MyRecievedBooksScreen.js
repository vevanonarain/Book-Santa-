import React, {Component} from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import firebase from 'firebase'
import db from '../Config'
import {ListItem} from 'react-native-elements';
import MyHeader from '../components/MyHeader';

export default class MyRecievedBooksScreen extends Component{
  constructor(){
    super()
    this.state = {
      userId: firebase.auth().currentUser.email,
      recievedBooksList: []
    }
    this.requestRef = null
  }

  getRecievedBooksList =()=>{
    this.requestRef = db.collection("requested_books")
    .where('user_id', '==', this.state.userId)
    .where("book_status", '==', 'recieved')
    .onSnapshot((snapshot)=>{
      var recievedBooksList = snapshot.docs.map((doc) => doc.data())
      this.setState({
        recievedBooksList: recievedBooksList
      })
    })
  }

  componentDidMount(){
    this.getRecievedBooksList();
  }

  componentWillUnmount(){
    this.requestRef()
  }

  keyExtractor = (item,index) => index.toString()

  renderItem = ({item, i})=>{
    console.log(item.book_name)
    return(
      <ListItem
      key = {i}
      title = {item.book_name}
      subtitle = {item.bookStatus}
      titleStyle = {{color: "black", fontWeight: 'bold'}}
      bottomDivider
      />
    )
  }

    render(){
    return(
      <View style={{flex:1}}>
        <MyHeader title="Received Books" navigation ={this.props.navigation}/>
        <View style={{flex:1}}>
          {
            this.state.receivedBooksList.length === 0
            ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20}}>List Of All Received Books</Text>
              </View>
            )
            :(
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.receivedBooksList}
                renderItem={this.renderItem}
              />
            )
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    subContainer:{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center'
  },
})
