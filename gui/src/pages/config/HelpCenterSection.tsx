import {
  ArrowTopRightOnSquareIcon,
  DocumentArrowUpIcon,
  PaintBrushIcon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IdeMessengerContext } from "../../context/IdeMessenger";
import { useTranslation } from "../../i18n/I18nContext";
import { useAppDispatch } from "../../redux/hooks";
import { setOnboardingCard } from "../../redux/slices/uiSlice";
import { saveCurrentSession } from "../../redux/thunks/session";
import { ROUTES } from "../../util/navigation";
import MoreHelpRow from "./MoreHelpRow";

export function HelpCenterSection() {
  const { t } = useTranslation();
  const ideMessenger = useContext(IdeMessengerContext);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <div className="py-5">
      <h3 className="mb-4 mt-0 text-xl">{t("Help center")}</h3>
      <div className="-mx-4 flex flex-col">
        <MoreHelpRow
          title={t("Continue Hub")}
          description={t(
            "Visit hub.continue.dev to explore custom assistants and blocks",
          )}
          Icon={ArrowTopRightOnSquareIcon}
          onClick={() =>
            ideMessenger.post("openUrl", "https://hub.continue.dev/")
          }
        />

        <MoreHelpRow
          title={t("Documentation")}
          description={t("Learn how to configure and use Continue")}
          Icon={ArrowTopRightOnSquareIcon}
          onClick={() =>
            ideMessenger.post("openUrl", "https://docs.continue.dev/")
          }
        />

        <MoreHelpRow
          title={t("Have an issue?")}
          description={t(
            "Let us know on GitHub and we'll do our best to resolve it",
          )}
          Icon={ArrowTopRightOnSquareIcon}
          onClick={() =>
            ideMessenger.post(
              "openUrl",
              "https://github.com/continuedev/continue/issues/new/choose",
            )
          }
        />

        <MoreHelpRow
          title={t("Join the community!")}
          description={t(
            "Join us on Discord to stay up-to-date on the latest developments",
          )}
          Icon={ArrowTopRightOnSquareIcon}
          onClick={() =>
            ideMessenger.post("openUrl", "https://discord.gg/vapESyrFmJ")
          }
        />

        <MoreHelpRow
          title={t("Token usage")}
          description={t("Daily token usage across models")}
          Icon={TableCellsIcon}
          onClick={() => navigate("/stats")}
        />

        <MoreHelpRow
          title={t("Quickstart")}
          description={t("Reopen the quickstart and tutorial file")}
          Icon={DocumentArrowUpIcon}
          onClick={async () => {
            navigate("/");
            // Used to clear the chat panel before showing onboarding card
            await dispatch(
              saveCurrentSession({
                openNewSession: true,
                generateTitle: true,
              }),
            );
            dispatch(
              setOnboardingCard({
                show: true,
                activeTab: undefined,
              }),
            );
            ideMessenger.post("showTutorial", undefined);
          }}
        />
        {process.env.NODE_ENV === "development" && (
          <MoreHelpRow
            title={t("Theme Test Page")}
            description={t("Development page for testing themes")}
            Icon={PaintBrushIcon}
            onClick={async () => {
              navigate(ROUTES.THEME);
            }}
          />
        )}
      </div>
    </div>
  );
}
