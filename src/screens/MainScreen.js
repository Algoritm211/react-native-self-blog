import React, {useEffect} from 'react'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import { Post } from '../components/Post'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { PostList } from '../components/PostList'
import { loadPosts } from '../store/actions/postActions'
import { THEME } from '../theme'



export const MainScreen = ({navigation}) => {

  const openPostHandler = (post) => {
    navigation.navigate('Post', {postId: post.id, date: post.date, booked: post.booked})
  }

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadPosts())
  }, [dispatch])

  const allPosts = useSelector(state => state.post.allPosts)
  const loading = useSelector(state => state.post.loading)

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={THEME.MAIN_COLOR}/>
      </View>
    )
  }

  navigation.setOptions({
    title: 'Мои посты',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item
          title='Take photo'
          iconName='ios-camera'
          onPress={() => navigation.navigate('CreateScreen')}
          />
      </HeaderButtons>
    ),
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item
          title='Toggle Drawer'
          iconName='ios-menu'
          onPress={() => navigation.toggleDrawer()}
          />
      </HeaderButtons>
    )
  })

  return(
    <PostList data={allPosts} onOpen={openPostHandler} />
  )
}


const styles = StyleSheet.create({
  center: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center'
  }
})
