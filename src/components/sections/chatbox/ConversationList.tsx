import React, { useEffect, useState } from 'react';
import useConversation from '../../../hook/useConversation';

function ConversationList({ selectedSid, setSelectedSid }: any) {
    const [isLoading, setLoading] = useState(false)
    const { getConversations } = useConversation()

    const [conversationType, setConversationType] = useState("open");
    const [conversations, setConversations] = useState([])

    useEffect(() => {
        getConversationsData()
    }, [conversationType])

    async function getConversationsData() {
        setLoading(true)
        const res = await getConversations();
        setLoading(false)
        setConversations(res)
    }


    return (
        <div className="w-1/3 border flex flex-col">

            <div className="py-2 px-3 bg-grey-lighter flex h-14 border-b border-black/30 shadow-sm flex-row justify-between items-center">
                <div></div>
                <div className="flex">
                    <p className="ml-4 cursor-pointer" onClick={getConversationsData}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#727A7E" d="M12 20.664a9.163 9.163 0 0 1-6.521-2.702.977.977 0 0 1 1.381-1.381 7.269 7.269 0 0 0 10.024.244.977.977 0 0 1 1.313 1.445A9.192 9.192 0 0 1 12 20.664zm7.965-6.112a.977.977 0 0 1-.944-1.229 7.26 7.26 0 0 0-4.8-8.804.977.977 0 0 1 .594-1.86 9.212 9.212 0 0 1 6.092 11.169.976.976 0 0 1-.942.724zm-16.025-.39a.977.977 0 0 1-.953-.769 9.21 9.21 0 0 1 6.626-10.86.975.975 0 1 1 .52 1.882l-.015.004a7.259 7.259 0 0 0-5.223 8.558.978.978 0 0 1-.955 1.185z"></path></svg>
                    </p>
                    <div className="ml-4">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#263238" fill-opacity=".6" d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"></path></svg>
                    </div>
                </div>
            </div>

            {/* <div className="py-2 px-2 bg-grey-lightest">
                <input type="text" className="w-full px-2 py-2 text-sm border border-black/30 outline-none" placeholder="Search or start new chat" />
            </div> */}

            <div className='flex justify-around w-full'>
                <p className={`${conversationType === "open" ? " border-[#2633ED]" : " border-black/10"} border-b py-2 w-full text-center cursor-pointer`} onClick={() => { setConversationType("open") }}>Open</p>
                <p className={`${conversationType === "closed" ? " border-[#2633ED]" : " border-black/10"} border-b py-2 w-full text-center cursor-pointer`} onClick={() => { setConversationType("closed") }}>Closed</p>
            </div>
            <div className="bg-grey-lighter flex-1 overflow-auto min-h-[400px]">
                {
                    isLoading
                        ? <p className='text-center py-4'>Loading conversations...</p>
                        : conversations.map((row: any, key) => {
                            if (row.status === conversationType) {
                                return (
                                    <div
                                        key={key}
                                        className={`px-3 flex items-center  cursor-pointer ${selectedSid === row?.conversationSid ? "bg-[#F0F2F5]" : "bg-grey-light"}`}
                                        onClick={() => { setSelectedSid(row.conversationSid) }}
                                    >
                                        <div>
                                            <img className="h-12 w-12 rounded-full" src="https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg" alt="" />
                                        </div>
                                        <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                                            <div className="flex items-bottom justify-between">
                                                <p className="text-grey-darkest">
                                                    {row.customerName}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        })
                }
            </div>
        </div>
    );
}

export default ConversationList;