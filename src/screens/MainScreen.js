import React, {useEffect} from 'react'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import {useDispatch, useSelector} from 'react-redux'
import { Post } from '../components/Post'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { PostList } from '../components/PostList'
import { loadPosts } from '../store/actions/postActions'



export const MainScreen = ({navigation}) => {

  const openPostHandler = (post) => {
    navigation.navigate('Post', {postId: post.id, date: post.date, booked: post.booked})
  }

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadPosts())
  }, [dispatch])

  const allPosts = useSelector(state => state.post.allPosts)

  navigation.setOptions({
    title: 'Мои посты',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item
          title='Take photo'
          iconName='ios-camera'
          onPress={() => navigation.navigate('Create')}
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
