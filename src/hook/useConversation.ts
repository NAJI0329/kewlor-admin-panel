import { setAlert } from "../actions/alert";

import api from "../utils/api";

export default function useConversation() {
  const getConversations = async () => {
    try {
      const res = await api.get(`/client/conversations`);
      if (res.data.success) {
        return res.data.data.conversations;
      }
      return [];
    } catch (error: any) {
      if (error?.response?.data?.message) {
        setAlert(error?.response?.data?.message, "error");
      } else {
        setAlert("Server Error.", "error");
      }
      return [];
    }
  };

  const getMessagesByConversationSid = async (conversationSid: string) => {
    try {
      const res = await api.get(`/conversation/${conversationSid}/messages`);
      if (res.data.success) {
        return res.data.data.messages;
      }
      return [];
    } catch (error: any) {
      if (error?.response?.data?.message) {
        setAlert(error?.response?.data?.message, "error");
      } else {
        setAlert("Server Error.", "error");
      }
      return [];
    }
  };

  const sendMessage = async ({ conversationSid, message }: any) => {
    try {
      const res = await api.post(`/conversation/${conversationSid}/message`, {
        message,
      });
      if (res.data.success) {
        setAlert(res.data.message, "success");
        return true;
      }
      return false;
    } catch (error: any) {
      if (error?.response?.data?.message) {
        setAlert(error?.response?.data?.message, "error");
      } else {
        setAlert("Server Error.", "error");
      }
      return false;
    }
  };

  return {
    getConversations,
    getMessagesByConversationSid,
    sendMessage,
  };
}
