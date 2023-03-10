import React, { useState } from 'react';
import ConversationList from '../../components/sections/chatbox/ConversationList';
import Messages from '../../components/sections/chatbox/Messages';

function ChatBox() {
    const [selectedSid, setSelectedSid] = useState(null)

    return (
        <div className='n-container py-0'>
            {/* <p className='text-blue-600 text-4xl font-bold'>Conversations</p> */}
            <div className='flex justify-between border border-black/30'>
                <ConversationList selectedSid={selectedSid} setSelectedSid={setSelectedSid} />
                <Messages selectedSid={selectedSid} />
            </div>
        </div>
    );
}

export default ChatBox;