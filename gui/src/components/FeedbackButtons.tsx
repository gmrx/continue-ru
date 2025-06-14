import {
  HandThumbDownIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import { ChatHistoryItem } from "core";
import { useContext, useState } from "react";
import { IdeMessengerContext } from "../context/IdeMessenger";
import { useTranslation } from "../i18n/I18nContext";
import { useAppSelector } from "../redux/hooks";
import HeaderButtonWithToolTip from "./gui/HeaderButtonWithToolTip";

export interface FeedbackButtonsProps {
  item: ChatHistoryItem;
}

export default function FeedbackButtons({ item }: FeedbackButtonsProps) {
  const { t } = useTranslation();
  const [feedback, setFeedback] = useState<boolean | undefined>(undefined);
  const ideMessenger = useContext(IdeMessengerContext);
  const sessionId = useAppSelector((store) => store.session.id);

  const sendFeedback = (feedback: boolean) => {
    setFeedback(feedback);
    if (item.promptLogs?.length) {
      for (const promptLog of item.promptLogs) {
        ideMessenger.post("devdata/log", {
          name: "chatFeedback",
          data: {
            ...promptLog,
            feedback,
            sessionId,
          },
        });
      }
    }
  };

  return (
    <>
      <HeaderButtonWithToolTip
        text={t("Helpful")}
        tabIndex={-1}
        onClick={() => sendFeedback(true)}
      >
        <HandThumbUpIcon
          className={`mx-0.5 h-3.5 w-3.5 ${feedback === true ? "text-green-400" : "text-gray-500"}`}
        />
      </HeaderButtonWithToolTip>
      <HeaderButtonWithToolTip
        text={t("Unhelpful")}
        tabIndex={-1}
        onClick={() => sendFeedback(false)}
      >
        <HandThumbDownIcon
          className={`h-3.5 w-3.5 ${feedback === false ? "text-red-400" : "text-gray-500"}`}
        />
      </HeaderButtonWithToolTip>
    </>
  );
}
