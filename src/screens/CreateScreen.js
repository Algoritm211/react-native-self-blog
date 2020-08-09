import React, { useState, useRef } from 'react'
import {View, 
        Text, 
        StyleSheet, 
        TextInput, 
        Image, 
        Button, 
        ScrollView, 
        TouchableWithoutFeedback,
        Keyboard} from 'react-native'
import {useDispatch} from 'react-redux'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { THEME } from '../theme'
import { addPost } from '../store/actions/postActions'
import { PhotoPicker } from '../components/PhotoPicker'



export const CreateScreen = ({navigation}) => {
  const dispatch = useDispatch()
  const [text, setText] = useState('')
  const imgRef = useRef()

  const img = 'https://static.coindesk.com/wp-content/uploads/2019/01/shutterstock_1012724596-860x430.jpg'

  const saveHandler = () => {
    const post = {
      date: new Date().toJSON(),
      text: text,
      img: imgRef.current,
      booked: false,
    }
    dispatch(addPost(post))
    navigation.navigate('Main')
  }

  navigation.setOptions({
    title: 'Мои посты',
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

  const photoPickHandler = (uri) => {
    imgRef.current = uri
  }

  return(
    <ScrollView>
      <TouchableWithoutFeedback 
        onPress={() => Keyboard.dismiss()}
        >
        <View style={styles.wrapper}>
          <Text style={styles.title}>Создайте новый пост</Text>
          <TextInput
            style={styles.textArea}
            placeholder='Введите текст нового поста...'
            value={text}
            onChangeText={setText}
            multiline
            />
         <PhotoPicker onPick={photoPickHandler}/>
          <Button 
            title='Создать пост' 
            color={THEME.MAIN_COLOR}
            onPress={saveHandler}
            disabled={!text}
            /> 
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 10
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'open-regular',
    marginVertical: 10,
  },
  textArea: {
    padding: 10,
    marginBottom: 10
  }
})
