import React, {useEffect} from 'react'
import {View, Text, StyleSheet, Image, Button, ScrollView, Alert} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import {DATA} from '../data'
import { THEME } from '../theme'
import { AppHeaderIcon } from '../components/AppHeaderIcon'

export const PostScreen = ({navigation, route}) => {
  const postDate = route.params.['date']
  const postId = route.params.['postId']
  const post = DATA.find(post => post.id === postId)


  // useEffect(() => {
  //   navigation.setParams({
  //     booked: post.booked
  //   })
  // }, [])

  const booked = route.params.['booked']
  const iconName = booked ? 'ios-star' : 'ios-star-outline'

  navigation.setOptions({
    title: 'Пост от ' + new Date(postDate).toLocaleDateString(),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item
          title='Take photo'
          iconName={iconName}
          onPress={() => console.log('Press star')}/>
      </HeaderButtons>
    )

  })

  const removeHandler = () => {
    Alert.alert(
      'Удаление поста',
      'Вы точно хотите удалить пост?',
      [
        {
          text: 'Отменить',
          style: 'cancel'
        },
        { text: 'Удалить', style: 'destructive', onPress:() => {}}
      ],
      { cancelable: false }
    );
  }



  return(
    <ScrollView>
      <Image source={{uri: post.img}} style={styles.image}/>
      <View style={styles.textWrap}>
        <Text style={styles.title}>{post.text}</Text>
      </View>
      <Button title='Удалить' color={THEME.DANGER_COLOR} onPress={removeHandler}/>
    </ScrollView>
  )




}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image:{
    width: '100%',
    height: 200,

  },
  textWrap:{
    padding: 10,

  },
  title: {
    fontFamily: 'open-regular'
  }
})
