import React, { useState } from 'react';
import useConversation from '../../../hook/useConversation';
import { useEffectOnce } from '../../../hook/useEffectOnce';

function ConversationList({ selectedSid, setSelectedSid }: any) {
    const [isLoading, setLoading] = useState(false)
    const { getConversations } = useConversation()

    const [conversations, setConversations] = useState([])

    useEffectOnce(() => {
        async function init() {
            setLoading(true)
            const res = await getConversations();
            setLoading(false)
            setConversations(res)
        }

        init()
    })

    return (
        <div className='rounded-lg p-4 border border-black/30'>
            {
                conversations.map((row: any, key) => {
                    return (
                        <div key={key} className="border-b border-black/30 cursor-pointer" onClick={() => { setSelectedSid(row.conversationSid) }}>
                            <p className='text-black/60 py-3 px-4 font-medium'>{row.customerPhoneNumber}</p>
                        </div>
                    )
                })
            }
            <p className='text-black/50 text-xs text-center mt-3'>There is {conversations.length} conversations.</p>
        </div>
    );
}

export default ConversationList;