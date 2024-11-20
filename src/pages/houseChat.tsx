import { FormEvent, useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useUser } from '@/UserContext';
import { sendMessage } from '@/messageService';

interface Message {
  id: string;
  user_id: string;
  content: string;
  timestamp: string;
}

function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const { user } = useUser();

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase.from('Messages').select('*').order('created_at', { ascending: true });
      if (error) {
        console.error('Error fetching messages:', error);
        return;
      }
      setMessages(data || []);
    };
  
    fetchMessages();
  
    // Set up the message real-time listener
    const messageChannel = supabase
      .channel('realtime:Messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'Messages' },
        (payload) => {
          console.log('New message received:', payload);
          if (payload.new) {
            setMessages((prevMessages) => [...prevMessages, payload.new as Message]);
          }
        }
      )
      .subscribe((status) => {
        console.log('Subscription status:', status); // Log subscription status
      });
  
    // Cleanup on unmount
    return () => {
      messageChannel.unsubscribe(); // Ensure this only happens on unmount
    };
  }, []);
  
  

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (newMessage.trim() === '') return;

    if (user?.house_code) {
      try {
        const data = await sendMessage(user.house_code, user.id, newMessage);
        if (data) {
          console.log("sent")
          setNewMessage(''); // Clear the input field
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <div>
      <p>{user?.id}</p>
      <div>
        {messages.map((message) => (
          <p key={message.id}>{message.content}</p>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;

