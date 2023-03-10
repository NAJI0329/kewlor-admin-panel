import React, { useEffect, useRef, useState } from 'react';
import { setAlert } from '../../../actions/alert';
import useConversation from '../../../hook/useConversation';
import useLoading from '../../../hook/useLoading';
import { formatDateTime, formatPhoneNumber } from '../../../utils';
import { confirmAlert } from 'react-confirm-alert'; // Import
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
} from "@material-tailwind/react";

function Messages({ selectedSid }: any) {
    const { setLoading } = useLoading()
    const [isMessagesLoading, setMessagesLoading] = useState(false)
    const { getMessagesByConversationSid, sendMessage, getConversationInfoByConversationSid, closeConversation } = useConversation()

    const [messages, setMessages] = useState([])
    const [conversation, setConversation] = useState<any>({})

    useEffect(() => {
        setMessages([])
        getConversationsData()
        getConversationInfoData()
    }, [selectedSid])

    async function getConversationsData() {
        if (selectedSid) {
            setMessagesLoading(true)
            const res = await getMessagesByConversationSid(selectedSid);
            setMessagesLoading(false)
            setMessages(res)
        }
    }

    async function getConversationInfoData() {
        if (selectedSid) {
            const res = await getConversationInfoByConversationSid(selectedSid);
            setConversation(res)
        }
    }

    const [message, setMessage] = useState("")

    const onSendMessage = async () => {
        if (!message) {
            setAlert("You can't send empty message", "warning");
            return false;
        }
        console.log('asdfasdf')
        const res = await sendMessage({ conversationSid: selectedSid, message });
        if (res) {
            setMessage("")
            getConversationsData()
        }
    }
    async function onHandleConversation(status: string) {
        if (selectedSid) {
            confirmAlert({
                title: `Confirm to ${status === "open" ? "open" : "close"} the conversation.`,
                message: 'Are you sure to do this.',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: async () => {
                            setLoading(true);
                            const res = await closeConversation(selectedSid, status);
                            setLoading(false);
                            if (res) {
                                console.log("Scucess");
                                getConversationInfoData()
                            }
                        }
                    },
                    {
                        label: 'No',
                        onClick: () => {
                            console.log("cancel")
                        }
                    }
                ]
            });
        }
    }

    return (
        <>
            {
                selectedSid &&
                <div className="w-2/3 border flex flex-col">
                    <div className="py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center">
                        <div className="flex items-center">
                            <div>
                                <img className="w-10 h-10 rounded-full" src="https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg" alt="" />
                            </div>
                            <div className="ml-4">
                                <p className="text-grey-darkest">
                                    {conversation?.customerName} <span className='text-sm'>{formatPhoneNumber(conversation?.customerPhoneNumber)}</span>
                                </p>
                            </div>
                        </div>

                        <div className="flex">
                            <p className='cursor-pointer' onClick={getConversationsData}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#727A7E" d="M12 20.664a9.163 9.163 0 0 1-6.521-2.702.977.977 0 0 1 1.381-1.381 7.269 7.269 0 0 0 10.024.244.977.977 0 0 1 1.313 1.445A9.192 9.192 0 0 1 12 20.664zm7.965-6.112a.977.977 0 0 1-.944-1.229 7.26 7.26 0 0 0-4.8-8.804.977.977 0 0 1 .594-1.86 9.212 9.212 0 0 1 6.092 11.169.976.976 0 0 1-.942.724zm-16.025-.39a.977.977 0 0 1-.953-.769 9.21 9.21 0 0 1 6.626-10.86.975.975 0 1 1 .52 1.882l-.015.004a7.259 7.259 0 0 0-5.223 8.558.978.978 0 0 1-.955 1.185z"></path></svg>
                            </p>
                            <div className="ml-4">
                                <Menu placement="bottom-end" >
                                    <MenuHandler>
                                        <p className='cursor-pointer'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#263238" fillOpacity=".6" d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"></path></svg>
                                        </p>
                                    </MenuHandler>
                                    <MenuList>
                                        <MenuItem className='text-right'>Edit User</MenuItem>
                                        <MenuItem className='text-right'
                                            onClick={() => onHandleConversation(conversation?.status === "open" ? "closed" : 'open')}
                                        >
                                            {conversation?.status === "open" ? "Close" : 'Open'}
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 overflow-auto bg-[#EFEAE2]">
                        <div className="py-2 px-3">

                            {
                                messages.map((row: any, key) => {
                                    return (
                                        <div key={key} className="mb-4" >
                                            {
                                                row?.author === "olaf@kewlor.com"
                                                    ? <div className="flex justify-end mb-2">
                                                        <div className="rounded py-2 px-3 bg-[#D9FDD3]">
                                                            <p className="text-sm mt-1">
                                                                {row?.body}
                                                            </p>
                                                            <p className="text-right text-xs text-grey-dark mt-1">
                                                                {formatDateTime(row?.dateCreated)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    : <div className="flex mb-2">
                                                        <div className="rounded py-2 px-3 bg-[#FFFFFF]">
                                                            <p className="text-sm text-purple">
                                                                {formatPhoneNumber(row.author)}
                                                            </p>
                                                            <p className="text-sm mt-1">
                                                                {row?.body}
                                                            </p>
                                                            <p className="text-right text-xs text-grey-dark mt-1">
                                                                {formatDateTime(row?.dateCreated)}
                                                            </p>
                                                        </div>
                                                    </div>
                                            }
                                        </div>
                                    )
                                })
                            }
                            {
                                isMessagesLoading && <p className='text-center'>...</p>}

                        </div>
                    </div>

                    <div className="bg-grey-lighter px-4 py-4 flex items-center">
                        <div className="flex-1 mr-4">
                            <input className="w-full border rounded px-2 py-2 outline-none" type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
                        </div>
                        <div>
                            <button className="flex items-center justify-center bg-[#2633ED] hover:bg-[#2633ED] rounded-xl text-white px-4 py-2 flex-shrink-0" onClick={() => onSendMessage()}>
                                <span>Send</span>
                                <span className="ml-2">
                                    <svg className="w-4 h-4 transform rotate-45 -mt-px" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </div>
                </div >
            }
        </>
    );
}

export default Messages;