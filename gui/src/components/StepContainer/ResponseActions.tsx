import { BarsArrowDownIcon, TrashIcon } from "@heroicons/react/24/outline";
import { ChatHistoryItem } from "core";
import { renderChatMessage } from "core/util/messageContent";
import { useTranslation } from "../../i18n/I18nContext";
import FeedbackButtons from "../FeedbackButtons";
import { CopyIconButton } from "../gui/CopyIconButton";
import HeaderButtonWithToolTip from "../gui/HeaderButtonWithToolTip";

export interface ResponseActionsProps {
  isTruncated: boolean;
  onContinueGeneration: () => void;
  index: number;
  onDelete: () => void;
  item: ChatHistoryItem;
}

export default function ResponseActions({
  onContinueGeneration,
  index,
  item,
  isTruncated,
  onDelete,
}: ResponseActionsProps) {
  const { t } = useTranslation();

  return (
    <div className="mx-2 flex cursor-default items-center justify-end space-x-1 bg-transparent pb-0 text-xs text-gray-400">
      {isTruncated && (
        <HeaderButtonWithToolTip
          tabIndex={-1}
          text={t("Continue generation")}
          onClick={onContinueGeneration}
        >
          <BarsArrowDownIcon className="h-3.5 w-3.5 text-gray-500" />
        </HeaderButtonWithToolTip>
      )}

      <HeaderButtonWithToolTip
        testId={`delete-button-${index}`}
        text={t("Delete")}
        tabIndex={-1}
        onClick={onDelete}
      >
        <TrashIcon className="h-3.5 w-3.5 text-gray-500" />
      </HeaderButtonWithToolTip>

      <CopyIconButton
        tabIndex={-1}
        text={renderChatMessage(item.message)}
        clipboardIconClassName="h-3.5 w-3.5 text-gray-500"
        checkIconClassName="h-3.5 w-3.5 text-green-400"
      />

      <FeedbackButtons item={item} />
    </div>
  );
}
