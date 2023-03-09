import React, { useEffect, useState } from 'react';
import { setAlert } from '../../../actions/alert';
import useConversation from '../../../hook/useConversation';
import useLoading from '../../../hook/useLoading';
import { formatDateTime } from '../../../utils';

function Messages({ selectedSid }: any) {
    const { setLoading } = useLoading()
    const [isMessagesLoading, setMessagesLoading] = useState(false)
    const { getMessagesByConversationSid, sendMessage } = useConversation()

    const [messages, setMessages] = useState([])

    useEffect(() => {
        getConversationsData()
    }, [selectedSid])

    async function getConversationsData() {
        if (selectedSid) {
            setMessagesLoading(true)
            const res = await getMessagesByConversationSid(selectedSid);
            setMessagesLoading(false)
            setMessages(res)
        }
    }

    const [message, setMessage] = useState("")

    const onSendMessage = async () => {
        if (!message) {
            setAlert("You can't send empty message", "warning");
            return false;
        }
        console.log('asdfasdf')
        setLoading(true);
        const res = await sendMessage({ conversationSid: selectedSid, message });
        console.log('res', res)
        setLoading(false);
        if (res) {
            setMessage("")
            getConversationsData()
        }
    }

    return (
        <div className='w-full rounded-lg p-4 border border-black/30'>
            {
                isMessagesLoading
                    ? <p>Loading...</p>
                    : messages.map((row: any, key) => {
                        return (
                            <div key={key} className="mb-4" >
                                <div className={` w-full flex ${row?.author === "olaf@kewlor.com" ? "justify-end" : 'justify-start'} `}>

                                    <div className={`p-4 rounded-md  w-max  ${row?.author === "olaf@kewlor.com" ? "bg-blue-400" : 'bg-gray-400'} `}>
                                        <p>{row?.body}</p>
                                    </div>
                                </div>
                                <p className={`text-xs ${row?.author === "olaf@kewlor.com" ? "text-end" : 'text-start'} `}>{formatDateTime(row?.dateCreated)}</p>
                            </div>
                        )
                    })
            }

            <div className='flex w-full mt-10'>
                <textarea className='w-full h-20 outline-none overflow-auto border-black/40 border p-3' value={message} onChange={(e) => setMessage(e.target.value)} />
                <button className='flex bg-blue-600 text-white items-center p-4' onClick={() => onSendMessage()}>
                    Send
                </button>
            </div>
        </div >
    );
}

export default Messages;