import React, { useState } from 'react';
import ConversationList from '../../components/sections/chatbox/ConversationList';
import Messages from '../../components/sections/chatbox/Messages';

function ChatBox() {
    const [selectedSid, setSelectedSid] = useState(null)

    return (
        <div className='n-container py-20'>
            <p className='text-blue-600 text-4xl font-bold'>Conversations</p>
            <div className='flex justify-between gap-10 py-4'>
                <ConversationList selectedSid={selectedSid} setSelectedSid={setSelectedSid} />
                <Messages selectedSid={selectedSid} />
            </div>
        </div>
    );
}

export default ChatBox;