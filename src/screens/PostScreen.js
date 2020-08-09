import React, {useEffect, useCallback} from 'react'
import {View, Text, StyleSheet, Image, Button, ScrollView, Alert} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { THEME } from '../theme'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { toggleBooked, removePost } from '../store/actions/postActions'

export const PostScreen = ({navigation, route}) => {
  const dispatch = useDispatch()
  const postDate = route.params.date
  const postId = route.params.postId
  const post = useSelector(state => state.post.allPosts.find(postItem => postItem.id === postId))


  useEffect(() => {
    navigation.setParams({
      booked: 
        route.params.booked = post.booked
    })
  }, [booked])

  const booked = useSelector(state => {
    return state.post.bookedPosts.some(post => post.id === postId)
  })

  const toggleHandler = useCallback(() => {
    dispatch(toggleBooked(post))
  }, [dispatch, post])

  useEffect(() => {
    navigation.setParams({
      toggleHandler: toggleHandler
    })
  }, [toggleHandler])

  const ToggleHandler = route.params.toggleHandler
  const iconName = booked ? 'ios-star' : 'ios-star-outline'

  navigation.setOptions({
    title: 'Пост от ' + new Date(postDate).toLocaleDateString(),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item
          title='Take photo'
          iconName={iconName}
          onPress={ToggleHandler}/>
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
        { text: 'Удалить', 
          style: 'destructive', 
          onPress:() => {
            navigation.navigate('PostScreenNav')
            dispatch(removePost(postId))
          }}
      ],
      { cancelable: false }
    );
  }

  if (!post) {
    return null
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
