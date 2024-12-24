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
        console.log('Subscription status:', status);
      });

    // Cleanup on unmount
    return () => {
      messageChannel.unsubscribe();
    };
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (newMessage.trim() === '') return;

    if (user?.house_code) {
      try {
        const data = await sendMessage(user.house_code, user.id, newMessage);
        if (data) {
          console.log("sent");
          setNewMessage('');
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.messageList}>
        {messages.map((message) => (
          <div key={message.id} style={styles.message}>
            <span style={styles.userId}>{message.user_id}:</span>
            <span style={styles.content}>{message.content}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Send</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1200p',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    color: '#000',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  messageList: {
    marginBottom: '20px',
    maxHeight: '400px',
    overflowY: 'auto',
  },
  message: {
    backgroundColor: '#f1f1f1',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '10px',
    display: 'flex',
    flexDirection: 'column',
  },
  userId: {
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  content: {
    fontSize: '14px',
  },
  form: {
    display: 'flex',
    gap: '10px',
  },
  input: {
    flex: '1',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '14px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.2s',
  },
  buttonHover: {
    backgroundColor: '#333',
  },
};

export default Chat;
