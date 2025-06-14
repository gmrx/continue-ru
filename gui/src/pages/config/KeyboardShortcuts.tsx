import { useMemo } from "react";
import Shortcut from "../../components/gui/Shortcut";
import { useTranslation } from "../../i18n/I18nContext";
import { isJetBrains } from "../../util";

interface KeyboardShortcutProps {
  shortcut: string;
  description: string;
  isEven: boolean;
}

function KeyboardShortcut(props: KeyboardShortcutProps) {
  return (
    <div
      className={`flex flex-col items-start p-2 sm:flex-row sm:items-center ${props.isEven ? "" : "bg-table-oddRow"}`}
    >
      <div className="w-full flex-grow pb-1 pr-4 sm:w-auto sm:pb-0">
        <span className="block break-words text-xs">{props.description}:</span>
      </div>
      <div className="flex-shrink-0 whitespace-nowrap">
        <Shortcut>{props.shortcut}</Shortcut>
      </div>
    </div>
  );
}

function KeyboardShortcuts() {
  const { t } = useTranslation();

  // Shortcut strings will be rendered correctly based on the platform by the Shortcut component
  const vscodeShortcuts: Omit<KeyboardShortcutProps, "isEven">[] = [
    {
      shortcut: "cmd '",
      description: t("Toggle Selected Model"),
    },
    {
      shortcut: "cmd I",
      description: t("Edit highlighted code"),
    },
    {
      shortcut: "cmd L",
      description: t(
        "New Chat / New Chat With Selected Code / Close Continue Sidebar If Chat Already In Focus",
      ),
    },
    {
      shortcut: "cmd backspace",
      description: t("Cancel response"),
    },
    {
      shortcut: "cmd shift I",
      description: t("Toggle inline edit focus"),
    },
    {
      shortcut: "cmd shift L",
      description: t(
        "Focus Current Chat / Add Selected Code To Current Chat / Close Continue Sidebar If Chat Already In Focus",
      ),
    },
    {
      shortcut: "cmd shift R",
      description: t("Debug Terminal"),
    },
    {
      shortcut: "cmd shift backspace",
      description: t("Reject Diff"),
    },
    {
      shortcut: "cmd shift enter",
      description: t("Accept Diff"),
    },
    {
      shortcut: "alt cmd N",
      description: t("Reject Top Change in Diff"),
    },
    {
      shortcut: "alt cmd Y",
      description: t("Accept Top Change in Diff"),
    },
    {
      shortcut: "cmd K cmd A",
      description: t("Toggle Autocomplete Enabled"),
    },
    {
      shortcut: "cmd alt space",
      description: t("Force an Autocomplete Trigger"),
    },
    {
      shortcut: "cmd K cmd M",
      description: t("Toggle Full Screen"),
    },
  ];

  const jetbrainsShortcuts: Omit<KeyboardShortcutProps, "isEven">[] = [
    {
      shortcut: "cmd '",
      description: t("Toggle Selected Model"),
    },
    {
      shortcut: "cmd I",
      description: t("Edit highlighted code"),
    },
    {
      shortcut: "cmd J",
      description: t(
        "New Chat / New Chat With Selected Code / Close Continue Sidebar If Chat Already In Focus",
      ),
    },
    {
      shortcut: "cmd backspace",
      description: t("Cancel response"),
    },
    {
      shortcut: "cmd shift I",
      description: t("Toggle inline edit focus"),
    },
    {
      shortcut: "cmd shift J",
      description: t(
        "Focus Current Chat / Add Selected Code To Current Chat / Close Continue Sidebar If Chat Already In Focus",
      ),
    },
    {
      shortcut: "cmd shift backspace",
      description: t("Reject Diff"),
    },
    {
      shortcut: "cmd shift enter",
      description: t("Accept Diff"),
    },
    {
      shortcut: "alt shift J",
      description: t("Quick Input"),
    },
    {
      shortcut: "alt cmd J",
      description: t("Toggle Sidebar"),
    },
  ];

  const shortcuts = useMemo(() => {
    return isJetBrains() ? jetbrainsShortcuts : vscodeShortcuts;
  }, [t, vscodeShortcuts, jetbrainsShortcuts]);

  return (
    <div className="h-full overflow-auto">
      <h3 className="mb-3 text-xl">{t("Keyboard shortcuts")}</h3>
      <div>
        {shortcuts.map((shortcut, i) => {
          return (
            <KeyboardShortcut
              key={i}
              shortcut={shortcut.shortcut}
              description={shortcut.description}
              isEven={i % 2 === 0}
            />
          );
        })}
      </div>
    </div>
  );
}

export default KeyboardShortcuts;
