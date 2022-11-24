import React, {
    useState,
    useLayoutEffect,
    useCallback
  } from 'react';
  import { GiftedChat } from 'react-native-gifted-chat';
  import { auth, db } from '../firebase/Config';
  import {
    orderBy,
    query,
    onSnapshot,
    collection
  } from 'firebase/firestore';
import { saveMessageChat } from '../firebase/database';
import { useNavigation, useTheme } from "@react-navigation/native";



  export default function Chat() {

    const { colors } = useTheme();
    const [messages, setMessages] = useState([]);

    useLayoutEffect(() => {

        const ref = collection(db, 'chats');
        const q = query(ref, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, msg => {
        
      const newMessages= msg.docs.map(doc => ({
        _id: doc.data()._id,
        createdAt: doc.data().createdAt.toDate(),
        text: doc.data().text,
        user: doc.data().user
      }))
          setMessages(newMessages);
        });
    return unsubscribe;
      }, []);

    const onSend = useCallback((messages = []) => {
      const save=  saveMessageChat(messages)
        setMessages(prev => 
          save &&  GiftedChat.append(prev, messages)
        );
      
      }, []);

      return (
       
        <GiftedChat
          messages={messages}
          showAvatarForEveryMessage={true}
          showUserAvatar={false}
          onSend={messages => onSend(messages)}
          messagesContainerStyle={{
            backgroundColor: colors.background,
            color: colors.text,
          }}
          textInputStyle={{
            backgroundColor: colors.background,
            color: colors.text,
            borderRadius: 20,
          }}
          scrollToBottomStyle ={{
            backgroundColor: colors.background,
            
          }}

          user={{
            _id: auth?.currentUser?.email,
            avatar: 'https://i.pravatar.cc/300'
          }}
        />
      );
}

